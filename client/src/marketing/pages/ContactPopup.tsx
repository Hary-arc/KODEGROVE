'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, User, Building2, CheckCircle } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Textarea } from '../../components/ui/textarea'

export function ContactPopup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    budget: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    console.log('Contact form data:', formData)
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const services = [
    'Web Development',
    'Mobile App Development',
    'E-commerce Solutions',
    'UI/UX Design',
    'Digital Marketing',
    'Brand Strategy',
    'Other'
  ]

  const budgetRanges = [
    'Under $5,000',
    '$5,000 - $10,000',
    '$10,000 - $25,000',
    '$25,000 - $50,000',
    '$50,000+'
  ]

  if (isSubmitted) {
    return (
      <div className="p-8">
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <CheckCircle className="w-10 h-10 text-white" />
          </motion.div>

          <h2 className="font-outfit text-3xl font-bold text-white mb-4">
            Message Sent Successfully!
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-md mx-auto">
            Thank you for reaching out! Our team will get back to you within 24 hours.
          </p>

          <div className="glass border border-white/10 rounded-2xl p-6 max-w-md mx-auto">
            <h3 className="font-semibold text-white mb-4">What happens next?</h3>
            <div className="space-y-3 text-left">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-cyan-400 text-xs">1</span>
                </div>
                <p className="text-gray-300 text-sm">
                  We'll review your requirements
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-cyan-400 text-xs">2</span>
                </div>
                <p className="text-gray-300 text-sm">
                  Schedule a discovery call
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-cyan-400 text-xs">3</span>
                </div>
                <p className="text-gray-300 text-sm">
                  Provide a detailed proposal
                </p>
              </div>
            </div>
          </div>

          <Button
            onClick={() => setIsSubmitted(false)}
            variant="outline"
            className="mt-8 border-white/20 text-white hover:bg-white/10"
          >
            Send Another Message
          </Button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Side - Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center space-x-2 glass rounded-full px-4 py-2 mb-6 border border-white/20">
            <MessageCircle className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-gray-200">Let's Talk</span>
          </div>

          <h2 className="font-outfit text-4xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Get In Touch
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              With Our Team
            </span>
          </h2>

          <p className="text-gray-300 text-lg mb-10 leading-relaxed">
            Have a project in mind? Let's discuss how we can bring your vision to life with cutting-edge technology and creative excellence.
          </p>

          {/* Contact Details */}
          <div className="space-y-6 mb-10">
            <motion.div
              className="glass border border-white/10 rounded-xl p-5 group hover:border-cyan-500/30 transition-all duration-300"
              whileHover={{ x: 5 }}
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Email Us</h4>
                  <a href="mailto:hello@codeflow.com" className="text-gray-300 hover:text-cyan-400 transition-colors">
                    hello@codeflow.com
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="glass border border-white/10 rounded-xl p-5 group hover:border-purple-500/30 transition-all duration-300"
              whileHover={{ x: 5 }}
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Call Us</h4>
                  <a href="tel:+15551234567" className="text-gray-300 hover:text-purple-400 transition-colors">
                    +1 (555) 123-4567
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="glass border border-white/10 rounded-xl p-5 group hover:border-pink-500/30 transition-all duration-300"
              whileHover={{ x: 5 }}
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Visit Us</h4>
                  <p className="text-gray-300">
                    123 Innovation Drive<br />
                    San Francisco, CA 94103
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="glass border border-white/10 rounded-xl p-5 group hover:border-green-500/30 transition-all duration-300"
              whileHover={{ x: 5 }}
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Office Hours</h4>
                  <p className="text-gray-300">
                    Monday - Friday<br />
                    9:00 AM - 6:00 PM PST
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center glass border border-white/10 rounded-xl p-4">
              <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-1">
                &lt;24h
              </div>
              <div className="text-xs text-gray-400">Response Time</div>
            </div>
            <div className="text-center glass border border-white/10 rounded-xl p-4">
              <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-1">
                500+
              </div>
              <div className="text-xs text-gray-400">Projects Done</div>
            </div>
            <div className="text-center glass border border-white/10 rounded-xl p-4">
              <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-1">
                98%
              </div>
              <div className="text-xs text-gray-400">Satisfaction</div>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="glass border border-white/10 rounded-2xl p-8">
            <h3 className="font-outfit text-2xl font-bold text-white mb-2">
              Send Us a Message
            </h3>
            <p className="text-gray-400 mb-8">
              Fill out the form and we'll get back to you shortly
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-gray-300 mb-2">
                    Your Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="pl-11 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-cyan-500/50 rounded-xl"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      type="email"
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="pl-11 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-cyan-500/50 rounded-xl"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="pl-11 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-cyan-500/50 rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-2">
                    Company
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Your Company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="pl-11 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-cyan-500/50 rounded-xl"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Service Interested In *
                </label>
                <select
                  aria-label="Select service"
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white rounded-xl focus:border-cyan-500/50 focus:outline-none"
                  required
                >
                  <option value="" className="bg-slate-900">Select a service</option>
                  {services.map((service) => (
                    <option key={service} value={service} className="bg-slate-900">
                      {service}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Budget Range
                </label>
                <select
                  aria-label="Select budget range"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white rounded-xl focus:border-cyan-500/50 focus:outline-none"
                >
                  <option value="" className="bg-slate-900">Select budget range</option>
                  {budgetRanges.map((range) => (
                    <option key={range} value={range} className="bg-slate-900">
                      {range}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Project Details *
                </label>
                <Textarea
                  placeholder="Tell us about your project, goals, and timeline..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-cyan-500/50 rounded-xl min-h-[120px]"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:opacity-90 text-white font-semibold py-3 rounded-xl transition-all duration-300"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    Send Message
                    <Send className="w-5 h-5 ml-2" />
                  </span>
                )}
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
