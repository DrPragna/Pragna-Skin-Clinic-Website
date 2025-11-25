'use client';

import { ReactNode, useRef, useEffect, useState } from 'react';
import { motion, useInView, useAnimation, Variants, AnimatePresence } from 'framer-motion';

/**
 * PRAGNA ANIMATION SYSTEM
 * 
 * A collection of reusable motion components for world-class animations.
 * Built with Framer Motion for smooth, performant animations.
 */

// ===========================================
// ANIMATION VARIANTS
// ===========================================

export const fadeInUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 60,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1], // Expo ease
    }
  }
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    }
  }
};

export const scaleIn: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.9,
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    }
  }
};

export const slideInLeft: Variants = {
  hidden: { 
    opacity: 0, 
    x: -60,
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    }
  }
};

export const slideInRight: Variants = {
  hidden: { 
    opacity: 0, 
    x: 60,
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    }
  }
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    }
  }
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    }
  }
};

// ===========================================
// MOTION SECTION - Animates when scrolled into view
// ===========================================

interface MotionSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  variants?: Variants;
}

export function MotionSection({ 
  children, 
  className = '', 
  delay = 0,
  variants = fadeInUp 
}: MotionSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      style={{ transitionDelay: `${delay}s` }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ===========================================
// MOTION TEXT - Character/Word animations
// ===========================================

interface MotionTextProps {
  children: string;
  className?: string;
  type?: 'chars' | 'words' | 'lines';
  delay?: number;
  staggerDelay?: number;
}

export function MotionText({ 
  children, 
  className = '',
  type = 'words',
  delay = 0,
  staggerDelay = 0.03
}: MotionTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  
  const items = type === 'chars' 
    ? children.split('') 
    : type === 'words'
    ? children.split(' ')
    : [children];

  return (
    <motion.span
      ref={ref}
      className={`inline-block ${className}`}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delay,
          }
        }
      }}
    >
      {items.map((item, i) => (
        <motion.span
          key={i}
          className="inline-block"
          variants={{
            hidden: { 
              opacity: 0, 
              y: 40,
              rotateX: -90,
            },
            visible: { 
              opacity: 1, 
              y: 0,
              rotateX: 0,
              transition: {
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }
            }
          }}
        >
          {item}{type === 'words' && i < items.length - 1 ? '\u00A0' : ''}
        </motion.span>
      ))}
    </motion.span>
  );
}

// ===========================================
// MOTION IMAGE - Reveals with masking effect
// ===========================================

interface MotionImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  delay?: number;
}

export function MotionImage({ 
  src, 
  alt, 
  className = '',
  containerClassName = '',
  delay = 0
}: MotionImageProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  return (
    <motion.div
      ref={ref}
      className={`overflow-hidden ${containerClassName}`}
      initial={{ clipPath: 'inset(0 100% 0 0)' }}
      animate={isInView ? { clipPath: 'inset(0 0% 0 0)' } : {}}
      transition={{
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1],
        delay,
      }}
    >
      <motion.img
        src={src}
        alt={alt}
        className={className}
        initial={{ scale: 1.3 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{
          duration: 1.4,
          ease: [0.16, 1, 0.3, 1],
          delay,
        }}
      />
    </motion.div>
  );
}

// ===========================================
// MOTION CARD - 3D tilt effect on hover
// ===========================================

interface MotionCardProps {
  children: ReactNode;
  className?: string;
  tiltAmount?: number;
}

export function MotionCard({ 
  children, 
  className = '',
  tiltAmount = 5
}: MotionCardProps) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    setRotateX((-mouseY / rect.height) * tiltAmount);
    setRotateY((mouseX / rect.width) * tiltAmount);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`perspective-1000 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: 'transform 0.3s ease-out',
      }}
    >
      {children}
    </motion.div>
  );
}

// ===========================================
// MOTION COUNTER - Animated number counting
// ===========================================

interface MotionCounterProps {
  from?: number;
  to: number;
  duration?: number;
  className?: string;
  suffix?: string;
  prefix?: string;
}

export function MotionCounter({ 
  from = 0, 
  to, 
  duration = 2,
  className = '',
  suffix = '',
  prefix = ''
}: MotionCounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(from);

  useEffect(() => {
    if (!isInView) return;

    const startTime = Date.now();
    const endTime = startTime + duration * 1000;

    const tick = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / (duration * 1000), 1);
      
      // Easing function (ease-out)
      const eased = 1 - Math.pow(1 - progress, 3);
      
      setCount(Math.round(from + (to - from) * eased));

      if (now < endTime) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  }, [isInView, from, to, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{count}{suffix}
    </span>
  );
}

// ===========================================
// MAGNETIC BUTTON - Follows cursor on hover
// ===========================================

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

export function MagneticButton({ 
  children, 
  className = '',
  strength = 0.3
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    setPosition({
      x: (e.clientX - centerX) * strength,
      y: (e.clientY - centerY) * strength,
    });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15 }}
    >
      {children}
    </motion.div>
  );
}

// ===========================================
// STAGGER CHILDREN - Animate children sequentially
// ===========================================

interface StaggerChildrenProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  delay?: number;
}

export function StaggerChildren({ 
  children, 
  className = '',
  staggerDelay = 0.1,
  delay = 0
}: StaggerChildrenProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delay,
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ 
  children, 
  className = '' 
}: { 
  children: ReactNode; 
  className?: string 
}) {
  return (
    <motion.div className={className} variants={staggerItem}>
      {children}
    </motion.div>
  );
}

// ===========================================
// PAGE TRANSITION - Smooth page transitions
// ===========================================

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ 
          duration: 0.5, 
          ease: [0.16, 1, 0.3, 1] 
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// ===========================================
// HOVER SCALE - Simple scale on hover
// ===========================================

interface HoverScaleProps {
  children: ReactNode;
  className?: string;
  scale?: number;
}

export function HoverScale({ 
  children, 
  className = '',
  scale = 1.02
}: HoverScaleProps) {
  return (
    <motion.div
      className={className}
      whileHover={{ scale }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ===========================================
// PARALLAX SCROLL - Y position based on scroll
// ===========================================

interface ParallaxScrollProps {
  children: ReactNode;
  className?: string;
  speed?: number;
}

export function ParallaxScroll({ 
  children, 
  className = '',
  speed = 0.5
}: ParallaxScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [y, setY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      
      const rect = ref.current.getBoundingClientRect();
      const scrollY = window.scrollY;
      const elementTop = rect.top + scrollY;
      const relativeScroll = scrollY - elementTop + window.innerHeight;
      
      setY(relativeScroll * speed);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }} className="will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}

