'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { TreatmentFamily } from '@/lib/navigationData';
import { LuminousBackground } from '@/components/ui/LuminousBackground';
import { Reveal } from '@/components/ui/Reveal';
import Footer from '@/components/sections/Footer';
import { useBookingModal } from '@/components/ui/BookingModal';

// --- SHARED LOGIC FOR SCALING CARDS (Adapted from SignaturePrograms) ---
function ScrollScaleCard({ 
  children, 
  index, 
  containerRef,
  className = ""
}: { 
  children: React.ReactNode; 
  index: number; 
  containerRef: React.RefObject<HTMLDivElement | null>;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const { scrollXProgress } = useScroll({
    container: containerRef,
    target: cardRef,
    axis: "x",
    offset: ["center end", "center start"]
  });

  // Scale: 0.92 -> 1.0 -> 0.92 (Breathing effect)
  const scale = useTransform(scrollXProgress, [0, 0.5, 1], [0.92, 1, 0.92]);
  
  return (
    <motion.div
      ref={cardRef}
      style={{ scale }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`snap-center snap-always flex-shrink-0 ${className}`}
    >
      {children}
    </motion.div>
  );
}

interface MobileTreatmentFamilyProps {
  family: TreatmentFamily;
  content: any; // Using any for content flexibility
  relatedConditions: any[];
}

export default function MobileTreatmentFamily({ 
  family, 
  content,
  relatedConditions 
}: MobileTreatmentFamilyProps) {
  const whyPragnaContainerRef = useRef<HTMLDivElement>(null);
  const subTreatmentsContainerRef = useRef<HTMLDivElement>(null);
  const { openBookingModal } = useBookingModal();

  const heroTitle = content?.hero.title || family.name;
  const heroEyebrow = content?.hero.eyebrow || `${family.pillar} • TREATMENTS`;
  const heroSubtitle = content?.hero.subtitle || 'Expert dermatologist care';

  const trustIndicators = content?.trustIndicators || [
    { value: '25+', label: 'Years Experience' },
    { value: 'FDA', label: 'Approved Technology' },
    { value: '10K+', label: 'Patients Treated' },
  ];

  const whyPragnaItems = content?.whyPragna || [
    {
      title: 'Dermatologist-Led',
      description: 'Every treatment is designed and supervised by qualified dermatologists with decades of experience.',
    },
    {
      title: 'Advanced Technology',
      description: 'We use only US-FDA approved devices and medical-grade protocols for optimal safety and results.',
    },
    {
      title: 'Personalised Care',
      description: 'No cookie-cutter treatments. Every plan is tailored to your unique skin type, concerns, and goals.',
    },
  ];

  return (
    <main className="w-full bg-beige-warm overflow-x-hidden">
      
      {/* ==================== 
          1. HERO (Compact ~55svh)
      ==================== */}
      <section className="relative h-[55svh] w-full overflow-hidden bg-charcoal rounded-b-[2rem] shadow-xl shadow-black/20">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          {content?.hero.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={content.hero.image} alt={heroTitle} className="w-full h-full object-cover opacity-60" />
          ) : (
            <LuminousBackground pillar={family.pillar} variant="family" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
        </div>

        {/* Content */}
        <div className="absolute inset-0 z-10 flex flex-col justify-end px-6 pb-12">
          <Reveal>
            <span className="inline-block px-3 py-1 rounded-full border border-white/20 bg-black/20 backdrop-blur-sm text-white/70 font-sans text-[10px] tracking-[0.2em] uppercase mb-4">
              {heroEyebrow}
            </span>
            <h1 className="text-4xl font-display text-white leading-[1.1] mb-3">
              {heroTitle}
            </h1>
            <p className="text-white/80 font-light text-lg leading-relaxed max-w-sm mb-6">
              {heroSubtitle}
            </p>
            
            <button 
                type="button"
                className="w-full py-4 bg-cream text-maroon rounded-full font-medium active:scale-95 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                onClick={() => openBookingModal()}
            >
              Book Consultation
            </button>
          </Reveal>
        </div>
      </section>

      {/* ==================== 
          2. TRUST INDICATORS (Static)
      ==================== */}
      <section className="px-6 -mt-8 relative z-20">
        <div className="bg-white p-6 rounded-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border border-maroon/5">
          <div className="grid grid-cols-2 gap-y-6 gap-x-4">
            {trustIndicators.map((stat: any, i: number) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-0.5 h-8 bg-gradient-to-b from-maroon/50 to-transparent rounded-full" />
                <div>
                  <div className="font-display text-xl text-charcoal leading-none mb-1">
                    {stat.value}
                  </div>
                  <div className="text-[10px] text-charcoal/50 uppercase tracking-widest font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 
          3. WHY PRAGNA (Scaling Cards)
      ==================== */}
      <section className="py-12 overflow-hidden">
        <div className="px-6 mb-6">
          <span className="text-maroon/60 font-medium uppercase tracking-[0.2em] text-[10px] block mb-2">
            The Pragna Difference
          </span>
          <h2 className="text-3xl font-display text-charcoal">
            Why Pragna
          </h2>
        </div>

        <div 
          ref={whyPragnaContainerRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-6 pb-8 -mx-6 scrollbar-hide"
          style={{ paddingLeft: 'max(1.5rem, calc(50vw - 40vw))', paddingRight: 'max(1.5rem, calc(50vw - 40vw))' }}
        >
          {whyPragnaItems.map((item: any, i: number) => (
            <ScrollScaleCard 
              key={i} 
              index={i} 
              containerRef={whyPragnaContainerRef}
              className="w-[80vw]"
            >
              <div className="h-full bg-white p-8 rounded-[2rem] border border-maroon/5 shadow-sm flex flex-col min-h-[280px] relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-maroon/5 rounded-full blur-3xl -mr-10 -mt-10" />
                
                <span className="text-5xl font-display text-maroon/10 mb-auto block">
                  0{i + 1}
                </span>

                <div className="relative z-10">
                  <h3 className="text-xl font-display text-maroon mb-3">
                    {item.title}
                  </h3>
                  <p className="text-charcoal/60 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </ScrollScaleCard>
          ))}
        </div>
      </section>

      {/* ==================== 
          4. SUB-TREATMENTS (Scaling Cards)
      ==================== */}
      <section className="py-12 overflow-hidden bg-white">
        <div className="px-6 mb-6">
          <span className="text-maroon/60 font-medium uppercase tracking-[0.2em] text-[10px] block mb-2">
            Available Options
          </span>
          <h2 className="text-3xl font-display text-charcoal">
            Sub-Treatments
          </h2>
          <p className="text-charcoal/50 text-sm mt-2">
            Select a treatment to learn more about the procedure, downtime, and expected results.
          </p>
        </div>

        <div 
          ref={subTreatmentsContainerRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-6 pb-8 -mx-6 scrollbar-hide"
          style={{ paddingLeft: 'max(1.5rem, calc(50vw - 40vw))', paddingRight: 'max(1.5rem, calc(50vw - 40vw))' }}
        >
          {family.subTreatments.map((treatment: any, i: number) => {
             const treatmentImage = treatment.image;
             return (
              <ScrollScaleCard 
                key={treatment.slug} 
                index={i} 
                containerRef={subTreatmentsContainerRef}
                className="w-[80vw]"
              >
                <Link
                  href={`/treatments/${family.slug}/${treatment.slug}`}
                  className="block aspect-[3/4] relative rounded-[2rem] overflow-hidden group shadow-lg shadow-charcoal/5"
                >
                  {/* Image */}
                  {treatmentImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={treatmentImage}
                      alt={treatment.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-charcoal">
                       <LuminousBackground pillar={family.pillar} variant="sub-treatment" />
                    </div>
                  )}

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                  {/* Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <h3 className="text-2xl font-display text-white mb-2">
                      {treatment.name}
                    </h3>
                    <p className="text-white/70 text-sm mb-4 line-clamp-2 leading-relaxed">
                      {treatment.description}
                    </p>
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/90 font-medium">
                      <span>Explore</span>
                      <div className="w-6 h-6 rounded-full bg-white text-charcoal flex items-center justify-center">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollScaleCard>
            );
          })}
        </div>
      </section>

      {/* ==================== 
          5. HOW IT WORKS (Timeline)
      ==================== */}
      <section className="py-12 px-6 bg-beige-warm">
        <div className="mb-8">
           <span className="text-maroon/60 font-medium uppercase tracking-[0.2em] text-[10px] block mb-2">
            The Process
          </span>
          <h2 className="text-3xl font-display text-charcoal">
            How It Works
          </h2>
        </div>

        <div className="relative pl-4 space-y-10 border-l border-maroon/20 ml-3">
          {(content?.howItWorks?.steps || []).map((step: any, i: number) => (
             <div key={i} className="relative pl-8">
                {/* Dot */}
                <div className="absolute -left-[21px] top-0 w-10 h-10 rounded-full bg-beige-warm flex items-center justify-center border border-maroon/10">
                   <div className="w-2 h-2 rounded-full bg-maroon" />
                </div>
                
                <span className="text-[10px] text-maroon/60 uppercase tracking-widest mb-1 block">
                  Step 0{i + 1}
                </span>
                <h3 className="text-lg font-display text-charcoal mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-charcoal/60 leading-relaxed">
                  {step.text}
                </p>
             </div>
          ))}
        </div>
      </section>

      {/* ==================== 
          6. WHO IS THIS FOR (Checklist)
      ==================== */}
      <section className="py-12 px-6 bg-white">
         <div className="mb-8">
          <span className="text-maroon/60 font-medium uppercase tracking-[0.2em] text-[10px] block mb-2">
            Suitability
          </span>
          <h2 className="text-2xl font-display text-charcoal mb-2">
            Who Is This For
          </h2>
          <p className="text-sm text-charcoal/50">
            This treatment family is specifically curated to address these common concerns with clinical precision.
          </p>
        </div>

        <div className="space-y-4">
          {(content?.whoIsThisFor?.list || []).map((item: string, i: number) => (
            <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-beige-warm/50 border border-maroon/5">
              <div className="w-6 h-6 rounded-full bg-maroon/10 flex items-center justify-center shrink-0 mt-0.5 border border-maroon/20">
                <svg className="w-3 h-3 text-maroon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-sm text-charcoal/70 leading-relaxed font-medium">
                {item}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== 
          7. TREATS CONDITIONS
      ==================== */}
      {relatedConditions.length > 0 && (
        <section className="py-10 bg-beige-warm border-t border-charcoal/5">
           <div className="px-6 text-center">
            <span className="text-maroon/60 font-medium uppercase tracking-[0.2em] text-[10px] block mb-6">
              Treats Conditions
            </span>
            <div className="flex flex-wrap justify-center gap-2.5">
              {relatedConditions.map((condition: any) => (
                <Link
                  key={condition.slug}
                  href={`/conditions/${condition.slug}`}
                  className="px-4 py-2.5 bg-white rounded-full text-xs font-medium text-charcoal/70 border border-charcoal/5 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] active:scale-95 active:bg-maroon/5 active:text-maroon transition-all"
                >
                  {condition.name}
                </Link>
              ))}
            </div>
           </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
