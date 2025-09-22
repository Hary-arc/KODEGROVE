"use client";

import { useState, useRef, useEffect } from "react";

import {
  motion,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";

import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  ArrowLeft,
  ExternalLink,
  Play,
  Pause,
  ArrowUpRight,
  Users,
  TrendingUp,
  Award,
  Clock,
  Target,
  Lightbulb,
  Smartphone,
  Monitor,
  Tablet,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Calendar,
  Building,
  CheckCircle,
  Star,
  Globe,
  Zap,
  Shield,
} from "lucide-react";
import {
  projects,
  portfolioTabs,
  getProjectsByCategory,
} from "../data/portfolio";
interface CaseStudyDetailProps {
  project: {
    id: number;
    title: string;
    category: string;
    type: string;
    description: string;
    image: string;
    technologies: string[];
    results: Array<{ metric: string; label: string }>;
    featured: boolean;
    gradient: string;
    size: string;
    // Core project data
    client?: string;
    year?: string;
    duration?: string;
    challenges?: string[];
    metrics: { increase: string; metric: string };
    // Enhanced case study fields from portfolio data
    fullDescription?: string;
    challenge?: string;
    solution?: string;
    outcome?: string;
    timeline?: string;
    team?: string[];
    testimonial?: {
      quote: string;
      author: string;
      role: string;
      company: string;
    };
    gallery?: string[];
    videoUrl?: string;
    link?: string;
    demoLink?: string;
  };
  onBack: () => void;
}

