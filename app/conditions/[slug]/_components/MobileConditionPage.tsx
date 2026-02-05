'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ConditionContent, Condition, TreatmentFamily } from '@/lib/navigationData';
import { LuminousBackground } from '@/components/ui/LuminousBackground';
import { Reveal } from '@/components/ui/Reveal';
import { useBookingModal } from '@/components/ui/BookingModal';
import Footer from '@/components/sections/Footer';
import BookingButton from '@/components/ui/BookingButton';

// --- SHARED UI: ScrollScaleCard with Focus State ---
function ScrollScaleCard({ 
  children, 
  index, 
  containerRef,
  className = ""
}: { 
  children: (isActive: boolean) => React.ReactNode; // Render prop for active state
  index: number; 
  containerRef: React.RefObject<HTMLDivElement | null>;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  
  const { scrollXProgress } = useScroll({
    container: containerRef,
    target: cardRef,
    axis: "x",
    offset: ["center end", "center start"]
  });

  // Scale effect
  const scale = useTransform(scrollXProgress, [0, 0.5, 1], [0.93, 1, 0.93]);
  const opacity = useTransform(scrollXProgress, [0, 0.5, 1], [0.85, 1, 0.85]);

  // Intersection Observer for "Active" Highlight
  useEffect(() => {
    if (!cardRef.current || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsActive(entry.isIntersecting);
        });
      },
      {
        root: containerRef.current,
        threshold: 0.7, // 70% visible = active
      }
    );

    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [containerRef]);
  
  return (
    <motion.div
      ref={cardRef}
      style={{ scale, opacity: isActive ? 1 : opacity }}
      className={`snap-center snap-always flex-shrink-0 ${className}`}
    >
      {children(isActive)}
    </motion.div>
  );
}

