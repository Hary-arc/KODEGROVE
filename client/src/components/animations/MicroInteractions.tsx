import React, { useState, useEffect, useCallback, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

// Custom hook for mouse parallax effect
function useMouseParallax(strength = 0.1) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!elementRef.current) return

      const rect = elementRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const deltaX = (e.clientX - centerX) * strength
      const deltaY = (e.clientY - centerY) * strength

      setPosition({ x: deltaX, y: deltaY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [strength])

  return { position, elementRef }
}

export { useMouseParallax }

// Custom hook for magnetic hover effect
export const useMagneticHover = (strength = 0.3) => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springX = useSpring(x, { stiffness: 400, damping: 40 })
  const springY = useSpring(y, { stiffness: 400, damping: 40 })

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    x.set((e.clientX - centerX) * strength)
    y.set((e.clientY - centerY) * strength)
  }, [x, y, strength])

  const handleMouseLeave = useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  return { 
    x: springX, 
    y: springY, 
    onMouseMove: handleMouseMove, 
    onMouseLeave: handleMouseLeave 
  }
}

// Magnetic button component
export const MagneticButton = ({ 
  children, 
  className = "", 
  strength = 0.3,
  ...props 
}) => {
  const { x, y, onMouseMove, onMouseLeave } = useMagneticHover(strength)

  return (
    <motion.button
      className={`relative ${className}`}
      style={{ x, y }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </motion.button>
  )
}

// HoverLift component - simple hover effect
export const HoverLift = ({ children, className = "", liftHeight = 10 }) => {
  return (
    <motion.div
      className={className}
      whileHover={{ y: -liftHeight, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {children}
    </motion.div>
  )
}

// MagneticHover component
export const MagneticHover = ({ children, className = "", strength = 0.3 }) => {
  const { x, y, onMouseMove, onMouseLeave } = useMagneticHover(strength)

  return (
    <motion.div
      className={className}
      style={{ x, y }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </motion.div>
  )
}

// AnimatedIcon component
export const AnimatedIcon = ({ children, className = "", ...props }) => {
  return (
    <motion.div
      className={className}
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// Typewriter effect component
export const Typewriter = ({ text, className = "", speed = 100 }) => {
  const [displayText, setDisplayText] = React.useState("")
  const [currentIndex, setCurrentIndex] = React.useState(0)

  React.useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, speed)
      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text, speed])

  return (
    <span className={className}>
      {displayText}
      {currentIndex < text.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        >
          |
        </motion.span>
      )}
    </span>
  )
}

// FloatingElement component
export const FloatingElement = ({ children, className = "", amplitude = 10, duration = 3 }) => {
  return (
    <motion.div
      className={className}
      animate={{
        y: [-amplitude, amplitude, -amplitude],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  )
}

// Parallax card component
export const ParallaxCard = ({ 
  children, 
  className = "",
  strength = 0.1
}) => {
  const { position, elementRef } = useMouseParallax(strength)

  return (
    <motion.div
      className={`relative ${className}`}
      ref={elementRef as any}
      style={{ 
        x: position.x, 
        y: position.y,
        rotateX: position.y * 0.1,
        rotateY: position.x * 0.1
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {children}
    </motion.div>
  )
}

// Ripple effect component
export const RippleButton = ({ 
  children, 
  className = "",
  rippleColor = "rgba(255, 255, 255, 0.6)",
  ...props 
}) => {
  const [ripples, setRipples] = useState<Array<{x: number, y: number, size: number, id: number}>>([])

  const createRipple = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    const newRipple = {
      x,
      y,
      size,
      id: Date.now()
    }

    setRipples(prev => [...prev, newRipple])

    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id))
    }, 600)
  }

  return (
    <motion.button
      className={`relative overflow-hidden ${className}`}
      onMouseDown={createRipple}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
      {ripples.map(ripple => (
        <motion.span
          key={ripple.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
            backgroundColor: rippleColor
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}
    </motion.button>
  )
}

// Tilt card component
export const TiltCard = ({ 
  children, 
  className = "",
  tiltStrength = 10
}) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    setTilt({
      x: ((y - centerY) / centerY) * tiltStrength,
      y: ((x - centerX) / centerX) * -tiltStrength
    })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
  }

  return (
    <motion.div
      className={`relative ${className}`}
      style={{
        rotateX: tilt.x,
        rotateY: tilt.y,
        transformStyle: "preserve-3d"
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {children}
    </motion.div>
  )
}

export default {
  useMouseParallax,
  useMagneticHover,
  HoverLift,
  MagneticHover,
  AnimatedIcon,
  Typewriter,
  FloatingElement,
  MagneticButton,
  ParallaxCard,
  RippleButton,
  TiltCard
}