
import React, { useState, useRef, useEffect } from 'react'

interface ImageOptimizedProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  quality?: number
  priority?: boolean
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
}

export function ImageOptimized({
  src,
  alt,
  width,
  height,
  className = '',
  quality = 75,
  priority = false,
  placeholder = 'empty',
  blurDataURL
}: ImageOptimizedProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(false)
  const [shouldLoad, setShouldLoad] = useState(priority)
  const imgRef = useRef<HTMLImageElement>(null)

  // Generate WebP and fallback URLs
  const webpSrc = src.includes('unsplash.com') 
    ? `${src}&fm=webp&q=${quality}${width ? `&w=${width}` : ''}${height ? `&h=${height}` : ''}`
    : src

  const fallbackSrc = src.includes('unsplash.com')
    ? `${src}&q=${quality}${width ? `&w=${width}` : ''}${height ? `&h=${height}` : ''}`
    : src

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || shouldLoad) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true)
            observer.disconnect()
          }
        })
      },
      { rootMargin: '50px' }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [priority, shouldLoad])

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const handleError = () => {
    setError(true)
  }

  if (!shouldLoad) {
    return (
      <div
        ref={imgRef}
        className={`bg-gray-200 animate-pulse ${className}`}
        style={{
          width: width ? `${width}px` : '100%',
          height: height ? `${height}px` : 'auto',
          aspectRatio: width && height ? `${width}/${height}` : 'auto'
        }}
      />
    )
  }

  return (
    <picture className={className}>
      <source srcSet={webpSrc} type="image/webp" />
      <img
        ref={imgRef}
        src={error ? fallbackSrc : webpSrc}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
        className={`transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        style={{
          filter: !isLoaded && placeholder === 'blur' ? 'blur(5px)' : 'none'
        }}
      />
      {!isLoaded && placeholder === 'blur' && blurDataURL && (
        <img
          src={blurDataURL}
          alt=""
          className="absolute inset-0 w-full h-full object-cover blur-sm"
          aria-hidden="true"
        />
      )}
    </picture>
  )
}
