'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';

/**
 * SIGNATURE PROGRAMS - Consistent Premium Design
 * 
 * Design Philosophy:
 * - Unified color scheme (terracotta/beige)
 * - Elegant, not colorful
 * - Premium feel throughout
 */

const programs = [
  {
    title: 'Glow Getters',
    subtitle: 'Radiance Revival',
    description: 'Unveil your natural radiance with customized treatment plans that brighten, smooth, and refresh tired skin.',
    duration: '4-6 sessions',
    ideal: 'Dull, tired skin',
  },
  {
    title: 'Mommy Makeover',
    subtitle: 'Post-Pregnancy Care',
    description: 'Gentle, effective treatments to help you reclaim confidence in your skin, body, and hair after pregnancy.',
    duration: '6-8 sessions',
    ideal: 'New mothers',
  },
  {
    title: 'Pre-Wedding Glow',
    subtitle: 'Bridal Beauty',
    description: 'Timed, step-by-step care to ensure your skin looks clear, even, and luminous on your big day.',
    duration: '3-6 months',
    ideal: 'Brides & grooms',
  },
  {
    title: 'Rewind the Years',
    subtitle: 'Anti-Aging',
    description: 'Target lines, wrinkles, and loss of firmness with advanced anti-aging solutions for a youthful look.',
    duration: '4-8 sessions',
    ideal: 'Mature skin',
  },
  {
    title: 'Signature Reset',
    subtitle: 'Complete Revival',
    description: 'A clinic-exclusive protocol that revives dull, tired skin with instant luminosity and lasting results.',
    duration: '3-5 sessions',
    ideal: 'All skin types',
  },
];

export default function SignaturePrograms() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section 
      ref={containerRef}
      className="section-padding bg-beige overflow-hidden"
    >
      
      <div className="section-container">
        {/* Section Header - Centered */}
        <div className="text-center max-w-3xl mx-auto mb-10 lg:mb-14">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 mb-8"
          >
            <span className="w-8 h-px bg-maroon/40" />
            <span className="text-maroon font-medium tracking-[0.3em] uppercase text-xs">
              Curated Journeys
            </span>
            <span className="w-8 h-px bg-maroon/40" />
          </motion.span>
          
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: 100 }}
              animate={isInView ? { y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-display-md font-display text-charcoal"
            >
              Signature{' '}
              <span className="italic text-maroon">programs</span>
            </motion.h2>
          </div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-charcoal/60 mt-6"
          >
            Whether you're preparing for a wedding, recovering after pregnancy, or simply ready to invest 
            in your skin, our curated programs bring together advanced treatments into thoughtfully designed journeys.
          </motion.p>
        </div>

        {/* Programs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program, index) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.6, 
                delay: 0.1 + index * 0.1,
                ease: [0.16, 1, 0.3, 1]
              }}
            >
              <Link href="#contact" className="group block h-full">
                <div className="relative h-full rounded-3xl p-8 bg-beige-warm border border-charcoal/5 overflow-hidden transition-all duration-500 hover:shadow-soft-lg hover:border-maroon/10 hover:-translate-y-1">
                  {/* Decorative accent */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-terracotta/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-maroon/10 transition-colors duration-500" />
                  
                  <div className="relative z-10 h-full flex flex-col">
                    {/* Header */}
                    <div className="mb-6">
                      <span className="text-maroon/60 text-xs uppercase tracking-widest">
                        {program.subtitle}
                      </span>
                      <h3 className="text-2xl font-display text-charcoal mt-1 group-hover:text-maroon transition-colors duration-300">
                        {program.title}
                      </h3>
                    </div>
                    
                    {/* Description */}
                    <p className="text-charcoal/60 leading-relaxed flex-grow text-sm">
                      {program.description}
                    </p>
                    
                    {/* Meta */}
                    <div className="mt-6 pt-6 border-t border-charcoal/10 flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-xs text-charcoal/40 uppercase tracking-wider">Duration</p>
                        <p className="text-sm text-charcoal font-medium">{program.duration}</p>
                      </div>
                      
                      <div className="w-10 h-10 rounded-full bg-maroon/5 flex items-center justify-center group-hover:bg-maroon group-hover:text-cream transition-all duration-300">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
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
