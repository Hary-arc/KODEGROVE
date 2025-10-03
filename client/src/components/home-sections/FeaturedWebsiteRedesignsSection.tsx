"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  ExternalLink,
  TrendingUp,
  Zap,
} from "lucide-react";
import { Button } from '../ui/button'
//import { Link } from 'react-router-dom';
//import { createPageUrl } from '@/utils';

const clientLogos = [
  { name: "BlueRidge", logo: "/logos/blueridge.png" },
  { name: "Integral", logo: "/logos/integral.jpg" },
  { name: "Legacy", logo: "/logos/legacy.png" },
  { name: "RiverChurch", logo: "/logos/riverchurch.png" },
  { name: "ViTech", logo: "/logos/vitech.jpg" },
];

const redesignProjects = [
  {
    before:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072",
    after:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070",
    title: "University Website Transformation",
    description:
      "A complete redesign focusing on usability, accessibility, and brand modernization.",
    stat: "+285% Engagement",
    client: "Blueridge",
    category: "Education",
    duration: "6 months",
  },
  {
    before:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072",
    after:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070",
    title: "Food Brand Digital Refresh",
    description:
      "Elevated their digital presence with vibrant visuals and a streamlined UX.",
    stat: "+173% Conversions",
    client: "Integral",
    category: "Food & Beverage",
    duration: "4 months",
  },
  {
    before:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072",
    after:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070",
    title: "Food Brand Digital Refresh",
    description:
      "Elevated their digital presence with vibrant visuals and a streamlined UX.",
    stat: "+173% Conversions",
    client: "Legacy",
    category: "Food & Beverage",
    duration: "4 months",
  },
  {
    before:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072",
    after:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070",
    title: "Food Brand Digital Refresh",
    description:
      "Elevated their digital presence with vibrant visuals and a streamlined UX.",
    stat: "+173% Conversions",
    client: "Riverchurch",
    category: "Food & Beverage",
    duration: "4 months",
  },

  {
    before:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072",
    after:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070",
    title: "Food Brand Digital Refresh",
    description:
      "Elevated their digital presence with vibrant visuals, streamlined UX, and immersive product showcases.",
    stat: "+173% Conversions",
    client: "Gourmet Foods Co.",
    category: "Food & Beverage",
    duration: "4 months",
  },
];

