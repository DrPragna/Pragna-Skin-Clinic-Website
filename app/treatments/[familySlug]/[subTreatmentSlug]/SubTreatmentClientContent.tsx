'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { SubTreatment, TreatmentFamily, Condition, SubTreatmentContent } from '@/lib/navigationData';

// In-page navigation sections
const navSections = [
  { id: 'overview', label: 'Overview' },
  { id: 'process', label: 'Process' },
  { id: 'results', label: 'Results' },
  { id: 'faq', label: 'FAQ' },
];

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
  const [showStickyNav, setShowStickyNav] = useState(false);

  // Handle scroll for sticky nav
  useEffect(() => {
    const handleScroll = () => {
      setShowStickyNav(window.scrollY > 500);
      
      // Update active section based on scroll position
      const sections = navSections.map(s => document.getElementById(s.id));
      const scrollPos = window.scrollY + 200;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPos) {
          setActiveSection(navSections[i].id);
          break;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Content with fallbacks
  const heroTitle = content?.hero.title || subTreatment.name;
  const heroTagline = content?.hero.tagline || 'Professional care for lasting results';
  const heroIntro = content?.hero.intro || `${subTreatment.description}. Our dermatologists use advanced technology and personalised protocols to deliver safe, effective outcomes.`;
  
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
          STICKY IN-PAGE NAV (appears on scroll)
          ============================================ */}
      <div className={`
        fixed top-20 left-0 right-0 z-40 bg-beige-warm/95 backdrop-blur-md border-b border-charcoal/5
        transition-all duration-300
        ${showStickyNav ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}
      `}>
        <div className="section-container">
          <div className="flex items-center justify-between py-3">
            {/* Treatment name */}
            <span className="text-sm font-medium text-charcoal truncate mr-4">
              {heroTitle}
            </span>
            
            {/* Nav links */}
            <div className="flex items-center gap-1">
              {navSections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className={`
                    px-3 py-1.5 text-xs font-medium rounded-full transition-colors
                    ${activeSection === section.id 
                      ? 'bg-charcoal text-beige-warm' 
                      : 'text-charcoal/50 hover:text-charcoal'
                    }
                  `}
                >
                  {section.label}
                </a>
              ))}
              <a
                href="#book"
                className="ml-2 px-4 py-1.5 text-xs font-medium bg-maroon text-beige-warm rounded-full hover:bg-maroon/90 transition-colors"
              >
                Book
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* ============================================
          HERO - Split Layout with Sticky Quick Facts
          ============================================ */}
      <section className="pt-28 pb-12 md:pt-36 md:pb-16 relative">
        {/* Decorative gradient blob */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-radial from-terracotta/8 to-transparent rounded-full blur-3xl -translate-y-1/3 translate-x-1/4 pointer-events-none" />
        
        <div className="section-container relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm mb-10 flex-wrap opacity-0 animate-fade-in" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
            <Link href="/treatments" className="text-charcoal/40 hover:text-maroon transition-colors">
              Treatments
            </Link>
            <span className="text-charcoal/20">/</span>
            <Link href={`/treatments/${family.slug}`} className="text-charcoal/40 hover:text-maroon transition-colors">
              {family.name}
            </Link>
            <span className="text-charcoal/20">/</span>
            <span className="text-maroon">{heroTitle}</span>
          </nav>
          
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Left: Content (3 cols) */}
            <div className="lg:col-span-3">
              {/* Tiny label */}
              <span className="text-maroon/60 font-medium uppercase tracking-[0.3em] text-[10px] mb-4 block opacity-0 animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
                Treatment
              </span>
              
              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-charcoal leading-[1.05] mb-4 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
                {heroTitle}
              </h1>
              
              {/* Tagline */}
              <p className="text-xl md:text-2xl text-maroon/60 font-light italic mb-6 opacity-0 animate-fade-in" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
                {heroTagline}
              </p>
              
              {/* Intro */}
              <p className="text-lg text-charcoal/60 leading-relaxed mb-8 max-w-xl opacity-0 animate-fade-in" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
                {heroIntro}
              </p>
              
              {/* Primary CTA */}
              <div className="opacity-0 animate-fade-in" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
                <a 
                  href="#book" 
                  className="inline-flex items-center gap-3 bg-charcoal text-beige-warm px-8 py-4 rounded-full font-medium hover:bg-maroon transition-colors duration-300"
                >
                  Book This Treatment
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Right: Quick Facts Card (2 cols) - Sticky on desktop */}
            <div className="lg:col-span-2 opacity-0 animate-fade-in" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
              <div className="lg:sticky lg:top-32">
                <div className="bg-white rounded-[2rem] p-8 border border-charcoal/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="font-display text-xl text-charcoal">
                      Quick Facts
                    </h3>
                    <div className="h-px flex-1 bg-charcoal/5 mx-4" />
                    <span className="w-1.5 h-1.5 rounded-full bg-maroon/40" />
                  </div>
                  
                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 gap-8">
                    {/* Sessions */}
                    <div className="flex items-center gap-5 group">
                      <div className="w-12 h-12 rounded-2xl bg-beige-warm/50 flex items-center justify-center text-maroon group-hover:bg-maroon group-hover:text-beige-warm transition-colors duration-500">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-[10px] font-medium uppercase tracking-widest text-charcoal/40 mb-1">Treatment Plan</p>
                        <p className="text-charcoal font-medium text-lg">{quickStats.sessions}</p>
                      </div>
                    </div>

                    {/* Duration */}
                    <div className="flex items-center gap-5 group">
                      <div className="w-12 h-12 rounded-2xl bg-beige-warm/50 flex items-center justify-center text-maroon group-hover:bg-maroon group-hover:text-beige-warm transition-colors duration-500">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-[10px] font-medium uppercase tracking-widest text-charcoal/40 mb-1">Duration</p>
                        <p className="text-charcoal font-medium text-lg">{quickStats.duration}</p>
                      </div>
                    </div>

                    {/* Downtime */}
                    <div className="flex items-center gap-5 group">
                      <div className="w-12 h-12 rounded-2xl bg-beige-warm/50 flex items-center justify-center text-maroon group-hover:bg-maroon group-hover:text-beige-warm transition-colors duration-500">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-[10px] font-medium uppercase tracking-widest text-charcoal/40 mb-1">Downtime</p>
                        <p className="text-charcoal font-medium text-lg">{quickStats.downtime}</p>
                      </div>
                    </div>

                    {/* Comfort */}
                    <div className="flex items-center gap-5 group">
                      <div className="w-12 h-12 rounded-2xl bg-beige-warm/50 flex items-center justify-center text-maroon group-hover:bg-maroon group-hover:text-beige-warm transition-colors duration-500">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-[10px] font-medium uppercase tracking-widest text-charcoal/40 mb-1">Comfort</p>
                        <p className="text-charcoal font-medium text-lg">{quickStats.painLevel}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* CTA */}
                  <div className="mt-10">
                    <a 
                      href="tel:+919876543210" 
                      className="flex items-center justify-between w-full px-6 py-5 bg-charcoal text-white rounded-xl hover:bg-maroon transition-colors duration-300 group"
                    >
                      <span className="font-medium tracking-wide">Book Consultation</span>
                      <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          WHAT TO EXPECT - Overview
          ============================================ */}
      <section id="overview" className="py-14 md:py-20 bg-white relative overflow-hidden">
        {/* Decorative pattern */}
        <div className="absolute top-0 right-0 w-96 h-96 opacity-[0.02]">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-maroon" />
            <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-maroon" />
            <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-maroon" />
          </svg>
        </div>
        
        <div className="section-container relative z-10">
          <div className="max-w-3xl">
            <span className="text-maroon/60 font-medium uppercase tracking-[0.3em] text-[10px] mb-4 block">
              What to Expect
            </span>
            <h2 className="text-3xl md:text-4xl font-display text-charcoal mb-6">
              Overview
            </h2>
            <p className="text-lg text-charcoal/60 leading-relaxed mb-8">
              {overview}
            </p>
            
            {/* Is This For You - Checklist */}
            <div className="bg-beige-warm/50 rounded-2xl p-8 border border-charcoal/5">
              <h3 className="text-lg font-display text-charcoal mb-4">
                Is this right for you?
              </h3>
              <p className="text-charcoal/50 text-sm mb-6">
                This treatment is ideal if:
              </p>
              <ul className="space-y-3">
                {isThisForYou.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-maroon/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-2.5 h-2.5 text-maroon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-charcoal/70 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              
              {/* Micro CTA */}
              <p className="text-sm text-charcoal/40 mt-6">
                Not sure? <a href="#book" className="text-maroon hover:underline">Book a consultation</a> to discuss your needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          THE PROCESS - Timeline
          ============================================ */}
      <section id="process" className="py-14 md:py-20 bg-beige-warm relative overflow-hidden">
        {/* Artistic accent */}
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-radial from-maroon/5 to-transparent rounded-full blur-3xl -translate-x-1/2 translate-y-1/2 pointer-events-none" />
        
        <div className="section-container relative z-10">
          <div className="text-center mb-10">
            <span className="text-maroon/60 font-medium uppercase tracking-[0.3em] text-[10px] mb-4 block">
              The Process
            </span>
            <h2 className="text-3xl md:text-4xl font-display text-charcoal">
              What happens in a session
            </h2>
          </div>
          
          {/* Timeline */}
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-maroon/40 via-maroon/20 to-transparent" />
              
              {/* Timeline items */}
              <div className="space-y-12">
                {processSteps.map((item, i) => (
                  <div key={i} className="relative flex gap-6 md:gap-8">
                    {/* Node */}
                    <div className="relative z-10 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white border-2 border-maroon flex items-center justify-center flex-shrink-0 shadow-soft">
                      <span className="text-xs md:text-sm font-mono text-maroon uppercase">
                        {item.phase}
                      </span>
                    </div>
                    
                    {/* Content */}
                    <div className="pt-2 md:pt-4">
                      <h3 className="text-xl md:text-2xl font-display text-charcoal mb-2">
                        {item.title}
                      </h3>
                      <p className="text-charcoal/60 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          RESULTS & RECOVERY
          ============================================ */}
      <section id="results" className="py-14 md:py-20 bg-white">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Image placeholder with artistic treatment */}
            <div className="relative">
              <div className="aspect-[4/3] bg-gradient-to-br from-terracotta/10 via-white to-maroon/5 rounded-[2rem] relative overflow-hidden group">
                {content?.results.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img 
                    src={content.results.image}
                    alt="Expected Results"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <>
                    {/* Decorative circles */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-24 h-24 border border-maroon/10 rounded-full animate-pulse" />
                      <div className="absolute w-40 h-40 border border-terracotta/10 rounded-full" />
                      <div className="absolute w-56 h-56 border border-maroon/5 rounded-full" />
                    </div>
                    {/* Gradient overlay for depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <p className="text-maroon/30 text-sm italic">
                        Need: Aspirational result image for {heroTitle}
                      </p>
                    </div>
                  </>
                )}
              </div>
              {/* Floating accent */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-terracotta/20 rounded-full blur-2xl" />
            </div>
            
            {/* Right: Content */}
            <div>
              <span className="text-maroon/60 font-medium uppercase tracking-[0.3em] text-[10px] mb-4 block">
                Outcomes
              </span>
              <h2 className="text-3xl md:text-4xl font-display text-charcoal mb-6">
                Results & Recovery
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-display text-charcoal mb-2">When will I see results?</h3>
                  <p className="text-charcoal/60 leading-relaxed">
                    {resultsTimeline}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-display text-charcoal mb-2">Recovery & downtime</h3>
                  <p className="text-charcoal/60 leading-relaxed">
                    {resultsRecovery}
                  </p>
                </div>
              </div>
              
              {/* Aftercare tip */}
              <div className="mt-8 bg-terracotta/10 rounded-2xl p-6 border border-terracotta/20">
                <h4 className="font-medium text-maroon mb-2">Aftercare Tip</h4>
                <p className="text-charcoal/60 text-sm">
                  Protect treated skin from sun exposure and follow your dermatologist&apos;s 
                  specific instructions for best results.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          FAQ - Objection Handler
          ============================================ */}
      <section id="faq" className="py-14 md:py-20 bg-charcoal text-beige-warm relative overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />
        </div>
        
        {/* Decorative accent */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-radial from-maroon/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        
        <div className="section-container relative z-10">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <span className="text-terracotta-light font-medium uppercase tracking-[0.3em] text-[10px] mb-4 block">
                Common Questions
              </span>
              <h2 className="text-3xl md:text-4xl font-display">
                Frequently Asked Questions
              </h2>
            </div>
            
            {/* FAQ Accordion */}
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details 
                  key={i} 
                  className="group bg-beige-warm/5 rounded-xl overflow-hidden border border-beige-warm/10 hover:border-beige-warm/20 transition-colors"
                >
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                    <span className="font-medium pr-8">{faq.question}</span>
                    <div className="w-8 h-8 rounded-full bg-beige-warm/10 flex items-center justify-center flex-shrink-0 group-open:bg-terracotta-light group-open:text-charcoal transition-colors">
                      <svg className="w-4 h-4 transform group-open:rotate-180 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </summary>
                  <div className="px-6 pb-6 text-beige-warm/70 leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          SIBLING TREATMENTS
          ============================================ */}
      {siblingTreatments.length > 0 && (
        <section className="py-12 bg-beige-warm border-t border-charcoal/5">
          <div className="section-container">
            <p className="text-[10px] uppercase tracking-[0.3em] text-charcoal/40 mb-6">
              Other {family.name} Options
            </p>
            <div className="flex flex-wrap gap-3">
              {siblingTreatments.slice(0, 5).map((treatment) => (
                <Link
                  key={treatment.slug}
                  href={`/treatments/${family.slug}/${treatment.slug}`}
                  className="text-sm text-charcoal/60 hover:text-maroon bg-white px-4 py-2 rounded-full border border-charcoal/5 hover:border-maroon/20 transition-colors"
                >
                  {treatment.name}
                </Link>
              ))}
              {siblingTreatments.length > 5 && (
                <Link
                  href={`/treatments/${family.slug}`}
                  className="text-sm text-maroon px-4 py-2"
                >
                  +{siblingTreatments.length - 5} more
                </Link>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ============================================
          FINAL CTA - Book
          ============================================ */}
      <section id="book" className="py-14 md:py-20 bg-maroon text-beige-warm relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-beige-warm/5 rounded-full pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-beige-warm/5 rounded-full pointer-events-none" />
        
        <div className="section-container relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display mb-6">
              Ready for {heroTitle}?
            </h2>
            <p className="text-lg text-beige-warm/70 mb-10">
              Book a consultation and let our dermatologists create your personalised treatment plan.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="#contact" 
                className="inline-flex items-center gap-2 bg-beige-warm text-maroon px-8 py-4 rounded-full font-medium hover:bg-white transition-colors"
              >
                Book Consultation
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a 
                href="tel:+919876543210" 
                className="inline-flex items-center gap-2 text-beige-warm/70 hover:text-beige-warm font-medium transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Related Conditions */}
      {relatedConditions.length > 0 && (
        <section className="py-8 bg-beige-warm border-t border-charcoal/5">
          <div className="section-container">
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <Link 
                href={`/treatments/${family.slug}`}
                className="text-maroon hover:text-maroon/70 transition-colors"
              >
                ← Back to {family.name}
              </Link>
              <span className="text-charcoal/20">|</span>
              <span className="text-charcoal/40">Related conditions:</span>
              {relatedConditions.map((condition) => (
                <Link
                  key={condition.slug}
                  href={`/conditions/${condition.slug}`}
                  className="text-charcoal/60 hover:text-maroon transition-colors"
                >
                  {condition.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
