'use client'

// Marketing Components
export { PopupModal } from './components/PopupModal'

// Marketing Pages
export { WebDevelopmentPopup } from './pages/WebDevelopmentPopup'
export { MobileAppPopup } from './pages/MobileAppPopup'
export { EcommercePopup } from './pages/EcommercePopup'

// Marketing Hooks
export { usePopupManager } from './hooks/usePopupManager'
export type { PopupType } from './hooks/usePopupManager'

// Marketing Utils
export const getPopupComponent = (type: string) => {
  switch (type) {
    case 'web-development':
      return WebDevelopmentPopup
    case 'mobile-app':
      return MobileAppPopup
    case 'ecommerce':
      return EcommercePopup
    default:
      return null
  }
}

export const getPopupTitle = (type: string) => {
  switch (type) {
    case 'web-development':
      return 'Web Development Services'
    case 'mobile-app':
      return 'Mobile App Development'
    case 'ecommerce':
      return 'E-Commerce Solutions'
    case 'backend-systems':
      return 'Backend & Infrastructure'
    case 'ui-ux-design':
      return 'UI/UX Design Services'
    case 'security-devops':
      return 'Security & DevOps'
    default:
      return 'Our Services'
  }
}