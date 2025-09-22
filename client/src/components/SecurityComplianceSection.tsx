'use client'

import { motion } from 'framer-motion'
import { ResponsiveCard, ResponsiveCardGrid } from './ui/responsive-card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { 
  Shield,
  Lock,
  Key,
  Database,
  Server,
  Eye,
  AlertTriangle,
  CheckCircle,
  FileCheck,
  Globe,
  Users,
  Clock,
  Download,
  ExternalLink,
  Zap,
  Star
} from 'lucide-react'

// Security measures
const securityMeasures = [
  {
    icon: Lock,
    title: 'End-to-End Encryption',
    description: 'All data is encrypted in transit and at rest using AES-256 encryption',
    level: 'Military Grade',
    gradient: 'from-red-500 to-pink-500'
  },
  {
    icon: Key,
    title: 'Multi-Factor Authentication',
    description: 'Advanced authentication systems including biometric and token-based security',
    level: 'Enterprise',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Database,
    title: 'Secure Data Storage',
    description: 'Encrypted databases with regular backups and disaster recovery protocols',
    level: 'Bank Grade',
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    icon: Server,
    title: 'Infrastructure Security',
    description: 'Hardened servers with intrusion detection and prevention systems',
    level: 'Enterprise',
    gradient: 'from-purple-500 to-indigo-500'
  },
  {
    icon: Eye,
    title: '24/7 Monitoring',
    description: 'Continuous security monitoring with real-time threat detection',
    level: 'Always On',
    gradient: 'from-orange-500 to-red-500'
  },
  {
    icon: AlertTriangle,
    title: 'Incident Response',
    description: 'Rapid response team for security incidents with < 15 minute response time',
    level: 'Rapid Response',
    gradient: 'from-yellow-500 to-orange-500'
  }
]

// Compliance certifications
const certifications = [
  {
    name: 'SOC 2 Type II',
    description: 'Security, Availability, Processing Integrity, Confidentiality, and Privacy',
    icon: Shield,
    status: 'Certified',
    validUntil: '2025',
    badge: 'security'
  },
  {
    name: 'ISO 27001',
    description: 'International standard for information security management systems',
    icon: FileCheck,
    status: 'Certified',
    validUntil: '2025',
    badge: 'security'
  },
  {
    name: 'GDPR Compliant',
    description: 'European Union General Data Protection Regulation compliance',
    icon: Globe,
    status: 'Compliant',
    validUntil: 'Ongoing',
    badge: 'privacy'
  },
  {
    name: 'HIPAA Ready',
    description: 'Health Insurance Portability and Accountability Act compliance',
    icon: Users,
    status: 'Ready',
    validUntil: 'Ongoing',
    badge: 'healthcare'
  },
  {
    name: 'PCI DSS',
    description: 'Payment Card Industry Data Security Standard compliance',
    icon: Key,
    status: 'Level 1',
    validUntil: '2025',
    badge: 'payment'
  },
  {
    name: 'CCPA Compliant',
    description: 'California Consumer Privacy Act compliance',
    icon: Eye,
    status: 'Compliant',
    validUntil: 'Ongoing',
    badge: 'privacy'
  }
]

// Security features
const securityFeatures = [
  {
    category: 'Data Protection',
    features: [
      'AES-256 encryption for data at rest',
      'TLS 1.3 encryption for data in transit',
      'Encrypted database connections',
      'Secure key management system',
      'Regular data purging protocols'
    ]
  },
  {
    category: 'Access Control',
    features: [
      'Role-based access control (RBAC)',
      'Multi-factor authentication (MFA)',
      'Single sign-on (SSO) integration',
      'Session management and timeout',
      'API rate limiting and throttling'
    ]
  },
  {
    category: 'Infrastructure',
    features: [
      'Hardened server configurations',
      'Network segmentation and firewalls',
      'Intrusion detection systems (IDS)',
      'DDoS protection and mitigation',
      'Regular security patches and updates'
    ]
  },
  {
    category: 'Monitoring & Auditing',
    features: [
      'Real-time security monitoring',
      'Comprehensive audit logging',
      'Automated threat detection',
      'Regular security assessments',
      'Incident response procedures'
    ]
  }
]

