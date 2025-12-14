'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import React from 'react';
// Button component imported from UI components


interface HeroSectionProps {
    direction?: 'left' | 'right';
    logos?: string[];
    speed?: number;
}

export function HeroSection({
    direction = 'left',
    logos,
    speed = 50
}: HeroSectionProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const isInView = useInView(containerRef, { once: true });

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start'],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    // Default logos if none provided
    const defaultLogos = [
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

    // Animated headline text
    const headlineText = 'Digital Mastery Unleashed';
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        if (!isInView) return;

        let currentIndex = 0;
        const interval = setInterval(() => {
            if (currentIndex <= headlineText.length) {
                setDisplayedText(headlineText.slice(0, currentIndex));
                currentIndex++;
            } else {
                clearInterval(interval);
            }
        }, 100);

        return () => clearInterval(interval);
    }, [isInView]);

    // Hypnotic particles animation
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

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

        // Create particles
        for (let i = 0; i < 80; i++) {
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

                // Connect nearby particles
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
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <section
            id="home"
            ref={containerRef}
            className="relative flex items-center justify-center overflow-hidden"
        >
            {/* Animated Canvas Background */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 pointer-events-none"
                style={{ opacity: 0.4 }}
            />

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-purple-900/30 to-slate-900/90" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(139,92,246,0.15),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(6,182,212,0.15),transparent_50%)]" />

            <div className="relative z-10 w-full">
                {/* Client Logo Marquee */}
                <motion.div
                    className=" mt-8 pb-4"
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, delay: 1.8 }}
                >
                    {/* <div className="text-center mb-12">
            <p className="text-gray-400 font-medium mb-8">Trusted by industry leaders</p>
          </div> */}

                    {/* Marquee Container */}
                    <div className="relative overflow-hidden">
                        <div
                            className="flex whitespace-nowrap"
                            style={{
                                animation: `${direction === 'right' ? 'marquee-reverse' : 'marquee'} ${speed}s linear infinite`,
                                width: 'fit-content'
                            }}
                        >
                            {/* First set of logos */}
                            {currentLogos.map((logo, index) => (
                                <motion.div
                                    key={`first-${index}`}
                                    className="mx-4 sm:mx-8 flex-shrink-0"
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                >
                                    <div className="rounded-xl px-4 py-2 sm:px-8 sm:py-4 border border-white/10 hover:border-white/30 transition-all duration-300">
                                        <span className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-gray-500 to-white bg-clip-text text-transparent">
                                            {logo}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}

                            {/* Duplicate set for seamless loop */}
                            {currentLogos.map((logo, index) => (
                                <motion.div
                                    key={`second-${index}`}
                                    className="mx-4 sm:mx-8 flex-shrink-0"
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                >
                                    <div className="rounded-xl px-4 py-2 sm:px-8 sm:py-4 border border-white/10 hover:border-white/30 transition-all duration-300">
                                        <span className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-gray-500 to-white bg-clip-text text-transparent">
                                            {logo}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Scroll Indicator */}
            </div>
        </section>
    );
}
