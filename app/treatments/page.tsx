'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/sections/Footer';
import { getFamiliesByPillar, TreatmentFamily } from '@/lib/navigationData';

// Note: Metadata is in layout or handled via head for client components
// SEO will be handled at the layout level for this page

const pillars = ['All', 'Skin', 'Hair', 'Body', 'Wellness'] as const;
type Pillar = typeof pillars[number];

// Pillar icons (minimal line art style)
const pillarIcons: Record<string, React.ReactNode> = {
  Skin: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v2M12 16v2M6 12h2M16 12h2" strokeLinecap="round" />
    </svg>
  ),
  Hair: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2c-2 4-4 6-4 10a4 4 0 108 0c0-4-2-6-4-10z" />
      <path d="M12 22v-6" strokeLinecap="round" />
    </svg>
  ),
  Body: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="5" r="3" />
      <path d="M12 8v8M8 12h8M9 22l3-6 3 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Wellness: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 21c-4-4-8-7-8-11a8 8 0 0116 0c0 4-4 7-8 11z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
};

export default function TreatmentsPage() {
  const [activePillar, setActivePillar] = useState<Pillar>('All');
  const familiesByPillar = getFamiliesByPillar();
  
  // Filter families based on active pillar
  const filteredFamilies: TreatmentFamily[] = activePillar === 'All'
    ? familiesByPillar.flatMap(p => p.families)
    : familiesByPillar.find(p => p.pillar === activePillar)?.families || [];

  return (
    <main className="overflow-x-hidden bg-beige-warm">
      <Navbar />
      
      {/* ============================================
          HERO - Typography as Art
          ============================================ */}
      <section className="pt-32 pb-16 md:pt-44 md:pb-24 relative overflow-hidden">
        {/* Subtle texture background */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />
        </div>
        
        {/* Decorative gradient blob */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-radial from-terracotta/5 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        
        <div className="section-container relative z-10">
          <div className="max-w-4xl">
            {/* Tiny label */}
            <span className="text-maroon/60 font-medium uppercase tracking-[0.3em] text-[10px] mb-6 block">
              Our Treatments
            </span>
            
            {/* Hero headline - Typography IS the visual */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display text-charcoal leading-[0.95] mb-8">
              Curated<br />
              <span className="text-maroon/80">Dermatological</span><br />
              Treatments
            </h1>
            
            {/* Subtitle */}
            <p className="text-lg md:text-xl text-charcoal/50 font-light max-w-xl leading-relaxed">
              Evidence-based solutions for skin, hair, and body—each one 
              personalised by our dermatologists.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================
          PILLAR TABS - Sticky Filter
          ============================================ */}
      <section className="sticky top-20 z-30 bg-beige-warm/95 backdrop-blur-md border-y border-charcoal/5">
        <div className="section-container">
          <div className="flex items-center gap-2 py-4 overflow-x-auto scrollbar-hide">
            {pillars.map((pillar) => (
              <button
                key={pillar}
                onClick={() => setActivePillar(pillar)}
                className={`
                  flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium
                  transition-all duration-300 whitespace-nowrap
                  ${activePillar === pillar 
                    ? 'bg-charcoal text-beige-warm' 
                    : 'bg-transparent text-charcoal/60 hover:text-charcoal hover:bg-charcoal/5'
                  }
                `}
              >
                {pillar !== 'All' && pillarIcons[pillar]}
                {pillar}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          TREATMENT FAMILIES GRID - Bento Style
          ============================================ */}
      <section className="py-16 md:py-24">
        <div className="section-container">
          {/* Grid with varying sizes for visual interest */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredFamilies.map((family, index) => (
              <TreatmentFamilyCard 
                key={family.slug} 
                family={family} 
                index={index}
                isLarge={index === 0 || index === 3} // First and fourth cards are larger
              />
            ))}
          </div>
          
          {/* Empty state */}
          {filteredFamilies.length === 0 && (
            <div className="text-center py-20">
              <p className="text-charcoal/40 text-lg">No treatments found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* ============================================
          CROSS-LINK TO CONDITIONS
          ============================================ */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        {/* Background gradient accent */}
        <div className="absolute inset-0 bg-gradient-to-br from-maroon/5 via-transparent to-terracotta/5" />
        
        <div className="section-container relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <span className="text-maroon/60 font-medium uppercase tracking-[0.3em] text-[10px] mb-4 block">
              Not Sure Where to Start?
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display text-charcoal mb-6 leading-tight">
              Start with your concern
            </h2>
            <p className="text-charcoal/50 text-lg mb-10 leading-relaxed">
              Tell us what&apos;s bothering you, and we&apos;ll guide you to the right treatment.
            </p>
            <Link 
              href="/conditions"
              className="inline-flex items-center gap-3 bg-charcoal text-beige-warm px-8 py-4 rounded-full font-medium hover:bg-maroon transition-colors duration-300 group"
            >
              Browse Conditions
              <svg 
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================
          CTA STRIP
          ============================================ */}
      <section className="py-16 md:py-20 bg-charcoal text-beige-warm">
        <div className="section-container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl md:text-3xl font-display mb-2">
                Ready to begin?
              </h3>
              <p className="text-beige-warm/60">
                Book a consultation and let our dermatologists create your personalised plan.
              </p>
            </div>
            <a 
              href="#contact" 
              className="flex-shrink-0 inline-flex items-center gap-2 bg-terracotta-light text-charcoal px-8 py-4 rounded-full font-medium hover:bg-beige-warm transition-colors"
            >
              Book Consultation
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ============================================
          SEO DIRECTORY (Elegant keyword footer)
          ============================================ */}
      <section className="py-16 bg-beige-warm border-t border-charcoal/5">
        <div className="section-container">
          <p className="text-[10px] uppercase tracking-[0.3em] text-charcoal/30 mb-6">
            Treatment Directory
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {familiesByPillar.flatMap(p => p.families).map((family) => (
              <Link
                key={family.slug}
                href={`/treatments/${family.slug}`}
                className="text-sm text-charcoal/40 hover:text-maroon transition-colors"
              >
                {family.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

// ============================================
// TREATMENT FAMILY CARD COMPONENT
// ============================================
function TreatmentFamilyCard({ 
  family, 
  index,
  isLarge 
}: { 
  family: TreatmentFamily; 
  index: number;
  isLarge: boolean;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <Link
      href={`/treatments/${family.slug}`}
      className={`
        group relative bg-white rounded-2xl overflow-hidden
        border border-charcoal/5 hover:border-charcoal/10
        transition-all duration-500 hover:shadow-soft-xl
        ${isLarge ? 'md:col-span-2 lg:col-span-2' : ''}
      `}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Card content */}
      <div className={`p-8 ${isLarge ? 'md:p-10' : ''}`}>
        {/* Pillar badge */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-[10px] uppercase tracking-[0.2em] text-charcoal/40">
            {family.pillar}
          </span>
          <span className="text-[10px] font-mono text-charcoal/30">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
        
        {/* Title */}
        <h3 className={`
          font-display text-charcoal group-hover:text-maroon 
          transition-colors duration-300 mb-3
          ${isLarge ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'}
        `}>
          {family.name}
        </h3>
        
        {/* Summary */}
        <p className="text-charcoal/50 text-sm leading-relaxed mb-6">
          {family.summary}
        </p>
        
        {/* Sub-treatments preview (expands on hover) */}
        <div className={`
          overflow-hidden transition-all duration-500
          ${isExpanded ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}
        `}>
          <div className="pt-4 border-t border-charcoal/5">
            <p className="text-[10px] uppercase tracking-[0.2em] text-charcoal/40 mb-3">
              Includes
            </p>
            <div className="flex flex-wrap gap-2">
              {family.subTreatments.slice(0, 4).map((sub) => (
                <span 
                  key={sub.slug}
                  className="text-xs text-charcoal/60 bg-beige-warm px-3 py-1 rounded-full"
                >
                  {sub.name}
                </span>
              ))}
              {family.subTreatments.length > 4 && (
                <span className="text-xs text-maroon/60 px-3 py-1">
                  +{family.subTreatments.length - 4} more
                </span>
              )}
            </div>
          </div>
        </div>
        
        {/* Arrow indicator */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-charcoal/5">
          <span className="text-xs text-charcoal/40">
            {family.subTreatments.length} treatments
          </span>
          <div className="w-8 h-8 rounded-full bg-beige-warm group-hover:bg-maroon flex items-center justify-center transition-colors duration-300">
            <svg 
              className="w-4 h-4 text-charcoal/40 group-hover:text-beige-warm transition-colors" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
