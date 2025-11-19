"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Sparkles, HelpCircle } from "lucide-react";
import { FAQ } from "../data/faqs";

type FAQSectionProps = {
  title: string;
  subtitle: string;
  faqs: FAQ[];
  variant?: "default" | "compact";
};

export function FAQSection({
  title,
  subtitle,
  faqs,
  variant = "default",
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  return (
    <section className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-20 sm:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated Gradients */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.03, 0.08, 0.03],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.08, 0.03, 0.08],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-3xl"
        />

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8"
          >
            <HelpCircle className="w-4 h-4 text-cyan-400" />
            <span className="text-sm bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              FAQ
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl mb-6"
          >
            <span className="bg-gradient-to-r from-white via-cyan-100 to-purple-200 bg-clip-text text-transparent">
              {title}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto"
          >
            {subtitle}
          </motion.p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === faq.id;

            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group"
              >
                <div
                  className={`relative overflow-hidden rounded-2xl border transition-all duration-500 ${
                    isOpen
                      ? "bg-slate-800/50 border-cyan-500/30 shadow-lg shadow-cyan-500/10"
                      : "bg-slate-900/50 border-white/10 hover:border-white/20"
                  }`}
                >
                  {/* Gradient Border Effect on Hover */}
                  <div
                    className={`absolute -inset-[1px] bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl opacity-0 blur-sm transition-opacity duration-500 ${
                      isOpen ? "opacity-100" : "group-hover:opacity-50"
                    }`}
                  />

                  {/* Question Button */}
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="relative w-full text-left p-6 sm:p-8 flex items-start justify-between gap-4 backdrop-blur-xl"
                  >
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                      {/* Number Badge */}
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center transition-all duration-500 ${
                          isOpen
                            ? "bg-gradient-to-br from-cyan-500 to-purple-500 shadow-lg shadow-cyan-500/25"
                            : "bg-white/5 group-hover:bg-white/10"
                        }`}
                      >
                        <span
                          className={`text-lg sm:text-xl transition-colors duration-500 ${
                            isOpen
                              ? "text-white"
                              : "text-cyan-400 group-hover:text-cyan-300"
                          }`}
                        >
                          {faq.id}
                        </span>
                      </motion.div>

                      {/* Question Text */}
                      <div className="flex-1 min-w-0">
                        <h3
                          className={`text-lg sm:text-xl pr-4 transition-colors duration-500 ${
                            isOpen
                              ? "text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text"
                              : "text-white group-hover:text-cyan-100"
                          }`}
                        >
                          {faq.question}
                        </h3>
                      </div>
                    </div>

                    {/* Toggle Icon */}
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 ${
                        isOpen
                          ? "bg-gradient-to-br from-cyan-500/20 to-purple-500/20 text-cyan-400"
                          : "bg-white/5 text-gray-400 group-hover:bg-white/10 group-hover:text-cyan-400"
                      }`}
                    >
                      <ChevronDown className="w-5 h-5" />
                    </motion.div>
                  </button>

                  {/* Answer Panel */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="relative px-6 sm:px-8 pb-6 sm:pb-8">
                          {/* Decorative Line */}
                          <div className="ml-14 sm:ml-16 mb-4 h-px bg-gradient-to-r from-cyan-500/50 via-purple-500/50 to-transparent" />

                          {/* Answer Text */}
                          <motion.div
                            initial={{ y: -10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                            className="ml-14 sm:ml-16"
                          >
                            <p className="text-gray-300 leading-relaxed text-base sm:text-lg">
                              {faq.answer}
                            </p>
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 sm:mt-20 text-center"
        >
          <div className="relative group w-full">
            {/* Glow Effect */}
            <div className="absolute -inset-[1px] bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-700" />

            <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-white/10 p-8 sm:p-10">
              <Sparkles className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-2xl sm:text-3xl text-white mb-4">
                Still have questions?
              </h3>
              <p className="text-gray-400 text-lg mb-6 max-w-md mx-auto">
                Our team is here to help! Get in touch and we'll answer all your
                questions.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => (window.location.hash = "/contact")}
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 relative overflow-hidden group/btn"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Contact Us
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    (window.location.href = `mailto:kodegrove@gmail.com`)
                  }
                  className="px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  Email Us
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}