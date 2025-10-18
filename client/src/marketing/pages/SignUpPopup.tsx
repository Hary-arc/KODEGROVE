'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Mail, Lock, User, ArrowRight, CheckCircle, Sparkles, Github, Chrome } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'

export function SignUpPopup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    company: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    console.log('Sign up data:', formData)
    setIsSubmitting(false)
  }

  const benefits = [
    "Access to exclusive resources",
    "Priority customer support",
    "Free consultation call",
    "Monthly industry insights",
    "Early access to new features"
  ]

  return (
    <div className="p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Side - Benefits */}
        <motion.div
          className="hidden lg:block"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="sticky top-8">
            <div className="inline-flex items-center space-x-2 glass rounded-full px-4 py-2 mb-6 border border-white/20">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-gray-200">Join 5,000+ Members</span>
            </div>

            <h2 className="font-outfit text-4xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Start Your Journey
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                With CodeFlow
              </span>
            </h2>

            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Create your account and unlock premium features, exclusive resources, and personalized support for your digital transformation.
            </p>

            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  className="flex items-start space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                >
                  <div className="mt-1">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                  <span className="text-gray-300">{benefit}</span>
                </motion.div>
              ))}
            </div>

            {/* Decorative element */}
            <div className="mt-12 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl blur-3xl" />
              <div className="relative glass border border-white/10 rounded-2xl p-6">
                <div className="flex items-center space-x-4">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 border-2 border-slate-900" />
                    ))}
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Trusted by</div>
                    <div className="text-white font-semibold">5,000+ businesses</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Sign Up Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="glass border border-white/10 rounded-2xl p-8">
            <h3 className="font-outfit text-2xl font-bold text-white mb-2">
              Create Account
            </h3>
            <p className="text-gray-400 mb-8">
              Fill in your details to get started
            </p>

            {/* Social Sign Up */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <Button
                variant="outline"
                className="border-white/20 hover:bg-white/10 text-white"
              >
                <Github className="w-5 h-5 mr-2" />
                GitHub
              </Button>
              <Button
                variant="outline"
                className="border-white/20 hover:bg-white/10 text-white"
              >
                <Chrome className="w-5 h-5 mr-2" />
                Google
              </Button>
            </div>

            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-slate-900/50 text-gray-400">Or continue with</span>
              </div>
            </div>

            {/* Sign Up Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Full Name
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
                  Email Address
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

              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Company (Optional)
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Your Company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="pl-11 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-cyan-500/50 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="pl-11 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-cyan-500/50 rounded-xl"
                    required
                  />
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  Must be at least 8 characters long
                </p>
              </div>

              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="terms"
                  className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 text-cyan-500 focus:ring-cyan-500"
                  required
                />
                <label htmlFor="terms" className="text-sm text-gray-300">
                  I agree to the{' '}
                  <a href="#" className="text-cyan-400 hover:text-cyan-300 underline">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-cyan-400 hover:text-cyan-300 underline">
                    Privacy Policy
                  </a>
                </label>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:opacity-90 text-white font-semibold py-3 rounded-xl transition-all duration-300"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Creating Account...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    Create Account
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </span>
                )}
              </Button>
            </form>

            <p className="text-center text-gray-400 mt-6">
              Already have an account?{' '}
              <button className="text-cyan-400 hover:text-cyan-300 font-semibold">
                Sign In
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
