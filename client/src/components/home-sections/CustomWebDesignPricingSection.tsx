
'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Calculator, DollarSign, Zap, Target, ArrowRight, Check } from 'lucide-react'
import { Button } from '../ui/button'

const pricingFeatures = [
  {
    title: 'Your choice of platform',
    description: 'also plays a role in the cost. Templated solutions are more affordable while developing a fully custom site will increase the project\'s total expense.',
    icon: Target
  },
  {
    title: 'Custom graphic elements',
    description: 'are essential for enhancing your web presence. However, the more complex the design requirements, the higher the overall cost.',
    icon: Zap
  },
  {
    title: 'After launching',
    description: 'your new website, the next step is to outperform competitors in search engine rankings and secure top positions in your industry.',
    icon: ArrowRight
  },
  {
    title: 'Our full-service',
    description: 'web design company offers expertise to clients of all sizes. You can use our design cost calculator below for an estimate or schedule a free consultation with one of our experts to discuss your project\'s specifics.',
    icon: Check
  }
]

export default function CustomWebDesignPricingSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  return (
    <section 
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900"></div>
      <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>

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
            <DollarSign className="w-5 h-5 text-cyan-400" />
            <span className="font-medium text-gray-200">Transparent Pricing</span>
          </motion.div>
          
          <h2 className="font-outfit text-4xl lg:text-6xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Custom Web Design Pricing For
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Each Client's Objectives
            </span>
          </h2>
          
          <motion.div
            className="max-w-4xl mx-auto space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p className="text-lg text-gray-300 leading-relaxed">
              Every website design project comes with unique challenges and specific requirements 
              that influence its final cost. A simple project typically ranges from{' '}
              <span className="text-cyan-400 font-semibold">$25,000</span> to{' '}
              <span className="text-cyan-400 font-semibold">$30,000</span>, 
              while more complex endeavors can reach{' '}
              <span className="text-cyan-400 font-semibold">$50,000</span> to{' '}
              <span className="text-cyan-400 font-semibold">$60,000</span> or more.
            </p>
            
            <p className="text-lg text-gray-300 leading-relaxed">
              The technical setup of your website, which directly impacts its performance, is a key 
              factor in determining cost. More complex setups that demand significant time and effort 
              will naturally increase the overall price.
            </p>
          </motion.div>

          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button
              onClick={() => window.location.hash = '/quotation'}
              className="group inline-flex items-center gap-3 px-10 py-5 text-white text-base md:text-lg font-semibold rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:shadow-xl hover:shadow-cyan-500/30 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400"
            >
              <Calculator className="w-5 h-5 transition-transform group-hover:scale-110" />
              <span>CALCULATE YOUR WEBSITE</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Pricing Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
        >
          {pricingFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="text-center group"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1 + index * 0.2 }}
              whileHover={{ y: -8 }}
            >
              <div className="glass rounded-2xl p-8 border border-white/10 hover:border-cyan-400/30 transition-all duration-500 h-full">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 p-4 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-full h-full text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-gray-300 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
