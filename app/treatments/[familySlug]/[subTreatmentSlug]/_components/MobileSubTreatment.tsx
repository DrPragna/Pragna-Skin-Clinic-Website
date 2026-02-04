'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { SubTreatment, TreatmentFamily, Condition, SubTreatmentContent } from '@/lib/navigationData';
import { LuminousBackground } from '@/components/ui/LuminousBackground';
import { Reveal } from '@/components/ui/Reveal';
import { useBookingModal } from '@/components/ui/BookingModal';

// --- SHARED UI: ScrollScaleCard ---
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

  // Keep scale subtle
  const scale = useTransform(scrollXProgress, [0, 0.5, 1], [0.94, 1, 0.94]);
  const opacity = useTransform(scrollXProgress, [0, 0.5, 1], [0.6, 1, 0.6]);
  
  return (
    <motion.div
      ref={cardRef}
      style={{ scale, opacity }}
      className={`snap-center snap-always flex-shrink-0 ${className}`}
    >
      {children}
    </motion.div>
  );
}

interface MobileSubTreatmentProps {
  subTreatment: SubTreatment;
  family: TreatmentFamily;
  relatedConditions: Condition[];
  siblingTreatments: SubTreatment[];
  content: SubTreatmentContent | null;
}

export default function MobileSubTreatment({
  subTreatment,
  family,
  relatedConditions,
  siblingTreatments,
  content,
}: MobileSubTreatmentProps) {
  const { openBookingModal } = useBookingModal();
  const resultsContainerRef = useRef<HTMLDivElement>(null);
  
  // -- Content Logic --
  const heroTitle = content?.hero.title || subTreatment.name;
  const heroTagline = content?.hero.tagline || 'Professional care for lasting results';
  const heroIntro = content?.hero.intro || `${subTreatment.description}. Our dermatologists use advanced technology and personalised protocols to deliver safe, effective outcomes.`;
  const heroImage = subTreatment.image || (content?.hero as any)?.image || null;

  const quickStats = content?.quickStats || {
    sessions: '6-8 sessions',
    duration: '30-45 mins',
    downtime: 'Minimal to none',
    painLevel: 'Mild sensation',
  };

  const overview = content?.overview || `Our ${subTreatment.name.toLowerCase()} treatment is designed with your comfort and results in mind. Each session is performed by trained professionals using the latest technology, ensuring you feel at ease throughout the process.`;

  const isThisForYou = content?.isThisForYou || [
    'Want a safe, long-lasting solution',
    'Prefer medical-grade treatment over temporary remedies',
    'Are looking for results customised to your skin type',
    'Value professional care and follow-up support',
  ];

  const processSteps = content?.process.steps || [
    {
      phase: 'before' as const,
      title: 'Preparation',
      description: 'We assess your skin, discuss your goals, and prepare the treatment area. Numbing may be applied if needed for your comfort.',
    },
    {
      phase: 'during' as const,
      title: 'Treatment',
      description: 'The treatment is performed with precision using advanced equipment. Most sessions are comfortable and well-tolerated, with our team ensuring you feel at ease.',
    },
    {
      phase: 'after' as const,
      title: 'Aftercare',
      description: 'We provide detailed aftercare instructions and schedule follow-ups. Mild redness may occur but typically resolves quickly.',
    },
  ];

  const resultsTimeline = content?.results.timeline || 'Visible improvement is typically noticed within the first few sessions. Full results develop over the course of your treatment plan, with optimal outcomes appearing 2-4 weeks after your final session.';
  const resultsRecovery = content?.results.recovery || 'Most patients return to normal activities immediately. Some mild redness or sensitivity may occur but typically resolves within 24-48 hours. Follow provided aftercare for optimal healing.';

  const faqs = content?.faqs || [
    { 
      question: 'How many sessions will I need?', 
      answer: 'Typically 6-8 sessions are recommended, depending on your individual response and goals. Your dermatologist will create a personalised plan during your consultation.' 
    },
    { 
      question: 'Is it painful?', 
      answer: 'Most patients find the treatment comfortable. You may feel a mild warming or tingling sensation. We use cooling and numbing techniques when needed to ensure your comfort.' 
    },
    { 
      question: 'When will I see results?', 
      answer: 'Initial improvements may be visible after 2-3 sessions, with full results developing over time. Results continue to improve for several weeks after your treatment course.' 
    },
    { 
      question: 'Is there any downtime?', 
      answer: 'Minimal to none. Most patients return to normal activities immediately. Some mild redness may occur but typically resolves within a few hours to a day.' 
    },
    { 
      question: 'Is it safe for all skin types?', 
      answer: 'Our treatments are customised for Indian skin types. During your consultation, we assess your skin and select the most appropriate settings and protocols for you.' 
    },
  ];

  return (
    <main className="w-full bg-[#FDFCFB] overflow-x-hidden min-h-screen">
      
      {/* ==================== 
          1. HERO (Immersive Overlay)
          Content sits directly on the background image
      ==================== */}
      <section className="relative min-h-[60vh] w-full flex flex-col justify-end bg-charcoal">
        
        {/* Background Layer */}
        <div className="absolute inset-0 z-0">
          {heroImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img 
              src={heroImage}
              alt={heroTitle}
              className="w-full h-full object-cover opacity-70"
            />
          ) : (
             <LuminousBackground pillar={family.pillar} variant="sub-treatment" />
          )}
           {/* Gradient Overlays for Text Readability */}
           <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80" />
           <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
        </div>

        {/* Hero Content Overlaid */}
        <div className="relative z-10 px-6 pb-16 pt-32">
            <Reveal>
            <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-white/70 mb-4 font-medium">
                <Link href={`/treatments/${family.slug}`} className="hover:text-white transition-colors">
                    {family.name}
                </Link>
                <span className="opacity-40">•</span>
                <span>Treatment</span>
            </div>

            <h1 className="text-4xl xs:text-5xl font-display text-white leading-[1.1] mb-4 shadow-sm">
                {heroTitle}
            </h1>
            <p className="text-white/80 font-light text-lg leading-relaxed mb-8 max-w-sm text-shadow-sm">
                {heroTagline}
            </p>
            
            <button 
                type="button"
                className="w-full py-4 bg-white text-charcoal rounded-full font-medium active:scale-95 transition-all duration-300 shadow-[0_0_25px_rgba(255,255,255,0.15)]"
                onClick={() => openBookingModal(heroTitle)}
            >
                Book Consultation
            </button>
            </Reveal>
        </div>
      </section>

      {/* ==================== 
          2. REST OF CONTENT (Sheet)
          Pulls up slightly over the hero
      ==================== */}
      <div className="relative z-20 bg-[#FDFCFB] rounded-t-[2.5rem] -mt-8 pt-10 shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.1)]">
                
        {/* Quick Stats Grid */}
        <div className="px-6 mb-12">
                <div className="grid grid-cols-2 gap-3">
                {[
                    { label: 'Sessions', value: quickStats.sessions },
                    { label: 'Duration', value: quickStats.duration },
                    { label: 'Downtime', value: quickStats.downtime },
                    { label: 'Comfort', value: quickStats.painLevel },
                ].map((stat, i) => (
                        <div key={i} className="bg-white p-4 rounded-2xl border border-charcoal/5 shadow-sm">
                        <span className="block text-[9px] uppercase tracking-widest text-maroon/40 mb-1.5">
                            {stat.label}
                        </span>
                        <span className="block text-sm font-medium text-charcoal font-display">
                            {stat.value}
                        </span>
                        </div>
                ))}
                </div>
        </div>

            {/* ==================== 
            3. OVERVIEW & SUITABILITY
        ==================== */}
        <section className="px-6 mb-12">
                    <div className="mb-8">
                        <span className="text-maroon/60 font-medium uppercase tracking-[0.2em] text-[10px] block mb-2">
                        The Treatment
                        </span>
                        <h2 className="text-2xl font-display text-charcoal mb-4">
                        Overview
                        </h2>
                        <p className="text-charcoal/70 leading-relaxed text-sm">
                        {overview}
                        </p>
                    </div>

                    {/* Is This For You Checklist */}
                    <div className="space-y-3">
                        <h3 className="text-sm font-semibold text-charcoal mb-4">Is This For You?</h3>
                        {isThisForYou.map((item, i) => (
                            <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-charcoal/5">
                                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-maroon/10 flex items-center justify-center mt-0.5 text-maroon">
                                    <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </span>
                                <span className="text-charcoal/70 text-sm leading-snug">{item}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ==================== 
                    3. THE PROCESS
                ==================== */}
                <section className="py-12 px-6 bg-white border-y border-charcoal/5">
                    <div className="mb-8">
                    <span className="text-maroon/60 font-medium uppercase tracking-[0.2em] text-[10px] block mb-2">
                        The Journey
                    </span>
                    <h2 className="text-2xl font-display text-charcoal">
                        Process
                    </h2>
                    </div>

                    <div className="relative pl-2 space-y-8 border-l border-maroon/10 ml-2.5">
                    {processSteps.map((step, i) => (
                        <Reveal key={i} delay={i * 0.1}>
                            <div className="relative pl-6">
                                {/* Timeline Dot */}
                                <div className="absolute -left-[17px] top-1 w-8 h-8 rounded-full bg-white flex items-center justify-center border border-maroon/20 z-10">
                                    <div className="w-1.5 h-1.5 rounded-full bg-maroon" />
                                </div>
                                
                                <span className="text-[9px] text-maroon/60 uppercase tracking-widest mb-1 block">
                                {step.phase}
                                </span>
                                <h3 className="text-lg font-display text-charcoal mb-2">
                                {step.title}
                                </h3>
                                <p className="text-sm text-charcoal/60 leading-relaxed">
                                {step.description}
                                </p>
                            </div>
                        </Reveal>
                    ))}
                    </div>
                </section>

                {/* ==================== 
                    4. RESULTS (Horizontal Snap Cards)
                ==================== */}
                <section className="py-12 overflow-hidden bg-[#FDFCFB]">
                    <div className="px-6 mb-6">
                        <span className="text-maroon/60 font-medium uppercase tracking-[0.2em] text-[10px] block mb-2">
                        Expectations
                        </span>
                        <h2 className="text-2xl font-display text-charcoal">
                        Results & Recovery
                        </h2>
                    </div>

                    <div 
                        ref={resultsContainerRef}
                        className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-6 pb-8 -mx-6 scrollbar-hide"
                        style={{ paddingLeft: 'max(1.5rem, calc(50vw - 40vw))', paddingRight: 'max(1.5rem, calc(50vw - 40vw))' }}
                    >
                        {/* Card 1: Timeline */}
                        <ScrollScaleCard index={0} containerRef={resultsContainerRef} className="w-[80vw]">
                            <div className="h-full bg-white p-6 rounded-2xl border border-charcoal/5 shadow-sm flex flex-col justify-between min-h-[220px] group-hover:border-maroon/30 transition-colors">
                                <div>
                                    <div className="w-10 h-10 rounded-full bg-beige-warm flex items-center justify-center mb-4 text-maroon border border-maroon/10">
                                        <span className="font-display text-xl">01</span>
                                    </div>
                                    <h3 className="text-lg font-display text-charcoal mb-3 group-hover:text-maroon transition-colors">Timeline</h3>
                                    <p className="text-charcoal/60 text-sm leading-relaxed">
                                        {resultsTimeline}
                                    </p>
                                </div>
                            </div>
                        </ScrollScaleCard>

                        {/* Card 2: Recovery */}
                        <ScrollScaleCard index={1} containerRef={resultsContainerRef} className="w-[80vw]">
                            <div className="h-full bg-white p-6 rounded-2xl border border-charcoal/5 shadow-sm flex flex-col justify-between min-h-[220px] group-hover:border-maroon/30 transition-colors">
                                <div>
                                    <div className="w-10 h-10 rounded-full bg-beige-warm flex items-center justify-center mb-4 text-maroon border border-maroon/10">
                                        <span className="font-display text-xl">02</span>
                                    </div>
                                    <h3 className="text-lg font-display text-charcoal mb-3 group-hover:text-maroon transition-colors">Recovery</h3>
                                    <p className="text-charcoal/60 text-sm leading-relaxed">
                                        {resultsRecovery}
                                    </p>
                                </div>
                            </div>
                        </ScrollScaleCard>
                    </div>
                </section>

                {/* ==================== 
                    5. FAQs
                ==================== */}
                <section className="py-12 px-6 bg-white border-t border-charcoal/5">
                    <div className="mb-8">
                    <span className="text-maroon/60 font-medium uppercase tracking-[0.2em] text-[10px] block mb-2">
                        Common Questions
                    </span>
                    <h2 className="text-2xl font-display text-charcoal">
                        FAQs
                    </h2>
                    </div>

                    <div className="space-y-3">
                    {faqs.map((faq, i) => (
                        <FaqItem key={i} question={faq.question} answer={faq.answer} />
                    ))}
                    </div>
                </section>

            {/* ==================== 
                6. TREATS CONDITIONS (Pills)
            ==================== */}
            {relatedConditions.length > 0 && (
                <section className="py-6 bg-[#FDFCFB] border-t border-charcoal/5 mb-6">
                <div className="px-6 text-center">
                    <span className="text-maroon/60 font-medium uppercase tracking-[0.2em] text-[10px] block mb-3">
                    Treats Conditions
                    </span>
                    <div className="flex flex-wrap justify-center gap-2">
                    {relatedConditions.map((condition) => (
                        <Link
                        key={condition.slug}
                        href={`/conditions/${condition.slug}`}
                        className="px-3 py-2 bg-white rounded-full text-xs font-medium text-charcoal/70 border border-charcoal/5 shadow-sm active:scale-95 transition-all"
                        >
                        {condition.name}
                        </Link>
                    ))}
                    </div>
                </div>
                </section>
            )}
      </div>
    </main>
  );
}

// Simple FAQ Accordion Component
function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`bg-white rounded-xl border transition-all duration-300 overflow-hidden ${isOpen ? 'border-maroon/20 shadow-sm' : 'border-charcoal/5'}`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left"
      >
        <span className={`text-sm font-medium ${isOpen ? 'text-maroon' : 'text-charcoal'} transition-colors`}>
          {question}
        </span>
        <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''} text-maroon/50`}>
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
               <p className="text-xs text-charcoal/60 leading-relaxed border-t border-charcoal/5 pt-3">
                 {answer}
               </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
