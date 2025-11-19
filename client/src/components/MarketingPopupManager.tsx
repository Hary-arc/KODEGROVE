'use client'

import { useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { 
  PopupModal,
  WebDevelopmentPopup,
  MobileAppPopup,
  EcommercePopup,
  SignUpPopup,
  ContactPopup,
  NewsletterPopup,
  FreeConsultationPopup,
  SpecialOfferPopup,
  usePopupManager,
  getPopupTitle
} from '../marketing'

export function MarketingPopupManager() {
  const { popup, closePopup, openPopup } = usePopupManager()

  // Auto-trigger newsletter popup after 30 seconds (first visit only)
  useEffect(() => {
    const hasSeenNewsletter = localStorage.getItem('newsletter-popup-seen')
    
    if (!hasSeenNewsletter) {
      const timer = setTimeout(() => {
        openPopup('newsletter')
        console.log('Opening newsletter popup...')
        localStorage.setItem('newsletter-popup-seen', 'true')
      }, 30000) // 30 seconds

      return () => clearTimeout(timer)
    }
  }, [openPopup])

  // Expose global function to open popups
  useEffect(() => {
    ;(window as any).openMarketingPopup = openPopup
  }, [openPopup])

  const renderPopupContent = () => {
    switch (popup.type) {
      case 'web-development':
        return <WebDevelopmentPopup />
      case 'mobile-app':
        return <MobileAppPopup />
      case 'ecommerce':
        return <EcommercePopup />
      case 'signup':
        return <SignUpPopup />
      case 'contact':
        return <ContactPopup />
      case 'newsletter':
        return <NewsletterPopup />
      case 'free-consultation':
        return <FreeConsultationPopup />
      case 'special-offer':
        return <SpecialOfferPopup />
      default:
        return null
    }
  }

  return (
    <AnimatePresence>
      {popup.isOpen && popup.type && (
        <PopupModal
          isOpen={popup.isOpen}
          onClose={closePopup}
          title={getPopupTitle(popup.type)}
          maxWidth={
            popup.type === 'signup' || popup.type === 'contact' || popup.type === 'free-consultation'
              ? 'max-w-6xl'
              : 'max-w-4xl'
          }
        >
          {renderPopupContent()}
        </PopupModal>
      )}
    </AnimatePresence>
  )
}

// Helper function to trigger popups from anywhere in the app
export const triggerMarketingPopup = (type: string) => {
  if (typeof window !== 'undefined' && (window as any).openMarketingPopup) {
    ;(window as any).openMarketingPopup(type)
  }
}
