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
      <section className="pt-32 pb-12 bg-beige-warm sticky top-0 z-30 border-b border-charcoal/5 transition-all duration-300">
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
      <section className="py-12 bg-beige-warm min-h-screen">
        <div className="section-container">
          <AnimatePresence mode="wait">
            <motion.div 
                key={activeFilter}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12"
            >
              {filteredFamilies.map((family, index) => (
                <Link 
                    key={family.slug} 
                    href={`/treatments/${family.slug}`}
                    className="group block relative pl-6 border-l border-charcoal/10 hover:border-maroon/40 transition-colors duration-500"
                >
                    {/* Index Number - The Visual Anchor */}
                    <span className="absolute -top-2 right-0 text-4xl font-display text-charcoal/5 group-hover:text-maroon/10 transition-colors duration-500">
                        {index < 9 ? `0${index + 1}` : index + 1}
                    </span>

                    <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] uppercase tracking-widest text-maroon/60 font-medium">
                            {family.pillar}
                        </span>
                    </div>

                    <h3 className="text-3xl font-display text-charcoal mb-3 group-hover:text-maroon transition-colors duration-300 pr-8">
                        {family.name}
                    </h3>
                    
                    <p className="text-charcoal/60 text-sm leading-relaxed mb-5 font-light line-clamp-3">
                        {family.summary}
                    </p>

                    {/* Sub-treatment Mini List */}
                    <div className="space-y-1.5">
                        {family.subTreatments.slice(0, 3).map(st => (
                            <div key={st.slug} className="flex items-center gap-2 text-xs text-charcoal/40 group-hover:text-charcoal/70 transition-colors">
                                <span className="w-1 h-1 rounded-full bg-charcoal/20 group-hover:bg-maroon/40" />
                                {st.name}
                            </div>
                        ))}
                        {family.subTreatments.length > 3 && (
                            <div className="text-[10px] uppercase tracking-wide text-maroon/40 pl-3 pt-1">
                                + {family.subTreatments.length - 3} more
                            </div>
                        )}
                    </div>
                </Link>
              ))}
            </motion.div>
          </AnimatePresence>
          
          {filteredFamilies.length === 0 && (
             <div className="py-20 text-center text-charcoal/40 font-light italic">
                No treatments found in this category.
             </div>
          )}
        </div>
      </section>
    </>
  );
}

