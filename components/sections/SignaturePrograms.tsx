'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';

/**
 * SIGNATURE PROGRAMS - Uniform Editorial Grid
 * 
 * Design Philosophy:
 * - "Vogue Magazine Cover" style cards
 * - Uniform height and width for consistency
 * - Minimalist, high-impact typography
 */

const programs = [
  {
    title: 'Glow Getters',
    subtitle: 'Radiance Revival',
    description: 'Customized treatment plans that brighten, smooth, and refresh tired skin.',
    duration: '4-6 sessions',
  },
  {
    title: 'Mommy Makeover',
    subtitle: 'Post-Pregnancy Care',
    description: 'Gentle treatments to reclaim confidence in skin, body, and hair.',
    duration: '6-8 sessions',
  },
  {
    title: 'Bridal Beauty',
    subtitle: 'Pre-Wedding Glow',
    description: 'Step-by-step care for clear, even, and luminous skin on your big day.',
    duration: '3-6 months',
  },
  {
    title: 'Rewind',
    subtitle: 'Anti-Aging',
    description: 'Target lines and loss of firmness with advanced anti-aging solutions.',
    duration: '4-8 sessions',
  },
  {
    title: 'Signature Reset',
    subtitle: 'Complete Revival',
    description: 'Clinic-exclusive protocol for instant luminosity and lasting results.',
    duration: '3-5 sessions',
  },
];

export default function SignaturePrograms() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section 
      ref={containerRef}
      className="py-16 lg:py-24 bg-white relative overflow-hidden"
    >
      <div className="section-container max-w-7xl mx-auto">
        {/* Header - Center Aligned */}
        <div className="text-center mb-12 lg:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-maroon font-medium tracking-[0.2em] uppercase text-xs block mb-4"
          >
            Curated Journeys
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl lg:text-5xl font-display text-charcoal"
          >
            Signature <span className="italic text-maroon">Programs</span>
          </motion.h2>
        </div>

        {/* Uniform Grid Layout */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="h-full"
            >
              <Link 
                href="#contact" 
                className="group block h-full bg-gradient-to-br from-[#FAF9F7] via-[#F7F6F3] to-[#F3F1ED] p-8 lg:p-10 rounded-[2rem] flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-stone-400/20 border border-stone-200/40 relative overflow-hidden"
              >
                {/* Decorative gradient accent */}
                <div className="absolute -top-20 -right-20 w-48 h-48 bg-gradient-to-br from-maroon/[0.04] to-transparent rounded-full blur-2xl pointer-events-none group-hover:from-maroon/[0.08] transition-all duration-700" />
                
                {/* Top Content */}
                <div className="relative z-10">
                  {/* Number & Subtitle Row */}
                  <div className="flex items-center gap-4 mb-8">
                    <span className="text-lg font-display text-stone-300 group-hover:text-maroon/40 transition-colors duration-300">
                      0{index + 1}
                    </span>
                    <span className="h-px flex-grow bg-gradient-to-r from-stone-300/60 to-transparent" />
                    <span className="text-[10px] uppercase tracking-[0.25em] text-stone-400 font-medium">
                      {program.subtitle}
                    </span>
                  </div>
                  
                  <h3 className="text-3xl lg:text-4xl font-display text-charcoal/90 mb-4 transition-colors duration-300 leading-tight group-hover:text-maroon">
                    {program.title}
                  </h3>
                  
                  <p className="text-charcoal/50 leading-relaxed font-light text-sm lg:text-base mb-8">
                    {program.description}
                  </p>
                </div>
                      
                {/* Bottom Meta */}
                <div className="relative z-10 flex justify-between items-center pt-6 border-t border-stone-200/60 mt-auto">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest text-stone-400 mb-1">Duration</span>
                    <span className="text-charcoal/70 font-medium font-sans text-sm">{program.duration}</span>
                  </div>
                  
                  <div className="w-10 h-10 rounded-full bg-white/80 shadow-sm border border-stone-200/50 text-stone-400 flex items-center justify-center group-hover:bg-maroon group-hover:border-maroon group-hover:text-white group-hover:shadow-lg group-hover:shadow-maroon/20 transition-all duration-500">
                    <svg className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
