'use client'

import { motion } from 'framer-motion'
import { ResponsiveCard, ResponsiveCardGrid } from './ui/responsive-card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { 
  Award,
  Star,
  Trophy,
  Medal,
  Users,
  TrendingUp,
  ExternalLink,
  Calendar,
  Building2,
  Globe,
  Newspaper,
  Target,
  CheckCircle,
  Heart
} from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'

// Industry awards and recognition
const industryAwards = [
  {
    title: 'Best Software Development Company',
    organization: 'TechReview Awards',
    year: '2024',
    category: 'Technology Excellence',
    description: 'Recognized for outstanding innovation and client satisfaction in software development',
    icon: Trophy,
    gradient: 'from-yellow-500 to-orange-500'
  },
  {
    title: 'Top Development Partner',
    organization: 'Clutch.co',
    year: '2024',
    category: 'Industry Leadership',
    description: 'Ranked among the top 1% of development companies globally',
    icon: Star,
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    title: 'Innovation Partner of the Year',
    organization: 'Startup Awards',
    year: '2023',
    category: 'Innovation',
    description: 'Honored for exceptional support to startup ecosystem',
    icon: Award,
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    title: 'Excellence in Customer Service',
    organization: 'Service Excellence Awards',
    year: '2023',
    category: 'Customer Success',
    description: 'Outstanding commitment to client satisfaction and support',
    icon: Medal,
    gradient: 'from-green-500 to-emerald-500'
  }
]

// Press mentions and media coverage
const pressMentions = [
  {
    title: 'CodeFlow Leads Digital Transformation for Fortune 500 Companies',
    publication: 'TechCrunch',
    date: 'January 15, 2024',
    excerpt: 'CodeFlow has emerged as a key player in enterprise digital transformation, helping major corporations modernize their technology infrastructure...',
    type: 'Feature Article',
    logo: '/press/techcrunch.svg'
  },
  {
    title: 'Top 10 Software Development Companies to Watch in 2024',
    publication: 'Forbes',
    date: 'February 20, 2024',
    excerpt: 'CodeFlow ranks among the most innovative software development companies, setting new standards for quality and client satisfaction...',
    type: 'Industry Ranking',
    logo: '/press/forbes.svg'
  },
  {
    title: 'CodeFlow Announces Series A Funding Round',
    publication: 'VentureBeat',
    date: 'November 10, 2023',
    excerpt: 'The company plans to use the funding to expand its AI capabilities and enter new international markets...',
    type: 'Funding News',
    logo: '/press/venturebeat.svg'
  }
]

// Client testimonials with ratings
const testimonialHighlights = [
  {
    rating: 5.0,
    platform: 'Clutch.co',
    totalReviews: 47,
    excerpt: 'Exceptional development team with outstanding project delivery',
    clientType: 'Fortune 500 Company'
  },
  {
    rating: 4.9,
    platform: 'G2.com',
    totalReviews: 32,
    excerpt: 'Best-in-class software development services',
    clientType: 'Scale-up Companies'
  },
  {
    rating: 5.0,
    platform: 'GoodFirms',
    totalReviews: 28,
    excerpt: 'Highly recommended for enterprise software solutions',
    clientType: 'Enterprise Clients'
  }
]

// Technology partner recognitions
const partnerRecognitions = [
  {
    partner: 'AWS',
    status: 'Select Consulting Partner',
    specialization: 'Cloud Infrastructure & DevOps',
    logo: '/partners/aws.svg',
    certifications: 3
  },
  {
    partner: 'Google Cloud',
    status: 'Partner',
    specialization: 'AI/ML & Data Analytics',
    logo: '/partners/gcp.svg',
    certifications: 2
  },
  {
    partner: 'Microsoft Azure',
    status: 'Silver Partner',
    specialization: 'Enterprise Solutions',
    logo: '/partners/azure.svg',
    certifications: 4
  },
  {
    partner: 'MongoDB',
    status: 'Partner',
    specialization: 'Database Solutions',
    logo: '/partners/mongodb.svg',
    certifications: 2
  }
]

// Social impact initiatives
const socialImpact = [
  {
    initiative: 'CodeForGood',
    description: 'Free technology solutions for non-profit organizations',
    impact: '25+ non-profits supported',
    value: '$500K+ donated services',
    icon: Heart,
    gradient: 'from-pink-500 to-rose-500'
  },
  {
    initiative: 'Tech Education',
    description: 'Coding bootcamps for underrepresented communities',
    impact: '200+ students trained',
    value: '85% job placement',
    icon: Users,
    gradient: 'from-blue-500 to-indigo-500'
  },
  {
    initiative: 'Open Source',
    description: 'Contributing to open source projects and communities',
    impact: '50+ projects contributed',
    value: '1M+ downloads',
    icon: Globe,
    gradient: 'from-green-500 to-teal-500'
  }
]

