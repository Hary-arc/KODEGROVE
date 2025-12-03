'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Sparkles, Clock, Gift, ArrowRight, CheckCircle, Star, Zap } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'

export function SpecialOfferPopup() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  })

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { hours: prev.hours, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    console.log('Special offer claimed:', email)
    setIsSubmitting(false)
    
    alert('Offer claimed! Check your email for details.')
  }

  const features = [
    "20% off all services",
    "Free brand strategy session",
    "Priority support included",
    "Extended warranty",
    "Exclusive templates pack"
  ]

  return (
    <div className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl shadow-2xl">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105 brightness-[0.85]"
        style={{
          backgroundImage: "url('/your-image.jpg')"  // <--- change image here
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Soft atmospheric colored glow */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-orange-500/20 blur-3xl" />

      {/* CONTENT WRAPPER */}
      <div className="relative p-10 lg:p-16">

        {/* Badge */}
        <motion.div
          className="absolute top-4 left-1/2 -translate-x-1/2"

          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <div className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg flex items-center space-x-2">
            <Sparkles className="w-4 h-4" />
            <span>LIMITED TIME OFFER</span>
            <Sparkles className="w-4 h-4" />
          </div>
        </motion.div>

        {/* HEADER */}
        <div className="text-center mt-6 mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full mb-8"
          >
            <Gift className="w-10 h-10 text-white" />
          </motion.div>

          <h2 className="font-outfit text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            <span className="bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Flash Sale!
            </span>
            <br />
            <span className="text-white">
              Save 20% Today
            </span>
          </h2>

          <p className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto">
            Transform your digital presence with our premium services. Limited spots available!
          </p>

          {/* COUNTDOWN */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="glass border border-white/20 rounded-xl p-4 min-w-[80px]">
              <div className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                {String(timeLeft.hours).padStart(2, '0')}
              </div>
              <div className="text-xs text-gray-400 uppercase">Hours</div>
            </div>
            <div className="text-2xl text-gray-500">:</div>
            <div className="glass border border-white/20 rounded-xl p-4 min-w-[80px]">
              <div className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                {String(timeLeft.minutes).padStart(2, '0')}
              </div>
              <div className="text-xs text-gray-400 uppercase">Minutes</div>
            </div>
            <div className="text-2xl text-gray-500">:</div>
            <div className="glass border border-white/20 rounded-xl p-4 min-w-[80px]">
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                {String(timeLeft.seconds).padStart(2, '0')}
              </div>
              <div className="text-xs text-gray-400 uppercase">Seconds</div>
            </div>
          </div>

          <motion.div
            className="inline-flex items-center space-x-2 bg-orange-500/20 border border-orange-500/50 rounded-full px-4 py-2 mb-8"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Clock className="w-4 h-4 text-orange-400" />
            <span className="text-sm text-orange-300">
              Offer ends in {timeLeft.hours}h {timeLeft.minutes}m
            </span>
          </motion.div>
        </div>

        {/* FEATURES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          <div className="md:col-span-2">
            <h3 className="text-white font-semibold mb-4 text-center">
              What's Included:
            </h3>
          </div>
          {features.map((feature, index) => (
            <motion.div
              key={feature}
              className="flex items-center space-x-3 glass border border-white/10 rounded-xl p-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
              <span className="text-gray-300">{feature}</span>
            </motion.div>
          ))}
        </div>

        {/* PRICE */}
        <div className="glass border border-white/10 rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-center space-x-8">
            <div className="text-center">
              <div className="text-gray-400 line-through text-lg mb-1">$9,999</div>
              <div className="text-xs text-gray-500">Regular Price</div>
            </div>
            <div className="text-4xl text-gray-500">→</div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-1">
                $7,999
              </div>
              <div className="text-xs text-green-400 font-semibold">SAVE $2,000!</div>
            </div>
          </div>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-orange-500/50 rounded-xl h-12"
              required
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 hover:opacity-90 text-white font-semibold px-8 h-12 rounded-xl whitespace-nowrap"
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Processing...
                </span>
              ) : (
                <span className="flex items-center">
                  Claim Offer
                  <ArrowRight className="w-5 h-5 ml-2" />
                </span>
              )}
            </Button>
          </div>

          <p className="text-xs text-gray-400 text-center mb-4">
            ✓ No credit card required  •  ✓ Instant access  •  ✓ Money-back guarantee
          </p>
        </form>

        {/* SOCIAL PROOF */}
        <div className="flex items-center justify-center space-x-8 pt-6 border-t border-white/10">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
            </div>
            <div className="text-sm text-gray-400">4.9/5 Rating</div>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div className="text-center">
            <div className="text-xl font-bold text-white mb-1">247</div>
            <div className="text-sm text-gray-400">Already Claimed</div>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div className="text-center">
            <div className="text-xl font-bold text-white mb-1">12</div>
            <div className="text-sm text-gray-400">Spots Left</div>
          </div>
        </div>

        {/* URGENCY */}
        <motion.div
          className="mt-6 text-center"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="inline-flex items-center space-x-2 text-sm text-orange-300">
            <Zap className="w-4 h-4" />
            <span className="font-medium">
              ⚡ Only 12 spots remaining at this price
            </span>
          </div>
        </motion.div>

      </div>
    </div>
  )
}
