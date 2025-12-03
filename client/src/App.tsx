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
import { siteConfig, navigation, footerLinks } from './data/site-config';

import { PrivacyPolicyPage } from './pages/policypages/PrivacyPolicyPage'

import { CookiePolicyPage } from './pages/policypages/CookiePolicyPage'
import { ContentPolicyPage } from './pages/policypages/ContentPolicyPage'
import { AcceptableUsePolicyPage } from './pages/policypages/AcceptableUsePolicyPage'
import { RefundPolicyPage } from './pages/policypages/RefundPolicyPage'
import { LegalPage } from './pages/policypages/LegalPage'

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
  useEffect(() => {
  if (isLoaded) {
    triggerMarketingPopup('special-offer');
    console.log('MarketingPopupManager mounted');
  }
}, [isLoaded]);



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
    { path: '/privacy-policy', component: <PrivacyPolicyPage /> },
    { path: '/cookie-policy', component: <CookiePolicyPage /> },
    { path: '/content-policy', component: <ContentPolicyPage /> },
    { path: '/acceptable-use-policy', component: <AcceptableUsePolicyPage /> },
    { path: '/refund-policy', component: <RefundPolicyPage /> },
    { path: '/legal', component: <LegalPage /> }
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
        <footer className="relative z-10 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 border-t border-white/10">
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

          {/* Footer Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20">
            {/* Top Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {/* Brand Logo & Description */}
              <div className="lg:border-r lg:border-white/10 lg:pr-8">
                <a href="/" className="flex items-center gap-4 group mb-6">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-purple-500 via-violet-600 to-purple-700 flex items-center justify-center shadow-lg shadow-purple-500/30">
                    <svg
                      className="w-7 h-7 text-white z-10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M12 2L8 8l4 6 4-6-4-6z" />
                      <path d="M8 8l-2 3 2 3" />
                      <path d="M16 8l2 3-2 3" />
                      <path d="M6 14l-2 2 2 2" />
                      <path d="M18 14l2 2-2 2" />
                      <path d="M12 14v8" />
                    </svg>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:animate-glass-shine" />
                  </div>
                  <span className="text-3xl font-bold font-outfit bg-gradient-to-r from-white via-purple-200 to-violet-300 bg-clip-text text-transparent">
                    {siteConfig.name}
                  </span>
                </a>

                <p className="text-gray-400 leading-relaxed mb-6 max-w-sm text-lg">
                  {siteConfig.description}
                </p>

                {/* Social Icons */}
                <div className="flex gap-4">
                  {[
                    { name: 'LinkedIn', icon: 'in', link: 'https://linkedin.com' },
                    { name: 'Twitter', icon: 'tw', link: 'https://twitter.com' },
                    { name: 'GitHub', icon: 'gh', link: 'https://github.com' },
                    { name: 'Dribbble', icon: 'dr', link: 'https://dribbble.com' },
                  ].map(social => (
                    <a
                      key={social.name}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className="relative w-12 h-12 rounded-xl flex items-center justify-center text-gray-300 hover:text-white transition group overflow-hidden bg-white/5 backdrop-blur-sm"
                    >
                      <span className="z-10 text-sm font-semibold">{social.icon}</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Main Services */}
              <div className="lg:border-r lg:border-white/10 lg:px-8">
                <h3 className="font-outfit font-bold text-white text-xl mb-6">Main Services</h3>
                <ul className="space-y-4 text-gray-300">
                  {[
                    { name: 'Custom Web Design', path: '/services/custom-web-design' },
                    { name: 'Branding Services', path: '/services/branding' },
                    { name: 'eCommerce Design', path: '/services/ecommerce-design' },
                    { name: 'Shopify Website Design', path: '/services/shopify' },
                    { name: 'WordPress Web Design', path: '/services/wordpress' },
                    { name: 'Digital Marketing', path: '/services/digital-marketing' },
                  ].map(item => (
                    <li key={item.name}>
                      <a href={item.path} className="hover:text-white transition">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Apps & Development */}
              <div className="lg:border-r lg:border-white/10 lg:px-8">
                <h3 className="font-outfit font-bold text-white text-xl mb-6">
                  Apps & Development
                </h3>
                <ul className="space-y-4 text-gray-300">
                  {[
                    { name: 'Website Cost Calculator', path: '/apps/cost-calculator' },
                    { name: 'Conversion Rate Calculator', path: '/apps/conversion-calculator' },
                    { name: 'Custom Web Development', path: '/development/custom' },
                    { name: 'Magento Development', path: '/development/magento' },
                    { name: 'eCommerce Development', path: '/development/ecommerce' },
                    { name: 'WooCommerce Development', path: '/development/woocommerce' },
                  ].map(item => (
                    <li key={item.name}>
                      <a href={item.path} className="hover:text-white transition">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company */}
              <div className="lg:pl-8">
                <h3 className="font-outfit font-bold text-white text-xl mb-6">Company</h3>
                <ul className="space-y-4 text-gray-300">
                  {[
                    { name: 'About Us', path: '/about' },
                    { name: 'Case Studies', path: '/case-studies' },
                    { name: 'Digital Trends', path: '/blog/digital-trends' },
                    { name: 'Top Companies', path: '/top-companies' },
                    { name: 'Reviews', path: '/reviews' },
                    { name: 'Sitemap', path: '/#/coming-soon' },
                    { name: 'Locations', path: '/locations' },
                    { name: 'Contact Us', path: '/contact' },
                  ].map(item => (
                    <li key={item.name}>
                      <a href={item.path} className="hover:text-white transition">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Locations Section */}
            <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 text-gray-300 border-t border-white/10 pt-12">
              <div className="lg:border-r lg:border-white/10 lg:pr-8 mb-8 lg:mb-0">
                <p className="text-3xl font-bold text-white">MI</p>
                <p className="font-semibold">Miami</p>
                <p>17975 Collins Avenue</p>
                <p>Sunny Isles Beach, FL 33160</p>
              </div>
              <div className="lg:border-r lg:border-white/10 lg:px-8 mb-8 lg:mb-0">
                <p className="text-3xl font-bold text-white">NY</p>
                <p className="font-semibold">New York</p>
                <p>18 West 18th Street</p>
                <p>New York, NY 10011</p>
              </div>
              <div className="lg:border-r lg:border-white/10 lg:px-8 mb-8 lg:mb-0">
                <p className="text-3xl font-bold text-white">CH</p>
                <p className="font-semibold">Chicago</p>
                <p>625 W Adams St</p>
                <p>Chicago, IL 60661</p>
              </div>
              <div className="lg:pl-8">
                <p className="text-3xl font-bold text-white">CA</p>
                <p className="font-semibold">California</p>
                <p>600 B St</p>
                <p>San Diego, CA 92101</p>
              </div>
            </div>

            {/* Footer Bottom */}
            <div className="mt-16 pt-8 border-t border-white/10 flex flex-col lg:flex-row justify-between items-center gap-6">
              <p className="text-gray-500 text-sm">
                © 2025 {siteConfig.name}. All rights reserved.
              </p>
              <div className="flex flex-wrap gap-6 text-gray-400 text-sm">
                <button  onClick={() => {
                    window.location.hash = '/privacy-policy';
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition"
                >
                  Privacy Policy
                </button>
                <button onClick={() => {
                  window.location.hash = '/cookie-policy';
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }} className="hover:text-white transition"
                >
                  Manage Your Consent
                </button>
                <button onClick={() => {
                  window.location.hash = '/refund-policy';
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }} className="hover:text-white transition"
                >
                  Accessibility
                </button>
                <a href="tel:+91 7817942713" className="hover:text-white transition">
                  Call us at (781) 794-2713
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
