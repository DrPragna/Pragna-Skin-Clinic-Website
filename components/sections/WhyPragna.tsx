'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * WHY PRAGNA - Typographic Manifesto
 * 
 * Design Philosophy:
 * - Pure typography over stock images
 * - Editorial layout with vertical dividers
 * - Focus on the core brand pillars: Experience, Technology, Ethics
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
      className="py-12 lg:py-20 bg-[#FDFCFB] relative overflow-hidden"
    >
      <div className="section-container max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-maroon/80 font-medium tracking-[0.2em] uppercase text-xs block mb-4"
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

        {/* Editorial Cards Grid */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
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
              <div className="relative h-full p-10 bg-white rounded-[2rem] border border-stone-100 shadow-[0_2px_20px_-10px_rgba(0,0,0,0.05)] transition-all duration-700 hover:-translate-y-3 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] overflow-hidden">
                {/* Hover Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-stone-50/50 to-maroon/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                {/* Content */}
                <div className="relative z-10 flex flex-col h-full">
                  {/* Number */}
                  <div className="mb-10 flex items-center justify-between">
                     <span className="text-5xl font-display text-stone-200 group-hover:text-maroon/20 transition-colors duration-500">
                      {pillar.number}
                    </span>
                    <div className="w-12 h-[1px] bg-stone-200 group-hover:bg-maroon/30 transition-colors duration-500" />
                  </div>

                  {/* Title */}
                  <h3 className="text-3xl font-display text-charcoal mb-6 leading-[1.15] group-hover:text-maroon transition-colors duration-500">
                    {pillar.title}
                  </h3>

                  {/* Description */}
                  <p className="text-charcoal/60 leading-relaxed text-[15px] font-light tracking-wide mt-auto">
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
