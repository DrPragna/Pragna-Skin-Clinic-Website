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
    bg: 'bg-white',
  },
  {
    title: 'Mommy Makeover',
    subtitle: 'Post-Pregnancy Care',
    description: 'Gentle treatments to reclaim confidence in skin, body, and hair.',
    duration: '6-8 sessions',
    bg: 'bg-white',
  },
  {
    title: 'Bridal Beauty',
    subtitle: 'Pre-Wedding Glow',
    description: 'Step-by-step care for clear, even, and luminous skin on your big day.',
    duration: '3-6 months',
    bg: 'bg-white',
  },
  {
    title: 'Rewind',
    subtitle: 'Anti-Aging',
    description: 'Target lines and loss of firmness with advanced anti-aging solutions.',
    duration: '4-8 sessions',
    bg: 'bg-white',
  },
  {
    title: 'Signature Reset',
    subtitle: 'Complete Revival',
    description: 'Clinic-exclusive protocol for instant luminosity and lasting results.',
    duration: '3-5 sessions',
    bg: 'bg-white',
  },
];

export default function SignaturePrograms() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section 
      ref={containerRef}
      className="py-12 lg:py-16 bg-white relative overflow-hidden"
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
                className="group block h-full bg-gradient-to-br from-white via-rose-50/40 to-rose-100/40 p-8 lg:p-10 rounded-[2.5rem] flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 hover:shadow-lg hover:shadow-rose-900/10 border border-maroon/5"
              >
                {/* Top Content */}
                <div className="relative z-10">
                  {/* Number & Subtitle Row */}
                  <div className="flex items-center gap-4 mb-8">
                    <span className="text-xl font-display text-maroon/20 group-hover:text-maroon/40 transition-colors">
                      0{index + 1}
                    </span>
                    <span className="h-px flex-grow bg-gradient-to-r from-maroon/10 to-transparent" />
                    <span className="text-[10px] uppercase tracking-[0.25em] text-maroon/60 font-medium">
                      {program.subtitle}
                    </span>
                  </div>
                  
                  <h3 className="text-3xl lg:text-4xl font-display text-charcoal/90 mb-4 group-hover:text-maroon transition-colors duration-300 leading-tight">
                    {program.title}
                  </h3>
                  
                  <p className="text-charcoal/60 leading-relaxed font-light text-sm lg:text-base mb-8">
                    {program.description}
                  </p>
                </div>
                      
                {/* Bottom Meta */}
                <div className="relative z-10 flex justify-between items-center pt-6 border-t border-maroon/5 mt-auto">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest text-charcoal/30 mb-1">Duration</span>
                    <span className="text-charcoal/80 font-medium font-sans text-sm">{program.duration}</span>
                  </div>
                  
                  <div className="w-10 h-10 rounded-full bg-white shadow-sm text-maroon/30 flex items-center justify-center group-hover:bg-maroon group-hover:text-white transition-all duration-500">
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
