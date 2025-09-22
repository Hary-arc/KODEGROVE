"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useAnimation } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Zap,
  Star,
  Globe,
  Users,
  Rocket,
  Play,
  Eye,
  ExternalLink,
  Award,
  TrendingUp,
  CheckCircle,
  Monitor,
  Palette,
  Code,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { siteConfig } from "../data/site-config";
import { services } from "../data/services";
import {
  projects,
  getFeaturedProjects,
} from "../data/portfolio";
import { testimonials } from "../data/testimonials";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import VideoHoverLift from "../components/VideoHoverLift";
import { TestimonialMarquee } from "../components/TestimonialMarquee";
import { ServiceCardsMarquee } from "../components/ServiceCardsMarquee";
import {
  ScrollReveal,
  StaggeredReveal,
  Parallax,
} from "../components/animations/ScrollReveal";
import {
  HoverLift,
  MagneticHover,
  RippleButton,
  AnimatedIcon,
  Typewriter,
} from "../components/animations/MicroInteractions";
import {
  VideoBackground,
  CaseStudyVideo,
} from "../components/animations/VideoBackground";
import {
  LottieAnimation,
  AnimatedIcon as LottieIcon,
  AnimatedPath,
} from "../components/animations/LottieAnimation";
import {
  usePerformantAnimation,
  useScrollAnimation,
  useViewportAnimation,
} from "../components/animations/usePerformantAnimation";

import { HeroSection } from "../components/HeroSection";