// --- Accordion Component for FAQs ---
function AccordionItem({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`bg-white rounded-xl border transition-all duration-300 overflow-hidden ${isOpen ? 'border-maroon/20 shadow-sm' : 'border-charcoal/5'}`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-start justify-between p-5 text-left"
      >
        <span className={`text-sm font-medium pr-4 font-display ${isOpen ? 'text-maroon' : 'text-charcoal'} transition-colors`}>
          {title}
        </span>
        <span className={`transform transition-transform duration-300 flex-shrink-0 mt-0.5 ${isOpen ? 'rotate-180' : ''} text-maroon/50`}>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="px-5 pb-5 pt-0">
               <div className="text-sm text-charcoal/70 leading-relaxed border-t border-charcoal/5 pt-3">
                 {children}
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface MobileConditionPageProps {
  condition: Condition;
  content: ConditionContent | null;
  relatedFamilies: TreatmentFamily[];
}

export default function MobileConditionPage({
  condition,
  content,
  relatedFamilies
}: MobileConditionPageProps) {
  const { openBookingModal } = useBookingModal();
  const symptomsRef = useRef<HTMLDivElement>(null);
  const solutionsRef = useRef<HTMLDivElement>(null);
  
  // -- Content Extraction --
  const heroTitle = content?.hero?.title || condition.name;
  const heroEmpathy = content?.hero?.empathyStatement || condition.subtitle;
  const heroIntro = content?.hero?.intro;

  // Default Fallbacks
  const defaultSymptoms = [
    'Visible symptoms that affect your confidence',
    'The issue keeps returning despite trying products',
    'You notice it getting worse over time',
    'It impacts your daily life',
  ];
  const symptoms = content?.symptoms?.list || defaultSymptoms;

  // Resolve Treatments
  const hasSpecificRecommendations = content?.recommendedTreatments && content.recommendedTreatments.length > 0;
  
  return (
    <div className="w-full bg-white overflow-x-hidden min-h-screen">
      
      {/* ==================== 
          1. HERO (Immersive 55svh)
      ==================== */}
      <section className="relative min-h-[65svh] w-full flex flex-col justify-end bg-charcoal pt-32">
        {/* Background */}
        <div className="absolute inset-0 z-0">
           <LuminousBackground pillar={condition.group} variant="condition" />
           <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80" />
           <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 px-6 pb-20">
            <Reveal>
                <div className="inline-block px-3 py-1 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white/80 font-sans text-[10px] tracking-[0.2em] uppercase mb-6">
                    {condition.group} Concerns
                </div>

                <h1 className="text-3xl xs:text-4xl font-display text-white leading-[1.1] mb-6 shadow-sm">
                    {heroTitle}
                </h1>
                
                <p className="text-white/80 font-light text-lg leading-relaxed mb-8 italic opacity-90 border-l-2 border-white/30 pl-4">
                    &ldquo;{heroEmpathy}&rdquo;
                </p>

                {heroIntro && (
                    <p className="text-white/60 text-sm mb-8 leading-relaxed max-w-sm">
                        {heroIntro}
                    </p>
                )}

                <button 
                    onClick={() => openBookingModal(condition.name)}
                    className="w-full py-4 bg-white text-maroon rounded-full font-medium active:scale-95 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.15)] flex items-center justify-center gap-2"
                >
                    <span>Book Consultation</span>
                </button>
            </Reveal>
        </div>
      </section>

      {/* ==================== 
          SHEET CONTAINER (Slides up)
          Use a Fragment pattern to avoid "floating footer" issues.
          The visual sheet is achieved via styling the first section's top.
      ==================== */}
      <div className="relative z-20 bg-white -mt-8 rounded-t-[2.5rem] shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.1)] overflow-hidden">
        
        {/* --- SYMPTOMS (Horizontal Scroll) --- */}
        <section className="pt-10 pb-8 bg-white">
            <div className="px-6 mb-4">
                <span className="text-maroon/60 font-medium uppercase tracking-[0.2em] text-[10px] block mb-2">
                    Recognise This?
                </span>
                <h2 className="text-2xl font-display text-charcoal">
                    Common Signs
                </h2>
            </div>

            <div 
                ref={symptomsRef}
                className="flex overflow-x-auto snap-x snap-mandatory gap-3 px-6 pb-6 -mx-6 scrollbar-hide"
                style={{ paddingLeft: 'max(1.5rem, calc(50vw - 40vw))', paddingRight: 'max(1.5rem, calc(50vw - 40vw))' }}
            >
                {symptoms.map((symptom, i) => (
                    <ScrollScaleCard key={i} index={i} containerRef={symptomsRef} className="w-[75vw] max-w-[280px]">
                        {(isActive) => (
                            <div className={`h-full bg-white p-6 rounded-2xl border transition-all duration-500 shadow-sm flex flex-col gap-4 min-h-[160px] relative overflow-hidden group
                                ${isActive ? 'border-maroon/40 shadow-md' : 'border-charcoal/5'}
                            `}>
                                {/* Number - Adjusted to stay within bounds */}
                                <div className={`absolute top-2 right-4 text-[5rem] leading-none font-display transition-colors duration-500 -z-0 select-none
                                    ${isActive ? 'text-maroon/10' : 'text-charcoal/5'}
                                `}>
                                    {i + 1}
                                </div>
                                
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold relative z-10 transition-colors duration-500
                                    ${isActive ? 'bg-maroon text-white' : 'bg-maroon/10 text-maroon'}
                                `}>
                                    {i + 1}
                                </div>
                                <p className="text-charcoal/80 text-lg leading-snug relative z-10 font-medium">
                                    {symptom}
                                </p>
                            </div>
                        )}
                    </ScrollScaleCard>
                ))}
            </div>
        </section>

        {/* --- UNDERSTANDING (Vertical Stack) --- */}
        <section className="px-6 py-10 bg-[#FAF9F6] border-t border-charcoal/5">
            <div className="mb-6">
                <span className="text-maroon/60 font-medium uppercase tracking-[0.2em] text-[10px] block mb-2">
                    The Basics
                </span>
                <h2 className="text-2xl font-display text-charcoal">
                    Understanding <span className="italic text-maroon">Why</span>
                </h2>
            </div>

            <div className="space-y-4">
                {/* What it is */}
                <Reveal>
                    <div className="bg-white p-6 rounded-2xl border border-charcoal/5 shadow-sm">
                        <h3 className="text-lg font-display text-charcoal mb-3">What it is</h3>
                        <p className="text-charcoal/70 text-sm leading-relaxed">
                            {content?.understanding?.whatItIs || 
                            `A common condition that can affect confidence and comfort. Modern dermatology offers targeted protocols to manage and resolve it significantly.`}
                        </p>
                    </div>
                </Reveal>

                {/* Triggers */}
                <Reveal delay={0.1}>
                    <div className="bg-[#F5F2F0] p-6 rounded-2xl border border-charcoal/5">
                        <h3 className="text-lg font-display text-charcoal mb-3">Common Triggers</h3>
                        {content?.understanding?.whyItHappens ? (
                            <ul className="space-y-3 text-sm text-charcoal/70">
                                {content.understanding.whyItHappens.map((trigger, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <span className="w-1.5 h-1.5 rounded-full bg-maroon flex-shrink-0 mt-1.5" />
                                        <span>{trigger}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-charcoal/60 text-sm">Various environmental and genetic factors can contribute to this condition.</p>
                        )}
                    </div>
                </Reveal>
            </div>
        </section>

        {/* --- SOLUTIONS (Horizontal Scroll) --- */}
        <section className="py-10 bg-white border-y border-charcoal/5">
            <div className="px-6 mb-6">
                <span className="text-maroon/60 font-medium uppercase tracking-[0.2em] text-[10px] block mb-2">
                    Clinical Solutions
                </span>
                <h2 className="text-2xl font-display text-charcoal mb-3">
                    How we treat it
                </h2>
                <p className="text-charcoal/60 text-sm">
                    {content?.pragnaApproach?.description || 
                    'Our dermatologists customise a plan using one or a combination of these advanced treatments.'}
                </p>
            </div>

            <div 
                ref={solutionsRef}
                className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-6 pb-6 -mx-6 scrollbar-hide"
                style={{ paddingLeft: 'max(1.5rem, calc(50vw - 40vw))', paddingRight: 'max(1.5rem, calc(50vw - 40vw))' }}
            >
                {hasSpecificRecommendations ? (
                    // 1. Content-defined recommendations
                    content!.recommendedTreatments!.map((treatment, i) => (
                        <ScrollScaleCard key={i} index={i} containerRef={solutionsRef} className="w-[80vw]">
                             {(isActive) => (
                                <Link
                                    href={treatment.type === 'family' ? `/treatments/${treatment.slug}` : `/treatments/${relatedFamilies[0]?.slug || 'acne-acne-scar-solutions'}/${treatment.slug}`}
                                    className={`block h-full bg-[#FAF9F6] p-6 rounded-[1.5rem] border transition-all duration-500 shadow-sm relative overflow-hidden
                                        ${isActive ? 'border-maroon/40 shadow-md' : 'border-charcoal/5'}
                                    `}
                                >
                                    <span className="text-[10px] uppercase tracking-widest text-maroon/70 block mb-3 font-medium">
                                        {treatment.type === 'family' ? 'Treatment Family' : 'Targeted Treatment'}
                                    </span>
                                    <h3 className={`text-xl font-display mb-2 transition-colors ${isActive ? 'text-maroon' : 'text-charcoal'}`}>
                                        {treatment.name}
                                    </h3>
                                    <p className="text-charcoal/60 text-sm mb-4 min-h-[40px]">
                                        Best for: {treatment.bestFor}
                                    </p>
                                    <div className={`flex items-center text-xs uppercase tracking-widest font-medium mt-auto transition-colors ${isActive ? 'text-maroon' : 'text-charcoal/40'}`}>
                                        <span>Explore Solution</span>
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ml-2 border transition-all ${isActive ? 'border-maroon bg-maroon text-white' : 'border-charcoal/20'}`}>
                                             <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </div>
                                </Link>
                             )}
                        </ScrollScaleCard>
                    ))
                ) : (
                    // 2. Fallback to Related Families
                    relatedFamilies.map((family, i) => (
                        <ScrollScaleCard key={i} index={i} containerRef={solutionsRef} className="w-[80vw]">
                            {(isActive) => (
                                <Link
                                    href={`/treatments/${family.slug}`}
                                    className={`block h-full bg-[#FAF9F6] p-6 rounded-[1.5rem] border transition-all duration-500 shadow-sm relative overflow-hidden
                                        ${isActive ? 'border-maroon/40 shadow-md' : 'border-charcoal/5'}
                                    `}
                                >
                                    <span className="text-[10px] uppercase tracking-widest text-maroon/70 block mb-3 font-medium">
                                        {family.pillar} Treatment
                                    </span>
                                    <h3 className={`text-xl font-display mb-2 transition-colors ${isActive ? 'text-maroon' : 'text-charcoal'}`}>
                                        {family.name}
                                    </h3>
                                    <p className="text-charcoal/60 text-sm mb-4 min-h-[40px] line-clamp-2">
                                        {family.summary}
                                    </p>
                                    <div className={`flex items-center text-xs uppercase tracking-widest font-medium mt-auto transition-colors ${isActive ? 'text-maroon' : 'text-charcoal/40'}`}>
                                        <span>View Family</span>
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ml-2 border transition-all ${isActive ? 'border-maroon bg-maroon text-white' : 'border-charcoal/20'}`}>
                                             <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </div>
                                </Link>
                            )}
                        </ScrollScaleCard>
                    ))
                )}
            </div>
        </section>

        {/* --- TIMELINE --- */}
        {content?.timeline && content.timeline.steps.length > 0 && (
            <section className="px-6 py-10 bg-[#FAF9F6]">
                <div className="mb-8">
                    <span className="text-maroon/60 font-medium uppercase tracking-[0.2em] text-[10px] block mb-2">
                        Expectations
                    </span>
                    <h2 className="text-2xl font-display text-charcoal">
                        Your Journey
                    </h2>
                </div>

                <div className="relative pl-4 space-y-8 border-l border-maroon/20 ml-2">
                    {content.timeline.steps.map((step, i) => (
                        <Reveal key={i} delay={i * 0.1}>
                            <div className="relative pl-6">
                                {/* Dot */}
                                <div className="absolute -left-[21px] top-0 w-10 h-10 rounded-full bg-[#FAF9F6] flex items-center justify-center border border-maroon/10">
                                    <div className="w-2 h-2 rounded-full bg-maroon" />
                                </div>
                                
                                <span className="text-[10px] text-maroon/60 uppercase tracking-widest mb-1 block">
                                    {step.title}
                                </span>
                                <p className="text-sm text-charcoal/70 leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>
        )}

        {/* --- SELF CARE (Compact Group) --- */}
        {content?.selfCareTips && content.selfCareTips.length > 0 && (
            <section className="py-10 bg-white border-y border-charcoal/5">
                <div className="px-6 mb-6">
                     <span className="text-maroon/60 font-medium uppercase tracking-[0.2em] text-[10px] block mb-2">
                        At Home
                    </span>
                    <h2 className="text-2xl font-display text-charcoal">
                        Self-Care Tips
                    </h2>
                </div>

                <div className="px-6">
                    <Reveal>
                        <div className="bg-[#FAF9F6] p-6 rounded-2xl border border-charcoal/5">
                             <div className="space-y-4">
                                {content.selfCareTips.map((tip, i) => (
                                    <div key={i} className="flex items-start gap-3.5">
                                        <div className="w-5 h-5 rounded-full bg-maroon/10 flex items-center justify-center text-maroon shrink-0 mt-0.5">
                                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <p className="text-charcoal/80 text-sm leading-relaxed font-medium">
                                            {tip}
                                        </p>
                                    </div>
                                ))}
                             </div>
                        </div>
                    </Reveal>
                </div>
            </section>
        )}

        {/* --- FAQs --- */}
        {content?.faqs && content.faqs.length > 0 && (
            <section className="px-6 py-10 bg-[#FAF9F6]">
                <div className="mb-6">
                    <span className="text-maroon/60 font-medium uppercase tracking-[0.2em] text-[10px] block mb-2">
                        Common Questions
                    </span>
                    <h2 className="text-2xl font-display text-charcoal">
                        FAQs
                    </h2>
                </div>
                <div className="space-y-3">
                    {content.faqs.map((faq, i) => (
                        <AccordionItem key={i} title={faq.question}>
                            {faq.answer}
                        </AccordionItem>
                    ))}
                </div>
            </section>
        )}

        {/* --- CTA SECTION (Redesigned for Mobile) --- */}
        <section className="py-12 px-6 bg-maroon relative overflow-hidden">
             <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay" />
             
             <div className="relative z-10 text-center">
                <h2 className="text-3xl font-display text-white mb-3">
                    Ready to take control?
                </h2>
                <p className="text-white/80 text-sm mb-8 max-w-xs mx-auto leading-relaxed">
                    Schedule a consultation with our experts to start your journey.
                </p>
                
                <BookingButton 
                    className="w-full py-4 rounded-full font-medium text-sm transition-transform active:scale-95 bg-white text-maroon shadow-lg shadow-black/20 mb-8 flex items-center justify-center gap-2"
                    programName={condition.name}
                >
                    Book Consultation
                </BookingButton>
                
                {/* Clinic Numbers */}
                <div className="flex flex-col gap-4 pt-6 border-t border-white/10">
                    <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase tracking-widest text-white/50">Punjagutta</span>
                        <a href="tel:09848367000" className="text-white hover:text-white/80 transition-colors flex items-center gap-2 text-sm font-medium">
                            098483 67000
                        </a>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase tracking-widest text-white/50">Kokapet</span>
                        <a href="tel:08886421111" className="text-white hover:text-white/80 transition-colors flex items-center gap-2 text-sm font-medium">
                            088864 21111
                        </a>
                    </div>
                </div>
             </div>
        </section>

        {/* --- BACK LINK --- */}
        <div className="py-8 bg-white text-center border-t border-charcoal/5">
            <Link href="/conditions" className="inline-flex items-center gap-2 text-xs text-maroon/60 uppercase tracking-widest hover:text-maroon transition-colors px-6 py-3 rounded-full border border-maroon/10">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to all conditions
            </Link>
        </div>

      </div>

      {/* --- FOOTER (Outside Sheet) --- */}
      <Footer />
    </div>
  );
}
