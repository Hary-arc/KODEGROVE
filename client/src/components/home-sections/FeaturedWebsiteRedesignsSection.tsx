'use client'

import { useRef, useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, RefreshCw, ExternalLink, TrendingUp, Zap } from 'lucide-react'
import { Button } from '../ui/button'


const clientLogos = [
  { name: 'BlueRidge', logo: '/logos/blueridge.png' },
  { name: 'Integral', logo: '/logos/integral.jpg' },
  { name: 'Legacy', logo: '/logos/legacy.png' },
  { name: 'RiverChurch', logo: '/logos/riverchurch.png' },
  { name: 'ViTech', logo: '/logos/vitech.jpg' },
]

const redesignProjects = [
  {
    before: '/redesigns/oldschool.jpeg',
    after: '/redesigns/newschool.jpg',
    title: 'University Website Transformation',
    description: 'A complete redesign focusing on usability, accessibility, and brand modernization.',
    stat: '+285% Engagement',
    client: 'Blueridge',
    category: 'Education',
    duration: '6 months',
  },
  {
    before: '/redesigns/oldschool.jpeg',
    after: '/redesigns/newschool.jpg',
    title: 'Food Brand Digital Refresh',
    description: 'Elevated their digital presence with vibrant visuals and a streamlined UX.',
    stat: '+173% Conversions',
    client: 'Integral',
    category: 'Food & Beverage',
    duration: '4 months',
  },
  {
    before: '/redesigns/oldschool.jpeg',
    after: '/redesigns/newschool.jpg',
    title: 'Food Brand Digital Refresh',
    description: 'Elevated their digital presence with vibrant visuals and a streamlined UX.',
    stat: '+173% Conversions',
    client: 'Legacy',
    category: 'Food & Beverage',
    duration: '4 months',
  },
  {
    before: '/redesigns/oldschool.jpeg',
    after: '/redesigns/newschool.jpg',
    title: 'Food Brand Digital Refresh',
    description: 'Elevated their digital presence with vibrant visuals and a streamlined UX.',
    stat: '+173% Conversions',
    client: 'Riverchurch',
    category: 'Food & Beverage',
    duration: '4 months',
  },
  {
    before: '/redesigns/oldschool.jpeg',
    after: '/redesigns/newschool.jpg',
    title: 'Food Brand Digital Refresh',
    description: 'Elevated their digital presence with vibrant visuals and a streamlined UX.',
    stat: '+173% Conversions',
    client: 'Vitech',
    category: 'Food & Beverage',
    duration: '4 months',
  },
]

