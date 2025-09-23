'use client'

import { motion } from 'framer-motion'
import { 
  ResponsiveCard, 
  ResponsiveCardGrid, 
  ResponsiveCardMasonry, 
  AdaptiveCard,
  ResponsiveCardHeader,
  ResponsiveCardContent,
  ResponsiveCardFooter,
  ResponsiveCardTitle,
  ResponsiveCardDescription
} from './ui/responsive-card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { 
  Smartphone, 
  Tablet, 
  Monitor, 
  Layout, 
  Grid3X3, 
  Columns, 
  Sparkles,
  ArrowUpRight,
  Eye,
  Heart,
  Share2
} from 'lucide-react'
import React from 'react'
// Demo data for showcase
const showcaseCards = [
  {
    id: 1,
    title: 'Responsive Design',
    description: 'Cards that adapt beautifully to any screen size, from mobile to desktop.',
    icon: Smartphone,
    gradient: 'from-blue-500 to-cyan-500',
    stats: { views: 1234, likes: 89 }
  },
  {
    id: 2,
    title: 'Flexible Layouts',
    description: 'Dynamic grid systems that reorganize content based on viewport dimensions.',
    icon: Layout,
    gradient: 'from-purple-500 to-pink-500',
    stats: { views: 2456, likes: 156 }
  },
  {
    id: 3,
    title: 'Adaptive Content',
    description: 'Content that scales, truncates, and reflows intelligently across breakpoints.',
    icon: Grid3X3,
    gradient: 'from-green-500 to-emerald-500',
    stats: { views: 3789, likes: 234 }
  },
  {
    id: 4,
    title: 'Mobile-First',
    description: 'Built with mobile-first principles for optimal performance on all devices.',
    icon: Monitor,
    gradient: 'from-orange-500 to-red-500',
    stats: { views: 1567, likes: 98 }
  },
  {
    id: 5,
    title: 'Masonry Layouts',
    description: 'Pinterest-style masonry grids that handle varying content heights elegantly.',
    icon: Columns,
    gradient: 'from-indigo-500 to-purple-500',
    stats: { views: 2234, likes: 167 }
  },
  {
    id: 6,
    title: 'Interactive Elements',
    description: 'Smooth animations and hover effects that enhance user engagement.',
    icon: Sparkles,
    gradient: 'from-pink-500 to-rose-500',
    stats: { views: 4567, likes: 345 }
  }
]

interface ResponsiveCardShowcaseProps {
  showControls?: boolean
  maxCards?: number
}

