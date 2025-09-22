'use client'

import { motion } from 'framer-motion'
import { ScrollReveal, StaggeredReveal, Parallax } from '../components/animations/ScrollReveal'
import { HoverLift, AnimatedIcon, Typewriter, FloatingElement } from '../components/animations/MicroInteractions'
import { PortfolioSection } from '../components/PortfolioSection'
import { siteConfig } from '../data/site-config'

export function PortfolioPage() {
  return (
    <div className="portfolio-page">
      {/* Page Header */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-purple-950/20 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(236,72,153,0.1),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(139,92,246,0.1),transparent_70%)]" />
        
        {/* Enhanced background animations */}
        <Parallax speed={0.3} className="absolute inset-0 z-0 pointer-events-none">
          {/* Purple glow */}
          <FloatingElement intensity={1}>
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
          </FloatingElement>
        
          {/* Cyan glow */}
          <FloatingElement intensity={0.8}>
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
          </FloatingElement>
        
          {/* Pink glow */}
          <FloatingElement intensity={1.2}>
            <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl" />
          </FloatingElement>
        </Parallax>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <ScrollReveal variant="fadeUp" delay={0.2}>
              <div className="inline-flex items-center space-x-3 glass rounded-full px-6 py-3 mb-8 border border-white/20">
                <AnimatedIcon hoverScale={1.3} hoverRotation={20}>
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </AnimatedIcon>
                <span className="font-medium text-gray-200">Our Portfolio</span>
              </div>
            </ScrollReveal>
            
            <ScrollReveal variant="fadeUp" delay={0.4}>
              <h1 className="font-outfit text-6xl lg:text-7xl font-bold mb-8 leading-tight">
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Transformative
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  <Typewriter 
                    text="Digital Solutions"
                    speed={60}
                    className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent"
                  />
                </span>
              </h1>
            </ScrollReveal>
            
            <ScrollReveal variant="fadeUp" delay={0.8}>
              <p className="text-2xl text-gray-300 leading-relaxed max-w-4xl mx-auto mb-8">
                Explore our comprehensive portfolio of award-winning projects that have revolutionized 
                businesses and captivated millions of users across diverse industries.
              </p>
            </ScrollReveal>
            
            <StaggeredReveal staggerDelay={0.2} initialDelay={1.0}>
              <div className="flex flex-wrap items-center justify-center gap-6 text-lg text-gray-400">
                <HoverLift liftDistance={4} scale={1.05}>
                  <div className="flex items-center space-x-2">
                    <motion.div 
                      className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <span>Interactive Case Studies</span>
                  </div>
                </HoverLift>
                <HoverLift liftDistance={4} scale={1.05}>
                  <div className="flex items-center space-x-2">
                    <motion.div 
                      className="w-3 h-3 rounded-full bg-gradient-to-r from-pink-400 to-purple-400"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    />
                    <span>Detailed Project Breakdown</span>
                  </div>
                </HoverLift>
                <HoverLift liftDistance={4} scale={1.05}>
                  <div className="flex items-center space-x-2">
                    <motion.div 
                      className="w-3 h-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    />
                    <span>Live Demos Available</span>
                  </div>
                </HoverLift>
              </div>
            </StaggeredReveal>
          </div>
          
          {/* Enhanced Stats Overview */}
          <StaggeredReveal staggerDelay={0.1} initialDelay={1.4} className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            {[
              { number: `${siteConfig.stats.projects}+`, label: 'Projects Delivered' },
              { number: `${siteConfig.stats.clients}+`, label: 'Happy Clients' },
              { number: '50+', label: 'Industries Served' },
              { number: `${siteConfig.stats.satisfaction}%`, label: 'Client Satisfaction' }
            ].map((stat, index) => (
              <HoverLift key={index} liftDistance={8} scale={1.05}>
                <motion.div 
                  className="text-center glass rounded-2xl p-6 border border-white/10 hover:border-purple-400/30 transition-all duration-500"
                  whileHover={{
                    boxShadow: "0 20px 40px rgba(139, 92, 246, 0.15)"
                  }}
                >
                  <motion.div 
                    className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.6 + index * 0.1, type: "spring", stiffness: 200 }}
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-sm text-gray-400 uppercase tracking-wide">{stat.label}</div>
                </motion.div>
              </HoverLift>
            ))}
          </StaggeredReveal>
        </div>

        {/* Enhanced Scroll Indicator */}
        <ScrollReveal variant="fadeUp" delay={2.0}>
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <motion.div
              className="w-8 h-12 border-2 border-white/40 rounded-full flex justify-center p-2 cursor-pointer hover:border-purple-400/60 transition-colors duration-300"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.1 }}
            >
              <motion.div
                className="w-1.5 h-4 gradient-electric rounded-full"
                animate={{ scaleY: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </div>
        </ScrollReveal>
      </section>
      
      {/* Enhanced Portfolio Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <PortfolioSection />
      </motion.div>
    </div>
  )
}