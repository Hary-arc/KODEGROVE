'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Target,
  Layout,
  Palette,
  Code,
  ShieldCheck,
  Rocket,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Step = {
  step: string;
  title: string;
  description: string;
  details: string[];
  icon: React.ComponentType<any>;
  gradient: string;
};

const designProcess: Step[] = [
  {
    step: '01',
    title: 'Web Strategy',
    description:
      'We use in-depth research and data analysis to understand your business goals, target audience, and market position. Our strategic foundation ensures every decision aligns with your vision.',
    details: [
      'Identify your target audiences & personas',
      'Analyze user pain points & define UVPs',
      'Define KPIs & business objectives',
      'Create a roadmap to brand growth',
    ],
    icon: Target,
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    step: '02',
    title: 'Planning & Information Architecture',
    description:
      'We map your content structure and user journeys to create intuitive navigation paths. Strategic planning ensures users find what they need effortlessly.',
    details: [
      'User flow & sitemap creation',
      'Wireframes for seamless conversion funnels',
      'On-brand messaging structure',
      'Content hierarchy optimization',
    ],
    icon: Layout,
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    step: '03',
    title: 'Visual Design',
    description:
      'Where your site comes alive with stunning visuals, brand-aligned aesthetics, and engaging interactions that captivate your audience and reinforce your identity.',
    details: [
      'User-centered design features',
      'Interactive videos & animations',
      'Custom illustrations & branding',
      'Accessibility & SEO in design',
    ],
    icon: Palette,
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    step: '04',
    title: 'Responsive Development',
    description:
      'A responsive site adapts seamlessly across all devices. We build with cutting-edge technologies to ensure peak performance, speed, and scalability.',
    details: [
      'Touchpoint & channel insights',
      'Flexible UI development with modern frameworks',
      'Cross-device testing & validation',
      'Performance optimization & caching',
    ],
    icon: Code,
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    step: '05',
    title: 'Quality Assurance',
    description:
      'We follow a strict QA process to ensure every element works flawlessly. Rigorous testing guarantees a bug-free, secure, and polished final product.',
    details: [
      'Client collaboration in testing phases',
      'Rigorous bug/error checks & fixes',
      'Launch-ready QA tools & audits',
      'Security & compliance verification',
    ],
    icon: ShieldCheck,
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    step: '06',
    title: 'Launch & Optimization',
    description:
      'From launch to ongoing optimization, we ensure smooth deployment and continuous improvement. Your success is measured by real-world performance and growth.',
    details: [
      'Structured launch protocol & checklist',
      'Post-launch maintenance & support',
      'Digital marketing integration',
      'Analytics setup & performance monitoring',
    ],
    icon: Rocket,
    gradient: 'from-cyan-500 to-blue-600',
  },
];

