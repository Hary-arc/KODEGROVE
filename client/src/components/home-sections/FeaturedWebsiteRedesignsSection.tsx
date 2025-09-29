
'use client'

import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, RefreshCw } from 'lucide-react'
import { Button } from '../ui/button'

const clientLogos = [
  '/logos/blueridge.png',
  '/logos/integral.jpg',
  '/logos/legacy.png',
  '/logos/riverchurch.png',
  '/logos/vitech.jpg',
]

const redesignProjects = [
  {
    before: '/redesigns/oldschool.jpeg',
    after: '/redesigns/newschool.jpg',
    title: 'University Website Transformation',
    description:
      'A complete redesign focusing on usability, accessibility, and brand modernization.',
    stat: '+285% Engagement',
  },
  {
    before: '/redesigns/food-before.png',
    after: '/redesigns/food-after.png',
    title: 'Food Brand Digital Refresh',
    description:
      'Elevated their digital presence with vibrant visuals and a streamlined UX.',
    stat: '+173% Conversions',
  },
]

export default function FeaturedWebsiteRedesigns() {
  const sliderRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  // Scroll slider to specific index
  const scrollToIndex = (newIndex: number) => {
  if (!sliderRef.current) return
  const slider = sliderRef.current
  const card = slider.children[newIndex] as HTMLElement
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
    <section className="relative py-20 bg-gradient-to-b from-slate-950 via-slate-900 to-blue-950/30">
      {/* Decorative Blobs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-blue-500/20 blur-3xl animate-pulse" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-indigo-500/20 blur-3xl animate-pulse" />

      {/* Header */}
      <div className="relative z-10 text-center mb-14 px-4">
          <div className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 mb-4">
            <RefreshCw className="w-4 h-4 animate-spin-slow" />
BEFORE & AFTER
          </div>
                    <h2 className="text-3xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
          Featured Website Redesigns
                      </h2>
          <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
              Our web design agency reimagines digital experiences for brands of all
sizes and industries.
            <span className="font-semibold"> Explore our redesign portfolio.</span>
          </p>
        </div>

        {/* Client Logos */}
        <div className="overflow-x-auto mb-16">
          <div className="flex gap-8 px-4 md:px-0 min-w-max">
            {clientLogos.map((logo, i) => (
              <button
              key={i}
              onClick={() => scrollToIndex(i)}
              className={`flex-shrink-0 rounded-lg p-2 transition-transform hover:scale-110 ${
                activeIndex === i ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              <img
                src={logo}
                alt={`client-${i}`}
                className="h-12 md:h-16 object-contain"
              />
              </button>
            ))}
          </div>
        </div>

        {/* Slider */}
        <div className="relative max-w-6xl mx-auto px-4 md:px-0">
        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar"
        >
          {redesignProjects.map((project, i) => (
            <motion.div
              key={i}
              className="snap-start min-w-[80%] md:min-w-[600px] lg:min-w-[700px] bg-slate-900/70 border border-slate-800 rounded-3xl p-6 md:p-10 shadow-2xl backdrop-blur hover:scale-105 transition-transform duration-300 flex-shrink-0"
            >
            {/* Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="relative overflow-hidden rounded-xl h-64 md:h-72">
                  <img
                    src={project.before}
                    alt="Before"
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <span className="absolute top-3 left-3 bg-red-500/80 text-white text-xs font-bold px-2 py-1 rounded">
                      BEFORE
                    </span>
                                  </div>
              <div className="relative overflow-hidden rounded-xl h-64 md:h-72">
                  <img
                    src={project.after}
                    alt="After"
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <span className="absolute top-3 right-3 bg-green-500/80 text-white text-xs font-bold px-2 py-1 rounded">
                      AFTER
                    </span>
                  <span className="absolute bottom-3 right-3 bg-gradient-to-r from-green-400 to-blue-500 text-white text-sm px-3 py-1 rounded-full shadow-lg">
                    {project.stat}
                  </span>
                </div>
                          </div>

            {/* Text */}
                          <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                {project.title}
              </h3>
              <p className="text-gray-300 mb-6">{project.description}</p>

              <Button
                onClick={() => (window.location.href = '/portfolio')}
                className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600 shadow-lg rounded-full px-6 py-3 text-sm font-semibold flex items-center gap-2"
              >
                View More Work <ChevronRight className="w-4 h-4" />
              </Button>
            </motion.div>
))}
          </div>
        
        {/* Navigation */}
        <button
          onClick={prev}
          aria-label="Previous project"
          className="absolute top-1/2 -left-16 md:-left-20 transform -translate-y-1/2 p-5 rounded-full bg-blue-600/60 hover:bg-blue-700/80 z-20 shadow-lg"
        >
          <ChevronLeft className="w-7 h-7 text-white" />
        </button>
          <button
            onClick={next}
          aria-label="Next project"
            className="absolute top-1/2 -right-16 md:-right-20 transform -translate-y-1/2 p-5 rounded-full bg-blue-600/60 hover:bg-blue-700/80 z-20 shadow-lg"
          >
            <ChevronRight className="w-7 h-7 text-white" />
          </button>
              </div>
    </section>
  )
}
