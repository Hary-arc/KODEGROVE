'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ImageWithFallback } from '../figma/ImageWithFallback'

interface VideoBackgroundProps {
  src: string
  poster?: string
  className?: string
  autoPlay?: boolean
  muted?: boolean
  loop?: boolean
  overlay?: boolean
  overlayOpacity?: number
}

export function VideoBackground({
  src,
  poster,
  className = '',
  autoPlay = true,
  muted = true,
  loop = true,
  overlay = true,
  overlayOpacity = 0.5
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleLoadedData = () => setIsLoaded(true)
    const handleError = () => setHasError(true)

    video.addEventListener('loadeddata', handleLoadedData)
    video.addEventListener('error', handleError)

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData)
      video.removeEventListener('error', handleError)
    }
  }, [])

  // Fallback to image if video fails or isn't supported
  if (hasError || !src) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <ImageWithFallback
          src={poster || "https://images.unsplash.com/photo-1519389950473-47ba0277781c"}
          alt="Video background fallback"
          className="w-full h-full object-cover"
        />
        {overlay && (
          <div 
            className="absolute inset-0 bg-black"
            style={{ opacity: overlayOpacity }}
          />
        )}
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.video
        ref={videoRef}
        className="w-full h-full object-cover"
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline
        poster={poster}
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ 
          scale: isLoaded ? 1 : 1.1, 
          opacity: isLoaded ? 1 : 0 
        }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </motion.video>

      {overlay && (
        <div 
          className="absolute inset-0 bg-gradient-to-br from-black/60 via-purple-900/20 to-black/60"
          style={{ opacity: overlayOpacity }}
        />
      )}

      {/* Loading indicator */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
          <motion.div
            className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </div>
      )}
    </div>
  )
}
