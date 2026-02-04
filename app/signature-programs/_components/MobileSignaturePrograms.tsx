'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { SignatureProgram } from '@/lib/content/signature-programs';

// Categories for the filter tabs
const filters = ['All', 'Events', 'Restoration', 'Anti-Ageing'];

const getCategory = (slug: string): string => {
  switch (slug) {
    case 'glow-getters':
    case 'bridal-beauty':
      return 'Events';
    case 'mommy-makeover':
    case 'signature-reset':
      return 'Restoration';
    case 'rewind':
      return 'Anti-Ageing';
    default:
      return 'All';
  }
};

export default function MobileSignaturePrograms({ programs }: { programs: SignatureProgram[] }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const filteredPrograms = activeFilter === 'All'
    ? programs
    : programs.filter(p => getCategory(p.slug) === activeFilter);

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
    
    // Auto-scroll the active tab to center
    if (scrollContainerRef.current) {
        const button = scrollContainerRef.current.querySelector(`[data-filter="${filter}"]`) as HTMLElement;
        if (button) {
            const container = scrollContainerRef.current;
            const scrollLeft = button.offsetLeft - (container.clientWidth / 2) + (button.clientWidth / 2);
            container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
        }
    }
  };

  return (
    <main className="min-h-screen bg-beige-warm pb-20">
      
      {/* ============================================
          STICKY HEADER & TABS
          ============================================ */}
      <div className="sticky top-0 z-40 bg-beige-warm/95 backdrop-blur-md border-b border-charcoal/5 pt-24 pb-4 shadow-sm transition-all duration-300">
        <div className="px-6 mb-4">
          <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-maroon/60 block mb-1">
            Curated Experiences
          </span>
          <h1 className="text-3xl font-display text-charcoal">
            Signature Programs
          </h1>
        </div>

        {/* Scrollable Tabs */}
        <div className="relative">
            {/* Fade effect */}
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-beige-warm to-transparent z-10 pointer-events-none" />
            
            <div 
                ref={scrollContainerRef}
                className="flex gap-2 overflow-x-auto px-6 pb-2 no-scrollbar snap-x touch-pan-x scrollbar-hide"
            >
                {filters.map((filter) => {
                    const isActive = activeFilter === filter;
                    return (
                        <button
                            key={filter}
                            data-filter={filter}
                            onClick={() => handleFilterClick(filter)}
                            className={`
                                px-5 py-2.5 rounded-full text-xs tracking-widest uppercase transition-all duration-300 snap-center shrink-0 border
                                ${isActive 
                                    ? 'bg-charcoal text-white border-charcoal shadow-md' 
                                    : 'bg-white/50 text-charcoal/60 border-charcoal/5 hover:bg-white/80'}
                            `}
                        >
                            {filter}
                        </button>
                    );
                })}
            </div>
        </div>
      </div>

      {/* ============================================
          PROGRAM CARDS (Editorial Stack)
          ============================================ */}
      <div className="px-4 py-6 space-y-8">
        <AnimatePresence mode="popLayout">
            {filteredPrograms.map((program, index) => (
                <motion.div
                    key={program.slug}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5 }}
                >
                    <Link 
                        href={`/signature-programs/${program.slug}`}
                        className="block bg-white rounded-[2rem] overflow-hidden shadow-sm border border-charcoal/5"
                    >
                        {/* 1. IMAGE SECTION (4:5 Aspect Ratio) */}
                        <div className="relative aspect-[4/5] w-full overflow-hidden">
                            <Image
                                src={program.image}
                                alt={program.title}
                                fill
                                className="object-cover"
                                style={{ objectPosition: program.imagePosition || 'center' }}
                            />
                            
                            {/* Scrim Gradient - Bottom Only (Protects Text) */}
                            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                            {/* Text Overlay */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 pb-8 z-10">
                                <span className="text-[10px] uppercase tracking-[0.25em] text-white/90 font-medium block mb-2 shadow-sm">
                                    {program.subtitle}
                                </span>
                                <h2 className="text-4xl font-display text-white leading-none shadow-sm">
                                    {program.title}
                                </h2>
                            </div>
                        </div>

                        {/* 2. DETAILS SECTION (Beige Block) */}
                        <div className="bg-[#FAF9F6] p-6 border-t border-charcoal/5">
                            {/* Meta Line */}
                            <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-maroon/80 font-bold mb-6 pb-4 border-b border-charcoal/5">
                                <span>{program.duration}</span>
                                <span className="w-1 h-1 rounded-full bg-maroon/30" />
                                <span>Signature Series</span>
                            </div>

                            {/* Description - Replaces At a Glance */}
                            <div className="mb-6">
                                <p className="text-charcoal/60 text-sm leading-relaxed line-clamp-3">
                                    {program.description}
                                </p>
                            </div>

                            {/* CTA Link */}
                            <div className="flex items-center justify-between pt-2">
                                <span className="text-xs uppercase tracking-widest text-charcoal/60 font-medium group-active:text-maroon transition-colors">
                                    Explore Program
                                </span>
                                <div className="w-8 h-8 rounded-full bg-charcoal/5 flex items-center justify-center text-charcoal/60">
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </Link>
                </motion.div>
            ))}
        </AnimatePresence>
      </div>
    </main>
  );
}
