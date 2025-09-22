'use client'

import { useState } from 'react'
import { ImageOff } from 'lucide-react'

interface ImagePlaceholderProps {
  src: string
  alt: string
  className?: string
  fallbackSrc?: string
  children?: React.ReactNode
}

export function ImagePlaceholder({ 
  src, 
  alt, 
  className = '', 
  fallbackSrc,
  children 
}: ImagePlaceholderProps) {
  const [imageError, setImageError] = useState(false)
  const [fallbackError, setFallbackError] = useState(false)

  // If both main image and fallback fail, show placeholder
  if (imageError && (fallbackError || !fallbackSrc)) {
    return (
      <div className={`bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center relative overflow-hidden ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-cyan-500/10" />
        <div className="relative z-10 text-center text-gray-400">
          <ImageOff className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <div className="text-sm opacity-60">{alt}</div>
        </div>
        {children}
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={imageError && fallbackSrc ? fallbackSrc : src}
        alt={alt}
        className="w-full h-full object-cover"
        onError={() => {
          if (!imageError) {
            setImageError(true)
          } else if (fallbackSrc && !fallbackError) {
            setFallbackError(true)
          }
        }}
      />
      {children}
    </div>
  )
}