// Security statistics
const securityStats = [
  {
    metric: '99.99%',
    label: 'Uptime SLA',
    description: 'Guaranteed availability with redundant systems',
    icon: Clock
  },
  {
    metric: '< 15min',
    label: 'Incident Response',
    description: 'Average response time to security incidents',
    icon: Zap
  },
  {
    metric: '0',
    label: 'Data Breaches',
    description: 'Zero security breaches in our company history',
    icon: Shield
  },
  {
    metric: '256-bit',
    label: 'Encryption Standard',
    description: 'Military-grade encryption for all data',
    icon: Lock
  }
]

// Audit reports and documents
const auditDocs = [
  {
    title: 'SOC 2 Type II Report',
    description: 'Independent third-party security audit report',
    type: 'PDF',
    size: '2.1 MB',
    lastUpdated: 'Dec 2024'
  },
  {
    title: 'Security Whitepaper',
    description: 'Comprehensive overview of our security practices',
    type: 'PDF',
    size: '1.8 MB',
    lastUpdated: 'Nov 2024'
  },
  {
    title: 'Compliance Matrix',
    description: 'Detailed compliance mapping and controls',
    type: 'PDF',
    size: '980 KB',
    lastUpdated: 'Dec 2024'
  },
  {
    title: 'Penetration Test Results',
    description: 'Latest security penetration testing report',
    type: 'PDF',
    size: '1.2 MB',
    lastUpdated: 'Oct 2024'
  }
]

interface SecurityComplianceSectionProps {
  variant?: 'full' | 'compact' | 'minimal'
  showCertifications?: boolean
  showFeatures?: boolean
  showDocuments?: boolean
}

