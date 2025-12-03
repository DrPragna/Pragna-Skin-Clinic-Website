'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { NoiseTexture } from '@/components/ui/ArtisticElements';

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
    description: 'Founded by Dr. N.K. Pragna, with over 25 years of clinical excellence. We don’t just treat skin; we understand its story.',
  },
  {
    number: '02',
    title: 'Curated\nInnovation',
    description: 'We don’t chase trends. We invest in gold-standard technologies proven to deliver safe, transformative results.',
  },
  {
    number: '03',
    title: 'Integrity\nby Design',
    description: 'No hidden costs, no unnecessary procedures. Just honest, evidence-based dermatology centered on your well-being.',
  },
];

export default function WhyPragna() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section 
      ref={containerRef}
      className="py-16 lg:py-24 bg-[#FDFCFB] relative overflow-hidden"
    >
      {/* Atmospheric Background - VISIBLE Color Washes - BREATHING ANIMATION */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FDF8F6] via-[#FDFCFB] to-[#FAF5F2]" />
      <NoiseTexture opacity={0.04} />

      {/* Large Rose/Maroon Wash (Top Right) */}
      <motion.div 
        className="absolute -top-[20%] -right-[15%] w-[1000px] h-[1000px] rounded-full blur-[80px] pointer-events-none"
        style={{ background: '#E8D5D0', opacity: 0.7 }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.7, 0.6, 0.7] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Terracotta Wash (Bottom Left) */}
      <motion.div 
        className="absolute -bottom-[15%] -left-[15%] w-[900px] h-[900px] rounded-full blur-[80px] pointer-events-none"
        style={{ background: '#F0DDD6', opacity: 0.6 }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.5, 0.6] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Center Maroon Accent */}
      <motion.div 
        className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-[100px] pointer-events-none"
        style={{ background: '#D4B0B0', opacity: 0.4 }}
        animate={{ scale: [1, 0.9, 1], opacity: [0.4, 0.5, 0.4] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />
      
      {/* Floating Golden Dust Particles - REMOVED */}
      
      {/* Elegant Static Line with Traveling Dot */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-[1] overflow-visible">
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

        {/* Traveling Particle - Energy Flow */}
        <circle r="4" fill="#B76E79" filter="url(#glow)">
          <animateMotion 
            dur="12s" 
            repeatCount="indefinite"
            path="M-200,300 C200,100 600,500 1000,300 S1800,100 2200,300"
          />
        </circle>
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
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
              <div className="relative h-full p-8 lg:p-10 bg-white/40 backdrop-blur-xl rounded-[2rem] border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-2 hover:bg-white/70 hover:shadow-[0_0_40px_rgba(183,110,121,0.15)] hover:border-rose-gold/30 overflow-hidden group-hover:after:opacity-100 after:opacity-0 after:absolute after:inset-0 after:bg-gradient-to-tr after:from-rose-gold/5 after:via-white/40 after:to-transparent after:transition-opacity after:duration-500 after:pointer-events-none">
                
                {/* Decorative Number Layered Behind */}
                <span className="absolute -top-6 -right-4 text-[10rem] leading-none font-display text-maroon/[0.03] select-none pointer-events-none transition-colors duration-500 group-hover:text-maroon/[0.06]">
                  {pillar.number}
                </span>

                {/* Subtle Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                
                {/* Content */}
                <div className="relative z-10 flex flex-col h-full">
                  {/* Icon/Accent Line */}
                  <div className="mb-8 w-12 h-[2px] bg-gradient-to-r from-maroon/40 to-transparent group-hover:from-maroon group-hover:w-20 transition-all duration-500" />

                  {/* Title */}
                  <h3 className="text-3xl xl:text-4xl font-display text-charcoal mb-6 leading-[1.1] group-hover:text-maroon transition-colors duration-500">
                    {pillar.title}
                  </h3>

                  {/* Description */}
                  <p className="text-charcoal/70 leading-relaxed text-[15px] lg:text-base font-light tracking-wide mt-auto">
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
