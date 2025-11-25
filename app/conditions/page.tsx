'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/sections/Footer';
import { getConditionsByGroup, Condition } from '@/lib/navigationData';

// Note: Metadata is in layout or handled via head for client components
// SEO will be handled at the layout level for this page

const groups = ['Face & Skin', 'Hair & Scalp', 'Body Shape & Texture', 'Other Concerns'] as const;
type Group = typeof groups[number];

// Group icons (elegant silhouettes)
const groupIcons: Record<Group, JSX.Element> = {
  'Face & Skin': (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
      <ellipse cx="12" cy="11" rx="8" ry="10" />
      <circle cx="9" cy="9" r="1" fill="currentColor" />
      <circle cx="15" cy="9" r="1" fill="currentColor" />
      <path d="M9 14c1.5 1.5 4.5 1.5 6 0" strokeLinecap="round" />
    </svg>
  ),
  'Hair & Scalp': (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M12 2C8 2 5 5 5 9c0 3 2 5 3 7v6h8v-6c1-2 3-4 3-7 0-4-3-7-7-7z" />
      <path d="M9 22h6M8 9c0-2 2-4 4-4" strokeLinecap="round" />
    </svg>
  ),
  'Body Shape & Texture': (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
      <circle cx="12" cy="5" r="3" />
      <path d="M12 8v4M7 22l2-8h6l2 8M7 12h10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  'Other Concerns': (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

export default function ConditionsPage() {
  const [activeGroup, setActiveGroup] = useState<Group>('Face & Skin');
  const conditionsByGroup = getConditionsByGroup();
  
  // Get conditions for active group
  const activeConditions = conditionsByGroup.find(g => g.group === activeGroup)?.items || [];

  return (
    <main className="overflow-x-hidden bg-beige-warm min-h-screen">
      <Navbar />
      
      {/* ============================================
          HERO - The Question
          ============================================ */}
      <section className="pt-32 pb-12 md:pt-44 md:pb-16 relative overflow-hidden">
        {/* Subtle grain texture */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />
        </div>
        
        <div className="section-container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* Tiny label */}
            <span className="text-maroon/60 font-medium uppercase tracking-[0.3em] text-[10px] mb-6 block">
              Conditions We Treat
            </span>
            
            {/* The Question - Typography as art */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display text-charcoal leading-[1.05] mb-6">
              What brings you<br />
              <span className="text-maroon/70">in today?</span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-lg text-charcoal/50 font-light max-w-lg mx-auto">
              Select a category to find your concern. We&apos;ll guide you to the right solution.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================
          CATEGORY TABS - Large Clickable Zones
          ============================================ */}
      <section className="py-8 md:py-12">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {groups.map((group) => (
              <button
                key={group}
                onClick={() => setActiveGroup(group)}
                className={`
                  relative p-6 md:p-8 rounded-2xl text-left
                  transition-all duration-300
                  ${activeGroup === group 
                    ? 'bg-charcoal text-beige-warm' 
                    : 'bg-white text-charcoal hover:bg-charcoal/5 border border-charcoal/5'
                  }
                `}
              >
                {/* Icon */}
                <div className={`
                  mb-4 transition-colors
                  ${activeGroup === group ? 'text-terracotta-light' : 'text-charcoal/30'}
                `}>
                  {groupIcons[group]}
                </div>
                
                {/* Label */}
                <span className={`
                  text-sm md:text-base font-medium block leading-tight
                  ${activeGroup === group ? 'text-beige-warm' : 'text-charcoal'}
                `}>
                  {group}
                </span>
                
                {/* Count badge */}
                <span className={`
                  absolute top-4 right-4 text-[10px] font-mono
                  ${activeGroup === group ? 'text-beige-warm/50' : 'text-charcoal/30'}
                `}>
                  {conditionsByGroup.find(g => g.group === group)?.items.length || 0}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          CONDITIONS LIST - Apple Specs Style
          ============================================ */}
      <section className="py-8 md:py-12">
        <div className="section-container">
          <div className="bg-white rounded-3xl overflow-hidden border border-charcoal/5">
            {/* List header */}
            <div className="px-6 md:px-10 py-4 border-b border-charcoal/5 bg-charcoal/[0.02]">
              <p className="text-[10px] uppercase tracking-[0.3em] text-charcoal/40">
                {activeGroup}
              </p>
            </div>
            
            {/* Conditions list */}
            <div className="divide-y divide-charcoal/5">
              {activeConditions.map((condition, index) => (
                <ConditionRow 
                  key={condition.slug} 
                  condition={condition} 
                  index={index}
                />
              ))}
            </div>
            
            {/* Empty state */}
            {activeConditions.length === 0 && (
              <div className="px-6 md:px-10 py-16 text-center">
                <p className="text-charcoal/40">No conditions found in this category.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ============================================
          CAN'T FIND YOUR CONCERN?
          ============================================ */}
      <section className="py-16 md:py-24">
        <div className="section-container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-display text-charcoal mb-4">
              Can&apos;t find your concern?
            </h2>
            <p className="text-charcoal/50 mb-8">
              We treat many conditions not listed here. Book a consultation and 
              our dermatologists will assess your specific situation.
            </p>
            <a 
              href="#contact" 
              className="inline-flex items-center gap-2 bg-charcoal text-beige-warm px-8 py-4 rounded-full font-medium hover:bg-maroon transition-colors duration-300"
            >
              Book a Consultation
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ============================================
          CROSS-LINK TO TREATMENTS
          ============================================ */}
      <section className="py-12 border-t border-charcoal/5">
        <div className="section-container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-charcoal/40 text-sm">
                Already know what treatment you want?
              </p>
            </div>
            <Link 
              href="/treatments"
              className="inline-flex items-center gap-2 text-maroon hover:text-maroon/70 font-medium transition-colors"
            >
              Browse All Treatments
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

// ============================================
// CONDITION ROW COMPONENT - Specs List Style
// ============================================
function ConditionRow({ 
  condition,
  index 
}: { 
  condition: Condition;
  index: number;
}) {
  return (
    <Link
      href={`/conditions/${condition.slug}`}
      className="group flex items-center justify-between px-6 md:px-10 py-6 hover:bg-charcoal/[0.02] transition-colors duration-200"
    >
      {/* Left: Name and description */}
      <div className="flex-1 min-w-0 pr-6">
        <div className="flex items-center gap-3 mb-1">
          <h3 className="text-lg md:text-xl font-display text-charcoal group-hover:text-maroon transition-colors truncate">
            {condition.name}
          </h3>
          {condition.isTopConcern && (
            <span className="hidden md:inline-flex text-[9px] uppercase tracking-wider bg-terracotta/10 text-maroon px-2 py-0.5 rounded-full">
              Common
            </span>
          )}
        </div>
        <p className="text-sm text-charcoal/50 truncate">
          {condition.subtitle}
        </p>
      </div>
      
      {/* Right: Arrow */}
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-beige-warm group-hover:bg-maroon flex items-center justify-center transition-all duration-300">
        <svg 
          className="w-4 h-4 text-charcoal/30 group-hover:text-beige-warm transition-colors" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}
