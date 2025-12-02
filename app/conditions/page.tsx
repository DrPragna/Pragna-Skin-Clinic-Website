'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/sections/Footer';
import { getConditionsByGroup } from '@/lib/navigationData';
import { Reveal } from '@/components/ui/Reveal';

// ============================================
// THEME CONFIGURATION
// ============================================

type ThemeKey = 'All' | 'Skin' | 'Hair' | 'Body' | 'Others';

const THEMES: Record<ThemeKey, {
  heroBg: string;
  heroText: string;
  heroSub: string;
  cardBg: string;
  cardHover: string;
  accent: string;
  title: string;
  description: string;
  gradient: string; // For the abstract card background
}> = {
  'All': {
    heroBg: 'bg-beige-warm',
    heroText: 'text-charcoal',
    heroSub: 'text-charcoal/60',
    cardBg: 'bg-white',
    cardHover: 'group-hover:bg-white',
    accent: 'text-maroon',
    title: 'What concerns you?',
    description: 'Select a category to find your concern. We\'ll guide you to the right solution.',
    gradient: 'from-transparent to-transparent'
  },
  'Skin': {
    heroBg: 'bg-[#5C2E26]', // Deep Copper/Terracotta
    heroText: 'text-[#F2E8E6]', 
    heroSub: 'text-[#D6B4AA]', 
    cardBg: 'bg-[#FFF8F5]', // Very Light Peach
    cardHover: 'group-hover:bg-[#FFEFE8]',
    accent: 'text-[#A66249]', // Terracotta accent
    title: 'Skin Concerns',
    description: 'From acne to ageing, restore your skin\'s natural health and radiance.',
    gradient: 'from-[#C28E79]/10 to-[#A66249]/5'
  },
  'Hair': {
    heroBg: 'bg-[#4A3B2A]', // Deep Bronze
    heroText: 'text-[#F5F2EB]',
    heroSub: 'text-[#CDBFA8]',
    cardBg: 'bg-[#FCFBF7]', 
    cardHover: 'group-hover:bg-[#F5F2E8]',
    accent: 'text-[#8F7348]', // Bronze accent
    title: 'Hair & Scalp',
    description: 'Science-backed solutions for restoration, growth, and scalp health.',
    gradient: 'from-[#BFA57D]/10 to-[#8F7348]/5'
  },
  'Body': {
    heroBg: 'bg-[#423D33]', // Deep Olive/Clay
    heroText: 'text-[#F2F2EE]', 
    heroSub: 'text-[#BFB9A3]', 
    cardBg: 'bg-[#F9F9F6]', 
    cardHover: 'group-hover:bg-[#F0F0EB]',
    accent: 'text-[#736243]', // Olive accent
    title: 'Body & Shape',
    description: 'Sculpt, tone, and refine your silhouette with advanced non-surgical care.',
    gradient: 'from-[#9E8C6B]/10 to-[#736243]/5'
  },
  'Others': {
    heroBg: 'bg-[#2A3B33]', // Deep Forest
    heroText: 'text-[#ECF2EE]',
    heroSub: 'text-[#A3C2B0]', 
    cardBg: 'bg-[#F5F9F7]', 
    cardHover: 'group-hover:bg-[#E8F2EC]',
    accent: 'text-[#527862]', // Forest accent
    title: 'Wellness & Others',
    description: 'Holistic treatments for overall wellbeing and specific corrective needs.',
    gradient: 'from-[#87A896]/10 to-[#527862]/5'
  }
};

const filters = ['All', 'Skin', 'Hair', 'Body', 'Others'];

