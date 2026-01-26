'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
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
  heroImage?: string; // Optional hero background image
  hex?: string; // Hex code for dynamic gradients
}> = {
  'All': {
    heroBg: 'bg-[#3D2E2E]', // Deep Warm Brown
    heroText: 'text-white',
    heroSub: 'text-white/80',
    cardBg: 'bg-white',
    cardHover: 'group-hover:bg-white',
    accent: 'text-maroon',
    title: 'What Concerns You?',
    description: "Every concern deserves attention. Find yours below.",
    gradient: 'from-transparent to-transparent',
    heroImage: '/images/clinic-reception.webp',
    hex: '#3D2E2E'
  },
  'Skin': {
    heroBg: 'bg-[#5C2E26]', // Deep Copper/Terracotta
    heroText: 'text-white', 
    heroSub: 'text-white/80', 
    cardBg: 'bg-[#FDFBF7]', // Warm Off-White/Cream
    cardHover: 'group-hover:bg-[#F7F5F0]',
    accent: 'text-[#A66249]', // Terracotta accent
    title: 'Face & Skin',
    description: "From acne to ageing, restore your skin's natural health and radiance.",
    gradient: 'from-[#C28E79]/40 to-[#A66249]/20',
    heroImage: '/images/areas-of-focus/skin.webp',
    hex: '#5C2E26'
  },
  'Hair': {
    heroBg: 'bg-[#5C4D22]', // Deep Gold
    heroText: 'text-white',
    heroSub: 'text-white/80',
    cardBg: 'bg-[#FCFBF7]', 
    cardHover: 'group-hover:bg-[#F5F2E8]',
    accent: 'text-[#A68A3D]', // True Gold accent
    title: 'Hair & Scalp',
    description: 'Science-backed solutions for restoration, growth, and scalp health.',
    gradient: 'from-[#CDAA5C]/40 to-[#A68A3D]/20',
    heroImage: '/images/areas-of-focus/hair.webp',
    hex: '#5C4D22'
  },
  'Body': {
    heroBg: 'bg-[#423D33]', // Deep Olive/Clay
    heroText: 'text-white', 
    heroSub: 'text-white/80', 
    cardBg: 'bg-[#F9F9F6]', 
    cardHover: 'group-hover:bg-[#F0F0EB]',
    accent: 'text-[#736243]', // Olive accent
    title: 'Body & Shape',
    description: 'Sculpt, tone, and refine your silhouette with advanced non-surgical care.',
    gradient: 'from-[#9E8C6B]/40 to-[#736243]/20',
    heroImage: '/images/areas-of-focus/body.webp',
    hex: '#423D33'
  },
  'Others': {
    heroBg: 'bg-[#2A3B33]', // Deep Forest
    heroText: 'text-[#ECF2EE]',
    heroSub: 'text-[#A3C2B0]', 
    cardBg: 'bg-[#F5F9F7]', 
    cardHover: 'group-hover:bg-[#E8F2EC]',
    accent: 'text-[#527862]', // Forest accent
    title: 'Wellness & Corrective',
    description: 'Targeted treatments for sweating, skin growths, tattoo removal and overall wellbeing.',
    gradient: 'from-[#87A896]/40 to-[#527862]/20'
  }
};

const filters = ['All', 'Skin', 'Hair', 'Body', 'Others'];

