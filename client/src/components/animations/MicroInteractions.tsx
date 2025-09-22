'use client'

import { useState, useRef, useEffect, ReactNode } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'

interface HoverLiftProps {
  children: ReactNode
  liftDistance?: number
  scale?: number
  className?: string
}

export function HoverLift({ 
  children, 
  liftDistance = 8, 
  scale = 1.02, 
  className 
}: HoverLiftProps) {
  return (
    <motion.div
      className={className}
      whileHover={{ 
        y: -liftDistance, 
        scale,
        transition: { 
          type: "spring", 
          stiffness: 300, 
          damping: 20 
        }
      }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.div>
  )
}

interface MagneticHoverProps {
  children: ReactNode
  strength?: number
  className?: string
}

export function MagneticHover({ 
  children, 
  strength = 0.3, 
  className 
}: MagneticHoverProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 })
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const distanceX = e.clientX - centerX
    const distanceY = e.clientY - centerY
    
    x.set(distanceX * strength)
    y.set(distanceY * strength)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      style={{ x: mouseXSpring, y: mouseYSpring }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface RippleButtonProps {
  children: ReactNode
  onClick?: () => void
  className?: string
  variant?: 'primary' | 'outline' | 'ghost'
  disabled?: boolean
}

export function RippleButton({ 
  children, 
  onClick, 
  className = "", 
  variant = 'primary',
  disabled = false
}: RippleButtonProps) {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([])
  const rippleCounter = useRef(0)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return

    const rect = e.currentTarget.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    const newRipple = {
      id: rippleCounter.current++,
      x,
      y
    }

    setRipples(prev => [...prev, newRipple])

    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id))
    }, 600)

    onClick?.()
  }

  const baseClasses = "relative overflow-hidden transition-all duration-300"
  const variantClasses = {
    primary: "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white",
    outline: "border-2 border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white",
    ghost: "text-purple-500 hover:bg-purple-500/10"
  }

  return (
    <motion.button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      onClick={handleClick}
      disabled={disabled}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
      
      {/* Ripple effects */}
      {ripples.map(ripple => (
        <motion.span
          key={ripple.id}
          className="absolute bg-white/30 rounded-full pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 0,
            height: 0
          }}
          animate={{
            width: 300,
            height: 300,
            opacity: [0.6, 0]
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}
    </motion.button>
  )
}

interface AnimatedIconProps {
  children: ReactNode
  hoverScale?: number
  hoverRotation?: number
  className?: string
}

export function AnimatedIcon({ 
  children, 
  hoverScale = 1.2, 
  hoverRotation = 0,
  className 
}: AnimatedIconProps) {
  return (
    <motion.div
      className={className}
      whileHover={{ 
        scale: hoverScale, 
        rotate: hoverRotation,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      }}
    >
      {children}
    </motion.div>
  )
}

interface TypewriterProps {
  text: string
  speed?: number
  className?: string
  onComplete?: () => void
}

export function Typewriter({ 
  text, 
  speed = 50, 
  className,
  onComplete 
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, speed)

      return () => clearTimeout(timeout)
    } else if (onComplete) {
      onComplete()
    }
  }, [currentIndex, text, speed, onComplete])

  return (
    <span className={className}>
      {displayText}
      <motion.span
        className="inline-block w-0.5 h-6 bg-current ml-1"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
      />
    </span>
  )
}

interface FloatingElementProps {
  children: ReactNode
  intensity?: number
  className?: string
}

export function FloatingElement({ 
  children, 
  intensity = 1, 
  className 
}: FloatingElementProps) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -10 * intensity, 0],
        x: [0, 5 * intensity, 0, -5 * intensity, 0],
        rotate: [0, 2 * intensity, 0, -2 * intensity, 0]
      }}
      transition={{
        duration: 4 + Math.random() * 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  )
}

interface PulseProps {
  children: ReactNode
  scale?: number
  className?: string
}

export function Pulse({ children, scale = 1.05, className }: PulseProps) {
  return (
    <motion.div
      className={className}
      animate={{ scale: [1, scale, 1] }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  )
}

// Hook for mouse parallax effect
export function useMouseParallax(strength = 0.02) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      
      const xPct = (clientX - innerWidth / 2) / (innerWidth / 2)
      const yPct = (clientY - innerHeight / 2) / (innerHeight / 2)
      
      x.set(xPct * strength * 100)
      y.set(yPct * strength * 100)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [x, y, strength])

  return { x, y }
}

// Performance-optimized hover effect
export function OptimizedHover({ 
  children, 
  className 
}: { 
  children: ReactNode
  className?: string 
}) {
  return (
    <motion.div
      className={className}
      whileHover="hover"
      variants={{
        hover: {
          scale: 1.05,
          y: -8,
          transition: {
            type: "spring",
            stiffness: 400,
            damping: 25
          }
        }
      }}
    >
      {children}
    </motion.div>
  )
}