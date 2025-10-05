'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ResponsiveCard, ResponsiveCardGrid } from '../ui/responsive-card';
import { Badge } from '../ui/badge';
import {
  Shield,
  Award,
  Users,
  Clock,
  CheckCircle,
  Star,
  TrendingUp,
  Globe,
  Lock,
  Zap,
  Heart,
  Target,
} from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

// Trust indicators data
const trustIndicators = [
  {
    icon: Users,
    number: '500+',
    label: 'Happy Clients',
    description: 'Businesses trust us with their digital transformation',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Clock,
    number: '99.9%',
    label: 'Uptime Guarantee',
    description: 'Enterprise-grade reliability for your business',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    icon: Shield,
    number: '256-bit',
    label: 'SSL Encryption',
    description: 'Bank-level security for all our applications',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: TrendingUp,
    number: '150%',
    label: 'Average ROI',
    description: 'Proven results that drive business growth',
    gradient: 'from-orange-500 to-red-500',
  },
];

// Certifications and badges
const certifications = [
  {
    name: 'ISO 27001',
    description: 'Information Security Management',
    badge: 'Security Certified',
    icon: Shield,
  },
  {
    name: 'Google Partner',
    description: 'Certified Google Cloud Partner',
    badge: 'Cloud Expert',
    icon: Star,
  },
  {
    name: 'AWS Certified',
    description: 'Amazon Web Services Partner',
    badge: 'Cloud Solutions',
    icon: CheckCircle,
  },
  {
    name: 'SOC 2 Type II',
    description: 'Security & Compliance Audited',
    badge: 'Compliance Ready',
    icon: Lock,
  },
];

// Client testimonials for trust
const trustTestimonials = [
  {
    quote:
      'CodeFlow transformed our business with their exceptional development skills and unwavering commitment to quality.',
    author: 'Sarah Johnson',
    title: 'CTO, TechCorp',
    rating: 5,
    company: 'Fortune 500 Company',
  },
  {
    quote:
      "The team's professionalism and technical expertise exceeded our expectations. Highly recommended!",
    author: 'Michael Chen',
    title: 'Founder, StartupXYZ',
    rating: 5,
    company: 'YC-backed Startup',
  },
  {
    quote:
      'Outstanding service, on-time delivery, and excellent post-launch support. CodeFlow is our go-to development partner.',
    author: 'Emily Rodriguez',
    title: 'Head of Digital, RetailGiant',
    rating: 5,
    company: 'Leading E-commerce',
  },
];

// Money-back guarantee and policies
const guarantees = [
  {
    icon: Heart,
    title: '100% Satisfaction Guarantee',
    description:
      "If you're not completely satisfied with our work within the first 30 days, we'll refund your money.",
    period: '30-Day',
  },
  {
    icon: Target,
    title: 'On-Time Delivery Promise',
    description:
      'We guarantee project delivery on schedule or provide compensation for delays caused by us.',
    period: 'Always',
  },
  {
    icon: Zap,
    title: '24/7 Priority Support',
    description: 'Round-the-clock technical support and maintenance for all enterprise clients.',
    period: '24/7',
  },
];

interface TrustAndCredibilitySectionProps {
  showAll?: boolean;
  variant?: 'full' | 'compact' | 'minimal';
}

