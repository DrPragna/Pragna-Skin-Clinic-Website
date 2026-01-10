'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { TreatmentFamily } from '@/lib/navigationData';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/ui/Reveal';

interface TreatmentsDirectoryProps {
  families: TreatmentFamily[];
}

const filters = ['All', 'Skin', 'Hair', 'Body', 'Wellness'];

const getPillarColors = (pillar: string) => {
  switch (pillar) {
    case 'Skin': return { text: '#C28E79', hover: '#A66249' }; // Warm Terracotta / Copper (Distinct from Maroon)
    case 'Hair': return { text: '#CDAA5C', hover: '#A68A3D' }; // True Gold (distinct from Skin & Body)
    case 'Body': return { text: '#9E8C6B', hover: '#736243' }; // Rich Clay / Olive
    default: return { text: '#87A896', hover: '#527862' };     // Fresh Sage / Forest
  }
};

export default function TreatmentsDirectory({ families }: TreatmentsDirectoryProps) {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredFamilies = activeFilter === 'All'
    ? families
    : families.filter(f => f.pillar === activeFilter);

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
                        Our Expertise
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-charcoal">
                        Treatment Menu
                    </h1>
                </div>
            </Reveal>

            {/* Filter Tabs - Editorial Style */}
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
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-12 md:gap-y-20"
            >
              {filteredFamilies.map((family, index) => {
                const colors = getPillarColors(family.pillar);
                
                return (
                <Link 
                    key={family.slug} 
                    href={`/treatments/${family.slug}`}
                    className="group block relative"
                >
                    {/* Top Line - The Anchor */}
                    <div 
                      className="h-px w-full bg-charcoal/20 mb-6 transition-all duration-500 origin-left group-hover:scale-x-100"
                      style={{ 
                        // We'll use a CSS variable or inline style for the hover color 
                        // But standard inline styles for hover are tricky without CSS variables
                        // So we'll use the group-hover class with a custom property if possible,
                        // or just rely on the standard maroon if we can't easily inject hover color.
                        // Let's try using the style for the active color and a standard fallback.
                      }}
                    >
                       {/* We can overlay a colored line that scales in */}
                       <div 
                         className="absolute inset-0 h-full width-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                         style={{ backgroundColor: colors.hover }}
                       />
                    </div>

                    {/* Index Number - Floating */}
                    <span 
                      className="absolute -top-8 md:-top-10 right-0 text-5xl md:text-6xl font-display transition-colors duration-500 select-none font-bold"
                      style={{ color: colors.text, opacity: 0.15 }}
                    >
                        {index < 9 ? `0${index + 1}` : index + 1}
                    </span>

                    {/* Content */}
                    <div className="pr-4 pt-2">
                        {/* Pillar Tag */}
                        <span 
                          className="text-xs uppercase tracking-[0.25em] font-bold mb-3 block transition-colors duration-300"
                          style={{ color: colors.hover }}
                        >
                          {family.pillar}
                        </span>

                        <h3 
                          className="text-3xl md:text-4xl font-display mb-4 group-hover:translate-x-2 transition-transform duration-500"
                          style={{ color: colors.text }} // Apply specific color to heading
                        >
                            {family.name}
                        </h3>
                        
                        <p className="text-charcoal/70 text-base font-light leading-relaxed line-clamp-3 group-hover:text-charcoal transition-colors">
                            {family.summary}
                        </p>
                    </div>
                </Link>
              )})}
            </motion.div>
          </AnimatePresence>
          
          {filteredFamilies.length === 0 && (
             <div className="py-24 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-charcoal/5 flex items-center justify-center text-charcoal/20">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <h3 className="text-xl font-display text-charcoal/60 mb-2">No treatments found</h3>
                <p className="text-charcoal/40 font-light italic mb-6">
                    We couldn't find any treatments in the "{activeFilter}" category.
                </p>
                <button 
                    onClick={() => setActiveFilter('All')}
                    className="text-sm uppercase tracking-widest text-maroon hover:text-charcoal transition-colors underline underline-offset-4"
                >
                    View All Treatments
                </button>
             </div>
          )}
        </div>
      </section>
    </>
  );
}

