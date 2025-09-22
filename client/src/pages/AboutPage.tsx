'use client'

import { motion } from 'framer-motion'
import { ScrollReveal, StaggeredReveal, Parallax } from '../components/animations/ScrollReveal'
import { HoverLift, AnimatedIcon, Typewriter } from '../components/animations/MicroInteractions'
import { AboutSection } from '../components/AboutSection'
import { Button } from '../components/ui/button'
import { Sparkles } from 'lucide-react'

export function AboutPage() {
  return (
    <div className="about-page min-h-screen">
      {/* Page Header */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-purple-950/20 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(139,92,246,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(6,182,212,0.15),transparent_50%)]" />

        {/* Animated background particles */}
        <Parallax speed={0.2} className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-float" />
          <div 
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-float" 
            style={{ animationDelay: '2s' }}
          />
        </Parallax>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <ScrollReveal variant="fadeUp" delay={0.2}>
              <div className="inline-flex items-center space-x-3 glass rounded-full px-6 py-3 mb-8 border border-white/20">
                <AnimatedIcon hoverScale={1.2} hoverRotation={15}>
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </AnimatedIcon>
                <span className="font-medium text-gray-200">About CodeFlow</span>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fadeUp" delay={0.4}>
              <h1 className="font-outfit text-6xl lg:text-7xl font-bold mb-8 leading-tight">
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  We Are
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  <Typewriter 
                    text="Digital Innovators"
                    speed={80}
                    className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent"
                  />
                </span>
              </h1>
            </ScrollReveal>

            <ScrollReveal variant="fadeUp" delay={0.8}>
              <p className="text-2xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
                A passionate team of designers, developers, and strategists dedicated to creating 
                digital experiences that mesmerize users and transform businesses into industry leaders.
              </p>
            </ScrollReveal>

            <ScrollReveal variant="fadeUp" delay={1.0}>
              <Button 
                onClick={() => window.location.hash = '/quotation'}
                size="lg" 
                className="gradient-electric hover:shadow-2xl hover:shadow-purple-500/30 text-white px-8 py-4"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Get Quotation
              </Button>
            </ScrollReveal>
          </div>
        </div>

        {/* Scroll Indicator */}
        <ScrollReveal variant="fadeUp" delay={1.2}>
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <motion.div
              className="w-8 h-12 border-2 border-white/40 rounded-full flex justify-center p-2 cursor-pointer"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
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

      {/* About Content - Removed the motion wrapper that was causing issues */}
      <AboutSection />
    </div>
  )
}