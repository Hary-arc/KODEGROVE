// HorizontalScrollOnVerticalScroll.tsx
import React, { useEffect } from "react";
import { motion } from "framer-motion";
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
  { step: "01", title: "Web Strategy", description: "We use in-depth research...", details: ["Identify your target audiences", "Analyze user pain points & define UVPs", "Define KPIs & business objectives", "Create a roadmap to brand growth"] },
  { step: "02", title: "Planning & Information Architecture", description: "We map your content...", details: ["User flow & sitemap creation", "Wireframes for seamless funnels", "On-brand messaging structure"] },
  { step: "03", title: "Design", description: "Where your site comes alive...", details: ["User-centered design features", "Interactive videos & animations", "Custom illustrations & branding", "Accessibility & SEO in design"] },
  { step: "04", title: "Responsive Development", description: "A responsive site adapts...", details: ["Touchpoint & channel insights", "Flexible UI development", "Cross-device testing & validation"] },
  { step: "05", title: "Quality Assurance", description: "We follow a strict QA process...", details: ["Client collaboration in testing", "Rigorous bug/error checks", "Launch-ready QA tools & audits"] },
  { step: "06", title: "Launch & Optimization", description: "From launch to ongoing optimization...", details: ["Structured launch protocol", "Post-launch maintenance", "Digital marketing integration"] },
];

export default function DesignProcessSection() {
  useEffect(() => {
    const wrapper = document.querySelector<HTMLElement>(".horizontal-wrapper");
    const container = wrapper?.querySelector<HTMLElement>(".horizontal-container");
    if (!wrapper || !container) return;

    const panels = gsap.utils.toArray<HTMLElement>(".panel", container);

    const setLayout = () => {
      const isMobile = window.innerWidth < 768;
      const cardsPerView = isMobile ? 1.5 : 3.5;
      const gap = isMobile ? 20 : 32;
      const maxCardWidth = 380;
      const edgePadding = isMobile ? 24 : 48;

      // Calculate card width more precisely
      const availableWidth = window.innerWidth - (edgePadding * 2) - (gap * (cardsPerView - 1));
      let cardWidth = availableWidth / cardsPerView;
      cardWidth = Math.min(cardWidth, maxCardWidth);

      // Apply styles with smooth transitions
      panels.forEach((panel, index) => {
        gsap.set(panel, {
          width: cardWidth,
          flexShrink: 0,
        });
      });

      // Configure container layout
      gsap.set(container, {
        display: "flex",
        alignItems: "stretch",
        gap: gap,
        paddingLeft: edgePadding,
        paddingRight: edgePadding,
        willChange: "transform",
      });

      // Calculate total scroll distance more accurately
      const totalWidth = panels.length * (cardWidth + gap) - gap + (edgePadding * 2);
      const scrollDistance = Math.max(0, totalWidth - window.innerWidth);

      // Clear any existing ScrollTriggers
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === wrapper) st.kill();
      });

      // Create smooth horizontal scroll animation
      if (scrollDistance > 0) {
        gsap.to(container, {
          x: -scrollDistance,
          ease: "none",
          scrollTrigger: {
            trigger: wrapper,
            start: "top center",
            end: () => `+=${scrollDistance * 2}`,
            pin: wrapper,
            scrub: 1.2, // Smoother scrub value
            invalidateOnRefresh: true,
            anticipatePin: 1,
            refreshPriority: -1,
            onUpdate: (self) => {
              // Smooth out any potential glitches
              const progress = self.progress;
              const smoothedProgress = gsap.utils.clamp(0, 1, progress);
              gsap.to(container, {
                x: -scrollDistance * smoothedProgress,
                duration: 0.1,
                ease: "power2.out",
                overwrite: "auto"
              });
            }
          },
        });
      }
    };

    // Debounce resize handler to prevent excessive recalculations
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
        setLayout();
      }, 250);
    };

    setLayout();
    window.addEventListener("resize", handleResize, { passive: true });
    
    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === wrapper) st.kill();
      });
    };
  }, []);

  return (
    <section className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Header */}
      <div className="relative z-20 bg-slate-950/95 backdrop-blur-sm text-center py-12">
        <motion.h2 
          className="text-4xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Our Creative Process
        </motion.h2>
        <motion.p 
          className="text-gray-300 max-w-2xl mx-auto text-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Step-by-step approach to build and launch high-performing websites.
        </motion.p>
      </div>

      {/* Horizontal scroll wrapper */}
      <div className="horizontal-wrapper relative min-h-[600px] flex items-center">
        <div className="horizontal-container relative">
          {designProcess.map((step, index) => (
            <TimelineStep key={step.step} {...step} index={index} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="relative text-center py-12 z-10 bg-slate-950/95 backdrop-blur-sm">
        <motion.p 
          className="text-gray-400 text-base max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          From strategy to launch, we handle it all to ensure your success.
        </motion.p>
      </div>
    </section>
  );
}

function TimelineStep({ step, title, description, details, index }: Step & { index: number }) {
  return (
    <motion.div 
      className="panel relative p-8 rounded-3xl border shadow-2xl backdrop-blur-xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border-white/10 hover:border-purple-400/30 transition-all duration-500 group"
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      viewport={{ once: true, margin: "-10%" }}
      whileHover={{ 
        y: -8,
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      style={{ willChange: "transform" }}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/10 via-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10">
        <div className="flex flex-col items-center mb-6">
          <motion.div 
            className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-400 mb-4 group-hover:scale-110 transition-transform duration-300"
            whileHover={{ rotate: 5 }}
          >
            {step}
          </motion.div>
          <h4 className="font-semibold text-white text-lg text-center group-hover:text-purple-300 transition-colors duration-300">
            {title}
          </h4>
        </div>
        
        <p className="text-gray-300 text-sm mb-6 text-center leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
          {description}
        </p>
        
        <ul className="text-gray-200 text-sm space-y-3">
          {details.map((item, i) => (
            <motion.li 
              key={i} 
              className="flex items-start group-hover:text-white transition-colors duration-300"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 + i * 0.1 }}
              viewport={{ once: true }}
            >
              <CheckCircle2 className="w-4 h-4 text-cyan-400 mr-3 mt-0.5 flex-shrink-0 group-hover:text-cyan-300 transition-colors duration-300" />
              <span className="leading-relaxed">{item}</span>
            </motion.li>
          ))}
        </ul>
      </div>
      
      {/* Subtle glow effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/5 to-cyan-500/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
}
