'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { 
  CheckCircle, 
  Play, 
  ArrowRight,
  TrendingUp,
  Users,
  Target,
  Sparkles,
  Award
} from 'lucide-react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { ResponsiveCard } from './ui/responsive-card'
import { ImageWithFallback } from './figma/ImageWithFallback'
// @ts-ignore
import exampleImage from '../assets/1787cc73d341b691f9f5f240d514e80ec93f243c.png'
import React from 'react'
// Solution features with enhanced descriptions
const creativeSolutions = [
  {
    title: 'Custom Web Design Solutions',
    highlight: 'To Drive Conversions',
    description: 'Stunning, user-centric designs that not only look incredible but convert visitors into customers.',
    icon: Target,
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    title: 'Effective Marketing Campaigns',
    highlight: 'To Generate Growth',
    description: 'Data-driven marketing strategies that amplify your brand reach and drive sustainable business growth.',
    icon: TrendingUp,
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    title: 'Tailored Branding Strategies',
    highlight: 'To Drive Engagement',
    description: 'Comprehensive brand identity solutions that resonate with your audience and build lasting connections.',
    icon: Users,
    gradient: 'from-green-500 to-emerald-500'
  }
]

// Portfolio showcase items for the floating display
const portfolioShowcase = [
  {
    title: 'Award-Winning E-commerce',
    category: 'E-commerce',
    transform: 'rotate-3 translate-y-4',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    title: 'Corporate Rebrand',
    category: 'Branding',
    transform: '-rotate-2 translate-y-8',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    title: 'SaaS Platform Design',
    category: 'Web App',
    transform: 'rotate-1 translate-y-2',
    gradient: 'from-green-500 to-emerald-500'
  }
]

export function CreativeSolutionsSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const [hoveredSolution, setHoveredSolution] = useState<number | null>(null)
  const [isVideoHovered, setIsVideoHovered] = useState(false)

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 relative overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950/30 to-slate-950">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <Badge className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white border-0 mb-6">
                <Sparkles className="w-4 h-4 mr-2" />
                Creative Excellence
              </Badge>
              
              <h2 className="font-outfit text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="block text-white mb-2">Creative Web Agency</span>
                <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  Delivering Custom Solutions
                </span>
              </h2>
            </motion.div>

            {/* Solutions List */}
            <div className="space-y-6">
              {creativeSolutions.map((solution, index) => {
                const Icon = solution.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                    className="group"
                    onMouseEnter={() => setHoveredSolution(index)}
                    onMouseLeave={() => setHoveredSolution(null)}
                  >
                    <div className="flex items-start space-x-4">
                      <motion.div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${solution.gradient} flex items-center justify-center flex-shrink-0`}
                        animate={hoveredSolution === index ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <CheckCircle className="w-6 h-6 text-white" />
                      </motion.div>
                      
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">
                          {solution.title}{' '}
                          <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                            {solution.highlight}
                          </span>
                        </h3>
                        <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                          {solution.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Company Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="space-y-4"
            >
              <p className="text-lg text-gray-300 leading-relaxed">
                Digital Silk is a web design company & digital marketing agency focused on growing 
                brands online. We create effective brand strategies, custom web design, development, 
                and digital marketing solutions to generate greater brand engagement and conversions.
              </p>
              
              <p className="text-base text-gray-400 leading-relaxed">
                We work closely with our clients to ensure each project meets their brand guidelines 
                and business goals and to provide technical and marketing expertise to ensure optimal results.
              </p>
            </motion.div>
          </div>

          {/* Right Content - Portfolio Showcase & Video */}
          <div className="relative">
            {/* Floating Portfolio Items */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, delay: 0.4 }}
              className="relative perspective-1000 mb-8"
            >
              <div className="relative h-80 sm:h-96">
                {portfolioShowcase.map((item, index) => (
                  <motion.div
                    key={index}
                    className={`absolute inset-0 ${item.transform}`}
                    style={{ zIndex: portfolioShowcase.length - index }}
                    whileHover={{ 
                      scale: 1.05, 
                      zIndex: 10,
                      rotateY: 5,
                      rotateX: 5
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <ResponsiveCard
                      variant="glass"
                      size="full"
                      hover={true}
                      className="overflow-hidden group cursor-pointer h-full"
                    >
                      <div className="relative h-full">
                        <div className={`w-full h-full bg-gradient-to-br ${item.gradient} opacity-80`} />
                        
                        {/* Content Overlay */}
                        <div className="absolute inset-0 flex flex-col justify-end p-6">
                          <Badge className="self-start bg-white/20 text-white border-0 mb-3 backdrop-blur-sm">
                            {item.category}
                          </Badge>
                          <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                          <div className="flex items-center text-white/80">
                            <Award className="w-4 h-4 mr-2" />
                            <span className="text-sm">Award Winner</span>
                          </div>
                        </div>

                        {/* Golden Trophy Floating Element */}
                        <motion.div
                          className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center"
                          animate={{ 
                            rotate: 360,
                            scale: [1, 1.1, 1]
                          }}
                          transition={{ 
                            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                          }}
                        >
                          <Award className="w-6 h-6 text-white" />
                        </motion.div>
                      </div>
                    </ResponsiveCard>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Video Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="relative"
              onMouseEnter={() => setIsVideoHovered(true)}
              onMouseLeave={() => setIsVideoHovered(false)}
            >
              <ResponsiveCard
                variant="glass"
                size="full"
                hover={true}
                className="overflow-hidden group cursor-pointer"
              >
                <div className="relative">
                  {/* Video Thumbnail */}
                  <div className="relative h-32 sm:h-40 bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                    <ImageWithFallback
                      src={exampleImage}
                      alt="See Our Work In Action"
                      className="w-full h-full object-cover opacity-60"
                    />
                    
                    {/* Play Button */}
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      animate={isVideoHovered ? { scale: 1.1 } : { scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30"
                        whileHover={{ scale: 1.2 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Play className="w-8 h-8 text-white ml-1" />
                      </motion.div>
                    </motion.div>

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>

                  {/* Video Info */}
                  <div className="p-6 bg-gradient-to-r from-purple-600 to-pink-600">
                    <h3 className="text-xl font-bold text-white mb-2">See Our Work In Action</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-white/80 text-sm">1 MINUTE</span>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Watch Now
                      </Button>
                    </div>
                  </div>
                </div>
              </ResponsiveCard>
            </motion.div>

            {/* Floating Action Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="absolute -top-8 -left-8 z-20"
            >
              <motion.div
                className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-2xl cursor-pointer"
                whileHover={{ scale: 1.1 }}
                animate={{ 
                  boxShadow: [
                    "0 0 20px rgba(6, 182, 212, 0.3)",
                    "0 0 40px rgba(6, 182, 212, 0.6)",
                    "0 0 20px rgba(6, 182, 212, 0.3)"
                  ]
                }}
                transition={{ 
                  boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                <ArrowRight className="w-8 h-8 text-white" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}