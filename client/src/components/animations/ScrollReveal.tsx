import React, { useRef, useEffect, useCallback } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'

// Custom hook for scroll reveal animations
function useScrollReveal(threshold = 0.1, once = true) {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { 
    once, 
    threshold,
    margin: "-10% 0px -10% 0px"
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

export { useScrollReveal }

// ScrollReveal component
export const ScrollReveal = ({ 
  children, 
  className = "",
  direction = "up",
  delay = 0,
  duration = 0.6,
  distance = 50
}) => {
  const { ref, controls } = useScrollReveal()

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? distance : direction === "down" ? -distance : 0,
      x: direction === "left" ? distance : direction === "right" ? -distance : 0,
      scale: direction === "scale" ? 0.8 : 1
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
      variants={variants}
    >
      {children}
    </motion.div>
  )
}

// Stagger container for multiple reveal elements
export const StaggerReveal = ({ 
  children, 
  className = "",
  staggerDelay = 0.1,
  direction = "up"
}) => {
  const { ref, controls } = useScrollReveal()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay
      }
    }
  }

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 30 : direction === "down" ? -30 : 0,
      x: direction === "left" ? 30 : direction === "right" ? -30 : 0
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
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

export default ScrollReveal