export function ResponsiveCardShowcase({ showControls = true, maxCards }: ResponsiveCardShowcaseProps) {
  const displayCards = maxCards ? showcaseCards.slice(0, maxCards) : showcaseCards

  return (
    <div className="space-y-8 lg:space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <motion.h2 
          className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Responsive Card System
        </motion.h2>
        <motion.p 
          className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Cards that adapt seamlessly across all screen sizes with fluid layouts and intelligent content management.
        </motion.p>
      </div>

      {/* Device Preview */}
      {showControls && (
        <motion.div 
          className="flex justify-center space-x-4 sm:space-x-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {[
            { icon: Smartphone, label: 'Mobile', size: 'sm' },
            { icon: Tablet, label: 'Tablet', size: 'md' },
            { icon: Monitor, label: 'Desktop', size: 'lg' }
          ].map(({ icon: Icon, label, size }, index) => (
            <div key={label} className="flex flex-col items-center space-y-2">
              <div className={`w-12 h-12 sm:w-16 sm:h-16 glass rounded-2xl flex items-center justify-center text-purple-400 hover:text-white hover:bg-purple-500/20 transition-all duration-300 cursor-pointer`}>
                <Icon className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <span className="text-xs sm:text-sm text-gray-400 font-medium">{label}</span>
            </div>
          ))}
        </motion.div>
      )}

      {/* Standard Grid Layout */}
      <div>
        <motion.h3 
          className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Responsive Grid Layout
        </motion.h3>
        
        <ResponsiveCardGrid columns={3} gap="lg">
          {displayCards.map((card, index) => {
            const Icon = card.icon
            return (
              <ResponsiveCard
                key={card.id}
                variant="glass"
                size="md"
                hover={true}
                animation={true}
                index={index}
                className="group"
              >
                <ResponsiveCardHeader responsive={true}>
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                      <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <ResponsiveCardTitle size="md" className="text-white group-hover:text-purple-300 transition-colors duration-300">
                        {card.title}
                      </ResponsiveCardTitle>
                    </div>
                  </div>
                </ResponsiveCardHeader>

                <ResponsiveCardContent spacing="md">
                  <ResponsiveCardDescription className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                    {card.description}
                  </ResponsiveCardDescription>
                </ResponsiveCardContent>

                <ResponsiveCardFooter direction="responsive">
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{card.stats.views.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Heart className="w-4 h-4" />
                      <span>{card.stats.likes}</span>
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10 group/btn">
                    <span>Explore</span>
                    <ArrowUpRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
                  </Button>
                </ResponsiveCardFooter>
              </ResponsiveCard>
            )
          })}
        </ResponsiveCardGrid>
      </div>

      {/* Masonry Layout */}
      <div>
        <motion.h3 
          className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          Masonry Layout
        </motion.h3>
        
        <ResponsiveCardMasonry columns={{ sm: 1, md: 2, lg: 3, xl: 4 }} gap="lg">
          {displayCards.map((card, index) => {
            const Icon = card.icon
            // Vary card heights for masonry effect
            const heights = ['h-64', 'h-72', 'h-80', 'h-60', 'h-68', 'h-76']
            const randomHeight = heights[index % heights.length]
            
            return (
              <div key={`masonry-${card.id}`} className="break-inside-avoid mb-6 lg:mb-8">
                <ResponsiveCard
                  variant="glass"
                  size="full"
                  hover={true}
                  animation={true}
                  index={index}
                  className={`group ${randomHeight}`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-500 rounded-xl`} />
                  
                  <ResponsiveCardHeader responsive={false}>
                    <div className="flex items-center justify-between">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center`}>
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <Badge variant="outline" className="border-white/20 text-gray-300 text-xs">
                        Featured
                      </Badge>
                    </div>
                  </ResponsiveCardHeader>

                  <ResponsiveCardContent spacing="md">
                    <ResponsiveCardTitle size="lg" className="text-white group-hover:text-purple-300 transition-colors duration-300 mb-3">
                      {card.title}
                    </ResponsiveCardTitle>
                    <ResponsiveCardDescription className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300 line-clamp-3">
                      {card.description} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </ResponsiveCardDescription>
                  </ResponsiveCardContent>

                  <ResponsiveCardFooter direction="row">
                    <div className="flex items-center space-x-3">
                      <button className="w-8 h-8 glass rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors duration-300">
                        <Heart className="w-4 h-4" />
                      </button>
                      <button className="w-8 h-8 glass rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors duration-300">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="text-xs text-gray-500">
                      {card.stats.views.toLocaleString()} views
                    </div>
                  </ResponsiveCardFooter>
                </ResponsiveCard>
              </div>
            )
          })}
        </ResponsiveCardMasonry>
      </div>

      {/* Adaptive Cards */}
      <div>
        <motion.h3 
          className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          Adaptive Layout Cards
        </motion.h3>
        
        <div className="space-y-6 lg:space-y-8">
          {displayCards.slice(0, 3).map((card, index) => {
            const Icon = card.icon
            return (
              <AdaptiveCard
                key={`adaptive-${card.id}`}
                layout="adaptive"
                variant="glass"
                size="full"
                hover={true}
                animation={true}
                index={index}
                className="group"
              >
                {/* Image/Icon Section */}
                <div className="w-full lg:w-80 flex-shrink-0 relative">
                  <div className={`w-full h-48 lg:h-64 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center relative overflow-hidden`}>
                    <Icon className="w-16 h-16 lg:w-20 lg:h-20 text-white/80" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 flex flex-col justify-between space-y-4 lg:space-y-6">
                  <div>
                    <ResponsiveCardTitle size="xl" className="text-white group-hover:text-purple-300 transition-colors duration-300 mb-4">
                      {card.title}
                    </ResponsiveCardTitle>
                    <ResponsiveCardDescription className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300 text-lg leading-relaxed">
                      {card.description} This adaptive layout automatically switches between vertical and horizontal arrangements based on screen size, providing optimal readability and visual hierarchy.
                    </ResponsiveCardDescription>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
                    <div className="flex items-center space-x-6 text-sm text-gray-400">
                      <div className="flex items-center space-x-2">
                        <Eye className="w-4 h-4" />
                        <span>{card.stats.views.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Heart className="w-4 h-4" />
                        <span>{card.stats.likes}</span>
                      </div>
                    </div>
                    
                    <Button className="gradient-electric hover:shadow-2xl hover:shadow-purple-500/30 text-white px-6 py-3 rounded-xl font-semibold group/btn">
                      <span>Learn More</span>
                      <ArrowUpRight className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" />
                    </Button>
                  </div>
                </div>
              </AdaptiveCard>
            )
          })}
        </div>
      </div>

      {/* Features Grid */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-12 lg:mt-16"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        {[
          { title: 'Mobile-First', desc: 'Optimized for touch interfaces' },
          { title: 'Fluid Layouts', desc: 'Adapts to any screen size' },
          { title: 'Content-Aware', desc: 'Intelligent text truncation' },
          { title: 'Performance', desc: 'Optimized animations & interactions' }
        ].map((feature, index) => (
          <ResponsiveCard
            key={feature.title}
            variant="minimal"
            size="sm"
            hover={true}
            animation={true}
            index={index}
            className="text-center group"
          >
            <ResponsiveCardContent spacing="sm">
              <div className="w-12 h-12 mx-auto mb-4 glass rounded-2xl flex items-center justify-center text-purple-400 group-hover:text-white group-hover:bg-purple-500/20 transition-all duration-300">
                <Sparkles className="w-6 h-6" />
              </div>
              <h4 className="font-semibold text-white mb-2">{feature.title}</h4>
              <p className="text-sm text-gray-400">{feature.desc}</p>
            </ResponsiveCardContent>
          </ResponsiveCard>
        ))}
      </motion.div>
    </div>
  )
}