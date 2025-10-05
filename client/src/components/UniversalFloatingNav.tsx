'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { WebsiteCalculator } from './WebsiteCalculator';
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
  User,
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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setIsExpanded(false);
  };

  const openCalculator = () => {
    setShowCalculator(true);
    setIsExpanded(false);
  };

  const openSupport = () => {
    // Open support chat or contact
    window.open('#/contact', '_blank');
    setIsExpanded(false);
  };

  const scheduleCall = () => {
    // Open calendar booking
    window.open('https://calendly.com/codeflow-consultation', '_blank');
    setIsExpanded(false);
  };

  const sendEmail = () => {
    window.location.href = 'mailto:hello@codeflow.dev?subject=Project Inquiry';
    setIsExpanded(false);
  };

  const callUs = () => {
    window.location.href = 'tel:+15551234567';
    setIsExpanded(false);
  };

  const viewDashboard = () => {
    window.location.hash = '/dashboard';
    setIsExpanded(false);
  };

  const viewQuote = () => {
    // Navigate to quotation page
    window.location.hash = '/quotation';
    setIsExpanded(false);
  };

  const quickActions = [
    {
      id: 'scroll-top',
      icon: ArrowUp,
      label: 'Back to Top',
      action: scrollToTop,
      color: 'from-purple-500 to-pink-500',
      show: showScrollTop,
      priority: 1,
    },
    {
      id: 'calculator',
      icon: Calculator,
      label: 'Website Calculator',
      action: openCalculator,
      color: 'from-blue-500 to-cyan-500',
      show: true,
      priority: 2,
      badge: 'New',
    },
    {
      id: 'support',
      icon: MessageCircle,
      label: 'Live Support',
      action: openSupport,
      color: 'from-green-500 to-emerald-500',
      show: true,
      priority: 3,
      pulse: true,
    },
    {
      id: 'schedule',
      icon: Calendar,
      label: 'Schedule Call',
      action: scheduleCall,
      color: 'from-orange-500 to-red-500',
      show: true,
      priority: 4,
    },
    {
      id: 'email',
      icon: Mail,
      label: 'Send Email',
      action: sendEmail,
      color: 'from-indigo-500 to-purple-500',
      show: true,
      priority: 5,
    },
    {
      id: 'call',
      icon: Phone,
      label: 'Call Now',
      action: callUs,
      color: 'from-teal-500 to-cyan-500',
      show: true,
      priority: 6,
    },
    {
      id: 'dashboard',
      icon: User,
      label: 'Client Portal',
      action: viewDashboard,
      color: 'from-violet-500 to-purple-500',
      show: currentPage !== 'dashboard',
      priority: 7,
    },
    {
      id: 'quote',
      icon: FileText,
      label: 'Get Quotation',
      action: viewQuote,
      color: 'from-pink-500 to-rose-500',
      show: currentPage !== 'pricing',
      priority: 8,
    },
  ];

  const visibleActions = quickActions
    .filter(action => action.show)
    .sort((a, b) => a.priority - b.priority)
    .slice(0, 6); // Show maximum 6 actions

  if (!isVisible) return null;

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
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-400 to-emerald-400 opacity-75 animate-ping" />
                    )}
                  </motion.button>
                </motion.div>
              ))}

              {/* Quick Stats */}
              <motion.div
                className="mt-6 glass rounded-xl p-4 border border-white/20 backdrop-blur-xl max-w-xs"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="text-sm text-white space-y-2">
                  <div className="flex items-center space-x-2 mb-3">
                    <Sparkles className="w-4 h-4 text-yellow-400" />
                    <span className="font-semibold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                      Quick Actions
                    </span>
                  </div>

                  <div className="space-y-1 text-xs text-gray-300">
                    <div className="flex justify-between">
                      <span>Response Time:</span>
                      <span className="text-green-400 font-semibold">&lt; 2 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Support Status:</span>
                      <span className="text-green-400 font-semibold">Online</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Free Consultation:</span>
                      <span className="text-cyan-400 font-semibold">Available</span>
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-white/10">
                    <div className="flex items-center justify-center space-x-2 text-xs text-purple-300">
                      <Zap className="w-3 h-3" />
                      <span>Powered by CodeFlow</span>
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
        <AnimatePresence>
          {!isExpanded && currentPage === 'home' && (
            <motion.div
              className="absolute -top-16 right-0 glass rounded-lg px-3 py-2 border border-white/20 backdrop-blur-xl min-w-max"
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              transition={{ delay: 2, duration: 0.3 }}
            >
              <div className="text-xs text-white text-center">
                <div className="flex items-center space-x-2">
                  <Calculator className="w-3 h-3 text-cyan-400" />
                  <span>Get instant quote & support</span>
                </div>
                <div className="text-purple-300 mt-1">Click to explore</div>
              </div>

              {/* Arrow pointer */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white/20"></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Website Calculator Modal */}
      <WebsiteCalculator isOpen={showCalculator} onClose={() => setShowCalculator(false)} />
    </>
  );
}