// Separate component for SearchParams logic to wrap in Suspense
function ConditionsContent() {
  const searchParams = useSearchParams();
  const [activeFilter, setActiveFilter] = useState<ThemeKey>('All');
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const conditionsByGroup = getConditionsByGroup();

  // Handle URL query params on mount
  useEffect(() => {
    const categoryParam = searchParams.get('filter');
    if (categoryParam && filters.includes(categoryParam)) {
      setActiveFilter(categoryParam as ThemeKey);
      
      // Scroll to content after a brief delay to allow layout to settle
      if (isInitialLoad) {
        setTimeout(() => {
          const contentSection = document.getElementById('conditions-grid');
          if (contentSection) {
            const yOffset = -180; // Offset for sticky header
            const y = contentSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }
        }, 500);
        setIsInitialLoad(false);
      }
    }
  }, [searchParams, isInitialLoad]);

  // Update logic to handle manual filter clicks
  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter as ThemeKey);
    
    // Update URL without scroll
    const url = new URL(window.location.href);
    if (filter === 'All') {
        url.searchParams.delete('filter');
    } else {
        url.searchParams.set('filter', filter);
    }
    window.history.pushState({}, '', url);
  };

  // Flatten and prepare data
  const allConditions = conditionsByGroup.flatMap(group => 
    group.items.map(item => ({ 
      ...item, 
      // Map 'Wellness' data group to 'Others' display group if needed, or keep as is if data is updated
      group: group.group === 'Wellness' ? 'Others' : group.group 
    }))
  );

  const filteredConditions = activeFilter === 'All'
    ? allConditions
    : allConditions.filter(c => c.group === activeFilter);

  // Get current theme
  const theme = THEMES[activeFilter];

  return (
    <main className={`min-h-screen transition-colors duration-700 ease-in-out ${activeFilter === 'All' ? 'bg-beige-warm' : 'bg-white'}`}>
      <Navbar />
      
      {/* ============================================
          SMART HERO - Dynamic based on Filter
          ============================================ */}
      <section className={`
        relative pt-40 pb-20 md:pt-48 md:pb-32 transition-colors duration-700 ease-in-out overflow-hidden
        ${theme.heroBg}
      `}>
         {/* Abstract Background Elements for Mood */}
         <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className={`absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[100px] mix-blend-overlay transition-colors duration-700 ${activeFilter === 'Skin' ? 'bg-red-400' : activeFilter === 'Hair' ? 'bg-orange-300' : activeFilter === 'Body' ? 'bg-yellow-200' : 'bg-white'}`} />
            <div className={`absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-[120px] mix-blend-overlay transition-colors duration-700 ${activeFilter === 'Skin' ? 'bg-pink-500' : activeFilter === 'Hair' ? 'bg-amber-800' : activeFilter === 'Body' ? 'bg-orange-900' : 'bg-slate-200'}`} />
         </div>

        <div className="section-container relative z-10">
          <div className="max-w-4xl">
            <Reveal>
                <span className={`
                    font-medium uppercase tracking-[0.25em] text-[10px] md:text-xs mb-6 block transition-colors duration-500
                    ${activeFilter === 'All' ? 'text-maroon/60' : 'text-white/60'}
                `}>
                    {activeFilter === 'All' ? 'Our Expertise' : 'Specialized Care'}
                </span>
            </Reveal>
            
            <Reveal delay={0.1}>
                <h1 className={`
                    text-5xl md:text-7xl lg:text-8xl font-display leading-[0.9] mb-8 transition-colors duration-500
                    ${theme.heroText}
                `}>
                    {theme.title}
                </h1>
            </Reveal>
            
            <Reveal delay={0.2}>
                <p className={`
                    text-lg md:text-xl font-light max-w-2xl leading-relaxed transition-colors duration-500
                    ${theme.heroSub}
                `}>
                    {theme.description}
                </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============================================
          STICKY FILTERS
          ============================================ */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-charcoal/5 shadow-sm">
        <div className="section-container">
            <div className="flex overflow-x-auto no-scrollbar py-4 gap-8 md:justify-center">
                {filters.map((filter) => (
                    <button
                        key={filter}
                        onClick={() => handleFilterClick(filter)}
                        className="group relative flex-shrink-0 py-2"
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
                        
                        {activeFilter === filter && (
                            <motion.div 
                                layoutId="activeTab"
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-maroon"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        )}
                    </button>
                ))}
            </div>
        </div>
      </div>

      {/* ============================================
          ATMOSPHERIC GRID
          ============================================ */}
      <section id="conditions-grid" className="py-20 min-h-screen">
        <div className="section-container">
          <AnimatePresence mode="wait">
            <motion.div 
                key={activeFilter}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
              {filteredConditions.map((condition, index) => {
                // Determine card theme based on condition group
                // If we are in 'All' view, each card gets its own group theme
                // If we are in a filtered view, all cards share the active theme (which matches the group)
                const cardGroupKey = (condition.group === 'Others' || condition.group === 'Wellness') ? 'Others' : condition.group as ThemeKey;
                const cardTheme = THEMES[cardGroupKey];
                
                return (
                <Link 
                    key={condition.slug} 
                    href={`/conditions/${condition.slug}`}
                    className={`
                        group relative block p-8 md:p-10 rounded-[2rem] overflow-hidden transition-all duration-500 hover:-translate-y-1
                        ${activeFilter === 'All' ? 'bg-white border border-charcoal/5 hover:shadow-lg' : cardTheme.cardBg}
                    `}
                >
                    {/* Abstract Gradient Background on Hover */}
                    <div className={`
                        absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br
                        ${cardTheme.gradient}
                    `} />

                    <div className="relative z-10 flex flex-col h-full justify-between min-h-[180px]">
                        <div>
                            <div className="flex justify-between items-start mb-6">
                                <span className={`
                                    text-[10px] uppercase tracking-[0.2em] font-bold
                                    ${cardTheme.accent}
                                `}>
                                    {condition.group}
                                </span>
                                <span className={`
                                    font-display text-4xl opacity-10 transition-opacity duration-300 group-hover:opacity-20
                                    ${cardTheme.accent}
                                `}>
                                    {index < 9 ? `0${index + 1}` : index + 1}
                                </span>
                            </div>

                            <h3 className="text-2xl md:text-3xl font-display text-charcoal mb-3 group-hover:translate-x-1 transition-transform duration-300">
                                {condition.name}
                            </h3>
                            
                            <p className="text-charcoal/60 text-sm leading-relaxed line-clamp-2">
                                {condition.subtitle}
                            </p>
                        </div>
                        
                        <div className="pt-8 flex items-center text-xs uppercase tracking-widest font-medium text-charcoal/40 group-hover:text-charcoal transition-colors">
                            <span>View Solution</span>
                            <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </div>
                    </div>
                </Link>
              )})}
            </motion.div>
          </AnimatePresence>
          
          {filteredConditions.length === 0 && (
             <div className="py-24 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-charcoal/5 flex items-center justify-center text-charcoal/20">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <h3 className="text-xl font-display text-charcoal/60 mb-2">No conditions found</h3>
                <p className="text-charcoal/40 font-light italic mb-6">
                    We couldn't find any conditions in the "{activeFilter}" category.
                </p>
                <button 
                    onClick={() => handleFilterClick('All')}
                    className="text-sm uppercase tracking-widest text-maroon hover:text-charcoal transition-colors underline underline-offset-4"
                >
                    View All Conditions
                </button>
             </div>
          )}
        </div>
      </section>
      
      <Footer />
    </main>
  );
}

export default function ConditionsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-beige-warm flex items-center justify-center">
        <div className="w-2 h-2 bg-maroon rounded-full animate-ping" />
      </div>
    }>
      <ConditionsContent />
    </Suspense>
  );
}
