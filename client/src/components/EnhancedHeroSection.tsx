'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { 
  ArrowRight, 
  Star, 
  Award,
  ExternalLink,
  Quote
} from 'lucide-react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { ResponsiveCard } from './ui/responsive-card'
import { ImageWithFallback } from './figma/ImageWithFallback'
import exampleImage from 'figma:asset/92f6adf529a2baec5efe16194b4955f985619e7a.png'

// Client logos
const clientLogos = [
  { name: 'Enchant', logo: '/logos/enchant.svg' },
  { name: 'Babies R Us', logo: '/logos/babiesrus.svg' },
  { name: 'Xerox', logo: '/logos/xerox.svg' },
  { name: 'Sony', logo: '/logos/sony.svg' },
  { name: 'P&G', logo: '/logos/pg.svg' },
  { name: 'NYU', logo: '/logos/nyu.svg' },
  { name: 'NFL', logo: '/logos/nfl.svg' },
  { name: 'HP', logo: '/logos/hp.svg' }
]

// Website mockups
const websiteMockups = [
  { title: 'Dog DNA Test', image: '/mockups/dog-dna-test.jpg', category: 'Healthcare', transform: 'rotate-3 translate-y-4' },
  { title: 'E-commerce Platform', image: '/mockups/ecommerce.jpg', category: 'E-commerce', transform: '-rotate-2 translate-y-8' },
  { title: 'Corporate Website', image: '/mockups/corporate.jpg', category: 'Corporate', transform: 'rotate-1 translate-y-2' }
]

export function EnhancedHeroSection() {
  const heroRef = useRef(null)
  const isInView = useInView(heroRef, { once: true, amount: 0.2 })
  const [hoveredMockup, setHoveredMockup] = useState<number | null>(null)

  return (
    <section ref={heroRef} className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900">
      {/* Background Image */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src={exampleImage}
          alt="Premium web design showcase"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-purple-900/40 to-black/70" />
      </div>

      {/* Floating geometric elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20">
        {/* Top Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex justify-between items-center mb-12"
        >
          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 px-4 py-2 flex items-center gap-2">
            <Award className="w-4 h-4" /> PREMIUM WEB DESIGN AGENCY
          </Badge>
          <div className="hidden lg:flex items-center space-x-6">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              REQUEST A QUOTE
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-outfit text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight"
            >
              <span className="block text-white mb-4">WE GROW BRANDS</span>
              <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                ONLINE
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-xl"
            >
              Custom Websites, Branding & Digital Marketing
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button className="gradient-electric hover:shadow-2xl hover:shadow-purple-500/30 text-white px-8 py-4 rounded-xl font-semibold text-lg group">
                REQUEST A QUOTE
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </motion.div>

            {/* Awards & Recognition */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex items-center space-x-8"
            >
              <div className="flex items-center space-x-2">
                <div className="flex">{[...Array(5)].map((_, i) => (<Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />))}</div>
                <span className="text-white font-medium">5-Star DesignRush Reviews</span>
              </div>
              <div className="hidden lg:block w-px h-8 bg-white/20" />
              <div className="hidden lg:flex items-center space-x-2">
                <Award className="w-5 h-5 text-purple-400" />
                <div>
                  <div className="text-white font-medium">Best Digital Agency of 2024</div>
                  <div className="text-purple-400 font-bold">Forbes</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Content - Mockups */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative"
          >
            <div className="relative perspective-1000">
              {websiteMockups.map((mockup, index) => (
                <motion.div
                  key={index}
                  className={`absolute inset-0 ${mockup.transform}`}
                  style={{ zIndex: websiteMockups.length - index }}
                  onMouseEnter={() => setHoveredMockup(index)}
                  onMouseLeave={() => setHoveredMockup(null)}
                  whileHover={{ scale: 1.05, zIndex: 10, rotateY: 5, rotateX: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <ResponsiveCard
                    variant="glass"
                    size="full"
                    hover={true}
                    className="overflow-hidden group cursor-pointer"
                  >
                    <div className="relative h-80 sm:h-96">
                      <ImageWithFallback src={mockup.image} alt={mockup.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <motion.div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100" initial={{ y: 20 }} whileHover={{ y: 0 }} transition={{ duration: 0.3 }}>
                        <div className="text-center text-white">
                          <Badge className="gradient-electric text-white border-0 mb-3">{mockup.category}</Badge>
                          <h3 className="text-xl font-bold mb-4">{mockup.title}</h3>
                          <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                            <ExternalLink className="w-4 h-4 mr-2" /> View Project
                          </Button>
                        </div>
                      </motion.div>
                    </div>
                  </ResponsiveCard>
                </motion.div>
              ))}
            </div>

            {/* Project Quote Action */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="absolute -bottom-6 -right-6 lg:-right-12"
            >
              <ResponsiveCard variant="gradient" size="md" hover={true} className="group cursor-pointer max-w-xs">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                    <Quote className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-white mb-1">GOT A PROJECT?</div>
                    <div className="text-cyan-400 font-medium group-hover:text-cyan-300 transition-colors duration-300">
                      Speak With Our Experts
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </ResponsiveCard>
            </motion.div>
          </motion.div>
        </div>

        {/* Client Logos */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-20 pt-12 border-t border-white/10"
        >
          <div className="grid grid-cols-4 lg:grid-cols-8 gap-8 items-center opacity-60">
            {clientLogos.map((client) => (
              <motion.div
                key={client.name}
                className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm">
                  <span className="text-white font-bold text-sm">{client.name.slice(0, 3).toUpperCase()}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 2.0 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div className="w-8 h-12 border-2 border-white/40 rounded-full flex justify-center p-2 cursor-pointer" animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
          <motion.div className="w-1.5 h-4 gradient-electric rounded-full" animate={{ scaleY: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
        </motion.div>
      </motion.div>
    </section>
  )
}
