'use client';
import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Card, CardContent } from './ui/card';
import {
  Globe,
  Smartphone,
  ShoppingCart,
  Database,
  Palette,
  Shield,
  ArrowUpRight,
  Cloud,
  Search,
  Zap,
} from 'lucide-react';

export function ServiceCardsMarquee() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const services = [
    {
      icon: Globe,
      title: 'Web Development',
      description: 'Modern, responsive websites that captivate and convert.',
      gradient: 'from-blue-500 to-cyan-500',
      metrics: { value: '+150%', label: 'Engagement' },
    },
    {
      icon: Smartphone,
      title: 'Mobile Apps',
      description: 'Native iOS & Android apps with seamless user experiences.',
      gradient: 'from-purple-500 to-pink-500',
      metrics: { value: '4.9★', label: 'Rating' },
    },
    {
      icon: ShoppingCart,
      title: 'E-Commerce',
      description: 'High-converting online stores with advanced analytics.',
      gradient: 'from-green-500 to-emerald-500',
      metrics: { value: '+200%', label: 'Sales' },
    },
    {
      icon: Database,
      title: 'Backend Systems',
      description: 'Scalable cloud infrastructure and robust APIs.',
      gradient: 'from-orange-500 to-red-500',
      metrics: { value: '99.9%', label: 'Uptime' },
    },
    {
      icon: Palette,
      title: 'UI/UX Design',
      description: 'Beautiful interfaces that users love to interact with.',
      gradient: 'from-pink-500 to-rose-500',
      metrics: { value: '+85%', label: 'Retention' },
    },
    {
      icon: Shield,
      title: 'Security & DevOps',
      description: 'Enterprise-grade security and automated deployments.',
      gradient: 'from-indigo-500 to-purple-500',
      metrics: { value: '100%', label: 'Secure' },
    },
    {
      icon: Cloud,
      title: 'Cloud Solutions',
      description: 'Scalable cloud architecture and migration services.',
      gradient: 'from-sky-500 to-blue-500',
      metrics: { value: '10x', label: 'Faster' },
    },
    {
      icon: Search,
      title: 'SEO Optimization',
      description: 'Data-driven SEO strategies that boost visibility.',
      gradient: 'from-yellow-500 to-orange-500',
      metrics: { value: '+300%', label: 'Traffic' },
    },
    {
      icon: Zap,
      title: 'Performance',
      description: 'Lightning-fast optimization for maximum speed.',
      gradient: 'from-cyan-500 to-teal-500',
      metrics: { value: '<1s', label: 'Load Time' },
    },
  ];

  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.25, 0.25, 0, 1] }}
        >
          <h2 className="font-outfit text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Our Services
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              In Motion
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Experience our comprehensive services with smooth right-to-left motion that pauses when
            you want to explore.
          </p>
        </motion.div>

        {/* Animated Service Cards Row */}
        <motion.div
          className="marquee-container relative overflow-hidden h-[300px] mb-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div className="animate-marquee-rtl flex gap-8" style={{ animationDuration: '45s' }}>
            {[...services, ...services].map((service, index) => (
              <div key={`${service.title}-${index}`} className="flex-shrink-0 w-80">
                <Card className="group h-full glass border border-white/10 hover:border-white/30 transition-all duration-500 overflow-hidden relative">
                  {/* Hover Effect Background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  />

                  {/* Sliding Effect on Hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
                    whileHover={{
                      translateX: '200%',
                      transition: { duration: 0.8, ease: 'easeInOut' },
                    }}
                  />

                  <CardContent className="p-6 relative z-10 h-full flex flex-col">
                    {/* Icon & Metric */}
                    <div className="flex items-start justify-between mb-4">
                      <motion.div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.gradient} p-2.5 relative overflow-hidden`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <service.icon className="w-full h-full text-white relative z-10" />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                      </motion.div>

                      <div className="text-right">
                        <div className="text-lg font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                          {service.metrics.value}
                        </div>
                        <div className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                          {service.metrics.label}
                        </div>
                      </div>
                    </div>

                    {/* Title & Description */}
                    <h3 className="font-outfit text-lg font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                      {service.title}
                    </h3>

                    <p className="text-gray-300 text-sm leading-relaxed flex-grow">
                      {service.description}
                    </p>

                    {/* Hover CTA */}
                    <motion.div
                      className="opacity-0 group-hover:opacity-100 transition-all duration-300 mt-4"
                      initial={{ y: 20 }}
                      whileHover={{ y: 0 }}
                    >
                      <button className="flex items-center space-x-2 text-cyan-400 font-medium hover:text-white transition-colors duration-300">
                        <span className="text-sm">Learn More</span>
                        <ArrowUpRight className="w-3 h-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                      </button>
                    </motion.div>

                    {/* Magnetic Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div
                        className={`absolute inset-0 bg-gradient-to-r ${service.gradient} opacity-5`}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* Smooth gradient overlays for professional edge blending */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-950 to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-950 to-transparent pointer-events-none z-10" />
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <p className="text-gray-300 mb-6">
            Ready to see these services in action for your project?
          </p>
          <motion.button
            className="px-8 py-3 gradient-electric text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started Today
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
