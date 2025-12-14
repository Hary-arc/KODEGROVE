import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

interface ClientLogosSectionProps {
  direction?: 'left' | 'right';
  logos?: string[];
  speed?: number;
}

export const ClientLogosSection = ({
  direction = 'left',
  logos,
  speed = 80
}: ClientLogosSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isInView = useInView(containerRef, { once: true });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const defaultLogos = [
    'TechCorp',
    'InnovateLab',
    'FutureBank',
    'MedFlow',
    'EduPlatform',
    'RetailPro',
    'StartupHub',
    'CloudTech',
    'DataDrive',
    'AppForge',
    'WebCraft',
    'CodeLab',
    'Nimbus Solutions',
    'Apexbyte Labs',
    'Velora Systems',
    'Crestwave Media',
    'BlueOak Technologies',
    'Northbridge Digital',
    'Silverline Innovations',
    'Evercrest Software',
    'Peakstone Ventures',
    'Brightleaf Studios',
    'Modularis Tech',
    'HorizonPath Analytics',
    'UrbanEcho Creative',
    'Novaplex Networks',
    'Zenford Consulting',
    'Atomis Cloud'
  ];

  const currentLogos = logos || defaultLogos;

  // Hypnotic particles animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = canvas.parentElement?.offsetHeight || 300;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;
    }> = [];

    const colors = ['#8b5cf6', '#06b6d4', '#ec4899', '#10b981'];

    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.3 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let animationId: number;

    function animate() {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        ctx.shadowBlur = 15;
        ctx.shadowColor = particle.color;
        ctx.fill();
        ctx.restore();

        particles.slice(index + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.save();
            ctx.globalAlpha = ((120 - distance) / 120) * 0.15;
            ctx.strokeStyle = particle.color;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
            ctx.restore();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = canvas.parentElement?.offsetHeight || 300;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative py-16 overflow-hidden bg-gradient-to-br from-background via-secondary to-background"
    >
      {/* Animated Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.4 }}
      />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/10 to-primary/5" />

      <div className="relative z-10 w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h3 className="font-outfit text-2xl font-bold text-white mb-4">
            Trusted by Industry Leaders
          </h3>
          <p className="text-gray-500">
            Join hundreds of companies that have transformed their digital presence with us
          </p>
        </div>

        {/* Client Logo Marquee - Row 1 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-6"
        >
          <div className="relative overflow-hidden">
            <div
              className="flex whitespace-nowrap"
              style={{
                animation: `marquee ${speed}s linear infinite`,
                width: 'fit-content'
              }}
            >
              {currentLogos.map((logo, index) => (
                <div
                  key={`first-${index}`}
                  className="mx-4 sm:mx-8 flex-shrink-0"
                >
                  <div className="rounded-xl px-4 py-2 sm:px-8 sm:py-4 border border-border/30 hover:border-primary/50 transition-all duration-300 bg-card/50 backdrop-blur-sm hover:scale-105">
                    <span className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-gray-500 to-white bg-clip-text text-transparent">
                      {logo}
                    </span>
                  </div>
                </div>
              ))}
              {currentLogos.map((logo, index) => (
                <div
                  key={`second-${index}`}
                  className="mx-4 sm:mx-8 flex-shrink-0"
                >
                  <div className="rounded-xl px-4 py-2 sm:px-8 sm:py-4 border border-border/30 hover:border-primary/50 transition-all duration-300 bg-card/50 backdrop-blur-sm hover:scale-105">
                    <span className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-gray-500 to-white bg-clip-text text-transparent">
                      {logo}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Client Logo Marquee - Row 2 (Reverse) */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="relative overflow-hidden">
            <div
              className="flex whitespace-nowrap"
              style={{
                animation: `marquee-reverse ${speed * 0.8}s linear infinite`,
                width: 'fit-content'
              }}
            >
              {[...currentLogos].reverse().map((logo, index) => (
                <div
                  key={`reverse-first-${index}`}
                  className="mx-4 sm:mx-8 flex-shrink-0"
                >
                  <div className="rounded-xl px-4 py-2 sm:px-8 sm:py-4 border border-border/30 hover:border-accent/50 transition-all duration-300 bg-card/50 backdrop-blur-sm hover:scale-105">
                    <span className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-gray-500 to-white bg-clip-text text-transparent">
                      {logo}
                    </span>
                  </div>
                </div>
              ))}
              {[...currentLogos].reverse().map((logo, index) => (
                <div
                  key={`reverse-second-${index}`}
                  className="mx-4 sm:mx-8 flex-shrink-0"
                >
                  <div className="rounded-xl px-4 py-2 sm:px-8 sm:py-4 border border-border/30 hover:border-accent/50 transition-all duration-300 bg-card/50 backdrop-blur-sm hover:scale-105">
                    <span className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-gray-500 to-white bg-clip-text text-transparent">
                      {logo}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
