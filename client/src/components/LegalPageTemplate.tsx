'use client'

import { motion } from "framer-motion"
import { ScrollReveal, StaggeredReveal } from './animations/ScrollReveal'
import { HoverLift } from './animations/MicroInteractions'
import { FileText, Shield, Clock, ArrowLeft } from 'lucide-react'
import type { PolicyPage } from '../data/legal'

interface LegalPageTemplateProps {
  policy: PolicyPage
  icon?: React.ReactNode
}

export function LegalPageTemplate({ policy, icon }: LegalPageTemplateProps) {
  return (
    <div className="legal-page min-h-screen">
      {/* Header Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-purple-950/20 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(139,92,246,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(6,182,212,0.15),transparent_50%)]" />
        
        {/* Animated background particles */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-float" />
        <div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-float" 
          style={{ animationDelay: '2s' }}
        />
        
        <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
          {/* Back Button */}
          <ScrollReveal variant="fadeUp" delay={0.1}>
            <a 
              href="#/"
              className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mb-8 group"
            >
              <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
              <span>Back to Home</span>
            </a>
          </ScrollReveal>

          <div className="text-center">
            <ScrollReveal variant="fadeUp" delay={0.2}>
              <div className="inline-flex items-center space-x-3 glass rounded-full px-6 py-3 mb-8 border border-white/20">
                {icon || <FileText className="w-5 h-5 text-purple-400" />}
                <span className="font-medium text-gray-200">Legal Information</span>
              </div>
            </ScrollReveal>
            
            <ScrollReveal variant="fadeUp" delay={0.4}>
              <h1 className="font-outfit text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  {policy.title}
                </span>
              </h1>
            </ScrollReveal>
            
            <ScrollReveal variant="fadeUp" delay={0.6}>
              <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto mb-8">
                {policy.description}
              </p>
            </ScrollReveal>

            <ScrollReveal variant="fadeUp" delay={0.8}>
              <div className="inline-flex items-center space-x-2 text-sm text-gray-400">
                <Clock className="w-4 h-4" />
                <span>Last Updated: {policy.lastUpdated}</span>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <StaggeredReveal staggerDelay={0.1}>
            {policy.sections.map((section, index) => (
              <motion.div
                key={index}
                className="mb-8 last:mb-0"
              >
                <HoverLift>
                  <div className="glass rounded-2xl p-8 lg:p-10 border border-white/10 hover:border-purple-500/30 transition-all duration-300">
                    {/* Section Title */}
                    <div className="flex items-start space-x-4 mb-6">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center border border-purple-500/30">
                        <span className="text-lg font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                          {index + 1}
                        </span>
                      </div>
                      <h2 className="text-2xl lg:text-3xl font-bold text-white flex-1">
                        {section.title}
                      </h2>
                    </div>

                    {/* Section Content */}
                    <div className="ml-14 space-y-6">
                      <p className="text-gray-300 leading-relaxed">
                        {section.content}
                      </p>

                      {/* Subsections */}
                      {section.subsections && section.subsections.length > 0 && (
                        <div className="space-y-6 mt-8">
                          {section.subsections.map((subsection, subIndex) => (
                            <div 
                              key={subIndex}
                              className="pl-6 border-l-2 border-purple-500/30 hover:border-cyan-500/50 transition-colors"
                            >
                              <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400 mr-3" />
                                {subsection.title}
                              </h3>
                              <p className="text-gray-300 leading-relaxed">
                                {subsection.content}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </HoverLift>
              </motion.div>
            ))}
          </StaggeredReveal>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <ScrollReveal variant="fadeUp">
            <div className="glass rounded-2xl p-10 lg:p-12 border border-white/10 text-center relative overflow-hidden">
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-cyan-500/10" />
              
              <div className="relative z-10">
                <Shield className="w-12 h-12 text-purple-400 mx-auto mb-6" />
                <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Questions or Concerns?
                  </span>
                </h2>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  Our team is here to help. Reach out if you need clarification or have any questions about our policies.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="#/contact"
                    className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/50"
                  >
                    Contact Us
                  </a>
                  <a 
                    href="mailto:kodegrove@gmail.com"
                    className="px-8 py-4 glass border border-white/20 hover:border-purple-500/50 text-white rounded-lg transition-all duration-300 hover:bg-red/5"
                  >
                    Email Legal Team
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
