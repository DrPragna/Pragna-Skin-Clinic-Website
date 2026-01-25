'use client';

import { useRef, useState, useEffect, RefObject } from 'react';
import { motion, useInView, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
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
  const scrollContainerRef = useRef<HTMLDivElement>(null);
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
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-8 -mx-4 px-4 scrollbar-hide md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-5 md:pb-0 md:mx-0 md:px-0"
        >
          {signaturePrograms.map((program, index) => (
            <ProgramCard 
              key={program.slug}
              program={program}
              index={index}
              isInView={isInView}
              containerRef={scrollContainerRef}
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
  isInView,
  containerRef
}: { 
  program: any; 
  index: number; 
  isInView: boolean;
  containerRef: RefObject<HTMLDivElement | null>;
}) {
  const [imageError, setImageError] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const showGradient = imageError || !program.image;
  const gradient = program.gradient || defaultGradient;

  // Detect touch devices (mobile)
  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice(window.matchMedia('(hover: none)').matches);
    };
    checkTouch();
  }, []);

  const cardRef = useRef<HTMLDivElement>(null);
  
  // Horizontal Scroll Tracking for Focus Effect
  const { scrollXProgress } = useScroll({
    container: containerRef,
    target: cardRef,
    axis: "x",
    offset: ["center end", "center start"],
    layoutEffect: false
  });

  // Calculate focus state based on position
  useMotionValueEvent(scrollXProgress, "change", (latest) => {
    if (!isTouchDevice) return;
    // When the card is near the center (0.5), it is focused
    // The range [0.35, 0.65] gives a good "sweet spot" for activation
    const isCenter = latest > 0.35 && latest < 0.65;
    setIsFocused(isCenter);
  });
  
  // Cinematic Scale: Center card is 1.0 (natural), edges shrink slightly to 0.95
  // This preserves the exact shape/size of the focused card while creating depth
  const scale = useTransform(scrollXProgress, [0, 0.5, 1], [0.92, 1, 0.92]);
  
  // Determine if we should show the "Hover" state (on mobile: isFocused, on desktop: group-hover)
  const showHoverState = isTouchDevice ? isFocused : undefined; // undefined lets CSS group-hover take over on desktop

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1]
      }}
      style={isTouchDevice ? { scale } : undefined}
      className={`group relative min-w-[85vw] snap-center md:min-w-0 aspect-[3/4] md:aspect-[4/5] overflow-hidden rounded-2xl cursor-pointer ${isFocused ? 'mobile-focused' : ''}`}
    >
      <Link href={`/signature-programs/${program.slug}`} scroll={true} className="block h-full w-full">
        {/* Background: Image or Gradient */}
        <div className="absolute inset-0 overflow-hidden">
          {!showGradient ? (
             <div className={`w-full h-full relative transition-transform duration-[1.5s] ease-out will-change-transform ${showHoverState ? 'scale-110' : 'group-hover:scale-110'}`}>
               <Image 
                src={program.image}
                alt={program.title}
                fill
                onError={() => setImageError(true)}
                className={`object-cover transition-opacity duration-[1.5s] ease-out ${showHoverState ? 'opacity-100' : 'opacity-90 group-hover:opacity-100'}`}
                style={{ objectPosition: program.imagePosition || 'center center' }}
                sizes="(max-width: 768px) 80vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          ) : (
            // Gradient Fallback with texture
            <div className={`w-full h-full bg-gradient-to-br ${gradient} transition-transform duration-[1.5s] ease-out ${showHoverState ? 'scale-110' : 'group-hover:scale-110'}`}>
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
          <div className={`absolute inset-0 bg-gradient-to-t from-[#1A1510] via-[#1A1510]/80 to-transparent transition-opacity duration-700 ${showHoverState ? 'opacity-60' : 'opacity-90 group-hover:opacity-60'}`} />
          
          {/* Sophisticated Hover Glow */}
          <div className={`absolute inset-0 transition-opacity duration-1000 bg-gradient-to-tr from-maroon/20 via-transparent to-transparent pointer-events-none ${showHoverState ? 'opacity-30' : 'opacity-0 group-hover:opacity-30'}`} />
        </div>

        {/* Content */}
        <div className="relative h-full p-6 md:p-8 flex flex-col justify-between z-10">
          {/* Top */}
          <div className="flex justify-between items-start">
            <div className="overflow-hidden">
              <span 
                className={`text-white font-medium text-[10px] tracking-[0.2em] uppercase border px-3 py-1.5 rounded-full inline-block backdrop-blur-sm transition-all duration-500 shadow-sm ${showHoverState ? 'bg-white/20 border-white/60' : 'border-white/40 bg-black/20 group-hover:bg-white/20 group-hover:border-white/60'}`}
              >
                {program.duration}
              </span>
            </div>
            <span className={`font-display text-xl transition-colors duration-500 drop-shadow-md ${showHoverState ? 'text-white' : 'text-white/90 group-hover:text-white'}`}>
              0{index + 1}
            </span>
          </div>

          {/* Bottom - Animated Slide Up */}
          <div className={`transform transition-transform duration-700 ease-out ${showHoverState ? 'translate-y-0' : 'translate-y-2 group-hover:translate-y-0'}`}>
            <span className={`text-[10px] md:text-[11px] tracking-[0.25em] uppercase font-bold mb-2 md:mb-3 block transition-colors duration-500 drop-shadow-sm ${showHoverState ? 'text-[#E8C4C4]' : 'text-[#D4A5A5] group-hover:text-[#E8C4C4]'}`}>
              {program.subtitle}
            </span>
            <h3 className={`text-2xl md:text-3xl lg:text-4xl font-display text-white mb-3 md:mb-4 transition-colors leading-tight drop-shadow-lg ${showHoverState ? 'text-white' : 'group-hover:text-white'}`}>
              {program.title}
            </h3>
            <p className="text-white/95 text-sm leading-relaxed line-clamp-3 mb-4 md:mb-6 border-l-2 border-white/30 pl-4 opacity-100 transition-opacity duration-500 drop-shadow-md font-medium">
              {program.description}
            </p>
            
            <div className={`flex items-center gap-3 text-white transition-colors text-[10px] tracking-widest uppercase font-bold drop-shadow-md ${showHoverState ? 'text-white' : 'group-hover:text-white'}`}>
              <span className={`relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-px after:bg-white after:transition-all after:duration-500 ${showHoverState ? 'after:w-full' : 'after:w-0 group-hover:after:w-full'}`}>
                View Journey
              </span>
              <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-500 ${showHoverState ? 'border-white bg-white text-charcoal' : 'border-white/20 group-hover:border-white group-hover:bg-white group-hover:text-charcoal'}`}>
                <svg className={`w-3 h-3 transform transition-transform duration-500 ${showHoverState ? 'rotate-0' : '-rotate-45 group-hover:rotate-0'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
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