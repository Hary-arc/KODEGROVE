'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Palette, Layers, Zap, Users, Sparkles, ArrowRight } from 'lucide-react'

const creativeServices = [
  {
    icon: Palette,
    title: 'Visual Design Excellence',
    description: 'Crafting stunning visual experiences that captivate and convert',
    features: ['UI/UX Design', 'Brand Identity', 'Visual Systems', 'Design Strategy'],
    gradient: 'from-pink-500 to-purple-600'
  },
  {
    icon: Layers,
    title: 'Interactive Experiences',
    description: 'Building immersive digital experiences that engage and delight',
    features: ['Motion Design', 'Micro-interactions', 'Prototyping', 'User Testing'],
    gradient: 'from-cyan-500 to-blue-600'
  },
  {
    icon: Zap,
    title: 'Performance Optimization',
    description: 'Lightning-fast websites that deliver exceptional user experiences',
    features: ['Speed Optimization', 'Core Web Vitals', 'Performance Audits', 'Technical SEO'],
    gradient: 'from-orange-500 to-red-600'
  }
]



export default function CreativeWebAgencySection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  // Track horizontal scroll progress inside timeline container
  const innerRef = useRef(null)

  // Get vertical scroll progress relative to containerRef
  // This tracks how much the user has scrolled inside the sticky section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"]
  })

  // Map vertical scroll progress (0 to 1) to horizontal translateX of inner timeline div
  // The inner timeline moves from 0% (fully right) to -max scroll width (fully left)
  // Adjust -150% or so based on the width of timeline content (needs tweaking)
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-150%'])
  
  return (
    <section 
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900"></div>
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-8xl mx-auto px-6 lg:px-8 relative z-10">
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
            <Sparkles className="w-5 h-5 text-purple-400" />
            <span className="font-medium text-gray-200">Creative Excellence</span>
          </motion.div>
          
          <h2 className="font-outfit text-4xl lg:text-6xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Where Creativity Meets
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Cutting-Edge Technology
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We're not just another web agency. We're digital artists and technical innovators who craft 
            mesmerizing experiences that transform businesses and captivate audiences worldwide.
          </p>
        </motion.div>

        {/* Creative Services Grid */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
        >
          {creativeServices.map((service, index) => (
            <motion.div
              key={service.title}
              className="group relative"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 + index * 0.2 }}
              whileHover={{ y: -8 }}
            >
              <div className="glass rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 h-full">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${service.gradient} p-4 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="w-full h-full text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <div className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <motion.div
                      key={feature}
                      className="flex items-center space-x-2 text-sm text-gray-400"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: 1 + index * 0.2 + featureIndex * 0.1 }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                      <span>{feature}</span>
                    </motion.div>
                  ))}
                </div>
                
                <motion.div
                  className="mt-6 flex items-center text-purple-400 font-medium group-hover:text-cyan-400 transition-colors duration-300"
                  whileHover={{ x: 5 }}
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

                     {/* Design Process Timeline */}
       
        {/* Creative Stats */}
        <motion.div
          className="mt-24 grid grid-cols-2 lg:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          {[
            { number: '50+', label: 'Creative Projects', icon: Palette },
            { number: '98%', label: 'Client Satisfaction', icon: Users },
            { number: '15+', label: 'Design Awards', icon: Sparkles },
            { number: '24/7', label: 'Creative Support', icon: Zap }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center group"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="glass rounded-xl p-6 border border-white/10 hover:border-purple-400/30 transition-all duration-300">
                <stat.icon className="w-8 h-8 text-purple-400 mx-auto mb-4 group-hover:text-cyan-400 transition-colors duration-300" />
                <div className="text-3xl font-bold text-white mb-2 group-hover transition-colors duration-300">
                  {stat.number}
                </div>
                <div className="text-gray-300 text-sm">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
function TimelineStep({ step, title, description }: { step: string, title: string, description: string }) {
  return (
    <div className="flex-shrink-0 w-64 text-center cursor-default select-none">
      <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-purple-500 to-cyan-500
                      flex items-center justify-center mb-4 text-white font-bold text-xl shadow-lg
                      shadow-purple-700/50 transition-transform duration-300">
        {step}
      </div>
      <h4 className="font-semibold text-white text-lg mb-2">{title}</h4>
      <p className="text-gray-300 text-sm">{description}</p>
    </div>
  )
}

