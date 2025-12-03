'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { signaturePrograms } from '@/lib/content/signature-programs';

/**
 * SIGNATURE PROGRAMS - Editorial Grid
 * 
 * Design Philosophy:
 * - High-fashion "Vogue Cover" aesthetic
 * - Editorial photography with mood-setting overlays
 * - Minimalist typography
 */

export default function SignaturePrograms() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section 
      ref={containerRef}
      className="py-20 lg:py-32 bg-white relative overflow-hidden"
    >
      <div className="section-container max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Editorial Style */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 lg:mb-24 gap-8">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-maroon font-medium tracking-[0.25em] uppercase text-xs block mb-6"
            >
              Curated Journeys
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl lg:text-7xl font-display text-charcoal leading-[0.9]"
            >
              Signature <span className="italic text-maroon block lg:inline">Series</span>
            </motion.h2>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden md:block"
          >
            <p className="text-charcoal/60 max-w-xs text-sm leading-relaxed border-l border-charcoal/10 pl-6">
              Exclusive protocols designed by our dermatologists for transformative results.
            </p>
          </motion.div>
        </div>

        {/* Editorial Grid */}
        <div className="grid md:grid-cols-12 gap-4 lg:gap-8 auto-rows-[500px] lg:auto-rows-[600px]">
          {signaturePrograms.map((program, index) => {
            // Layout logic for interesting grid
            const isLarge = index === 0 || index === 3;
            const colSpan = isLarge ? 'md:col-span-7' : 'md:col-span-5';
            
            return (
              <motion.div
                key={program.slug}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  duration: 1, 
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className={`${colSpan} group relative overflow-hidden rounded-none`}
              >
                <Link href={`/signature-programs/${program.slug}`} className="block h-full w-full">
                  {/* Image Container */}
                  <div className="absolute inset-0 bg-charcoal">
                    {program.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img 
                        src={program.image}
                        alt={program.title}
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-90 group-hover:scale-105 transition-all duration-[1.5s] ease-out"
                      />
                    ) : (
                      // Fallback Gradient with Noise
                      <div className="w-full h-full bg-gradient-to-br from-charcoal via-[#2A2A2A] to-[#1A1A1A] group-hover:scale-105 transition-transform duration-[1.5s]">
                        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay" />
                      </div>
                    )}
                    
                    {/* Editorial Overlay - Darkening from bottom */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 transition-opacity duration-500" />
                  </div>

                  {/* Content */}
                  <div className="relative h-full p-8 lg:p-12 flex flex-col justify-between z-10">
                    {/* Top Label */}
                    <div className="flex justify-between items-start">
                      <span className="text-white/60 text-[10px] tracking-[0.2em] uppercase border border-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                        {program.duration}
                      </span>
                      <span className="text-white/40 font-display text-2xl">
                        0{index + 1}
                      </span>
                    </div>

                    {/* Bottom Info */}
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <span className="text-maroon/80 text-xs tracking-[0.2em] uppercase font-medium mb-3 block">
                        {program.subtitle}
                      </span>
                      <h3 className="text-4xl lg:text-5xl font-display text-white mb-4 group-hover:text-white/90 transition-colors">
                        {program.title}
                      </h3>
                      <p className="text-white/70 font-light leading-relaxed max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 translate-y-4 group-hover:translate-y-0">
                        {program.description}
                      </p>
                      
                      <div className="mt-8 flex items-center gap-3 text-white/60 group-hover:text-white transition-colors text-xs tracking-widest uppercase">
                        <span>Explore Program</span>
                        <svg className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
