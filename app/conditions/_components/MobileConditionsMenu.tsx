'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { Condition, ConditionGroup } from '@/lib/navigationData';

// --- THEME CONFIGURATION (Matches Desktop) ---
type ThemeKey = 'All' | 'Skin' | 'Hair' | 'Body' | 'Others';

const THEMES: Record<ThemeKey, {
  heroBg: string; // Used for fallback if image fails or during load
  heroText: string;
  heroSub: string;
  accent: string;
  title: string;
  description: string;
  heroImage?: string; 
}> = {
  'All': {
    heroBg: 'bg-[#3D2E2E]', 
    heroText: 'text-white',
    heroSub: 'text-white/80',
    accent: 'text-maroon',
    title: 'What Concerns You?',
    description: "Every concern deserves attention. Find yours below.",
    heroImage: '/images/clinic-reception.webp',
  },
  'Skin': {
    heroBg: 'bg-[#5C2E26]', 
    heroText: 'text-white', 
    heroSub: 'text-white/80', 
    accent: 'text-[#A66249]', 
    title: 'Face & Skin',
    description: "Restore your skin's natural health and radiance.",
    heroImage: '/images/areas-of-focus/skin.webp',
  },
  'Hair': {
    heroBg: 'bg-[#5C4D22]', 
    heroText: 'text-white',
    heroSub: 'text-white/80',
    accent: 'text-[#A68A3D]', 
    title: 'Hair & Scalp',
    description: 'Science-backed solutions for restoration.',
    heroImage: '/images/areas-of-focus/hair.webp',
  },
  'Body': {
    heroBg: 'bg-[#423D33]', 
    heroText: 'text-white', 
    heroSub: 'text-white/80', 
    accent: 'text-[#736243]', 
    title: 'Body & Shape',
    description: 'Sculpt and tone with advanced care.',
    heroImage: '/images/areas-of-focus/body.webp',
  },
  'Others': {
    heroBg: 'bg-[#2A3B33]', 
    heroText: 'text-[#ECF2EE]',
    heroSub: 'text-[#A3C2B0]', 
    accent: 'text-[#527862]', 
    title: 'Wellness',
    description: 'Targeted treatments for overall wellbeing.',
  }
};

const filters = ['All', 'Skin', 'Hair', 'Body', 'Others'];

