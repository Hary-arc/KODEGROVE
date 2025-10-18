'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { UserPlus, Mail, MessageCircle, Calendar, Sparkles } from 'lucide-react'
import { Button } from './ui/button'

interface PopupTriggerButtonsProps {
  onTrigger: (popupType: string) => void
}

export function PopupTriggerButtons({ onTrigger }: PopupTriggerButtonsProps) {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    let lastScrollY = window.scrollY

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      // hide if scrolling down, show if scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setHidden(true)
      } else {
        setHidden(false)
      }
      lastScrollY = currentScrollY
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const triggers = [
    {
      type: 'special-offer',
      label: '🎉 Offer',
      icon: Sparkles,
      gradient: 'from-amber-700 to-rose-500',
      description: 'Limited time deal',
      pulse: true,
    },
    {
      type: 'signup',
      label: 'Sign Up',
      icon: UserPlus,
      gradient: 'from-sky-700 to-indigo-500',
      description: 'Create account',
    },
    {
      type: 'contact',
      label: 'Contact Us',
      icon: MessageCircle,
      gradient: 'from-fuchsia-500 via-purple-500 to-fuchsia-500',
      description: 'Get in touch',
    },
    {
      type: 'newsletter',
      label: 'Newsletter',
      icon: Mail,
      gradient: 'from-orange-400 to-rose-700',
      description: 'Subscribe now',
    },
    {
      type: 'free-consultation',
      label: 'Free Call',
      icon: Calendar,
      gradient: 'from-teal-500 to-emerald-600',
      description: 'Book consultation',
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      animate={{
        opacity: hidden ? 0 : 1,
        y: hidden ? 50 : 0, // slide down when hiding
      }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex flex-row space-x-3"
    >
      {triggers.map((trigger, index) => (
        <motion.div
          key={trigger.type}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
        >
          <Button
            onClick={() => onTrigger(trigger.type)}
            className={`group relative overflow-hidden bg-gradient-to-r ${trigger.gradient}
hover:opacity-90 text-white shadow-lg hover:shadow-xl transition-all duration-300
rounded-full flex items-center justify-center sm:space-x-2 space-x-0 sm:px-4 sm:py-2 px-3 py-3 ${
  trigger.pulse ? 'animate-pulse-glow' : ''
}`}

          >
            <trigger.icon className="w-4 h-4" />
            <span className="hidden sm:inline text-sm">{trigger.label}</span>

            {/* Special offer badge */}
            {trigger.pulse && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-slate-900 animate-ping" />
            )}

            {/* Tooltip for mobile */}
            <div className="sm:hidden absolute right-full mr-2 whitespace-nowrap bg-slate-900 border border-white/10 rounded-lg px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <span className="text-xs text-white">{trigger.description}</span>
            </div>
          </Button>
        </motion.div>
      ))}
    </motion.div>
  )
}
