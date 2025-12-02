import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/sections/Footer';
import { conditions, getCondition, getTreatmentFamiliesForCondition } from '@/lib/navigationData';
import { Reveal } from '@/components/ui/Reveal';

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
    gradientFrom: '#4A3B2A',
    gradientTo: '#2C241B',
    textAccent: '#BFA57D',
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
  const theme = THEMES[condition.group as ThemeKey] || THEMES['Others'];

  return (
    <main className="overflow-x-hidden bg-white">
      <Navbar />
      
      {/* ============================================
          1. HERO - Cinematic & Centered
          ============================================ */}
      <section className="relative min-h-[55vh] flex flex-col justify-center overflow-hidden pt-28 pb-16">
        {/* Abstract Gradient Background */}
        <div 
            className="absolute inset-0"
            style={{
                background: `linear-gradient(145deg, ${theme.gradientFrom}, ${theme.gradientTo})`
            }}
        >
            {/* Noise Texture - Subtle */}
            <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay" 
                 style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
            />
        </div>

        <div className="section-container relative z-10 text-center">
            <Reveal>
                <span className="inline-block text-[10px] md:text-xs font-medium uppercase tracking-[0.3em] mb-4" style={{ color: theme.textAccent }}>
                    {condition.group} Concerns
                </span>
            </Reveal>

            <Reveal delay={0.1}>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-display leading-[0.95] mb-6" style={{ color: theme.textLight }}>
                    {condition.name}
                </h1>
            </Reveal>

            <Reveal delay={0.2}>
                <p className="text-lg md:text-xl font-light italic opacity-90 max-w-2xl mx-auto" style={{ color: theme.textLight }}>
                    &ldquo;{condition.subtitle}&rdquo;
                </p>
            </Reveal>
        </div>
      </section>

      {/* ============================================
          2. DO YOU EXPERIENCE THIS? - Validation First
          ============================================ */}
      <section className="py-16 md:py-20 bg-beige-warm">
        <div className="section-container">
            <Reveal>
                <div className="text-center mb-10">
                    <span className="text-maroon font-bold uppercase tracking-[0.25em] text-xs mb-3 block">
                        Recognise This?
                    </span>
                    <h2 className="text-3xl md:text-4xl font-display text-charcoal mb-3">
                        Do you experience any of these?
                    </h2>
                    <p className="text-charcoal/60 text-base">
                        If you&apos;re nodding, you&apos;re in the right place.
                    </p>
                </div>
            </Reveal>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
                {[
                    'Visible symptoms that affect your confidence',
                    'The issue keeps returning despite trying products',
                    'You notice it getting worse over time',
                    'It impacts your daily life or social interactions',
                    'You want to understand what is causing it',
                    'DIY solutions haven\'t given lasting results',
                ].map((symptom, i) => (
                    <Reveal key={i} delay={i * 0.05}>
                        <div className="flex items-start gap-4 p-5 bg-white rounded-xl border border-charcoal/5 hover:border-maroon/20 hover:shadow-sm transition-all duration-300">
                            <div className="w-8 h-8 rounded-full bg-maroon/10 flex items-center justify-center flex-shrink-0">
                                <span className="text-maroon text-sm font-bold">{i + 1}</span>
                            </div>
                            <p className="text-charcoal/80 text-base leading-relaxed pt-1">{symptom}</p>
                        </div>
                    </Reveal>
                ))}
            </div>
        </div>
      </section>

      {/* ============================================
          3. UNDERSTANDING - Center Aligned
          ============================================ */}
      <section className="py-16 md:py-20 bg-white">
        <div className="section-container">
            <div className="max-w-4xl mx-auto text-center">
                <Reveal>
                    <span className="text-maroon font-bold uppercase tracking-[0.25em] text-xs mb-3 block">
                        The Basics
                    </span>
                    <h2 className="text-3xl md:text-4xl font-display text-charcoal leading-tight mb-6">
                        Understanding <span className="text-maroon italic">the cause</span>
                    </h2>
                </Reveal>
                
                <Reveal delay={0.1}>
                    <p className="text-lg md:text-xl text-charcoal/90 leading-relaxed mb-10 max-w-2xl mx-auto">
                        {condition.name} isn&apos;t just about surface-level symptoms. It&apos;s often a complex interplay of internal and external factors. Understanding why it happens is the first step to treating it effectively.
                    </p>
                    
                    <div className="grid sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
                        <div className="bg-beige-warm rounded-xl p-6 border border-charcoal/5 text-left">
                            <h3 className="text-base font-display text-charcoal mb-3 font-medium">What it is</h3>
                            <p className="text-charcoal/70 text-base leading-relaxed">
                                A common condition that can affect confidence and comfort. Modern dermatology offers targeted protocols to manage and resolve it significantly.
                            </p>
                        </div>
                        <div className="bg-beige-warm rounded-xl p-6 border border-charcoal/5 text-left">
                            <h3 className="text-base font-display text-charcoal mb-3 font-medium">Common Triggers</h3>
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
                        </div>
                    </div>
                </Reveal>
            </div>
        </div>
      </section>

      {/* ============================================
          4. SOLUTIONS - Centered Cards
          ============================================ */}
      <section id="solutions" className="py-16 md:py-20 bg-beige-warm">
        <div className="section-container">
            <Reveal>
                <div className="text-center mb-12">
                    <span className="text-maroon font-bold uppercase tracking-[0.25em] text-xs mb-3 block">
                        Clinical Solutions
                    </span>
                    <h2 className="text-3xl md:text-4xl font-display text-charcoal mb-4">
                        How we treat it
                    </h2>
                    <p className="text-charcoal/60 max-w-lg mx-auto text-base">
                        Our dermatologists customise a plan using one or a combination of these advanced treatments.
                    </p>
                </div>
            </Reveal>

            {relatedFamilies.length > 0 ? (
                <div className={`grid gap-5 max-w-3xl mx-auto ${relatedFamilies.length === 1 ? 'md:grid-cols-1 max-w-md' : 'md:grid-cols-2'}`}>
                    {relatedFamilies.map((family, index) => (
                        <Reveal key={family.slug} delay={index * 0.1} className="h-full">
                            <Link
                                href={`/treatments/${family.slug}`}
                                className="group flex flex-col bg-white p-7 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border border-charcoal/5 hover:border-maroon/20 h-full"
                            >
                                <span className="text-xs uppercase tracking-widest text-maroon/70 block mb-3 font-medium">
                                    {family.pillar} Treatment
                                </span>
                                
                                <h3 className="text-xl font-display text-charcoal mb-3 group-hover:text-maroon transition-colors">
                                    {family.name}
                                </h3>
                                
                                <p className="text-charcoal/70 text-base leading-relaxed mb-5 flex-grow">
                                    {family.summary}
                                </p>
                                
                                <div className="flex items-center text-sm uppercase tracking-widest font-medium text-maroon mt-auto pt-2">
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
          5. CTA - Center Aligned
          ============================================ */}
      <section className="py-16 md:py-20 bg-maroon relative overflow-hidden">
         <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay" />
         
         <div className="section-container relative z-10 text-center">
            <h2 className="text-3xl md:text-4xl font-display text-white mb-3">
                Ready to take control?
            </h2>
            <p className="text-white/80 text-base md:text-lg mb-8 max-w-md mx-auto">
                Our dermatologists are here to guide you back to confidence.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a 
                    href="#contact" 
                    className="px-8 py-3.5 rounded-full font-medium text-base transition-all duration-300 hover:scale-105 bg-white text-maroon"
                >
                    Book Consultation
                </a>
                <a 
                    href="tel:+919876543210" 
                    className="px-8 py-3.5 rounded-full font-medium text-base transition-all duration-300 border border-white/40 text-white hover:bg-white/10"
                >
                    Call Clinic
                </a>
            </div>
         </div>
      </section>

      {/* Back Link - Center Aligned */}
      <div className="bg-beige-warm py-8 border-t border-charcoal/5">
        <div className="section-container text-center">
            <Link href="/conditions" className="inline-flex items-center gap-2 text-base text-maroon hover:text-charcoal transition-colors font-medium">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