import CreativeWebAgencySection from "../components/home-sections/CreativeWebAgencySection";
import ClientsIndustriesSection from "../components/home-sections/ClientsIndustriesSection";
import CMSPlatformSection from "../components/home-sections/CMSPlatformSection";
import DesignProcessSection from "../components/home-sections/DesignProcessSection";
import DigitalTrendsSection from "../components/home-sections/DigitalTrendsSection";
import CustomWebDesignPricingSection from "../components/home-sections/CustomWebDesignPricingSection";
import FeaturedWebsiteRedesignsSection from "../components/home-sections/FeaturedWebsiteRedesignsSection";
import React from "react";
export function EnhancedHomePage() {
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const servicesRef = useRef(null);
  const portfolioRef = useRef(null);
  const testimonialsRef = useRef(null);

  const isHeroInView = useInView(heroRef, {
    once: true,
    amount: 0.2,
  });
  const isStatsInView = useInView(statsRef, {
    once: true,
    amount: 0.3,
  });
  const isServicesInView = useInView(servicesRef, {
    once: true,
    amount: 0.2,
  });
  const isPortfolioInView = useInView(portfolioRef, {
    once: true,
    amount: 0.2,
  });
  const isTestimonialsInView = useInView(testimonialsRef, {
    once: true,
    amount: 0.2,
  });

  const { scrollY, scrollDirection } = useScrollAnimation();
  const viewport = useViewportAnimation();

  const [activeService, setActiveService] = useState(0);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const controls = useAnimation();
  // Auto-rotate services
  useEffect(() => {
    if (isHovered) {
      controls.stop(); // Pause marquee
    } else {
      controls.start({
        x: ["0%", "-50%"],
        transition: {
          duration: 10,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
        },
      });
    }
  }, [isHovered, controls]);

  const featuredProjects = getFeaturedProjects();
  const featuredTestimonials = testimonials.slice(0, 3);

  // Icon mapping function for services
  const getServiceIcon = (iconName: string) => {
    const icons = {
      Monitor,
      Palette,
      TrendingUp,
      Code,
      Zap,
      Star,
      Award,
      Users,
      Rocket,
    };
    return icons[iconName as keyof typeof icons] || Zap;
  };

  return (
    <div className="enhanced-home-page min-h-screen bg-slate-950 text-white overflow-x-hidden">
      {/* Hero Section with Enhanced Background */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center overflow-hidden"
      >
        {/* Static Background instead of video to avoid issues */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070"
            alt="Hero background"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-purple-900/20 to-black/60" />
        </div>

        {/* Animated particles overlay */}
        <Parallax
          speed={0.3}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-float" />
          <div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "2s" }}
          />
        </Parallax>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Animated Badge */}

              {/* Typewriter Headline */}
              <ScrollReveal variant="fadeUp" delay={0.4}>
                <h1 className="font-outfit text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="block bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent mb-4">
                    Digital Experiences
                  </span>
                  <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                    <Typewriter
                      text="That Mesmerize"
                      speed={100}
                      className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent"
                    />
                  </span>
                </h1>
              </ScrollReveal>

              {/* Subtitle */}
              <ScrollReveal variant="fadeUp" delay={0.8}>
                <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-2xl">
                  We craft{" "}
                  <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent font-semibold">
                    hypnotic digital experiences
                  </span>{" "}
                  that transform businesses and captivate users
                  worldwide.
                </p>
              </ScrollReveal>

              {/* Stats Cards */}
              <StaggeredReveal
                staggerDelay={0.2}
                initialDelay={1.0}
                className="grid grid-cols-3 gap-3 sm:gap-6"
              >
                {[
                  {
                    number: siteConfig.stats.projects,
                    label: "Projects Delivered",
                    icon: Rocket,
                  },
                  {
                    number: `${siteConfig.stats.satisfaction}%`,
                    label: "Client Satisfaction",
                    icon: Star,
                  },
                  {
                    number: `${siteConfig.stats.avgROI}%`,
                    label: "Average ROI",
                    icon: TrendingUp,
                  },
                ].map(
                  ({ number, label, icon: Icon }, index) => (
                    <HoverLift
                      key={index}
                      liftDistance={12}
                      scale={1.05}
                    >
                      <Card className="glass border border-white/10 hover:border-purple-400/30 transition-all duration-500 text-center p-6 rounded-2xl backdrop-blur-md">
                        <CardContent className="p-0">
                          <AnimatedIcon
                            hoverRotation={15}
                            hoverScale={1.3}
                            className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-4 text-purple-400"
                          >
                            <Icon className="w-8 h-8" />
                          </AnimatedIcon>

                          <div className="text-3xl sm:text-xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                            {number}+
                          </div>

                          <div className="text-gray-300 font-medium text-sm md:text-base">
                            {label}
                          </div>
                        </CardContent>
                      </Card>
                    </HoverLift>
                  ),
                )}
              </StaggeredReveal>

              {/* CTA Buttons */}
              <ScrollReveal variant="fadeUp" delay={1.4}>
                <div className="flex flex-col sm:flex-row gap-6">
                  <RippleButton
                    onClick={() =>
                      (window.location.hash = "/contact")
                    }
                    className="group inline-flex items-center gap-3 px-10 py-5 text-white text-base md:text-lg font-semibold rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-xl hover:shadow-pink-500/30 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-400"
                    variant="primary"
                    aria-label="Start your project"
                  >
                    <Sparkles className="w-5 h-5 transition-transform group-hover:rotate-6 group-hover:scale-110" />
                    <span>Start Your Project</span>
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </RippleButton>

                  <RippleButton
                    onClick={() =>
                      (window.location.hash = "/portfolio")
                    }
                    className="group inline-flex items-center gap-3 px-10 py-5 text-white text-base md:text-lg font-semibold rounded-xl border border-white/20 backdrop-blur-md bg-white/5 hover:bg-white/10 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/30"
                    variant="outline"
                    aria-label="View Portfolio"
                  >
                    <Eye className="w-5 h-5 transition-transform group-hover:scale-110" />
                    <span>View Portfolio</span>
                  </RippleButton>
                </div>
              </ScrollReveal>
            </div>

            {/* Right Content - Enhanced Showcase */}
          </div>
        </div>

        {/* Scroll Indicator */}
        <ScrollReveal variant="fadeUp" delay={2.0}>
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <motion.div
              className="w-8 h-12 border-2 border-white/40 rounded-full flex justify-center p-2 cursor-pointer"
              animate={{ y: [0, 8, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <motion.div
                className="w-1.5 h-4 gradient-electric rounded-full"
                animate={{ scaleY: [1, 0.3, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </div>
        </ScrollReveal>
      </section>
      <section>
        <HeroSection />
      </section>

      {/* Video Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Glass Background Strip */}
        <div className="absolute inset-0">
          <div className="w-full h-full bg-white/5 backdrop-blur-md border-t border-b border-white/10" />
        </div>

        <div className="relative container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/*  Left Content */}
            <ScrollReveal variant="fadeLeft" delay={0.3}>
              <div className="space-y-6">
                <h2 className="text-4xl font-bold text-white">
                  Watch Our Creative Process
                </h2>
                <p className="text-lg text-gray-300 max-w-md">
                  Dive behind the scenes and see how we bring
                  ideas to life from concept to code, and
                  everything in between.
                </p>
                <button
                  onClick={() =>
                    (window.location.hash = "/about")
                  }
                  className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-white/10 text-white font-medium backdrop-blur hover:bg-white/20 transition"
                >
                  Learn More
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </ScrollReveal>

            {/*  Right Video Preview */}
            <ScrollReveal variant="scale" delay={0.6}>
              <div className="relative">
                <div className="flex-1 w-full max-w-lg">
                  <VideoHoverLift />
                </div>

                {/* Floating Element */}
                <motion.div
                  className="absolute -top-6 -right-6 w-24 h-24 gradient-electric rounded-full flex items-center justify-center"
                  animate={{
                    rotate: 360,
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    rotate: {
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    },
                    scale: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }}
                >
                  <Play className="w-8 h-8 text-white" />
                </motion.div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Interactive Services Section */}
      <section
        ref={servicesRef}
        className="py-12  relative overflow-hidden"
      >
        <Parallax speed={0.2} className="absolute inset-0">
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
        </Parallax>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <ScrollReveal variant="fadeUp">
            <div className="text-center mb-20">
              <div className="inline-flex items-center space-x-3 glass rounded-full px-6 py-3 mb-8 border border-white/20">
                <Zap className="w-5 h-5 text-purple-400" />
                <span className="font-medium text-gray-200">
                  Our Expertise
                </span>
              </div>

              <h2 className="font-outfit text-4xl lg:text-5xl font-bold mb-8 leading-tight">
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Services That
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  Deliver Results
                </span>
              </h2>
            </div>
          </ScrollReveal>

          {/* Interactive Service Cards */}
          <StaggeredReveal
            staggerDelay={0.2}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {services.slice(0, 3).map((service, index) => (
              <MagneticHover key={service.id} strength={0.2}>
                <Card
                  className={`glass border transition-all duration-500 h-full cursor-pointer group ${
                    activeService === index
                      ? "border-purple-400/50 bg-purple-500/10"
                      : "border-white/10 hover:border-white/30"
                  }`}
                  onMouseEnter={() => {
                    setActiveService(index);
                    setIsHovered(true);
                  }}
                  onMouseLeave={() => {
                    setIsHovered(false);
                  }}
                >
                  <CardContent className="p-8 text-center">
                    {/* Animated Icon */}
                    <motion.div
                      className="w-20 h-20 mx-auto mb-6 gradient-electric rounded-2xl flex items-center justify-center"
                      animate={
                        activeService === index
                          ? {
                              scale: [1, 1.1, 1],
                              rotate: [0, 5, 0],
                            }
                          : {}
                      }
                      transition={{ duration: 0.5 }}
                    >
                      {(() => {
                        const IconComponent = getServiceIcon(
                          service.icon,
                        );
                        return (
                          <IconComponent className="w-10 h-10 text-white" />
                        );
                      })()}
                    </motion.div>

                    <h3 className="font-outfit text-2xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors duration-300">
                      {service.title}
                    </h3>

                    <p className="text-gray-300 leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Feature List */}
                    <ul className="space-y-2 mb-8">
                      {service.features
                        .slice(0, 3)
                        .map((feature, idx) => (
                          <motion.li
                            key={idx}
                            className="flex items-center space-x-2 text-sm text-gray-300"
                            initial={{ opacity: 0, x: -20 }}
                            animate={
                              activeService === index
                                ? { opacity: 1, x: 0 }
                                : { opacity: 0.7, x: 0 }
                            }
                            transition={{ delay: idx * 0.1 }}
                          >
                            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                            <span>{feature}</span>
                          </motion.li>
                        ))}
                    </ul>

                    <RippleButton
                      className="group w-full py-3 px-6 flex items-center justify-center gap-2 rounded-xl font-semibold text-white gradient-electric-to-r from-purple-500 to-pink-500 hover:shadow-lg hover:shadow-pink-500/20 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-400"
                      variant="primary"
                      aria-label="Learn more"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </RippleButton>
                  </CardContent>
                </Card>
              </MagneticHover>
            ))}
          </StaggeredReveal>
        </div>
      </section>

      {/* Portfolio Showcase with Advanced Animations */}
      <section
        ref={portfolioRef}
        className="py-12 relative overflow-hidden bg-gradient-to-b from-slate-950 to-purple-950/20"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <ScrollReveal variant="fadeUp">
            <div className="text-center mb-20">
              <div className="inline-flex items-center space-x-3 glass rounded-full px-6 py-3 mb-8 border border-white/20">
                <Award className="w-5 h-5 text-purple-400" />
                <span className="font-medium text-gray-200">
                  Featured Work
                </span>
              </div>

              <h2 className="font-outfit text-4xl lg:text-5xl font-bold mb-8 leading-tight">
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Projects That
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  Transform Businesses
                </span>
              </h2>
            </div>
          </ScrollReveal>

          {/* Portfolio Grid */}
          <StaggeredReveal
            staggerDelay={0.3}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {featuredProjects.map((project, index) => (
              <HoverLift
                key={project.id}
                liftDistance={20}
                scale={1.03}
              >
                <Card className="glass border border-white/10 hover:border-purple-400/30 transition-all duration-700 overflow-hidden group cursor-pointer">
                  <div className="relative overflow-hidden">
                    <motion.div
                      className="relative h-64"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.7 }}
                    >
                      <ImageWithFallback
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Hover Actions */}
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100"
                        initial={{ y: 20 }}
                        whileHover={{ y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="flex space-x-3">
                          <RippleButton
                            className="group relative flex items-center gap-2 px-4 py-2 rounded-md border border-white/20 text-white transition-all duration-200 backdrop-blur-md bg-white/5 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
                            variant="outline"
                            aria-label="View details"
                          >
                            <Eye className="w-4 h-4 transition-transform group-hover:scale-105" />
                            <span>View</span>
                          </RippleButton>

                          <RippleButton
                            className="group relative flex items-center gap-2 px-4 py-2 rounded-md border border-white/20 text-white transition-all duration-200 backdrop-blur-md bg-white/5 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
                            variant="outline"
                            aria-label="View details"
                          >
                            <Eye className="w-4 h-4 transition-transform group-hover:scale-105" />
                            <span>Live</span>
                          </RippleButton>
                        </div>
                      </motion.div>
                    </motion.div>
                  </div>

                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Badge className="gradient-electric text-white border-0">
                        {project.category}
                      </Badge>
                      <div className="flex items-center space-x-1 text-green-400">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-sm font-bold">
                          {project.metrics?.increase || "150%"}
                        </span>
                      </div>
                    </div>

                    <h3 className="font-outfit text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                      {project.title}
                    </h3>

                    <p className="text-gray-300 text-sm leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                  </CardContent>
                </Card>
              </HoverLift>
            ))}
          </StaggeredReveal>

          {/* View All Button */}
          <ScrollReveal variant="fadeUp" delay={0.8}>
            <div className="text-center mt-16">
              <RippleButton
                onClick={() =>
                  (window.location.hash = "/portfolio")
                }
                className="group relative inline-flex items-center justify-center px-10 py-5 rounded-2xl font-semibold text-white text-base md:text-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-xl hover:shadow-pink-500/30 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-400"
                variant="primary"
                aria-label="View all projects"
              >
                <span>View All Projects</span>
                <ArrowRight className="w-5 h-5 ml-3 transition-transform group-hover:translate-x-1" />
              </RippleButton>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Creative Web Agency Section */}
      <CreativeWebAgencySection />
      <section>
        <DesignProcessSection />
      </section>
      {/* Clients Across Industries Section */}
      <ClientsIndustriesSection />

      {/* CMS Platform Section */}
      <CMSPlatformSection />

      {/* Custom Web Design Pricing Section */}
      <CustomWebDesignPricingSection />

      {/* Featured Website Redesigns Section */}
      <FeaturedWebsiteRedesignsSection />
      
      <DigitalTrendsSection/>
      {/* Enhanced Testimonials with Right-to-Left Animation */}
      <TestimonialMarquee
        featuredTestimonials={featuredTestimonials}
      />

      {/* Enhanced Service Cards Marquee */}
      <ServiceCardsMarquee />
    </div>
  );
}