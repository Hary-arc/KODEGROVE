'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { RefreshCw, ArrowRight, ExternalLink, TrendingUp } from 'lucide-react'
import { Button } from '../ui/button'
import { ImageWithFallback } from '../figma/ImageWithFallback'

const clientLogos = [
  { name: 'NewChurch Live', color: 'text-blue-400' },
  { name: 'POWR2', color: 'text-cyan-400' },
  { name: 'Applied Intelligence', color: 'text-purple-400' },
  { name: 'Ventura Foods', color: 'text-green-400' },
  { name: 'VERUS', color: 'text-indigo-400' }
]

const redesignProjects = [
  {
    title: 'University Website Redesign',
    category: 'Educational Institution',
    beforeImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072',
    afterImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070',
    improvement: '+285% User Engagement',
    description: 'Complete overhaul of university website with modern design and improved user experience'
  }
]

export default function FeaturedWebsiteRedesignsSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  return (
    <section 
      ref={sectionRef}
      className="py-24 relative overflow-hidden bg-gradient-to-b from-slate-950 to-blue-950/20"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-cyan-900/10 to-slate-900"></div>
      <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.25, 0, 1] }}
        >
          <motion.div
            className="inline-flex items-center space-x-3 glass rounded-full px-6 py-3 mb-8 border border-white/20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <RefreshCw className="w-5 h-5 text-cyan-400" />
            <span className="font-medium text-gray-200">BEFORE & AFTER</span>
          </motion.div>
          
          <h2 className="font-outfit text-4xl lg:text-6xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Featured Website
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Redesigns
            </span>
          </h2>
          
          <motion.div
            className="max-w-3xl mx-auto space-y-4"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p className="text-lg text-gray-300 leading-relaxed">
              Our web design agency reimagines digital experiences for brands of all sizes and across industries.
            </p>
            <p className="text-xl font-semibold text-cyan-400">
              Explore our redesign portfolio.
            </p>
          </motion.div>
        </motion.div>

        {/* Client Logos */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {clientLogos.map((client, index) => (
              <motion.div
                key={client.name}
                className="group cursor-pointer"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.1 }}
              >
                <div className="glass rounded-lg px-6 py-3 border border-white/10 hover:border-cyan-400/30 transition-all duration-300">
                  <span className={`text-lg font-bold ${client.color} group-hover:text-white transition-colors duration-300`}>
                    {client.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Before/After Arrow */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <div className="inline-flex items-center space-x-4">
            <span className="text-purple-400 font-bold text-lg">BEFORE</span>
            <motion.div
              className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400 flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <ArrowRight className="w-8 h-8 text-white" />
            </motion.div>
            <span className="text-cyan-400 font-bold text-lg">AFTER</span>
          </div>
        </motion.div>

        {/* Redesign Showcase */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <div className="glass rounded-3xl p-8 border border-white/10 hover:border-cyan-400/30 transition-all duration-500">
            {/* Project Images */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Before Image */}
              <motion.div
                className="relative group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative aspect-video rounded-xl overflow-hidden">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072"
                    alt="Website Before Redesign"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      BEFORE
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* After Image */}
              <motion.div
                className="relative group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative aspect-video rounded-xl overflow-hidden">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070"
                    alt="Website After Redesign"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      AFTER
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <div className="flex items-center space-x-2 bg-green-500/20 backdrop-blur-md rounded-lg px-3 py-2">
                      <TrendingUp className="w-4 h-4 text-green-400" />
                      <span className="text-green-400 font-bold text-sm">+285% Engagement</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Project Info */}
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-2">
                University Website Transformation
              </h3>
              <p className="text-gray-300 mb-6">
                Complete digital transformation with modern design, improved user experience, 
                and enhanced performance resulting in significant engagement increase.
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          <Button
            onClick={() => window.location.hash = '/portfolio'}
            className="group inline-flex items-center gap-3 px-10 py-5 text-white text-base md:text-lg font-semibold rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:shadow-xl hover:shadow-cyan-500/30 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400"
          >
            <span>CLICK HERE TO VIEW MORE</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}