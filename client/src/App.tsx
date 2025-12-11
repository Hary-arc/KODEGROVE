'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { PerformanceMonitor } from './utils/performance';
import { SEOHead, generateWebsiteSchema } from './components/SEOHead';
import { CriticalCSS } from './components/CriticalCSS';
import { Navigation } from './components/Navigation';
import { Router } from './components/Router';
import { MarketingPopupManager, triggerMarketingPopup } from './components/MarketingPopupManager'
//import { PopupTriggerButtons } from './components/PopupTriggerButtons'
import { UniversalFloatingNav } from './components/UniversalFloatingNav';
import { Footer } from './components/Footer';
import { siteConfig, navigation, footerLinks } from './data/site-config';

// Lazy load policy pages
const PrivacyPolicyPage = React.lazy(() => import('./pages/policypages/PrivacyPolicyPage.js').then(m => ({ default: m.PrivacyPolicyPage })));
const CookiePolicyPage = React.lazy(() => import('./pages/policypages/CookiePolicyPage.js').then(m => ({ default: m.CookiePolicyPage })));
const ContentPolicyPage = React.lazy(() => import('./pages/policypages/ContentPolicyPage.js').then(m => ({ default: m.ContentPolicyPage })));
const AcceptableUsePolicyPage = React.lazy(() => import('./pages/policypages/AcceptableUsePolicyPage.js').then(m => ({ default: m.AcceptableUsePolicyPage })));
const RefundPolicyPage = React.lazy(() => import('./pages/policypages/RefundPolicyPage.js').then(m => ({ default: m.RefundPolicyPage })));
const LegalPage = React.lazy(() => import('./pages/policypages/LegalPage.js').then(m => ({ default: m.LegalPage })));

