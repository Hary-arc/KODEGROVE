'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Mail, Gift, TrendingUp, Sparkles, CheckCircle, X } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'

export function NewsletterPopup() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    console.log('Newsletter subscription:', { email, name })
    setIsSubmitting(false)
    setIsSubscribed(true)
  }

  const benefits = [
    {
      icon: TrendingUp,
      title: "Industry Insights",
      description: "Weekly updates on web development trends"
    },
    {
      icon: Gift,
      title: "Exclusive Resources",
      description: "Free templates, guides, and tools"
    },
    {
      icon: Sparkles,
      title: "Early Access",
      description: "Be first to know about new features"
    }
  ]

  if (isSubscribed) {
    return (
      <div className="p-8">
        <motion.div
          className="text-center py-12 max-w-lg mx-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <Mail className="w-12 h-12 text-white" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="font-outfit text-3xl font-bold text-white mb-4">
              You're All Set! 🎉
            </h2>
            <p className="text-gray-300 text-lg mb-6">
              Welcome to the CodeFlow community! Check your inbox for a confirmation email.
            </p>

            <div className="glass border border-white/10 rounded-2xl p-6 mb-8">
              <h3 className="font-semibold text-white mb-4">What to expect:</h3>
              <div className="space-y-3 text-left">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-300 text-sm">
                    Weekly newsletter every Monday with fresh insights
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-300 text-sm">
                    Exclusive access to premium resources and templates
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-300 text-sm">
                    Early bird notifications for webinars and events
                  </p>
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-400">
              Didn't receive the email?{' '}
              <button className="text-cyan-400 hover:text-cyan-300 underline">
                Resend confirmation
              </button>
            </p>
          </motion.div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left Side - Visual */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative h-full">
              {/* Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-3xl" />
              
              {/* Content */}
              <div className="relative glass border border-white/10 rounded-3xl p-8 h-full flex flex-col justify-center">
                <div className="mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6">
                    <Mail className="w-8 h-8 text-white" />
                  </div>
                  
                  <h2 className="font-outfit text-3xl font-bold mb-4 leading-tight">
                    <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                      Join 10,000+
                    </span>
                    <br />
                    <span className="text-white">
                      Subscribers
                    </span>
                  </h2>
                  
                  <p className="text-gray-300 leading-relaxed">
                    Get weekly insights, exclusive resources, and industry trends delivered straight to your inbox.
                  </p>
                </div>

                {/* Social Proof */}
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div 
                        key={i} 
                        className="w-8 h-8 rounded-full border-2 border-slate-900"
                        style={{
                          background: `linear-gradient(135deg, hsl(${i * 60}, 70%, 60%), hsl(${i * 60 + 30}, 70%, 50%))`
                        }}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-400">
                    +10,241 members
                  </span>
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className="w-5 h-5 text-yellow-400 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-400">
                    4.9/5 rating
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="glass border border-white/10 rounded-2xl p-8">
              <div className="mb-8">
                <h3 className="font-outfit text-2xl font-bold text-white mb-2">
                  Subscribe to Our Newsletter
                </h3>
                <p className="text-gray-400">
                  Stay ahead with weekly insights and exclusive content
                </p>
              </div>

              {/* Benefits Grid */}
              <div className="grid grid-cols-1 gap-4 mb-8">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit.title}
                    className="flex items-start space-x-4 p-4 rounded-xl bg-white/5 border border-white/10 group hover:border-cyan-500/30 transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">
                        {benefit.title}
                      </h4>
                      <p className="text-sm text-gray-400">
                        {benefit.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-cyan-500/50 rounded-xl h-12"
                    required
                  />
                </div>

                <div>
                  <Input
                    type="email"
                    placeholder="your.email@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-cyan-500/50 rounded-xl h-12"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:opacity-90 text-white font-semibold py-3 h-12 rounded-xl transition-all duration-300"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Subscribing...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <Mail className="w-5 h-5 mr-2" />
                      Subscribe Now
                    </span>
                  )}
                </Button>
              </form>

              <p className="text-xs text-gray-400 text-center mt-4">
                By subscribing, you agree to our Privacy Policy and consent to receive updates.
                <br />
                Unsubscribe anytime.
              </p>

              {/* Trust Badges */}
              <div className="flex items-center justify-center space-x-6 mt-6 pt-6 border-t border-white/10">
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>No spam</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Weekly only</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Unsubscribe easy</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
