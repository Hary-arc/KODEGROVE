'use client'

import { motion } from 'motion/react'
import { ResponsiveCard, ResponsiveCardHeader, ResponsiveCardContent, ResponsiveCardFooter } from './ui/responsive-card'
import { Avatar } from './ui/avatar'
import { Badge } from './ui/badge'
import { Star, Quote, ExternalLink, CheckCircle } from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'

interface TestimonialCardProps {
  testimonial: {
    id: string
    name: string
    role: string
    company: string
    avatar?: string
    content: string
    rating: number
    date: string
    verified?: boolean
    projectType?: string
    companyLogo?: string
    gradient?: string
  }
  index: number
  variant?: 'default' | 'featured' | 'compact'
}

export function TestimonialCard({ testimonial, index, variant = 'default' }: TestimonialCardProps) {
  const isCompact = variant === 'compact'
  const isFeatured = variant === 'featured'

  return (
    <ResponsiveCard
      variant={isFeatured ? 'gradient' : 'glass'}
      size={isCompact ? 'sm' : isFeatured ? 'xl' : 'md'}
      hover={true}
      animation={true}
      index={index}
      className={`group relative overflow-hidden ${isFeatured ? 'lg:col-span-2' : ''}`}
    >
      {/* Featured Badge */}
      {isFeatured && (
        <div className="absolute top-4 right-4 z-10">
          <Badge className="gradient-electric text-white border-0 shadow-lg">
            <CheckCircle className="w-3 h-3 mr-1" />
            Featured
          </Badge>
        </div>
      )}

      {/* Quote Icon */}
      <div className="absolute top-4 left-4 opacity-20 group-hover:opacity-30 transition-opacity duration-500">
        <Quote className={`${isCompact ? 'w-8 h-8' : 'w-12 h-12 sm:w-16 sm:h-16'} text-purple-400`} />
      </div>

      <ResponsiveCardHeader responsive={true}>
        <div className="flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-4 w-full">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className={`${isCompact ? 'w-10 h-10' : 'w-12 h-12 sm:w-16 sm:h-16'} rounded-full overflow-hidden ring-2 ring-white/20 group-hover:ring-purple-400/50 transition-all duration-500`}>
              {testimonial.avatar ? (
                <ImageWithFallback
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                </div>
              )}
            </div>
          </div>

          {/* User Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full">
              <div className="min-w-0">
                <h3 className={`${isCompact ? 'text-sm' : 'text-base sm:text-lg'} font-semibold text-white group-hover:text-purple-300 transition-colors duration-300 truncate`}>
                  {testimonial.name}
                </h3>
                <p className={`${isCompact ? 'text-xs' : 'text-sm'} text-gray-400 truncate`}>
                  {testimonial.role}
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  <p className={`${isCompact ? 'text-xs' : 'text-sm'} font-medium text-purple-400 truncate`}>
                    {testimonial.company}
                  </p>
                  {testimonial.verified && (
                    <CheckCircle className="w-3 h-3 text-green-400 flex-shrink-0" />
                  )}
                </div>
              </div>

              {/* Company Logo */}
              {testimonial.companyLogo && !isCompact && (
                <div className="mt-2 sm:mt-0 flex-shrink-0">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg overflow-hidden bg-white/10 p-1">
                    <ImageWithFallback
                      src={testimonial.companyLogo}
                      alt={`${testimonial.company} logo`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Rating & Meta */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full mt-3 space-y-2 sm:space-y-0">
          {/* Rating */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-0.5">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                >
                  <Star 
                    className={`${isCompact ? 'w-3 h-3' : 'w-4 h-4'} ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'}`} 
                  />
                </motion.div>
              ))}
            </div>
            <span className={`${isCompact ? 'text-xs' : 'text-sm'} text-gray-400`}>
              ({testimonial.rating}/5)
            </span>
          </div>

          {/* Project Type & Date */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {testimonial.projectType && (
              <Badge variant="outline" className="border-white/20 text-gray-300 text-xs">
                {testimonial.projectType}
              </Badge>
            )}
            <span className={`${isCompact ? 'text-xs' : 'text-sm'} text-gray-500`}>
              {new Date(testimonial.date).toLocaleDateString('en-US', {
                month: 'short',
                year: 'numeric'
              })}
            </span>
          </div>
        </div>
      </ResponsiveCardHeader>

      <ResponsiveCardContent spacing={isCompact ? 'sm' : 'md'}>
        {/* Testimonial Content */}
        <div className="relative">
          <blockquote className={`${isCompact ? 'text-sm' : 'text-base lg:text-lg'} text-gray-300 leading-relaxed italic group-hover:text-gray-200 transition-colors duration-300`}>
            "{testimonial.content}"
          </blockquote>
        </div>
      </ResponsiveCardContent>

      {!isCompact && (
        <ResponsiveCardFooter direction="responsive">
          <div className="flex items-center justify-between w-full">
            <div className="text-xs text-gray-500">
              Verified Review
            </div>
            
            <button className="flex items-center space-x-1 text-xs text-purple-400 hover:text-purple-300 transition-colors duration-300 group/link">
              <span>View Project</span>
              <ExternalLink className="w-3 h-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-300" />
            </button>
          </div>
        </ResponsiveCardFooter>
      )}

      {/* Background Pattern */}
      {testimonial.gradient && (
        <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />
      )}

      {/* Hover Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
    </ResponsiveCard>
  )
}

// Testimonials Grid Component
interface TestimonialsGridProps {
  testimonials: TestimonialCardProps['testimonial'][]
  variant?: 'default' | 'masonry' | 'featured'
  columns?: 1 | 2 | 3 | 4
}

export function TestimonialsGrid({ testimonials, variant = 'default', columns = 3 }: TestimonialsGridProps) {
  if (variant === 'masonry') {
    return (
      <div className={`columns-1 md:columns-2 ${columns >= 3 ? 'lg:columns-3' : ''} ${columns >= 4 ? 'xl:columns-4' : ''} gap-4 sm:gap-6 lg:gap-8 space-y-4 sm:space-y-6 lg:space-y-8`}>
        {testimonials.map((testimonial, index) => (
          <div key={testimonial.id} className="break-inside-avoid">
            <TestimonialCard
              testimonial={testimonial}
              index={index}
              variant={index % 5 === 0 ? 'featured' : 'default'}
            />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 ${columns >= 3 ? 'lg:grid-cols-3' : ''} ${columns >= 4 ? 'xl:grid-cols-4' : ''} gap-4 sm:gap-6 lg:gap-8`}>
      {testimonials.map((testimonial, index) => (
        <TestimonialCard
          key={testimonial.id}
          testimonial={testimonial}
          index={index}
          variant={variant === 'featured' && index === 0 ? 'featured' : 'default'}
        />
      ))}
    </div>
  )
}