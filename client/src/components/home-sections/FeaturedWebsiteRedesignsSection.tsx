'use client';

import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  ExternalLink,
  TrendingUp,
  Zap,
  Award,
  Users,
  Clock,
} from 'lucide-react';
import { Button } from '../ui/button';

const clientLogos = [
  {
    name: 'TechVision',
    logo: '/logos/blueridge.png',
    initial: 'TV',
    color: 'from-blue-500 to-gray-500',
  },
  {
    name: 'HealthFirst',
    logo: '/logos/integral.png',
    initial: 'HF',
    color: 'from-green-500 to-gray-500',
  },
  {
    name: 'EduLearn',
    logo: '/logos/tlc.png',
    initial: 'EL',
    color: 'from-purple-500 to-gray-500',
  },
  {
    name: 'RetailHub',
    logo: '/logos/riverchurch.png',
    initial: 'RH',
    color: 'from-orange-500 to-gray-500',
  },
  {
    name: 'FinancePro',
    logo: '/logos/vitech.png',
    initial: 'FP',
    color: 'from-indigo-500 to-gray-500',
  },
];

const redesignProjects = [
  {
    before: 'https://images.unsplash.com/photo-1649877508777-1554357604eb?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1750056393349-dfaf647f7400?w=800&q=80',
    title: 'Enterprise SaaS Platform Modernization',
    description:
      'Complete UX overhaul for a B2B software platform, introducing intuitive navigation, dark mode, and advanced analytics dashboards that increased user engagement by 285%.',
    stat: '+285% Engagement',
    client: 'TechVision',
    category: 'SaaS & Technology',
    duration: '6 months',
    metrics: [
      { label: 'User Retention', value: '+157%' },
      { label: 'Page Speed', value: '94/100' },
      { label: 'Conversion Rate', value: '+89%' },
    ],
    featured: true,
  },
  {
    before: 'https://images.unsplash.com/photo-1566915896913-549d796d2166?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1687524690542-2659f268cde8?w=800&q=80',
    title: 'Healthcare Portal Redesign',
    description:
      'Patient-focused redesign emphasizing accessibility, HIPAA compliance, and seamless appointment booking. Reduced bounce rate by 62% while improving mobile experience.',
    stat: '+173% Bookings',
    client: 'HealthFirst',
    category: 'Healthcare',
    duration: '4 months',
    metrics: [
      { label: 'Mobile Traffic', value: '+142%' },
      { label: 'Accessibility', value: 'WCAG AAA' },
      { label: 'Satisfaction', value: '4.8/5' },
    ],
    featured: false,
  },
  {
    before: 'https://images.unsplash.com/photo-1649877508777-1554357604eb?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1542837336-d14bdf342f9b?w=800&q=80',
    title: 'E-Learning Platform Evolution',
    description:
      'Transformed an outdated LMS into a modern, gamified learning experience with live collaboration tools, AI recommendations, and seamless course discovery.',
    stat: '+215% Completion',
    client: 'EduLearn',
    category: 'Education & E-Learning',
    duration: '5 months',
    metrics: [
      { label: 'Course Completion', value: '+215%' },
      { label: 'Student NPS', value: '+78 pts' },
      { label: 'Load Time', value: '-64%' },
    ],
    featured: false,
  },
  {
    before: 'https://images.unsplash.com/photo-1566915896913-549d796d2166?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1657216328535-e981d223dee3?w=800&q=80',
    title: 'Premium E-Commerce Experience',
    description:
      'Luxury retail brand transformation featuring immersive product galleries, AR try-on, personalized recommendations, and frictionless checkout that tripled conversions.',
    stat: '+312% Revenue',
    client: 'RetailHub',
    category: 'E-Commerce & Retail',
    duration: '7 months',
    metrics: [
      { label: 'Revenue', value: '+312%' },
      { label: 'AOV', value: '+127%' },
      { label: 'Cart Abandonment', value: '-43%' },
    ],
    featured: true,
  },
  {
    before: 'https://images.unsplash.com/photo-1649877508777-1554357604eb?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1553484771-047a44eee27a?w=800&q=80',
    title: 'Financial Dashboard Reimagined',
    description:
      'Enterprise-grade fintech platform with real-time analytics, advanced security features, and intuitive portfolio management. Achieved 99.9% uptime with enhanced compliance.',
    stat: '+198% Active Users',
    client: 'FinancePro',
    category: 'Finance & Fintech',
    duration: '8 months',
    metrics: [
      { label: 'Active Users', value: '+198%' },
      { label: 'Transaction Volume', value: '+245%' },
      { label: 'Security Score', value: 'A+' },
    ],
    featured: false,
  },
];