export function SecurityComplianceSection({ 
  variant = 'full', 
  showCertifications = true, 
  showFeatures = true, 
  showDocuments = true 
}: SecurityComplianceSectionProps) {
  return (
    <section className="py-16 lg:py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-red-900/20 to-slate-900"></div>
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white border-0 mb-4">
            <Shield className="w-4 h-4 mr-2" />
            Enterprise Security
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-6">
            Bank-Level Security & Compliance
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Your data security is our top priority. We implement industry-leading security measures 
            and maintain compliance with the highest standards to protect your business.
          </p>
        </motion.div>

        {/* Security Statistics */}
        <ResponsiveCardGrid columns={4} gap="md" className="mb-16 lg:mb-20">
          {securityStats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <ResponsiveCard
                key={stat.label}
                variant="glass"
                size="sm"
                hover={true}
                animation={true}
                index={index}
                className="text-center group"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-xl bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1 group-hover:text-red-300 transition-colors duration-300">
                  {stat.metric}
                </div>
                <div className="font-semibold text-gray-200 mb-1 text-sm sm:text-base">
                  {stat.label}
                </div>
                <div className="text-xs sm:text-sm text-gray-400">
                  {stat.description}
                </div>
              </ResponsiveCard>
            )
          })}
        </ResponsiveCardGrid>

        {/* Security Measures */}
        <div className="mb-16 lg:mb-20">
          <motion.h3 
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-center mb-8 lg:mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Multi-Layered Security
          </motion.h3>
          
          <ResponsiveCardGrid columns={3} gap="lg">
            {securityMeasures.map((measure, index) => {
              const Icon = measure.icon
              return (
                <ResponsiveCard
                  key={measure.title}
                  variant="glass"
                  size="lg"
                  hover={true}
                  animation={true}
                  index={index}
                  className="group"
                >
                  <div className="relative">
                    <div className={`w-16 h-16 mb-4 rounded-2xl bg-gradient-to-br ${measure.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 text-xs">
                      {measure.level}
                    </Badge>
                  </div>
                  
                  <h4 className="text-lg sm:text-xl font-bold text-white mb-3 group-hover:text-red-300 transition-colors duration-300">
                    {measure.title}
                  </h4>
                  
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                    {measure.description}
                  </p>
                </ResponsiveCard>
              )
            })}
          </ResponsiveCardGrid>
        </div>

        {/* Compliance Certifications */}
        {showCertifications && variant !== 'minimal' && (
          <div className="mb-16 lg:mb-20">
            <motion.h3 
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-center mb-8 lg:mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Compliance & Certifications
            </motion.h3>
            
            <ResponsiveCardGrid columns={3} gap="lg">
              {certifications.map((cert, index) => {
                const Icon = cert.icon
                const getBadgeColor = (badge: string) => {
                  switch (badge) {
                    case 'security': return 'from-red-500 to-pink-500'
                    case 'privacy': return 'from-blue-500 to-cyan-500'
                    case 'healthcare': return 'from-green-500 to-emerald-500'
                    case 'payment': return 'from-purple-500 to-indigo-500'
                    default: return 'from-gray-500 to-gray-600'
                  }
                }
                
                return (
                  <ResponsiveCard
                    key={cert.name}
                    variant="glass"
                    size="lg"
                    hover={true}
                    animation={true}
                    index={index}
                    className="group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getBadgeColor(cert.badge)} flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-right">
                        <Badge className={`bg-gradient-to-r ${getBadgeColor(cert.badge)} text-white border-0 text-xs mb-1`}>
                          {cert.status}
                        </Badge>
                        <div className="text-xs text-gray-400">
                          Valid: {cert.validUntil}
                        </div>
                      </div>
                    </div>
                    
                    <h4 className="text-lg font-bold text-white mb-2 group-hover:text-red-300 transition-colors duration-300">
                      {cert.name}
                    </h4>
                    
                    <p className="text-sm text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                      {cert.description}
                    </p>
                  </ResponsiveCard>
                )
              })}
            </ResponsiveCardGrid>
          </div>
        )}

        {/* Security Features */}
        {showFeatures && variant === 'full' && (
          <div className="mb-16 lg:mb-20">
            <motion.h3 
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-center mb-8 lg:mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Comprehensive Security Features
            </motion.h3>
            
            <ResponsiveCardGrid columns={2} gap="lg">
              {securityFeatures.map((category, index) => (
                <ResponsiveCard
                  key={category.category}
                  variant="glass"
                  size="lg"
                  hover={true}
                  animation={true}
                  index={index}
                  className="group"
                >
                  <h4 className="text-xl font-bold text-white mb-4 group-hover:text-red-300 transition-colors duration-300 flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                    {category.category}
                  </h4>
                  
                  <div className="space-y-3">
                    {category.features.map((feature, i) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 1.0 + i * 0.1 }}
                        className="flex items-start space-x-3"
                      >
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-300 leading-relaxed">
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </ResponsiveCard>
              ))}
            </ResponsiveCardGrid>
          </div>
        )}

        {/* Audit Documents */}
        {showDocuments && variant === 'full' && (
          <div className="mb-16 lg:mb-20">
            <motion.h3 
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-center mb-8 lg:mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              Audit Reports & Documentation
            </motion.h3>
            
            <ResponsiveCardGrid columns={4} gap="md">
              {auditDocs.map((doc, index) => (
                <ResponsiveCard
                  key={doc.title}
                  variant="glass"
                  size="md"
                  hover={true}
                  animation={true}
                  index={index}
                  className="group cursor-pointer"
                >
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <Download className="w-6 h-6 text-white" />
                    </div>
                    
                    <h4 className="font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300 text-sm">
                      {doc.title}
                    </h4>
                    
                    <p className="text-xs text-gray-400 mb-3 leading-relaxed">
                      {doc.description}
                    </p>
                    
                    <div className="space-y-1 text-xs text-gray-500">
                      <div>Type: {doc.type} • Size: {doc.size}</div>
                      <div>Updated: {doc.lastUpdated}</div>
                    </div>
                    
                    <div className="mt-3 flex items-center justify-center text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
                      <span className="text-xs font-medium mr-1">Download</span>
                      <ExternalLink className="w-3 h-3" />
                    </div>
                  </div>
                </ResponsiveCard>
              ))}
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
              <Shield className="w-8 h-8 text-white mr-3" />
              <Star className="w-6 h-6 text-yellow-400 mr-1" />
              <Star className="w-6 h-6 text-yellow-400 mr-1" />
              <Star className="w-6 h-6 text-yellow-400 mr-1" />
              <Star className="w-6 h-6 text-yellow-400 mr-1" />
              <Star className="w-6 h-6 text-yellow-400" />
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Enterprise-Grade Security for Your Business
            </h3>
            
            <p className="text-lg text-gray-200 mb-6 max-w-2xl mx-auto">
              Ready to secure your digital assets with our proven security framework? 
              Contact our security team for a custom security assessment.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button className="bg-gradient-to-r from-red-500 to-pink-500 hover:shadow-2xl hover:shadow-red-500/30 text-white px-8 py-3 rounded-xl font-semibold group/btn">
                <Shield className="w-5 h-5 mr-2" />
                <span>Get Security Assessment</span>
              </Button>
              
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 backdrop-blur-xl px-8 py-3 rounded-xl font-semibold group/btn">
                <Download className="w-5 h-5 mr-2" />
                <span>Download Security Guide</span>
              </Button>
            </div>
          </ResponsiveCard>
        </motion.div>
      </div>
    </section>
  )
}