"use client";
import React from 'react'
import { useState, useRef } from "react";
import {
  motion,
  useInView,
  AnimatePresence,
} from "framer-motion";
import {
  ChevronDown,
  MapPin,
  Clock,
  Users,
  Star,
  ArrowRight,
  Briefcase,
  Heart,
  Zap,
  Globe,
  Award,
  TrendingUp,
  Coffee,
  Calendar,
} from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import {
  jobPositions,
  companyPerks,
  cultureImages,
  careerStats,
  missionStatement,
} from "../data/careers";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function CareersPage() {
  const [selectedDepartment, setSelectedDepartment] =
    useState<string>("all");
  const [expandedJob, setExpandedJob] = useState<string | null>(
    null,
  );

  const heroRef = useRef(null);
  const jobsRef = useRef(null);
  const cultureRef = useRef(null);
  const perksRef = useRef(null);

  const isHeroInView = useInView(heroRef, {
    once: true,
    amount: 0.2,
  });
  const isJobsInView = useInView(jobsRef, {
    once: true,
    amount: 0.1,
  });
  const isCultureInView = useInView(cultureRef, {
    once: true,
    amount: 0.1,
  });
  const isPerksInView = useInView(perksRef, {
    once: true,
    amount: 0.1,
  });

  const departments = [
    "all",
    ...Array.from(
      new Set(jobPositions.map((job) => job.department)),
    ),
  ];

  const filteredJobs =
    selectedDepartment === "all"
      ? jobPositions
      : jobPositions.filter(
          (job) => job.department === selectedDepartment,
        );

  const featuredJobs = jobPositions.filter(
    (job) => job.featured,
  );

  const formatSalary = (
    min: number,
    max: number,
    currency: string,
  ) => {
    if (currency === "USD" && min >= 1000) {
      return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
    }
    return `$${min}/hr - $${max}/hr`;
  };

  const perkCategories = {
    wellness: {
      icon: Heart,
      color: "text-green-400",
      bg: "bg-green-500/10",
    },
    growth: {
      icon: TrendingUp,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    "work-life": {
      icon: Coffee,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
    },
    financial: {
      icon: Award,
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
    },
  };

  // Animation variants
  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  // Split text into words for animation
  const animateText = (text: string, delay = 0) => {
    return text.split(" ").map((word, index) => (
      <motion.span
        key={index}
        variants={letterVariants}
        initial="hidden"
        animate={isHeroInView ? "visible" : "hidden"}
        transition={{ delay: delay + index * 0.1 }}
        className="inline-block mr-3"
      >
        {word}
      </motion.span>
    ));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-20">
      {/* Animated Hero Section */}
      <section
        ref={heroRef}
        className="relative py-20 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-slate-900 to-cyan-900/30"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

        {/* Animated background elements */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 30, -30, 0],
            y: [0, -20, 20, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -25, 25, 0],
            y: [0, 25, -25, 0],
            scale: [1, 0.8, 1.2, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 text-center">
          {/* Mission badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={
              isHeroInView ? { opacity: 1, scale: 1, y: 0 } : {}
            }
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center space-x-3 glass rounded-full px-8 py-4 mb-12 border border-white/20 hover:border-purple-400/50 transition-all duration-500"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <Briefcase className="w-5 h-5 text-purple-400" />
            </motion.div>
            <span className="font-medium text-gray-200">
              {missionStatement.subtitle}
            </span>
          </motion.div>

          {/* Animated Mission Statement */}
          <div className="font-outfit text-4xl lg:text-6xl font-bold mb-8 leading-tight">
            <motion.h1
              className="mb-4"
              initial="hidden"
              animate={isHeroInView ? "visible" : "hidden"}
            >
              <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
                {animateText("Join Our Mission:", 0.3)}
              </span>
            </motion.h1>
            <motion.h1
              initial="hidden"
              animate={isHeroInView ? "visible" : "hidden"}
              transition={{ delay: 0.8 }}
            >
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                {animateText("Crafting Digital", 0.6)}
              </span>
            </motion.h1>
            <motion.h1
              initial="hidden"
              animate={isHeroInView ? "visible" : "hidden"}
              transition={{ delay: 1.2 }}
            >
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                {animateText("Experiences That Mesmerize", 0.9)}
              </span>
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12"
          >
            {missionStatement.description}
          </motion.p>

          {/* Quick stats */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 1.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {[
              {
                icon: Users,
                label: "Team Members",
                value: careerStats.employeeCount,
              },
              {
                icon: Globe,
                label: "Remote Workers",
                value: `${careerStats.remoteEmployees}%`,
              },
              {
                icon: Star,
                label: "Diversity Rate",
                value: `${careerStats.diversityPercentage}%`,
              },
              {
                icon: TrendingUp,
                label: "Avg. Tenure",
                value: careerStats.averageTenure,
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={
                  isHeroInView ? { opacity: 1, y: 0 } : {}
                }
                transition={{
                  duration: 0.6,
                  delay: 2 + index * 0.1,
                }}
                className="glass rounded-2xl p-6 border border-white/10 hover:border-purple-400/30 transition-all duration-500 text-center"
              >
                <div className="w-12 h-12 mx-auto mb-4 gradient-electric rounded-xl flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="font-outfit text-2xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Values */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 2.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 max-w-6xl mx-auto"
          >
            {missionStatement.values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                animate={
                  isHeroInView ? { opacity: 1, y: 0 } : {}
                }
                transition={{
                  duration: 0.6,
                  delay: 2.7 + index * 0.1,
                }}
                className="text-center"
              >
                <h3 className="font-outfit text-lg font-bold text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Job Listings with Accordion Animation */}
      <section ref={jobsRef} className="relative py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isJobsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-outfit text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Open Positions
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Join our team of innovators and help shape the
              future of digital experiences
            </p>
          </motion.div>

          {/* Department Filter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isJobsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDepartment(dept)}
                className={`px-6 py-3 rounded-full transition-all duration-300 font-medium ${
                  selectedDepartment === dept
                    ? "gradient-electric text-white shadow-lg shadow-purple-500/20"
                    : "glass border border-white/10 text-gray-300 hover:border-white/30 hover:text-white"
                }`}
              >
                {dept === "all" ? "All Departments" : dept}
              </button>
            ))}
          </motion.div>

          {/* Featured Jobs */}
          {selectedDepartment === "all" && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isJobsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-16"
            >
              <h3 className="font-outfit text-2xl font-bold text-white mb-8 text-center">
                Featured Opportunities
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {featuredJobs.map((job, index) => (
                  <motion.div
                    key={job.id}
                    initial={{
                      opacity: 0,
                      x: index % 2 === 0 ? -50 : 50,
                    }}
                    animate={
                      isJobsInView ? { opacity: 1, x: 0 } : {}
                    }
                    transition={{
                      duration: 0.6,
                      delay: 0.6 + index * 0.1,
                    }}
                    className="group relative"
                  >
                    <Card className="glass border border-white/10 hover:border-purple-400/30 transition-all duration-500 h-full relative overflow-hidden">
                      <div className="absolute top-4 right-4">
                        <Badge className="gradient-electric text-white border-0 px-3 py-1">
                          Featured
                        </Badge>
                      </div>

                      <CardContent className="p-8">
                        <div className="flex items-start justify-between mb-6">
                          <div>
                            <h4 className="font-outfit text-xl font-bold text-white mb-2">
                              {job.title}
                            </h4>
                            <div className="flex items-center space-x-4 text-sm text-gray-400">
                              <span className="flex items-center space-x-1">
                                <Briefcase className="w-4 h-4" />
                                <span>{job.department}</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <MapPin className="w-4 h-4" />
                                <span>{job.location}</span>
                              </span>
                              {job.remote && (
                                <Badge
                                  variant="outline"
                                  className="border-green-400/30 text-green-400"
                                >
                                  Remote OK
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>

                        <p className="text-gray-300 leading-relaxed mb-6 line-clamp-3">
                          {job.description}
                        </p>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-400 mb-1">
                              Salary Range
                            </p>
                            <p className="font-outfit font-bold text-white">
                              {formatSalary(
                                job.salary.min,
                                job.salary.max,
                                job.salary.currency,
                              )}
                            </p>
                          </div>
                          <Button
                            className="gradient-electric hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
                            onClick={() =>
                              setExpandedJob(
                                expandedJob === job.id
                                  ? null
                                  : job.id,
                              )
                            }
                          >
                            View Details
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* All Jobs Accordion */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isJobsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h3 className="font-outfit text-2xl font-bold text-white mb-8 text-center">
              All Open Positions ({filteredJobs.length})
            </h3>

            <Accordion
              type="single"
              collapsible
              className="space-y-4"
            >
              {filteredJobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isJobsInView ? { opacity: 1, y: 0 } : {}
                  }
                  transition={{
                    duration: 0.5,
                    delay: 0.8 + index * 0.1,
                  }}
                >
                  <AccordionItem
                    value={job.id}
                    className="glass border border-white/10 rounded-2xl px-6 hover:border-purple-400/30 transition-all duration-500"
                  >
                    <AccordionTrigger className="hover:no-underline py-6">
                      <div className="flex items-center justify-between w-full mr-4">
                        <div className="flex items-center space-x-6">
                          <div className="text-left">
                            <h4 className="font-outfit text-lg font-bold text-white mb-1">
                              {job.title}
                            </h4>
                            <div className="flex items-center space-x-4 text-sm text-gray-400">
                              <span className="flex items-center space-x-1">
                                <Briefcase className="w-4 h-4" />
                                <span>{job.department}</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <Clock className="w-4 h-4" />
                                <span>{job.type}</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <MapPin className="w-4 h-4" />
                                <span>{job.location}</span>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          {job.remote && (
                            <Badge
                              variant="outline"
                              className="border-green-400/30 text-green-400 hidden md:inline-flex"
                            >
                              Remote OK
                            </Badge>
                          )}
                          {job.featured && (
                            <Badge className="gradient-electric text-white border-0 hidden md:inline-flex">
                              Featured
                            </Badge>
                          )}
                          <div className="text-right hidden lg:block">
                            <p className="text-sm text-gray-400">
                              Salary
                            </p>
                            <p className="font-outfit font-bold text-white text-sm">
                              {formatSalary(
                                job.salary.min,
                                job.salary.max,
                                job.salary.currency,
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </AccordionTrigger>

                    <AccordionContent className="pb-6">
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{
                          duration: 0.3,
                          ease: "easeInOut",
                        }}
                        className="space-y-8"
                      >
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                          <div>
                            <h5 className="font-outfit font-bold text-white mb-4">
                              Job Description
                            </h5>
                            <p className="text-gray-300 leading-relaxed mb-6">
                              {job.description}
                            </p>

                            <h5 className="font-outfit font-bold text-white mb-4">
                              Responsibilities
                            </h5>
                            <ul className="space-y-2 text-gray-300">
                              {job.responsibilities.map(
                                (responsibility, idx) => (
                                  <li
                                    key={idx}
                                    className="flex items-start space-x-2"
                                  >
                                    <Zap className="w-4 h-4 text-purple-400 mt-1 flex-shrink-0" />
                                    <span>
                                      {responsibility}
                                    </span>
                                  </li>
                                ),
                              )}
                            </ul>
                          </div>

                          <div>
                            <h5 className="font-outfit font-bold text-white mb-4">
                              Requirements
                            </h5>
                            <ul className="space-y-2 text-gray-300 mb-6">
                              {job.requirements.map(
                                (requirement, idx) => (
                                  <li
                                    key={idx}
                                    className="flex items-start space-x-2"
                                  >
                                    <Star className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
                                    <span>{requirement}</span>
                                  </li>
                                ),
                              )}
                            </ul>

                            {job.niceToHave.length > 0 && (
                              <>
                                <h5 className="font-outfit font-bold text-white mb-4">
                                  Nice to Have
                                </h5>
                                <ul className="space-y-2 text-gray-300 mb-6">
                                  {job.niceToHave.map(
                                    (item, idx) => (
                                      <li
                                        key={idx}
                                        className="flex items-start space-x-2"
                                      >
                                        <Heart className="w-4 h-4 text-pink-400 mt-1 flex-shrink-0" />
                                        <span>{item}</span>
                                      </li>
                                    ),
                                  )}
                                </ul>
                              </>
                            )}

                            <h5 className="font-outfit font-bold text-white mb-4">
                              Benefits
                            </h5>
                            <ul className="space-y-2 text-gray-300">
                              {job.benefits
                                .slice(0, 4)
                                .map((benefit, idx) => (
                                  <li
                                    key={idx}
                                    className="flex items-start space-x-2"
                                  >
                                    <Award className="w-4 h-4 text-yellow-400 mt-1 flex-shrink-0" />
                                    <span>{benefit}</span>
                                  </li>
                                ))}
                            </ul>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-6 border-t border-white/10">
                          <div>
                            <p className="text-sm text-gray-400 mb-1">
                              Salary Range
                            </p>
                            <p className="font-outfit text-xl font-bold text-white">
                              {formatSalary(
                                job.salary.min,
                                job.salary.max,
                                job.salary.currency,
                              )}
                            </p>
                          </div>
                          <Button
                            size="lg"
                            className="gradient-electric hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300 hover:scale-105"
                          >
                            Apply Now
                            <ArrowRight className="w-5 h-5 ml-2" />
                          </Button>
                        </div>
                      </motion.div>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* Culture Section with Photo Hover Effects */}
      <section
        ref={cultureRef}
        className="relative py-20 bg-gradient-to-b from-slate-950 to-purple-950/20"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={
              isCultureInView ? { opacity: 1, y: 0 } : {}
            }
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-outfit text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Our Culture
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Experience the energy, creativity, and
              collaboration that makes CodeFlow an extraordinary
              place to work
            </p>
          </motion.div>

          {/* Culture Images Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isCultureInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {cultureImages.map((image, index) => (
              <motion.div
                key={image.id}
                variants={itemVariants}
                className="group relative overflow-hidden rounded-2xl aspect-square cursor-pointer"
              >
                <ImageWithFallback
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="font-outfit text-lg font-bold text-white mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {image.title}
                  </h3>
                  <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                    {image.description}
                  </p>

                  {/* Category Badge */}
                  <Badge
                    variant="outline"
                    className="absolute top-4 right-4 border-white/30 text-white bg-black/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300"
                  >
                    {image.category}
                  </Badge>
                </div>

                {/* Zoom effect overlay */}
                <div className="absolute inset-0 bg-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Company Perks with Animated Icons */}
      <section ref={perksRef} className="relative py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isPerksInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-outfit text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Why You'll Love
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Working Here
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We believe that amazing work comes from amazing
              people in an amazing environment
            </p>
          </motion.div>

          {/* Perks Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isPerksInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {companyPerks.map((perk, index) => {
              const categoryConfig =
                perkCategories[perk.category];
              const IconComponent = categoryConfig.icon;

              return (
                <motion.div
                  key={perk.id}
                  variants={itemVariants}
                  className="group relative"
                >
                  <Card className="glass border border-white/10 hover:border-purple-400/30 transition-all duration-500 h-full relative overflow-hidden">
                    <CardContent className="p-6 text-center">
                      {/* Animated Icon */}
                      <motion.div
                        className={`w-16 h-16 mx-auto mb-4 ${categoryConfig.bg} ${categoryConfig.color} rounded-2xl flex items-center justify-center relative overflow-hidden`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div
                          animate={{
                            y: [0, -2, 0],
                            rotate: [0, 2, -2, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: index * 0.2,
                          }}
                        >
                          <IconComponent className="w-8 h-8" />
                        </motion.div>

                        {/* Animated background glow */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-2xl opacity-0 group-hover:opacity-100"
                          transition={{ duration: 0.5 }}
                        />
                      </motion.div>

                      {/* Emoji */}
                      <motion.div
                        className="text-3xl mb-4"
                        animate={{
                          scale: [1, 1.2, 1],
                          rotate: [0, 10, -10, 0],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.3,
                        }}
                      >
                        {perk.icon}
                      </motion.div>

                      <h3 className="font-outfit text-lg font-bold text-white mb-3 group-hover:text-purple-400 transition-colors duration-300">
                        {perk.title}
                      </h3>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {perk.description}
                      </p>

                      {/* Hover shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isPerksInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center mt-16"
          >
            <h3 className="font-outfit text-2xl font-bold text-white mb-6">
              Ready to Join Our Journey?
            </h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Don't see the perfect role? We're always looking
              for exceptional talent to join our mission.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="gradient-electric hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300 hover:scale-105"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Schedule a Chat
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="group inline-flex items-center justify-center gap-2 px-6 py-4 text-black font-medium border border-white/20  hover:text-white/40 hover:border-white/40 hover:bg-white/10 backdrop-blur-md transition-all duration-300 ease-in-out rounded-xl focus:outline-none focus:ring-2 focus:ring-white/30"
                aria-label="Send Your Resume"
              >
                Send Your Resume
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}