const ProjectCard = React.memo(
  ({
    project,
    index,
    isActive,
  }: {
    project: (typeof redesignProjects)[0];
    index: number;
    isActive: boolean;
  }) => {
    return (
      <div className="snap-center w-full flex-shrink-0">
        <div className="glass rounded-3xl p-6 sm:p-8 lg:p-12 border border-white/10 hover:border-white/20 transition-all duration-500">
          {/* Project Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 sm:w-7 h-7 gradient-electric rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/20">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-bold text-xl text-white">{project.client}</h3>
                  {project.featured && (
                    <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/30">
                      <Award className="w-3 h-3 text-yellow-400" />
                      <span className="text-xs font-semibold text-yellow-400">Featured</span>
                    </div>
                  )}
                </div>
                <p className="text-gray-400 text-sm flex items-center gap-2">
                  <span>{project.category}</span>
                  <span>•</span>
                  <Clock className="w-3 h-3" />
                  <span>{project.duration}</span>
                </p>
              </div>
            </div>

            <div className="gradient-electric text-white px-6 py-3 rounded-full shadow-lg shadow-purple-500/20 flex items-center gap-2 whitespace-nowrap">
              <TrendingUp className="w-5 h-3" />
              <span className="font-bold">{project.stat}</span>
            </div>
          </div>

          {/* Before/After Images */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Before Image */}
            <div className="relative group/image overflow-hidden rounded-2xl">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={project.before}
                  alt="Before redesign"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover/image:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover/image:opacity-80 transition-opacity duration-300" />

                <div className="absolute top-4 left-4 bg-red-500/90 backdrop-blur-sm text-white text-xs font-bold px-4 py-2 rounded-full border border-red-400/30 shadow-lg">
                  BEFORE
                </div>

                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover/image:translate-y-0">
                  <p className="text-white font-semibold mb-1">Original Design</p>
                  <p className="text-gray-300 text-sm">Legacy Interface</p>
                </div>
              </div>
            </div>

            {/* After Image */}
            <div className="relative group/image overflow-hidden rounded-2xl">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={project.after}
                  alt="After redesign"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover/image:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover/image:opacity-80 transition-opacity duration-300" />

                <div className="absolute top-4 right-4 bg-green-500/90 backdrop-blur-sm text-white text-xs font-bold px-4 py-2 rounded-full border border-green-400/30 shadow-lg">
                  AFTER
                </div>

                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover/image:translate-y-0">
                  <p className="text-white font-semibold mb-1">Modern Design</p>
                  <p className="text-gray-300 text-sm">Enhanced UX/UI</p>
                </div>
              </div>
            </div>
          </div>

          {/* Project Details */}
          <div>
            <h4 className="text-2xl sm:text-3xl font-bold text-white mb-4 hover:text-cyan-400 transition-colors duration-300">
              {project.title}
            </h4>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">{project.description}</p>

            {/* Metrics Grid */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {project.metrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="glass rounded-xl p-4 border border-white/10 hover:border-cyan-500/30 transition-all duration-300"
                >
                  <p className="text-cyan-400 font-bold text-xl sm:text-2xl mb-1">{metric.value}</p>
                  <p className="text-gray-400 text-xs sm:text-sm">{metric.label}</p>
                </div>
              ))}
            </div>

            {/* CTA Section */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <Button
                onClick={() => (window.location.hash = '/portfolio')}
                className="group/btn gradient-electric text-white shadow-lg shadow-purple-500/25 rounded-full px-8 py-6 font-semibold flex items-center gap-3 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/40"
              >
                <span>View Full Case Study</span>
                <ExternalLink className="w-5 h-5" />
              </Button>

              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>Live Project</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>2024</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

ProjectCard.displayName = 'ProjectCard';

export default function FeaturedWebsiteRedesignsSection() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-scroll functionality with cleanup
  useEffect(() => {
    if (!mounted || isHovering) return;

    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % redesignProjects.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [mounted, isHovering]);

  // Scroll slider to specific index
  const scrollToIndex = useCallback((newIndex: number) => {
    if (!sliderRef.current) return;
    const slider = sliderRef.current;
    const card = slider.children[newIndex];
    if (!card) return;

    const cardEl = card as HTMLElement;
    const left = cardEl.offsetLeft - (slider.clientWidth - cardEl.clientWidth) / 2;
    slider.scrollTo({ left, behavior: 'smooth' });
    setActiveIndex(newIndex);
  }, []);

  // Optimize scroll handler with passive listener
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider || !mounted) return;

    let timeoutId: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const children = Array.from(slider.children);
        const center = slider.scrollLeft + slider.offsetWidth / 2;
        const newIndex = children.findIndex(child => {
          const el = child as HTMLElement;
          return el.offsetLeft <= center && el.offsetLeft + el.offsetWidth > center;
        });
        if (newIndex !== -1 && newIndex !== activeIndex) {
          setActiveIndex(newIndex);
        }
      }, 100);
    };

    slider.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      slider.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, [activeIndex, mounted]);

  const next = useCallback(() => {
    scrollToIndex((activeIndex + 1) % redesignProjects.length);
  }, [activeIndex, scrollToIndex]);

  const prev = useCallback(() => {
    scrollToIndex((activeIndex - 1 + redesignProjects.length) % redesignProjects.length);
  }, [activeIndex, scrollToIndex]);

  if (!mounted) {
    return (
      <section className="relative py-20 sm:py-32 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="h-96 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-20  bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-3xl opacity-50" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-3xl opacity-50" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full mb-6 glass border border-cyan-500/20">
            <RefreshCw className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-semibold text-cyan-400">
              BEFORE & AFTER TRANSFORMATIONS
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent leading-relaxed mb-6 font-outfit">
            Featured Website Redesigns
          </h2>

          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-3">
            Witness the transformation as we reimagine digital experiences for brands across
            industries
          </p>

          <p className="text-cyan-400 font-semibold">
            Real results. Measurable impact. Exceptional design.
          </p>
        </div>

        {/* Client Selection */}
        <div className="mb-8 md:mb-16">
          <div className="flex justify-center items-center gap-3 md:gap-6 flex-wrap">
            {clientLogos.map((client, i) => (
              <button
                key={i}
                onClick={() => scrollToIndex(i % redesignProjects.length)}
                className={`group relative p-2 sm:p-4 rounded-2xl transition-all duration-300 backdrop-blur-sm border ${
                  activeIndex === i % redesignProjects.length
                    ? 'glass border-cyan-500/50 shadow-lg shadow-cyan-500/20'
                    : 'glass border-white/10 hover:border-white/20'
                }`}
              >
                <div
                  className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br ${client.color} flex items-center justify-center transition-all duration-300 ${
                    activeIndex === i % redesignProjects.length
                      ? 'scale-110'
                      : 'group-hover:scale-105'
                  }`}
                >
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="h-8 md:h-12 rounded-xl object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                  {/* <span className="font-bold text-white text-sm sm:text-lg">
                    {client.initial}
                  </span> */}
                </div>

                {activeIndex === i % redesignProjects.length && (
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Project Slider */}
        <div
          className="relative"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide pb-8"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {redesignProjects.map((project, i) => (
              <ProjectCard key={i} project={project} index={i} isActive={i === activeIndex} />
            ))}
          </div>

          {/* Desktop Navigation */}
          <button
            onClick={prev}
            className=" lg:flex absolute top-1/2 -left-6 transform -translate-y-1/2 p-4 rounded-full  backdrop-blur-sm shadow-xl shadow-purple-500/25 border border-white/10 z-20 transition-all duration-300 items-center justify-center hover:shadow-2xl hover:shadow-purple-500/40 hover:scale-110"
            aria-label="Previous project"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={next}
            className="lg:flex absolute top-1/2 -right-6 transform -translate-y-1/2 p-4 rounded-full  backdrop-blur-sm shadow-xl shadow-purple-500/25 border border-white/10 z-20 transition-all duration-300 items-center justify-center hover:shadow-2xl hover:shadow-purple-500/40 hover:scale-110"
            aria-label="Next project"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Progress Indicators */}
        <div className="flex justify-center gap-3 mt-12">
          {redesignProjects.map((project, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={`relative transition-all duration-300 ${
                index === activeIndex ? 'w-12 h-3' : 'w-3 h-3'
              }`}
              aria-label={`Go to project ${index + 1}`}
            >
              <div
                className={`w-full h-full rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? 'gradient-electric shadow-lg shadow-purple-500/50'
                    : 'bg-slate-700 hover:bg-slate-600'
                }`}
              />
              {project.featured && index === activeIndex && (
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full shadow-lg shadow-yellow-400/50" />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
