'use client'

import { useState, useCallback } from 'react'

export type PopupType = 
  | 'web-development'
  | 'mobile-app' 
  | 'ecommerce'
  | 'backend-systems'
  | 'ui-ux-design'
  | 'security-devops'
  | 'signup'
  | 'contact'
  | 'newsletter'
  | 'free-consultation'
  | 'special-offer'
  | null

interface PopupState {
  isOpen: boolean
  type: PopupType
}

export function usePopupManager() {
  const [popup, setPopup] = useState<PopupState>({
    isOpen: false,
    type: null
  })

  const openPopup = useCallback((type: PopupType) => {
    setPopup({
      isOpen: true,
      type
    })
    
    // Prevent body scroll when popup is open
    document.body.style.overflow = 'hidden'
  }, [])

  const closePopup = useCallback(() => {
    setPopup({
      isOpen: false,
      type: null
    })
    
    // Restore body scroll
    document.body.style.overflow = 'unset'
  }, [])

  const isPopupOpen = (type: PopupType) => {
    return popup.isOpen && popup.type === type
  }

  return {
    popup,
    openPopup,
    closePopup,
    isPopupOpen,
    isAnyPopupOpen: popup.isOpen
  }
}