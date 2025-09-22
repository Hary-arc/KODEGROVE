
import React, { useState, useEffect, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

// Custom hook for mouse parallax effect
export const useMouseParallax = (strength = 0.1) => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const springX = useSpring(x, { stiffness: 300, damping: 30 })
  const springY = useSpring(y, { stiffness: 300, damping: 30 })

  const updateMousePosition = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    x.set((e.clientX - centerX) * strength)
    y.set((e.clientY - centerY) * strength)
  }, [x, y, strength])

  const resetPosition = useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  return { springX, springY, updateMousePosition, resetPosition }
}

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

// Parallax card component
export const ParallaxCard = ({ 
  children, 
  className = "",
  strength = 0.1
}) => {
  const { springX, springY, updateMousePosition, resetPosition } = useMouseParallax(strength)

  return (
    <motion.div
      className={`relative ${className}`}
      style={{ 
        x: springX, 
        y: springY,
        rotateX: useTransform(springY, [-50, 50], [5, -5]),
        rotateY: useTransform(springX, [-50, 50], [-5, 5])
      }}
      onMouseMove={updateMousePosition}
      onMouseLeave={resetPosition}
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
  const [ripples, setRipples] = useState([])

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
  MagneticButton,
  ParallaxCard,
  RippleButton,
  TiltCard
}
