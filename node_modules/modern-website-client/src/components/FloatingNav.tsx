'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowUp,
  Grid3X3,
  Filter,
  Search,
  Plus,
  X
} from 'lucide-react'

import { QuickActionButton } from './QuickActionButton'
import { PortfolioTooltip } from './PortfolioTooltip'

interface FloatingNavProps {
  onScrollToTop: () => void
  onToggleFilter: () => void
  onToggleSearch: () => void
  onShowAllProjects: () => void
  totalProjects: number
  filteredCount: number
}

export function FloatingNav({
  onScrollToTop,
  onToggleFilter,
  onToggleSearch,
  onShowAllProjects,
  totalProjects,
  filteredCount
}: FloatingNavProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const quickActions = [
    {
      icon: ArrowUp,
      label: 'Scroll to Top',
      action: onScrollToTop,
      color: 'from-purple-500 to-pink-500',
      show: showScrollTop
    },
    {
      icon: Search,
      label: 'Search Projects',
      action: onToggleSearch,
      color: 'from-blue-500 to-cyan-500',
      show: true
    },
    {
      icon: Filter,
      label: 'Filter Categories',
      action: onToggleFilter,
      color: 'from-green-500 to-emerald-500',
      show: true
    },
    {
      icon: Grid3X3,
      label: 'View All Projects',
      action: onShowAllProjects,
      color: 'from-yellow-500 to-orange-500',
      show: true
    }
  ]

  const visibleActions = quickActions.filter(action => action.show)

  return (
    <div className="fixed bottom-8 right-8 z-40">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="absolute bottom-20 right-0 space-y-4"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            {visibleActions.map((action, index) => (
              <QuickActionButton className="flex items-center flex-row-reverse space-x-reverse space-x-3"

                key={action.label}
                label={action.label}
                Icon={action.icon}
                color={action.color}
                onClick={action.action}
                delay={index * 0.05}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        aria-label={isExpanded ? 'Close Menu' : 'Open Menu'}
        tabIndex={0}
        className="w-16 h-16 gradient-electric rounded-2xl flex items-center justify-center text-white shadow-lg hover:shadow-xl relative overflow-hidden group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{ rotate: isExpanded ? 45 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <motion.div
          className="relative z-10"
          animate={{ rotate: isExpanded ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isExpanded ? <X className="w-7 h-7" /> : <Plus className="w-7 h-7" />}
        </motion.div>

        {/* Badge showing filtered count */}
        {filteredCount !== totalProjects && (
          <motion.div
            key={filteredCount}
            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500 }}
          >
            <span className="text-xs text-white font-bold">
              {filteredCount}
            </span>
          </motion.div>
        )}
      </motion.button>

      {/* Stats Tooltip */}
      <AnimatePresence>
        {isExpanded && filteredCount !== totalProjects && (
          <PortfolioTooltip
            totalProjects={totalProjects}
            filteredCount={filteredCount}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
