import React, { useRef, useEffect, useState, ReactNode } from 'react';
import { motion, useInView, useSpring, useTransform, useScroll } from 'framer-motion';

// Enhanced scroll-triggered animations
export const useScrollAnimation = (threshold = 0.1) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: threshold, // Adjust threshold as needed
    margin: '-10% 0px -10% 0px',
  });

  return { ref, isInView };
};

// Smooth parallax effect
export const useParallaxEffect = (speed = 0.5) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, speed * 1000]);
  return y;
};

// Organic hover animations
export const OrganicHover = ({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <motion.div
      className={className}
      whileHover={{
        scale: 1.02,
        y: -8,
        rotateX: 5,
        rotateY: 5,
        z: 50,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
        duration: 0.6,
      }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
    >
      {children}
    </motion.div>
  );
};

// Smooth stagger animations
export const StaggerContainer = ({
  children,
  staggerDelay = 0.1,
}: {
  children: ReactNode;
  staggerDelay?: number;
}) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem = ({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: {
          opacity: 0,
          y: 50,
          scale: 0.9,
          filter: 'blur(10px)',
        },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          transition: {
            type: 'spring',
            stiffness: 100,
            damping: 12,
            duration: 0.8,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

// Floating elements with natural movement
export const FloatingElement = ({
  children,
  intensity = 1,
  className = '',
}: {
  children: ReactNode;
  intensity?: number;
  className?: string;
}) => {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -10 * intensity, 0],
        x: [0, 5 * intensity, -5 * intensity, 0],
        rotate: [0, 2 * intensity, -2 * intensity, 0],
        scale: [1, 1 + 0.02 * intensity, 1],
      }}
      transition={{
        duration: 6 + Math.random() * 4,
        repeat: Infinity,
        ease: 'easeInOut',
        times: [0, 0.3, 0.7, 1],
      }}
    >
      {children}
    </motion.div>
  );
};

// Morphing gradient background
export const MorphingGradient = ({ className = '' }) => {
  return (
    <motion.div
      className={`absolute inset-0 ${className}`}
      animate={{
        background: [
          'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)',
          'radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)',
          'radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.3) 0%, transparent 50%)',
          'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)',
        ],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
};

// Enhanced button with organic animations
export const OrganicButton = ({
  children,
  onClick,
  className = '',
  variant = 'primary',
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const variants = {
    primary:
      'bg-gradient-to-r from-purple-600 via-violet-600 to-purple-700 text-white shadow-lg shadow-purple-500/25',
    secondary:
      'bg-gradient-to-r from-slate-700 to-slate-800 text-white border border-purple-500/30',
    ghost: 'bg-transparent border border-purple-500/50 text-purple-300 hover:bg-purple-500/10',
  };

  return (
    <motion.button
      className={`relative overflow-hidden rounded-2xl px-8 py-4 font-semibold transition-all duration-300 ${variants[variant]} ${className}`}
      whileHover={{
        scale: 1.05,
        y: -2,
        boxShadow: '0 20px 40px rgba(139, 92, 246, 0.4)',
      }}
      whileTap={{
        scale: 0.98,
        y: 0,
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      onClick={onClick}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: '-100%' }}
        animate={isPressed ? { x: '100%' } : {}}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

// Liquid cursor follower
export const LiquidCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: { clientX: any; clientY: any }) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    window.addEventListener('mousemove', updateMousePosition);

    // Add hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll('button, a, [role="button"]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-4 h-4 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full mix-blend-difference pointer-events-none z-50"
      animate={{
        x: mousePosition.x - 8,
        y: mousePosition.y - 8,
        scale: isHovering ? 2 : 1,
      }}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 28,
        mass: 0.5,
      }}
    />
  );
};

// Text reveal animation
export const TextReveal = ({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) => {
  const { ref, isInView } = useScrollAnimation();

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{
          duration: 0.8,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};
