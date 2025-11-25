import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/sections/Footer';
import { treatmentFamilies, getTreatmentFamily, getConditionsForFamily } from '@/lib/navigationData';
import { laserHairReductionFamily } from '@/lib/content/treatment-families/laser-hair-reduction';

export function generateStaticParams() {
  return treatmentFamilies.map((family) => ({
    familySlug: family.slug,
  }));
}

export default async function TreatmentFamilyPage({ 
  params 
}: { 
  params: Promise<{ familySlug: string }> 
}) {
  const { familySlug } = await params;
  const family = getTreatmentFamily(familySlug);
  
  if (!family) {
    notFound();
  }

  const relatedConditions = getConditionsForFamily(familySlug);
  
  // Get custom content if available
  const customContent = familySlug === 'laser-hair-reduction' ? laserHairReductionFamily : null;
  
  // Pillar-based accent colors
  const pillarColors = {
    Skin: { accent: 'terracotta', bg: 'bg-gradient-to-br from-beige-warm via-white to-terracotta/5' },
    Hair: { accent: 'maroon', bg: 'bg-gradient-to-br from-beige-warm via-white to-maroon/5' },
    Body: { accent: 'terracotta', bg: 'bg-gradient-to-br from-white via-beige-warm/50 to-terracotta/5' },
    Wellness: { accent: 'maroon', bg: 'bg-gradient-to-br from-beige-warm via-white to-maroon/5' },
  };
  
  const colors = pillarColors[family.pillar];

  return (
    <main className="overflow-x-hidden">
      <Navbar />
      
      {/* ============================================
          SECTION 1: HERO (Family Overview)
          ============================================ */}
      <section className={`pt-32 pb-20 md:pt-40 md:pb-28 ${colors.bg} relative overflow-hidden`}>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-radial from-terracotta/10 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-radial from-maroon/5 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
        
        <div className="section-container relative z-10">
          <div className="max-w-4xl">
            {/* Label */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-maroon font-medium uppercase tracking-[0.2em] text-xs">
                Treatment Family
              </span>
              <span className="w-12 h-px bg-maroon/30" />
              <span className="text-charcoal/40 text-xs uppercase tracking-wider">
                {family.pillar}
              </span>
            </div>
            
            {/* Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display text-charcoal mb-6 leading-[1.1]">
              {customContent?.hero.title || family.name}
            </h1>
            
            {/* Subtitle */}
            {customContent?.hero.subtitle && (
              <p className="text-2xl md:text-3xl text-maroon/70 font-light italic mb-6">
                {customContent.hero.subtitle}
              </p>
            )}
            
            {/* Summary/Intro */}
            <p className="text-xl md:text-2xl text-charcoal/60 font-light leading-relaxed max-w-2xl mb-10">
              {customContent?.hero.intro || family.summary}
            </p>
            
            {/* CTA */}
            <a 
              href="#treatments" 
              className="btn-primary inline-flex items-center gap-2 group"
            >
              View Treatment Options
              <svg 
                className="w-4 h-4 transform group-hover:translate-y-0.5 transition-transform" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 2: WHO THIS IS FOR
          ============================================ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image placeholder */}
            <div className="order-2 lg:order-1">
              <div className="aspect-[4/3] bg-gradient-to-br from-beige-warm to-terracotta/10 rounded-3xl flex items-center justify-center border border-maroon/5">
                <p className="text-maroon/30 text-lg italic">Add image: Patient scenario</p>
              </div>
            </div>
            
            {/* Content */}
            <div className="order-1 lg:order-2 space-y-8">
              <div>
                <span className="text-maroon font-medium uppercase tracking-[0.2em] text-xs mb-4 block">
                  Who This Is For
                </span>
                <h2 className="text-3xl md:text-4xl font-display text-charcoal mb-6">
                  Is this right for you?
                </h2>
                <p className="text-lg text-charcoal/60 leading-relaxed">
                  {customContent?.whoIsThisFor.intro || 'This treatment family may be a good fit if you recognise yourself in any of these situations:'}
                </p>
              </div>
              
              <ul className="space-y-4">
                {(customContent?.whoIsThisFor.points || [
                  'You want long-lasting results, not temporary fixes.',
                  'You prefer medically supervised care over salon treatments.',
                  'You have tried over-the-counter solutions without success.'
                ]).map((point, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-terracotta/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-maroon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-charcoal/80 text-lg">{point}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 3: HOW THIS TREATMENT FAMILY WORKS
          ============================================ */}
      <section className="py-20 md:py-28 bg-beige-warm/50">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-maroon font-medium uppercase tracking-[0.2em] text-xs mb-4 block">
              The Approach
            </span>
            <h2 className="text-3xl md:text-4xl font-display text-charcoal mb-8">
              How {customContent?.hero.title || family.name} works
            </h2>
            <p className="text-lg md:text-xl text-charcoal/70 leading-relaxed mb-8">
              {customContent?.howItHelps.description || 
               'Our dermatologists use advanced, evidence-based techniques tailored to your unique needs. Each treatment in this family is designed to deliver safe, effective, and long-lasting results while prioritising your comfort and skin health throughout the process.'}
            </p>
            
            {customContent?.howItHelps.keyPoints && (
              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {customContent.howItHelps.keyPoints.map((point, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-maroon/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-maroon font-semibold">{i + 1}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-charcoal mb-1">{point.title}</h4>
                      <p className="text-charcoal/60 text-sm">{point.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 4: TREATMENT OPTIONS IN THIS FAMILY
          ============================================ */}
      <section id="treatments" className="py-20 md:py-28 bg-white">
        <div className="section-container">
          <div className="text-center mb-16">
            <span className="text-maroon font-medium uppercase tracking-[0.2em] text-xs mb-4 block">
              Your Options
            </span>
            <h2 className="text-3xl md:text-4xl font-display text-charcoal mb-4">
              Treatments in this family
            </h2>
            <p className="text-lg text-charcoal/60 max-w-2xl mx-auto">
              Choose the specific treatment that matches your goals. Each is customised to your needs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {family.subTreatments.map((treatment, index) => (
              <Link
                key={treatment.slug}
                href={`/treatments/${family.slug}/${treatment.slug}`}
                className="group relative bg-beige-warm/30 hover:bg-white rounded-2xl p-8 border border-transparent hover:border-maroon/10 hover:shadow-soft-xl transition-all duration-300"
              >
                {/* Number badge */}
                <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-maroon/5 flex items-center justify-center">
                  <span className="text-xs font-mono text-maroon/40">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-display text-charcoal group-hover:text-maroon transition-colors pr-10">
                    {treatment.name}
                  </h3>
                  <p className="text-charcoal/60 leading-relaxed">
                    {treatment.description}
                  </p>
                  
                  {/* Arrow */}
                  <div className="flex items-center gap-2 text-maroon opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-sm font-medium">Learn more</span>
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 5: WHY CHOOSE PRAGNA
          ============================================ */}
      <section className="py-20 md:py-28 bg-maroon text-beige-warm relative overflow-hidden">
        {/* Decorative */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="section-container relative z-10">
          <div className="text-center mb-16">
            <span className="text-terracotta-light font-medium uppercase tracking-[0.2em] text-xs mb-4 block">
              The Pragna Difference
            </span>
            <h2 className="text-3xl md:text-4xl font-display mb-4">
              Why choose Pragna for {family.name}?
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: 'Dermatologist-Led Care',
                description: 'Every treatment is designed and supervised by qualified dermatologists with 25+ years of experience.'
              },
              {
                title: 'Advanced Technology',
                description: 'We use only US-FDA approved devices and medical-grade protocols for optimal safety and results.'
              },
              {
                title: 'Long-Term Results',
                description: 'Our focus is on sustainable outcomes, not quick fixes. We treat the root cause, not just symptoms.'
              }
            ].map((item, i) => (
              <div key={i} className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-white/10 flex items-center justify-center">
                  <span className="text-2xl font-display text-terracotta-light">{i + 1}</span>
                </div>
                <h3 className="text-xl font-display">{item.title}</h3>
                <p className="text-beige-warm/70 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
          
          {/* CTA */}
          <div className="text-center mt-16">
            <a 
              href="#contact" 
              className="inline-flex items-center gap-2 bg-beige-warm text-maroon px-8 py-4 rounded-full font-medium hover:bg-white transition-colors"
            >
              Book a Consultation
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Related Conditions */}
      {relatedConditions.length > 0 && (
        <section className="py-16 bg-beige-warm/30">
          <div className="section-container">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <span className="text-charcoal/50 text-sm">Related conditions:</span>
              {relatedConditions.map((condition) => (
                <Link
                  key={condition.slug}
                  href={`/conditions/${condition.slug}`}
                  className="text-sm text-maroon hover:text-maroon/70 underline underline-offset-4 transition-colors"
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

