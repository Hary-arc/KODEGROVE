'use client'

import { useEffect, useRef, useState, ReactNode } from 'react'
import { motion, Variants } from 'framer-motion';
// Simple animated icons using CSS animations instead of Lottie for better performance
interface AnimatedIconProps {
  type: 'star' | 'heart' | 'check' | 'arrow' | 'sparkle' | 'pulse' | 'spin'
  size?: number
  animated?: boolean
  className?: string
  color?: string
}

export function AnimatedIcon({ 
  type, 
  size = 24, 
  animated = true, 
  className = '',
  color = 'currentColor'
}: AnimatedIconProps) {
  const iconVariants = {
    star: {
      initial: { scale: 0, rotate: -180 },
      animate: { 
        scale: 1, 
        rotate: 0,
        transition: { 
          type: "spring", 
          stiffness: 200, 
          damping: 10 
        }
      },
      hover: { 
        scale: 1.2, 
        rotate: 15,
        transition: { duration: 0.2 }
      }
    },
    heart: {
      initial: { scale: 0 },
      animate: { 
        scale: [0, 1.2, 1],
        transition: { 
          duration: 0.6,
          times: [0, 0.6, 1]
        }
      },
      hover: { 
        scale: 1.3,
        transition: { duration: 0.2 }
      }
    },
    check: {
      initial: { pathLength: 0, opacity: 0 },
      animate: { 
        pathLength: 1, 
        opacity: 1,
        transition: { 
          duration: 0.8,
          ease: "easeInOut"
        }
      }
    },
    arrow: {
      initial: { x: -10, opacity: 0 },
      animate: { 
        x: 0, 
        opacity: 1,
        transition: { duration: 0.5 }
      },
      hover: { 
        x: 5,
        transition: { duration: 0.2 }
      }
    },
    sparkle: {
      initial: { scale: 0, rotate: 0 },
      animate: { 
        scale: [0, 1, 0.8, 1],
        rotate: [0, 180, 360],
        transition: { 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }
    },
    pulse: {
      initial: { scale: 1, opacity: 1 },
      animate: { 
        scale: [1, 1.2, 1],
        opacity: [1, 0.7, 1],
        transition: { 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }
    },
    spin: {
      initial: { rotate: 0 },
      animate: { 
        rotate: 360,
        transition: { 
          duration: 2,
          repeat: Infinity,
          ease: "linear"
        }
      }
    }
  } satisfies Record<AnimatedIconProps["type"], Variants>;

  const variants = iconVariants[type]
  const hasHover = 'hover' in variants
  
  const renderIcon = () => {
    const props = {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: color,
      strokeWidth: 2,
      strokeLinecap: "round" as const,
      strokeLinejoin: "round" as const
    }

    switch (type) {
      case 'star':
        return (
          <svg {...props}>
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
          </svg>
        )
      case 'heart':
        return (
          <svg {...props}>
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        )
      case 'check':
        return (
          <svg {...props}>
            <motion.polyline 
              points="20,6 9,17 4,12"
              variants={iconVariants.check}
              initial={animated ? "initial" : false}
              animate={animated ? "animate" : false}
            />
          </svg>
        )
      case 'arrow':
        return (
          <svg {...props}>
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12,5 19,12 12,19" />
          </svg>
        )
      case 'sparkle':
        return (
          <svg {...props} fill={color}>
            <path d="M12 0l1.5 4.5L18 6l-4.5 1.5L12 12l-1.5-4.5L6 6l4.5-1.5L12 0z" />
            <path d="M19 14l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z" />
            <path d="M5 19l0.5 1.5L7 21l-1.5 0.5L5 23l-0.5-1.5L3 21l1.5-0.5L5 19z" />
          </svg>
        )
      case 'pulse':
        return (
          <svg {...props}>
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="6" fill={color} />
          </svg>
        )
      case 'spin':
        return (
          <svg {...props}>
            <circle cx="12" cy="12" r="10" />
            <path d="M14,2 Q12,2 12,2 Q12,2 10,2" strokeWidth="4" />
          </svg>
        )
      default:
        return <div style={{ width: size, height: size }} />
    }
  }

  if (!animated) {
    return <div className={className}>{renderIcon()}</div>
  }

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="initial"
      animate="animate"
      whileHover={hasHover ? "hover" : undefined}
    >
      {renderIcon()}
    </motion.div>
  )
}

// Lightweight path animation component
interface AnimatedPathProps {
  path: string
  className?: string
  strokeWidth?: number
  strokeColor?: string
  duration?: number
}

export function AnimatedPath({ 
  path, 
  className, 
  strokeWidth = 2, 
  strokeColor = "currentColor",
  duration = 2 
}: AnimatedPathProps) {
  return (
    <svg className={className} viewBox="0 0 100 100">
      <motion.path
        d={path}
        fill="none"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration, ease: "easeInOut" }}
      />
    </svg>
  )
}

// Simple loading animation
interface LoadingAnimationProps {
  type?: 'spinner' | 'dots' | 'pulse' | 'wave'
  size?: number
  color?: string
  className?: string
}

export function LoadingAnimation({ 
  type = 'spinner', 
  size = 40, 
  color = "currentColor",
  className = ''
}: LoadingAnimationProps) {
  const renderAnimation = () => {
    switch (type) {
      case 'spinner':
        return (
          <motion.div
            className="rounded-full border-4 border-gray-300"
            style={{
              width: size,
              height: size,
              borderTopColor: color
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        )
      case 'dots':
        return (
          <div className="flex space-x-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="rounded-full"
                style={{
                  width: size / 4,
                  height: size / 4,
                  backgroundColor: color
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </div>
        )
      case 'pulse':
        return (
          <motion.div
            className="rounded-full"
            style={{
              width: size,
              height: size,
              backgroundColor: color
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )
      case 'wave':
        return (
          <div className="flex items-end space-x-1">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                style={{
                  width: size / 8,
                  height: size / 2,
                  backgroundColor: color
                }}
                animate={{
                  scaleY: [1, 0.3, 1]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.1
                }}
              />
            ))}
          </div>
        )
      default:
        return null
    }
  }

  return <div className={className}>{renderAnimation()}</div>
}

// Success animation component
export function SuccessAnimation({ className = '', size = 60 }: { 
  className?: string
  size?: number 
}) {
  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 10 }}
    >
      <motion.div
        className="rounded-full bg-green-500 flex items-center justify-center"
        style={{ width: size, height: size }}
        animate={{
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 0.6,
          times: [0, 0.6, 1]
        }}
      >
        <motion.svg
          width={size * 0.5}
          height={size * 0.5}
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <motion.polyline
            points="20,6 9,17 4,12"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
          />
        </motion.svg>
      </motion.div>
    </motion.div>
  )
}

// Error animation component
export function ErrorAnimation({ className = '', size = 60 }: { 
  className?: string
  size?: number 
}) {
  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 10 }}
    >
      <motion.div
        className="rounded-full bg-red-500 flex items-center justify-center"
        style={{ width: size, height: size }}
        animate={{
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 0.6,
          times: [0, 0.6, 1]
        }}
      >
        <motion.svg
          width={size * 0.5}
          height={size * 0.5}
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <motion.line
            x1="18"
            y1="6"
            x2="6"
            y2="18"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.4, ease: "easeInOut", delay: 0.1 }}
          />
          <motion.line
            x1="6"
            y1="6"
            x2="18"
            y2="18"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.4, ease: "easeInOut", delay: 0.2 }}
          />
        </motion.svg>
      </motion.div>
    </motion.div>
  )
}

// For backward compatibility, export as LottieAnimation
export { AnimatedIcon as LottieAnimation }