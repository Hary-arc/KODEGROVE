'use client'

import { motion } from 'motion/react'
import { ResponsiveCard, ResponsiveCardGrid } from './ui/responsive-card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { 
  Building2, 
  MapPin, 
  Calendar, 
  Users, 
  Globe,
  Award,
  TrendingUp,
  Heart,
  Download,
  ExternalLink,
  Phone,
  Mail,
  FileText,
  Shield
} from 'lucide-react'

// Company milestones
const milestones = [
  {
    year: '2019',
    title: 'Company Founded',
    description: 'Started with a vision to transform businesses through technology',
    icon: Building2,
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    year: '2020',
    title: 'First 100 Clients',
    description: 'Reached our first major milestone during challenging times',
    icon: Users,
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    year: '2022',
    title: 'Global Expansion',
    description: 'Opened offices in 3 new countries to serve clients worldwide',
    icon: Globe,
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    year: '2024',
    title: 'Industry Recognition',
    description: 'Awarded "Best Software Development Company" by TechReview',
    icon: Award,
    gradient: 'from-orange-500 to-red-500'
  }
]

// Company facts
const companyFacts = [
  {
    label: 'Founded',
    value: '2019',
    description: 'Years of Excellence'
  },
  {
    label: 'Headquarters',
    value: 'San Francisco',
    description: 'Global Presence'
  },
  {
    label: 'Team Members',
    value: '150+',
    description: 'Expert Professionals'
  },
  {
    label: 'Projects Delivered',
    value: '1,000+',
    description: 'Successful Launches'
  },
  {
    label: 'Countries Served',
    value: '25+',
    description: 'Worldwide Reach'
  },
  {
    label: 'Client Retention',
    value: '98%',
    description: 'Satisfaction Rate'
  }
]

// Office locations
const offices = [
  {
    city: 'San Francisco',
    country: 'USA',
    address: '123 Tech Street, Suite 500',
    phone: '+1 (555) 123-4567',
    email: 'sf@codeflow.com',
    type: 'Headquarters',
    timezone: 'PST'
  },
  {
    city: 'London',
    country: 'UK',
    address: '456 Innovation Ave, Floor 10',
    phone: '+44 20 7123 4567',
    email: 'london@codeflow.com',
    type: 'European Hub',
    timezone: 'GMT'
  },
  {
    city: 'Singapore',
    country: 'Singapore',
    address: '789 Business Blvd, Tower A',
    phone: '+65 6123 4567',
    email: 'singapore@codeflow.com',
    type: 'APAC Hub',
    timezone: 'SGT'
  }
]

// Legal and compliance documents
const legalDocs = [
  {
    title: 'Privacy Policy',
    description: 'How we protect and handle your data',
    icon: Shield,
    link: '/privacy-policy'
  },
  {
    title: 'Terms of Service',
    description: 'Legal terms and conditions',
    icon: FileText,
    link: '/terms-of-service'
  },
  {
    title: 'Security Compliance',
    description: 'Our security standards and certifications',
    icon: Shield,
    link: '/security-compliance'
  },
  {
    title: 'Company Profile',
    description: 'Download our complete company overview',
    icon: Download,
    link: '/company-profile.pdf'
  }
]

// Leadership team preview
const leadership = [
  {
    name: 'Alex Johnson',
    role: 'CEO & Founder',
    experience: '15+ years in tech leadership',
    education: 'Stanford University, Computer Science',
    image: '/team/alex-johnson.jpg'
  },
  {
    name: 'Sarah Chen',
    role: 'CTO',
    experience: '12+ years in software architecture',
    education: 'MIT, Software Engineering',
    image: '/team/sarah-chen.jpg'
  },
  {
    name: 'Michael Rodriguez',
    role: 'Head of Operations',
    experience: '10+ years in business operations',
    education: 'Harvard Business School',
    image: '/team/michael-rodriguez.jpg'
  }
]

interface CompanyInfoSectionProps {
  variant?: 'full' | 'compact' | 'minimal'
  showOffices?: boolean
  showMilestones?: boolean
  showLeadership?: boolean
}