const TimelineStep = React.memo(({ step, index }: { step: Step; index: number }) => {
  const Icon = step.icon;

  return (
    <div className="timeline-card flex-shrink-0 group">
      <div className="relative h-full glass rounded-3xl border border-white/10 hover:border-cyan-500/40 transition-all duration-500 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-purple-500/0 to-transparent group-hover:from-cyan-500/5 group-hover:via-purple-500/5 transition-all duration-700 pointer-events-none" />

        <div className="absolute -inset-[1px] bg-gradient-to-r from-cyan-500 to-purple-500 rounded-3xl opacity-0 group-hover:opacity-10 blur-lg transition-all duration-700 pointer-events-none" />

        <div className="relative z-10 p-6 sm:p-8 h-full flex flex-col">
          <div className="flex items-start gap-4 mb-6">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.08 }}
              transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
              className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg shadow-purple-500/15 group-hover:shadow-cyan-500/30 transition-shadow duration-500`}
            >
              <span className="font-bold text-white text-xl">{step.step}</span>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.15, rotate: 10 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="flex-shrink-0 w-12 h-12 rounded-xl glass border border-white/20 flex items-center justify-center group-hover:border-cyan-500/40 transition-colors duration-500"
            >
              <Icon className="w-6 h-6 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" />
            </motion.div>
          </div>

          <h4 className="font-bold text-white text-xl sm:text-2xl mb-3 group-hover:text-cyan-400 transition-colors duration-400">
            {step.title}
          </h4>

          <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 flex-grow">
            {step.description}
          </p>

          <ul className="space-y-3 mb-6">
            {step.details.map((item, i) => (
              <li key={i} className="flex items-start gap-2 group/item">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform duration-300" />
                <span className="text-gray-200 text-sm leading-relaxed group-hover/item:text-white transition-colors duration-300">
                  {item}
                </span>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
            <span className="text-xs text-gray-400 font-medium">Step {step.step} of 06</span>
            <motion.div
              whileHover={{ x: 4 }}
              transition={{ duration: 0.3 }}
              className="text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300"
            >
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </div>
        </div>

        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none">
          <Sparkles className="w-6 h-6 text-cyan-400" />
        </div>
      </div>
    </div>
  );
});

TimelineStep.displayName = 'TimelineStep';

export default function DesignProcessSection() {
  const [mounted, setMounted] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
  setMounted(true);
}, []);

useEffect(() => {
  if (!mounted || !wrapperRef.current || !containerRef.current) return;
  console.log("✅ Design Process Section Mounted");

  const wrapper = wrapperRef.current;
  const container = containerRef.current;
  const cards = gsap.utils.toArray<HTMLElement>(".timeline-card");
  // ---- MATCH HEIGHTS ----
  let maxHeight = 0;
  cards.forEach(card => {
    maxHeight = Math.max(maxHeight, card.offsetHeight);
  });

  // Apply uniform height to all cards
  cards.forEach(card => {
    gsap.set(card, { height: maxHeight });
  });

  // Also make the container match that height
  gsap.set(container, { height: maxHeight });

  if (cards.length === 0) return;
  console.log("🃏 Cards found:", cards.length);

  // ---- INITIAL CARD SIZING ----
  const isMobile = window.innerWidth < 768;
  const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

  const gap = isMobile ? 16 : 24;
  const padding = isMobile ? 20 : 40;
  const cardWidth = isMobile ? 360 : isTablet ? 360 : 400;

  cards.forEach((card) => {
    gsap.set(card, {
      width: cardWidth,
      minHeight: "540px",
      opacity: 0, // start hidden for fade-in
      y: 50,
    });
  });

  gsap.set(container, {
    x: 0,
    display: "flex",
    gap: `${gap}px`,
    paddingLeft: `${padding}px`,
    paddingRight: `${padding}px`,
  });

  // ---- DIMENSIONS ----
  const totalWidth = cards.length * cardWidth + (cards.length - 1) * gap;
  const visibleWidth = window.innerWidth - padding * 2;
  const scrollDistance = Math.max(0, totalWidth - visibleWidth);

  console.log({
    totalWidth,
    visibleWidth,
    scrollDistance,
  });

  // ---- QUICKSETTER FOR SMOOTHNESS ----
  const quickX = gsap.quickSetter(container, "x", "px");

  // ---- FADE-IN ANIMATION ----
  gsap.to(cards, {
    opacity: 1,
    y: 0,
    stagger: 0.1,
    duration: 0.6,
    ease: "power2.out",
    delay: 0.3,
  });

  // ---- SCROLLTRIGGER SETUP ----
  const st = ScrollTrigger.create({
    trigger: wrapper,
    start: "top top+=100",
    end: `+=${scrollDistance}`,
    pin: true,
    scrub: 0.5, // smoother response
    anticipatePin: 1,
    snap: {
      snapTo: 1 / (cards.length - 1),
      duration: 0.4,
      ease: "power2.inOut",
    },
    onEnter: () => console.log("📍 Pin started"),
    onLeave: () => {
      console.log("📤 Pin ended");
      gsap.to(container, { x: -scrollDistance, duration: 0.4, ease: "power1.out" });
    },
    onEnterBack: () => console.log("⬅️ Pin re-entered"),
    onLeaveBack: () => console.log("⬆️ Pin left back"),
    onUpdate: (self) => {
      const progress = self.progress;
      const xTarget = -scrollDistance * progress;
      quickX(xTarget);
    },
  });

  // ---- SMOOTH WRAPPER FADE ON EXIT ----
  ScrollTrigger.create({
    trigger: wrapper,
    start: "bottom center",
    end: "bottom top",
    scrub: true,
    onUpdate: (self) => {
      gsap.to(wrapper, { opacity: 1 - self.progress, duration: 0.2, ease: "power1.out" });
    },
  });

  // ---- REFRESH CONTROL ----
  const delayedRefresh = gsap.delayedCall(0.5, () => ScrollTrigger.refresh());
  const resizeHandler = () => delayedRefresh.restart();

// add & remove the exact same handler (so removeEventListener works)
window.addEventListener('resize', resizeHandler);


  // ---- CLEANUP ----
  return () => {
    st.kill();
    delayedRefresh.kill();
    ScrollTrigger.getAll().forEach((t) => t.kill());
    window.removeEventListener('resize', resizeHandler);
    delayedRefresh.kill();
    console.log("🧹 Cleaned up ScrollTrigger");
  };
}, [mounted]);





  if (!mounted) {
    return (
      <section className="relative py-20 sm:py-32 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="h-96 flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full"
            />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.08, 0.15, 0.08],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.15, 1, 1.15],
            opacity: [0.15, 0.08, 0.15],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-3xl"
        />
      </div>

      {/* Header */}
      <div className="relative z-20 text-center py-12 sm:py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 glass border border-cyan-500/20"
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
          </motion.div>
          <span className="text-sm font-semibold text-cyan-400">OUR PROVEN PROCESS</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-cyan-200 to-purple-400 bg-clip-text text-transparent mb-6 font-outfit"
        >
          Our Creative Process
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto"
        >
          A step-by-step approach to build and launch high-performing websites that drive real
          business results
        </motion.p>
      </div>

      

      {/* Horizontal Scroll Section */}
      <div ref={wrapperRef} className="relative w-full min-h-[80vh] flex items-center overflow-hidden bg-transparent">

        <div ref={containerRef} className="relative flex items-center will-change-transform"
          >
      
          {designProcess.map((step, index) => (
            <TimelineStep key={step.step} step={step} index={index} />
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="relative text-center py-8 sm:py-20 px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="max-w-full mx-auto glass rounded-3xl p-8 sm:p-12 border border-white/10 hover:border-cyan-500/30 transition-all duration-500"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Ready to Start Your Project?
          </h3>
          <p className="text-gray-300 text-sm mb-2">
            From strategy to launch, we handle it all to ensure your success and exceed your
            expectations
          </p>
        </motion.div>
      </div>
    </section>
  );
}