interface IndustryRecognitionSectionProps {
  variant?: 'full' | 'compact' | 'minimal'
  showPress?: boolean
  showPartners?: boolean
  showSocial?: boolean
}

export function IndustryRecognitionSection({ 
  variant = 'full', 
  showPress = true, 
  showPartners = true, 
  showSocial = true 
}: IndustryRecognitionSectionProps) {
  return (
    <section className="py-16 lg:py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-yellow-900/20 to-slate-900"></div>
      <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 mb-4">
            <Trophy className="w-4 h-4 mr-2" />
            Industry Recognition
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-6">
            Award-Winning Excellence
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Our commitment to excellence has earned recognition from industry leaders, 
            prestigious awards, and the trust of clients worldwide.
          </p>
        </motion.div>

        {/* Industry Awards */}
        <div className="mb-16 lg:mb-20">
          <motion.h3 
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-center mb-8 lg:mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Recent Awards & Recognition
          </motion.h3>
          
          <ResponsiveCardGrid columns={2} gap="lg">
            {industryAwards.map((award, index) => {
              const Icon = award.icon
              return (
                <ResponsiveCard
                  key={award.title}
                  variant="glass"
                  size="lg"
                  hover={true}
                  animation={true}
                  index={index}
                  className="group"
                >
                  <div className="flex items-start space-x-4 mb-4">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${award.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-500 flex-shrink-0`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge className={`bg-gradient-to-r ${award.gradient} text-white border-0`}>
                          {award.year}
                        </Badge>
                        <Badge variant="outline" className="border-yellow-400/50 text-yellow-400 bg-yellow-400/10 text-xs">
                          {award.category}
                        </Badge>
                      </div>
                      <h4 className="text-lg sm:text-xl font-bold text-white mb-1 group-hover:text-yellow-300 transition-colors duration-300">
                        {award.title}
                      </h4>
                      <p className="text-sm text-purple-400 font-medium">
                        {award.organization}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                    {award.description}
                  </p>
                </ResponsiveCard>
              )
            })}
          </ResponsiveCardGrid>
        </div>

        {/* Client Reviews Summary */}
        <div className="mb-16 lg:mb-20">
          <motion.h3 
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-center mb-8 lg:mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Client Satisfaction Ratings
          </motion.h3>
          
          <ResponsiveCardGrid columns={3} gap="lg">
            {testimonialHighlights.map((testimonial, index) => (
              <ResponsiveCard
                key={testimonial.platform}
                variant="glass"
                size="lg"
                hover={true}
                animation={true}
                index={index}
                className="text-center group"
              >
                <div className="mb-4">
                  <div className="text-4xl sm:text-5xl font-bold text-white mb-2 group-hover:text-yellow-300 transition-colors duration-300">
                    {testimonial.rating.toFixed(1)}
                  </div>
                  <div className="flex items-center justify-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 sm:w-5 sm:h-5 ${i < Math.floor(testimonial.rating) ? 'text-yellow-400 fill-current' : 'text-gray-600'}`} 
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-400">
                    Based on {testimonial.totalReviews} reviews
                  </p>
                </div>
                
                <h4 className="font-bold text-white mb-2 group-hover:text-yellow-300 transition-colors duration-300">
                  {testimonial.platform}
                </h4>
                
                <blockquote className="text-sm text-gray-300 italic mb-3 leading-relaxed">
                  "{testimonial.excerpt}"
                </blockquote>
                
                <Badge variant="outline" className="border-yellow-400/50 text-yellow-400 bg-yellow-400/10 text-xs">
                  {testimonial.clientType}
                </Badge>
              </ResponsiveCard>
            ))}
          </ResponsiveCardGrid>
        </div>

        {/* Press Mentions */}
        {showPress && variant !== 'minimal' && (
          <div className="mb-16 lg:mb-20">
            <motion.h3 
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-center mb-8 lg:mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              In the News
            </motion.h3>
            
            <ResponsiveCardGrid columns={3} gap="lg">
              {pressMentions.map((mention, index) => (
                <ResponsiveCard
                  key={mention.title}
                  variant="glass"
                  size="lg"
                  hover={true}
                  animation={true}
                  index={index}
                  className="group cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
                      <Newspaper className="w-6 h-6" />
                    </div>
                    <Badge variant="outline" className="border-blue-400/50 text-blue-400 bg-blue-400/10 text-xs">
                      {mention.type}
                    </Badge>
                  </div>
                  
                  <h4 className="font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300 leading-tight">
                    {mention.title}
                  </h4>
                  
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-sm font-medium text-purple-400">{mention.publication}</span>
                    <span className="text-xs text-gray-500">•</span>
                    <span className="text-xs text-gray-500">{mention.date}</span>
                  </div>
                  
                  <p className="text-sm text-gray-300 leading-relaxed mb-4 line-clamp-3 group-hover:text-gray-200 transition-colors duration-300">
                    {mention.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Read Article</span>
                    <ExternalLink className="w-4 h-4 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
                  </div>
                </ResponsiveCard>
              ))}
            </ResponsiveCardGrid>
          </div>
        )}

        {/* Technology Partners */}
        {showPartners && variant === 'full' && (
          <div className="mb-16 lg:mb-20">
            <motion.h3 
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-center mb-8 lg:mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Certified Technology Partners
            </motion.h3>
            
            <ResponsiveCardGrid columns={4} gap="md">
              {partnerRecognitions.map((partner, index) => (
                <ResponsiveCard
                  key={partner.partner}
                  variant="glass"
                  size="md"
                  hover={true}
                  animation={true}
                  index={index}
                  className="text-center group"
                >
                  <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-gray-700 to-gray-600 flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  
                  <h4 className="font-bold text-white mb-1 group-hover:text-purple-300 transition-colors duration-300">
                    {partner.partner}
                  </h4>
                  
                  <Badge variant="outline" className="border-purple-400/50 text-purple-400 bg-purple-400/10 text-xs mb-2">
                    {partner.status}
                  </Badge>
                  
                  <p className="text-xs text-gray-400 mb-2">
                    {partner.specialization}
                  </p>
                  
                  <div className="flex items-center justify-center space-x-1 text-xs text-gray-500">
                    <CheckCircle className="w-3 h-3 text-green-400" />
                    <span>{partner.certifications} Certifications</span>
                  </div>
                </ResponsiveCard>
              ))}
            </ResponsiveCardGrid>
          </div>
        )}

        {/* Social Impact */}
        {showSocial && variant === 'full' && (
          <div className="mb-16 lg:mb-20">
            <motion.h3 
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-center mb-8 lg:mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              Social Impact & Giving Back
            </motion.h3>
            
            <ResponsiveCardGrid columns={3} gap="lg">
              {socialImpact.map((impact, index) => {
                const Icon = impact.icon
                return (
                  <ResponsiveCard
                    key={impact.initiative}
                    variant="glass"
                    size="lg"
                    hover={true}
                    animation={true}
                    index={index}
                    className="group"
                  >
                    <div className={`w-16 h-16 mb-4 rounded-2xl bg-gradient-to-br ${impact.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h4 className="text-lg font-bold text-white mb-2 group-hover:text-pink-300 transition-colors duration-300">
                      {impact.initiative}
                    </h4>
                    
                    <p className="text-sm text-gray-300 leading-relaxed mb-4 group-hover:text-gray-200 transition-colors duration-300">
                      {impact.description}
                    </p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Impact:</span>
                        <span className="text-white font-medium">{impact.impact}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Value:</span>
                        <span className="text-white font-medium">{impact.value}</span>
                      </div>
                    </div>
                  </ResponsiveCard>
                )
              })}
            </ResponsiveCardGrid>
          </div>
        )}

        {/* Call to Action */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <ResponsiveCard variant="gradient" size="full" className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Trophy className="w-8 h-8 text-yellow-400 mr-3" />
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Join Our Award-Winning Team
            </h3>
            
            <p className="text-lg text-gray-200 mb-6 max-w-2xl mx-auto">
              Experience the difference that comes with working with an industry-recognized leader. 
              Let's create something exceptional together.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:shadow-2xl hover:shadow-yellow-500/30 text-white px-8 py-3 rounded-xl font-semibold group/btn">
                <Star className="w-5 h-5 mr-2" />
                <span>Start Your Project</span>
              </Button>
              
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 backdrop-blur-xl px-8 py-3 rounded-xl font-semibold group/btn">
                <Trophy className="w-5 h-5 mr-2" />
                <span>View All Awards</span>
              </Button>
            </div>
          </ResponsiveCard>
        </motion.div>
      </div>
    </section>
  )
}