'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, Monitor, Smartphone, Tablet, RefreshCw, Maximize2, Minimize2 } from 'lucide-react'
import { useState } from 'react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'

interface SitePreviewModalProps {
  isOpen: boolean
  onClose: () => void
  url: string
  title: string
  category?: string
}

type DeviceMode = 'desktop' | 'tablet' | 'mobile'

export function SitePreviewModal({ isOpen, onClose, url, title, category }: SitePreviewModalProps) {
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('desktop')
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [iframeKey, setIframeKey] = useState(0)

  const handleRefresh = () => {
    setIsLoading(true)
    setIframeKey(prev => prev + 1)
  }

  const handleOpenExternal = () => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const getDeviceWidth = () => {
    switch (deviceMode) {
      case 'mobile':
        return 'max-w-[375px]'
      case 'tablet':
        return 'max-w-[768px]'
      case 'desktop':
      default:
        return 'max-w-[1400px]'
    }
  }

  const getDeviceHeight = () => {
    switch (deviceMode) {
      case 'mobile':
        return 'h-[667px]'
      case 'tablet':
        return 'h-[1024px]'
      case 'desktop':
      default:
        return isFullscreen ? 'h-[90vh]' : 'h-[80vh]'
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={`relative w-full ${isFullscreen ? 'max-w-full mx-4' : getDeviceWidth()} ${isFullscreen ? 'my-4' : ''}`}
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="glass border border-white/20 rounded-t-3xl p-4 flex items-center justify-between gap-4 backdrop-blur-xl">
              <div className="flex items-center space-x-3 min-w-0 flex-1">
                <div className="w-10 h-10 gradient-electric rounded-xl flex items-center justify-center flex-shrink-0">
                  <Monitor className="w-5 h-5 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-white truncate">{title}</h3>
                  {category && (
                    <Badge variant="secondary" className="glass border border-white/20 text-gray-300 text-xs mt-1">
                      {category}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Device Mode Toggles */}
              <div className="flex items-center space-x-2 glass rounded-xl p-1.5 border border-white/10">
                <button
                  onClick={() => setDeviceMode('desktop')}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    deviceMode === 'desktop'
                      ? 'gradient-electric text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                  title="Desktop View"
                >
                  <Monitor className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDeviceMode('tablet')}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    deviceMode === 'tablet'
                      ? 'gradient-electric text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                  title="Tablet View"
                >
                  <Tablet className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDeviceMode('mobile')}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    deviceMode === 'mobile'
                      ? 'gradient-electric text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                  title="Mobile View"
                >
                  <Smartphone className="w-4 h-4" />
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleRefresh}
                  className="p-2 glass rounded-xl text-gray-400 hover:text-white transition-all duration-300 border border-white/10 hover:border-white/30"
                  title="Refresh"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="p-2 glass rounded-xl text-gray-400 hover:text-white transition-all duration-300 border border-white/10 hover:border-white/30"
                  title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                >
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={handleOpenExternal}
                  className="p-2 glass rounded-xl text-gray-400 hover:text-white transition-all duration-300 border border-white/10 hover:border-white/30"
                  title="Open in New Tab"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
                <button
                  onClick={onClose}
                  className="p-2 glass rounded-xl text-gray-400 hover:text-white transition-all duration-300 border border-white/10 hover:border-red-400/30 hover:text-red-400"
                  title="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* URL Bar */}
            <div className="glass border-x border-white/10 px-4 py-3 flex items-center space-x-3 backdrop-blur-xl">
              <div className="flex space-x-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <div className="flex-1 glass rounded-lg px-4 py-2 border border-white/10">
                <p className="text-sm text-gray-300 truncate">{url}</p>
              </div>
            </div>

            {/* Preview Content */}
            <div className={`glass border border-white/20 rounded-b-3xl overflow-hidden relative ${getDeviceHeight()} backdrop-blur-xl`}>
              {/* Loading Overlay */}
              <AnimatePresence>
                {isLoading && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 flex items-center justify-center z-10"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-center">
                      <div className="relative mb-4">
                        <div className="w-16 h-16 border-4 border-transparent border-t-white/60 border-r-white/60 rounded-full animate-spin mx-auto"></div>
                        <div 
                          className="absolute inset-0 w-16 h-16 border-4 border-transparent border-b-purple-400 border-l-purple-400 rounded-full animate-spin mx-auto" 
                          style={{ 
                            animationDirection: 'reverse', 
                            animationDuration: '1.5s' 
                          }}
                        ></div>
                      </div>
                      <p className="text-gray-300">Loading preview...</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Iframe */}
              <iframe
                key={iframeKey}
                src={url}
                className="w-full h-full bg-white"
                title={`Preview of ${title}`}
                onLoad={() => setIsLoading(false)}
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                loading="lazy"
              />

              {/* Device Frame Overlay for Mobile/Tablet */}
              {deviceMode !== 'desktop' && (
                <div className="absolute inset-0 pointer-events-none border-8 border-slate-900 rounded-3xl"></div>
              )}
            </div>

            {/* Footer Info */}
            <div className="mt-4 flex items-center justify-between text-sm text-gray-400">
              <p>Preview Mode: <span className="text-white capitalize">{deviceMode}</span></p>
              <Button
                onClick={handleOpenExternal}
                variant="outline"
                size="sm"
                className="glass border-white/20 text-white hover:bg-white/10"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Open Full Site
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