export default function FeaturedWebsiteRedesignsSection() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-scroll functionality
  useEffect(() => {
    if (!mounted || isHovering) return;

    const interval = setInterval(() => {
      setActiveIndex(
        (prev) => (prev + 1) % redesignProjects.length,
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [mounted, isHovering]);

  // Scroll slider to specific index
  const scrollToIndex = (newIndex: number) => {
    if (!sliderRef.current) return;
    const slider = sliderRef.current;
    const card = slider.children[newIndex];
    if (!card) return;

    const cardEl = card as HTMLElement;
    const left =
      cardEl.offsetLeft -
      (slider.clientWidth - cardEl.clientWidth) / 2;
    slider.scrollTo({ left, behavior: "smooth" });
    setActiveIndex(newIndex);
  };

  // Update activeIndex on manual scroll
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const handleScroll = () => {
      const children = Array.from(slider.children);
      const center = slider.scrollLeft + slider.offsetWidth / 2;
      const newIndex = children.findIndex((child) => {
        const el = child as HTMLElement;
        return (
          el.offsetLeft <= center &&
          el.offsetLeft + el.offsetWidth > center
        );
      });
      if (newIndex !== -1 && newIndex !== activeIndex)
        setActiveIndex(newIndex);
    };

    slider.addEventListener("scroll", handleScroll, {
      passive: true,
    });
    return () =>
      slider.removeEventListener("scroll", handleScroll);
  }, [activeIndex]);

  const next = () =>
    scrollToIndex((activeIndex + 1) % redesignProjects.length);
  const prev = () =>
    scrollToIndex(
      (activeIndex - 1 + redesignProjects.length) %
        redesignProjects.length,
    );

  if (!mounted) return null;

  return (
    <section className="relative py-16 sm:py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-blue-950/30 overflow-hidden">
      {/* Enhanced Decorative Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.1, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-3xl"
        />

        {/* Animated Grid Pattern */}
        <div className="relative inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDU5LCAxMzAsIDI0NiwgMC4xKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
      </div>

      {/* Enhanced Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center mb-12 md:mb-16 px-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-3 text-sm font-semibold text-blue-400 mb-6 bg-blue-500/10 px-4 py-2 rounded-full border border-blue-500/20"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <RefreshCw className="w-4 h-4" />
          </motion.div>
          BEFORE & AFTER SHOWCASE
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 mb-6"
        >
          Featured Website Redesigns
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg text-gray-300 max-w-3xl mx-auto mb-2"
        >
          Our web design agency reimagines digital experiences
          for brands of all sizes and industries.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-cyan-400 font-semibold text-lg"
        >
          Explore our redesign portfolio and transformation
          stories.
        </motion.p>
      </motion.div>

      {/* Enhanced Client Logos */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-12 md:mb-16"
      >
        <div className="flex justify-center items-center gap-4 md:gap-8 px-4 flex-wrap">
          {clientLogos.map((client, i) => (
            <motion.button
              key={i}
              onClick={() =>
                scrollToIndex(i % redesignProjects.length)
              }
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{
                scale: 1.1,
                y: -5,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.95 }}
              className={`group relative p-2 sm:p-4 rounded-2xl transition-all duration-300 backdrop-blur-sm border ${
                activeIndex === i % redesignProjects.length
                  ? "bg-blue-500/20 border-blue-500/50 shadow-lg shadow-blue-500/25"
                  : "bg-slate-800/30 border-slate-700/50 hover:bg-slate-700/40 hover:border-slate-600/50"
              }`}
            >
              <img
                src={client.logo}
                alt={client.name}
                className="h-8 md:h-12 object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
              />
              {activeIndex === i % redesignProjects.length && (
                <motion.div
                  layoutId="activeClientIndicator"
                  className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-400 rounded-full"
                />
              )}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Enhanced Slider */}
      <div
        className="relative max-w-7xl mx-auto sm:px-4"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div
          ref={sliderRef}
          className="flex gap-4 sm:gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide px-4 sm:px-0"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {redesignProjects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="snap-center w-[90%] md:w-[700px] lg:w-[800px] bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl flex-shrink-0 group"
            >
              {/* Project Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <motion.div
                    whileHover={{ rotate: 180 }}
                    transition={{ duration: 0.5 }}
                    className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center"
                  >
                    <Zap className="w-6 h-6 text-white" />
                  </motion.div>
                  <div>
                    <p className="text-blue-400 font-semibold">
                      {project.client}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {project.category} • {project.duration}
                    </p>
                  </div>
                </div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-gradient-to-r from-green-400 to-blue-500 text-white text-sm px-4 py-2 rounded-full shadow-lg flex items-center gap-2"
                >
                  <TrendingUp className="w-4 h-4" />
                  {project.stat}
                </motion.div>
              </div>

              {/* Enhanced Images */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Before Image */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative rounded-2xl group/image"
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 z-10" />
                  <img
                    src={project.before}
                    alt="Before redesign"
                    className="w-full h-36 sm:h-64 md:h-80 object-cover rounded-2xl transition-transform duration-500 group-hover/image:scale-105"
                  />
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="relative top-4 left-4 bg-red-500/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full border border-red-400/30"
                  >
                    BEFORE
                  </motion.span>
                  <div className="relative bottom-4 left-4 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 z-20">
                    <p className="text-white text-sm font-medium">
                      Original Design
                    </p>
                    <p className="text-gray-300 text-xs">
                      Legacy Interface
                    </p>
                  </div>
                </motion.div>

                {/* After Image */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative overflow-hidden rounded-2xl group/image"
                >
                  <div className="relative inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 z-10" />
                  <img
                    src={project.after}
                    alt="After redesign"
                    className="w-full h-36 sm:h-64 md:h-80 object-cover rounded-2xl transition-transform duration-500 group-hover/image:scale-105"
                  />
                  <motion.span
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                    className="relative top-4 right-5 bg-green-500/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full border border-green-400/30"
                  >
                    AFTER
                  </motion.span>
                  <div className="relative bottom-4 left-4 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 z-20">
                    <p className="text-white text-sm font-medium">
                      Modern Design
                    </p>
                    <p className="text-gray-300 text-xs">
                      Enhanced UX
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Enhanced Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  {project.description}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <Button
                    onClick={() =>
                      (window.location.hash = "/portfolio")
                    }
                    className="group/btn bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white shadow-lg shadow-blue-500/25 rounded-full px-8 py-3 text-sm font-semibold flex items-center gap-3 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/30"
                  >
                    View Full Case Study
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                      }}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </motion.div>
                  </Button>

                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      Live Project
                    </span>
                    <span>•</span>
                    <span>2024</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Navigation */}
        <motion.button
          onClick={prev}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-1/2 left-2 md:-left-12 transform -translate-y-1/2 p-2 md:p-4 rounded-full bg-gradient-to-r from-blue-600/80 to-indigo-600/80 hover:from-blue-700/90 hover:to-indigo-700/90 backdrop-blur-sm shadow-xl shadow-blue-500/25 border border-blue-400/20 z-20 transition-all duration-300"
          aria-label="Previous project"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white" />
        </motion.button>

        <motion.button
          onClick={next}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-1/2 right-2 md:-right-12 transform -translate-y-1/2 p-2 md:p-4 rounded-full bg-gradient-to-r from-blue-600/80 to-indigo-600/80 hover:from-blue-700/90 hover:to-indigo-700/90 backdrop-blur-sm shadow-xl shadow-blue-500/25 border border-blue-400/20 z-20 transition-all duration-300"
          aria-label="Next project"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
        </motion.button>

        {/* Progress Indicators */}
        <div className="flex justify-center gap-3 mt-12">
          {redesignProjects.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => scrollToIndex(index)}
              whileHover={{ scale: 1.2 }}
              className={`transition-all duration-300 ${
                index === activeIndex
                  ? "w-12 h-3 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"
                  : "w-3 h-3 bg-slate-600 hover:bg-slate-500 rounded-full"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}