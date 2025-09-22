'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { useMotionValue, useTransform } from 'framer-motion'

// Performance-aware animation hook
export function usePerformantAnimation() {
  const [isVisible, setIsVisible] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return {
    isVisible,
    setIsVisible,
    prefersReducedMotion,
    shouldAnimate: !prefersReducedMotion && isVisible
  }
}

// Optimized scroll animation hook
export function useScrollAnimation() {
  const scrollY = useMotionValue(0)
  const scrollDirection = useMotionValue(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    let ticking = false
    let timeoutId: ReturnType<typeof setTimeout>;

    const updateScrollY = () => {
      const currentScrollY = window.scrollY
      scrollY.set(currentScrollY)
      
      // Calculate scroll direction
      const direction = currentScrollY > lastScrollY.current ? 1 : -1
      scrollDirection.set(direction)
      lastScrollY.current = currentScrollY

      setIsScrolling(true)
      
      // Clear timeout if it exists
      if (timeoutId) clearTimeout(timeoutId)
      
      // Set scrolling to false after scroll stops
      timeoutId = setTimeout(() => {
        setIsScrolling(false)
      }, 150)

      ticking = false
    }

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollY)
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [scrollY, scrollDirection])

  return { scrollY, scrollDirection, isScrolling }
}

// Viewport-based animations
export function useViewportAnimation() {
  const [viewport, setViewport] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
    isMobile: typeof window !== 'undefined' ? window.innerWidth < 768 : false,
    isTablet: typeof window !== 'undefined' ? window.innerWidth >= 768 && window.innerWidth < 1024 : false,
    isDesktop: typeof window !== 'undefined' ? window.innerWidth >= 1024 : false
  })

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const handleResize = () => {
      // Debounce resize events
      if (timeoutId) clearTimeout(timeoutId)
      
      timeoutId = setTimeout(() => {
        const width = window.innerWidth
        const height = window.innerHeight
        
        setViewport({
          width,
          height,
          isMobile: width < 768,
          isTablet: width >= 768 && width < 1024,
          isDesktop: width >= 1024
        })
      }, 100)
    }

    window.addEventListener('resize', handleResize, { passive: true })
    
    return () => {
      window.removeEventListener('resize', handleResize)
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [])

  return viewport
}

// Intersection Observer hook for performance
export function useIntersectionObserver(
  threshold = 0.1,
  rootMargin = '0px 0px -50px 0px'
) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)
      },
      {
        threshold,
        rootMargin
      }
    )

    observer.observe(element)
    
    return () => {
      observer.unobserve(element)
    }
  }, [threshold, rootMargin])

  return { ref, isIntersecting }
}

// Mouse tracking hook for parallax effects
export function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMoving, setIsMoving] = useState(false)

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      
      // Normalize to -1 to 1 range
      const x = (clientX / innerWidth) * 2 - 1
      const y = (clientY / innerHeight) * 2 - 1
      
      setMousePosition({ x, y })
      setIsMoving(true)

      if (timeoutId) clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        setIsMoving(false)
      }, 100)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [])

  return { mousePosition, isMoving }
}

// Performance monitoring hook
export function usePerformanceMonitor() {
  const [fps, setFps] = useState(60)
  const frameCount = useRef(0)
  const lastTime = useRef(performance.now())

  useEffect(() => {
    let animationFrame: number

    const measureFPS = () => {
      frameCount.current++
      const currentTime = performance.now()
      
      if (currentTime >= lastTime.current + 1000) {
        setFps(Math.round((frameCount.current * 1000) / (currentTime - lastTime.current)))
        frameCount.current = 0
        lastTime.current = currentTime
      }
      
      animationFrame = requestAnimationFrame(measureFPS)
    }

    animationFrame = requestAnimationFrame(measureFPS)
    
    return () => {
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return {
    fps,
    isHighPerformance: fps >= 50,
    isLowPerformance: fps < 30
  }
}

// Lazy loading hook for heavy animations
export function useLazyAnimation(threshold = 0.1) {
  const [shouldLoad, setShouldLoad] = useState(false)
  const { ref, isIntersecting } = useIntersectionObserver(threshold)

  useEffect(() => {
    if (isIntersecting && !shouldLoad) {
      setShouldLoad(true)
    }
  }, [isIntersecting, shouldLoad])

  return { ref, shouldLoad }
}

// GPU acceleration utilities
export function useGPUAcceleration() {
  const applyGPUAcceleration = useCallback((element: HTMLElement) => {
    element.style.willChange = 'transform'
    element.style.transform = 'translateZ(0)'
    element.style.backfaceVisibility = 'hidden'
  }, [])

  const removeGPUAcceleration = useCallback((element: HTMLElement) => {
    element.style.willChange = 'auto'
    element.style.transform = ''
    element.style.backfaceVisibility = 'visible'
  }, [])

  return { applyGPUAcceleration, removeGPUAcceleration }
}

// Optimized parallax hook
export function useParallax(speed = 0.5) {
  const y = useMotionValue(0)
  const { scrollY } = useScrollAnimation()
  
  const yParallax = useTransform(scrollY, [0, 1000], [0, 1000 * speed])

  useEffect(() => {
    const unsubscribe = yParallax.onChange((latest) => {
      y.set(latest)
    })
    
    return unsubscribe
  }, [yParallax, y])

  return y
}