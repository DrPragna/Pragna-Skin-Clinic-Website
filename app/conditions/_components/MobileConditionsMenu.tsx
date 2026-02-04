'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { Condition } from '@/lib/navigationData';

// Type for the grouped conditions data
type ConditionGroup = { group: string; items: Condition[] };

// --- THEME CONFIGURATION ---
type ThemeKey = 'All' | 'Skin' | 'Hair' | 'Body' | 'Others';

const THEMES: Record<ThemeKey, {
  heroBg: string;
  heroText: string;
  heroSub: string;
  accent: string;
  title: string;
  description: string;
  heroImage?: string; 
  // Page Background Colors (Behind the cards)
  pageBg: string;
  // Card Accents
  pillBg: string;    
  primary: string;   
  gradient: string;  
}> = {
  'All': {
    heroBg: 'bg-[#3D2E2E]', 
    heroText: 'text-white',
    heroSub: 'text-white/80',
    accent: 'text-maroon',
    title: 'What Concerns You?',
    description: "Every concern deserves attention. Find yours below.",
    heroImage: '/images/clinic-reception.webp',
    pageBg: 'bg-[#FAF9F6]', // Warm Neutral
    pillBg: 'bg-charcoal/5',
    primary: '#722B2B', 
    gradient: 'from-[#3D2E2E]/80 via-[#3D2E2E]/20 to-[#3D2E2E]/60'
  },
  'Skin': {
    heroBg: 'bg-[#5C2E26]', 
    heroText: 'text-white', 
    heroSub: 'text-white/80', 
    accent: 'text-[#A66249]', 
    title: 'Face & Skin',
    description: "Restore your skin's natural health and radiance.",
    heroImage: '/images/areas-of-focus/skin.webp',
    pageBg: 'bg-[#FAF5F2]', // Light Terracotta Wash
    pillBg: 'bg-[#C28E79]/10',
    primary: '#C28E79',
    gradient: 'from-[#5C2E26]/80 via-[#C28E79]/20 to-[#5C2E26]/60'
  },
  'Hair': {
    heroBg: 'bg-[#5C4D22]', 
    heroText: 'text-white',
    heroSub: 'text-white/80', 
    accent: 'text-[#A68A3D]', 
    title: 'Hair & Scalp',
    description: 'Science-backed solutions for restoration.',
    heroImage: '/images/areas-of-focus/hair.webp',
    pageBg: 'bg-[#FBF9F2]', // Light Gold Wash
    pillBg: 'bg-[#CDAA5C]/10',
    primary: '#CDAA5C',
    gradient: 'from-[#5C4D22]/80 via-[#CDAA5C]/20 to-[#5C4D22]/60'
  },
  'Body': {
    heroBg: 'bg-[#423D33]', 
    heroText: 'text-white', 
    heroSub: 'text-white/80', 
    accent: 'text-[#736243]', 
    title: 'Body & Shape',
    description: 'Sculpt and tone with advanced care.',
    heroImage: '/images/areas-of-focus/body.webp',
    pageBg: 'bg-[#F7F7F4]', // Light Olive Wash
    pillBg: 'bg-[#9E8C6B]/10',
    primary: '#9E8C6B',
    gradient: 'from-[#423D33]/80 via-[#9E8C6B]/20 to-[#423D33]/60'
  },
  'Others': {
    heroBg: 'bg-[#2A3B33]', 
    heroText: 'text-[#ECF2EE]',
    heroSub: 'text-[#A3C2B0]', 
    accent: 'text-[#527862]', 
    title: 'Wellness',
    description: 'Targeted treatments for overall wellbeing.',
    pageBg: 'bg-[#F5F8F6]', // Light Sage Wash
    pillBg: 'bg-[#87A896]/10',
    primary: '#87A896',
    gradient: 'from-[#2A3B33]/80 via-[#87A896]/20 to-[#2A3B33]/60'
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
    // Apply the Page Background Color here to the main container
    <main className={`min-h-screen relative transition-colors duration-700 ${theme.pageBg}`}>
      
      {/* ==================== 
          1. IMMERSIVE HERO
      ==================== */}
      <section className="relative h-[55vh] w-full overflow-hidden rounded-b-[2.5rem] shadow-xl shadow-black/10 z-10 bg-charcoal">
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
                        className="w-full h-full object-cover opacity-80"
                    />
                )}
                {/* Subtle gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-b ${theme.gradient} mix-blend-multiply opacity-60 transition-all duration-700`} />
                <div className="absolute inset-0 bg-black/10" />
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
                <span 
                    className="text-[10px] uppercase tracking-[0.2em] font-medium mb-3 block transition-colors duration-500 text-white/70"
                >
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
        <div className="bg-white/95 backdrop-blur-md rounded-full shadow-lg border border-charcoal/5 p-1.5 flex overflow-x-auto no-scrollbar snap-x scrollbar-hide" ref={scrollContainerRef}>
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
                                className="absolute inset-0 rounded-full"
                                style={{ backgroundColor: filter === 'All' ? '#1F2937' : THEMES[filter as ThemeKey].primary }}
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
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeFilter}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="space-y-4"
                >
                    {filteredConditions.map((condition, i) => {
                        // Use consistent card styling for "All" and filtered views
                        const itemTheme = THEMES[condition.group as ThemeKey] || THEMES['Others'];
                        
                        return (
                        <Link 
                            key={condition.slug}
                            href={`/conditions/${condition.slug}`}
                            className={`
                                block p-6 rounded-2xl shadow-sm transition-all duration-300 active:scale-[0.98] relative overflow-hidden group
                                bg-white border border-charcoal/5
                            `}
                        >
                            <div className="flex justify-between items-start mb-4 pl-1">
                                <span 
                                    className="text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded transition-colors"
                                    style={{ 
                                        color: itemTheme.primary, 
                                        backgroundColor: `${itemTheme.primary}10`
                                    }}
                                >
                                    {condition.group}
                                </span>
                                <span className="text-charcoal/10 font-display text-xl">
                                    {(i + 1).toString().padStart(2, '0')}
                                </span>
                            </div>
                            
                            <h3 className="text-2xl font-display text-charcoal mb-2 pr-8 pl-1">
                                {condition.name}
                            </h3>
                            <p className="text-charcoal/60 text-sm line-clamp-2 leading-relaxed pl-1">
                                {condition.subtitle}
                            </p>
                            
                            <div className="mt-4 pt-4 border-t border-charcoal/5 flex justify-end">
                                <div 
                                    className="w-8 h-8 rounded-full flex items-center justify-center transition-colors border border-charcoal/5 bg-white"
                                    style={{ color: itemTheme.primary }}
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    )})}
                </motion.div>
            </AnimatePresence>

            {filteredConditions.length === 0 && (
                <div className="py-20 text-center text-charcoal/40">
                    <p>No conditions found.</p>
                </div>
            )}
         </div>
      </section>

    </main>
  );
}
