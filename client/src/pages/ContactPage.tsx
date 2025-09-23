'use client'
import React from 'react'
import { useState, useRef, useEffect } from 'react'
import { useInView, AnimatePresence } from 'framer-motion'
import { motion, Variants } from "framer-motion"; // 

import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  MessageCircle,
  Clock,
  CheckCircle,
  ArrowUpRight,
  Sparkles,
  Zap,
  Globe,
  Users,
  Award,
  Star
} from 'lucide-react'
import { siteConfig } from '../data/site-config'
import { ImageWithFallback } from '../components/figma/ImageWithFallback'

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: '',
    budget: '',
    timeline: ''
  })
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [ripplePosition, setRipplePosition] = useState({ x: 0, y: 0 })
  const [isRippling, setIsRippling] = useState(false)

  const heroRef = useRef(null)
  const formRef = useRef(null)
  const mapRef = useRef(null)
  const isHeroInView = useInView(heroRef, { once: true, amount: 0.2 })
  const isFormInView = useInView(formRef, { once: true, amount: 0.1 })
  const isMapInView = useInView(mapRef, { once: true, amount: 0.3 })

  const services = [
    'Web Development',
    'Mobile App Development', 
    'UI/UX Design',
    'E-Commerce Solutions',
    'Backend Development',
    'DevOps & Cloud',
    'Digital Strategy',
    'Complete Digital Transformation'
  ]

  const budgets = [
    'Under $25K',
    '$25K - $50K', 
    '$50K - $100K',
    '$100K - $250K',
    'Over $250K',
    'Let\'s Discuss'
  ]

  const timelines = [
    'ASAP (Rush Job)',
    '1-3 months',
    '3-6 months', 
    '6+ months',
    'Just exploring ideas'
  ]

  // Animated headline text variants

const headlineVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeInOut", 
    },
  },
};

  const letterVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFocus = (fieldName: string) => {
    setFocusedField(fieldName)
  }

  const handleBlur = () => {
    setFocusedField(null)
  }

  const handleSubmitClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setRipplePosition({ x, y })
    setIsRippling(true)
    setTimeout(() => setIsRippling(false), 600)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission with realistic delay
    await new Promise(resolve => setTimeout(resolve, 2500))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // Reset form after success message
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: '',
        email: '',
        company: '',
        service: '',
        message: '',
        budget: '',
        timeline: ''
      })
    }, 4000)
  }

  // Split text into words for animation
  const animateText = (text: string, delay = 0) => {
    return text.split(' ').map((word, index) => (
      <motion.span
        key={index}
        variants={letterVariants}
        initial="hidden"
        animate={isHeroInView ? "visible" : "hidden"}
        transition={{ delay: delay + (index * 0.1) }}
        className="inline-block mr-3"
      >
        {word}
      </motion.span>
    ))
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-20">
      {/* Animated Hero Section */}
      <section ref={heroRef} className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-slate-900 to-cyan-900/30"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        
        {/* Animated background orbs */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 30, -30, 0],
            y: [0, -20, 20, 0],
            scale: [1, 1.1, 0.9, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -25, 25, 0],
            y: [0, 25, -25, 0],
            scale: [1, 0.8, 1.2, 1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 text-center">
          {/* Animated badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={isHeroInView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center space-x-3 glass rounded-full px-8 py-4 mb-12 border border-white/20 hover:border-purple-400/50 transition-all duration-500"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-5 h-5 text-purple-400" />
            </motion.div>
            <span className="font-medium text-gray-200">Let's Create Magic Together</span>
          </motion.div>

          {/* Animated headline */}
          <div className="font-outfit text-5xl lg:text-7xl font-bold mb-8 leading-tight">
            <motion.h1
              variants={headlineVariants}
              initial="hidden"
              animate={isHeroInView ? "visible" : "hidden"}
              className="mb-4"
            >
              <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
                {animateText("Ready to", 0.3)}
              </span>
            </motion.h1>
            <motion.h1
              variants={headlineVariants}
              initial="hidden" 
              animate={isHeroInView ? "visible" : "hidden"}
              transition={{ delay: 0.8 }}
            >
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-pulse-glow">
                {animateText("Transform Your", 0.6)}
              </span>
            </motion.h1>
            <motion.h1
              variants={headlineVariants}
              initial="hidden"
              animate={isHeroInView ? "visible" : "hidden"}  
              transition={{ delay: 1.2 }}
            >
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                {animateText("Digital Vision?", 0.9)}
              </span>
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12"
          >
            Let's collaborate to create extraordinary experiences that captivate your audience, 
            revolutionize your business, and leave your competition mesmerized.
          </motion.p>

          {/* Quick contact cards */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 1.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            {[
              {
                icon: Mail,
                title: 'Email Us',
                info: siteConfig.contact.email,
                description: 'hello@codeflow.dev',
                action: `mailto:${siteConfig.contact.email}`,
                gradient: 'from-purple-500 to-pink-500'
              },
              {
                icon: Phone, 
                title: 'Call Us',
                info: siteConfig.contact.phone,
                description: '+1 (555) 123-4567',
                action: `tel:${siteConfig.contact.phone.replace(/[^\d+]/g, '')}`,
                gradient: 'from-blue-500 to-cyan-500'
              },
              {
                icon: MapPin,
                title: 'Visit Us', 
                info: siteConfig.contact.address,
                description: 'San Francisco, CA',
                action: '#map-section',
                gradient: 'from-green-500 to-emerald-500'
              }
            ].map((contact, index) => (
              <motion.a
                key={contact.title}
                href={contact.action}
                initial={{ opacity: 0, y: 30 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 2 + (index * 0.1) }}
                className="group relative glass rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all duration-500 text-center block overflow-hidden magnetic"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${contact.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${contact.gradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <contact.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-outfit text-lg font-bold text-white mb-2">{contact.title}</h3>
                  <p className="text-gray-300 text-sm">{contact.description}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section ref={formRef} className="relative py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-16">
            
            {/* Left Column - Info & Map */}
            <div className="lg:col-span-2 space-y-12">
              
              {/* Stats Section */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={isFormInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-8"
              >
                <h3 className="font-outfit text-3xl font-bold text-white mb-8">
                  Why <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">CodeFlow?</span>
                </h3>
                
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { icon: Users, number: "250+", label: "Happy Clients" },
                    { icon: Award, number: "500+", label: "Projects Done" },
                    { icon: Star, number: "98%", label: "Satisfaction" },
                    { icon: Globe, number: "6+", label: "Years Experience" }
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 30 }}
                      animate={isFormInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.4 + (index * 0.1) }}
                      className="text-center glass rounded-2xl p-6 border border-white/10 hover:border-purple-400/30 transition-all duration-500"
                    >
                      <div className="w-12 h-12 mx-auto mb-4 gradient-electric rounded-xl flex items-center justify-center">
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="font-outfit text-2xl font-bold text-white mb-1">{stat.number}</div>
                      <div className="text-gray-400 text-sm">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Interactive Map Section */}
              <motion.div
                ref={mapRef}
                initial={{ opacity: 0, x: -50 }}
                animate={isMapInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
                id="map-section"
                className="glass rounded-2xl overflow-hidden border border-white/10 relative group"
              >
                <div className="aspect-video relative">
                  {/* Map placeholder with animation */}
                  <motion.div
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={isMapInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
                    className="absolute inset-0 bg-gradient-to-br from-slate-800 via-purple-900/30 to-slate-800 flex items-center justify-center"
                  >
                    <div className="text-center">
                      <motion.div
                        animate={{ 
                          y: [0, -10, 0],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="w-16 h-16 mx-auto mb-4 gradient-electric rounded-2xl flex items-center justify-center"
                      >
                        <MapPin className="w-8 h-8 text-white" />
                      </motion.div>
                      <h4 className="font-outfit text-xl font-bold text-white mb-2">San Francisco, CA</h4>
                      <p className="text-gray-300">Where Innovation Meets Design</p>
                    </div>
                  </motion.div>

                  {/* Animated grid overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={isMapInView ? { opacity: 0.1 } : {}}
                    transition={{ duration: 1, delay: 1 }}
                    className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"
                  />

                  {/* Interactive hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Zoom controls mockup */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={isMapInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8, delay: 1.2 }}
                    className="absolute top-4 right-4 flex flex-col space-y-2"
                  >
                    <button className="w-10 h-10 glass rounded-lg flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300">
                      +
                    </button>
                    <button className="w-10 h-10 glass rounded-lg flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300">
                      −
                    </button>
                  </motion.div>
                </div>
              </motion.div>

              {/* Response Promise */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={isFormInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="glass rounded-2xl border border-white/10 p-6 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-cyan-500/5" />
                <div className="relative z-10">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 gradient-electric rounded-xl flex items-center justify-center">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white">Lightning Response</h4>
                      <p className="text-sm text-gray-400">We value your time</p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    We respond to all inquiries within 2 hours during business hours. 
                    For urgent projects, we're available 24/7.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Enhanced Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isFormInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="lg:col-span-3"
            >
              <div className="glass rounded-3xl border border-white/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-cyan-500/5" />
                
                <div className="p-10 relative z-10">
                  <AnimatePresence mode="wait">
                    {!isSubmitted ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <div className="mb-10">
                          <h3 className="font-outfit text-4xl font-bold text-white mb-3">
                            Start Your{' '}
                            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                              Digital Journey
                            </span>
                          </h3>
                          <p className="text-gray-300 text-lg">Tell us about your vision and we'll make it extraordinary.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8">
                          {/* Personal Information */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="relative">
                              <label 
                                htmlFor="name" 
                                className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                                  focusedField === 'name' || formData.name 
                                    ? '-top-2 text-sm bg-slate-950 px-2 text-purple-400' 
                                    : 'top-4 text-gray-400'
                                }`}
                              >
                                Full Name *
                              </label>
                              <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                value={formData.name}
                                onChange={handleInputChange}
                                onFocus={() => handleFocus('name')}
                                onBlur={handleBlur}
                                className={`w-full h-14 px-4 bg-transparent border-2 rounded-xl text-white transition-all duration-300 focus:outline-none ${
                                  focusedField === 'name' 
                                    ? 'border-purple-400 shadow-lg shadow-purple-400/20' 
                                    : 'border-white/20 hover:border-white/40'
                                }`}
                              />
                              {focusedField === 'name' && (
                                <motion.div
                                  initial={{ scaleX: 0 }}
                                  animate={{ scaleX: 1 }}
                                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-400 to-cyan-400 w-full origin-left"
                                />
                              )}
                            </div>
                            
                            <div className="relative">
                              <label 
                                htmlFor="email" 
                                className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                                  focusedField === 'email' || formData.email 
                                    ? '-top-2 text-sm bg-slate-950 px-2 text-purple-400' 
                                    : 'top-4 text-gray-400'
                                }`}
                              >
                                Email Address *
                              </label>
                              <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleInputChange}
                                onFocus={() => handleFocus('email')}
                                onBlur={handleBlur}
                                className={`w-full h-14 px-4 bg-transparent border-2 rounded-xl text-white transition-all duration-300 focus:outline-none ${
                                  focusedField === 'email' 
                                    ? 'border-purple-400 shadow-lg shadow-purple-400/20' 
                                    : 'border-white/20 hover:border-white/40'
                                }`}
                              />
                              {focusedField === 'email' && (
                                <motion.div
                                  initial={{ scaleX: 0 }}
                                  animate={{ scaleX: 1 }}
                                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-400 to-cyan-400 w-full origin-left"
                                />
                              )}
                            </div>
                          </div>

                          <div className="relative">
                            <label 
                              htmlFor="company" 
                              className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                                focusedField === 'company' || formData.company 
                                  ? '-top-2 text-sm bg-slate-950 px-2 text-purple-400' 
                                  : 'top-4 text-gray-400'
                              }`}
                            >
                              Company
                            </label>
                            <input
                              id="company"
                              name="company"
                              type="text"
                              value={formData.company}
                              onChange={handleInputChange}
                              onFocus={() => handleFocus('company')}
                              onBlur={handleBlur}
                              className={`w-full h-14 px-4 bg-transparent border-2 rounded-xl text-white transition-all duration-300 focus:outline-none ${
                                focusedField === 'company' 
                                  ? 'border-purple-400 shadow-lg shadow-purple-400/20' 
                                  : 'border-white/20 hover:border-white/40'
                              }`}
                            />
                            {focusedField === 'company' && (
                              <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-400 to-cyan-400 w-full origin-left"
                              />
                            )}
                          </div>

                          {/* Project Details */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="relative">
                              <select
                                id="service"
                                name="service"
                                value={formData.service}
                                onChange={handleInputChange}
                                onFocus={() => handleFocus('service')}
                                onBlur={handleBlur}
                                className={`w-full h-14 px-4 bg-transparent border-2 rounded-xl text-white transition-all duration-300 focus:outline-none ${
                                  focusedField === 'service' 
                                    ? 'border-purple-400 shadow-lg shadow-purple-400/20' 
                                    : 'border-white/20 hover:border-white/40'
                                }`}
                              >
                                <option value="" className="bg-slate-900">Select a service</option>
                                {services.map(service => (
                                  <option key={service} value={service} className="bg-slate-900">
                                    {service}
                                  </option>
                                ))}
                              </select>
                              {focusedField === 'service' && (
                                <motion.div
                                  initial={{ scaleX: 0 }}
                                  animate={{ scaleX: 1 }}
                                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-400 to-cyan-400 w-full origin-left"
                                />
                              )}
                            </div>
                            
                            <div className="relative">
                              <select
                                id="budget"
                                name="budget"
                                value={formData.budget}
                                onChange={handleInputChange}
                                onFocus={() => handleFocus('budget')}
                                onBlur={handleBlur}
                                className={`w-full h-14 px-4 bg-transparent border-2 rounded-xl text-white transition-all duration-300 focus:outline-none ${
                                  focusedField === 'budget' 
                                    ? 'border-purple-400 shadow-lg shadow-purple-400/20' 
                                    : 'border-white/20 hover:border-white/40'
                                }`}
                              >
                                <option value="" className="bg-slate-900">Select budget range</option>
                                {budgets.map(budget => (
                                  <option key={budget} value={budget} className="bg-slate-900">
                                    {budget}
                                  </option>
                                ))}
                              </select>
                              {focusedField === 'budget' && (
                                <motion.div
                                  initial={{ scaleX: 0 }}
                                  animate={{ scaleX: 1 }}
                                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-400 to-cyan-400 w-full origin-left"
                                />
                              )}
                            </div>
                          </div>

                          <div className="relative">
                            <select
                              id="timeline"
                              name="timeline"
                              value={formData.timeline}
                              onChange={handleInputChange}
                              onFocus={() => handleFocus('timeline')}
                              onBlur={handleBlur}
                              className={`w-full h-14 px-4 bg-transparent border-2 rounded-xl text-white transition-all duration-300 focus:outline-none ${
                                focusedField === 'timeline' 
                                  ? 'border-purple-400 shadow-lg shadow-purple-400/20' 
                                  : 'border-white/20 hover:border-white/40'
                              }`}
                            >
                              <option value="" className="bg-slate-900">Timeline expectation</option>
                              {timelines.map(timeline => (
                                <option key={timeline} value={timeline} className="bg-slate-900">
                                  {timeline}
                                </option>
                              ))}
                            </select>
                            {focusedField === 'timeline' && (
                              <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-400 to-cyan-400 w-full origin-left"
                              />
                            )}
                          </div>

                          <div className="relative">
                            <label 
                              htmlFor="message" 
                              className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                                focusedField === 'message' || formData.message 
                                  ? '-top-2 text-sm bg-slate-950 px-2 text-purple-400' 
                                  : 'top-4 text-gray-400'
                              }`}
                            >
                              Project Vision *
                            </label>
                            <textarea
                              id="message"
                              name="message"
                              required
                              rows={6}
                              value={formData.message}
                              onChange={handleInputChange}
                              onFocus={() => handleFocus('message')}
                              onBlur={handleBlur}
                              className={`w-full p-4 bg-transparent border-2 rounded-xl text-white resize-none transition-all duration-300 focus:outline-none ${
                                focusedField === 'message' 
                                  ? 'border-purple-400 shadow-lg shadow-purple-400/20' 
                                  : 'border-white/20 hover:border-white/40'
                              }`}
                              placeholder={focusedField === 'message' ? 'Describe your vision, goals, target audience, and what makes your project special. The more details, the better we can craft your digital magic...' : ''}
                            />
                            {focusedField === 'message' && (
                              <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-400 to-cyan-400 w-full origin-left"
                              />
                            )}
                          </div>

                          {/* Enhanced Submit Button */}
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            onClick={handleSubmitClick}
                            className="relative w-full h-16 gradient-electric rounded-2xl text-white font-semibold text-lg overflow-hidden disabled:opacity-50 group transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/30 hover:scale-[1.02]"
                          >
                            <span className="relative z-10 flex items-center justify-center space-x-3">
                              {isSubmitting ? (
                                <>
                                  <motion.div
                                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                  />
                                  <span>Casting Digital Magic...</span>
                                </>
                              ) : (
                                <>
                                  <Zap className="w-6 h-6" />
                                  <span>Transform My Vision</span>
                                  <Send className="w-5 h-5" />
                                </>
                              )}
                            </span>
                            
                            {/* Hover gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            
                            {/* Ripple effect */}
                            <AnimatePresence>
                              {isRippling && (
                                <motion.div
                                  initial={{ scale: 0, opacity: 0.5 }}
                                  animate={{ scale: 4, opacity: 0 }}
                                  exit={{ opacity: 0 }}
                                  transition={{ duration: 0.6, ease: "easeOut" }}
                                  className="absolute w-20 h-20 bg-white/30 rounded-full"
                                  style={{
                                    left: ripplePosition.x - 10,
                                    top: ripplePosition.y - 10,
                                  }}
                                />
                              )}
                            </AnimatePresence>
                          </button>

                          <p className="text-sm text-gray-400 text-center">
                            🔒 Your information is secure and will never be shared. We respect your privacy.
                          </p>
                        </form>
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="text-center py-16"
                      >
                        <motion.div
                          className="w-24 h-24 gradient-electric rounded-full flex items-center justify-center mx-auto mb-8"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ duration: 1, delay: 0.2, type: "spring", bounce: 0.5 }}
                        >
                          <CheckCircle className="w-12 h-12 text-white" />
                        </motion.div>
                        
                        <h3 className="font-outfit text-5xl font-bold text-white mb-6">
                          <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                            Magic in Motion! ✨
                          </span>
                        </h3>
                        <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                          Your message has been sent successfully. We'll get back to you within 2 hours 
                          with some extraordinary digital magic tailored just for you.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm text-gray-400">
                          <div className="flex items-center space-x-2">
                            <Sparkles className="w-5 h-5 text-purple-400" />
                            <span>Lightning-fast 2hr response</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Zap className="w-5 h-5 text-cyan-400" />
                            <span>Free strategy consultation included</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}