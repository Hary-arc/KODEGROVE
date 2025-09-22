'use client'

import { motion } from 'framer-motion'
import { ResponsiveCard, ResponsiveCardGrid } from './ui/responsive-card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { 
  Search,
  Lightbulb,
  Palette,
  Code,
  TestTube,
  Rocket,
  LifeBuoy,
  CheckCircle,
  Clock,
  Users,
  Target,
  Zap,
  Shield,
  TrendingUp,
  ArrowRight,
  Play
} from 'lucide-react'

// Development process steps
const processSteps = [
  {
    phase: '01',
    title: 'Discovery & Research',
    description: 'We dive deep into your business goals, target audience, and technical requirements to create a comprehensive project roadmap.',
    icon: Search,
    duration: '1-2 weeks',
    deliverables: ['Project Scope', 'Technical Requirements', 'Timeline & Budget', 'Risk Assessment'],
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    phase: '02',
    title: 'Strategy & Planning',
    description: 'Our team develops a detailed project plan with clear milestones, resource allocation, and success metrics.',
    icon: Lightbulb,
    duration: '1 week',
    deliverables: ['Project Plan', 'Resource Allocation', 'Success Metrics', 'Communication Plan'],
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    phase: '03',
    title: 'Design & Prototyping',
    description: 'We create intuitive user experiences and stunning visual designs that align with your brand and user needs.',
    icon: Palette,
    duration: '2-3 weeks',
    deliverables: ['Wireframes', 'UI/UX Design', 'Interactive Prototypes', 'Design System'],
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    phase: '04',
    title: 'Development',
    description: 'Our expert developers bring your vision to life using cutting-edge technologies and best practices.',
    icon: Code,
    duration: '4-8 weeks',
    deliverables: ['Clean Code', 'Documentation', 'Version Control', 'Progress Reports'],
    gradient: 'from-orange-500 to-red-500'
  },
  {
    phase: '05',
    title: 'Testing & QA',
    description: 'Rigorous testing ensures your application is bug-free, secure, and performs optimally across all platforms.',
    icon: TestTube,
    duration: '1-2 weeks',
    deliverables: ['Test Reports', 'Bug Fixes', 'Performance Optimization', 'Security Audit'],
    gradient: 'from-indigo-500 to-purple-500'
  },
  {
    phase: '06',
    title: 'Launch & Deployment',
    description: 'We handle the complete deployment process and ensure a smooth launch of your application.',
    icon: Rocket,
    duration: '1 week',
    deliverables: ['Live Application', 'Deployment Guide', 'Launch Support', 'Performance Monitoring'],
    gradient: 'from-pink-500 to-rose-500'
  },
  {
    phase: '07',
    title: 'Support & Maintenance',
    description: 'Ongoing support and maintenance to keep your application running smoothly and up-to-date.',
    icon: LifeBuoy,
    duration: 'Ongoing',
    deliverables: ['24/7 Support', 'Regular Updates', 'Performance Monitoring', 'Feature Enhancements'],
    gradient: 'from-teal-500 to-blue-500'
  }
]

// Methodology principles
const principles = [
  {
    icon: Target,
    title: 'Goal-Oriented',
    description: 'Every decision is made with your business objectives in mind'
  },
  {
    icon: Users,
    title: 'Collaborative',
    description: 'We work closely with your team throughout the entire process'
  },
  {
    icon: Zap,
    title: 'Agile & Iterative',
    description: 'Flexible approach that adapts to changing requirements'
  },
  {
    icon: Shield,
    title: 'Quality Focused',
    description: 'Rigorous testing and quality assurance at every stage'
  },
  {
    icon: Clock,
    title: 'Time Efficient',
    description: 'Optimized workflows to deliver projects on time'
  },
  {
    icon: TrendingUp,
    title: 'Scalable Solutions',
    description: 'Built to grow with your business needs'
  }
]

// Quality standards
const qualityStandards = [
  {
    standard: 'Code Review',
    description: 'Every line of code is peer-reviewed for quality and security',
    metric: '100%',
    icon: CheckCircle
  },
  {
    standard: 'Test Coverage',
    description: 'Comprehensive testing coverage for all critical functionality',
    metric: '95%+',
    icon: TestTube
  },
  {
    standard: 'Performance Score',
    description: 'Optimized for speed and user experience across all devices',
    metric: '90+',
    icon: Zap
  },
  {
    standard: 'Security Compliance',
    description: 'Adheres to industry security standards and best practices',
    metric: 'A+',
    icon: Shield
  }
]

// Timeline visualization data
const timelinePhases = [
  { name: 'Planning', weeks: 2, color: 'bg-blue-500' },
  { name: 'Design', weeks: 3, color: 'bg-purple-500' },
  { name: 'Development', weeks: 6, color: 'bg-green-500' },
  { name: 'Testing', weeks: 2, color: 'bg-orange-500' },
  { name: 'Launch', weeks: 1, color: 'bg-pink-500' }
]

interface ProcessMethodologySectionProps {
  variant?: 'full' | 'compact' | 'minimal'
  showTimeline?: boolean
  showPrinciples?: boolean
  showQuality?: boolean
}

