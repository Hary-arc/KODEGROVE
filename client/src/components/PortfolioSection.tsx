"use client";
import React from 'react'
import { useState, useRef } from "react";
import {
  motion,
  useInView,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { CaseStudyDetail } from "./CaseStudyDetail";
import { FloatingNav } from "./FloatingNav";
import {
  ExternalLink,
  ArrowUpRight,
  X,
  Eye,
  Award,
  Sparkles,
  TrendingUp,
  ShoppingCart,
  Building,
  Users,
  Search,
  Filter,
  Grid3X3,
  LayoutGrid,
} from "lucide-react";
import {
  projects,
  portfolioTabs,
  getProjectsByCategory,
} from "../data/portfolio";
import { pageHeaders, ctaContent } from "../data/content";

// Icon mapping for portfolio tabs
const getTabIcon = (iconName: string) => {
  const icons = {
    Award,
    Building,
    Users,
    ShoppingCart,
  };
  return icons[iconName as keyof typeof icons] || Award;
};

// Helper to add gradient classes to projects (since centralized data doesn't have this)
const getProjectGradient = (category: string, id: number) => {
  const gradients = {
    Featured:
      id % 2 === 1
        ? "from-purple-500 to-pink-500"
        : "from-blue-500 to-cyan-500",
    B2B:
      id % 2 === 1
        ? "from-green-500 to-emerald-500"
        : "from-orange-500 to-red-500",
    B2C:
      id % 2 === 1
        ? "from-pink-500 to-rose-500"
        : "from-cyan-500 to-blue-500",
    eCommerce:
      id % 2 === 1
        ? "from-purple-500 to-indigo-500"
        : "from-yellow-500 to-orange-500",
  };
  return (
    gradients[category as keyof typeof gradients] ||
    gradients.Featured
  );
};

// Convert centralized data format to component format
const convertProjectData = (project: any) => ({
  ...project,
  type: project.category,
  gradient: getProjectGradient(project.category, project.id),
  size: project.featured ? "large" : "medium",
  results: [
    {
      metric: project.metrics.increase,
      label: project.metrics.metric,
    },
    { metric: `${project.year}`, label: "Year" },
    {
      metric: project.client
        ? project.client.split(" ")[0]
        : "Client",
      label: "Client",
    },
  ],
});

export function PortfolioSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [selectedProject, setSelectedProject] = useState<
    number | null
  >(null);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<
    number | null
  >(null);
  const [activeTab, setActiveTab] = useState("Featured");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "masonry">(
    "grid",
  );
  const [hoveredProject, setHoveredProject] = useState<
    number | null
  >(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "50%"],
  );

  // Convert projects to component format
  const convertedProjects = projects.map(convertProjectData);

  const filteredProjects = convertedProjects.filter(
    (project) => {
      const matchesTab =
        activeTab === "Featured"
          ? project.featured
          : project.category === activeTab;
      const matchesSearch =
        searchTerm === "" ||
        project.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        project.description
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        project.technologies.some((tech: string) =>
          tech.toLowerCase().includes(searchTerm.toLowerCase()),
        );

      return matchesTab && matchesSearch;
    },
  );

  const selectedProjectData = convertedProjects.find(
    (p) => p.id === selectedProject,
  );

  const selectedCaseStudyData = convertedProjects.find(
    (p) => p.id === selectedCaseStudy,
  );

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleToggleFilter = () => {
    // Toggle between first few tabs
    const tabs = ["Featured", "B2B", "B2C", "eCommerce"];
    const currentIndex = tabs.indexOf(activeTab);
    const nextIndex = (currentIndex + 1) % tabs.length;
    setActiveTab(tabs[nextIndex]);
  };

  const handleToggleSearch = () => {
    const searchInput = document.querySelector(
      'input[type="text"]',
    ) as HTMLInputElement;
    if (searchInput) {
      searchInput.focus();
    }
  };

  const handleShowAllProjects = () => {
    setActiveTab("Featured");
    setSearchTerm("");
  };

  return (
    <>
      <section
        id="portfolio"
        ref={containerRef}
        className="py-32 relative overflow-hidden"
      >
        {/* Parallax Background Effects */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-slate-950 via-purple-950/20 to-slate-950"
          style={{ y: backgroundY }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(236,72,153,0.1),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(139,92,246,0.1),transparent_70%)]" />

        <div
          className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10"
          ref={ref}
        >
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
              <Award className="w-5 h-5 text-purple-400" />
              <span className="font-medium text-gray-200">
                {pageHeaders.portfolio.badge}
              </span>
            </motion.div>

            <h2 className="font-outfit text-5xl lg:text-6xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Projects That
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Mesmerize & Convert
              </span>
            </h2>

            <motion.p
              className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {pageHeaders.portfolio.description}
            </motion.p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-12"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects, technologies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 glass rounded-2xl border border-white/20 text-white placeholder-gray-400 focus:border-white/40 focus:outline-none transition-all duration-300 backdrop-blur-xl"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2 glass rounded-2xl p-2 border border-white/20">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-3 rounded-xl transition-all duration-300 ${
                  viewMode === "grid"
                    ? "gradient-electric text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("masonry")}
                className={`p-3 rounded-xl transition-all duration-300 ${
                  viewMode === "masonry"
                    ? "gradient-electric text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
            </div>
          </motion.div>

          {/* Portfolio Tabs */}
          <motion.div
            className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-16"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {portfolioTabs.map((tab, index) => {
              const TabIcon = getTabIcon(tab.icon);
              return (
                <motion.button
                  key={tab.name}
                  onClick={() => setActiveTab(tab.name)}
                  className={`relative px-4 sm:px-8 py-3 sm:py-4 rounded-2xl transition-all duration-500 overflow-hidden group ${
                    activeTab === tab.name
                      ? "gradient-electric text-white shadow-2xl shadow-purple-500/25"
                      : "glass text-gray-300 hover:text-white border border-white/20 hover:border-white/40"
                  }`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.7 + index * 0.1,
                  }}
                >
                  <span className="relative z-10 flex items-center space-x-2 sm:space-x-3">
                    <TabIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="font-semibold text-sm sm:text-base">
                      {tab.name}
                    </span>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        activeTab === tab.name
                          ? "bg-white/20 text-white"
                          : "bg-purple-500/20 text-purple-300"
                      }`}
                    >
                      {tab.count}
                    </span>
                  </span>
                  {activeTab !== tab.name && (
                    <div className="absolute inset-0 gradient-electric opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  )}
                </motion.button>
              );
            })}
          </motion.div>

          {/* Projects Grid */}
          <div
            className={`mb-20 ${
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8"
                : "columns-1 md:columns-2 xl:columns-3 gap-8 space-y-8"
            }`}
          >
            <AnimatePresence mode="wait">
              {filteredProjects.map((project, index) => {
                const gridClass =
                  viewMode === "grid"
                    ? project.size === "large"
                      ? "sm:col-span-2 lg:col-span-8"
                      : "sm:col-span-1 lg:col-span-6"
                    : "";

                return (
                  <motion.div
                    key={`${activeTab}-${project.id}`}
                    className={
                      viewMode === "grid"
                        ? `col-span-1 sm:col-span-1 lg:col-span-12 ${gridClass}`
                        : "break-inside-avoid mb-8"
                    }
                    layout
                    initial={{ opacity: 0, scale: 0.9, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -50 }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 100,
                    }}
                    onHoverStart={() =>
                      setHoveredProject(project.id)
                    }
                    onHoverEnd={() => setHoveredProject(null)}
                  >
                    <Card className="group cursor-pointer overflow-hidden glass border border-white/10 hover:border-white/30 transition-all duration-700 h-full relative hover-glow">
                      {/* Image Container */}
                      <div className="relative overflow-hidden">
                        <motion.div
                          className={`relative ${
                            viewMode === "grid"
                              ? project.size === "large"
                                ? "h-80"
                                : "h-64"
                              : "h-64"
                          }`}
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.7 }}
                        >
                          <ImageWithFallback
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                          />

                          {/* Zoom Indicator */}
                          <motion.div
                            className="absolute top-4 right-4 w-10 h-10 glass rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            initial={{ scale: 0.8 }}
                            whileHover={{ scale: 1.1 }}
                          >
                            <Eye className="w-5 h-5 text-white" />
                          </motion.div>

                          {project.featured && (
                            <motion.div
                              className="absolute top-4 left-4"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.3 }}
                            >
                              <Badge className="gradient-electric text-white border-0 shadow-lg">
                                <Sparkles className="w-3 h-3 mr-1" />
                                Featured
                              </Badge>
                            </motion.div>
                          )}

                          {/* Gradient Overlay */}
                          <div
                            className={`absolute inset-0 bg-gradient-to-t ${project.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-700`}
                          />

                          {/* Hover Actions */}
                          <motion.div
                            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            initial={{ y: 20 }}
                            whileHover={{ y: 0 }}
                          >
                            <div className="flex space-x-4">
                              <Button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedCaseStudy(
                                    project.id,
                                  );
                                }}
                                className="glass border border-white/30 text-white hover:bg-white/10 backdrop-blur-xl shadow-2xl"
                                size="lg"
                              >
                                <Eye className="w-5 h-5 mr-2" />
                                Case Study
                              </Button>
                              <Button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedProject(project.id);
                                }}
                                variant="outline"
                                className="glass border border-white/30 text-white hover:bg-white/10 backdrop-blur-xl shadow-2xl"
                                size="lg"
                              >
                                <ExternalLink className="w-5 h-5 mr-2" />
                                Quick View
                              </Button>
                            </div>
                          </motion.div>
                        </motion.div>
                      </div>

                      <CardContent className="p-8">
                        <div className="flex items-center justify-between mb-4">
                          <Badge
                            variant="secondary"
                            className="glass border border-white/20 text-gray-300"
                          >
                            {project.category}
                          </Badge>
                          <button className="text-gray-400 hover:text-white transition-colors duration-300">
                            <TrendingUp className="w-5 h-5" />
                          </button>
                        </div>

                        <motion.h3
                          className="font-outfit text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors duration-300 cursor-pointer"
                          onClick={() =>
                            setSelectedCaseStudy(project.id)
                          }
                          whileHover={{ x: 4 }}
                        >
                          {project.title}
                        </motion.h3>

                        <p className="text-gray-300 mb-6 leading-relaxed">
                          {project.description}
                        </p>

                        {/* Results */}
                        <div className="grid grid-cols-3 gap-4 mb-6">
                          {project.results.map(
                            (result: any, resultIndex: number) => (
                              <motion.div
                                key={resultIndex}
                                className="text-center p-3 glass rounded-xl border border-white/10"
                                whileHover={{ scale: 1.05 }}
                                transition={{
                                  type: "spring",
                                  stiffness: 300,
                                }}
                              >
                                <div
                                  className={`text-xl font-bold bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent mb-1`}
                                >
                                  {result.metric}
                                </div>
                                <div className="text-xs text-gray-400 uppercase tracking-wide">
                                  {result.label}
                                </div>
                              </motion.div>
                            ),
                          )}
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {project.technologies
                            .slice(0, 4)
                            .map((tech: string) => (
                              <span
                                key={tech}
                                className="text-xs px-3 py-1 glass border border-white/20 text-gray-300 rounded-full hover:border-white/40 transition-colors duration-300"
                              >
                                {tech}
                              </span>
                            ))}
                          {project.technologies.length > 4 && (
                            <span className="text-xs px-3 py-1 glass border border-white/20 text-gray-300 rounded-full">
                              +{project.technologies.length - 4}
                            </span>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* CTA Section */}
          <motion.div
            className="text-center glass rounded-3xl p-16 border border-white/10 relative overflow-hidden"
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 1.0 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-cyan-500/5" />

            <div className="relative z-10">
              <h3 className="font-outfit text-4xl font-bold text-white mb-6">
                {ctaContent.portfolio.title.split(" Your ")[0]}{" "}
                <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Your{" "}
                  {ctaContent.portfolio.title.split(" Your ")[1]}
                </span>
              </h3>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                {ctaContent.portfolio.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button
                  onClick={() => {
                    const element =
                      document.querySelector("#contact");
                    if (element) {
                      element.scrollIntoView({
                        behavior: "smooth",
                      });
                    }
                  }}
                  size="lg"
                  className="gradient-electric hover:shadow-2xl hover:shadow-purple-500/30 text-white px-12 py-6 rounded-2xl font-semibold relative overflow-hidden group magnetic"
                >
                  <span className="relative z-10 flex items-center space-x-3">
                    <Sparkles className="w-6 h-6" />
                    <span>
                      {ctaContent.portfolio.primaryButton}
                    </span>
                    <ArrowUpRight className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Button>

                {ctaContent.portfolio.secondaryButton && (
                  <Button
                    variant="outline"
                    size="lg"
                    className="px-12 py-6 glass border-white/20 text-white hover:bg-white/10 rounded-2xl font-semibold magnetic"
                  >
                    {ctaContent.portfolio.secondaryButton}
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Project Quick View Modal */}
        <AnimatePresence>
          {selectedProject && selectedProjectData && (
            <motion.div
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                className="glass border border-white/20 rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl"
                initial={{ scale: 0.9, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 50 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-6 right-6 w-12 h-12 glass rounded-full flex items-center justify-center text-gray-400 hover:text-white z-20 transition-colors duration-300"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    {/* Project Image */}
                    <div className="relative rounded-2xl overflow-hidden">
                      <ImageWithFallback
                        src={selectedProjectData.image}
                        alt={selectedProjectData.title}
                        className="w-full h-80 object-cover"
                      />
                      <div
                        className={`absolute inset-0 bg-gradient-to-t ${selectedProjectData.gradient} opacity-20`}
                      />
                    </div>

                    {/* Project Details */}
                    <div className="space-y-6">
                      <div>
                        <Badge className="gradient-electric text-white border-0 mb-4">
                          {selectedProjectData.category}
                        </Badge>
                        <h2 className="font-outfit text-3xl font-bold text-white mb-4">
                          {selectedProjectData.title}
                        </h2>
                        <p className="text-gray-300 leading-relaxed mb-6">
                          {selectedProjectData.description}
                        </p>
                      </div>

                      {/* Technologies */}
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-3">
                          Technologies Used
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedProjectData.technologies.map(
                            (tech: string) => (
                              <span
                                key={tech}
                                className="px-3 py-1 glass border border-white/20 text-gray-300 rounded-full text-sm"
                              >
                                {tech}
                              </span>
                            ),
                          )}
                        </div>
                      </div>

                      {/* Project Info */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h5 className="text-sm font-medium text-gray-400 mb-1">
                            Client
                          </h5>
                          <p className="text-white">
                            {selectedProjectData.client ||
                              "Confidential"}
                          </p>
                        </div>
                        <div>
                          <h5 className="text-sm font-medium text-gray-400 mb-1">
                            Year
                          </h5>
                          <p className="text-white">
                            {selectedProjectData.year}
                          </p>
                        </div>
                      </div>

                      {/* Results */}
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-3">
                          Key Results
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                          {selectedProjectData.results.map(
                            (result: any, resultIndex: number) => (
                              <motion.div
                                key={resultIndex}
                                className="text-center p-3 glass rounded-xl border border-white/10"
                                whileHover={{ scale: 1.05 }}
                                transition={{
                                  type: "spring",
                                  stiffness: 300,
                                }}
                              >
                                <div
                                  className={`text-xl font-bold bg-gradient-to-r ${selectedProjectData.gradient} bg-clip-text text-transparent mb-1`}
                                >
                                  {result.metric}
                                </div>
                                <div className="text-xs text-gray-400 uppercase tracking-wide">
                                  {result.label}
                                </div>
                              </motion.div>
                            ),
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-4">
                        <Button
                          onClick={() => {
                            setSelectedProject(null);
                            setSelectedCaseStudy(selectedProjectData.id);
                          }}
                          className="gradient-electric text-white flex-1"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Case Study
                        </Button>
                        <Button
                          variant="outline"
                          className="glass border-white/20 text-white hover:bg-white/10"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Live Demo
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        
      </section>

      {/* Case Study Detail Modal */}
      <AnimatePresence>
        {selectedCaseStudy && selectedCaseStudyData && (
          <CaseStudyDetail
            project={selectedCaseStudyData}
            onBack={() => setSelectedCaseStudy(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}