export default function MobileConditionsMenu({ 
  conditionsByGroup 
}: { 
  conditionsByGroup: ConditionGroup[] 
}) {
  const searchParams = useSearchParams();
  const [activeFilter, setActiveFilter] = useState<ThemeKey>('All');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Sync with URL params
  useEffect(() => {
    const categoryParam = searchParams.get('filter');
    if (categoryParam && filters.includes(categoryParam)) {
      setActiveFilter(categoryParam as ThemeKey);
    }
  }, [searchParams]);

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter as ThemeKey);
    
    // Scroll tab into view
    if (scrollContainerRef.current) {
        const button = scrollContainerRef.current.querySelector(`[data-filter="${filter}"]`) as HTMLElement;
        if (button) {
            const container = scrollContainerRef.current;
            const scrollLeft = button.offsetLeft - (container.clientWidth / 2) + (button.clientWidth / 2);
            container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
        }
    }
  };

  // Flatten data
  const allConditions = conditionsByGroup.flatMap(group => 
    group.items.map(item => ({ 
      ...item, 
      group: group.group === 'Wellness' ? 'Others' : group.group 
    }))
  );

  const filteredConditions = activeFilter === 'All'
    ? allConditions
    : allConditions.filter(c => c.group === activeFilter);

  const theme = THEMES[activeFilter];

  return (
    <main className={`min-h-screen relative transition-colors duration-700 ${theme.heroBg}`}>
      
      {/* ==================== 
          1. IMMERSIVE HERO
      ==================== */}
      <section className="relative h-[55vh] w-full overflow-hidden rounded-b-[2.5rem] shadow-xl shadow-black/30 z-10">
         {/* Background Image Transition */}
         <AnimatePresence mode="popLayout">
            <motion.div
                key={activeFilter}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 z-0"
            >
                {theme.heroImage && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img 
                        src={theme.heroImage} 
                        alt={theme.title}
                        className="w-full h-full object-cover"
                    />
                )}
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80 mix-blend-multiply`} />
            </motion.div>
         </AnimatePresence>

         {/* Content */}
         <div className="absolute inset-0 z-10 flex flex-col justify-end px-6 pb-8">
            <motion.div
                key={theme.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
                <span className="text-white/60 text-[10px] uppercase tracking-[0.2em] font-medium mb-3 block">
                    {activeFilter === 'All' ? 'Our Expertise' : `${activeFilter} Care`}
                </span>
                <h1 className="text-5xl font-display text-white leading-[0.95] mb-4 text-shadow-sm">
                    {theme.title}
                </h1>
                <p className="text-white/80 font-light text-lg leading-relaxed max-w-[80%]">
                    {theme.description}
                </p>
            </motion.div>
         </div>
      </section>

      {/* ==================== 
          2. FLOATING TABS
      ==================== */}
      <div className="sticky top-4 z-30 px-4 -mt-6">
        <div className="bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-white/20 p-1.5 flex overflow-x-auto no-scrollbar snap-x scrollbar-hide" ref={scrollContainerRef}>
            {filters.map((filter) => {
                const isActive = activeFilter === filter;
                return (
                    <button
                        key={filter}
                        data-filter={filter}
                        onClick={() => handleFilterClick(filter)}
                        className={`
                            relative px-5 py-2.5 rounded-full text-xs font-medium tracking-wide uppercase transition-all duration-300 whitespace-nowrap snap-center shrink-0
                            ${isActive ? 'text-white shadow-md' : 'text-charcoal/60 hover:bg-black/5'}
                        `}
                    >
                        {isActive && (
                            <motion.div
                                layoutId="activePill"
                                className="absolute inset-0 bg-charcoal rounded-full"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        )}
                        <span className="relative z-10">{filter}</span>
                    </button>
                );
            })}
        </div>
      </div>

      {/* ==================== 
          3. CONDITIONS GRID (Masonry Cards)
      ==================== */}
      <section className="px-4 pb-20 pt-8 min-h-[50vh]">
         <div className="space-y-4">
            <AnimatePresence mode="popLayout">
                {filteredConditions.map((condition, i) => (
                    <motion.div
                        key={condition.slug}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4, delay: i * 0.05 }}
                    >
                        <Link 
                            href={`/conditions/${condition.slug}`}
                            className="block bg-[#FDFCFB] p-6 rounded-2xl shadow-lg shadow-black/5 border border-white/10 active:scale-[0.98] transition-transform duration-300"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-[10px] uppercase tracking-widest font-bold text-maroon/60 bg-maroon/5 px-2 py-1 rounded">
                                    {condition.group}
                                </span>
                                <span className="text-charcoal/10 font-display text-xl">
                                    {(i + 1).toString().padStart(2, '0')}
                                </span>
                            </div>
                            
                            <h3 className="text-2xl font-display text-charcoal mb-2 pr-8">
                                {condition.name}
                            </h3>
                            <p className="text-charcoal/60 text-sm line-clamp-2 leading-relaxed">
                                {condition.subtitle}
                            </p>
                            
                            <div className="mt-4 pt-4 border-t border-charcoal/5 flex justify-end">
                                <div className="w-8 h-8 rounded-full bg-beige-warm flex items-center justify-center text-charcoal/40">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </AnimatePresence>

            {filteredConditions.length === 0 && (
                <div className="py-20 text-center text-white/60">
                    <p>No conditions found.</p>
                </div>
            )}
         </div>
      </section>

    </main>
  );
}
