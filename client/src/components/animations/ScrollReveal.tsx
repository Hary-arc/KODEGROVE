import React, { useRef, useEffect, useState } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'

/**
 * Hook: useScrollReveal
 * Handles visibility state based on scroll position
 */
export function useScrollReveal(threshold = 0.1, once = true) {
  const ref = useRef(null)
  const controls = useAnimation()
  const isInView = useInView(ref, {
    once,
    margin: '-10% 0px -10% 0px',
  })

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    } else if (!once) {
      controls.start('hidden')
    }
  }, [isInView, controls, once])

  return { ref, isInView, controls }
}

// ===============================
// ScrollReveal Component
// ===============================

type Direction = 'up' | 'down' | 'left' | 'right' | 'scale'
type VariantType = 'fadeUp' | 'fadeLeft' | 'scale'

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  direction?: Direction
  variant?: VariantType
  delay?: number
  duration?: number
  distance?: number
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  direction = 'up',
  variant,
  delay = 0,
  duration = 0.6,
  distance = 50,
}) => {
  const { ref, controls } = useScrollReveal()

  const predefinedVariants: Record<VariantType, any> = {
    fadeUp: {
      hidden: { opacity: 0, y: distance },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration, delay, ease: [0.25, 0.46, 0.45, 0.94] },
      },
    },
    fadeLeft: {
      hidden: { opacity: 0, x: distance },
      visible: {
        opacity: 1,
        x: 0,
        transition: { duration, delay, ease: [0.25, 0.46, 0.45, 0.94] },
      },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: { duration, delay, ease: [0.25, 0.46, 0.45, 0.94] },
      },
    },
  }

  const fallbackVariants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? distance : direction === 'down' ? -distance : 0,
      x: direction === 'left' ? distance : direction === 'right' ? -distance : 0,
      scale: direction === 'scale' ? 0.8 : 1,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  const animationVariants = variant ? predefinedVariants[variant] : fallbackVariants

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
      variants={animationVariants}
    >
      {children}
    </motion.div>
  )
}

// ===============================
// Staggered Reveal
// ===============================

interface StaggerRevealProps {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
  direction?: Direction
}

export const StaggerReveal: React.FC<StaggerRevealProps> = ({
  children,
  className = '',
  staggerDelay = 0.1,
  direction = 'up',
}) => {
  const { ref, controls } = useScrollReveal()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  }

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 30 : direction === 'down' ? -30 : 0,
      x: direction === 'left' ? 30 : direction === 'right' ? -30 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div key={index} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}

export const StaggeredReveal = StaggerReveal

// ===============================
// Parallax Component
// ===============================

interface ParallaxProps {
  children: React.ReactNode
  className?: string
  speed?: number
}

export const Parallax: React.FC<ParallaxProps> = ({
  children,
  className = '',
  speed = 0.5,
}) => {
  const { ref, isInView } = useScrollReveal()
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (isInView) {
        setOffset(window.scrollY * speed)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isInView, speed])

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ transform: `translateY(${offset}px)` }}
    >
      {children}
    </motion.div>
  )
}

// ===============================
// Default Export
// ===============================

export default {
  ScrollReveal,
  StaggerReveal,
  StaggeredReveal,
  Parallax,
  useScrollReveal,
}
