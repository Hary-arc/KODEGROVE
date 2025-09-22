
import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Step = {
  step: string;
  title: string;
  description: string;
  details: string[];
};

const designProcess: Step[] = [
  { 
    step: "01", 
    title: "Web Strategy", 
    description: "We use in-depth research to understand your market and create winning strategies.", 
    details: ["Identify your target audiences", "Analyze user pain points & define UVPs", "Define KPIs & business objectives", "Create a roadmap to brand growth"] 
  },
  { 
    step: "02", 
    title: "Planning & Information Architecture", 
    description: "We map your content structure for optimal user experience and conversion.", 
    details: ["User flow & sitemap creation", "Wireframes for seamless funnels", "On-brand messaging structure"] 
  },
  { 
    step: "03", 
    title: "Design", 
    description: "Where your site comes alive with stunning visuals and intuitive interfaces.", 
    details: ["User-centered design features", "Interactive videos & animations", "Custom illustrations & branding", "Accessibility & SEO in design"] 
  },
  { 
    step: "04", 
    title: "Responsive Development", 
    description: "A responsive site adapts perfectly to every device and screen size.", 
    details: ["Touchpoint & channel insights", "Flexible UI development", "Cross-device testing & validation"] 
  },
  { 
    step: "05", 
    title: "Quality Assurance", 
    description: "We follow a strict QA process to ensure flawless performance across all platforms.", 
    details: ["Client collaboration in testing", "Rigorous bug/error checks", "Launch-ready QA tools & audits"] 
  },
  { 
    step: "06", 
    title: "Launch & Optimization", 
    description: "From launch to ongoing optimization, we ensure your continued success.", 
    details: ["Structured launch protocol", "Post-launch maintenance", "Digital marketing integration"] 
  },
];

