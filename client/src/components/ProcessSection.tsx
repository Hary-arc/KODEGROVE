'use client';

import { useEffect, useRef, useState } from "react";
import { ChevronRight, Lightbulb, FileText, Palette, Code, CheckCircle2, Rocket } from "lucide-react";
import { useSticky } from "../hooks/use-sticky";

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  image: string;
  details: string[];
}

const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Web Strategy",
    description:
      "We use in-depth research and analysis as key pillars to build a step-by-step plan that expands your digital presence and drives online growth.",
    image: "Lightbulb",
    details: [
      "Identify your target audiences",
      "Analyze user pain-points & define your UVPs",
      "Define key performance indicators (KPIs)",
      "Create a roadmap to growing your brand online",
    ],
  },
  {
    number: "02",
    title: "Planning & Information Architecture",
    description:
      "We utilize proven techniques to map your content, meet user intentions and create an engaging user experience. By outlining your site's structure, we ensure seamless user journeys to key conversion points.",
    image: "FileText",
    details: [
      "We develop a base-level user flow & sitemap",
      "We utilize wireframing to create a seamless conversion funnel",
      "We add on-brand, consistent messaging to your structure",
    ],
  },
  {
    number: "03",
    title: "Creative Design",
    description:
      "This stage is where you will see your site come to life. Our award-winning designers implement your unique branding elements to add your identity to your custom web design in NYC.",
    image: "Palette",
    details: [
      "Thoughtfully place design features to guide to the user journey",
      "Utilize interactive videos & animations",
      "Create custom, branded illustrations",
      "Ensure accessibility & search engine optimization",
    ],
  },
  {
    number: "04",
    title: "Responsive Development",
    description:
      "A responsive website is fast, accessible and easy to navigate. It automatically scales to various screen sizes and devices, driving user experience and climbing search engine rankings.",
    image: "Code",
    details: [
      "Gather touchpoint & user-channel insights",
      "Transform your wireframes into a flexible UI",
      "Test across devices before approval & launch",
    ],
  },
  {
    number: "05",
    title: "Quality Assurance (QA)",
    description:
      "We follow a strict quality assurance protocol to ensure a flawless digital experience before launch.",
    image: "CheckCircle2",
    details: [
      "Involve clients throughout every project",
      "Meticulously test all designs to catch errors",
      "Use tried-and-tested tools before launch",
    ],
  },
  {
    number: "06",
    title: "Launch & Optimization",
    description:
      "We provide ongoing monitoring and optimization post-launch to ensure peak performance.",
    image: "Rocket",
    details: [
      "Follow strict launch protocol",
      "Offer post-launch maintenance & optimization",
      "Implement digital marketing for awareness",
    ],
  },
];