export default function FeaturedWebsiteRedesigns() {
  const sliderRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)

  // Auto-scroll functionality
  useEffect(() => {
    if (isHovering) return
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % redesignProjects.length)
      scrollToIndex((activeIndex + 1) % redesignProjects.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [activeIndex, isHovering])

  // Scroll slider to specific index
  const scrollToIndex = (newIndex: number) => {
    if (!sliderRef.current) return
    const slider = sliderRef.current
    const card = slider.children[newIndex] as HTMLElement
    if (!card) return
    const left = card.offsetLeft - (slider.clientWidth - card.clientWidth) / 2
    slider.scrollTo({ left, behavior: 'smooth' })
    setActiveIndex(newIndex)
  }

  // Update activeIndex on manual scroll
  useEffect(() => {
    const slider = sliderRef.current
    if (!slider) return
    const handleScroll = () => {
      const children = Array.from(slider.children) as HTMLElement[]
      const center = slider.scrollLeft + slider.offsetWidth / 2
      const newIndex = children.findIndex(
        (child) => child.offsetLeft <= center && child.offsetLeft + child.offsetWidth > center
      )
      if (newIndex !== -1 && newIndex !== activeIndex) setActiveIndex(newIndex)
    }
    slider.addEventListener('scroll', handleScroll, { passive: true })
    return () => slider.removeEventListener('scroll', handleScroll)
  }, [activeIndex])

  const next = () => scrollToIndex((activeIndex + 1) % redesignProjects.length)
  const prev = () =>
    scrollToIndex((activeIndex - 1 + redesignProjects.length) % redesignProjects.length)

  return (
    <section className="relative py-16 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-blue-950/30 ">
      {/* Animated Blobs + Grid */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-blue-500/20 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.1, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-indigo-500/20 blur-3xl"
        />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center mb-16 px-4"
      >
        <motion.div
          animate={{ rotate: 0 }}
          transition={{ duration: 1, repeat: 2, ease: 'linear' }}
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 mb-6 bg-blue-500/10 px-4 py-2 rounded-full border border-blue-500/20"
        >
          <RefreshCw className="w-4 h-4" />
          BEFORE & AFTER
        </motion.div>
        <h2 className="text-4xl md:text-6xl lg:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400 leading-tight md:leading-snug">
          Featured Website Redesigns
        </h2>
        <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
          Our web design agency reimagines digital experiences for brands of all sizes and industries.{' '}
          <span className="font-semibold text-cyan-400">Explore our redesign portfolio.</span>
        </p>
      </motion.div>

      {/* Client Logos */}
<div className="flex justify-center items-center gap-0 overflow-x-auto scrollbar-hide px-4 mb-4">
  {clientLogos.map((client, i) => (
    <motion.button
      key={i}
      onClick={() => scrollToIndex(i % redesignProjects.length)}
      whileHover={{ scale: 1.05, y: -3 }}
      whileTap={{ scale: 0.95 }}
      className={`group relative p-3 sm:p-4 rounded-2xl backdrop-blur-sm border transition-all duration-300 ${
        activeIndex === (i % redesignProjects.length)
          ? 'bg-blue-500/20 border-blue-500/50 shadow-lg shadow-blue-500/25'
          : 'bg-slate-800/30 border-slate-700/50 hover:bg-slate-700/40 hover:border-slate-600/50'
      }`}
    >
      <img
        src={client.logo}
        alt={client.name}
        className="h-24 md:h-14 lg:h-16 object-contain group-hover:grayscale-0 transition-all duration-300"
      />

      <AnimatePresence>
        {activeIndex === (i % redesignProjects.length) && (
          <motion.div
            key="activeClientIndicator"
            className="absolute -bottom-2  left-1/2 transform -translate-x-1/2 h-1 w-12 xs:w-16 sm:w-20 bg-blue-500 z-50 rounded-full shadow-[0_0_8px_2px_rgba(59,130,246,0.6)]"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          />
        )}
      </AnimatePresence>
    </motion.button>
  ))}
</div>



      {/* Slider */}
      <div
        className="relative max-w-6xl mx-auto px-4 md:px-0"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div
          ref={sliderRef}
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar"

        >
          {redesignProjects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="snap-center w-full sm:min-w-[85%] md:min-w-[600px] lg:min-w-[800px] bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6 md:p-12 shadow-2xl flex-shrink-0 group"

            >
              {/* Project Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ...">
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>

                  <div>
                    <p className="text-blue-400 font-semibold">{project.client}</p>
                    <p className="text-gray-400 text-sm">{project.category} • {project.duration}</p>

                  </div>
                </div>
                <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white text-xs sm:text-sm px-2 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-lg flex items-center gap-1 sm:gap-2">
                  <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
                  {project.stat}
                </div>

              </div>

              {/* Images */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div className="relative overflow-hidden rounded-xl h-64 md:h-72">
                <img src={project.before} alt="Before"
                  className="w-full max-h-72 sm:h-32 md:h-80 object-cover rounded-xl sm:rounded-2xl transition-transform duration-500 group-hover/image:scale-105"
                />
                <span className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-red-500/90 text-white text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 sm:py-1.5 rounded-full">
                  BEFORE
                </span>
                </div>
                <div className="relative overflow-hidden rounded-xl h-64 md:h-72">
                  <img src={project.after} alt="After"
                    className="w-full max-h-72 sm:h-32 md:h-80 object-cover rounded-xl sm:rounded-2xl transition-transform duration-500 group-hover/image:scale-105"
                  />
                  <span className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-green-500/90 text-white text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 sm:py-1.5 rounded-full">
                    AFTER
                  </span>
                    <span className="absolute bottom-3 right-3 bg-gradient-to-r from-green-400 to-blue-500 text-white text-sm px-3 py-1 rounded-full shadow-lg">
                    {project.stat}
                  </span>
                </div>
              </div>


              {/* Text + CTA */}
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                {project.title}
              </h3>
              <p className="text-gray-300 mb-6">{project.description}</p>
                <Button 
                 onClick={() => (window.location.hash = "/portfolio")}
                className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600 shadow-lg rounded-full px-6 py-3 text-sm font-semibold flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                  View Full Case Study
                  <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                    <ExternalLink className="w-4 h-4" />
                  </motion.div>
                </Button>
            </motion.div>
          ))}
        </div>

        {/* Navigation */}
        <motion.button
          onClick={prev}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="hidden sm:flex absolute top-1/2 -left-4 md:-left-12 transform -translate-y-1/2 p-4 rounded-full bg-blue-600/70 hover:bg-blue-700/90 shadow-xl z-20"
        >
          <ChevronLeft className="w-9 h-9 text-white" />
        </motion.button>
        <motion.button
          onClick={next}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="hidden sm:flex absolute top-1/2 -right-4 md:-right-12 transform -translate-y-1/2 p-4 rounded-full bg-blue-600/70 hover:bg-blue-700/90 shadow-xl z-20"
        >
          <ChevronRight className="w-9 h-9 text-white" />
        </motion.button>

        {/* Progress Dots */}
        {/* <div className="flex justify-center gap-3 mt-12">
          {redesignProjects.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => scrollToIndex(index)}
              whileHover={{ scale: 1.2 }}
              className={`transition-all duration-300 ${
                index === activeIndex
                  ? 'w-12 h-3 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full'
                  : 'w-3 h-3 bg-slate-600 hover:bg-slate-500 rounded-full'
              }`}
            />
          ))}
        </div> */}
      </div>
    </section>
  )
}
