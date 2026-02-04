'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { TreatmentFamily } from '@/lib/navigationData';
import { NoiseTexture, GradientBlob } from '@/components/ui/ArtisticElements';

// Updated colors to match the brand identity more closely
const getPillarColors = (pillar: string) => {
  switch (pillar) {
    case 'Skin': return { text: '#C28E79', bg: 'bg-[#C28E79]', tint: 'bg-[#C28E79]/5', border: 'border-[#C28E79]/20' };
    case 'Hair': return { text: '#CDAA5C', bg: 'bg-[#CDAA5C]', tint: 'bg-[#CDAA5C]/5', border: 'border-[#CDAA5C]/20' };
    case 'Body': return { text: '#9E8C6B', bg: 'bg-[#9E8C6B]', tint: 'bg-[#9E8C6B]/5', border: 'border-[#9E8C6B]/20' };
    default: return { text: '#87A896', bg: 'bg-[#87A896]', tint: 'bg-[#87A896]/5', border: 'border-[#87A896]/20' };
  }
};

const filters = ['All', 'Skin', 'Hair', 'Body', 'Wellness'];

export default function MobileTreatmentsMenu({ families }: { families: TreatmentFamily[] }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const filteredFamilies = activeFilter === 'All' 
    ? families 
    : families.filter(f => f.pillar === activeFilter);

  // Handle auto-scrolling of tabs
  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
    
    // Find the button element for this filter and scroll the container to center it
    if (scrollContainerRef.current) {
        const button = scrollContainerRef.current.querySelector(`[data-filter="${filter}"]`) as HTMLElement;
        if (button) {
            // Calculate center position
            const container = scrollContainerRef.current;
            const scrollLeft = button.offsetLeft - (container.clientWidth / 2) + (button.clientWidth / 2);
            
            container.scrollTo({
                left: scrollLeft,
                behavior: 'smooth'
            });
        }
    }
  };

  return (
    <section className="min-h-screen bg-beige-warm relative overflow-hidden pb-20">
      <NoiseTexture opacity={0.05} />
      
      {/* Dynamic Background Blob based on active filter */}
      <div className="absolute top-[-20%] right-[-20%] pointer-events-none opacity-40 transition-colors duration-1000 fixed">
         <GradientBlob color={activeFilter === 'Skin' ? 'terracotta' : activeFilter === 'Hair' ? 'terracotta' : 'maroon'} size="xl" />
      </div>

      {/* Sticky Header & Filters */}
      <div className="sticky top-0 z-40 bg-beige-warm/95 backdrop-blur-md border-b border-charcoal/5 pt-28 pb-4 shadow-sm transition-all duration-300">
        <div className="px-8 mb-4 flex justify-between items-end">
          <div>
            <span 
              className="text-[10px] uppercase tracking-[0.2em] font-medium block mb-1 transition-colors duration-300"
              style={{ color: activeFilter === 'All' ? '#6C3036' : getPillarColors(activeFilter).text }}
            >
              Menu
            </span>
            <h1 className="text-3xl font-display text-charcoal">Treatments</h1>
          </div>
          <div className="text-xs text-charcoal/40 font-mono mb-1">
            {filteredFamilies.length} Result{filteredFamilies.length !== 1 ? 's' : ''}
          </div>
        </div>
        
        {/* Horizontal Scrollable Tabs */}
        <div className="relative">
            {/* Fade effect on the right to indicate scrolling */}
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-beige-warm to-transparent z-10 pointer-events-none" />
            
            <div 
                ref={scrollContainerRef}
                className="flex gap-3 overflow-x-auto px-8 pb-2 no-scrollbar snap-x touch-pan-x scrollbar-hide"
            >
            {filters.map((filter) => {
                const isActive = activeFilter === filter;
                const filterColors = getPillarColors(filter);
                
                return (
                <button
                    key={filter}
                    data-filter={filter}
                    onClick={() => handleFilterClick(filter)}
                    className={`
                    px-6 py-2.5 rounded-full text-xs tracking-widest uppercase transition-all duration-300 snap-center shrink-0
                    ${isActive 
                        ? 'shadow-lg scale-100 text-white' 
                        : 'bg-white/50 text-charcoal/60 border border-charcoal/5 hover:bg-white/80'}
                    `}
                    style={isActive ? { 
                    backgroundColor: filter === 'All' ? '#1F2937' : filterColors.text 
                    } : {}}
                >
                    {filter}
                </button>
                );
            })}
            </div>
        </div>
      </div>

      {/* List Content */}
      <div className="px-6 py-6 space-y-4 min-h-[50vh]">
        <AnimatePresence mode="popLayout">
          {filteredFamilies.map((family, i) => {
            const colors = getPillarColors(family.pillar);
            
            return (
              <motion.div
                key={family.slug}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.3) }}
              >
                <Link 
                  href={`/treatments/${family.slug}`}
                  className={`group block ${colors.tint} border ${colors.border} p-6 rounded-3xl backdrop-blur-sm active:scale-[0.98] transition-all duration-300 shadow-[0_2px_10px_-5px_rgba(0,0,0,0.05)] relative overflow-hidden`}
                >
                   {/* Subtle Color Accent on the left */}
                   <div 
                     className="absolute left-0 top-0 bottom-0 w-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                     style={{ backgroundColor: colors.text }}
                   />

                  <div className="flex justify-between items-start mb-3">
                    <span 
                      className={`text-[9px] uppercase tracking-[0.2em] font-bold px-2 py-1 rounded-md bg-white ${colors.border} border`}
                      style={{ color: colors.text }}
                    >
                      {family.pillar}
                    </span>
                    <span className="text-charcoal/20 text-xs font-display font-bold">
                      {(i + 1).toString().padStart(2, '0')}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-display text-charcoal leading-none mb-3 group-active:text-maroon transition-colors pr-8">
                    {family.name}
                  </h3>
                  
                  <div className="flex justify-between items-end gap-4">
                    <p className="text-sm text-charcoal/60 line-clamp-2 font-light leading-relaxed">
                      {family.summary}
                    </p>
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center shadow-sm shrink-0 group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: colors.text, color: 'white' }} 
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </AnimatePresence>
        
        {filteredFamilies.length === 0 && (
          <div className="py-20 text-center">
             <p className="text-charcoal/40 font-light italic">
                 No treatments found in this category.
             </p>
          </div>
        )}
      </div>
    </section>
  );
}