export default function DesignProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const isInView = useInView(wrapperRef, { once: false, amount: 0.1 });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!containerRef.current || !wrapperRef.current || isMobile) return;

    const wrapper = wrapperRef.current;
    const container = containerRef.current;
    const panels = gsap.utils.toArray<HTMLElement>(".process-panel");

    if (panels.length === 0) return;

    // Clear any existing ScrollTriggers
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.vars.trigger === wrapper) {
        trigger.kill();
      }
    });

    // Calculate dimensions
    const updateAnimation = () => {
      const viewportWidth = window.innerWidth;
      const cardWidth = Math.min(380, (viewportWidth - 64) / 3);
      const gap = 32;
      const totalWidth = panels.length * (cardWidth + gap) - gap;
      const maxScroll = Math.max(0, totalWidth - viewportWidth + 64);

      // Set container styles
      gsap.set(container, {
        display: "flex",
        alignItems: "stretch",
        gap: `${gap}px`,
        paddingLeft: "32px",
        paddingRight: "32px",
        width: totalWidth + 64
      });

      // Set panel widths
      panels.forEach(panel => {
        gsap.set(panel, {
          flex: `0 0 ${cardWidth}px`,
          height: "auto"
        });
      });

      if (maxScroll > 0) {
        // Create smooth horizontal scroll animation
        const scrollTween = gsap.to(container, {
          x: -maxScroll,
          ease: "none",
          scrollTrigger: {
            trigger: wrapper,
            start: "center center",
            end: `+=${maxScroll + 200}px`,
            pin: true,
            scrub: 1,
            snap: {
              snapTo: (value) => {
                const snapPoints = panels.map((_, i) => i / (panels.length - 1));
                const closest = snapPoints.reduce((prev, curr) => 
                  Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
                );
                return closest;
              },
              duration: { min: 0.2, max: 0.4 },
              delay: 0.1
            },
            onUpdate: (self) => {
              // Smooth performance optimization
              if (self.progress === 1 || self.progress === 0) {
                gsap.set(container, { willChange: "auto" });
              } else {
                gsap.set(container, { willChange: "transform" });
              }
            },
            invalidateOnRefresh: true
          }
        });

        return () => {
          scrollTween.scrollTrigger?.kill();
          scrollTween.kill();
        };
      }
    };

    const timeoutId = setTimeout(updateAnimation, 100);
    const resizeObserver = new ResizeObserver(() => {
      clearTimeout(timeoutId);
      setTimeout(updateAnimation, 100);
    });

    resizeObserver.observe(wrapper);

    return () => {
      clearTimeout(timeoutId);
      resizeObserver.disconnect();
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === wrapper) {
          trigger.kill();
        }
      });
    };
  }, [isMobile, isInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 50, -50, 0],
            y: [0, -30, 30, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -40, 40, 0],
            y: [0, 40, -40, 0],
            scale: [1, 0.7, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5,
          }}
        />
      </div>

      {/* Header */}
      <motion.div 
        className="relative z-10 text-center py-12 px-6"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="inline-flex items-center space-x-3 glass rounded-full px-6 py-3 mb-6 border border-white/20"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
          <span className="font-medium text-gray-200">Our Creative Process</span>
        </motion.div>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
          <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            From Vision to
          </span>
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Digital Reality
          </span>
        </h2>
        
        <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Step-by-step approach to build and launch high-performing websites that drive results.
        </p>
      </motion.div>

      {/* Process Steps */}
      {isMobile ? (
        // Mobile: Vertical scroll layout
        <motion.div
          className="relative z-10 px-6 pb-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="grid gap-6 max-w-lg mx-auto">
            {designProcess.map((step, index) => (
              <motion.div
                key={step.step}
                variants={itemVariants}
                className="process-panel"
              >
                <TimelineStep {...step} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      ) : (
        // Desktop: Horizontal scroll layout
        <div ref={wrapperRef} className="relative z-10 h-screen flex items-center">
          <div ref={containerRef} className="flex items-stretch">
            {designProcess.map((step, index) => (
              <motion.div
                key={step.step}
                className="process-panel"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
              >
                <TimelineStep {...step} />
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <motion.div 
        className="relative z-10 text-center py-8 px-6"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <p className="text-gray-400 text-sm max-w-2xl mx-auto">
          From strategy to launch, we handle every detail to ensure your digital success. 
          Ready to start your project?
        </p>
      </motion.div>
    </section>
  );
}

function TimelineStep({ step, title, description, details }: Step) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      className="h-full p-6 rounded-2xl border shadow-xl backdrop-blur-xl bg-white/5 border-blue-400/20 shadow-blue-500/20 hover:border-blue-400/40 hover:shadow-blue-500/30 transition-all duration-500 cursor-pointer group"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ 
        y: -8,
        scale: 1.02,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <motion.div 
            className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-white font-bold text-lg md:text-2xl shadow-lg bg-gradient-to-r from-blue-500 to-cyan-400 mb-4"
            animate={{
              scale: isHovered ? 1.1 : 1,
              rotate: isHovered ? 5 : 0
            }}
            transition={{ duration: 0.3 }}
          >
            {step}
          </motion.div>
          <h4 className="font-semibold text-white text-lg md:text-xl text-center group-hover:text-blue-300 transition-colors duration-300">
            {title}
          </h4>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col">
          <p className="text-gray-300 text-sm md:text-base mb-4 text-center leading-relaxed">
            {description}
          </p>
          
          <motion.ul 
            className="text-gray-200 text-sm space-y-2 flex-1"
            initial={{ opacity: 0.8 }}
            animate={{ opacity: isHovered ? 1 : 0.8 }}
            transition={{ duration: 0.3 }}
          >
            {details.map((item, i) => (
              <motion.li 
                key={i} 
                className="flex items-start group/item"
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
              >
                <CheckCircle2 className="w-4 h-4 text-blue-300 mr-3 mt-0.5 flex-shrink-0 group-hover/item:text-cyan-300 transition-colors duration-300" />
                <span className="leading-relaxed">{item}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </motion.div>
  );
}