// Separate component for SearchParams logic to wrap in Suspense
function ConditionsContent() {
  const searchParams = useSearchParams();
  const [activeFilter, setActiveFilter] = useState<ThemeKey>('All');
  const conditionsByGroup = getConditionsByGroup();

  // Scroll to top on initial page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle URL query params
  useEffect(() => {
    const categoryParam = searchParams.get('filter');
    if (categoryParam && filters.includes(categoryParam)) {
      setActiveFilter(categoryParam as ThemeKey);
    }
  }, [searchParams]);

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
    <main className="min-h-screen transition-colors duration-700 ease-in-out bg-white">
      
      {/* ============================================
          SMART HERO - Dynamic based on Filter
          ============================================ */}
      <section className={`
        relative min-h-[75vh] md:min-h-[85vh] flex items-center pt-20 transition-colors duration-700 ease-in-out overflow-hidden
        ${theme.heroBg}
      `}>
         {/* Mobile: Background Image */}
         <AnimatePresence mode="sync">
           {theme.heroImage && (
             <motion.div 
               key={theme.heroImage + '-mobile'}
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               transition={{ duration: 0.8 }}
               className="absolute inset-0 md:hidden"
             >
               {/* eslint-disable-next-line @next/next/no-img-element */}
               <img
                 src={theme.heroImage}
                 alt={theme.title}
                 className="absolute inset-0 w-full h-full object-cover object-center"
               />
               <div className="absolute inset-0 bg-black/40" />
             </motion.div>
           )}
         </AnimatePresence>

         {/* Desktop: Cinematic Side Bleed Image */}
         <AnimatePresence mode="sync">
           {theme.heroImage && theme.hex && (
             <motion.div 
               key={theme.heroImage + '-desktop'}
               initial={{ opacity: 0, x: 100 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: 100 }}
               transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
               className="hidden md:block absolute top-0 right-0 bottom-0 w-[60%] h-full"
             >
               {/* Main Image */}
               {/* eslint-disable-next-line @next/next/no-img-element */}
               <img
                 src={theme.heroImage}
                 alt={theme.title}
                 className="absolute inset-0 w-full h-full object-cover object-center"
               />
               
               {/* Gradient Mask - Blends image into background color */}
               <div 
                 className="absolute inset-0" 
                 style={{
                   background: `linear-gradient(to right, ${theme.hex} 5%, ${theme.hex}E6 20%, ${theme.hex}00 100%)`
                 }}
               />
             </motion.div>
           )}
         </AnimatePresence>

         {/* Abstract Background Elements (for non-image themes) */}
         {!theme.heroImage && (
           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 0.2 }}
             transition={{ duration: 0.8 }}
             className="absolute inset-0 pointer-events-none"
           >
              <div className={`absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[100px] mix-blend-overlay transition-colors duration-700 ${activeFilter === 'Skin' ? 'bg-red-400' : activeFilter === 'Hair' ? 'bg-orange-300' : activeFilter === 'Body' ? 'bg-yellow-200' : 'bg-white'}`} />
              <div className={`absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-[120px] mix-blend-overlay transition-colors duration-700 ${activeFilter === 'Skin' ? 'bg-pink-500' : activeFilter === 'Hair' ? 'bg-amber-800' : activeFilter === 'Body' ? 'bg-orange-900' : 'bg-slate-200'}`} />
           </motion.div>
         )}

        {/* Centering Wrapper - Handles vertical centering */}
        <div className="section-container relative z-10 w-full py-20 md:py-0">
          <div className="flex flex-col md:flex-row w-full md:items-center">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeFilter}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-3xl md:w-1/2 text-center md:text-left mx-auto md:mx-0"
            >
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="font-medium uppercase tracking-[0.25em] text-xs mb-8 block text-white/70"
              >
                {activeFilter === 'All' ? 'Our Expertise' : 'Specialized Care'}
              </motion.span>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className={`
                  font-display leading-[0.9] mb-8
                  ${activeFilter === 'All' ? 'text-4xl md:text-6xl lg:text-7xl xl:text-8xl xl:max-w-[14ch]' : 'text-5xl md:text-7xl lg:text-8xl xl:text-9xl'}
                  ${theme.heroText}
                `}
              >
                {theme.title}
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className={`
                  text-lg md:text-xl font-light max-w-lg leading-relaxed opacity-90 mx-auto md:mx-0
                  ${theme.heroSub}
                `}
              >
                {theme.description}
              </motion.p>
            </motion.div>
          </AnimatePresence>
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
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
              {filteredConditions.map((condition, index) => {
                // Determine card theme based on condition group
                // If we are in 'All' view, each card gets its own group theme
                // If we are in a filtered view, all cards share the active theme (which matches the group)
                const cardGroupKey = (condition.group === 'Others' || condition.group === 'Wellness') ? 'Others' : condition.group as ThemeKey;
                const cardTheme = THEMES[cardGroupKey];
                
                return (
                <motion.div
                    key={condition.slug}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: index * 0.08, // Stagger effect
                      ease: [0.22, 1, 0.36, 1] 
                    }}
                    className="h-full"
                >
                  <Link 
                      href={`/conditions/${condition.slug}`}
                      className={`
                          group relative block p-8 md:p-10 rounded-[2rem] overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-xl h-full
                          ${cardTheme.cardBg}
                          ${activeFilter === 'All' ? 'hover:shadow-lg' : ''}
                      `}
                  >
                    {/* Abstract Gradient Background - visible by default, stronger on hover */}
                    <div className={`
                        absolute inset-0 opacity-75 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br
                        ${cardTheme.gradient}
                    `} />

                    <div className="relative z-10 flex flex-col h-full justify-between min-h-[220px]">
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
                </motion.div>
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