export function CompanyInfoSection({ 
  variant = 'full', 
  showOffices = true, 
  showMilestones = true, 
  showLeadership = true 
}: CompanyInfoSectionProps) {
  return (
    <section className="py-16 lg:py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900"></div>
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Badge className="gradient-electric text-white border-0 mb-4">
            <Building2 className="w-4 h-4 mr-2" />
            About CodeFlow
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-6">
            Transparency in Everything We Do
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Get to know the company behind your success. From our humble beginnings to our global presence, 
            we believe in complete transparency with our clients and partners.
          </p>
        </motion.div>

        {/* Company Facts Grid */}
        <ResponsiveCardGrid columns={3} gap="md" className="mb-16 lg:mb-20">
          {companyFacts.map((fact, index) => (
            <ResponsiveCard
              key={fact.label}
              variant="glass"
              size="sm"
              hover={true}
              animation={true}
              index={index}
              className="text-center group"
            >
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">
                {fact.value}
              </div>
              <div className="font-semibold text-gray-200 mb-1">
                {fact.label}
              </div>
              <div className="text-sm text-gray-400">
                {fact.description}
              </div>
            </ResponsiveCard>
          ))}
        </ResponsiveCardGrid>

        {/* Company Milestones */}
        {showMilestones && variant !== 'minimal' && (
          <div className="mb-16 lg:mb-20">
            <motion.h3 
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-center mb-8 lg:mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Our Journey
            </motion.h3>
            
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-500 to-cyan-500 opacity-30"></div>
              
              <div className="space-y-8 lg:space-y-12">
                {milestones.map((milestone, index) => {
                  const Icon = milestone.icon
                  const isEven = index % 2 === 0
                  
                  return (
                    <motion.div
                      key={milestone.year}
                      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.6 + index * 0.2 }}
                      className={`flex items-center ${isEven ? 'flex-row' : 'flex-row-reverse'} relative`}
                    >
                      {/* Content */}
                      <div className={`w-full lg:w-5/12 ${isEven ? 'lg:pr-8' : 'lg:pl-8'}`}>
                        <ResponsiveCard
                          variant="glass"
                          size="md"
                          hover={true}
                          className="group"
                        >
                          <div className="flex items-start space-x-4">
                            <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${milestone.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-500 flex-shrink-0`}>
                              <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                            </div>
                            <div className="flex-1">
                              <Badge className="mb-3 bg-gradient-to-r from-purple-500 to-cyan-500 text-white border-0">
                                {milestone.year}
                              </Badge>
                              <h4 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">
                                {milestone.title}
                              </h4>
                              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                                {milestone.description}
                              </p>
                            </div>
                          </div>
                        </ResponsiveCard>
                      </div>
                      
                      {/* Center Icon */}
                      <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full flex items-center justify-center z-10">
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      </div>
                      
                      {/* Spacer */}
                      <div className="w-full lg:w-5/12"></div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* Office Locations */}
        {showOffices && variant === 'full' && (
          <div className="mb-16 lg:mb-20">
            <motion.h3 
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-center mb-8 lg:mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Global Presence
            </motion.h3>
            
            <ResponsiveCardGrid columns={3} gap="lg">
              {offices.map((office, index) => (
                <ResponsiveCard
                  key={office.city}
                  variant="glass"
                  size="lg"
                  hover={true}
                  animation={true}
                  index={index}
                  className="group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-lg sm:text-xl font-bold text-white mb-1 group-hover:text-purple-300 transition-colors duration-300">
                        {office.city}
                      </h4>
                      <p className="text-sm text-gray-400">{office.country}</p>
                    </div>
                    <Badge variant="outline" className="border-purple-400/50 text-purple-400 bg-purple-400/10 text-xs">
                      {office.type}
                    </Badge>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                      <span className="text-sm text-gray-300">{office.address}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span className="text-sm text-gray-300">{office.phone}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span className="text-sm text-gray-300">{office.email}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500">
                      Timezone: {office.timezone}
                    </div>
                    <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10 group/btn">
                      <span>Contact</span>
                      <ExternalLink className="w-3 h-3 ml-1 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
                    </Button>
                  </div>
                </ResponsiveCard>
              ))}
            </ResponsiveCardGrid>
          </div>
        )}

        {/* Leadership Preview */}
        {showLeadership && variant === 'full' && (
          <div className="mb-16 lg:mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="text-center mb-8 lg:mb-12"
            >
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
                Leadership Team
              </h3>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Meet the experienced leaders driving CodeFlow's vision and success.
              </p>
            </motion.div>
            
            <ResponsiveCardGrid columns={3} gap="lg">
              {leadership.map((leader, index) => (
                <ResponsiveCard
                  key={leader.name}
                  variant="glass"
                  size="lg"
                  hover={true}
                  animation={true}
                  index={index}
                  className="text-center group"
                >
                  <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform duration-500">
                    {leader.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  
                  <h4 className="text-lg sm:text-xl font-bold text-white mb-1 group-hover:text-purple-300 transition-colors duration-300">
                    {leader.name}
                  </h4>
                  <p className="text-purple-400 font-medium mb-3">{leader.role}</p>
                  
                  <div className="space-y-2 text-sm text-gray-300">
                    <p>{leader.experience}</p>
                    <p className="text-gray-400">{leader.education}</p>
                  </div>
                </ResponsiveCard>
              ))}
            </ResponsiveCardGrid>
            
            <div className="text-center mt-8">
              <Button className="gradient-electric hover:shadow-2xl hover:shadow-purple-500/30 text-white px-6 py-3 rounded-xl font-semibold">
                View Full Team
                <Users className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Legal & Compliance Documents */}
        <div>
          <motion.h3 
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-center mb-8 lg:mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            Legal & Compliance
          </motion.h3>
          
          <ResponsiveCardGrid columns={4} gap="md">
            {legalDocs.map((doc, index) => {
              const Icon = doc.icon
              return (
                <ResponsiveCard
                  key={doc.title}
                  variant="glass"
                  size="sm"
                  hover={true}
                  animation={true}
                  index={index}
                  className="text-center group cursor-pointer"
                >
                  <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  
                  <h4 className="font-bold text-white mb-2 group-hover:text-green-300 transition-colors duration-300">
                    {doc.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-400 mb-3">
                    {doc.description}
                  </p>
                  
                  <div className="flex items-center justify-center text-green-400 group-hover:text-green-300 transition-colors duration-300">
                    <span className="text-xs font-medium mr-1">View</span>
                    <ExternalLink className="w-3 h-3" />
                  </div>
                </ResponsiveCard>
              )
            })}
          </ResponsiveCardGrid>
        </div>
      </div>
    </section>
  )
}