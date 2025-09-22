'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Button } from './ui/button'
import { Sparkles, ArrowRight, Play, Pause, Volume2, VolumeX } from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isInView = useInView(containerRef, { once: true })
  
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [progress, setProgress] = useState(0)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  // Client logos data
  const clientLogos = [
    'Google', 'Microsoft', 'Apple', 'Amazon', 'Meta', 'Netflix', 'Spotify', 'Adobe',
    'Uber', 'Airbnb', 'Stripe', 'Slack', 'Zoom', 'Tesla', 'Twitter', 'LinkedIn'
  ]

  // Animated headline text
  const headlineText = "Digital Mastery Unleashed"
  const [displayedText, setDisplayedText] = useState("")

  useEffect(() => {
    if (!isInView) return

    let currentIndex = 0
    const interval = setInterval(() => {
      if (currentIndex <= headlineText.length) {
        setDisplayedText(headlineText.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(interval)
      }
    }, 100)

    return () => clearInterval(interval)
  }, [isInView])

  // Hypnotic particles animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
      color: string
    }> = []

    const colors = ['#8b5cf6', '#06b6d4', '#ec4899', '#10b981']

    // Create particles
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.3 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)]
      })
    }

    let animationId: number

    function animate() {
      if (!ctx || !canvas) return
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particles.forEach((particle, index) => {
        particle.x += particle.vx
        particle.y += particle.vy
        
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1
        
        ctx.save()
        ctx.globalAlpha = particle.opacity
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()
        
        ctx.shadowBlur = 15
        ctx.shadowColor = particle.color
        ctx.fill()
        ctx.restore()
        
        // Connect nearby particles
        particles.slice(index + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 120) {
            ctx.save()
            ctx.globalAlpha = (120 - distance) / 120 * 0.15
            ctx.strokeStyle = particle.color
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.stroke()
            ctx.restore()
          }
        })
      })
      
      animationId = requestAnimationFrame(animate)
    }
    
    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)
    
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Video controls
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100
      setProgress(progress)
    }
  }

  const scrollToContact = () => {
    const element = document.querySelector('#contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToPortfolio = () => {
    const element = document.querySelector('#portfolio')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.4 }}
      />
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-purple-900/30 to-slate-900/90" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(139,92,246,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(6,182,212,0.15),transparent_50%)]" />

      <div className="relative z-10 w-full">
        {/* Hero Content */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
            {/* Left Content */}
            <motion.div 
              className="space-y-8"
              style={{ opacity }}
            >
              {/* Floating Badge */}
              <motion.div
                className="inline-flex items-center space-x-3 glass rounded-full px-6 py-3 border border-white/20"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, delay: 0.2 }}
              >
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Sparkles key={i} className="w-4 h-4 text-yellow-400 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                  ))}
                </div>
                <span className="font-medium text-gray-200">Trusted by 500+ Global Clients</span>
              </motion.div>

              {/* Animated Headline */}
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1.2, delay: 0.4 }}
              >
                <h1 className="font-outfit text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold leading-[0.9] tracking-tight">
                  <span className="block bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                    Digital
                  </span>
                  <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                    {displayedText}
                    <span className="animate-pulse">|</span>
                  </span>
                </h1>
              </motion.div>

              {/* Subtitle */}
              <motion.p 
                className="text-2xl lg:text-3xl text-gray-300 leading-relaxed max-w-2xl"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, delay: 0.8 }}
              >
                We create{' '}
                <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent font-semibold">
                  hypnotic digital experiences
                </span>{' '}
                that mesmerize users and transform businesses into digital powerhouses.
              </motion.p>

              {/* Metrics */}
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-3 gap-6"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, delay: 1.0 }}
              >
                {[
                  { number: '500+', label: 'Projects Completed', icon: '🚀' },
                  { number: '98%', label: 'Client Satisfaction', icon: '⭐' },
                  { number: '250%', label: 'Avg ROI Increase', icon: '📈' }
                ].map((stat, index) => (
                  <motion.div 
                    key={index} 
                    className="glass rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 group"
                    whileHover={{ scale: 1.05, y: -8 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-3xl mb-3">{stat.icon}</div>
                    <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                      {stat.number}
                    </div>
                    <div className="text-gray-300 font-medium text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-6"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, delay: 1.2 }}
              >
                <Button
                  onClick={scrollToContact}
                  size="lg"
                  className="relative px-12 py-6 gradient-electric hover:shadow-2xl hover:shadow-purple-500/30 text-white text-xl font-semibold rounded-2xl transition-all duration-300 group overflow-hidden magnetic"
                >
                  <span className="relative z-10 flex items-center space-x-3">
                    <Sparkles className="w-6 h-6" />
                    <span>Start Your Project</span>
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </Button>
              </motion.div>
            </motion.div>

            {/* Right Content - Video Player */}
            <motion.div 
              className="relative"
              style={{ y, scale }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.6 }}
            >
              <div className="relative group">
                {/* Video Container */}
                <div className="relative overflow-hidden rounded-3xl border border-white/20 shadow-2xl">
                  {/* Video Element (using image as placeholder) */}
                  <div className="relative w-full h-96 lg:h-[500px]">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1652265540589-46f91535337b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB2aWRlbyUyMGNvbmZlcmVuY2UlMjBwcmVzZW50YXRpb258ZW58MXx8fHwxNzU2MzI3NDc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                      alt="CodeFlow showcase video"
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Video Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Play Button */}
                    <motion.button
                      onClick={togglePlay}
                      className="absolute inset-0 flex items-center justify-center group"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="w-24 h-24 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/100 transition-all duration-300">
                        {isPlaying ? (
                          <Pause className="w-10 h-10 text-slate-900 ml-1" />
                        ) : (
                          <Play className="w-10 h-10 text-slate-900 ml-1" />
                        )}
                      </div>
                    </motion.button>
                  </div>

                  {/* Custom Video Controls */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                    {/* Progress Bar */}
                    <div className="w-full h-1 bg-white/20 rounded-full mb-4">
                      <div 
                        className="h-full gradient-electric rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    
                    {/* Controls */}
                    <div className="flex items-center justify-between text-white">
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={togglePlay}
                          className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-300"
                        >
                          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                        </button>
                        <button
                          onClick={toggleMute}
                          className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-300"
                        >
                          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                        </button>
                      </div>
                      <div className="text-sm font-medium">
                        Watch Our Story
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Stats */}
                <motion.div
                  className="absolute -bottom-8 -left-8 glass rounded-2xl p-6 border border-white/20"
                  initial={{ opacity: 0, x: -30, y: 30 }}
                  animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
                  transition={{ duration: 1, delay: 1.4 }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 gradient-electric rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold">24h</span>
                    </div>
                    <div>
                      <div className="text-white font-bold">Quick Response</div>
                      <div className="text-sm text-gray-400">Average reply time</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute -top-8 -right-8 glass rounded-2xl p-6 border border-white/20"
                  initial={{ opacity: 0, x: 30, y: -30 }}
                  animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
                  transition={{ duration: 1, delay: 1.6 }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 gradient-electric rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold">99%</span>
                    </div>
                    <div>
                      <div className="text-white font-bold">Success Rate</div>
                      <div className="text-sm text-gray-400">Project completion</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Client Logo Marquee */}
        <motion.div
          className="mt-32 pb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1.8 }}
        >
          <div className="text-center mb-12">
            <p className="text-gray-400 font-medium mb-8">Trusted by industry leaders</p>
          </div>
          
          {/* Marquee Container */}
          <div className="relative overflow-hidden">
            <div className="flex animate-marquee whitespace-nowrap">
              {/* First set of logos */}
              {clientLogos.map((logo, index) => (
                <motion.div
                  key={`first-${index}`}
                  className="mx-8 flex-shrink-0"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="glass rounded-2xl px-8 py-4 border border-white/10 hover:border-white/30 transition-all duration-300">
                    <span className="text-2xl font-bold bg-gradient-to-r from-gray-300 to-white bg-clip-text text-transparent">
                      {logo}
                    </span>
                  </div>
                </motion.div>
              ))}
              
              {/* Duplicate set for seamless loop */}
              {clientLogos.map((logo, index) => (
                <motion.div
                  key={`second-${index}`}
                  className="mx-8 flex-shrink-0"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="glass rounded-2xl px-8 py-4 border border-white/10 hover:border-white/30 transition-all duration-300">
                    <span className="text-2xl font-bold bg-gradient-to-r from-gray-300 to-white bg-clip-text text-transparent">
                      {logo}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 2.0 }}
          style={{ opacity }}
        >
          <motion.div
            className="w-8 h-12 border-2 border-white/40 rounded-full flex justify-center p-2 cursor-pointer"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            onClick={scrollToPortfolio}
          >
            <motion.div
              className="w-1.5 h-4 gradient-electric rounded-full"
              animate={{ scaleY: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}