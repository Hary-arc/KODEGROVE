'use client'

import React, { useRef, useEffect, useState } from 'react'
import { motion, useAnimation } from 'motion/react'

interface AnimatedCardRowProps {
  children: React.ReactNode[]
  direction?: 'rtl' | 'ltr'
  speed?: number
  pauseOnHover?: boolean
  className?: string
  gap?: string
}

export function AnimatedCardRow({
  children,
  direction = 'rtl',
  speed = 40,
  pauseOnHover = true,
  className = '',
  gap = 'gap-6'
}: AnimatedCardRowProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const animationConfig = {
    x: direction === 'rtl' ? [0, -100] : [0, 100],
    transition: {
      duration: speed,
      ease: 'linear',
      repeat: Infinity,
      repeatType: 'loop' as const
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (isVisible && !isHovered) {
      controls.start(animationConfig)
    } else if (isHovered && pauseOnHover) {
      controls.stop()
    }
  }, [isVisible, isHovered, pauseOnHover, controls])

  const handleMouseEnter = () => {
    if (pauseOnHover) {
      setIsHovered(true)
    }
  }

  const handleMouseLeave = () => {
    if (pauseOnHover) {
      setIsHovered(false)
    }
  }

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className={`flex ${gap} min-w-max`}
        animate={controls}
        initial={{ x: direction === 'rtl' ? '0%' : '0%' }}
        style={{ 
          width: 'fit-content',
          willChange: 'transform'
        }}
      >
        {/* Original items */}
        {children.map((child, index) => (
          <div key={`original-${index}`} className="flex-shrink-0">
            {child}
          </div>
        ))}
        
        {/* Duplicated items for seamless loop */}
        {children.map((child, index) => (
          <div key={`duplicate-${index}`} className="flex-shrink-0">
            {child}
          </div>
        ))}
      </motion.div>

      {/* Gradient overlays for smooth edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-950 to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-950 to-transparent pointer-events-none z-10" />
    </div>
  )
}

// Enhanced version with more control
interface EnhancedAnimatedRowProps {
  items: React.ReactNode[]
  direction?: 'rtl' | 'ltr'
  speed?: 'slow' | 'medium' | 'fast'
  pauseOnHover?: boolean
  className?: string
  itemClassName?: string
  showGradientOverlay?: boolean
}

export function EnhancedAnimatedRow({
  items,
  direction = 'rtl',
  speed = 'medium',
  pauseOnHover = true,
  className = '',
  itemClassName = '',
  showGradientOverlay = true
}: EnhancedAnimatedRowProps) {
  const speedMap = {
    slow: 60,
    medium: 40,
    fast: 25
  }

  const animationDuration = speedMap[speed]

  return (
    <div className={`marquee-container ${className}`}>
      <div className="relative overflow-hidden">
        <div 
          className={`flex gap-6 ${direction === 'rtl' ? 'animate-marquee-rtl' : 'animate-marquee-ltr'}`}
          style={{ 
            animationDuration: `${animationDuration}s`,
            animationPlayState: pauseOnHover ? 'running' : 'running'
          }}
        >
          {/* Original set */}
          {items.map((item, index) => (
            <div key={`item-${index}`} className={`flex-shrink-0 ${itemClassName}`}>
              {item}
            </div>
          ))}
          
          {/* Duplicate set for seamless loop */}
          {items.map((item, index) => (
            <div key={`dup-${index}`} className={`flex-shrink-0 ${itemClassName}`}>
              {item}
            </div>
          ))}
        </div>

        {/* Gradient overlays */}
        {showGradientOverlay && (
          <>
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-950 to-transparent pointer-events-none z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-950 to-transparent pointer-events-none z-10" />
          </>
        )}
      </div>
    </div>
  )
}