"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { services } from "../data/services";

type ServiceItemProps = {
  service: typeof services[0];
  index: number;
  isReversed: boolean;
};

const ServiceItem = ({ service, index, isReversed }: ServiceItemProps) => {
  // Service images mapping
  const serviceImages: { [key: string]: string } = {
    "web-design": "https://images.unsplash.com/photo-1593720213681-e9a8778330a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMHByb2dyYW1taW5nfGVufDF8fHx8MTc1OTk1OTUyNHww&ixlib=rb-4.1.0&q=80&w=1080",
    "brand-design": "https://images.unsplash.com/photo-1758518727929-4506fc031e1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwc3RyYXRlZ3klMjBidXNpbmVzcyUyMHRlYW18ZW58MXx8fHwxNzU5OTU5NTI0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    "digital-marketing": "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXNpZ258ZW58MXx8fHwxNzU5ODU1MzIwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    "ecommerce": "https://images.unsplash.com/photo-1727407209320-1fa6ae60ee05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjBzaG9wcGluZ3xlbnwxfHx8fDE3NTk4OTE4MzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
  };

  const imageUrl = serviceImages[service.id] || serviceImages["web-design"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      className="relative"
    >
      <div
        className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
          isReversed ? "lg:grid-flow-dense" : ""
        }`}
      >
        {/* Image Section */}
        <motion.div
          className={`relative group ${isReversed ? "lg:col-start-2" : ""}`}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.4 }}
        >
          {/* Glowing Border Container */}
          <div className="relative">
            {/* Animated Glow Effect */}
            <motion.div
              className="absolute -inset-[3px] bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-400 rounded-2xl opacity-75 blur-sm"
              animate={{
                opacity: [0.5, 0.9, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Image Container */}
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-800">
              <ImageWithFallback
                src={imageUrl}
                alt={service.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Hover Icon */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileHover={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500"
              >
                <div className="w-16 h-16 rounded-full bg-cyan-500/20 backdrop-blur-md border border-cyan-400/30 flex items-center justify-center">
                  <ArrowRight className="w-8 h-8 text-cyan-400" />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Content Section */}
        <div className={`${isReversed ? "lg:col-start-1 lg:row-start-1" : ""}`}>
          <motion.div
            initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/* Service Title */}
            <h3 className="text-3xl sm:text-4xl lg:text-5xl mb-6 text-white">
              {service.title}
            </h3>

            {/* Service Description */}
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-8 max-w-xl">
              {service.description}
            </p>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => (window.location.hash = "/services")}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-cyan-400 text-white rounded-lg shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:shadow-cyan-500/40 transition-all duration-300 mb-10"
            >
              <span className="uppercase tracking-wide text-sm">
                Explore {service.title.split(" ")[0]} Services
              </span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>

            {/* Features List */}
            <ul className="space-y-4">
              {service.features.slice(0, 4).map((feature, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                  className="flex items-center gap-3 text-white"
                >
                  <ChevronRight className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                  <span className="text-base sm:text-lg uppercase tracking-wide">
                    {feature}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default function ModernServicesSection() {
  return (
    <section className="relative py-20 sm:py-32 lg:py-40 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800">
        {/* Overlay Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:64px_64px]" />
        </div>

        {/* Animated Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-cyan-400/20 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.1, 0.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-purple-500/20 blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20 sm:mb-28"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 backdrop-blur-sm mb-6"
          >
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-sm text-cyan-300 tracking-wide uppercase">
              Our Services
            </span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl mb-6 text-white">
            Comprehensive Digital Solutions
          </h2>

          <p className="text-lg sm:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            From strategy to execution, we deliver cutting-edge solutions that
            transform your digital presence and drive measurable results
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="space-y-28 sm:space-y-32 lg:space-y-40">
          {services.slice(0, 4).map((service, index) => (
            <ServiceItem
              key={service.id}
              service={service}
              index={index}
              isReversed={index % 2 !== 0}
            />
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-28 sm:mt-32 text-center"
        >
          <div className="relative group inline-block">
            {/* Glow Effect */}
            <div className="absolute -inset-[2px] bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-700" />

            <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-10 sm:p-12">
              <h3 className="text-3xl sm:text-4xl text-white mb-4">
                Ready to Transform Your Business?
              </h3>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                Let's discuss how our services can help you achieve your digital
                goals
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => (window.location.hash = "/services")}
                  className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-cyan-400 text-white rounded-lg shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:shadow-cyan-500/40 transition-all duration-300"
                >
                  View All Services
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => (window.location.hash = "/contact")}
                  className="px-8 py-4 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition-all duration-300"
                >
                  Get in Touch
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
