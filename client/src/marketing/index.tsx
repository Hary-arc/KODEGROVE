'use client';

import { ContactPopup } from './pages/ContactPopup';
import { EcommercePopup } from './pages/EcommercePopup';
import { FreeConsultationPopup } from './pages/FreeConsultationPopup';
import { MobileAppPopup } from './pages/MobileAppPopup';
import { NewsletterPopup } from './pages/NewsletterPopup';
import { SignUpPopup } from './pages/SignUpPopup';
import { SpecialOfferPopup } from './pages/SpecialOfferPopup';
import { WebDevelopmentPopup } from './pages/WebDevelopmentPopup';

// Marketing Components
export { PopupModal } from './components/PopupModal';

// Marketing Pages
export { WebDevelopmentPopup } from './pages/WebDevelopmentPopup'
export { MobileAppPopup } from './pages/MobileAppPopup'
export { EcommercePopup } from './pages/EcommercePopup'
export { SignUpPopup } from './pages/SignUpPopup'
export { ContactPopup } from './pages/ContactPopup'
export { NewsletterPopup } from './pages/NewsletterPopup'
export { FreeConsultationPopup } from './pages/FreeConsultationPopup'
export { SpecialOfferPopup } from './pages/SpecialOfferPopup'

// Marketing Hooks
export { usePopupManager } from './hooks/usePopupManager';
export type { PopupType } from './hooks/usePopupManager';

// Marketing Utils
export const getPopupComponent = (type: string) => {
  switch (type) {
    case 'web-development':
      return WebDevelopmentPopup;
    case 'mobile-app':
      return MobileAppPopup;
    case 'ecommerce':
      return EcommercePopup;
    case 'signup':
      return SignUpPopup;
    case 'contact':
      return ContactPopup;
    case 'newsletter':
      return NewsletterPopup;
    case 'free-consultation':
      return FreeConsultationPopup;
    case 'special-offer':
      return SpecialOfferPopup;
    default:
      return null;
  }
};

export const getPopupTitle = (type: string) => {
  switch (type) {
    case 'web-development':
      return 'Web Development Services';
    case 'mobile-app':
      return 'Mobile App Development';
    case 'ecommerce':
      return 'E-Commerce Solutions';
    case 'backend-systems':
      return 'Backend & Infrastructure';
    case 'ui-ux-design':
      return 'UI/UX Design Services';
    case 'security-devops':
      return 'Security & DevOps';
    default:
      return 'Our Services';
  }
};
