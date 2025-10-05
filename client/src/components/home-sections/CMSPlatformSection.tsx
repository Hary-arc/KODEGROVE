'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Database,
  Settings,
  Shield,
  Zap,
  Globe,
  Users,
  BarChart3,
  Smartphone,
  Cloud,
  Lock,
  ArrowRight,
  Check,
  Sparkles,
} from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

const cmsFeatures = [
  {
    icon: Settings,
    image: 'https://images.unsplash.com/photo-1698210806453-5ec74b8e08be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbXMlMjBjb250ZW50JTIwbWFuYWdlbWVudCUyMHBsYXRmb3JtfGVufDF8fHx8MTc1NzM2OTg2Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    title: 'Intuitive Management',
    description: 'User-friendly interface that makes content management effortless',
    details: ['Drag & Drop Builder', 'WYSIWYG Editor', 'Media Library', 'Version Control'],
    gradient: 'from-cyan-500 to-emerald-600',
  },
  {
    icon: Shield,
    image: 'https://tse1.mm.bing.net/th/id/OIP.nGYbtELOSknTB3bWmbLdggHaE7?cb=12&w=626&h=417&rs=1&pid=ImgDetMain&o=7&rm=3',
    title: 'Enterprise Security',
    description: 'Bank-level security with advanced user permissions and data protection',
    details: ['Role-based Access', 'SSL Encryption', 'Backup Systems', 'Audit Logs'],
    gradient: 'from-cyan-500 to-emerald-600',
  },
  {
    icon: Zap,
    image: 'https://assets.mycast.io/posters/the-flash-fan-casting-poster-288994-medium.jpg?1676325099',
    title: 'Lightning Performance',
    description: 'Optimized for speed with CDN integration and caching strategies',
    details: ['Global CDN', 'Smart Caching', 'Image Optimization', 'Lazy Loading'],
    gradient: 'from-cyan-500 to-emerald-600',
  },
  {
    icon: Smartphone,
    image: 'https://www.convergine.com/images/_1015x450_crop_center-center_none/what-is-mobile-first-design-and-why-is-it-foundation-of-modern-web.png',
    title: 'Mobile-First Design',
    description: 'Responsive admin panel that works perfectly on all devices',
    details: ['Touch Optimized', 'Native Apps', 'Offline Mode', 'Push Notifications'],
    gradient: 'from-cyan-500 to-emerald-600',
  },
];

const platformBenefits = [
  {
    icon: Globe,
    title: 'Multi-Site Management',
    description: 'Manage multiple websites from a single dashboard',
    metric: '10x Faster',
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Advanced workflow and collaboration tools for teams',
    metric: '95% Efficiency',
  },
  {
    icon: BarChart3,
    title: 'Analytics Integration',
    description: 'Built-in analytics and performance monitoring',
    metric: '100% Insights',
  },
  {
    icon: Cloud,
    title: 'Cloud-Native',
    description: 'Scalable cloud infrastructure with automatic updates',
    metric: '99.9% Uptime',
  },
];

const cmsPlatforms = [
  { name: 'WordPress', expertise: '95%', projects: '200+' },
  { name: 'Strapi', expertise: '90%', projects: '150+' },
  { name: 'Contentful', expertise: '88%', projects: '120+' },
  { name: 'Sanity', expertise: '85%', projects: '100+' },
  { name: 'Drupal', expertise: '82%', projects: '80+' },
  { name: 'Custom CMS', expertise: '98%', projects: '300+' },
];