// Lazy load page components for better performance
const EnhancedHomePage = React.lazy(() =>
  import('./pages/EnhancedHomePage.js').then(module => ({ default: module.EnhancedHomePage }))
);
const ServicesPage = React.lazy(() =>
  import('./pages/ServicesPage.js').then(module => ({ default: module.ServicesPage }))
);
const PortfolioPage = React.lazy(() =>
  import('./pages/PortfolioPage.js').then(module => ({ default: module.PortfolioPage }))
);
const AboutPage = React.lazy(() =>
  import('./pages/AboutPage.js').then(module => ({ default: module.AboutPage }))
);
const ContactPage = React.lazy(() =>
  import('./pages/ContactPage.js').then(module => ({ default: module.ContactPage }))
);
const CareersPage = React.lazy(() =>
  import('./pages/CareersPage.js').then(module => ({ default: module.CareersPage }))
);
const PricingPage = React.lazy(() =>
  import('./pages/PricingPage.js').then(module => ({ default: module.PricingPage }))
);
const BlogPage = React.lazy(() =>
  import('./pages/BlogPage.js').then(module => ({ default: module.BlogPage }))
);
const DashboardPage = React.lazy(() =>
  import('./pages/DashboardPage.js').then(module => ({ default: module.DashboardPage }))
);
const AuthPage = React.lazy(() =>
  import('./pages/AuthPage.js').then(m => ({ default: m.AuthPage }))
);
const QuotationPage = React.lazy(() =>
  import('./pages/QuotationPage.js').then(m => ({ default: m.QuotationPage }))
);
const ComingSoonPage = React.lazy(() =>
  import('./pages/ComingSoonPage.js').then(m => ({ default: m.ComingSoonPage }))
);

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="relative">
      <div className="w-16 h-16 border-4 border-transparent border-t-white/60 border-r-white/60 rounded-full animate-spin"></div>
      <div
        className="absolute inset-0 w-16 h-16 border-4 border-transparent border-b-purple-400 border-l-purple-400 rounded-full animate-spin"
        style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}
      ></div>
    </div>
  </div>
);

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    const performanceMonitor = PerformanceMonitor.getInstance();
    performanceMonitor.mark('app-start');

    // Preload critical resources
    performanceMonitor.preloadCriticalResources();

    // Register service worker with better error handling
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker
        .register('/sw.js', { scope: '/' })
        .then(registration => {
          console.log('SW registered successfully:', registration.scope);
        })
        .catch(error => {
          console.warn('SW registration failed:', error);
        });
    }

    // Optimize initial render
    const initializeApp = () => {
      document.documentElement.style.scrollBehavior = 'smooth';
      document.body.style.overflow = 'hidden';

      // Faster loading with requestIdleCallback
      const callback = () => {
        setIsLoaded(true);
        document.body.style.overflow = 'auto';
        performanceMonitor.mark('app-loaded');
        performanceMonitor.measure('app-load-time', 'app-start', 'app-loaded');
        performanceMonitor.reportMetrics();
      };

      if ('requestIdleCallback' in window) {
        requestIdleCallback(callback, { timeout: 800 });
      } else {
        setTimeout(callback, 600);
      }
    };

    // Defer non-critical initialization
    requestAnimationFrame(initializeApp);

    // Optimized hash change handler
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || '/';
      const pageName = hash === '/' ? 'home' : hash.split('/')[1] || hash.replace('/', '');
      setCurrentPage(pageName);
    };

    window.addEventListener('hashchange', handleHashChange, { passive: true });
    handleHashChange();

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);
  // useEffect(() => {
  //   if (isLoaded) {
  //     triggerMarketingPopup('special-offer');
  //     console.log('MarketingPopupManager mounted');
  //   }
  // }, [isLoaded]);



  type RouteConfig = {
    path: string;
    component: React.ReactNode;
  };

  // Define routes with lazy loading
  const routes: RouteConfig[] = [
    {
      path: '/',
      component: (
        <Suspense fallback={<PageLoader />}>
          <EnhancedHomePage />
        </Suspense>
      ),
    },
    {
      path: '/about',
      component: (
        <Suspense fallback={<PageLoader />}>
          <AboutPage />
        </Suspense>
      ),
    },
    {
      path: '/portfolio',
      component: (
        <Suspense fallback={<PageLoader />}>
          <PortfolioPage />
        </Suspense>
      ),
    },
    {
      path: '/services',
      component: (
        <Suspense fallback={<PageLoader />}>
          <ServicesPage />
        </Suspense>
      ),
    },
    {
      path: '/pricing',
      component: (
        <Suspense fallback={<PageLoader />}>
          <PricingPage />
        </Suspense>
      ),
    },
    {
      path: '/blog',
      component: (
        <Suspense fallback={<PageLoader />}>
          <BlogPage />
        </Suspense>
      ),
    },
    {
      path: '/contact',
      component: (
        <Suspense fallback={<PageLoader />}>
          <ContactPage />
        </Suspense>
      ),
    },
    {
      path: '/careers',
      component: (
        <Suspense fallback={<PageLoader />}>
          <CareersPage />
        </Suspense>
      ),
    },
    {
      path: '/dashboard',
      component: (
        <Suspense fallback={<PageLoader />}>
          <DashboardPage />
        </Suspense>
      ),
    },
    {
      path: '/auth',
      component: (
        <Suspense fallback={<PageLoader />}>
          <AuthPage />
        </Suspense>
      ),
    },
    {
      path: '/quotation',
      component: (
        <Suspense fallback={<PageLoader />}>
          <QuotationPage />
        </Suspense>
      ),
    },
    {
      path: '/coming-soon',
      component: (
        <Suspense fallback={<PageLoader />}>
          <ComingSoonPage />
        </Suspense>
      ),
    },
    {
      path: '/privacy-policy',
      component: (
        <Suspense fallback={<PageLoader />}>
          <PrivacyPolicyPage />
        </Suspense>
      )
    },
    {
      path: '/cookie-policy',
      component: (
        <Suspense fallback={<PageLoader />}>
          <CookiePolicyPage />
        </Suspense>
      )
    },
    {
      path: '/content-policy',
      component: (
        <Suspense fallback={<PageLoader />}>
          <ContentPolicyPage />
        </Suspense>
      )
    },
    {
      path: '/acceptable-use-policy',
      component: (
        <Suspense fallback={<PageLoader />}>
          <AcceptableUsePolicyPage />
        </Suspense>
      )
    },
    {
      path: '/refund-policy',
      component: (
        <Suspense fallback={<PageLoader />}>
          <RefundPolicyPage />
        </Suspense>
      )
    },
    {
      path: '/legal',
      component: (
        <Suspense fallback={<PageLoader />}>
          <LegalPage />
        </Suspense>
      )
    }
  ];

  return (
    <>
      {/* SEO Head with performance optimization */}
      <SEOHead
        title={`${siteConfig.name} - ${siteConfig.tagline}`}
        description={siteConfig.description}
        keywords={[
          'web development',
          'digital agency',
          'react',
          'typescript',
          'design',
          'branding',
          'ecommerce',
          'marketing',
          'kodegrove',
        ]}
        canonicalUrl={siteConfig.url}
        schemaData={generateWebsiteSchema(siteConfig)}
      />

      {/* Critical CSS */}
      <CriticalCSS />

      {/* Optimized Loading Screen */}
      {!isLoaded && (
        <div className="loading-screen">
          <div className="loading-spinner"></div>
        </div>
      )}

      <div className="min-h-screen bg-slate-950 text-white relative overflow-x-hidden">
        {/* Optimized Background with will-change and proper positioning */}
        <div
          className="fixed inset-0 overflow-hidden pointer-events-none will-change-transform"
          style={{ position: 'relative' }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900"></div>
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-float will-change-transform"></div>
          <div
            className="absolute top-3/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-float will-change-transform"
            style={{ animationDelay: '2s' }}
          ></div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] will-change-transform"></div>
        </div>

        {/* Navigation */}
        <Navigation />

        {/* Router - Main Content with proper positioning */}
        <main className="relative z-10" style={{ position: 'relative' }}>
          <Router routes={routes} defaultRoute="/" />
        </main>
        {/* Marketing Popup Manager */}

        {isLoaded && <MarketingPopupManager />}

        {/* Conditionally render floating nav */}
        {isLoaded && <UniversalFloatingNav currentPage={currentPage} />}

        {/* Marketing Popup Manager */}


        {/* Popup Trigger Buttons (Demo) */}
        {/* {isLoaded && <PopupTriggerButtons onTrigger={triggerMarketingPopup} />} */}

        {/* Optimized Footer */}
        <Footer />
      </div>
    </>
  );
}