export function TrustAndCredibilitySection({
  showAll = true,
  variant = 'full',
}: TrustAndCredibilitySectionProps) {
  if (variant === 'minimal') {
    return (
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {trustIndicators.map((indicator, index) => {
              const Icon = indicator.icon;
              return (
                <motion.div
                  key={indicator.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div
                    className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-2xl bg-gradient-to-br ${indicator.gradient} flex items-center justify-center`}
                  >
                    <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1">
                    {indicator.number}
                  </div>
                  <div className="text-sm sm:text-base font-medium text-gray-300">
                    {indicator.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900"></div>
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Badge className="gradient-electric text-white border-0 mb-4">
            <Shield className="w-4 h-4 mr-2" />
            Trusted by Industry Leaders
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-6">
            Why Top Companies Choose CodeFlow
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Join hundreds of successful businesses who trust us with their most critical projects.
            Our proven track record speaks for itself.
          </p>
        </motion.div>

        {/* Trust Indicators */}
        <ResponsiveCardGrid columns={4} gap="lg" className="mb-16 lg:mb-20">
          {trustIndicators.map((indicator, index) => {
            const Icon = indicator.icon;
            return (
              <ResponsiveCard
                key={indicator.label}
                variant="glass"
                size="md"
                hover={true}
                animation={true}
                index={index}
                className="text-center group"
              >
                <div
                  className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-2xl bg-gradient-to-br ${indicator.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}
                >
                  <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">
                  {indicator.number}
                </div>
                <div className="text-lg sm:text-xl font-semibold text-gray-200 mb-3">
                  {indicator.label}
                </div>
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                  {indicator.description}
                </p>
              </ResponsiveCard>
            );
          })}
        </ResponsiveCardGrid>

        {/* Certifications */}
        {showAll && (
          <div className="mb-16 lg:mb-20">
            <motion.h3
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-center mb-8 lg:mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Certified & Compliant
            </motion.h3>

            <ResponsiveCardGrid columns={4} gap="md">
              {certifications.map((cert, index) => {
                const Icon = cert.icon;
                return (
                  <ResponsiveCard
                    key={cert.name}
                    variant="glass"
                    size="sm"
                    hover={true}
                    animation={true}
                    index={index}
                    className="text-center group"
                  >
                    <div className="relative">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                        <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                      </div>
                      <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 text-xs">
                        ✓
                      </Badge>
                    </div>
                    <h4 className="font-bold text-white mb-1 sm:mb-2 group-hover:text-green-300 transition-colors duration-300">
                      {cert.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-400 mb-2">{cert.description}</p>
                    <Badge
                      variant="outline"
                      className="border-green-400/50 text-green-400 bg-green-400/10 text-xs"
                    >
                      {cert.badge}
                    </Badge>
                  </ResponsiveCard>
                );
              })}
            </ResponsiveCardGrid>
          </div>
        )}

        {/* Trust Testimonials */}
        {showAll && variant === 'full' && (
          <div className="mb-16 lg:mb-20">
            <motion.h3
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-center mb-8 lg:mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              What Our Clients Say
            </motion.h3>

            <ResponsiveCardGrid columns={3} gap="lg">
              {trustTestimonials.map((testimonial, index) => (
                <ResponsiveCard
                  key={testimonial.author}
                  variant="glass"
                  size="md"
                  hover={true}
                  animation={true}
                  index={index}
                  className="group"
                >
                  <div className="mb-4 sm:mb-6">
                    <div className="flex items-center mb-3 sm:mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                    <blockquote className="text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed italic group-hover:text-gray-200 transition-colors duration-300">
                      "{testimonial.quote}"
                    </blockquote>
                  </div>

                  <div className="mt-auto">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                        {testimonial.author
                          .split(' ')
                          .map(n => n[0])
                          .join('')}
                      </div>
                      <div>
                        <div className="font-semibold text-white">{testimonial.author}</div>
                        <div className="text-sm text-gray-400">{testimonial.title}</div>
                        <Badge
                          variant="outline"
                          className="border-purple-400/50 text-purple-400 bg-purple-400/10 text-xs mt-1"
                        >
                          {testimonial.company}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </ResponsiveCard>
              ))}
            </ResponsiveCardGrid>
          </div>
        )}

        {/* Guarantees */}
        {showAll && variant === 'full' && (
          <div>
            <motion.h3
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-center mb-8 lg:mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              Our Commitment to You
            </motion.h3>

            <ResponsiveCardGrid columns={3} gap="lg">
              {guarantees.map((guarantee, index) => {
                const Icon = guarantee.icon;
                return (
                  <ResponsiveCard
                    key={guarantee.title}
                    variant="gradient"
                    size="lg"
                    hover={true}
                    animation={true}
                    index={index}
                    className="text-center group relative overflow-hidden"
                  >
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">
                        {guarantee.period}
                      </Badge>
                    </div>

                    <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    </div>

                    <h4 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 group-hover:text-green-300 transition-colors duration-300">
                      {guarantee.title}
                    </h4>

                    <p className="text-sm sm:text-base text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                      {guarantee.description}
                    </p>
                  </ResponsiveCard>
                );
              })}
            </ResponsiveCardGrid>
          </div>
        )}
      </div>
    </section>
  );
}
export default TrustAndCredibilitySection;
