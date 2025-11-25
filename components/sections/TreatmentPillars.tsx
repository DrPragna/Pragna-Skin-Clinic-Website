'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';

/**
 * TREATMENT PILLARS SECTION
 * 
 * Minimal, elegant design - Skin, Hair, Body
 * Using organic blob shapes for a unique, premium aesthetic
 */

const pillars = [
  {
    id: 'skin',
    title: 'Skin',
    href: '/treatments',
  },
  {
    id: 'hair',
    title: 'Hair',
    href: '/treatments',
  },
  {
    id: 'body',
    title: 'Body',
    href: '/treatments',
  },
];

export default function TreatmentPillars() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section 
      ref={containerRef} 
      className="relative py-12 lg:py-16 bg-[#d4a59a] overflow-hidden"
    >
      <div className="section-container relative z-10">
        {/* Section intro */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-4 mb-8"
        >
          <div className="w-8 h-px bg-maroon/40" />
          <span className="text-maroon/70 text-xs tracking-[0.25em] uppercase">Our Focus</span>
        </motion.div>

        {/* Pillars Grid - Organic Shapes */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center"
            >
              <Link href={pillar.href} className="group flex flex-col items-center">
                {/* Organic Blob Shape */}
                <div 
                  className="relative w-36 h-44 lg:w-44 lg:h-52 mb-5 overflow-hidden bg-cream/20 border-2 border-cream/30 transition-all duration-500 group-hover:border-cream/50 group-hover:scale-105"
                  style={{
                    borderRadius: index === 0 
                      ? '60% 40% 55% 45% / 55% 50% 50% 45%'  // Skin - organic top-heavy
                      : index === 1 
                      ? '45% 55% 40% 60% / 50% 45% 55% 50%'  // Hair - flowing asymmetric
                      : '50% 50% 45% 55% / 40% 60% 40% 60%'  // Body - soft bottom curve
                  }}
                >
                  {/* Placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-8 h-8 mx-auto mb-1 rounded-full bg-cream/20 flex items-center justify-center">
                        <svg className="w-3.5 h-3.5 text-cream/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-cream/40 text-[8px] tracking-wider uppercase">Add image</p>
                    </div>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl lg:text-3xl font-display text-maroon italic tracking-tight group-hover:text-maroon/70 transition-colors duration-300">
                  {pillar.title}
                </h3>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
