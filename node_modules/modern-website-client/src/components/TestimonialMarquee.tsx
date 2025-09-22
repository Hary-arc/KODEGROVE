"use client";

import React, { useRef } from "react";
import { motion, useAnimation, useInView } from "motion/react";
import { Users, Star } from "lucide-react";
import { testimonials } from "../data/testimonials";

export function TestimonialMarquee({
  featuredTestimonials = testimonials.slice(0, 6),
}) {
  const testimonialsRef = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(testimonialsRef, {
    once: true,
    amount: 0.2,
  });

  return (
    <section
      ref={testimonialsRef}
      className="py-12 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.25, 0.25, 0, 1] }}
        >
          <motion.div
            className="inline-flex items-center space-x-3 glass rounded-full px-6 py-3 mb-8 border border-white/20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Users className="w-5 h-5 text-purple-400" />
            <span className="font-medium text-gray-200">
              Client Love
            </span>
          </motion.div>
          <h2 className="font-outfit text-4xl lg:text-5xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              What Our Clients
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Say About Us
            </span>
          </h2>
        </motion.div>

        {/* Enhanced Right-to-Left Marquee with Professional Hover Pause */}
        <motion.div
          className="marquee-container relative overflow-hidden w-full h-[400px]"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div
            className="animate-marquee-rtl flex gap-6"
            style={{ animationDuration: "60s" }}
          >
            {[
              ...featuredTestimonials,
              ...featuredTestimonials,
              ...featuredTestimonials,
            ].map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${index}`}
                className="w-[90vw] sm:w-[300px] lg:w-[400px] max-w-full perspective flex-shrink-0"
              >
                <motion.div
                  className="relative w-full h-full transition-transform duration-700 card-flip-inner"
                  style={{ transformStyle: "preserve-3d" }}
                  whileHover={{
                    rotateY: 180,
                    scale: 1.03,
                    y: -10,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                  }}
                >
                  {/* Front Side */}
                  <div
                    className="break-words absolute inset-0 glass border border-white/10 rounded-xl p-6 shadow-lg hover:shadow-purple-500/20 glow-on-hover card-front"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                    }}
                  >
                    <div className="text-6xl text-purple-400/30 mb-4">
                      "
                    </div>
                    <blockquote className="break-words text-gray-300 text-base md:text-lg italic leading-relaxed border-l-4 border-purple-500 pl-4 mb-6">
                      {testimonial.content}
                    </blockquote>

                    <div className="flex items-center space-x-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 gradient-electric rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-lg">
                          {testimonial.name?.charAt(0) || "A"}
                        </span>
                      </div>
                      <div>
                        <div className="font-semibold text-white">
                          {testimonial.name}
                        </div>
                        <div className="text-gray-400 text-sm">
                          {testimonial.role}
                        </div>
                        <div className="text-purple-400 text-sm">
                          {testimonial.company}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Back Side */}
                  <div
                    className="absolute inset-0 glass border border-white/10 rounded-xl p-6 bg-gradient-to-br from-purple-900 via-pink-900 to-cyan-900 text-white shadow-lg card-back"
                    style={{
                      transform: "rotateY(180deg)",
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                    }}
                  >
                    <h4 className="text-xl font-semibold text-cyan-300 mb-6 flex items-center gap-2">
                      Project Impact Summary
                      <span className="h-[1px] flex-1 bg-white/10"></span>
                    </h4>

                    <div className="space-y-5 text-sm text-white/90">
                      {/* Completion Time */}
                      <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-2">
                        <div className="flex items-center gap-2 text-gray-300">
                          ⏱️ <span>Delivered In</span>
                        </div>
                        <span className="font-semibold text-cyan-400">
                          {testimonial.metrics?.time ||
                            "2–3 weeks"}
                        </span>
                      </div>

                      {/* ROI Increase */}
                      <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-2">
                        <div className="flex items-center gap-2 text-gray-300">
                          💹 <span>ROI Boost</span>
                        </div>
                        <span className="font-semibold text-green-400">
                          {testimonial.metrics?.roi || "+180%"}
                        </span>
                      </div>

                      {/* Engagement */}
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-gray-300">
                          🚀 <span>Engagement Lift</span>
                        </div>
                        <span className="font-semibold text-purple-400">
                          {testimonial.metrics?.engagement ||
                            "+250%"}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>

          {/* Smooth gradient overlays for professional edge blending */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-slate-950/50 to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-slate-950/50 to-transparent pointer-events-none z-10" />
        </motion.div>
      </div>
    </section>
  );
}