'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { SignatureProgram } from '@/lib/content/signature-programs';
import { Reveal } from '@/components/ui/Reveal';

interface SignatureProgramsDirectoryProps {
  programs: SignatureProgram[];
}

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

export default function SignatureProgramsDirectory({ programs }: SignatureProgramsDirectoryProps) {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredPrograms = activeFilter === 'All'
    ? programs
    : programs.filter(p => getCategory(p.slug) === activeFilter);

  return (
    <>
      {/* ============================================
          HERO & FILTER - Sticky
          ============================================ */}
      <section className="pt-32 pb-16 bg-beige-warm sticky top-0 z-30 border-b border-charcoal/10 transition-all duration-300 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]">
        <div className="section-container">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-8">
            <Reveal>
                <div>
                    <span className="text-maroon/60 font-medium uppercase tracking-[0.25em] text-[10px] mb-3 block">
                        Curated Experiences
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-charcoal">
                        Signature Programs
                    </h1>
                </div>
            </Reveal>

            {/* Filter Tabs */}
            <Reveal delay={0.2}>
                <div className="flex flex-wrap gap-x-8 gap-y-4 border-b border-charcoal/10 pb-px">
                {filters.map((filter) => (
                    <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className="relative pb-4 group"
                    >
                    <span className={`
                        text-sm tracking-widest uppercase transition-colors duration-300
                        ${activeFilter === filter 
                        ? 'text-charcoal font-bold' 
                        : 'text-charcoal/40 font-medium hover:text-maroon'
                        }
                    `}>
                        {filter}
                    </span>
                    
                    {/* Active Indicator Line */}
                    {activeFilter === filter && (
                        <motion.div 
                            layoutId="activeTab"
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-maroon"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                    )}
                    
                    {/* Hover Line (for inactive) */}
                    {activeFilter !== filter && (
                        <div className="absolute bottom-0 left-0 right-0 h-px bg-maroon/30 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    )}
                    </button>
                ))}
                </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============================================
          DIRECTORY GRID
          ============================================ */}
      <section className="py-20 bg-beige-warm min-h-screen">
        <div className="section-container">
          <AnimatePresence mode="wait">
            <motion.div 
                key={activeFilter}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="grid md:grid-cols-2 gap-8"
            >
              {filteredPrograms.map((program, index) => (
                <Link 
                    key={program.slug}
                    href={`/signature-programs/${program.slug}`}
                    className="group relative block bg-white rounded-[2rem] overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
                >
                    <div className="grid md:grid-cols-2 h-full min-h-[320px] md:min-h-[380px]">
                        {/* Image Section */}
                        <div className="relative h-[240px] md:h-full overflow-hidden">
                            <Image
                                src={program.image}
                                alt={program.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
                        </div>

                        {/* Content Section */}
                        <div className="p-8 flex flex-col justify-between bg-white relative">
                             {/* Decorative Gradient on hover */}
                             <div className="absolute inset-0 bg-gradient-to-br from-maroon/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                             
                             <div className="relative z-10">
                                <div className="flex justify-between items-start mb-4">
                                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-maroon/80">
                                        {program.subtitle}
                                    </span>
                                    <span className="font-display text-3xl text-maroon/10 group-hover:text-maroon/20 transition-colors">
                                        {index < 9 ? `0${index + 1}` : index + 1}
                                    </span>
                                </div>

                                <h3 className="text-2xl md:text-3xl font-display text-charcoal mb-4 group-hover:translate-x-1 transition-transform duration-300">
                                    {program.title}
                                </h3>
                                
                                <p className="text-charcoal/60 text-sm leading-relaxed line-clamp-4 mb-6">
                                    {program.description}
                                </p>
                             </div>

                             {/* Footer info */}
                             <div className="relative z-10 pt-6 border-t border-charcoal/5 flex items-center justify-between">
                                <div className="flex items-center gap-2 text-xs text-charcoal/50 font-medium">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {program.duration}
                                </div>
                                
                                <div className="flex items-center text-xs uppercase tracking-widest font-medium text-charcoal/40 group-hover:text-maroon transition-colors">
                                    <span>Explore</span>
                                    <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </div>
                             </div>
                        </div>
                    </div>
                </Link>
              ))}
            </motion.div>
          </AnimatePresence>
          
          {filteredPrograms.length === 0 && (
             <div className="py-24 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-charcoal/5 flex items-center justify-center text-charcoal/20">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <h3 className="text-xl font-display text-charcoal/60 mb-2">No programs found</h3>
                <p className="text-charcoal/40 font-light italic mb-6">
                    We couldn't find any signature programs in the "{activeFilter}" category.
                </p>
                <button 
                    onClick={() => setActiveFilter('All')}
                    className="text-sm uppercase tracking-widest text-maroon hover:text-charcoal transition-colors underline underline-offset-4"
                >
                    View All Programs
                </button>
             </div>
          )}
        </div>
      </section>
    </>
  );
}

