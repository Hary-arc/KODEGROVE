
import React, { useState, useEffect, useCallback, useRef, MouseEvent } from 'react'
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from 'framer-motion'
import { ReactNode } from 'react'

// Custom hook for mouse parallax effect
export const useMouseParallax = (strength = 0.5) => {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  useEffect(() => {
    const handleMouseMove = (e: Event) => {
      const mouseEvent = e as globalThis.MouseEvent
      const { clientX, clientY } = mouseEvent
      const { innerWidth, innerHeight } = window

      mouseX.set((clientX - innerWidth / 2) * strength)
      mouseY.set((clientY - innerHeight / 2) * strength)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY, strength])

  return { mouseX, mouseY }
}

// Custom hook for magnetic hover effect
export const useMagneticHover = <T extends HTMLElement = HTMLDivElement>(
  strength = 0.3
) => {
  const x: MotionValue<number> = useMotionValue(0);
  const y: MotionValue<number> = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 400, damping: 40 });
  const springY = useSpring(y, { stiffness: 400, damping: 40 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<T>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      x.set((e.clientX - centerX) * strength);
      y.set((e.clientY - centerY) * strength);
    },
    [x, y, strength]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return {
    x: springX,
    y: springY,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
  };
};

// Magnetic button component
export const MagneticButton = ({
  children,
  className = "",
  strength = 0.3,
  ...props
}: {
  children: ReactNode
  className?: string
  strength?: number
  [key: string]: any
}) => {
  const { x, y, onMouseMove, onMouseLeave } = useMagneticHover<HTMLButtonElement>(0.3);

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

// HoverLift component - single declaration
export const HoverLift = ({ 
  children, 
  className = '', 
  liftHeight = 10, 
  lift = 8,
  liftDistance = 10,
  scale = 1.02 
}: { 
  children: ReactNode
  className?: string
  liftHeight?: number
  lift?: number
  liftDistance?: number
  scale?: number
}) => {
  // Use the highest priority prop for lift distance
  const finalLift = liftDistance || liftHeight || lift
  
  return (
    <motion.div
      className={className}
      whileHover={{ 
        y: -finalLift,
        scale: scale,
        transition: { type: "spring", stiffness: 300, damping: 30 }
      }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.div>
  )
}

// MagneticHover component
export const MagneticHover = ({ children, className = "", strength = 0.3 }: {
  children: ReactNode
  className?: string
  strength?: number
}) => {
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
export const AnimatedIcon = ({ children, className = "", ...props }: {
  children: ReactNode
  className?: string
  [key: string]: any
}) => {
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
export const Typewriter = ({ text, className = "", speed = 100 }: {
  text: string
  className?: string
  speed?: number
}) => {
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
export const FloatingElement = ({ children, className = "", amplitude = 10, duration = 3 }: {
  children: ReactNode
  className?: string
  amplitude?: number
  duration?: number
}) => {
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
}: {
  children: ReactNode
  className?: string
  strength?: number
}) => {
  const { mouseX, mouseY } = useMouseParallax(strength);

  return (
    <motion.div
      className={`relative ${className}`}
      style={{
        x: mouseX,
        y: mouseY,
        rotateX: useTransform(mouseY, y => y * 0.1),
        rotateY: useTransform(mouseX, x => x * -0.1)
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
}: {
  children: ReactNode
  className?: string
  rippleColor?: string
  [key: string]: any
}) => {
  const [ripples, setRipples] = useState<Array<{x: number, y: number, size: number, id: number}>>([])

  const createRipple = (e: MouseEvent<HTMLButtonElement>) => {
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
}: {
  children: ReactNode
  className?: string
  tiltStrength?: number
}) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
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

// Pulse component
export const Pulse = ({
  children,
  scale = 1.05,
  duration = 2,
  className = ""
}: {
  children: React.ReactNode
  scale?: number
  duration?: number
  className?: string
}) => {
  return (
    <motion.div
      className={className}
      animate={{
        scale: [1, scale, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  )
}

// Scale Animation Component
export function ScaleOnHover({ 
  children, 
  className = '',
  scale = 1.05 
}: { 
  children: ReactNode
  className?: string
  scale?: number
}) {
  return (
    <motion.div
      className={className}
      whileHover={{ 
        scale,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      }}
    >
      {children}
    </motion.div>
  )
}

// Magnetic Effect Component
export function MagneticEffect({ 
  children, 
  className = '',
  strength = 20 
}: { 
  children: ReactNode
  className?: string
  strength?: number
}) {
  return (
    <motion.div
      className={className}
      whileHover={{
        scale: 1.05,
        transition: { type: "spring", stiffness: 400, damping: 25 }
      }}
    >
      {children}
    </motion.div>
  )
}

// Rotate Animation Component
export function RotateOnHover({ 
  children, 
  className = '',
  rotation = 10 
}: { 
  children: ReactNode
  className?: string
  rotation?: number
}) {
  return (
    <motion.div
      className={className}
      whileHover={{ 
        rotate: rotation,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      }}
    >
      {children}
    </motion.div>
  )
}
