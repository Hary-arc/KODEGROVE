'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import {
  Users,
  Award,
  Target,
  Heart,
  ArrowUpRight,
  Quote,
  Star,
  Sparkles,
  Lightbulb,
  Rocket,
  Shield,
  Zap,
  Calendar,
  MapPin,
  Trophy,
  Globe,
  Code,
  Palette,
  Settings,
  TrendingUp,
  CheckCircle,
} from 'lucide-react';
import { team, companyValues, companyTimeline, companyStats, companyMission } from '../data/team';
import React from 'react';

// Counter hook for animated numbers
function useCounter(end: number, start: number = 0, duration: number = 2000) {
  const [count, setCount] = useState(start);
  const [isAnimating, setIsAnimating] = useState(false);

  const startCounter = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const startTime = Date.now();
    const timer = setInterval(() => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.floor(start + (end - start) * easeOutExpo);

      setCount(current);

      if (progress === 1) {
        clearInterval(timer);
        setIsAnimating(false);
      }
    }, 16);

    return () => clearInterval(timer);
  };

  return [count, startCounter] as const;
}

// Crown icon component (since it's not in Lucide)
function Crown({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm6 16h8" />
    </svg>
  );
}

export function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const isTimelineInView = useInView(timelineRef, { once: true, amount: 0.1 });
  const isStatsInView = useInView(statsRef, { once: true, amount: 0.1 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);

  // Animated counters
  const [projectsCount, startProjects] = useCounter(companyStats[0].value);
  const [clientsCount, startClients] = useCounter(companyStats[1].value);
  const [yearsCount, startYears] = useCounter(companyStats[2].value);
  const [satisfactionCount, startSatisfaction] = useCounter(companyStats[3].value);

  useEffect(() => {
    if (isStatsInView) {
      setTimeout(startProjects, 200);
      setTimeout(startClients, 400);
      setTimeout(startYears, 600);
      setTimeout(startSatisfaction, 800);
    }
  }, [isStatsInView, startProjects, startClients, startYears, startSatisfaction]);

  // Icon mapping function
  const getIconComponent = (iconName: string) => {
    const icons = {
      Lightbulb,
      Users,
      Target,
      Rocket,
      Calendar,
      Award,
      TrendingUp,
      Sparkles,
      Trophy,
      Zap,
      Globe,
      Crown,
    };
    return icons[iconName as keyof typeof icons] || Lightbulb;
  };

  const statsWithCounters = [
    { ...companyStats[0], value: projectsCount },
    { ...companyStats[1], value: clientsCount },
    { ...companyStats[2], value: yearsCount },
    { ...companyStats[3], value: satisfactionCount },
  ];

  return (
    <section id="about" ref={containerRef} className="py-20 relative overflow-hidden min-h-screen">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-indigo-950/20 to-slate-950" />
      <motion.div
        style={{ y: y1 }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="inline-flex items-center space-x-3 glass rounded-full px-6 py-3 mb-8 border border-white/20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Sparkles className="w-5 h-5 text-purple-400" />
            <span className="font-medium text-gray-200">About CodeFlow</span>
          </motion.div>

          <h2 className="font-outfit text-5xl lg:text-6xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              The Minds Behind
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Digital Innovation
            </span>
          </h2>
        </motion.div>

        {/* Mission & Values */}
        <motion.div
          className="mb-24"
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Mission Statement */}
          <div className="text-center mb-20">
            <motion.div
              className="max-w-4xl mx-auto glass rounded-3xl p-12 border border-white/10 relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-cyan-500/5" />

              <div className="relative z-10">
                <Quote className="w-12 h-12 text-purple-400 mx-auto mb-6" />
                <h3 className="font-outfit text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight">
                  {companyMission.title}
                </h3>
                <p className="text-xl text-gray-300 leading-relaxed">
                  {companyMission.description}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Core Values */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyValues.map((value, index) => {
              const ValueIcon = getIconComponent(value.icon);
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
                >
                  <Card className="value-card glass border border-white/10 h-full relative overflow-hidden group">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                    />

                    <CardContent className="p-8 text-center relative z-10">
                      <div
                        className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${value.gradient} p-3 relative overflow-hidden group-hover:scale-110 transition-transform duration-300`}
                      >
                        <ValueIcon className="w-full h-full text-white relative z-10" />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                      </div>

                      <h4 className="font-outfit text-xl font-bold text-white mb-4">
                        {value.title}
                      </h4>
                      <p className="text-gray-300 leading-relaxed">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Company Timeline */}
        <motion.div
          ref={timelineRef}
          className="mb-24"
          initial={{ opacity: 0, y: 60 }}
          animate={isTimelineInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="text-center mb-16">
            <h3 className="font-outfit text-4xl font-bold text-white mb-6">
              Our{' '}
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Journey
              </span>
            </h3>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              From a small startup to a global digital innovation leader.
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-purple-500 via-pink-500 to-cyan-500 rounded-full h-full">
              {isTimelineInView && <div className="w-full h-full timeline-line animate" />}
            </div>

            {/* Timeline Items */}
            <div className="space-y-16">
              {companyTimeline.map((item, index) => {
                const ItemIcon = getIconComponent(item.icon);
                return (
                  <motion.div
                    key={item.year}
                    className={`flex items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
                    animate={isTimelineInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.6 + index * 0.2 }}
                  >
                    {/* Content */}
                    <div className="flex-1 lg:w-5/12">
                      <div
                        className={`${index % 2 === 0 ? 'lg:text-right lg:pr-16' : 'lg:text-left lg:pl-16'}`}
                      >
                        <motion.div
                          className="glass rounded-2xl p-8 border border-white/10 hover:border-white/30 transition-all duration-500 group relative overflow-hidden"
                          whileHover={{ scale: 1.02, y: -4 }}
                          transition={{ type: 'spring', stiffness: 300 }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                          <div className="relative z-10">
                            <div className="flex items-center space-x-3 mb-4">
                              <Badge className="gradient-electric text-white border-0">
                                {item.year}
                              </Badge>
                              <h4 className="font-outfit text-2xl font-bold text-white">
                                {item.title}
                              </h4>
                            </div>

                            <p className="text-gray-300 mb-6 leading-relaxed">{item.description}</p>

                            <div className="flex flex-wrap gap-2">
                              {item.achievements.map((achievement, achievementIndex) => (
                                <span
                                  key={achievementIndex}
                                  className="text-xs px-3 py-1 glass border border-white/20 text-gray-300 rounded-full"
                                >
                                  {achievement}
                                </span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </div>

                    {/* Timeline Node */}
                    <motion.div
                      className="relative z-20 flex items-center justify-center w-16 h-16 mx-8"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isTimelineInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
                    >
                      <div className="w-16 h-16 gradient-electric rounded-full flex items-center justify-center shadow-2xl border-4 border-slate-950 relative overflow-hidden">
                        <ItemIcon className="w-8 h-8 text-white relative z-10" />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                      </div>
                    </motion.div>

                    {/* Spacer for alternating layout */}
                    <div className="hidden lg:block flex-1 lg:w-5/12"></div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Animated Statistics */}
        <motion.div
          ref={statsRef}
          className="mb-24"
          initial={{ opacity: 0, y: 60 }}
          animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {statsWithCounters.map((stat, index) => {
              const StatIcon = getIconComponent(stat.icon);
              return (
                <motion.div
                  key={stat.label}
                  className="text-center glass rounded-2xl p-8 border border-white/10 hover:border-white/30 transition-all duration-500 group relative overflow-hidden"
                  initial={{ opacity: 0, y: 40 }}
                  animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  whileHover={{ scale: 1.05, y: -8 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    <div className="w-16 h-16 gradient-electric rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <StatIcon className="w-8 h-8 text-white" />
                    </div>

                    <motion.div
                      className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2"
                      initial={{ opacity: 0 }}
                      animate={isStatsInView ? { opacity: 1 } : {}}
                      transition={{ duration: 0.8, delay: 0.4 + index * 0.2 }}
                    >
                      {stat.value}
                      {stat.suffix}
                    </motion.div>

                    <div className="font-semibold text-white mb-2">{stat.label}</div>
                    <div className="text-sm text-gray-400">{stat.description}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="text-center mb-16">
            <h3 className="font-outfit text-4xl font-bold text-white mb-6">
              Meet the{' '}
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Dream Team
              </span>
            </h3>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              The brilliant minds crafting tomorrow's digital experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                className="team-member group"
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 1.0 + index * 0.1 }}
              >
                <Card className="glass border border-white/10 overflow-hidden relative">
                  <div className="relative overflow-hidden">
                    <ImageWithFallback
                      src={member.image}
                      alt={member.name}
                      className="w-full h-80 object-cover"
                    />

                    {/* Hover Overlay */}
                    <div className="overlay absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end">
                      <div className="p-6 w-full">
                        <div className="flex flex-wrap gap-2 mb-4">
                          {member.specialties.map(specialty => (
                            <span
                              key={specialty}
                              className="text-xs px-3 py-1 gradient-electric rounded-full text-white"
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>
                        <div className="flex space-x-3">
                          <button className="w-8 h-8 glass rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors duration-300">
                            <span className="text-xs">in</span>
                          </button>
                          <button className="w-8 h-8 glass rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors duration-300">
                            <span className="text-xs">tw</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <h4 className="font-outfit text-xl font-bold text-white mb-1">{member.name}</h4>
                    <p className="text-purple-400 font-medium mb-3">{member.role}</p>
                    <p className="text-gray-300 text-sm leading-relaxed">{member.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center glass rounded-3xl p-16 border border-white/10 relative overflow-hidden"
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-cyan-500/5" />

          <div className="relative z-10">
            <h3 className="font-outfit text-4xl font-bold text-white mb-6">
              Ready to Build{' '}
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Something Amazing?
              </span>
            </h3>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Let's collaborate to transform your vision into a mesmerizing digital reality that
              captivates users and drives unprecedented growth.
            </p>

            <Button
              onClick={() => {
                const element = document.querySelector('#contact');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              size="lg"
              className="gradient-electric hover:shadow-2xl hover:shadow-purple-500/30 text-white px-12 py-6 rounded-2xl font-semibold relative overflow-hidden group magnetic"
            >
              <span className="relative z-10 flex items-center space-x-3">
                <Sparkles className="w-6 h-6" />
                <span>Start the Journey</span>
                <ArrowUpRight className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
