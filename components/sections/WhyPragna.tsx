'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

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
    description: "Founded by Dr. Padmavathi Surapaneni, with 25+ years of experience. Tailored plans, transparent care, and results designed to look natural.",
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

        {/* Glass Prism Grid */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-10">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.number}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.8, 
                delay: 0.2 + (index * 0.15),
                ease: [0.22, 1, 0.36, 1]
              }}
              className="group relative"
            >
              <div className="relative h-full p-10 lg:p-14 bg-white/80 backdrop-blur-xl rounded-[2rem] border border-stone-200/50 shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 hover:bg-white hover:shadow-[0_20px_40px_rgba(183,110,121,0.15)] hover:border-rose-gold/40 overflow-hidden group-hover:after:opacity-100 after:opacity-0 after:absolute after:inset-0 after:bg-gradient-to-tr after:from-rose-gold/5 after:via-white/40 after:to-transparent after:transition-opacity after:duration-500 after:pointer-events-none">
                
                {/* Decorative Number Layered Behind - Larger & More Editorial */}
                <span className="absolute top-6 left-8 text-[8rem] lg:text-[10rem] leading-none font-display text-stone-200/80 select-none pointer-events-none transition-colors duration-500 group-hover:text-maroon/[0.08]">
                  {pillar.number}
                </span>

                {/* Subtle Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                
                {/* Content */}
                <div className="relative z-10 flex flex-col h-full min-h-[280px]">
                  {/* Icon/Accent Line - Extending on Hover */}
                  <div className="mb-auto w-12 h-[2px] bg-gradient-to-r from-maroon/40 to-transparent group-hover:from-maroon group-hover:w-24 transition-all duration-500" />

                  {/* Title */}
                  <h3 className="text-3xl xl:text-4xl font-display text-charcoal mb-6 leading-[1.1] group-hover:text-maroon transition-colors duration-500 mt-auto">
                    {pillar.title}
                  </h3>

                  {/* Description */}
                  <p className="text-charcoal/70 leading-relaxed text-[15px] lg:text-base font-light tracking-wide">
                    {pillar.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
