'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * WHY PRAGNA - Centered Balanced Layout
 * 
 * Design Philosophy:
 * - Centered headline for balance
 * - Three pillars in clean grid
 * - No extra CTAs - let content speak
 */

const pillars = [
  {
    number: '01',
    title: 'Deep Experience',
    subtitle: 'Real Results',
    description: 'For over 25 years, our dermatologists have treated everything from everyday concerns to complex cases. Our approach is rooted in science, backed by research, and refined by thousands of patient journeys.',
  },
  {
    number: '02',
    title: 'Technology',
    subtitle: 'That Leads',
    description: 'Pragna has consistently been ahead of the curve – introducing advanced devices and procedures before they became mainstream. Our clinics house cutting-edge lasers and protocols chosen for safety and effectiveness.',
  },
  {
    number: '03',
    title: 'Ethical',
    subtitle: 'Transparent Care',
    description: 'We believe excellent dermatology should be accessible and honest. Every recommendation is medically justified, every plan explained, and our pricing transparent.',
  },
];

export default function WhyPragna() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section 
      ref={containerRef}
      className="section-padding bg-beige-warm relative overflow-hidden"
    >
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 200px, #722B2B 200px, #722B2B 201px)`,
        }}></div>
      </div>

      <div className="section-container relative">
        {/* Section Header - Centered */}
        <div className="text-center max-w-3xl mx-auto mb-10 lg:mb-14">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <span className="w-8 h-px bg-maroon/40" />
            <span className="text-maroon font-medium tracking-[0.2em] uppercase text-xs">
              Why Choose Us
            </span>
            <span className="w-8 h-px bg-maroon/40" />
          </motion.span>
          
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: 80 }}
              animate={isInView ? { y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl lg:text-5xl font-display text-charcoal leading-[1.15]"
            >
              Why patients{' '}
              <span className="italic text-maroon">trust Pragna</span>
              <br />
              for their care
            </motion.h2>
          </div>
        </div>

        {/* Pillars Grid */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.number}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.7, 
                delay: index * 0.15,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="group cursor-pointer"
            >
              {/* Card Container - unified tile with image + content */}
              <div className="h-full bg-beige rounded-3xl overflow-hidden border-2 border-transparent hover:border-maroon/10 shadow-soft hover:shadow-soft-xl transition-all duration-500 hover:-translate-y-2">
                {/* Image Container */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-terracotta/25 via-beige-warm to-terracotta/15">
                  {/* Placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
                    <span className="text-maroon/20 font-display text-lg italic">Add image</span>
                  </div>
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-maroon/0 group-hover:bg-maroon/10 transition-colors duration-500" />
                  
                  {/* Number badge */}
                  <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group-hover:bg-maroon group-hover:scale-110">
                    <span className="font-mono text-xs text-maroon transition-colors duration-300 group-hover:text-white">{pillar.number}</span>
                  </div>
                </div>

                {/* Content - with distinct background */}
                <div className="p-6 lg:p-8 space-y-4">
                  <h3 className="text-xl lg:text-2xl font-display text-charcoal transition-colors duration-300 group-hover:text-maroon">
                    {pillar.title}
                    <br />
                    <span className="italic text-maroon">{pillar.subtitle}</span>
                  </h3>
                  <p className="text-charcoal/70 leading-relaxed text-sm lg:text-base">
                    {pillar.description}
                  </p>
                  
                  {/* Learn more link */}
                  <div className="pt-2 flex items-center gap-2 text-maroon font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-sm">Learn more</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
