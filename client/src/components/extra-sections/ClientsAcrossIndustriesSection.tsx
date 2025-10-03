'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { 
  ArrowRight, 
  Globe,
  Building2,
  TrendingUp,
  Star,
  CheckCircle,
  ExternalLink
} from 'lucide-react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { ResponsiveCard, ResponsiveCardGrid } from '../ui/responsive-card'
import { ImageWithFallback } from '../figma/ImageWithFallback'
// @ts-ignore
import exampleImage from '/8e92ef233594715.Y3JvcCwyNTU2LDIwMDAsMjIxLDA.jpg'
import React from 'react'
// Major client logos and information
const clientsData = [
  {
    name: 'Northwestern QATAR',
    description: 'Northwestern University',
    logo: '/logos/northwestern.svg',
    industry: 'Education',
    size: 'Enterprise'
  },
  {
    name: 'IBM',
    description: 'IBM',
    logo: '/logos/ibm.svg',
    industry: 'Technology',
    size: 'Fortune 100'
  },
  {
    name: 'BUDDHA BRANDS',
    description: 'Buddha Brands',
    logo: '/logos/buddha-brands.svg',
    industry: 'Consumer Goods',
    size: 'Scale-up'
  },
  {
    name: 'Paul Stuart',
    description: 'Paul Stuart',
    logo: '/logos/paul-stuart.svg',
    industry: 'Fashion',
    size: 'Luxury Brand'
  },
  {
    name: 'SPAR BERNSTEIN',
    description: 'Spar & Bernstein',
    logo: '/logos/spar-bernstein.svg',
    industry: 'Legal',
    size: 'Mid-market'
  },
  {
    name: 'BABIES R US',
    description: 'Babies R Us',
    logo: '/logos/babies-r-us.svg',
    industry: 'Retail',
    size: 'Enterprise'
  },
  {
    name: 'ENCHANT',
    description: 'Enchant Christmas',
    logo: '/logos/enchant.svg',
    industry: 'Entertainment',
    size: 'Enterprise'
  },
  {
    name: 'Xerox',
    description: 'Xerox',
    logo: '/logos/xerox.svg',
    industry: 'Technology',
    size: 'Fortune 500'
  },
  {
    name: 'PUMA ENERGY',
    description: 'Puma Energy',
    logo: '/logos/puma-energy.svg',
    industry: 'Energy',
    size: 'Enterprise'
  },
  {
    name: 'MITSUI PLASTICS',
    description: 'Mitsui Plastics',
    logo: '/logos/mitsui-plastics.svg',
    industry: 'Manufacturing',
    size: 'Enterprise'
  },
  {
    name: 'Absolute Dogs',
    description: 'Absolute Dogs',
    logo: '/logos/absolute-dogs.svg',
    industry: 'Pet Care',
    size: 'Scale-up'
  },
  {
    name: 'BEST BUY',
    description: 'Best Buy',
    logo: '/logos/best-buy.svg',
    industry: 'Retail',
    size: 'Fortune 500'
  }
]

// Industry categories
const industries = [
  { name: 'Technology', count: 3, color: 'from-blue-500 to-cyan-500' },
  { name: 'Retail', count: 2, color: 'from-green-500 to-emerald-500' },
  { name: 'Enterprise', count: 4, color: 'from-purple-500 to-pink-500' },
  { name: 'Healthcare', count: 1, color: 'from-red-500 to-orange-500' },
  { name: 'Finance', count: 2, color: 'from-yellow-500 to-orange-500' }
]

// Success metrics
const successMetrics = [
  {
    number: '500+',
    label: 'Fortune 500 Companies',
    description: 'Trust our expertise',
    icon: Building2
  },
  {
    number: '25+',
    label: 'Industries Served',
    description: 'Across global markets',
    icon: Globe
  },
  {
    number: '300%',
    label: 'Average Growth',
    description: 'Client business increase',
    icon: TrendingUp
  }
]

export function ClientsAcrossIndustriesSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const [hoveredClient, setHoveredClient] = useState<number | null>(null)

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src={exampleImage}
          alt="Clients across industries background"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-purple-950/70 to-slate-950/90" />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1], 
            opacity: [0.3, 0.6, 0.3] 
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2], 
            opacity: [0.4, 0.7, 0.4] 
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-20"
        >
          <Badge className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white border-0 mb-6">
            <Globe className="w-4 h-4 mr-2" />
            CLIENTS ACROSS INDUSTRIES
          </Badge>
          
          <h2 className="font-outfit text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-8">
            <span className="block text-white">Full-Service Web Design Agency</span>
          </h2>
          
          <div className="max-w-3xl mx-auto space-y-4">
            <p className="text-xl text-gray-300 leading-relaxed">
              From startups to Fortune 500 companies,
            </p>
            <p className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              we create custom solutions that grow brands online
            </p>
          </div>
        </motion.div>

        {/* Success Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <ResponsiveCardGrid columns={3} gap="lg">
            {successMetrics.map((metric, index) => {
              const Icon = metric.icon
              return (
                <ResponsiveCard
                  key={index}
                  variant="glass"
                  size="md"
                  hover={true}
                  animation={true}
                  index={index}
                  className="text-center group"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="text-3xl sm:text-4xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">
                    {metric.number}
                  </div>
                  
                  <h3 className="font-semibold text-gray-200 mb-2">
                    {metric.label}
                  </h3>
                  
                  <p className="text-sm text-gray-400">
                    {metric.description}
                  </p>
                </ResponsiveCard>
              )
            })}
          </ResponsiveCardGrid>
        </motion.div>

        {/* Client Logos Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <ResponsiveCardGrid columns={4} gap="md" className="lg:grid-cols-6">
            {clientsData.map((client, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.05 }}
                onMouseEnter={() => setHoveredClient(index)}
                onMouseLeave={() => setHoveredClient(null)}
              >
                <ResponsiveCard
                  variant="glass"
                  size="sm"
                  hover={true}
                  className="group cursor-pointer text-center relative overflow-hidden"
                >
                  {/* Client Logo/Name */}
                  <div className="h-16 flex items-center justify-center mb-3">
                    <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm group-hover:bg-white/20 transition-colors duration-300">
                      <span className="text-white font-bold text-xs">
                        {client.name.split(' ')[0].slice(0, 3).toUpperCase()}
                      </span>
                    </div>
                  </div>
                  
                  {/* Client Info */}
                  <h3 className="font-bold text-white text-sm mb-1 group-hover:text-purple-300 transition-colors duration-300 line-clamp-1">
                    {client.name}
                  </h3>
                  
                  <p className="text-xs text-gray-400 mb-2 line-clamp-1">
                    {client.description}
                  </p>
                  
                  {/* Industry Badge */}
                  <Badge 
                    variant="outline" 
                    className="border-purple-400/50 text-purple-400 bg-purple-400/10 text-xs"
                  >
                    {client.size}
                  </Badge>

                  {/* Hover Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ExternalLink className="w-5 h-5 text-white" />
                  </motion.div>
                </ResponsiveCard>
              </motion.div>
            ))}
          </ResponsiveCardGrid>
        </motion.div>

        {/* Industry Categories */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-white text-center mb-8">Industries We Serve</h3>
          
          <div className="flex flex-wrap justify-center gap-4">
            {industries.map((industry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 1.0 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <ResponsiveCard
                  variant="glass"
                  size="sm"
                  hover={true}
                  className="group cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${industry.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white group-hover:text-purple-300 transition-colors duration-300">
                        {industry.name}
                      </h4>
                      <p className="text-xs text-gray-400">
                        {industry.count} Clients
                      </p>
                    </div>
                  </div>
                </ResponsiveCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center"
        >
          <ResponsiveCard variant="gradient" size="full" className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>
            
            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Join Our Success Stories?
            </h3>
            
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Join hundreds of industry leaders who trust us to grow their brands online 
              with custom web solutions that deliver real results.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Button className="gradient-electric hover:shadow-2xl hover:shadow-purple-500/30 text-white px-8 py-4 rounded-xl font-semibold text-lg group">
                EXPLORE ALL SERVICES
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 backdrop-blur-xl px-8 py-4 rounded-xl font-semibold text-lg group">
                <Globe className="w-5 h-5 mr-2" />
                View Case Studies
              </Button>
            </div>
          </ResponsiveCard>
        </motion.div>
      </div>
    </section>
  )
}
export default ClientsAcrossIndustriesSection