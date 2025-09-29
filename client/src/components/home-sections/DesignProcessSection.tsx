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
      const cardsPerView = isMobile ? 2 : 3;
      const gap = isMobile ? 16 : 32;
      const maxCardWidth = 400;
      const edgePadding = gap;

      // Calculate card width dynamically
      let cardWidth = (window.innerWidth - gap * (cardsPerView + 1)) / cardsPerView;
      cardWidth = Math.min(cardWidth, maxCardWidth);

      panels.forEach(panel => {
        panel.style.flex = `0 0 ${cardWidth}px`;
      });

      container.style.display = "flex";
      container.style.flexWrap = "nowrap";
      container.style.willChange = "transform";

      container.style.alignItems = "stretch";
      container.style.gap = `${gap}px`;
      container.style.paddingLeft = `${edgePadding}px`;
      container.style.paddingRight = `${edgePadding}px`;

      const totalScroll = (panels.length * (cardWidth + gap)) - window.innerWidth + edgePadding;

      
      gsap.to(container, {
        x: -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          start: `center center`,
          end: () => `+=${container.scrollWidth - wrapper.clientWidth}`,
          pin: true,
          scrub: 0.1,
          snap: {
            snapTo: 1 / (panels.length - 1),
            duration: { min: 0.3, max: 0.4 },
            ease: "power1.inOut"
          }
        }
      });

      ScrollTrigger.refresh();
    };

    setLayout();
    window.addEventListener("resize", setLayout);
    return () => window.removeEventListener("resize", setLayout);
  }, []);

  return (
    <section className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-slate-950 text-center py-8">
        <h2 className="text-4xl font-bold text-white mb-2">Our Creative Process</h2>
        <p className="text-gray-300 max-w-2xl mx-auto">Step-by-step approach to build and launch high-performing websites.</p>
      </div>

      {/* Horizontal scroll wrapper */}
      <div className="horizontal-wrapper">
        <div className="horizontal-container">
          {designProcess.map(step => (
            <TimelineStep key={step.step} {...step} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-8 z-10 bg-slate-950">
        <p className="text-gray-400 text-sm">From strategy to launch we handle it all to ensure your success.</p>
      </div>
    </section>
  );
}

function TimelineStep({ step, title, description, details }: Step) {
  return (
    <motion.div className="panel flex-shrink-0 p-6 rounded-2xl border shadow-xl backdrop-blur-xl bg-white/10 border-blue-400/40 shadow-blue-500/30">
      <div className="flex flex-col items-center mb-4">
        <div className="w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg bg-gradient-to-r from-blue-500 to-cyan-400 mb-2">
          {step}
        </div>
        <h4 className="font-semibold text-white text-base text-center">{title}</h4>
      </div>
      <p className="text-gray-300 text-sm mb-2 text-center">{description}</p>
      <ul className="text-gray-200 text-sm space-y-1">
        {details.map((item, i) => (
          <li key={i} className="flex items-start">
            <CheckCircle2 className="w-4 h-4 text-blue-300 mr-2 mt-0.5" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}