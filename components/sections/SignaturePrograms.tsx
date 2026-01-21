'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { signaturePrograms } from '@/lib/content/signature-programs';

/**
 * SIGNATURE PROGRAMS - Uniform Grid
 * 
 * Design Philosophy:
 * - Clean, uniform cards
 * - Gradient backgrounds with subtle texture
 * - Minimalist typography
 */

// Fallback gradient if none specified in data
const defaultGradient = 'from-[#5A524A] via-[#45403A] to-[#302C28]';

export default function SignaturePrograms() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section 
      ref={containerRef}
      className="py-12 lg:py-24 bg-white relative overflow-hidden"
    >
      <div className="section-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Center Aligned like Treatment Pillars */}
        <div className="text-center mb-10 lg:mb-16">
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
            Signature <span className="italic text-maroon">Programmes</span>
          </motion.h2>
        </div>

        {/* Uniform Grid - Adaptive Layout */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-8 -mx-4 px-4 scrollbar-hide md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-5 md:pb-0 md:mx-0 md:px-0">
          {signaturePrograms.map((program, index) => (
            <ProgramCard 
              key={program.slug}
              program={program}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProgramCard({ 
  program, 
  index, 
  isInView
}: { 
  program: any; 
  index: number; 
  isInView: boolean;
}) {
  const [imageError, setImageError] = useState(false);
  const showGradient = imageError || !program.image;
  const gradient = program.gradient || defaultGradient;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1]
      }}
      className="group relative min-w-[80vw] snap-center md:min-w-0 aspect-[3/4] md:aspect-[4/5] overflow-hidden rounded-2xl cursor-pointer"
    >
      <Link href={`/signature-programs/${program.slug}`} scroll={true} className="block h-full w-full">
        {/* Background: Image or Gradient */}
        <div className="absolute inset-0 overflow-hidden">
          {!showGradient ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img 
              src={program.image}
              alt={program.title}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-[1.5s] ease-out"
              style={{ objectPosition: program.imagePosition || 'center center' }}
            />
          ) : (
            // Gradient Fallback with texture
            <div className={`w-full h-full bg-gradient-to-br ${gradient} group-hover:scale-110 transition-transform duration-[1.5s] ease-out`}>
              {/* Subtle noise texture */}
              <div 
                className="absolute inset-0 opacity-[0.15] mix-blend-overlay"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                }}
              />
            </div>
          )}
          
          {/* Overlay - IMPROVED LEGIBILITY */}
          {/* Darker gradient start and via points to ensure text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1510] via-[#1A1510]/80 to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-700" />
          
          {/* Sophisticated Hover Glow */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-1000 bg-gradient-to-tr from-maroon/20 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Content */}
        <div className="relative h-full p-6 md:p-8 flex flex-col justify-between z-10">
          {/* Top */}
          <div className="flex justify-between items-start">
            <div className="overflow-hidden">
              <span 
                className="text-white font-medium text-[10px] tracking-[0.2em] uppercase border border-white/40 px-3 py-1.5 rounded-full inline-block backdrop-blur-sm bg-black/20 group-hover:bg-white/20 group-hover:border-white/60 transition-all duration-500 shadow-sm"
              >
                {program.duration}
              </span>
            </div>
            <span className="text-white/90 font-display text-xl group-hover:text-white transition-colors duration-500 drop-shadow-md">
              0{index + 1}
            </span>
          </div>

          {/* Bottom - Animated Slide Up */}
          <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-700 ease-out">
            <span className="text-[#D4A5A5] text-[10px] md:text-[11px] tracking-[0.25em] uppercase font-bold mb-2 md:mb-3 block group-hover:text-[#E8C4C4] transition-colors duration-500 drop-shadow-sm">
              {program.subtitle}
            </span>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-display text-white mb-3 md:mb-4 group-hover:text-white transition-colors leading-tight drop-shadow-lg">
              {program.title}
            </h3>
            <p className="text-white/95 text-sm leading-relaxed line-clamp-3 mb-4 md:mb-6 border-l-2 border-white/30 pl-4 opacity-100 group-hover:opacity-100 transition-opacity duration-500 drop-shadow-md font-medium">
              {program.description}
            </p>
            
            <div className="flex items-center gap-3 text-white group-hover:text-white transition-colors text-[10px] tracking-widest uppercase font-bold drop-shadow-md">
              <span className="relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-px after:bg-white after:transition-all after:duration-500 group-hover:after:w-full">
                View Journey
              </span>
              <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white group-hover:bg-white group-hover:text-charcoal transition-all duration-500">
                <svg className="w-3 h-3 transform -rotate-45 group-hover:rotate-0 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}