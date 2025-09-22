
'use client'

import React, { useEffect, useState, Suspense } from 'react'
import { PerformanceMonitor } from './utils/performance'
import { SEOHead, generateWebsiteSchema } from './components/SEOHead'
import { CriticalCSS } from './components/CriticalCSS'
import { Navigation } from './components/Navigation'
import { Router } from './components/Router'
import { UniversalFloatingNav } from './components/UniversalFloatingNav'
import { siteConfig, navigation, footerLinks } from './data/site-config'

// Lazy load page components for better performance
const EnhancedHomePage = React.lazy(() => import('./pages/EnhancedHomePage').then(module => ({ default: module.EnhancedHomePage })))
const AboutPage = React.lazy(() => import('./pages/AboutPage').then(module => ({ default: module.AboutPage })))
const PortfolioPage = React.lazy(() => import('./pages/PortfolioPage').then(module => ({ default: module.PortfolioPage })))
const ServicesPage = React.lazy(() => import('./pages/ServicesPage').then(module => ({ default: module.ServicesPage })))
const PricingPage = React.lazy(() => import('./pages/PricingPage').then(module => ({ default: module.PricingPage })))
const BlogPage = React.lazy(() => import('./pages/BlogPage').then(module => ({ default: module.BlogPage })))
const ContactPage = React.lazy(() => import('./pages/ContactPage').then(module => ({ default: module.ContactPage })))
const CareersPage = React.lazy(() => import('./pages/CareersPage').then(module => ({ default: module.CareersPage })))
const DashboardPage = React.lazy(() => import('./pages/DashboardPage').then(module => ({ default: module.DashboardPage })))

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
)

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentPage, setCurrentPage] = useState('home')

  useEffect(() => {
    const performanceMonitor = PerformanceMonitor.getInstance()
    performanceMonitor.mark('app-start')
    
    // Preload critical resources
    performanceMonitor.preloadCriticalResources()
    
    // Register service worker with faster registration
    if ('serviceWorker' in navigator && 'production' === import.meta.env.MODE) {
      navigator.serviceWorker.register('/sw.js', { scope: '/' })
        .then(() => console.log('SW registered'))
        .catch(() => console.log('SW registration failed'))
    }
    
    // Optimize initial render
    const initializeApp = () => {
      document.documentElement.style.scrollBehavior = 'smooth'
      document.body.style.overflow = 'hidden'
      
      // Faster loading with requestIdleCallback
      const callback = () => {
        setIsLoaded(true)
        document.body.style.overflow = 'auto'
        performanceMonitor.mark('app-loaded')
        performanceMonitor.measure('app-load-time', 'app-start', 'app-loaded')
        performanceMonitor.reportMetrics()
      }

      if ('requestIdleCallback' in window) {
        requestIdleCallback(callback, { timeout: 800 })
      } else {
        setTimeout(callback, 600)
      }
    }

    // Defer non-critical initialization
    requestAnimationFrame(initializeApp)

    // Optimized hash change handler
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || '/'
      const pageName = hash === '/' ? 'home' : hash.split('/')[1] || hash.replace('/', '')
      setCurrentPage(pageName)
    }

    window.addEventListener('hashchange', handleHashChange, { passive: true })
    handleHashChange()

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  // Define routes with lazy loading
  const routes = [
    { path: '/', component: <Suspense fallback={<PageLoader />}><EnhancedHomePage /></Suspense> },
    { path: '/about', component: <Suspense fallback={<PageLoader />}><AboutPage /></Suspense> },
    { path: '/portfolio', component: <Suspense fallback={<PageLoader />}><PortfolioPage /></Suspense> },
    { path: '/services', component: <Suspense fallback={<PageLoader />}><ServicesPage /></Suspense> },
    { path: '/pricing', component: <Suspense fallback={<PageLoader />}><PricingPage /></Suspense> },
    { path: '/blog', component: <Suspense fallback={<PageLoader />}><BlogPage /></Suspense> },
    { path: '/contact', component: <Suspense fallback={<PageLoader />}><ContactPage /></Suspense> },
    { path: '/careers', component: <Suspense fallback={<PageLoader />}><CareersPage /></Suspense> },
    { path: '/dashboard', component: <Suspense fallback={<PageLoader />}><DashboardPage /></Suspense> }
  ]

  return (
    <>
      {/* SEO Head with performance optimization */}
      <SEOHead
        title={`${siteConfig.name} - ${siteConfig.tagline}`}
        description={siteConfig.description}
        keywords={['web development', 'digital agency', 'react', 'typescript', 'design']}
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
        {/* Optimized Background with will-change */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none will-change-transform">
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

        {/* Router - Main Content */}
        <main className="relative z-10">
          <Router routes={routes} defaultRoute="/" />
        </main>

        {/* Conditionally render floating nav */}
        {isLoaded && <UniversalFloatingNav currentPage={currentPage} />}

        {/* Optimized Footer */}
        <footer className="relative z-10 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 border-t border-white/10">
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
              {/* Brand */}
              <div className="lg:col-span-2">
                <button
                  onClick={() => window.location.hash = '/'}
                  className="flex items-center space-x-3 mb-8 group"
                >
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 via-violet-600 to-purple-700 rounded-full flex items-center justify-center relative overflow-hidden shadow-lg shadow-purple-500/25">
                      <svg 
                        className="w-7 h-7 text-white relative z-10" 
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
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:animate-pulse-glow"></div>
                    </div>
                  </div>
                  <span className="font-outfit text-3xl font-bold bg-gradient-to-r from-white via-purple-200 to-violet-300 bg-clip-text text-transparent">
                    {siteConfig.name}
                  </span>
                </button>
                <p className="text-gray-300 leading-relaxed mb-8 max-w-md text-lg">
                  {siteConfig.description}
                </p>
                <div className="flex space-x-4">
                  {[
                    { name: 'LinkedIn', icon: 'in' },
                    { name: 'Twitter', icon: 'tw' },
                    { name: 'GitHub', icon: 'gh' },
                    { name: 'Dribbble', icon: 'dr' }
                  ].map((social) => (
                    <button
                      key={social.name}
                      className="relative w-12 h-12 glass rounded-xl flex items-center justify-center text-gray-300 hover:text-white transition-all duration-300 group magnetic optimized overflow-hidden"
                    >
                      <span className="relative z-10 text-sm font-medium">
                        {social.icon}
                      </span>
                      <div className="absolute inset-0 gradient-electric opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="font-outfit font-bold text-white mb-8 text-xl">Navigation</h3>
                <div className="space-y-4">
                  {navigation.map((link) => (
                    <button
                      key={link.name}
                      onClick={() => window.location.hash = link.path}
                      className="block text-gray-300 hover:text-white transition-all duration-300 text-left group"
                    >
                      <span className="relative">
                        {link.name}
                        <div className="absolute -bottom-1 left-0 w-0 h-0.5 gradient-electric group-hover:w-full transition-all duration-300"></div>
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div>
                <h3 className="font-outfit font-bold text-white mb-8 text-xl">Connect</h3>
                <div className="space-y-6 text-gray-300">
                  <div className="group">
                    <p className="font-medium text-white mb-2">Email</p>
                    <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-white transition-colors duration-300 block">
                      {siteConfig.contact.email}
                    </a>
                  </div>
                  <div className="group">
                    <p className="font-medium text-white mb-2">Phone</p>
                    <a href={`tel:${siteConfig.contact.phone.replace(/[^\d+]/g, '')}`} className="hover:text-white transition-colors duration-300 block">
                      {siteConfig.contact.phone}
                    </a>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-2">Location</p>
                    <p>{siteConfig.contact.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10 mt-16 pt-8 flex flex-col lg:flex-row justify-between items-center">
              <p className="text-gray-400 font-medium">
                © 2025 {siteConfig.name}. All rights reserved.
              </p>
              <div className="flex space-x-8 mt-4 lg:mt-0">
                {footerLinks.map((item) => (
                  <button key={item} className="text-gray-400 hover:text-white transition-colors duration-300">
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
