import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Footer from '@/components/sections/Footer';
import { conditions, getCondition, getTreatmentFamiliesForCondition } from '@/lib/navigationData';
import { getConditionContent } from '@/lib/content';
import { Reveal } from '@/components/ui/Reveal';
import BookingButton from '@/components/ui/BookingButton';
import { LuminousBackground } from '@/components/ui/LuminousBackground';

// ============================================
// PILLAR THEMES (Consistent with Menu)
// ============================================
type ThemeKey = 'Skin' | 'Hair' | 'Body' | 'Wellness' | 'Others';

const THEMES: Record<ThemeKey, {
  gradientFrom: string;
  gradientTo: string;
  textAccent: string;
  textLight: string;
  bgSoft: string;
}> = {
  'Skin': {
    gradientFrom: '#5C2E26',
    gradientTo: '#3A1A15',
    textAccent: '#C28E79',
    textLight: '#F2E8E6',
    bgSoft: '#FFF8F5',
  },
  'Hair': {
    gradientFrom: '#5C4D22',
    gradientTo: '#3D3316',
    textAccent: '#CDAA5C',
    textLight: '#F5F2EB',
    bgSoft: '#FCFBF7',
  },
  'Body': {
    gradientFrom: '#423D33',
    gradientTo: '#2B2822',
    textAccent: '#9E8C6B',
    textLight: '#F2F2EE',
    bgSoft: '#F9F9F6',
  },
  'Wellness': {
    gradientFrom: '#2A3B33',
    gradientTo: '#1B2621',
    textAccent: '#87A896',
    textLight: '#ECF2EE',
    bgSoft: '#F5F9F7',
  },
  'Others': {
    gradientFrom: '#2A3B33',
    gradientTo: '#1B2621',
    textAccent: '#87A896',
    textLight: '#ECF2EE',
    bgSoft: '#F5F9F7',
  }
};

export function generateStaticParams() {
  return conditions.map((condition) => ({
    slug: condition.slug,
  }));
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params;
  const condition = getCondition(slug);
  
  if (!condition) {
    return { title: 'Condition Not Found' };
  }
  
  return {
    title: `${condition.name} Treatment | ${condition.group} | Pragna Skin Clinic`,
    description: `${condition.subtitle}. Expert treatment for ${condition.name.toLowerCase()} by qualified dermatologists at Pragna Skin Clinic Hyderabad.`,
  };
}

