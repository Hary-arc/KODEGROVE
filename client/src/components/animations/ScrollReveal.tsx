'use client'

import React, { useRef, useEffect, ReactNode } from 'react'
import { motion, useInView, Variants } from 'motion/react'

interface ScrollRevealProps {
  children: ReactNode
  variant?: 'fadeUp' | 'fadeDown' | 'fadeLeft' | 'fadeRight' | 'scale' | 'rotate'
  delay?: number
  duration?: number
  amount?: number
  once?: boolean
  className?: string
}

const variants: Record<string, Variants> = {
  fadeUp: {
    hidden: { 
      opacity: 0, 
      y: 50,
      filter: 'blur(4px)'
    },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  },
  fadeDown: {
    hidden: { 
      opacity: 0, 
      y: -50,
      filter: 'blur(4px)'
    },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  },
  fadeLeft: {
    hidden: { 
      opacity: 0, 
      x: -50,
      filter: 'blur(4px)'
    },
    visible: { 
      opacity: 1, 
      x: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  },
  fadeRight: {
    hidden: { 
      opacity: 0, 
      x: 50,
      filter: 'blur(4px)'
    },
    visible: { 
      opacity: 1, 
      x: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  },
  scale: {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      filter: 'blur(4px)'
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  },
  rotate: {
    hidden: { 
      opacity: 0, 
      rotate: -10,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      rotate: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }
}

export function ScrollReveal({ 
  children, 
  variant = 'fadeUp', 
  delay = 0, 
  duration = 0.8,
  amount = 0.3,
  once = true,
  className 
}: ScrollRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, amount })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        ...variants[variant],
        visible: {
          ...variants[variant].visible,
          transition: {
            ...variants[variant].visible.transition,
            delay,
            duration
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface StaggeredRevealProps {
  children: ReactNode
  staggerDelay?: number
  initialDelay?: number
  className?: string
  variant?: 'fadeUp' | 'fadeLeft' | 'fadeRight' | 'scale'
}

export function StaggeredReveal({ 
  children, 
  staggerDelay = 0.1, 
  initialDelay = 0,
  className,
  variant = 'fadeUp'
}: StaggeredRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: initialDelay
          }
        }
      }}
      className={className}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={index}
          variants={variants[variant]}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}

interface ParallaxProps {
  children: ReactNode
  speed?: number
  className?: string
}

export function Parallax({ children, speed = 0.5, className }: ParallaxProps) {
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current as HTMLElement | null
    if (!element) return

    const updatePosition = () => {
      const scrolled = window.pageYOffset
      const parallax = scrolled * speed
      element.style.transform = `translateY(${parallax}px)`
    }

    const handleScroll = () => {
      requestAnimationFrame(updatePosition)
    }

    window.addEventListener('scroll', handleScroll)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [speed])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

// Intersection Observer utility for performance
export function useScrollReveal(threshold = 0.1) {
  const ref = useRef(null)
  const isInView = useInView(ref, { 
    once: true, 
    amount: threshold,
    margin: "0px 0px -100px 0px"
  })
  
  return { ref, isInView }
}