'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { ResponsiveCard, ResponsiveCardHeader, ResponsiveCardContent, ResponsiveCardFooter, ResponsiveCardTitle, ResponsiveCardDescription } from './ui/responsive-card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { ArrowUpRight, Check, Star, Clock, Users } from 'lucide-react'

interface ServiceCardProps {
  service: {
    id: string
    title: string
    description: string
    icon: React.ComponentType<{ className?: string }>
    features: string[]
    price?: {
      from: number
      period: string
    }
    duration?: string
    teamSize?: string
    rating?: number
    popular?: boolean
    gradient: string
  }
  index: number
  onLearnMore?: (serviceId: string) => void
}

export function ServiceCard({ service, index, onLearnMore }: ServiceCardProps) {
  const Icon = service.icon

  return (
    <ResponsiveCard
      variant="glass"
      size="lg"
      hover={true}
      animation={true}
      index={index}
      className={`group relative overflow-hidden ${service.popular ? 'ring-2 ring-purple-400/50' : ''}`}
    >
      {/* Popular Badge */}
      {service.popular && (
        <div className="absolute -top-2 -right-2 z-10">
          <Badge className="gradient-electric text-white border-0 shadow-lg">
            <Star className="w-3 h-3 mr-1" />
            Popular
          </Badge>
        </div>
      )}

      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />

      <ResponsiveCardHeader responsive={true}>
        <div className="flex flex-col sm:flex-row sm:items-start space-y-3 sm:space-y-0 sm:space-x-4">
          {/* Icon */}
          <div className={`w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500`}>
            <Icon className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-white" />
          </div>

          {/* Title & Meta */}
          <div className="flex-1 min-w-0">
            <ResponsiveCardTitle size="lg" className="text-white group-hover:text-purple-300 transition-colors duration-300">
              {service.title}
            </ResponsiveCardTitle>
            
            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-2">
              {service.duration && (
                <div className="flex items-center space-x-1 text-xs sm:text-sm text-gray-400">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>{service.duration}</span>
                </div>
              )}
              {service.teamSize && (
                <div className="flex items-center space-x-1 text-xs sm:text-sm text-gray-400">
                  <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>{service.teamSize}</span>
                </div>
              )}
              {service.rating && (
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-3 h-3 sm:w-4 sm:h-4 ${i < service.rating! ? 'text-yellow-400 fill-current' : 'text-gray-600'}`} 
                    />
                  ))}
                  <span className="text-xs sm:text-sm text-gray-400 ml-1">({service.rating})</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Price */}
        {service.price && (
          <div className="flex flex-col sm:items-end mt-3 sm:mt-0">
            <div className="text-right">
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
                From ${service.price.from.toLocaleString()}
              </div>
              <div className="text-xs sm:text-sm text-gray-400">
                {service.price.period}
              </div>
            </div>
          </div>
        )}
      </ResponsiveCardHeader>

      <ResponsiveCardContent spacing="md">
        <ResponsiveCardDescription className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
          {service.description}
        </ResponsiveCardDescription>

        {/* Features List */}
        <div className="space-y-2 sm:space-y-3">
          <h4 className="text-sm sm:text-base font-semibold text-white">What's Included:</h4>
          <div className="grid grid-cols-1 gap-2">
            {service.features.map((feature, i) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
                className="flex items-start space-x-2 sm:space-x-3"
              >
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  {feature}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </ResponsiveCardContent>

      <ResponsiveCardFooter direction="responsive">
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <Button
            onClick={() => onLearnMore?.(service.id)}
            className="gradient-electric hover:shadow-2xl hover:shadow-purple-500/30 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold relative overflow-hidden group/btn magnetic flex-1 sm:flex-none"
          >
            <span className="relative z-10 flex items-center justify-center space-x-2">
              <span className="text-sm sm:text-base">Learn More</span>
              <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
          </Button>

          <Button
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10 backdrop-blur-xl px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold text-sm sm:text-base flex-1 sm:flex-none"
          >
            Get Quote
          </Button>
        </div>
      </ResponsiveCardFooter>

      {/* Enhanced Hover Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
    </ResponsiveCard>
  )
}

// Service Cards Grid Component
interface ServiceCardsGridProps {
  services: ServiceCardProps['service'][]
  onLearnMore?: (serviceId: string) => void
  columns?: 1 | 2 | 3 | 4
}

export function ServiceCardsGrid({ services, onLearnMore, columns = 3 }: ServiceCardsGridProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 ${columns >= 3 ? 'lg:grid-cols-3' : ''} ${columns >= 4 ? 'xl:grid-cols-4' : ''} gap-4 sm:gap-6 lg:gap-8`}>
      {services.map((service, index) => (
        <ServiceCard
          key={service.id}
          service={service}
          index={index}
          onLearnMore={onLearnMore}
        />
      ))}
    </div>
  )
}