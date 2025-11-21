'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { WebsiteCalculator } from './WebsiteCalculator';
import { triggerMarketingPopup } from '../components/MarketingPopupManager'
import {
  ArrowUp,
  Calculator,
  MessageCircle,
  Phone,
  Mail,
  Calendar,
  FileText,
  Settings,
  Plus,
  X,
  ExternalLink,
  Sparkles,
  Zap,
  UserPlus,
  CreditCard,
} from 'lucide-react';
import React from 'react';

interface UniversalFloatingNavProps {
  currentPage?: string;
}

export function UniversalFloatingNav({ currentPage = 'home' }: UniversalFloatingNavProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showCalculator, setShowCalculator] = useState(false);

  const [tooltipText, setTooltipText] = useState('');
  const [showIntentTooltip, setShowIntentTooltip] = useState(false);
  const [idleTimer, setIdleTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

  const [incompleteCalculator, setIncompleteCalculator] = useState(false);
  const [incompleteSignup, setIncompleteSignup] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show scroll to top button after 500px
      setShowScrollTop(currentScrollY > 500);

      // Hide/show based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setIsVisible(false);
        setIsExpanded(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

    // --- Adaptive CTA Prioritization (Psychology Based) ---
  // useEffect(() => {
  //   const usedCalculator = localStorage.getItem('usedCalculator');

  //   if (usedCalculator) {
  //     // Move calculator higher if user has interacted before
  //     const calculator = quickActions.find(a => a.id === 'calculator');
  //     if (calculator) calculator.priority = 1;
  //   }

  //   // Example: If user came from pricing page
  //   if (document.referrer?.includes('pricing')) {
  //     const quote = quickActions.find(a => a.id === 'quote');
  //     if (quote) quote.priority = 1;
  //   }
  // }, []);

  // --- Intent Detection: Idle User ---
  useEffect(() => {
    const handleUserActivity = () => {
      if (idleTimer) clearTimeout(idleTimer);

      const timer = setTimeout(() => {
        setTooltipText('Need help?');
        setShowIntentTooltip(true);
      }, 5000); // 5 seconds idle

      setIdleTimer(timer);
    };

    window.addEventListener('mousemove', handleUserActivity);
    window.addEventListener('scroll', handleUserActivity);
    window.addEventListener('keydown', handleUserActivity);

    return () => {
      if (idleTimer) clearTimeout(idleTimer);

      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('scroll', handleUserActivity);
      window.removeEventListener('keydown', handleUserActivity);
    };
  }, []);

  // --- Intent Detection: Page Context ---
  useEffect(() => {
    const url = window.location.pathname.toLowerCase();

    if (url.includes('pricing')) {
      setTooltipText('Get a custom quote?');
      setShowIntentTooltip(true);
    } else if (url.includes('blog')) {
      setTooltipText('Boost your website for free?');
      setShowIntentTooltip(true);
    }
  }, [currentPage]);

  // --- Detect user closed signup popup ---
  useEffect(() => {
  const handler = () => setIncompleteSignup(true);
  window.addEventListener('signup-popup-closed', handler);
  return () => window.removeEventListener('signup-popup-closed', handler);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setIsExpanded(false);
  };

  const openOffer = () => {
  triggerMarketingPopup('special-offer')
  setIsExpanded(false)
}

  const openCalculator = () => {
  setShowCalculator(true);
  setIncompleteCalculator(false); // user resumes
  setIsExpanded(false);
};

  const openSupport = () => {
    // Open support chat or contact
    window.open('#/contact', '_blank');
    setIsExpanded(false);
  };

  const openSignup = () => {
  triggerMarketingPopup('signup');
  setIncompleteSignup(false); // user resumed
  setIsExpanded(false);
};


  const subscribe = () => {
    triggerMarketingPopup('newsletter')
    setIsExpanded(false);
  };

  const callUs = () => {
    triggerMarketingPopup('free-consultation')
    setIsExpanded(false);
  };

  const viewQuote = () => {
    // Navigate to quotation page
    window.location.hash = '/quotation';
    setIsExpanded(false);
  };

  const quickActions = useMemo(() => [
    {
      id: 'scroll-top',
      icon: ArrowUp,
      label: 'Back to Top',
      action: scrollToTop,
      color: 'from-purple-500 to-pink-500',
      show: showScrollTop,
      priority: 8,
    },
    {
      id: 'special-offer',
      icon: Sparkles,
      label: 'Unlock Limited-Time Deal',
      action: openOffer,
      color: 'from-amber-700 to-rose-500',
      show: true,
      priority: 1,
      pulse: true,
    },
    {
      id: 'calculator',
      icon: Calculator,
      label: incompleteCalculator ? 'Continue Estimate' : 'Estimate My Website Cost',
      action: openCalculator,
      color: 'from-blue-700 via-cyan-400 to-blue-400',
      show: true,
      priority: 2,
      badge: incompleteCalculator ? 'Pending' : 'New',
    },
    
    {
      id: 'support',
      icon: MessageCircle,
      label: 'Talk to a Human',
      action: openSupport,
      color: 'from-green-800 to-emerald-400',
      show: true,
      priority: 4,
      pulse: true,
    },
    {
      id: 'email',
      icon: Mail,
      label: 'Get Free Weekly Tips',
      action: subscribe,
      color: 'from-rose-700 to-orange-400',
      show: true,
      priority: 7,
    },
    {
      id: 'call',
      icon: Phone,
      label: 'Book Free Strategy Call',
      action: callUs,
      color: 'from-fuchsia-500 via-purple-500 to-purple-600',
      show: true,
      priority: 5,
    },
    {
      id: 'opensignup',
      icon: UserPlus,
      label: incompleteSignup ? 'Complete Your Free Account' : 'Create My Free Account',
      action: openSignup,
      color: 'from-sky-700 to-indigo-500',
      show: currentPage !== 'dashboard',
      priority: 6,
      badge: incompleteSignup ? 'Pending' : undefined,
    },
    {
      id: 'quote',
      icon: FileText,
      label: 'Get Custom Quotation',
      action: viewQuote,
      color: 'from-pink-700 via-pink-500 to-rose-500',
      show: currentPage !== 'pricing',
      priority: 3,
    },
  ], [showScrollTop, incompleteCalculator, incompleteSignup, currentPage]);

  // --- CTA GROUPING (Psychology Optimized) ---
  const primaryActionIDs = ['special-offer', 'calculator', 'support', 'call'];
  const [isMExpanded, setIsMExpanded] = useState(false);
  const primaryActions = useMemo(
    () => quickActions.filter(a => primaryActionIDs.includes(a.id) && a.show),
    [quickActions]
  );

  const secondaryActions = useMemo(
    () => quickActions.filter(a => !primaryActionIDs.includes(a.id) && a.show),
    [quickActions]
  );

  const visibleActions = useMemo(() => {
  if (isMExpanded) {
    // Show all primary + secondary actions
    return [...primaryActions, ...secondaryActions.sort((a, b) => a.priority - b.priority)];
  } else {
    // Collapsed: show only top 3 primary actions
    return primaryActions.slice(0, 4);
  }
}, [isMExpanded, primaryActions, secondaryActions]);


const showMoreButton = !isMExpanded && secondaryActions.length > 0;


  // if (!isVisible) return null;

  return (
    <>
      {/* Background overlay when expanded */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsExpanded(false)}
          />
        )}
      </AnimatePresence>

      <motion.div
        className="fixed bottom-6 right-6 z-40"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0.8,
          y: isVisible ? 0 : 20,
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Quick Actions Menu */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="absolute bottom-20 right-0 space-y-3"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.3, staggerChildren: 0.05 }}
            >
              <div className="space-y-3">
              {visibleActions.map((action, index) => (
                <motion.div
                  key={action.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center space-x-3 justify-end group"
                >
                  {/* Action Label */}
                  <motion.div
                    className="glass rounded-xl px-4 py-2 border border-white/20 backdrop-blur-xl opacity-40 group-hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ scale: 1.05, x: -5 }}
                  >
                    <span className="text-sm text-white font-medium whitespace-nowrap">
                      {action.label}
                      {action.badge && (
                        <span className="ml-2 px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-xs font-bold text-black rounded-full">
                          {action.badge}
                        </span>
                      )}
                    </span>
                  </motion.div>
                  

                  {/* Action Button */}
                  <motion.button
                    onClick={action.action}
                    className={`relative w-12 h-12 rounded-xl bg-gradient-to-r ${action.color} flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group/btn quick-action-button ${action.pulse ? 'support-active' : ''} ${action.id === 'support' ? 'notification-pulse' : ''}`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                    <action.icon className="w-5 h-5 relative z-10" />

                    {/* Pulse ring for support */}
                    {action.pulse && (
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-blue-600 animate-ping" />
                )}
                
                  </motion.button>
                </motion.div>
              ))}
             {/* More / See Less Actions Button */}
            <AnimatePresence>
              {(!isMExpanded && showMoreButton) || isExpanded ? (
                <motion.button
                  onClick={() => setIsMExpanded(!isMExpanded)}
                  className="relative w-full py-2 px-4 rounded-xl text-white font-medium backdrop-blur-xl bg-white/100 border border-white/100 shadow-lg overflow-hidden flex items-center justify-center space-x-2 group"
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.8 }}
                  transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
                >
                  <motion.span
                    className="relative z-10 text-white font-semibold text-sm tracking-wide"
                    animate={{ textShadow: [
                      '0 0 4px rgba(255,192,203,0.5), 0 0 8px rgba(255,192,203,0.3)',
                      '0 0 8px rgba(255,192,203,0.8), 0 0 16px rgba(255,192,203,0.5)',
                      '0 0 4px rgba(255,192,203,0.5), 0 0 8px rgba(255,192,203,0.3)'
                    ]}}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    {isMExpanded ? 'See Less Actions' : 'More Actions'}
                  </motion.span>

                  {/* Arrow */}
                  <motion.span
                    className="relative z-10"
                    animate={{ rotate: isMExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    ▼
                  </motion.span>

                  {/* Glow / pulse effect */}
                  {/* <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400 via-blue-400 to-pink-500 opacity-20 animate-pulse"></span> */}
                </motion.button>
              ) : null}
            </AnimatePresence>

              </div>

              {/* Quick Stats */}
              <motion.div
                className=" glass rounded-xl p-4 border border-white/20 backdrop-blur-xl max-w-xs"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="text-sm text-white space-y-2">
                  
                  <div className="space-y-1 text-xs text-gray-300">
                    
                    <div className="flex justify-between">
                      <div className="flex items-center space-x-2">
                      <Sparkles className="w-4 h-4 text-yellow-400" />
                      <span>Free Consultation:</span>
                      </div>
                      <span className="text-cyan-400 font-semibold">Available</span>
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-white/10">
                    <div className="flex items-center justify-center space-x-2 text-xs text-purple-300">
                      <Zap className="w-3 h-3" />
                      <span>Powered by KODEGROVE</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main FAB Button */}
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className="relative w-16 h-16 gradient-electric rounded-xl flex items-center justify-center text-white shadow-lg hover:shadow-xl overflow-hidden group magnetic fab-main"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{ rotate: isExpanded ? 135 : 0 }}
          transition={{ duration: 0.3, type: 'spring', stiffness: 200 }}
        >
          
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

          {/* Icon */}
          <motion.div
            className="relative z-10"
            animate={{ rotate: isExpanded ? 45 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isExpanded ? <X className="w-7 h-7" /> : <Plus className="w-7 h-7" />}
          </motion.div>

          {/* Notification dot for new features */}
          <motion.div
            className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.button>

        {/* Helper tooltip on first visit */}
        {/* Intent-Based Tooltip */}
        <AnimatePresence>
          {!isExpanded && showIntentTooltip && (
            <motion.div
              className="absolute -top-16 right-0 glass rounded-lg px-3 py-2 border border-white/20 backdrop-blur-xl min-w-max"
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-xs text-white text-center">
                <span>{tooltipText}</span>
              </div>
              {/* Arrow pointing down */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white/20"></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        
      </motion.div>

      {/* Website Calculator Modal */}
      <WebsiteCalculator
        isOpen={showCalculator}
        onClose={() => {
          setShowCalculator(false);
          setIncompleteCalculator(true); // user left mid-process
        }}
      />

    </>
  );
}
