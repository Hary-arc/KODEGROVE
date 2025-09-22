'use client'

import { motion } from 'framer-motion'
import { Code, Zap, Target, CheckCircle, ArrowRight, Globe, Smartphone, Database } from 'lucide-react'
import { Button } from '../../components/ui/button'

export function WebDevelopmentPopup() {
  const features = [
    {
      icon: Code,
      title: "Modern Tech Stack",
      description: "Next.js, React, TypeScript, and cutting-edge frameworks for lightning-fast performance."
    },
    {
      icon: Zap,
      title: "Performance Optimized",
      description: "Sub-2 second load times with advanced caching, CDN integration, and code optimization."
    },
    {
      icon: Target,
      title: "SEO Mastery",
      description: "Built-in SEO optimization that drives organic traffic and improves search rankings."
    }
  ]

  const packages = [
    {
      name: "Starter",
      price: "$2,999",
      description: "Perfect for small businesses",
      features: [
        "5-page responsive website",
        "Mobile optimization",
        "Basic SEO setup",
        "Contact form integration",
        "1 month support"
      ],
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      name: "Professional",
      price: "$7,999",
      description: "Ideal for growing companies",
      features: [
        "15-page custom website",
        "Advanced animations",
        "E-commerce integration",
        "Analytics dashboard",
        "3 months support",
        "Performance optimization"
      ],
      gradient: "from-purple-500 to-pink-500",
      popular: true
    },
    {
      name: "Enterprise",
      price: "$15,999",
      description: "For large-scale operations",
      features: [
        "Unlimited pages",
        "Custom CMS",
        "Multi-language support",
        "Advanced integrations",
        "12 months support",
        "Dedicated project manager"
      ],
      gradient: "from-green-500 to-emerald-500"
    }
  ]

  return (
    <div className="p-8">
      {/* Hero Section */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-flex items-center space-x-3 glass rounded-full px-6 py-3 mb-6 border border-white/20">
          <Globe className="w-5 h-5 text-cyan-400" />
          <span className="font-medium text-gray-200">Web Development</span>
        </div>
        
        <h1 className="font-outfit text-4xl lg:text-5xl font-bold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Hypnotic Websites That
          </span>
          <br />
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Drive Results
          </span>
        </h1>
        
        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
          Transform your vision into a captivating digital experience that mesmerizes visitors 
          and converts them into loyal customers.
        </p>
        
        <div className="flex items-center justify-center space-x-8 text-sm">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span className="text-gray-300">48h Delivery</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span className="text-gray-300">99.9% Uptime</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span className="text-gray-300">Mobile First</span>
          </div>
        </div>
      </motion.div>

      {/* Features Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            className="glass border border-white/10 rounded-xl p-6 group hover:border-white/30 transition-all duration-300"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <feature.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-outfit text-xl font-bold text-white mb-3">
              {feature.title}
            </h3>
            <p className="text-gray-300 leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Pricing Packages */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="text-center mb-10">
          <h2 className="font-outfit text-3xl font-bold text-white mb-4">
            Choose Your Package
          </h2>
          <p className="text-gray-300 text-lg">
            Transparent pricing with no hidden fees
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              className={`relative glass border rounded-2xl p-8 ${
                pkg.popular 
                  ? 'border-purple-500/50 ring-2 ring-purple-500/20' 
                  : 'border-white/10'
              } group hover:border-white/30 transition-all duration-300`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="font-outfit text-2xl font-bold text-white mb-2">
                  {pkg.name}
                </h3>
                <p className="text-gray-400 mb-4">{pkg.description}</p>
                <div className="mb-6">
                  <span className={`text-4xl font-bold bg-gradient-to-r ${pkg.gradient} bg-clip-text text-transparent`}>
                    {pkg.price}
                  </span>
                  <span className="text-gray-400 ml-2">one-time</span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {pkg.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              <Button
                className={`w-full bg-gradient-to-r ${pkg.gradient} hover:opacity-90 text-white font-semibold py-3 rounded-xl transition-all duration-300 group-hover:scale-105`}
              >
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        className="text-center glass border border-white/10 rounded-2xl p-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <h3 className="font-outfit text-2xl font-bold text-white mb-4">
          Ready to Transform Your Digital Presence?
        </h3>
        <p className="text-gray-300 mb-6 text-lg">
          Let's create a website that captivates your audience and drives real business results.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:opacity-90 text-white font-semibold px-8 py-3 rounded-xl">
            Schedule Free Consultation
          </Button>
          <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8 py-3 rounded-xl">
            View Portfolio
          </Button>
        </div>
      </motion.div>
    </div>
  )
}