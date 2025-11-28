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
    title: 'Deep Experience,\nReal Results',
    description: 'For over 25 years, our dermatologists have treated everything from everyday concerns to complex cases. Our approach is rooted in science, backed by research, and refined by thousands of patient journeys.',
  },
  {
    number: '02',
    title: 'Technology\nThat Leads',
    description: 'Pragna has consistently been ahead of the curve – introducing advanced devices and procedures before they became mainstream. Our clinics house cutting-edge lasers and protocols chosen for safety and effectiveness.',
  },
  {
    number: '03',
    title: 'Ethical,\nTransparent Care',
    description: 'We believe excellent dermatology should be accessible and honest. Every recommendation is medically justified, every plan explained, and our pricing transparent.',
  },
];

export default function WhyPragna() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section 
      ref={containerRef}
      className="py-12 lg:py-16 bg-beige-warm relative overflow-hidden"
    >
      <div className="section-container">
        {/* Section Header - Center Aligned */}
        <div className="text-center mb-12 lg:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-maroon font-medium tracking-[0.2em] uppercase text-xs block mb-4"
          >
            The Pragna Difference
          </motion.span>
          
            <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl lg:text-5xl font-display text-charcoal"
            >
            Why patients <span className="italic text-maroon">trust us</span>
            </motion.h2>
        </div>

        {/* Pillars Grid - Clean Typographic Layout */}
        <div className="grid lg:grid-cols-3 gap-0 border-t border-maroon/10">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.number}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.8, 
                delay: 0.2 + (index * 0.15),
                ease: [0.16, 1, 0.3, 1]
              }}
              className={`
                relative group p-8 lg:p-12 border-b border-maroon/10
                ${index !== pillars.length - 1 ? 'lg:border-r' : ''}
                hover:bg-white/40 transition-colors duration-500
              `}
            >
              {/* Large Number */}
              <span className="block text-6xl lg:text-7xl font-display text-maroon/10 mb-8 transition-colors duration-500 group-hover:text-maroon/20">
                {pillar.number}
              </span>

              {/* Title */}
              <h3 className="text-2xl lg:text-3xl font-display text-charcoal mb-6 whitespace-pre-line leading-tight">
                    {pillar.title}
                  </h3>

              {/* Description */}
              <p className="text-charcoal/70 leading-relaxed text-base lg:text-lg font-light">
                    {pillar.description}
                  </p>
                  
              {/* Decorative Corner Line */}
              <div className="absolute top-0 left-0 w-0 h-[1px] bg-maroon group-hover:w-full transition-all duration-700 ease-out" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
