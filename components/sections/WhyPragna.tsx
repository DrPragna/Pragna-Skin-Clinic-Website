'use client';

import { useRef, useState, useEffect, RefObject } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

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
      className="pt-12 pb-4 lg:py-16 bg-white relative overflow-hidden"
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
        <div className="text-center mb-12 lg:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-maroon/80 font-medium tracking-[0.2em] uppercase text-xs block mb-6"
          >
            The Pragna Promise
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl lg:text-7xl font-display text-charcoal tracking-tight"
          >
            Why patients <span className="italic text-maroon font-serif">trust us</span>
          </motion.h2>
        </div>

        {/* Glass Prism Grid - Horizontal scroll on mobile, grid on desktop */}
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 pt-4 pb-8 -mx-6 px-6 scrollbar-hide lg:grid lg:grid-cols-3 lg:gap-10 lg:pt-0 lg:pb-0 lg:mx-0 lg:px-0 lg:overflow-visible"
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
          {/* Trailing spacer for mobile carousel */}
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
  const [isMobile, setIsMobile] = useState(false);
  const [isFocused, setIsFocused] = useState(index === 0);
  const cardRef = useRef<HTMLDivElement>(null);

  // Detect mobile view (matches lg:grid breakpoint)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Horizontal Scroll Tracking for Focus Effect (mobile only)
  const { scrollXProgress } = useScroll({
    container: containerRef,
    target: cardRef,
    axis: "x",
    offset: ["center end", "center start"]
  });

  // 2. IntersectionObserver for Inner Content State
  // This efficiently toggles the "Active" state for inner elements
  // without the jank of per-frame state updates.
  useEffect(() => {
    if (!isMobile || !cardRef.current || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsFocused(entry.isIntersecting);
        });
      },
      {
        root: containerRef.current,
        threshold: 0.6, // Card is considered "focused" when 60% visible
      }
    );

    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [isMobile, containerRef]);
  
  // Cinematic Scale for mobile carousel
  const scale = useTransform(scrollXProgress, [0, 0.5, 1], [0.93, 1, 0.93]);

  // Mobile focus state
  const isActive = isMobile ? isFocused : false;

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
      style={isMobile ? { scale } : undefined}
      className="min-w-[75vw] snap-center snap-always lg:min-w-0 group relative"
    >
      {/* Card - Desktop uses hover:, Mobile uses isActive state */}
      <div className={`relative h-full p-8 lg:p-14 bg-white/95 rounded-2xl lg:rounded-[2rem] border lg:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-500 overflow-hidden
        ${isActive ? 'border-maroon/60' : 'border-stone-200/50'}
        ${!isMobile ? 'hover:-translate-y-2 hover:bg-white hover:shadow-[0_20px_40px_rgba(183,110,121,0.15)] hover:border-rose-gold/40' : ''}
        ${isActive ? '-translate-y-1 bg-white shadow-[0_20px_40px_rgba(183,110,121,0.15)]' : ''}
        group-hover:after:opacity-100 after:opacity-0 after:absolute after:inset-0 after:bg-gradient-to-tr after:from-rose-gold/5 after:via-white/40 after:to-transparent after:transition-opacity after:duration-500 after:pointer-events-none
        ${isActive ? 'after:opacity-100' : ''}`}
      >
        
        {/* Decorative Number Layered Behind */}
        <span className={`absolute top-4 left-6 lg:top-6 lg:left-8 text-[6rem] lg:text-[10rem] leading-none font-display text-stone-200/80 select-none pointer-events-none transition-colors duration-500
          ${!isMobile ? 'group-hover:text-maroon/[0.08]' : ''}
          ${isActive ? 'text-maroon/[0.08]' : ''}`}
        >
          {pillar.number}
        </span>

        {/* Subtle Gradient Overlay on Hover */}
        <div className={`absolute inset-0 bg-gradient-to-br from-white/40 to-transparent transition-opacity duration-700 pointer-events-none
          ${!isMobile ? 'opacity-0 group-hover:opacity-100' : 'opacity-0'}
          ${isActive ? 'opacity-100' : ''}`} 
        />
        
        {/* Content */}
        <div className="relative z-10 flex flex-col h-full min-h-[240px] lg:min-h-[280px]">
          {/* Icon/Accent Line */}
          <div className={`mb-auto h-[2px] bg-gradient-to-r from-maroon/40 to-transparent transition-all duration-500
            ${!isMobile ? 'w-12 group-hover:from-maroon group-hover:w-24' : ''}
            ${isActive ? 'w-24 from-maroon' : 'w-12'}`} 
          />

          {/* Title */}
          <h3 className={`text-2xl lg:text-3xl xl:text-4xl font-display text-charcoal mb-4 lg:mb-6 leading-[1.1] transition-colors duration-500 mt-auto
            ${!isMobile ? 'group-hover:text-maroon' : ''}
            ${isActive ? 'text-maroon' : ''}`}
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