export default async function ConditionPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const condition = getCondition(slug);
  
  if (!condition) {
    notFound();
  }

  const relatedFamilies = getTreatmentFamiliesForCondition(slug);
  const content = getConditionContent(slug);
  const theme = THEMES[condition.group as ThemeKey] || THEMES['Others'];

  // Fallback symptoms if no content
  const defaultSymptoms = [
    'Visible symptoms that affect your confidence',
    'The issue keeps returning despite trying products',
    'You notice it getting worse over time',
    'It impacts your daily life or social interactions',
    'You want to understand what is causing it',
    'DIY solutions haven\'t given lasting results',
  ];

  const symptoms = content?.symptoms?.list || defaultSymptoms;

  return (
    <main className="overflow-x-hidden bg-white">
      
      {/* ============================================
          1. HERO - Cinematic & Centered
          ============================================ */}
      <section className="relative min-h-[55vh] flex flex-col justify-center overflow-hidden pt-28 pb-16">
        {/* Abstract Gradient Background */}
        <LuminousBackground pillar={condition.group} variant="condition" />

        <div className="section-container relative z-10 text-center">
            <Reveal>
                <span className="inline-block text-[10px] md:text-xs font-medium uppercase tracking-[0.3em] mb-4 text-white/60 border border-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                    {condition.group} Concerns
                </span>
            </Reveal>

            <Reveal delay={0.1}>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-display leading-[0.95] mb-6 text-white">
                    {content?.hero?.title || condition.name}
                </h1>
            </Reveal>

            <Reveal delay={0.2}>
                <p className="text-lg md:text-xl font-light italic opacity-90 max-w-2xl mx-auto mb-6 text-white/80">
                    &ldquo;{content?.hero?.empathyStatement || condition.subtitle}&rdquo;
                </p>
            </Reveal>

            {content?.hero?.intro && (
                <Reveal delay={0.3}>
                    <p className="text-base md:text-lg opacity-80 max-w-xl mx-auto text-white/70">
                        {content.hero.intro}
                    </p>
                </Reveal>
            )}
        </div>
      </section>

      {/* ============================================
          2. DO YOU EXPERIENCE THIS? - Symptoms
          ============================================ */}
      <section className="py-10 md:py-12 bg-beige-warm">
        <div className="section-container">
            <Reveal>
                <div className="text-center mb-6">
                    <span className="text-maroon/70 font-medium uppercase tracking-[0.25em] text-[10px] md:text-xs mb-2 block">
                        Recognise This?
                    </span>
                    <h2 className="text-3xl md:text-4xl font-display text-charcoal mb-2">
                        Do you experience any of these?
                    </h2>
                    <p className="text-charcoal/60 text-sm md:text-base">
                        If you&apos;re nodding, you&apos;re in the right place.
                    </p>
                </div>
            </Reveal>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 max-w-5xl mx-auto auto-rows-fr">
                {symptoms.map((symptom, i) => (
                    <Reveal key={i} delay={i * 0.05} className="h-full">
                        <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-charcoal/5 hover:border-maroon/20 hover:shadow-sm transition-all duration-300 h-full">
                            <div className="w-8 h-8 rounded-full bg-maroon/10 flex items-center justify-center flex-shrink-0">
                                <span className="text-maroon text-sm font-bold">{i + 1}</span>
                            </div>
                            <p className="text-charcoal/80 text-base leading-relaxed">{symptom}</p>
                        </div>
                    </Reveal>
                ))}
            </div>
        </div>
      </section>

      {/* ============================================
          3. UNDERSTANDING - What It Is & Why It Happens
          ============================================ */}
      <section className="py-12 md:py-16 bg-white">
        <div className="section-container">
            <div className="max-w-4xl mx-auto">
                <Reveal>
                    <div className="text-center mb-8">
                        <span className="text-maroon/70 font-medium uppercase tracking-[0.25em] text-[10px] md:text-xs mb-3 block">
                            The Basics
                        </span>
                        <h2 className="text-3xl md:text-4xl font-display text-charcoal leading-tight">
                            Understanding <span className="text-maroon italic">the cause</span>
                        </h2>
                    </div>
                </Reveal>
                
                <div className="grid md:grid-cols-2 gap-6 auto-rows-fr">
                    <Reveal delay={0.1} className="h-full">
                        <div className="bg-beige-warm rounded-xl p-6 border border-charcoal/5 h-full">
                            <h3 className="text-lg font-display text-charcoal mb-3">What it is</h3>
                            <p className="text-charcoal/70 text-base leading-relaxed">
                                {content?.understanding?.whatItIs || 
                                    `A common condition that can affect confidence and comfort. Modern dermatology offers targeted protocols to manage and resolve it significantly.`}
                            </p>
                        </div>
                    </Reveal>
                    
                    <Reveal delay={0.2} className="h-full">
                        <div className="bg-beige-warm rounded-xl p-6 border border-charcoal/5 h-full">
                            <h3 className="text-lg font-display text-charcoal mb-3">Common Triggers</h3>
                            {content?.understanding?.whyItHappens ? (
                                <ul className="space-y-2 text-base text-charcoal/70">
                                    {content.understanding.whyItHappens.map((trigger, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <span className="w-2 h-2 rounded-full bg-maroon flex-shrink-0 mt-2" />
                                            <span>{trigger}</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <ul className="space-y-2 text-base text-charcoal/70">
                                    <li className="flex items-center gap-3">
                                        <span className="w-2 h-2 rounded-full bg-maroon flex-shrink-0" />
                                        Genetics & Hormonal Changes
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="w-2 h-2 rounded-full bg-maroon flex-shrink-0" />
                                        Environmental Stressors
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="w-2 h-2 rounded-full bg-maroon flex-shrink-0" />
                                        Lifestyle Factors
                                    </li>
                                </ul>
                            )}
                        </div>
                    </Reveal>
                </div>
            </div>
        </div>
      </section>

      {/* ============================================
          4. SOLUTIONS - Treatment Options
          ============================================ */}
      <section id="solutions" className="py-12 md:py-16 bg-beige-warm">
        <div className="section-container">
            <Reveal>
                <div className="text-center mb-8">
                    <span className="text-maroon/70 font-medium uppercase tracking-[0.25em] text-[10px] md:text-xs mb-3 block">
                        Clinical Solutions
                    </span>
                    <h2 className="text-3xl md:text-4xl font-display text-charcoal mb-4">
                        How we treat it
                    </h2>
                    <p className="text-charcoal/70 max-w-2xl mx-auto text-base leading-relaxed">
                        {content?.pragnaApproach?.description || 
                            'Our dermatologists customise a plan using one or a combination of these advanced treatments.'}
                    </p>
                </div>
            </Reveal>

            {/* Use recommended treatments from content if available, else fall back to related families */}
            {content?.recommendedTreatments && content.recommendedTreatments.length > 0 ? (
                <div className={`grid gap-5 max-w-4xl mx-auto ${content.recommendedTreatments.length <= 2 ? 'md:grid-cols-2 max-w-2xl' : 'md:grid-cols-2 lg:grid-cols-2'}`}>
                    {content.recommendedTreatments.map((treatment, index) => (
                        <Reveal key={treatment.slug} delay={index * 0.1} className="h-full">
                            <Link
                                href={treatment.type === 'family' ? `/treatments/${treatment.slug}` : `/treatments/${relatedFamilies[0]?.slug || 'acne-acne-scar-solutions'}/${treatment.slug}`}
                                className="group flex flex-col bg-white p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border border-charcoal/5 hover:border-maroon/20 h-full"
                            >
                                <span className="text-xs uppercase tracking-widest text-maroon/70 block mb-2 font-medium">
                                    {treatment.type === 'family' ? 'Treatment Family' : 'Specific Treatment'}
                                </span>
                                
                                <h3 className="text-lg font-display text-charcoal mb-2 group-hover:text-maroon transition-colors">
                                    {treatment.name}
                                </h3>
                                
                                <p className="text-charcoal/60 text-base mb-4 flex-grow">
                                    Best for: {treatment.bestFor}
                                </p>
                                
                                <div className="flex items-center text-sm uppercase tracking-widest font-medium text-maroon mt-auto">
                                    <span>Learn more</span>
                                    <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </div>
                            </Link>
                        </Reveal>
                    ))}
                </div>
            ) : relatedFamilies.length > 0 ? (
                <div className={`grid gap-5 max-w-3xl mx-auto ${relatedFamilies.length === 1 ? 'md:grid-cols-1 max-w-md' : 'md:grid-cols-2'}`}>
                    {relatedFamilies.map((family, index) => (
                        <Reveal key={family.slug} delay={index * 0.1} className="h-full">
                            <Link
                                href={`/treatments/${family.slug}`}
                                className="group flex flex-col bg-white p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border border-charcoal/5 hover:border-maroon/20 h-full"
                            >
                                <span className="text-xs uppercase tracking-widest text-maroon/70 block mb-2 font-medium">
                                    {family.pillar} Treatment
                                </span>
                                
                                <h3 className="text-lg font-display text-charcoal mb-2 group-hover:text-maroon transition-colors">
                                    {family.name}
                                </h3>
                                
                                <p className="text-charcoal/60 text-base mb-4 flex-grow">
                                    {family.summary}
                                </p>
                                
                                <div className="flex items-center text-sm uppercase tracking-widest font-medium text-maroon mt-auto">
                                    <span>Explore</span>
                                    <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </div>
                            </Link>
                        </Reveal>
                    ))}
                </div>
            ) : (
                <div className="text-center py-8 text-charcoal/50 text-base">
                    <p>Treatment details are being curated. Please contact us directly.</p>
                </div>
            )}
        </div>
      </section>

      {/* ============================================
          5. TIMELINE (if available)
          ============================================ */}
      {content?.timeline && content.timeline.steps.length > 0 && (
        <section className="py-12 md:py-16 bg-white">
          <div className="section-container">
            <Reveal>
              <div className="text-center mb-8">
                <span className="text-maroon/70 font-medium uppercase tracking-[0.25em] text-[10px] md:text-xs mb-3 block">
                  What to Expect
                </span>
                <h2 className="text-3xl md:text-4xl font-display text-charcoal">
                  Your treatment journey
                </h2>
              </div>
            </Reveal>

            <div className="max-w-3xl mx-auto">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-maroon/20 transform md:-translate-x-1/2" />
                
                {content.timeline.steps.map((step, i) => (
                  <Reveal key={i} delay={i * 0.1}>
                    <div className={`relative flex items-start gap-6 mb-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                      {/* Timeline dot */}
                      <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-maroon transform -translate-x-1/2 mt-2" />
                      
                      {/* Content */}
                      <div className={`ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                        <div className="bg-beige-warm rounded-xl p-5 border border-charcoal/5">
                          <h3 className="text-lg font-display text-maroon mb-2">{step.title}</h3>
                          <p className="text-charcoal/70 text-base leading-relaxed">{step.description}</p>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ============================================
          6. SELF-CARE TIPS (if available)
          ============================================ */}
      {content?.selfCareTips && content.selfCareTips.length > 0 && (
        <section className="py-12 md:py-16 bg-beige-warm">
          <div className="section-container">
            <div className="max-w-4xl mx-auto">
              <Reveal>
                <div className="text-center mb-8">
                  <span className="text-maroon/70 font-medium uppercase tracking-[0.25em] text-[10px] md:text-xs mb-3 block">
                    At Home
                  </span>
                  <h2 className="text-3xl md:text-4xl font-display text-charcoal">
                    Self-care tips
                  </h2>
                </div>
              </Reveal>

              <div className="grid md:grid-cols-2 gap-4">
                {content.selfCareTips.map((tip, i) => (
                  <Reveal key={i} delay={i * 0.05}>
                    <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-charcoal/5">
                      <div className="w-6 h-6 rounded-full bg-maroon/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-maroon" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-charcoal/80 text-base leading-relaxed">{tip}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ============================================
          7. FAQs (if available)
          ============================================ */}
      {content?.faqs && content.faqs.length > 0 && (
        <section className="py-12 md:py-16 bg-white">
          <div className="section-container">
            <div className="max-w-3xl mx-auto">
              <Reveal>
                <div className="text-center mb-8">
                  <span className="text-maroon/70 font-medium uppercase tracking-[0.25em] text-[10px] md:text-xs mb-3 block">
                    Common Questions
                  </span>
                  <h2 className="text-3xl md:text-4xl font-display text-charcoal">
                    FAQs
                  </h2>
                </div>
              </Reveal>

              <div className="space-y-4">
                {content.faqs.map((faq, i) => (
                  <Reveal key={i} delay={i * 0.05}>
                    <details className="group bg-beige-warm rounded-xl border border-charcoal/5 overflow-hidden">
                      <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                        <h3 className="text-base md:text-lg font-display text-charcoal pr-4">{faq.question}</h3>
                        <svg className="w-5 h-5 text-maroon transform group-open:rotate-180 transition-transform flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                        </svg>
                      </summary>
                      <div className="px-5 pb-5 pt-0">
                        <p className="text-charcoal/70 text-base leading-relaxed">{faq.answer}</p>
                      </div>
                    </details>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ============================================
          8. CTA - Center Aligned
          ============================================ */}
      <section className="py-12 md:py-16 bg-maroon relative overflow-hidden">
         <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay" />
         
         <div className="section-container relative z-10 text-center">
            <h2 className="text-3xl md:text-4xl font-display text-white mb-3">
                Ready to take control?
            </h2>
            <p className="text-white/80 text-base mb-6 max-w-md mx-auto">
                Our dermatologists are here to guide you back to confidence.
            </p>
            
            <div className="flex flex-col items-center justify-center gap-3">
                <BookingButton 
                    className="px-10 py-4 rounded-full font-medium text-sm transition-all duration-300 hover:scale-105 bg-white text-maroon shadow-lg shadow-black/10 min-w-[200px]"
                    programName={condition.name}
                >
                    Book Consultation
                </BookingButton>
                
                {/* Clinic Numbers */}
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-white/90 font-light">
                    <div className="flex flex-col items-center sm:items-end">
                        <span className="text-[10px] uppercase tracking-widest opacity-60 mb-1">Punjagutta</span>
                        <a href="tel:09848367000" className="hover:text-white transition-colors flex items-center gap-2">
                            <svg className="w-4 h-4 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            098483 67000
                        </a>
                    </div>
                    <div className="hidden sm:block w-px h-8 bg-white/20"></div>
                    <div className="flex flex-col items-center sm:items-start">
                        <span className="text-[10px] uppercase tracking-widest opacity-60 mb-1">Kokapet</span>
                        <a href="tel:08886421111" className="hover:text-white transition-colors flex items-center gap-2">
                            <svg className="w-4 h-4 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            088864 21111
                        </a>
                    </div>
                </div>
            </div>
         </div>
      </section>

      {/* Back Link - Center Aligned */}
      <div className="bg-beige-warm py-6 border-t border-charcoal/5">
        <div className="section-container text-center">
            <Link href="/conditions" className="inline-flex items-center gap-2 text-sm text-maroon hover:text-charcoal transition-colors font-medium">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to all conditions
            </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
