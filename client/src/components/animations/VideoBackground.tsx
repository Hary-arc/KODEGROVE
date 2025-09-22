'use client'

import { useState, useRef, useEffect, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, Volume2, VolumeX } from 'lucide-react'
import { ImageWithFallback } from '../figma/ImageWithFallback'

interface VideoBackgroundProps {
  src: string
  poster?: string
  className?: string
  autoPlay?: boolean
  muted?: boolean
  loop?: boolean
  controls?: boolean
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
  controls = false,
  overlay = true,
  overlayOpacity = 0.5
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [isMuted, setIsMuted] = useState(muted)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleLoadedData = () => setIsLoaded(true)
    const handleError = () => setHasError(true)
    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)

    video.addEventListener('loadeddata', handleLoadedData)
    video.addEventListener('error', handleError)
    video.addEventListener('play', handlePlay)
    video.addEventListener('pause', handlePause)

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData)
      video.removeEventListener('error', handleError)
      video.removeEventListener('play', handlePlay)
      video.removeEventListener('pause', handlePause)
    }
  }, [])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
    } else {
      video.play()
    }
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    video.muted = !video.muted
    setIsMuted(video.muted)
  }

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

      {controls && isLoaded && (
        <motion.div
          className="absolute bottom-4 right-4 flex space-x-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <motion.button
            onClick={togglePlay}
            className="glass rounded-full p-3 border border-white/20 text-white hover:bg-white/10 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </motion.button>

          <motion.button
            onClick={toggleMute}
            className="glass rounded-full p-3 border border-white/20 text-white hover:bg-white/10 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </motion.button>
        </motion.div>
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

interface CaseStudyVideoProps {
  src: string
  poster?: string
  title?: string
  description?: string
  className?: string
}

export function CaseStudyVideo({
  src,
  poster,
  title,
  description,
  className = ''
}: CaseStudyVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handlePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (video.paused) {
      video.play()
      setIsPlaying(true)
    } else {
      video.pause()
      setIsPlaying(false)
    }
  }

  return (
    <motion.div
      className={`relative group cursor-pointer rounded-xl overflow-hidden ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        poster={poster}
        muted
        onEnded={() => setIsPlaying(false)}
      >
        <source src={src} type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Play button */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 1 }}
        animate={{ opacity: isPlaying ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.button
          onClick={handlePlay}
          className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/100 transition-all duration-300 shadow-2xl"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Play className="w-8 h-8 text-slate-900 ml-1" />
        </motion.button>
      </motion.div>

      {/* Info overlay */}
      {(title || description) && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 p-6 text-white"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {title && (
            <h3 className="font-outfit text-xl font-bold mb-2">{title}</h3>
          )}
          {description && (
            <p className="text-gray-300 text-sm">{description}</p>
          )}
        </motion.div>
      )}
    </motion.div>
  )
}

interface VideoModalProps {
  isOpen: boolean
  onClose: () => void
  src: string
  title?: string
}

export function VideoModal({ isOpen, onClose, src, title }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      videoRef.current?.play()
    } else {
      document.body.style.overflow = 'auto'
      videoRef.current?.pause()
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-6xl mx-4"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <h2 className="text-white text-2xl font-bold mb-4 text-center">
            {title}
          </h2>
        )}
        
        <div className="relative rounded-xl overflow-hidden">
          <video
            ref={videoRef}
            className="w-full h-auto"
            controls
            autoPlay
            muted
          >
            <source src={src} type="video/mp4" />
          </video>
        </div>

        <motion.button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors duration-200"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </motion.button>
      </motion.div>
    </motion.div>
  )
}