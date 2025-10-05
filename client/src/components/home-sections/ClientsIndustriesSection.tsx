'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Building2,
  Briefcase,
  Globe,
  TrendingUp,
  Users,
  Award,
  Star,
  ArrowUpRight,
} from 'lucide-react';

const standardGradient = 'from-blue-500 to-purple-600';

const industries = [
  {
    icon: Building2,
    name: 'FinTech & Banking',
    description: 'Secure financial platforms and digital banking solutions',
    clientCount: '50+',
    gradient: standardGradient,
    projects: ['Mobile Banking Apps', 'Trading Platforms', 'Payment Systems'],
    growth: '+340%',
  },
  {
    icon: Briefcase,
    name: 'Enterprise SaaS',
    description: 'Scalable business software and enterprise solutions',
    clientCount: '75+',
    gradient: standardGradient,
    projects: ['CRM Systems', 'Project Management', 'Analytics Dashboards'],
    growth: '+280%',
  },
  {
    icon: Globe,
    name: 'E-commerce & Retail',
    description: 'Conversion-optimized online stores and marketplaces',
    clientCount: '120+',
    gradient: standardGradient,
    projects: ['Online Stores', 'Marketplaces', 'Mobile Commerce'],
    growth: '+450%',
  },
  {
    icon: TrendingUp,
    name: 'Healthcare & MedTech',
    description: 'HIPAA-compliant medical and healthcare applications',
    clientCount: '35+',
    gradient: standardGradient,
    projects: ['Telemedicine Apps', 'Patient Portals', 'Medical Devices'],
    growth: '+220%',
  },
  {
    icon: Users,
    name: 'Education & EdTech',
    description: 'Learning management systems and educational platforms',
    clientCount: '45+',
    gradient: standardGradient,
    projects: ['LMS Platforms', 'Online Courses', 'Student Portals'],
    growth: '+360%',
  },
  {
    icon: Award,
    name: 'Startups & Innovation',
    description: 'MVP development and scalable startup solutions',
    clientCount: '200+',
    gradient: standardGradient,
    projects: ['MVP Development', 'Prototyping', 'Scale Solutions'],
    growth: '+500%',
  },
];

const clientLogos = [
  'TechCorp',
  'InnovateLab',
  'FutureBank',
  'MedFlow',
  'EduPlatform',
  'RetailPro',
  'StartupHub',
  'CloudTech',
  'DataDrive',
  'AppForge',
  'WebCraft',
  'CodeLab',
];

const successMetrics = [
  { metric: '500+', label: 'Global Clients', icon: Globe },
  { metric: '50+', label: 'Industries Served', icon: Building2 },
  { metric: '98%', label: 'Client Retention', icon: Star },
  { metric: '$2M+', label: 'Revenue Generated', icon: TrendingUp },
];

export default function ClientsIndustriesSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/10 to-slate-900"></div>
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-float"></div>
      <div
        className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float"
        style={{ animationDelay: '3s' }}
      ></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.25, 0, 1] }}
        >
          <motion.div
            className="inline-flex items-center space-x-3 glass rounded-full px-6 py-3 mb-8 border border-white/20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Globe className="w-5 h-5 text-cyan-400" />
            <span className="font-medium text-gray-200">Trusted Worldwide</span>
          </motion.div>

          <h2 className="font-outfit text-4xl lg:text-6xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Transforming Industries
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Across the Globe
            </span>
          </h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            From Fortune 500 companies to innovative startups, we've delivered game-changing digital
            solutions across diverse industries, driving measurable growth and success.
          </p>
        </motion.div>

        {/* Success Metrics */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {successMetrics.map((item, index) => (
            <motion.div
              key={item.label}
              className="text-center group"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="glass rounded-xl p-6 border border-white/10 hover:border-cyan-400/30 transition-all duration-300">
                <item.icon className="w-8 h-8 text-cyan-400 mx-auto mb-4 group-hover:text-purple-400 transition-colors duration-300" />
                <div className="text-3xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors duration-300">
                  {item.metric}
                </div>
                <div className="text-gray-300 text-sm">{item.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Industries Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
        >
          {industries.map((industry, index) => (
            <motion.div
              key={industry.name}
              className="group relative"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1 + index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <div className="glass rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 h-full">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-r ${industry.gradient} p-3 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <industry.icon className="w-full h-full text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-cyan-400">{industry.clientCount}</div>
                    <div className="text-xs text-gray-400">Clients</div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors duration-300">
                  {industry.name}
                </h3>

                <p className="text-gray-300 mb-6 text-sm leading-relaxed">{industry.description}</p>

                {/* Growth Metric */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-gray-400 text-sm">Avg. Growth:</span>
                  <span className="font-bold text-green-400">{industry.growth}</span>
                </div>

                {/* Project Types */}
                <div className="space-y-2 mb-6">
                  {industry.projects.map((project, projectIndex) => (
                    <motion.div
                      key={project}
                      className="flex items-center space-x-2 text-xs text-gray-400"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: 1.4 + index * 0.1 + projectIndex * 0.1 }}
                    >
                      <div className="w-1 h-1 rounded-full bg-cyan-400"></div>
                      <span>{project}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  className="flex items-center justify-between text-purple-400 font-medium group-hover:text-cyan-400 transition-colors duration-300"
                  whileHover={{ x: 5 }}
                >
                  <span className="text-sm">View Case Studies</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Client Logos Marquee */}
        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.6 }}
        >
          <div className="text-center mb-12">
            <h3 className="font-outfit text-2xl font-bold text-white mb-4">
              Trusted by Industry Leaders
            </h3>
            <p className="text-gray-300">
              Join hundreds of companies that have transformed their digital presence with us
            </p>
          </div>

          <div className="marquee-container relative overflow-hidden">
            <div className="animate-marquee flex space-x-12" style={{ animationDuration: '30s' }}>
              {[...clientLogos, ...clientLogos, ...clientLogos].map((logo, index) => (
                <div
                  key={`${logo}-${index}`}
                  className="flex-shrink-0 glass rounded-lg px-8 py-4 border border-white/10 hover:border-purple-400/30 transition-all duration-300"
                >
                  <div className="text-lg font-bold text-gray-300 whitespace-nowrap">{logo}</div>
                </div>
              ))}
            </div>

            {/* Gradient overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-950 to-transparent pointer-events-none z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-950 to-transparent pointer-events-none z-10" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