export function CaseStudyDetail({
  project,
  onBack,
}: CaseStudyDetailProps) {
  const [currentGalleryIndex, setCurrentGalleryIndex] =
    useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<
    "desktop" | "tablet" | "mobile"
  >("desktop");
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null);
  const challengeRef = useRef<HTMLDivElement>(null);
  const solutionRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const testimonialRef = useRef<HTMLDivElement>(null);

  const heroInView = useInView(heroRef, {
    once: true,
    amount: 0.3,
  });
  const overviewInView = useInView(overviewRef, {
    once: true,
    amount: 0.3,
  });
  const challengeInView = useInView(challengeRef, {
    once: true,
    amount: 0.3,
  });
  const solutionInView = useInView(solutionRef, {
    once: true,
    amount: 0.3,
  });
  const resultsInView = useInView(resultsRef, {
    once: true,
    amount: 0.3,
  });
  const testimonialInView = useInView(testimonialRef, {
    once: true,
    amount: 0.3,
  });

  const { scrollYProgress } = useScroll({
    container: containerRef,
    offset: ["start start", "end start"],
  });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  
  const heroY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -200],
  );
  const heroOpacity = useTransform(
    scrollYProgress,
    [0, 0.5],
    [1, 0],
  );

  // Ensure we have data - use actual project data directly
  const caseStudyData = {
    ...project,
    fullDescription:
      project.fullDescription || project.description,
    timeline:
      project.timeline || project.duration || "6 months",
    team: project.team || [
      "UX/UI Designer",
      "Frontend Developer",
      "Backend Developer",
      "DevOps Engineer",
    ],
    gallery: project.gallery || [project.image],
    // Use project results directly - they should already be in the correct format from PortfolioSection
    results: project.results || [
      {
        metric: project.metrics?.increase || "100%",
        label: project.metrics?.metric || "Growth",
      },
    ],
  };

  

  const deviceFrames = {
    desktop: {
      width: "w-full",
      height: "h-96",
      scale: "scale-100",
    },
    tablet: {
      width: "w-80",
      height: "h-96",
      scale: "scale-95",
    },
    mobile: {
      width: "w-60",
      height: "h-96",
      scale: "scale-90",
    },
  };

  useEffect(() => {
    scrollYProgress.on("change", (v) => {
      console.log("ScrollYProgress:", v);
    });
  }, [scrollYProgress]);
  
  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-slate-950  overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}

      {!caseStudyData ? (
        <div className="text-white p-10">
          Loading Case Study Data...
        </div>
      ) : (
        <motion.section
          ref={heroRef}
          className="relative h-screen flex items-center justify-center overflow-hidden"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          {/* Background */}
          <div className="absolute inset-0">
            {caseStudyData.videoUrl && isVideoPlaying ? (
              <div className="w-full h-full bg-black flex items-center justify-center">
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster={caseStudyData.image} // fallback
                >
                  <source
                    src={caseStudyData.videoUrl}
                    type="video/mp4"
                  />
                </video>
              </div>
            ) : (
              <ImageWithFallback
                src={caseStudyData.image}
                alt={caseStudyData.title}
                className="w-full h-full object-cover scale-105"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
            <div
              className={`absolute inset-0 bg-gradient-to-r ${caseStudyData.gradient} opacity-20`}
            />
          </div>

          {/* Navigation */}
          <motion.div
            className="absolute top-20 left-8 z-20"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Button
              onClick={onBack}
              variant="outline"
              className="glass border-white/20 text-white hover:bg-white/10 backdrop-blur-xl text-lg px-6 py-3"
            >
              <ArrowLeft className="w-5 h-5 mr-3" />
              Back to Portfolio
            </Button>
          </motion.div>

          {/* Video Play Button */}
          {caseStudyData.videoUrl && (
            <motion.button
              onClick={() => setIsVideoPlaying(!isVideoPlaying)}
              className="absolute top-8 right-8 z-20 glass rounded-full p-4 border border-white/20 text-white hover:bg-white/10 backdrop-blur-xl transition-all duration-300"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isVideoPlaying ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6 ml-1" />
              )}
            </motion.button>
          )}

          {/* Hero Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <div className="flex items-center justify-center space-x-4 mb-8">
                <Badge className="gradient-electric text-white border-0 px-6 py-2 text-lg">
                  {caseStudyData.category}
                </Badge>
                {caseStudyData.year && (
                  <Badge
                    variant="outline"
                    className="border-white/30 text-white px-6 py-2 text-lg"
                  >
                    {caseStudyData.year}
                  </Badge>
                )}
              </div>

              <h1 className="font-outfit text-6xl lg:text-8xl font-bold mb-8 leading-tight">
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  {caseStudyData.title}
                </span>
              </h1>

              <p className="text-2xl text-gray-300 max-w-5xl mx-auto mb-12 leading-relaxed">
                {caseStudyData.fullDescription}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-8">
                {caseStudyData.link && (
                  <Button
                    size="lg"
                    className="gradient-electric text-white px-10 py-4 rounded-2xl font-semibold relative overflow-hidden group magnetic text-lg"
                  >
                    <span className="relative z-10 flex items-center space-x-3">
                      <Globe className="w-6 h-6" />
                      <span>Visit Live Site</span>
                      <ArrowUpRight className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                    </span>
                  </Button>
                )}

                {caseStudyData.demoLink && (
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 backdrop-blur-xl px-10 py-4 rounded-2xl font-semibold text-lg"
                  >
                    <Play className="w-6 h-6 mr-3" />
                    View Demo
                  </Button>
                )}
              </div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 1,
              repeat: Infinity,
              repeatType: "reverse",
              duration: 2,
            }}
          >
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce" />
            </div>
          </motion.div>
        </motion.section>
      )}
      {/* Project Overview Section */}
      <section ref={overviewRef} className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 60 }}
            animate={overviewInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
          >
            <h2 className="font-outfit text-5xl font-bold text-white mb-6">
              Project{" "}
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Overview
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-16">
            {/* Client */}
            {caseStudyData.client && (
              <motion.div
                className="glass rounded-2xl p-8 border border-white/10 text-center"
                initial={{ opacity: 0, y: 50 }}
                animate={
                  overviewInView ? { opacity: 1, y: 0 } : {}
                }
                transition={{ duration: 0.8 }}
              >
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mx-auto mb-4">
                  <Building className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="font-outfit font-bold text-white mb-2 text-xl">
                  Client
                </h3>
                <p className="text-gray-300 text-lg">
                  {caseStudyData.client}
                </p>
              </motion.div>
            )}

            {/* Timeline */}
            <motion.div
              className="glass rounded-2xl p-8 border border-white/10 text-center"
              initial={{ opacity: 0, y: 50 }}
              animate={
                overviewInView ? { opacity: 1, y: 0 } : {}
              }
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="font-outfit font-bold text-white mb-2 text-xl">
                Timeline
              </h3>
              <p className="text-gray-300 text-lg">
                {caseStudyData.timeline}
              </p>
            </motion.div>

            {/* Team Size */}
            <motion.div
              className="glass rounded-2xl p-8 border border-white/10 text-center"
              initial={{ opacity: 0, y: 50 }}
              animate={
                overviewInView ? { opacity: 1, y: 0 } : {}
              }
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="font-outfit font-bold text-white mb-2 text-xl">
                Team
              </h3>
              <p className="text-gray-300 text-lg">
                {caseStudyData.team.length} Experts
              </p>
            </motion.div>

            {/* Year */}
            {caseStudyData.year && (
              <motion.div
                className="glass rounded-2xl p-8 border border-white/10 text-center"
                initial={{ opacity: 0, y: 50 }}
                animate={
                  overviewInView ? { opacity: 1, y: 0 } : {}
                }
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-6 h-6 text-pink-400" />
                </div>
                <h3 className="font-outfit font-bold text-white mb-2 text-xl">
                  Year
                </h3>
                <p className="text-gray-300 text-lg">
                  {caseStudyData.year}
                </p>
              </motion.div>
            )}
          </div>

          {/* Team Members */}
          <motion.div
            className="glass rounded-3xl p-12 border border-white/10 relative overflow-hidden"
            initial={{ opacity: 0, y: 60 }}
            animate={overviewInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-cyan-500/5" />

            <div className="relative z-10">
              <h3 className="font-outfit text-3xl font-bold text-white mb-8 text-center">
                Expert Team
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {caseStudyData.team.map((member, index) => (
                  <motion.div
                    key={member}
                    className="text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={
                      overviewInView
                        ? { opacity: 1, scale: 1 }
                        : {}
                    }
                    transition={{
                      duration: 0.5,
                      delay: 0.5 + index * 0.1,
                    }}
                  >
                    <div className="w-16 h-16 rounded-2xl glass border border-white/20 flex items-center justify-center mx-auto mb-3 hover:scale-110 transition-transform duration-300">
                      <Zap className="w-8 h-8 text-purple-400" />
                    </div>
                    <p className="text-gray-300 text-sm font-medium">
                      {member}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Challenge & Solution Section */}
      {(caseStudyData.challenge || caseStudyData.solution) && (
        <section className="py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-purple-950/10 to-slate-950" />

          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Challenge */}
              {caseStudyData.challenge && (
                <motion.div
                  ref={challengeRef}
                  initial={{ opacity: 0, x: -100 }}
                  animate={
                    challengeInView ? { opacity: 1, x: 0 } : {}
                  }
                  transition={{ duration: 1 }}
                >
                  <div className="glass rounded-3xl p-12 border border-white/10 h-full relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent" />

                    <div className="relative z-10">
                      <div className="flex items-center space-x-4 mb-8">
                        <div className="w-16 h-16 rounded-2xl bg-red-500/20 flex items-center justify-center">
                          <Target className="w-8 h-8 text-red-400" />
                        </div>
                        <h3 className="font-outfit text-4xl font-bold text-white">
                          The Challenge
                        </h3>
                      </div>

                      <p className="text-gray-300 text-xl leading-relaxed mb-8">
                        {caseStudyData.challenge}
                      </p>

                      {/* Key Challenges */}
                      {caseStudyData.challenges &&
                        caseStudyData.challenges.length > 0 && (
                          <div className="space-y-4">
                            <h4 className="font-outfit text-xl font-semibold text-white mb-4">
                              Key Challenges:
                            </h4>
                            {caseStudyData.challenges.map(
                              (challenge, index) => (
                                <motion.div
                                  key={challenge}
                                  className="flex items-start space-x-3"
                                  initial={{
                                    opacity: 0,
                                    x: -20,
                                  }}
                                  animate={
                                    challengeInView
                                      ? { opacity: 1, x: 0 }
                                      : {}
                                  }
                                  transition={{
                                    duration: 0.5,
                                    delay: 0.5 + index * 0.1,
                                  }}
                                >
                                  <div className="w-2 h-2 rounded-full bg-red-400 mt-3 flex-shrink-0" />
                                  <p className="text-gray-300 text-lg">
                                    {challenge}
                                  </p>
                                </motion.div>
                              ),
                            )}
                          </div>
                        )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Solution */}
              {caseStudyData.solution && (
                <motion.div
                  ref={solutionRef}
                  initial={{ opacity: 0, x: 100 }}
                  animate={
                    solutionInView ? { opacity: 1, x: 0 } : {}
                  }
                  transition={{ duration: 1, delay: 0.2 }}
                >
                  <div className="glass rounded-3xl p-12 border border-white/10 h-full relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent" />

                    <div className="relative z-10">
                      <div className="flex items-center space-x-4 mb-8">
                        <div className="w-16 h-16 rounded-2xl bg-green-500/20 flex items-center justify-center">
                          <Lightbulb className="w-8 h-8 text-green-400" />
                        </div>
                        <h3 className="font-outfit text-4xl font-bold text-white">
                          Our Solution
                        </h3>
                      </div>

                      <p className="text-gray-300 text-xl leading-relaxed mb-8">
                        {caseStudyData.solution}
                      </p>

                      {/* Technologies */}
                      <div className="space-y-4">
                        <h4 className="font-outfit text-xl font-semibold text-white mb-4">
                          Technologies Used:
                        </h4>
                        <div className="flex flex-wrap gap-3">
                          {caseStudyData.technologies.map(
                            (tech, index) => (
                              <motion.span
                                key={tech}
                                className="px-4 py-2 glass border border-white/20 text-gray-300 rounded-xl hover:border-green-400/40 transition-colors duration-300 font-medium"
                                initial={{
                                  opacity: 0,
                                  scale: 0.8,
                                }}
                                animate={
                                  solutionInView
                                    ? { opacity: 1, scale: 1 }
                                    : {}
                                }
                                transition={{
                                  duration: 0.5,
                                  delay: 0.5 + index * 0.1,
                                }}
                                whileHover={{ scale: 1.05 }}
                              >
                                {tech}
                              </motion.span>
                            ),
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </section>
      )}
      {/* Interactive Gallery Section */}
      {caseStudyData.gallery &&
        caseStudyData.gallery.length > 1 && (
          <section className="py-24 relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(139,92,246,0.1),transparent_70%)]" />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
              <motion.div
                className="text-center mb-20"
                initial={{ opacity: 0, y: 60 }}
                animate={
                  solutionInView ? { opacity: 1, y: 0 } : {}
                }
                transition={{ duration: 1 }}
              >
                <h3 className="font-outfit text-5xl font-bold text-white mb-6">
                  Project{" "}
                  <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    Gallery
                  </span>
                </h3>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Explore the design across all devices with our
                  interactive gallery
                </p>
              </motion.div>

              {/* Device Selector */}
              <div className="flex justify-center space-x-6 mb-16">
                {[
                  {
                    id: "desktop",
                    icon: Monitor,
                    label: "Desktop",
                  },
                  {
                    id: "tablet",
                    icon: Tablet,
                    label: "Tablet",
                  },
                  {
                    id: "mobile",
                    icon: Smartphone,
                    label: "Mobile",
                  },
                ].map((device) => (
                  <motion.button
                    key={device.id}
                    onClick={() =>
                      setSelectedDevice(device.id as any)
                    }
                    className={`flex items-center space-x-3 sm: space-x-2 px-4 sm:px-8 py-2 sm:py-4 rounded-2xl transition-all duration-300 text-lg font-semibold ${
                      selectedDevice === device.id
                        ? "gradient-electric text-white"
                        : "glass border border-white/20 text-gray-300 hover:text-white hover:border-white/40"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <device.icon className="w-6 h-6" />
                    <span>{device.label}</span>
                  </motion.button>
                ))}
              </div>

              {/* Device Mockup */}
              <div className="flex justify-center">
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  key={selectedDevice}
                >
                  <div
                    className={`relative ${deviceFrames[selectedDevice].width} ${deviceFrames[selectedDevice].height} mx-auto max-w-4xl`}
                  >
                    <div
                      className="glass rounded-3xl border border-white/20 p-6 h-full relative overflow-hidden group cursor-pointer"
                      onClick={() => setIsGalleryOpen(true)}
                    >
                      <ImageWithFallback
                        src={
                          caseStudyData.gallery[
                            currentGalleryIndex
                          ]
                        }
                        alt={`${caseStudyData.title} ${selectedDevice} view`}
                        className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />
                      <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-white font-semibold text-lg">
                          Click to expand gallery
                        </span>
                        <Maximize2 className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Gallery Navigation */}
                  {caseStudyData.gallery.length > 1 && (
                    <div className="flex justify-center space-x-3 mt-8">
                      {caseStudyData.gallery.map((_, index) => (
                        <button
                          key={index}
                          onClick={() =>
                            setCurrentGalleryIndex(index)
                          }
                          className={`w-4 h-4 rounded-full transition-all duration-300 ${
                            index === currentGalleryIndex
                              ? "bg-purple-400 scale-125"
                              : "bg-white/30 hover:bg-white/50"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          </section>
        )}
      {/* Results Section */}
      <section ref={resultsRef} className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-cyan-950/10 to-slate-950" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 60 }}
            animate={resultsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
          >
            <div className="flex items-center justify-center space-x-4 mb-8">
              <div className="w-16 h-16 rounded-2xl gradient-electric flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-outfit text-5xl font-bold text-white">
                Measurable{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Results
                </span>
              </h3>
            </div>
            {caseStudyData.outcome && (
              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                {caseStudyData.outcome}
              </p>
            )}
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {caseStudyData.results.map((result, index) => (
              <motion.div
                key={index}
                className="glass rounded-3xl p-12 border border-white/10 text-center relative overflow-hidden group hover-glow"
                initial={{ opacity: 0, y: 50 }}
                animate={
                  resultsInView ? { opacity: 1, y: 0 } : {}
                }
                transition={{
                  duration: 0.8,
                  delay: index * 0.2,
                }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${caseStudyData.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />

                <div className="relative z-10">
                  <motion.div
                    className={`text-6xl font-bold bg-gradient-to-r ${caseStudyData.gradient} bg-clip-text text-transparent mb-6`}
                    initial={{ scale: 0 }}
                    animate={resultsInView ? { scale: 1 } : {}}
                    transition={{
                      duration: 0.5,
                      delay: 0.5 + index * 0.1,
                      type: "spring",
                      stiffness: 200,
                    }}
                  >
                    {result.metric}
                  </motion.div>
                  <div className="text-gray-300 text-xl font-semibold uppercase tracking-wide">
                    {result.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Testimonial Section */}
      {caseStudyData.testimonial && (
        <section
          ref={testimonialRef}
          className="py-24 relative"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(236,72,153,0.1),transparent_70%)]" />

          <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
            <motion.div
              className="glass rounded-3xl p-16 border border-white/10 text-center relative overflow-hidden"
              initial={{ opacity: 0, y: 100 }}
              animate={
                testimonialInView ? { opacity: 1, y: 0 } : {}
              }
              transition={{ duration: 1 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-transparent" />

              <div className="relative z-10">
                <div className="flex items-center justify-center mb-12">
                  <div className="w-20 h-20 rounded-2xl gradient-electric flex items-center justify-center">
                    <Award className="w-10 h-10 text-white" />
                  </div>
                </div>

                <blockquote className="text-3xl lg:text-4xl font-light text-gray-300 mb-12 leading-relaxed italic">
                  "{caseStudyData.testimonial.quote}"
                </blockquote>

                <div className="flex flex-col items-center">
                  <div className="font-outfit text-2xl font-bold text-white mb-2">
                    {caseStudyData.testimonial.author}
                  </div>
                  <div className="text-xl text-gray-400 mb-4">
                    {caseStudyData.testimonial.role}
                  </div>
                  <div className="text-lg text-purple-400 font-semibold">
                    {caseStudyData.testimonial.company}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}
      {/* Gallery Modal */}
      <AnimatePresence>
        {isGalleryOpen && caseStudyData.gallery && (
          <motion.div
            className="fixed inset-0 z-60 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsGalleryOpen(false)}
          >
            <motion.div
              className="relative max-w-6xl w-full"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsGalleryOpen(false)}
                className="absolute -top-16 right-0 w-12 h-12 glass rounded-full flex items-center justify-center text-white hover:bg-white/10 z-10 text-xl"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="relative">
                <ImageWithFallback
                  src={
                    caseStudyData.gallery[currentGalleryIndex]
                  }
                  alt={`${caseStudyData.title} gallery ${currentGalleryIndex + 1}`}
                  className="w-full h-auto max-h-[85vh] object-contain rounded-2xl"
                />

                {caseStudyData.gallery.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setCurrentGalleryIndex((prev) =>
                          prev === 0
                            ? caseStudyData.gallery!.length - 1
                            : prev - 1,
                        )
                      }
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 glass rounded-full flex items-center justify-center text-white hover:bg-white/10 text-xl"
                    >
                      <ChevronLeft className="w-7 h-7" />
                    </button>

                    <button
                      onClick={() =>
                        setCurrentGalleryIndex((prev) =>
                          prev ===
                          caseStudyData.gallery!.length - 1
                            ? 0
                            : prev + 1,
                        )
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 glass rounded-full flex items-center justify-center text-white hover:bg-white/10 text-xl"
                    >
                      <ChevronRight className="w-7 h-7" />
                    </button>
                  </>
                )}
              </div>

              {caseStudyData.gallery.length > 1 && (
                <div className="flex justify-center space-x-3 mt-8">
                  {caseStudyData.gallery.map((_, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        setCurrentGalleryIndex(index)
                      }
                      className={`w-4 h-4 rounded-full transition-all duration-300 ${
                        index === currentGalleryIndex
                          ? "bg-white scale-125"
                          : "bg-white/30 hover:bg-white/60"
                      }`}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}