export function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const translateRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  // 👇 One line does all sticky logic
  useSticky(sectionRef, stickyRef);

  const [activeStep, setActiveStep] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const translateContainer = translateRef.current;
    if (!section || !translateContainer) return;

    let ticking = false;

    const updateScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;

      if (sectionTop <= 0 && sectionTop > -sectionHeight + windowHeight) {
        const scrolled = Math.abs(sectionTop);
        const maxScroll = sectionHeight - windowHeight;
        const progress = Math.min(Math.max(scrolled / maxScroll, 0), 1);

        // Calculate translateX
        const maxTranslate = (processSteps.length - 1) * 100;
        const translateX = progress * maxTranslate;

        // Apply transform directly to DOM (no re-render)
        translateContainer.style.transform = `translate3d(-${translateX}vw, 0, 0)`;

        // Update only minimal state for indicators
        setScrollProgress(progress * 100);
        setActiveStep(
          Math.min(Math.floor(progress * processSteps.length), processSteps.length - 1)
        );
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToStep = (index: number) => {
    const section = sectionRef.current;
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const sectionTop = rect.top + window.scrollY;
    const sectionHeight = rect.height;
    const windowHeight = window.innerHeight;
    const maxScroll = sectionHeight - windowHeight;

    const targetProgress = index / (processSteps.length - 1);
    const targetScroll = sectionTop + targetProgress * maxScroll;

    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  const sectionHeight = `${(processSteps.length + 1) * 100}vh`;

  return (
    <section
      ref={sectionRef}
      className="scroll-jacking-container relative w-full"
      style={{ height: sectionHeight, overflow: 'visible' }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 pointer-events-none" />

      <div ref={stickyRef} className="w-full h-screen bg-black/50">
        {/* Header */}
        <div className="relative z-10 px-4 pt-8 md:pt-12 pb-4 md:pb-6 text-center flex-shrink-0">
          <h2 className="text-3xl md:text-4xl lg:text-5xl mb-3 bg-gradient-to-r from-white via-cyan-100 to-purple-200 bg-clip-text text-transparent">
            Website Design Process
          </h2>
          <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto">
            Explore how our team crafts impactful websites with{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              measurable results
            </span>
            .
          </p>
        </div>

        {/* Progress Bar */}
        <div className="relative z-10 px-4 md:px-8 lg:px-16 mb-4 md:mb-6 flex-shrink-0">
          <div className="max-w-7xl mx-auto">
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className="progress-bar h-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-300 ease-out"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>
            <div className="flex justify-between mt-3">
              {processSteps.map((step, index) => (
                <button
                  key={step.number}
                  onClick={() => scrollToStep(index)}
                  className={`w-8 h-8 md:w-10 md:h-10 rounded-full border-2 flex items-center justify-center text-xs md:text-sm transition-all ${
                    index <= activeStep
                      ? "bg-gradient-to-r from-cyan-500 to-purple-500 border-transparent text-white"
                      : "bg-transparent border-white/30 text-white/50"
                  }`}
                >
                  {step.number}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Horizontal Scroll Content */}
        <div className="relative z-10 flex-1 flex items-center overflow-hidden px-4 md:px-8 lg:px-16">
          <div
            ref={translateRef}
            className="horizontal-scroll-wrapper flex will-change-transform"
            style={{ width: `${processSteps.length * 100}vw` }}
          >
            {processSteps.map((step, index) => (
              <div
                key={step.number}
                className="scroll-snap-item flex-shrink-0 w-screen flex items-center justify-center"
              >
                <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-6 lg:gap-10 items-center">
                  {/* Icon */}
                  <div className="flex justify-center lg:justify-end order-2 lg:order-1">
                    <div className="relative w-full max-w-xs md:max-w-sm flex items-center justify-center">
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 blur-3xl rounded-full" />
                      <div className="relative z-10 w-48 h-48 md:w-64 md:h-64 rounded-3xl bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 border border-white/10 backdrop-blur-xl flex items-center justify-center group">
                        {step.image === "Lightbulb" && <Lightbulb className="w-24 h-24 md:w-32 md:h-32 text-cyan-400 group-hover:scale-110 transition-transform duration-500" />}
                        {step.image === "FileText" && <FileText className="w-24 h-24 md:w-32 md:h-32 text-purple-400 group-hover:scale-110 transition-transform duration-500" />}
                        {step.image === "Palette" && <Palette className="w-24 h-24 md:w-32 md:h-32 text-pink-400 group-hover:scale-110 transition-transform duration-500" />}
                        {step.image === "Code" && <Code className="w-24 h-24 md:w-32 md:h-32 text-cyan-400 group-hover:scale-110 transition-transform duration-500" />}
                        {step.image === "CheckCircle2" && <CheckCircle2 className="w-24 h-24 md:w-32 md:h-32 text-green-400 group-hover:scale-110 transition-transform duration-500" />}
                        {step.image === "Rocket" && <Rocket className="w-24 h-24 md:w-32 md:h-32 text-purple-400 group-hover:scale-110 transition-transform duration-500" />}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-4 md:space-y-5 order-1 lg:order-2">
                    <div className="flex items-center gap-3 md:gap-4">
                      <span className="text-5xl md:text-7xl text-white/10">
                        {step.number}
                      </span>
                      <h3 className="text-2xl md:text-3xl lg:text-4xl bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                        {step.title}
                      </h3>
                    </div>

                    <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                      {step.description}
                    </p>

                    {step.details.length > 0 && (
                      <ul className="space-y-2 md:space-y-3 pt-3">
                        {step.details.map((detail, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 md:gap-3 text-gray-300"
                          >
                            <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-cyan-400" />
                            <span className="text-xs md:text-sm">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Hint */}
        <div className="relative z-10 text-center pb-4 md:pb-6 flex-shrink-0">
          <p className="text-gray-400 text-xs md:text-sm">
            ↓ Scroll down to explore our process ↓
          </p>
        </div>
      </div>
    </section>
  );
}
