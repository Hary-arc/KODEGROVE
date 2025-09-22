'use client'

import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import { Card, CardContent } from './ui/card'
import { 
  Globe, 
  Smartphone, 
  ShoppingCart, 
  Database, 
  Palette, 
  Shield,
  Sparkles,
  TrendingUp,
  ArrowUpRight
} from 'lucide-react'
import { usePopupManager, PopupModal, getPopupComponent, getPopupTitle } from '../marketing'

export function ServicesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const { popup, openPopup, closePopup } = usePopupManager()

  const services = [
    {
      icon: Globe,
      title: 'Web Development',
      description: 'Hypnotic websites that captivate users and drive conversions with cutting-edge technology.',
      features: ['Next.js & React', 'Performance Optimized', 'SEO Mastery'],
      metrics: { value: '+150%', label: 'Engagement' },
      gradient: 'from-blue-500 to-cyan-500',
      delay: 0,
      popupType: 'web-development' as const
    },
    {
      icon: Smartphone,
      title: 'Mobile Apps',
      description: 'Native and cross-platform apps that mesmerize users with fluid animations.',
      features: ['iOS & Android', 'React Native', 'Premium UX'],
      metrics: { value: '4.9★', label: 'App Rating' },
      gradient: 'from-purple-500 to-pink-500',
      delay: 0.1,
      popupType: 'mobile-app' as const
    },
    {
      icon: ShoppingCart,
      title: 'E-Commerce',
      description: 'Luxury online stores that turn browsers into loyal customers.',
      features: ['Advanced Analytics', 'Payment Integration', 'AI Recommendations'],
      metrics: { value: '+200%', label: 'Sales Growth' },
      gradient: 'from-green-500 to-emerald-500',
      delay: 0.2,
      popupType: 'ecommerce' as const
    },
    {
      icon: Database,
      title: 'Backend Systems',
      description: 'Robust, scalable infrastructure that powers exceptional digital experiences.',
      features: ['Cloud Architecture', 'API Development', 'Real-time Data'],
      metrics: { value: '99.9%', label: 'Uptime' },
      gradient: 'from-orange-500 to-red-500',
      delay: 0.3,
      popupType: 'backend-systems' as const
    },
    {
      icon: Palette,
      title: 'UI/UX Design',
      description: 'Mesmerizing designs that create emotional connections with your audience.',
      features: ['User Psychology', 'Design Systems', 'Prototyping'],
      metrics: { value: '+85%', label: 'User Retention' },
      gradient: 'from-pink-500 to-rose-500',
      delay: 0.4,
      popupType: 'ui-ux-design' as const
    },
    {
      icon: Shield,
      title: 'Security & DevOps',
      description: 'Enterprise-grade security that protects your digital assets.',
      features: ['Penetration Testing', 'CI/CD Pipeline', 'Monitoring'],
      metrics: { value: '100%', label: 'Security Score' },
      gradient: 'from-indigo-500 to-purple-500',
      delay: 0.5,
      popupType: 'security-devops' as const
    }
  ]

  return (
    <section id="services" className="py-32 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(139,92,246,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(6,182,212,0.1),transparent_50%)]" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.25, 0.25, 0, 1] }}
        >
          <motion.div
            className="inline-flex items-center space-x-3 glass rounded-full px-6 py-3 mb-8 border border-white/20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <TrendingUp className="w-5 h-5 text-cyan-400" />
            <span className="font-medium text-gray-200">Premium Services</span>
          </motion.div>
          
          <h2 className="font-outfit text-5xl lg:text-6xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Services That
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Mesmerize
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We don't just build digital products—we craft hypnotic experiences that 
            captivate users and transform businesses into industry leaders.
          </p>
        </motion.div>

        {/* Services Grid with Enhanced Left-to-Right Animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, x: -100, scale: 0.8 }}
              animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
              transition={{ 
                duration: 1, 
                delay: service.delay,
                ease: [0.25, 0.25, 0, 1],
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                scale: 1.05, 
                x: 10,
                transition: { duration: 0.3 }
              }}
            >
              <Card className="group h-full glass border border-white/10 hover:border-white/30 transition-all duration-500 overflow-hidden relative magnetic">
                {/* Hover Effect Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                {/* Sliding Effect on Hover */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
                  whileHover={{ 
                    translateX: "200%",
                    transition: { duration: 0.8, ease: "easeInOut" }
                  }}
                />
                
                <CardContent className="p-8 relative z-10">
                  {/* Icon & Metric */}
                  <div className="flex items-start justify-between mb-6">
                    <motion.div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} p-3 relative overflow-hidden`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <service.icon className="w-full h-full text-white relative z-10" />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    </motion.div>
                    
                    <div className="text-right">
                      <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                        {service.metrics.value}
                      </div>
                      <div className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                        {service.metrics.label}
                      </div>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-outfit text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors duration-300">
                    {service.title}
                  </h3>

                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features with staggered left-to-right animation */}
                  <div className="space-y-3 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <motion.div
                        key={feature}
                        className="flex items-center space-x-3 text-sm text-gray-400 group/feature"
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ 
                          duration: 0.8, 
                          delay: service.delay + 0.3 + (featureIndex * 0.15),
                          ease: [0.25, 0.25, 0, 1]
                        }}
                        whileHover={{ x: 5, transition: { duration: 0.2 } }}
                      >
                        <motion.div 
                          className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.gradient}`}
                          whileHover={{ scale: 1.5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        />
                        <span className="group-hover/feature:text-gray-200 transition-colors duration-300">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Hover CTA */}
                  <motion.div
                    className="opacity-0 group-hover:opacity-100 transition-all duration-300"
                    initial={{ y: 20 }}
                    whileHover={{ y: 0 }}
                  >
                    <button 
                      onClick={() => openPopup(service.popupType)}
                      className="flex items-center space-x-2 text-cyan-400 font-medium hover:text-white transition-colors duration-300"
                    >
                      <span>Explore Service</span>
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                    </button>
                  </motion.div>
                </CardContent>

                {/* Magnetic Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className={`absolute inset-0 bg-gradient-to-r ${service.gradient} opacity-5`} />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom Stats */}
        <motion.div
          className="glass rounded-3xl border border-white/10 p-12 relative overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
        >
          {/* Background Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-cyan-500/5" />
          
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: '🚀', value: '24h', label: 'Response Time' },
              { icon: '📈', value: '300%', label: 'ROI Average' },
              { icon: '⭐', value: '500+', label: 'Happy Clients' },
              { icon: '🔒', value: '100%', label: 'Secure' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="group"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 1.0 + (index * 0.1) }}
              >
                <div className="text-4xl mb-4">{stat.icon}</div>
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-300 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <p className="text-gray-300 mb-8 text-lg">
            Ready to transform your business with hypnotic digital experiences?
          </p>
          <motion.button
            className="relative px-12 py-4 gradient-electric hover:shadow-2xl hover:shadow-purple-500/30 text-white font-semibold rounded-2xl transition-all duration-300 group overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const element = document.querySelector('#contact')
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' })
              }
            }}
          >
            <span className="relative z-10 flex items-center space-x-2">
              <Sparkles className="w-5 h-5" />
              <span>Get Custom Quote</span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </motion.button>
        </motion.div>
      </div>

      {/* Marketing Popups */}
      {popup.type && (
        <PopupModal
          isOpen={popup.isOpen}
          onClose={closePopup}
          title={getPopupTitle(popup.type)}
          maxWidth="max-w-6xl"
        >
          {(() => {
            const PopupComponent = getPopupComponent(popup.type)
            return PopupComponent ? <PopupComponent /> : null
          })()}
        </PopupModal>
      )}
    </section>
  )
}