export default function CMSPlatformSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900"></div>
      <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
      <div
        className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-float"
        style={{ animationDelay: '2s' }}
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
            <Database className="w-5 h-5 text-blue-400" />
            <span className="font-medium text-gray-200">Platform Excellence</span>
          </motion.div>

          <h2 className="font-outfit text-4xl lg:text-6xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Next-Generation
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
              CMS Platforms
            </span>
          </h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Powerful, scalable content management systems that empower your team to create, manage,
            and optimize digital experiences with unprecedented ease and efficiency.
          </p>
        </motion.div>

        {/* Interactive Feature Showcase */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
        >
          {/* Feature List */}
          <div className="space-y-4">
            {cmsFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                className={`cursor-pointer transition-all duration-500 ${
                  activeFeature === index ? 'scale-105' : 'hover:scale-102'
                }`}
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
                onClick={() => setActiveFeature(index)}
                whileHover={{ x: 10 }}
              >
                <div
                  className={`glass rounded-2xl p-6 border transition-all duration-500 ${
                    activeFeature === index
                      ? 'border-cyan-400/50 bg-cyan-500/10'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.gradient} p-3 transition-transform duration-300 ${
                        activeFeature === index ? 'scale-110' : ''
                      }`}
                    >
                      <feature.icon className="w-full h-full text-white" />
                    </div>
                    <div className="flex-1">
                      <h3
                        className={`text-lg font-bold mb-2 transition-colors duration-300 ${
                          activeFeature === index ? 'text-cyan-300' : 'text-white'
                        }`}
                      >
                        {feature.title}
                      </h3>
                      <p className="text-gray-300 text-sm mb-3">{feature.description}</p>
                      <AnimatePresence>
                        {activeFeature === index && (
                          <motion.div
                            className="space-y-2"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            {feature.details.map((detail, detailIndex) => (
                              <motion.div
                                key={detail}
                                className="flex items-center space-x-2 text-xs text-cyan-300"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: detailIndex * 0.1 }}
                              >
                                <Check className="w-3 h-3" />
                                <span>{detail}</span>
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <ArrowRight
                      className={`w-5 h-5 transition-all duration-300 ${
                        activeFeature === index ? 'text-cyan-400 translate-x-1' : 'text-gray-400'
                      }`}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Feature Visualization */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="glass rounded-2xl p-8 border border-white/10 h-full">
              <div className="relative aspect-square rounded-xl overflow-hidden mb-6">
                <ImageWithFallback
                  src={cmsFeatures[activeFeature].image}
                  alt="CMS Platform Interface"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center space-x-2 text-white">
                    <Sparkles className="w-5 h-5 text-cyan-400" />
                    <span className="font-medium">{cmsFeatures[activeFeature].title}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-xl font-bold text-white">{cmsFeatures[activeFeature].title}</h4>
                <p className="text-gray-300">{cmsFeatures[activeFeature].description}</p>
                <div className="flex items-center space-x-2 text-cyan-400">
                  <Lock className="w-4 h-4" />
                  <span className="text-sm font-medium">Enterprise Ready</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Platform Benefits Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          {platformBenefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              className="text-center group"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="glass rounded-xl p-6 border border-white/10 hover:border-blue-400/30 transition-all duration-300 h-full">
                <benefit.icon className="w-10 h-10 text-blue-400 mx-auto mb-4 group-hover:text-cyan-400 transition-colors duration-300" />
                <h3 className="font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">
                  {benefit.title}
                </h3>
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">{benefit.description}</p>
                <div className="text-2xl font-bold text-cyan-400 group-hover:text-blue-400 transition-colors duration-300">
                  {benefit.metric}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CMS Expertise */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          <h3 className="font-outfit text-3xl font-bold text-white mb-8">Platform Expertise</h3>
          <p className="text-gray-300 text-lg mb-12 max-w-2xl mx-auto">
            We master every major CMS platform and create custom solutions tailored to your needs
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {cmsPlatforms.map((platform, index) => (
              <motion.div
                key={platform.name}
                className="group"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.8 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="glass rounded-xl p-6 border border-white/10 hover:border-blue-400/30 transition-all duration-300">
                  <div className="text-lg font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">
                    {platform.name}
                  </div>
                  <div className="text-sm text-gray-400 mb-3">{platform.projects} Projects</div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                    <motion.div
                      className="bg-gradient-to-r from-blue-400 to-cyan-400 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={isInView ? { width: platform.expertise } : {}}
                      transition={{ duration: 1, delay: 2 + index * 0.1 }}
                    ></motion.div>
                  </div>
                  <div className="text-xs text-cyan-400 font-medium">
                    {platform.expertise} Expertise
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
