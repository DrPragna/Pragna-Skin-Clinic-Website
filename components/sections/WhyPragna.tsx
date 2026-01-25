'use client';

import { useRef, useState, useEffect, RefObject } from 'react';
import { motion, useInView, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

/**
 * WHY PRAGNA - Glass Prism Redesign
 * 
 * Design Philosophy:
 * - Glassmorphism cards for breathable elegance
 * - Layered depth with large typography
 * - Atmospheric background with subtle movement
 */

const pillars = [
  {
    number: '01',
    title: 'Legacy of\nMastery',
    description: "Established 25 years ago by Dr. Padmavathi Surapaneni, a pioneer in South Indian dermatology. Her approach shaped modern aesthetic practice in the region.",
  },
  {
    number: '02',
    title: 'Curated\nInnovation',
    description: 'We invest in proven, gold-standard technology, not trends. Each treatment is chosen for safety, consistency, and outcomes you can see (and trust) over time.',
  },
  {
    number: '03',
    title: 'Integrity\nby Design',
    description: 'No unnecessary procedures. No surprise costs. Just honest, evidence-based dermatology with clear options, clear timelines, and long-term skin health as the goal.',
  },
];

export default function WhyPragna() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section 
      ref={containerRef}
      className="py-12 lg:py-16 bg-white relative overflow-hidden"
    >
      {/* Pure White Background */}
      <div className="absolute inset-0 bg-white" />
      
      {/* Elegant Static Line with Traveling Dot - Hidden on mobile */}
      <svg className="hidden md:block absolute inset-0 w-full h-full pointer-events-none z-[1] overflow-visible">
        <defs>
          <linearGradient id="flow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#722B2B" stopOpacity="0" />
            <stop offset="20%" stopColor="#722B2B" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#B76E79" stopOpacity="0.4" />
            <stop offset="80%" stopColor="#722B2B" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#722B2B" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Main Elegant Curve */}
        <motion.path 
          d="M-200,300 C200,100 600,500 1000,300 S1800,100 2200,300"
          stroke="url(#flow-gradient)"
          strokeWidth="1.5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 2.5, ease: "easeInOut" }}
        />

        {/* Traveling Particle - Energy Flow (Optimized: No blur filter) */}
        <circle r="4" fill="#B76E79">
          <animateMotion 
            dur="12s" 
            repeatCount="indefinite"
            path="M-200,300 C200,100 600,500 1000,300 S1800,100 2200,300"
          />
        </circle>
      </svg>

      <div className="section-container max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-10 lg:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-maroon/80 font-medium tracking-[0.2em] uppercase text-xs block mb-4 lg:mb-6"
          >
            The Pragna Promise
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl lg:text-7xl font-display text-charcoal tracking-tight"
          >
            Why patients <span className="italic text-maroon font-serif">trust us</span>
          </motion.h2>
        </div>

        {/* Glass Prism Grid - Adaptive Layout */}
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 pt-4 pb-2 -mx-6 px-6 scrollbar-hide lg:grid lg:grid-cols-3 lg:gap-10 lg:pb-0 lg:mx-0 lg:px-0 lg:pt-0"
        >
          {pillars.map((pillar, index) => (
            <PillarCard
              key={pillar.number}
              pillar={pillar}
              index={index}
              isInView={isInView}
              containerRef={scrollContainerRef}
            />
          ))}
          {/* Trailing spacer - fixes CSS bug where right padding collapses in overflow-x containers */}
          <div className="min-w-[10vw] shrink-0 lg:hidden" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}

function PillarCard({ 
  pillar, 
  index, 
  isInView,
  containerRef
}: { 
  pillar: any; 
  index: number; 
  isInView: boolean;
  containerRef: RefObject<HTMLDivElement | null>;
}) {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Detect touch devices (mobile)
  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice(window.matchMedia('(hover: none)').matches);
    };
    checkTouch();
  }, []);

  // Horizontal Scroll Tracking for Focus Effect
  const { scrollXProgress } = useScroll({
    container: containerRef,
    target: cardRef,
    axis: "x",
    offset: ["center end", "center start"]
  });

  // Calculate focus state based on position
  useMotionValueEvent(scrollXProgress, "change", (latest) => {
    if (!isTouchDevice) return;
    const isCenter = latest > 0.35 && latest < 0.65;
    setIsFocused(isCenter);
  });
  
  // Cinematic Scale: Center card is 1.0 (natural), edges shrink slightly
  const scale = useTransform(scrollXProgress, [0, 0.5, 1], [0.93, 1, 0.93]);

  // Determine if we should show the "Active" state
  const isActive = isTouchDevice ? isFocused : undefined;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ 
        duration: 0.8, 
        delay: 0.2 + (index * 0.15),
        ease: [0.22, 1, 0.36, 1]
      }}
      style={isTouchDevice ? { scale } : undefined}
      className="min-w-[75vw] snap-center lg:min-w-0 group relative"
    >
      <div className={`relative h-full p-8 lg:p-14 rounded-2xl lg:rounded-[2rem] border transition-all duration-500 overflow-hidden lg:hover:-translate-y-2 lg:hover:bg-white lg:hover:shadow-[0_20px_40px_rgba(183,110,121,0.15)] lg:hover:border-rose-gold/40 group-hover:after:opacity-100 after:absolute after:inset-0 after:bg-gradient-to-tr after:from-rose-gold/5 after:via-white/40 after:to-transparent after:transition-opacity after:duration-500 after:pointer-events-none
        ${isActive 
          ? '-translate-y-2 bg-white shadow-[0_20px_60px_rgba(183,110,121,0.1)] border-rose-gold/40 after:opacity-100' 
          : 'bg-white/95 border-stone-200/50 shadow-[0_8px_30px_rgba(0,0,0,0.08)] after:opacity-0'
        }`}
      >
        
        {/* Decorative Number Layered Behind */}
        <span className={`absolute top-4 left-6 lg:top-6 lg:left-8 text-[6rem] lg:text-[10rem] leading-none font-display select-none pointer-events-none transition-colors duration-500 lg:group-hover:text-maroon/[0.08]
          ${isActive ? 'text-maroon/[0.08]' : 'text-stone-200/80'}`}
        >
          {pillar.number}
        </span>

        {/* Subtle Gradient Overlay on Hover (Desktop only) */}
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        
        {/* Content */}
        <div className="relative z-10 flex flex-col h-full min-h-[240px] lg:min-h-[280px]">
          {/* Icon/Accent Line - Extending on Hover */}
          <div className={`mb-auto h-[2px] bg-gradient-to-r transition-all duration-500 lg:group-hover:from-maroon lg:group-hover:w-24
            ${isActive ? 'w-24 from-maroon' : 'w-12 from-maroon/40'}`} 
          />

          {/* Title */}
          <h3 className={`text-2xl lg:text-3xl xl:text-4xl font-display mb-4 lg:mb-6 leading-[1.1] lg:group-hover:text-maroon transition-colors duration-500 mt-auto
            ${isActive ? 'text-maroon' : 'text-charcoal'}`}
          >
            {pillar.title}
          </h3>

          {/* Description */}
          <p className="text-charcoal/70 leading-relaxed text-sm lg:text-base font-light tracking-wide">
            {pillar.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}