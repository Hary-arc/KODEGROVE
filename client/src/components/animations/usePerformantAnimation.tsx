
import { useCallback, useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

// Performance-optimized animation hook
export const usePerformantAnimation = (options: any = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '50px',
    triggerOnce = true,
    duration = 1000
  } = options

  const [isVisible, setIsVisible] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)
  const elementRef = useRef(null)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const shouldReduceMotion = useReducedMotion()

  const handleIntersection = useCallback((entries) => {
    const [entry] = entries
    const isIntersecting = entry.isIntersecting

    if (isIntersecting && (!triggerOnce || !hasTriggered)) {
      setIsVisible(true)
      setHasTriggered(true)
    } else if (!triggerOnce && !isIntersecting) {
      setIsVisible(false)
    }
  }, [triggerOnce, hasTriggered])

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    // Use Intersection Observer for better performance
    observerRef.current = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin
    })

    observerRef.current.observe(element)

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [handleIntersection, threshold, rootMargin])

  // Return optimized animation values
  return {
    ref: elementRef,
    isVisible: shouldReduceMotion ? true : isVisible,
    hasTriggered,
    shouldAnimate: !shouldReduceMotion && isVisible,
    animationDuration: shouldReduceMotion ? 0 : duration
  }
}

// useScrollAnimation - alias for useScrollTrigger with scroll position
export const useScrollAnimation = (callback, dependencies = [], options = {}) => {
  return useScrollTrigger(callback, dependencies, options)
}

// useViewportAnimation - optimized viewport detection hook
export const useViewportAnimation = (options = {}) => {
  return usePerformantAnimation(options)
}

// Optimized scroll-triggered animation hook
export const useScrollTrigger = (callback: any, dependencies: any[] = [], options: any = {}) => {
  const { throttle = 16 } = options // 60fps
  const lastCallTime = useRef(0)
  const rafId = useRef<number | null>(null)

  const throttledCallback = useCallback((...args) => {
    const now = Date.now()
    if (now - lastCallTime.current >= throttle) {
      lastCallTime.current = now
      callback(...args)
    }
  }, [callback, throttle])

  useEffect(() => {
    const handleScroll = () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current)
      }
      
      rafId.current = requestAnimationFrame(() => {
        throttledCallback(window.scrollY)
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafId.current) {
        cancelAnimationFrame(rafId.current)
      }
    }
  }, [throttledCallback, ...dependencies])
}

// Optimized resize hook
export const useOptimizedResize = (callback: any, dependencies: any[] = []) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleResize = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      
      timeoutRef.current = setTimeout(() => {
        callback()
      }, 150) // Debounce resize events
    }

    window.addEventListener('resize', handleResize, { passive: true })
    
    return () => {
      window.removeEventListener('resize', handleResize)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [callback, ...dependencies])
}

export default {
  usePerformantAnimation,
  useScrollAnimation,
  useViewportAnimation,
  useScrollTrigger,
  useOptimizedResize
}
