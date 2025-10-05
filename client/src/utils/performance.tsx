import React from 'react';

// Performance monitoring utilities
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, number> = new Map();
  private observer: PerformanceObserver | null = null;

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  // Mark performance timing
  mark(name: string): void {
    performance.mark(name);
  }

  // Measure performance between marks
  measure(name: string, startMark: string, endMark: string): void {
    performance.measure(name, startMark, endMark);
    const measure = performance.getEntriesByName(name)[0];
    this.metrics.set(name, measure.duration);
  }

  // Get Core Web Vitals
  getCoreWebVitals(): Promise<{
    LCP: number | null;
    FID: number | null;
    CLS: number | null;
    FCP: number | null;
    TTFB: number | null;
  }> {
    return new Promise(resolve => {
      const vitals = {
        LCP: null as number | null,
        FID: null as number | null,
        CLS: null as number | null,
        FCP: null as number | null,
        TTFB: null as number | null,
      };

      // Get navigation timing
      const navigationEntry = performance.getEntriesByType(
        'navigation'
      )[0] as PerformanceNavigationTiming;
      if (navigationEntry) {
        vitals.TTFB = navigationEntry.responseStart - navigationEntry.requestStart;
      }

      // Get paint timing
      const paintEntries = performance.getEntriesByType('paint');
      const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');
      if (fcpEntry) {
        vitals.FCP = fcpEntry.startTime;
      }

      // Use Performance Observer for LCP, FID, CLS
      if ('PerformanceObserver' in window) {
        try {
          const observer = new PerformanceObserver(list => {
            list.getEntries().forEach(entry => {
              if (entry.entryType === 'largest-contentful-paint') {
                vitals.LCP = entry.startTime;
              }
              if (entry.name === 'first-input') {
                const event = entry as PerformanceEventTiming;
                vitals.FID = event.processingStart - event.startTime;
              }
              if (entry.entryType === 'layout-shift' && !(entry as any).hadRecentInput) {
                vitals.CLS = (vitals.CLS || 0) + (entry as any).value;
              }
            });
          });

          observer.observe({
            entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'],
          });

          setTimeout(() => {
            observer.disconnect();
            resolve(vitals);
          }, 5000);
        } catch (error) {
          console.warn('PerformanceObserver not supported:', error);
          resolve(vitals);
        }
      } else {
        resolve(vitals);
      }
    });
  }

  // Resource loading optimization
  preloadCriticalResources(): void {
    const criticalResources = [
      { href: '/api/health', as: 'fetch' },
      {
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
        as: 'style',
      },
      { href: '/src/index.css', as: 'style' },
    ];

    criticalResources.forEach(({ href, as }) => {
      try {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = href;
        link.as = as;
        if (as === 'style') {
          link.onload = () => {
            link.rel = 'stylesheet';
          };
        }
        document.head.appendChild(link);
      } catch (error) {
        console.warn('Failed to preload resource:', href, error);
      }
    });

    // Preload critical images
    this.preloadImages([
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
      'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80',
    ]);
  }

  // Preload critical images
  private preloadImages(urls: string[]): void {
    urls.forEach(url => {
      const img = new Image();
      img.src = url;
    });
  }

  // Initialize performance optimizations
  init(): void {
    // Enable passive event listeners where possible
    this.setupPassiveListeners();

    // Optimize font loading
    this.optimizeFontLoading();

    // Setup resource hints
    this.setupResourceHints();
  }

  private setupPassiveListeners(): void {
    const events = ['scroll', 'touchstart', 'touchmove', 'wheel'];
    events.forEach(event => {
      document.addEventListener(event, () => {}, { passive: true });
    });
  }

  private optimizeFontLoading(): void {
    if ('fonts' in document) {
      document.fonts.ready.then(() => {
        console.log('Fonts loaded');
      });
    }
  }

  private setupResourceHints(): void {
    const hints = [
      { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
      { rel: 'dns-prefetch', href: '//images.unsplash.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
    ];

    hints.forEach(({ rel, href, crossorigin }) => {
      const link = document.createElement('link');
      link.rel = rel;
      link.href = href;
      if (crossorigin) link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
  }

  // Report performance metrics
  reportMetrics(): void {
    this.getCoreWebVitals().then(vitals => {
      console.log('Core Web Vitals:', vitals);

      // You can send these metrics to your analytics service
      // analytics.track('performance_metrics', vitals)
    });
  }
}

// Lazy loading utility for components
export function lazyLoadComponent<T extends React.ComponentType<any>>(
  importFunction: () => Promise<{ default: T }>,
  fallback?: React.ComponentType<any>
): React.LazyExoticComponent<T> {
  const loader = async (): Promise<{ default: T }> => {
    try {
      return await importFunction();
    } catch (error) {
      console.error('Failed to load component:', error);

      const Fallback: React.ComponentType<any> = fallback ?? DefaultFallback;

      return { default: Fallback as unknown as T };
    }
  };

  return React.lazy(loader as () => Promise<{ default: T }>);
}

const DefaultFallback: React.FC = () => <div>'Loading failed'</div>;

// Debounce utility for performance
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  immediate = false
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };

    const callNow = immediate && !timeout;

    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);

    if (callNow) func(...args);
  };
}

// Throttle utility for scroll events
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
