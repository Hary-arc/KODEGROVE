import React, { useState, useRef, useEffect, useCallback } from 'react';

interface ImageOptimizedProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  quality?: number;
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  sizes?: string;
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
  blurDataURL,
  sizes = '100vw',
}: ImageOptimizedProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Generate optimized URLs with multiple formats
  const generateSrcSet = useCallback((baseSrc: string, baseQuality: number) => {
    if (!baseSrc.includes('unsplash.com')) return baseSrc;

    const widths = [400, 800, 1200, 1600];
    return widths.map(w => `${baseSrc}&w=${w}&q=${baseQuality}&fm=webp ${w}w`).join(', ');
  }, []);

  const webpSrc = src.includes('unsplash.com')
    ? `${src}&fm=webp&q=${quality}${width ? `&w=${width}` : ''}${height ? `&h=${height}` : ''}`
    : src;

  const fallbackSrc = src.includes('unsplash.com')
    ? `${src}&q=${quality}${width ? `&w=${width}` : ''}${height ? `&h=${height}` : ''}`
    : src;

  const srcSet = generateSrcSet(src, quality);

  // Optimized intersection observer
  useEffect(() => {
    if (priority || shouldLoad) return;

    observerRef.current = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            observerRef.current?.disconnect();
          }
        });
      },
      {
        rootMargin: '50px',
        threshold: 0.01,
      }
    );

    if (imgRef.current) {
      observerRef.current.observe(imgRef.current);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [priority, shouldLoad]);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const handleError = useCallback(() => {
    setError(true);
    setIsLoaded(true); // Still mark as loaded to remove loading state
  }, []);

  // Placeholder while not loaded
  if (!shouldLoad) {
    return (
      <div
        ref={imgRef}
        className={`bg-gray-800/50 animate-pulse ${className}`}
        style={{
          width: width ? `${width}px` : '100%',
          height: height ? `${height}px` : 'auto',
          aspectRatio: width && height ? `${width}/${height}` : 'auto',
        }}
        role="img"
        aria-label={`Loading ${alt}`}
      />
    );
  }

  return (
    <div className={`relative ${className}`}>
      {!isLoaded && placeholder === 'blur' && blurDataURL && (
        <img
          src={blurDataURL}
          alt=""
          className="absolute inset-0 w-full h-full object-cover blur-sm"
          aria-hidden="true"
        />
      )}

      <picture>
        <source srcSet={srcSet} type="image/webp" sizes={sizes} />
        <img
          ref={imgRef}
          src={error ? fallbackSrc : webpSrc}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          className={`transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          style={{
            filter: !isLoaded && placeholder === 'blur' ? 'blur(5px)' : 'none',
          }}
        />
      </picture>

      {!isLoaded && placeholder === 'empty' && (
        <div className="absolute inset-0 bg-gray-800/50 animate-pulse rounded" />
      )}
    </div>
  );
}
