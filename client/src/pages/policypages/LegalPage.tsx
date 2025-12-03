'use client'

import { motion } from 'framer-motion'
import { ScrollReveal, StaggeredReveal } from '../../components/animations/ScrollReveal'
import { HoverLift } from '../../components/animations/MicroInteractions'
import { 
  Shield, 
  FileText, 
  Cookie, 
  Newspaper, 
  CheckCircle, 
  DollarSign,
  ArrowRight,
  Scale,
  Lock
} from 'lucide-react'

interface PolicyCard {
  title: string
  description: string
  icon: React.ReactNode
  path: string
  color: string
}

export function LegalPage() {
  const policies: PolicyCard[] = [
    {
      title: "Privacy Policy",
      description: "Learn how we collect, use, and protect your personal information with industry-leading security practices.",
      icon: <Shield className="w-8 h-8" />,
      path: "/privacy-policy",
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Terms of Service",
      description: "Our terms and conditions for using CodeFlow's services, projects, and digital solutions.",
      icon: <FileText className="w-8 h-8" />,
      path: "/terms-of-service",
      color: "from-cyan-500 to-blue-500"
    },
    {
      title: "Cookie Policy",
      description: "Understand how we use cookies and tracking technologies to enhance your experience.",
      icon: <Cookie className="w-8 h-8" />,
      path: "/cookie-policy",
      color: "from-pink-500 to-rose-500"
    },
    {
      title: "Content Policy",
      description: "Guidelines for content creation, submission, and acceptable use on CodeFlow platforms.",
      icon: <Newspaper className="w-8 h-8" />,
      path: "/content-policy",
      color: "from-violet-500 to-purple-500"
    },
    {
      title: "Acceptable Use Policy",
      description: "Rules and guidelines for using our services responsibly and ethically.",
      icon: <CheckCircle className="w-8 h-8" />,
      path: "/acceptable-use-policy",
      color: "from-emerald-500 to-teal-500"
    },
    {
      title: "Refund & Cancellation Policy",
      description: "Our policies regarding refunds, cancellations, and project modifications.",
      icon: <DollarSign className="w-8 h-8" />,
      path: "/refund-policy",
      color: "from-amber-500 to-orange-500"
    }
  ]

  return (
    <div className="legal-hub-page min-h-screen">
      {/* Header Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-purple-950/20 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(139,92,246,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(6,182,212,0.15),transparent_50%)]" />
        
        {/* Animated background particles */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-float" />
        <div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-float" 
          style={{ animationDelay: '2s' }}
        />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <ScrollReveal variant="fadeUp" delay={0.2}>
              <div className="inline-flex items-center space-x-3 glass rounded-full px-6 py-3 mb-8 border border-white/20">
                <Scale className="w-5 h-5 text-purple-400" />
                <span className="font-medium text-gray-200">Legal Center</span>
              </div>
            </ScrollReveal>
            
            <ScrollReveal variant="fadeUp" delay={0.4}>
              <h1 className="font-outfit text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Legal & 
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  Compliance Hub
                </span>
              </h1>
            </ScrollReveal>
            
            <ScrollReveal variant="fadeUp" delay={0.6}>
              <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto mb-8">
                Transparency and trust are fundamental to our business. Explore our comprehensive 
                legal policies and guidelines to understand how we protect your rights and data.
              </p>
            </ScrollReveal>

            <ScrollReveal variant="fadeUp" delay={0.8}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <div className="flex items-center space-x-2 text-gray-400">
                  <Lock className="w-5 h-5 text-purple-400" />
                  <span>Last Updated: December 2, 2024</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Policy Cards Grid */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <StaggeredReveal staggerDelay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {policies.map((policy, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <a href={`#${policy.path}`}>
                    <HoverLift>
                      <div className="glass rounded-2xl p-8 border border-white/10 hover:border-purple-500/30 transition-all duration-300 h-full group relative overflow-hidden">
                        {/* Background Gradient on Hover */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${policy.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                        
                        {/* Icon */}
                        <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${policy.color} bg-opacity-20 flex items-center justify-center mb-6 relative z-10`}>
                          <div className="text-white">
                            {policy.icon}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="relative z-10">
                          <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-purple-400 group-hover:to-cyan-400 transition-all">
                            {policy.title}
                          </h3>
                          <p className="text-gray-300 leading-relaxed mb-6">
                            {policy.description}
                          </p>
                          
                          {/* Read More Link */}
                          <div className="flex items-center space-x-2 text-purple-400 group-hover:text-cyan-400 transition-colors">
                            <span className="font-medium">Read Full Policy</span>
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                          </div>
                        </div>
                      </div>
                    </HoverLift>
                  </a>
                </motion.div>
              ))}
            </div>
          </StaggeredReveal>
        </div>
      </section>

      {/* Quick Facts Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal variant="fadeUp">
            <div className="glass rounded-2xl p-10 lg:p-16 border border-white/10 relative overflow-hidden">
              {/* Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-cyan-500/10" />
              
              <div className="relative z-10">
                <div className="text-center mb-12">
                  <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                    <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      Our Commitment to You
                    </span>
                  </h2>
                  <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                    At CodeFlow, we believe in transparency, security, and putting our clients first.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {[
                    {
                      icon: <Shield className="w-8 h-8" />,
                      title: "Data Protection",
                      description: "Industry-leading security measures to protect your information"
                    },
                    {
                      icon: <Lock className="w-8 h-8" />,
                      title: "Privacy First",
                      description: "We never sell your data to third parties"
                    },
                    {
                      icon: <Scale className="w-8 h-8" />,
                      title: "Fair Policies",
                      description: "Clear, straightforward terms with no hidden clauses"
                    },
                    {
                      icon: <CheckCircle className="w-8 h-8" />,
                      title: "Compliance",
                      description: "Fully compliant with GDPR, CCPA, and industry standards"
                    }
                  ].map((item, index) => (
                    <div key={index} className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center text-purple-400">
                        {item.icon}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-gray-400">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-12 relative">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <ScrollReveal variant="fadeUp">
            <div className="glass rounded-2xl p-10 lg:p-12 border border-white/10 text-center relative overflow-hidden">
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-cyan-500/10" />
              
              <div className="relative z-10">
                <Scale className="w-12 h-12 text-purple-400 mx-auto mb-6" />
                <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Have Questions About Our Policies?
                  </span>
                </h2>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  Our legal team is here to help. Reach out if you need clarification or have concerns about any of our policies.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="#/contact"
                    className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/50"
                  >
                    Contact Us
                  </a>
                  <a 
                    href="mailto:kodegrove@gmail.com"
                    className="px-8 py-4 glass border border-white/20 hover:border-purple-500/50 text-white rounded-lg transition-all duration-300 hover:bg-white/5"
                  >
                    Email Legal Team
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