export function ProcessMethodologySection({ 
  variant = 'full', 
  showTimeline = true, 
  showPrinciples = true, 
  showQuality = true 
}: ProcessMethodologySectionProps) {
  const totalWeeks = timelinePhases.reduce((sum, phase) => sum + phase.weeks, 0)

  return (
    <section className="py-16 lg:py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900"></div>
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Badge className="gradient-electric text-white border-0 mb-4">
            <Target className="w-4 h-4 mr-2" />
            Our Proven Process
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-6">
            From Concept to Launch
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Our systematic approach ensures successful project delivery every time. 
            Here's how we transform your ideas into exceptional digital solutions.
          </p>
        </motion.div>

        {/* Timeline Overview */}
        {showTimeline && variant !== 'minimal' && (
          <div className="mb-16 lg:mb-20">
            <motion.h3 
              className="text-2xl sm:text-3xl font-bold text-white text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Typical Project Timeline ({totalWeeks} weeks)
            </motion.h3>
            
            <ResponsiveCard variant="glass" size="full" className="p-6 lg:p-8">
              <div className="space-y-4">
                {timelinePhases.map((phase, index) => {
                  const widthPercentage = (phase.weeks / totalWeeks) * 100
                  return (
                    <motion.div
                      key={phase.name}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                      className="flex items-center space-x-4"
                    >
                      <div className="w-24 text-sm font-medium text-white text-right">
                        {phase.name}
                      </div>
                      <div className="flex-1 bg-gray-700 rounded-full h-6 relative overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${widthPercentage}%` }}
                          transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                          className={`h-full ${phase.color} rounded-full flex items-center justify-end pr-2`}
                        >
                          <span className="text-white text-xs font-medium">
                            {phase.weeks}w
                          </span>
                        </motion.div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </ResponsiveCard>
          </div>
        )}

        {/* Process Steps */}
        <div className="mb-16 lg:mb-20">
          <motion.h3 
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-center mb-8 lg:mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Our Development Process
          </motion.h3>
          
          <div className="space-y-8 lg:space-y-12">
            {processSteps.map((step, index) => {
              const Icon = step.icon
              const isEven = index % 2 === 0
              
              return (
                <motion.div
                  key={step.phase}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
                  className={`flex flex-col lg:flex-row items-center gap-8 ${!isEven ? 'lg:flex-row-reverse' : ''}`}
                >
                  {/* Phase Number */}
                  <div className="flex-shrink-0">
                    <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center text-white font-bold text-xl sm:text-2xl shadow-2xl`}>
                      {step.phase}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 w-full">
                    <ResponsiveCard
                      variant="glass"
                      size="full"
                      hover={true}
                      className="group"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-6">
                        {/* Main Content */}
                        <div className="flex-1 mb-6 lg:mb-0">
                          <div className="flex items-center space-x-4 mb-4">
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                              <Icon className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h4 className="text-xl sm:text-2xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300">
                                {step.title}
                              </h4>
                              <Badge variant="outline" className="border-purple-400/50 text-purple-400 bg-purple-400/10 text-xs mt-1">
                                {step.duration}
                              </Badge>
                            </div>
                          </div>
                          
                          <p className="text-gray-300 leading-relaxed mb-4 group-hover:text-gray-200 transition-colors duration-300">
                            {step.description}
                          </p>
                        </div>
                        
                        {/* Deliverables */}
                        {variant === 'full' && (
                          <div className="lg:w-80">
                            <h5 className="font-semibold text-white mb-3">Key Deliverables:</h5>
                            <div className="grid grid-cols-1 gap-2">
                              {step.deliverables.map((deliverable, i) => (
                                <div key={deliverable} className="flex items-center space-x-2">
                                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                                  <span className="text-sm text-gray-300">{deliverable}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </ResponsiveCard>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Methodology Principles */}
        {showPrinciples && variant !== 'minimal' && (
          <div className="mb-16 lg:mb-20">
            <motion.h3 
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-center mb-8 lg:mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Our Core Principles
            </motion.h3>
            
            <ResponsiveCardGrid columns={3} gap="lg">
              {principles.map((principle, index) => {
                const Icon = principle.icon
                return (
                  <ResponsiveCard
                    key={principle.title}
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
                    
                    <h4 className="text-lg font-bold text-white mb-3 group-hover:text-purple-300 transition-colors duration-300">
                      {principle.title}
                    </h4>
                    
                    <p className="text-sm text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                      {principle.description}
                    </p>
                  </ResponsiveCard>
                )
              })}
            </ResponsiveCardGrid>
          </div>
        )}

        {/* Quality Standards */}
        {showQuality && variant === 'full' && (
          <div className="mb-16 lg:mb-20">
            <motion.h3 
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-center mb-8 lg:mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              Quality Standards
            </motion.h3>
            
            <ResponsiveCardGrid columns={4} gap="md">
              {qualityStandards.map((standard, index) => {
                const Icon = standard.icon
                return (
                  <ResponsiveCard
                    key={standard.standard}
                    variant="gradient"
                    size="md"
                    hover={true}
                    animation={true}
                    index={index}
                    className="text-center group"
                  >
                    <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    
                    <div className="text-2xl font-bold text-white mb-2 group-hover:text-green-300 transition-colors duration-300">
                      {standard.metric}
                    </div>
                    
                    <h4 className="font-semibold text-white mb-2">
                      {standard.standard}
                    </h4>
                    
                    <p className="text-xs text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                      {standard.description}
                    </p>
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
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Ready to Start Your Project?
            </h3>
            <p className="text-lg text-gray-200 mb-6 max-w-2xl mx-auto">
              Let's discuss your requirements and create a custom development plan 
              that fits your timeline and budget.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button className="gradient-electric hover:shadow-2xl hover:shadow-purple-500/30 text-white px-8 py-3 rounded-xl font-semibold group/btn">
                <span>Start Your Project</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
              </Button>
              
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 backdrop-blur-xl px-8 py-3 rounded-xl font-semibold group/btn">
                <Play className="w-5 h-5 mr-2" />
                <span>Watch Process Video</span>
              </Button>
            </div>
          </ResponsiveCard>
        </motion.div>
      </div>
    </section>
  )
}