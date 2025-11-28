'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SubTreatment, TreatmentFamily, Condition, SubTreatmentContent } from '@/lib/navigationData';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/ui/Reveal';

interface SubTreatmentClientContentProps {
  subTreatment: SubTreatment;
  family: TreatmentFamily;
  relatedConditions: Condition[];
  siblingTreatments: SubTreatment[];
  content: SubTreatmentContent | null;
}

export default function SubTreatmentClientContent({
  subTreatment,
  family,
  relatedConditions,
  siblingTreatments,
  content,
}: SubTreatmentClientContentProps) {
  const [activeSection, setActiveSection] = useState('overview');

  // Helper for Abstract Gradient Fallback
  const getGradientClass = (pillar: string) => {
    switch (pillar) {
        case 'Skin': return 'from-rose-100/30 via-amber-50/20 to-rose-50/10';
        case 'Hair': return 'from-stone-200/30 via-stone-100/20 to-stone-50/10';
        case 'Body': return 'from-orange-100/30 via-stone-100/20 to-orange-50/10';
        default: return 'from-gray-200/30 via-gray-100/20 to-white/10';
    }
  };

  // Content with fallbacks
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
    <>
      {/* ============================================
          HERO - Cinematic Left-Aligned
          ============================================ */}
      <section className="relative min-h-[85vh] flex flex-col justify-end bg-charcoal overflow-hidden">
        {/* Background Layer */}
        <div className="absolute inset-0 z-0">
            {heroImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img 
                    src={heroImage}
                    alt={heroTitle}
                    className="w-full h-full object-cover opacity-40"
                />
            ) : (
                <div className={`w-full h-full bg-gradient-to-br ${getGradientClass(family.pillar)} opacity-30`}>
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mix-blend-overlay" />
                </div>
            )}
            
            <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent" />
        </div>

        <div className="section-container relative z-10 flex-grow flex flex-col justify-center pt-28 pb-12">
            <Reveal>
                <div className="max-w-3xl">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-3 text-xs tracking-widest uppercase text-white/40 mb-6">
                        <Link href="/treatments" className="hover:text-white transition-colors duration-300">Treatments</Link>
                        <span>/</span>
                        <Link href={`/treatments/${family.slug}`} className="hover:text-white transition-colors duration-300">{family.name}</Link>
                        <span>/</span>
                        <span className="text-white/70">{heroTitle}</span>
                    </div>

                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-display text-white leading-[1.1] mb-5">
                        {heroTitle}
                    </h1>
                    <p className="text-xl md:text-2xl text-white/80 font-light italic mb-6 max-w-2xl">
                        {heroTagline}
                    </p>
                    <p className="text-base text-white/60 leading-relaxed mb-10 max-w-xl border-l-2 border-maroon/50 pl-5">
                        {heroIntro}
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <a 
                            href="#book" 
                            className="px-8 py-4 bg-white text-charcoal rounded-full font-medium hover:bg-beige-warm hover:scale-[1.02] transition-all duration-300 min-w-[180px] text-center"
                        >
                            Book Appointment
                        </a>
                        <a 
                            href="#overview" 
                            className="px-8 py-4 border border-white/20 text-white rounded-full font-medium hover:bg-white/10 transition-all duration-300 min-w-[180px] text-center backdrop-blur-sm"
                        >
                            Learn More
                        </a>
                    </div>
                </div>
            </Reveal>
        </div>

        {/* Glass Stats Strip */}
        <div className="relative z-10 border-t border-white/10 bg-white/5 backdrop-blur-md">
            <div className="section-container">
                <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
                    {[
                        { label: 'Sessions', value: quickStats.sessions },
                        { label: 'Duration', value: quickStats.duration },
                        { label: 'Downtime', value: quickStats.downtime },
                        { label: 'Comfort', value: quickStats.painLevel },
                    ].map((stat, i) => (
                        <Reveal key={i} delay={0.1 * i} className="py-5 px-4 md:px-6">
                            <span className="block text-[10px] uppercase tracking-widest text-white/40 mb-1">{stat.label}</span>
                            <span className="block text-base text-white font-display">{stat.value}</span>
                        </Reveal>
                    ))}
                </div>
            </div>
        </div>
      </section>

      {/* ============================================
          OVERVIEW
          ============================================ */}
      <section id="overview" className="py-16 bg-[#FDFCFB]">
        <div className="section-container">
            <Reveal>
                <div className="max-w-4xl mx-auto text-center">
                    <span className="text-maroon/60 font-medium uppercase tracking-[0.25em] text-[10px] mb-4 block">
                        The Treatment
                    </span>
                    <h2 className="text-3xl md:text-4xl font-display text-charcoal mb-6">
                        Overview
                    </h2>
                    <p className="text-charcoal/75 leading-relaxed mx-auto max-w-2xl text-lg mb-12">
                        {overview}
                    </p>

                    {/* Checklist Card */}
                    <div className="bg-beige-warm border border-charcoal/5 rounded-[2rem] p-8 md:p-10 text-left">
                        <h3 className="text-xl font-display text-charcoal mb-6 text-center">
                            Ideal Candidate Profile
                        </h3>
                        <div className="grid md:grid-cols-2 gap-x-10 gap-y-4">
                            {isThisForYou.map((item, i) => (
                                <div key={i} className="flex items-start gap-3 group">
                                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-maroon/10 flex items-center justify-center mt-0.5 text-maroon group-hover:bg-maroon group-hover:text-white transition-all duration-300">
                                        <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </span>
                                    <span className="text-charcoal/75 text-base">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Reveal>
        </div>
      </section>

      {/* ============================================
          THE PROCESS
          ============================================ */}
      <section id="process" className="py-16 bg-beige-warm border-t border-charcoal/5">
        <div className="section-container">
          <Reveal>
            <div className="text-center mb-12">
                <span className="text-maroon/60 font-medium uppercase tracking-[0.25em] text-[10px] mb-4 block">
                    The Journey
                </span>
                <h2 className="text-3xl md:text-4xl font-display text-charcoal">
                    Procedure Timeline
                </h2>
            </div>
          </Reveal>
          
          <StaggerContainer className="grid md:grid-cols-3 gap-6 relative">
             <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-charcoal/10 to-transparent" />

            {processSteps.map((item, i) => (
              <StaggerItem key={i} className="relative group">
                <div className="w-20 h-20 mx-auto bg-white border border-charcoal/10 rounded-full flex items-center justify-center mb-6 relative z-10 group-hover:border-maroon/30 group-hover:shadow-lg transition-all duration-400">
                    <span className="text-sm font-mono text-charcoal/40 group-hover:text-maroon transition-colors duration-300">0{i + 1}</span>
                </div>
                
                <div className="text-center px-2">
                    <span className="text-xs font-semibold uppercase tracking-widest text-maroon/70 mb-2 block">
                        {item.phase}
                    </span>
                    <h3 className="text-lg font-display text-charcoal mb-3">
                        {item.title}
                    </h3>
                    <p className="text-charcoal/70 text-sm leading-relaxed">
                        {item.description}
                    </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ============================================
          RESULTS & RECOVERY
          ============================================ */}
      <section id="results" className="py-16 bg-white border-t border-charcoal/5">
        <div className="section-container">
            <Reveal>
                <div className="text-center mb-12">
                    <span className="text-maroon/60 font-medium uppercase tracking-[0.25em] text-[10px] mb-4 block">
                        Aftercare
                    </span>
                    <h2 className="text-3xl md:text-4xl font-display text-charcoal">
                        Results & Recovery
                    </h2>
                </div>
            </Reveal>

            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10 relative">
                 <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-px bg-maroon/10" />

                <Reveal delay={0.1} className="text-center md:text-right pr-4 md:pr-12">
                    <div className="inline-block mb-4">
                        <span className="block text-3xl font-display text-maroon/20 mb-1">01</span>
                        <h3 className="text-xl font-display text-charcoal">Timeline</h3>
                    </div>
                    <p className="text-charcoal/70 leading-relaxed text-base">
                        {resultsTimeline}
                    </p>
                </Reveal>

                 <Reveal delay={0.2} className="text-center md:text-left pl-4 md:pl-12">
                    <div className="inline-block mb-4">
                        <span className="block text-3xl font-display text-maroon/20 mb-1">02</span>
                        <h3 className="text-xl font-display text-charcoal">Recovery</h3>
                    </div>
                    <p className="text-charcoal/70 leading-relaxed text-base">
                        {resultsRecovery}
                    </p>
                </Reveal>
            </div>
        </div>
      </section>

      {/* ============================================
          FAQ
          ============================================ */}
      <section id="faq" className="py-16 bg-beige-warm">
        <div className="section-container">
            <Reveal>
                <div className="text-center mb-12">
                    <span className="text-maroon/60 font-medium uppercase tracking-[0.25em] text-[10px] mb-4 block">
                        Common Questions
                    </span>
                    <h2 className="text-3xl md:text-4xl font-display text-charcoal">
                        Expert Answers
                    </h2>
                </div>
            </Reveal>
            
            <StaggerContainer className="grid md:grid-cols-2 gap-5 items-start max-w-5xl mx-auto">
              {faqs.map((faq, i) => (
                <StaggerItem 
                  key={i} 
                  className="bg-white rounded-2xl p-7 border border-charcoal/5 hover:border-maroon/20 hover:shadow-md transition-all duration-300"
                >
                  <h3 className="text-lg font-display text-maroon mb-3 leading-snug">
                    {faq.question}
                  </h3>
                  <p className="text-charcoal/70 text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </StaggerItem>
              ))}
            </StaggerContainer>
        </div>
      </section>

      {/* ============================================
          FINAL CTA
          ============================================ */}
      <section id="book" className="py-16 bg-maroon text-white relative overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-br from-maroon via-[#4A0404] to-maroon opacity-90" />
         
        <div className="section-container relative z-10">
          <Reveal>
            <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-4xl md:text-5xl font-display mb-6">
                    Ready to start?
                </h2>
                <p className="text-lg text-white/80 mb-10 font-light">
                    Book a consultation with our dermatologists to discuss if {heroTitle} is right for you.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a 
                        href="#contact" 
                        className="px-10 py-4 bg-white text-maroon rounded-full font-medium hover:bg-beige-warm hover:scale-[1.02] transition-all duration-300 min-w-[200px]"
                    >
                        Book Consultation
                    </a>
                    <a 
                        href="tel:+919876543210" 
                        className="px-10 py-4 border border-white/20 text-white rounded-full font-medium hover:bg-white/10 transition-all duration-300 min-w-[200px]"
                    >
                        Call Clinic
                    </a>
                </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Related Conditions */}
      {relatedConditions.length > 0 && (
        <section className="py-10 bg-white border-t border-charcoal/5">
          <div className="section-container text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-maroon mb-5 block flex items-center justify-center gap-3">
                <span className="w-6 h-px bg-maroon/30" />
                Treats Conditions
                <span className="w-6 h-px bg-maroon/30" />
            </span>
            <StaggerContainer className="flex flex-wrap items-center justify-center gap-3">
              {relatedConditions.map((condition) => (
                <StaggerItem key={condition.slug}>
                    <Link
                        href={`/conditions/${condition.slug}`}
                        className="group flex items-center gap-2 pl-4 pr-3 py-2 rounded-full border border-charcoal/10 hover:border-maroon/30 hover:bg-maroon/5 transition-all duration-300"
                    >
                        <span className="text-sm text-charcoal/70 group-hover:text-maroon transition-colors">
                            {condition.name}
                        </span>
                        <span className="w-5 h-5 rounded-full bg-charcoal/5 group-hover:bg-maroon/10 flex items-center justify-center text-charcoal/40 group-hover:text-maroon transition-colors">
                            <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </span>
                    </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}
    </>
  );
}
