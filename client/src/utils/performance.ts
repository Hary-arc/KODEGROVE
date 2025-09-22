
// Performance monitoring utilities
export class PerformanceMonitor {
  private static instance: PerformanceMonitor
  private metrics: Map<string, number> = new Map()

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor()
    }
    return PerformanceMonitor.instance
  }

  // Mark performance timing
  mark(name: string): void {
    performance.mark(name)
  }

  // Measure performance between marks
  measure(name: string, startMark: string, endMark: string): void {
    performance.measure(name, startMark, endMark)
    const measure = performance.getEntriesByName(name)[0]
    this.metrics.set(name, measure.duration)
  }

  // Get Core Web Vitals
  getCoreWebVitals(): Promise<{
    LCP: number | null
    FID: number | null
    CLS: number | null
    FCP: number | null
    TTFB: number | null
  }> {
    return new Promise((resolve) => {
      const vitals = {
        LCP: null as number | null,
        FID: null as number | null,
        CLS: null as number | null,
        FCP: null as number | null,
        TTFB: null as number | null
      }

      // Get navigation timing
      const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      if (navigationEntry) {
        vitals.TTFB = navigationEntry.responseStart - navigationEntry.requestStart
      }

      // Get paint timing
      const paintEntries = performance.getEntriesByType('paint')
      const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint')
      if (fcpEntry) {
        vitals.FCP = fcpEntry.startTime
      }

      // Use Performance Observer for LCP, FID, CLS
      if ('PerformanceObserver' in window) {
        try {
          const observer = new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
              if (entry.entryType === 'largest-contentful-paint') {
                vitals.LCP = entry.startTime
              }
              if (entry.entryType === 'first-input') {
                vitals.FID = entry.processingStart - entry.startTime
              }
              if (entry.entryType === 'layout-shift' && !(entry as any).hadRecentInput) {
                vitals.CLS = (vitals.CLS || 0) + (entry as any).value
              }
            })
          })

          observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] })
          
          setTimeout(() => {
            observer.disconnect()
            resolve(vitals)
          }, 5000)
        } catch (error) {
          console.warn('PerformanceObserver not supported:', error)
          resolve(vitals)
        }
      } else {
        resolve(vitals)
      }
    })
  }

  // Resource loading optimization
  preloadCriticalResources(): void {
    const criticalResources = [
      { href: '/api/health', as: 'fetch' },
      // Add more critical resources
    ]

    criticalResources.forEach(({ href, as }) => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.href = href
      link.as = as
      document.head.appendChild(link)
    })
  }

  // Report performance metrics
  reportMetrics(): void {
    this.getCoreWebVitals().then((vitals) => {
      console.log('Core Web Vitals:', vitals)
      
      // You can send these metrics to your analytics service
      // analytics.track('performance_metrics', vitals)
    })
  }
}

// Lazy loading utility for components
export function lazyLoadComponent<T extends React.ComponentType<any>>(
  importFunction: () => Promise<{ default: T }>,
  fallback?: React.ComponentType
): React.LazyExoticComponent<T> {
  return React.lazy(() => {
    return importFunction().catch(error => {
      console.error('Failed to load component:', error)
      return { default: fallback || (() => React.createElement('div', {}, 'Loading failed')) as T }
    })
  })
}

// Debounce utility for performance
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  immediate = false
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null
      if (!immediate) func(...args)
    }
    
    const callNow = immediate && !timeout
    
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    
    if (callNow) func(...args)
  }
}

// Throttle utility for scroll events
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}
