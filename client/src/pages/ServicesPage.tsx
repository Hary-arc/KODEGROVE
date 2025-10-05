'use client';
import React from 'react';
import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import {
  Monitor,
  Palette,
  TrendingUp,
  Code,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Star,
  Users,
  Award,
  Zap,
  Target,
  BarChart3,
  PenTool,
  Smartphone,
  Globe,
  ShoppingCart,
  Eye,
  ExternalLink,
  Play,
  ChevronRight,
  ArrowUpRight,
} from 'lucide-react';
import { ServicesSection } from '@/components/ServicesSection';
import { services, serviceStats } from '../data/services';
import { pageHeaders } from '../data/content';
import { siteConfig } from '../data/site-config';

export function ServicesPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState('web-design');
  const [displayedText, setDisplayedText] = useState('');

  const isHeroInView = useInView(heroRef, { once: true });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  // Animated headline
  const headlineText = pageHeaders.services.title.split(' That Transform')[0];

  useEffect(() => {
    if (!isHeroInView) return;

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= headlineText.length) {
        setDisplayedText(headlineText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 80);

    return () => clearInterval(interval);
  }, [isHeroInView]);

  // Icon mapping to handle dynamic icons
  const getIconComponent = (iconName: string) => {
    const icons = {
      Monitor,
      Palette,
      TrendingUp,
      Code,
    };
    return icons[iconName as keyof typeof icons] || Monitor;
  };

  // Scroll to section handler
  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 100;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

  // Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const service of services) {
        const element = document.getElementById(service.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(service.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="services-page" ref={containerRef}>
      {/* Enhanced Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        ref={heroRef}
      >
        {/* Animated Background Graphics */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900" />

          {/* Floating geometric shapes */}
          <motion.div
            className="absolute top-20 left-20 w-32 h-32 border border-cyan-500/30 rounded-full"
            style={{ y: heroY, scale: heroScale }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute top-40 right-32 w-24 h-24 border border-purple-500/30 rounded-lg rotate-45"
            style={{ y: useTransform(scrollYProgress, [0, 1], ['0%', '-30%']) }}
            animate={{ rotate: 405 }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute bottom-32 left-1/3 w-20 h-20 border border-pink-500/30"
            style={{ y: useTransform(scrollYProgress, [0, 1], ['0%', '20%']) }}
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          />

          {/* Grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>

        <div className="relative z-10 w-full pt-32">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            {/* Hero Badge */}
            <motion.div
              className="inline-flex items-center space-x-3 glass rounded-full px-6 py-3 mb-8 border border-white/20"
              initial={{ opacity: 0, y: 30 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <span className="font-medium text-gray-200">Our Services</span>
            </motion.div>

            {/* Animated Headline */}
            <motion.h1
              className="font-outfit text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 leading-[0.9]"
              initial={{ opacity: 0, y: 50 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.4 }}
            >
              <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                {displayedText}
                <span className="animate-pulse">|</span>
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                That Transform
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.8 }}
            >
              From concept to launch, we provide comprehensive digital solutions that captivate
              audiences and accelerate business growth through innovative technology.
            </motion.p>

            {/* Service Stats */}
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 mb-16"
              initial={{ opacity: 0, y: 40 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 1.0 }}
            >
              {[
                { icon: Award, number: `${siteConfig.stats.projects}+`, label: 'Projects' },
                { icon: Users, number: `${siteConfig.stats.clients}+`, label: 'Clients' },
                { icon: Star, number: `${siteConfig.stats.satisfaction}%`, label: 'Satisfaction' },
                { icon: TrendingUp, number: `${siteConfig.stats.avgROI}%`, label: 'Avg ROI' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="glass rounded-2xl p-4 sm:p-6 border border-white/10 hover:border-white/20 transition-all duration-300 group"
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-3 sm:mb-4 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-1 sm:mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-300 font-medium text-xs sm:text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center"
              initial={{ opacity: 0, y: 40 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 1.2 }}
            >
              <Button
                onClick={() => scrollToSection('web-design')}
                size="lg"
                className="px-12 py-6 gradient-electric hover:shadow-2xl hover:shadow-purple-500/30 text-white rounded-2xl font-semibold transition-all duration-300 magnetic relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center space-x-3">
                  <Eye className="w-5 h-5" />
                  <span>Explore Services</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>

              <Button
                onClick={() => (window.location.hash = '/quotation')}
                variant="outline"
                size="lg"
                className="px-12 py-6 glass border-white/20 text-white hover:bg-white/10 rounded-2xl font-semibold magnetic"
              >
                <Sparkles className="w-5 h-5 mr-3" />
                Get Quotation
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
      {/* ServicesSection */}
      <ServicesSection />

      {/* Sticky Navigation */}
      <nav className="sticky top-20 z-30 bg-slate-900/95 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto py-6">
            {services.map(service => {
              const ServiceIcon = getIconComponent(service.icon);
              return (
                <button
                  key={service.id}
                  onClick={() => scrollToSection(service.id)}
                  className={`flex items-center space-x-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 whitespace-nowrap ${
                    activeSection === service.id
                      ? 'gradient-electric text-white shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <ServiceIcon className="w-5 h-5" />
                  <span>{service.shortTitle || service.title.split(' & ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Service Sections */}
      <div className="relative">
        {services.map((service, serviceIndex) => (
          <ServiceSection
            key={service.id}
            service={{
              ...service,
              icon: getIconComponent(service.icon),
            }}
            index={serviceIndex}
          />
        ))}
      </div>

      {/* Final CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center glass rounded-3xl p-16 border border-white/10 relative overflow-hidden"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-cyan-500/5" />

            <div className="relative z-10">
              <h3 className="font-outfit text-3xl lg:text-4xl font-bold text-white mb-6">
                Ready to Transform Your{' '}
                <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Digital Presence?
                </span>
              </h3>
              <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                Let's create extraordinary digital experiences that captivate your audience and
                accelerate your growth.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button
                  onClick={() => (window.location.hash = '/contact')}
                  size="lg"
                  className="gradient-electric hover:shadow-2xl hover:shadow-purple-500/30 text-white px-12 py-6 rounded-2xl font-semibold magnetic relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center space-x-3">
                    <Sparkles className="w-5 h-5" />
                    <span>Start Your Project</span>
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Button>

                <Button
                  onClick={() => (window.location.hash = '/portfolio')}
                  variant="outline"
                  size="lg"
                  className="px-12 py-6 glass border-white/20 text-white hover:bg-white/10 rounded-2xl font-semibold magnetic"
                >
                  <Eye className="w-5 h-5 mr-3" />
                  View Our Work
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// Individual Service Section Component
function ServiceSection({ service, index }: { service: any; index: number }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <section id={service.id} className="py-32 relative overflow-hidden" ref={sectionRef}>
      {/* Background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${
          index % 2 === 0
            ? 'from-slate-950 via-purple-950/10 to-slate-950'
            : 'from-slate-950 via-cyan-950/10 to-slate-950'
        }`}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Service Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        >
          <motion.div
            className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${service.gradient} mb-8`}
            initial={{ scale: 0, rotate: -180 }}
            animate={isInView ? { scale: 1, rotate: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <service.icon className="w-10 h-10 text-white" />
          </motion.div>

          <h2 className="font-outfit text-4xl lg:text-5xl font-bold mb-8">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {service.title.split(' & ')[0]}
            </span>
            {service.title.includes(' & ') && (
              <>
                <br />
                <span
                  className={`bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}
                >
                  & {service.title.split(' & ')[1]}
                </span>
              </>
            )}
          </h2>

          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {service.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Features List */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <h3 className="font-outfit text-2xl font-bold text-white mb-8">What We Deliver</h3>

            <div className="space-y-6">
              {service.features.map((feature: string, featureIndex: number) => (
                <motion.div
                  key={featureIndex}
                  className="flex items-center space-x-4 group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 + featureIndex * 0.1 }}
                >
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-lg text-gray-300 group-hover:text-white transition-colors duration-300">
                    {feature}
                  </span>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="pt-8"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <Button
                onClick={() => (window.location.hash = '/contact')}
                className={`px-8 py-4 bg-gradient-to-r ${service.gradient} hover:shadow-lg text-white rounded-xl font-semibold transition-all duration-300 magnetic group`}
              >
                Get Started
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Case Studies */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <h3 className="font-outfit text-2xl font-bold text-white mb-8">Featured Projects</h3>

            <div className="space-y-8">
              {service.caseStudies.map((caseStudy: any, caseIndex: number) => (
                <motion.div
                  key={caseIndex}
                  className="group"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.8 + caseIndex * 0.2 }}
                >
                  <Card className="overflow-hidden glass border border-white/10 hover:border-white/30 transition-all duration-700 hover-glow">
                    <div className="relative overflow-hidden">
                      <div className="relative h-48">
                        <ImageWithFallback
                          src={caseStudy.image}
                          alt={caseStudy.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="flex space-x-3">
                            <Button
                              className="glass border border-white/30 text-white hover:bg-white/10 backdrop-blur-xl shadow-2xl"
                              size="sm"
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              View Case
                            </Button>
                            <Button
                              variant="outline"
                              className="glass border border-white/30 text-white hover:bg-white/10 backdrop-blur-xl shadow-2xl"
                              size="sm"
                            >
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Live Demo
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <Badge
                          className={`bg-gradient-to-r ${service.gradient} text-white border-0`}
                        >
                          Case Study
                        </Badge>
                        <div
                          className={`text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r ${service.gradient}`}
                        >
                          {caseStudy.metrics}
                        </div>
                      </div>

                      <h4 className="font-outfit text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                        {caseStudy.title}
                      </h4>

                      <p className="text-gray-300 mb-4 leading-relaxed text-sm">
                        {caseStudy.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {caseStudy.tech.map((tech: string, techIndex: number) => (
                          <span
                            key={techIndex}
                            className="text-xs px-3 py-1 glass border border-white/20 text-gray-300 rounded-full hover:border-white/40 transition-colors duration-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
