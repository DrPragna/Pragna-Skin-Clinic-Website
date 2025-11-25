import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/sections/Footer';
import { treatmentFamilies, getSubTreatment, conditions } from '@/lib/navigationData';

export function generateStaticParams() {
  const params: { familySlug: string; subTreatmentSlug: string }[] = [];
  
  for (const family of treatmentFamilies) {
    for (const subTreatment of family.subTreatments) {
      params.push({
        familySlug: family.slug,
        subTreatmentSlug: subTreatment.slug,
      });
    }
  }
  
  return params;
}

export default async function SubTreatmentPage({ 
  params 
}: { 
  params: Promise<{ familySlug: string; subTreatmentSlug: string }> 
}) {
  const { familySlug, subTreatmentSlug } = await params;
  const result = getSubTreatment(subTreatmentSlug);
  
  if (!result || result.family.slug !== familySlug) {
    notFound();
  }

  const { subTreatment, family } = result;
  
  // Get related conditions
  const relatedConditions = conditions.filter(c => 
    subTreatment.relatedConditions?.includes(c.slug)
  );

  return (
    <main className="overflow-x-hidden">
      <Navbar />
      
      {/* ============================================
          SECTION 1: HERO + QUICK FACTS
          ============================================ */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-gradient-to-b from-beige-warm to-white relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 right-20 w-64 h-64 border border-maroon/10 rounded-full" />
          <div className="absolute bottom-10 left-10 w-48 h-48 border border-terracotta/10 rounded-full" />
        </div>
        
        <div className="section-container relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm mb-8">
            <Link href="/treatments" className="text-charcoal/50 hover:text-maroon transition-colors">
              Treatments
            </Link>
            <span className="text-charcoal/30">/</span>
            <Link href={`/treatments/${family.slug}`} className="text-charcoal/50 hover:text-maroon transition-colors">
              {family.name}
            </Link>
            <span className="text-charcoal/30">/</span>
            <span className="text-maroon">{subTreatment.name}</span>
          </nav>
          
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: Title and description */}
            <div>
              <span className="text-maroon font-medium uppercase tracking-[0.2em] text-xs mb-4 block">
                Treatment Detail
              </span>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-display text-charcoal mb-6 leading-[1.1]">
                {subTreatment.name}
              </h1>
              <p className="text-xl text-charcoal/60 leading-relaxed mb-8">
                {subTreatment.description}
              </p>
              <a href="#book" className="btn-primary inline-block">
                Book This Treatment
              </a>
            </div>
            
            {/* Right: Quick Facts */}
            <div className="bg-white rounded-3xl p-8 shadow-soft-lg border border-maroon/5">
              <h3 className="text-sm font-medium uppercase tracking-wider text-maroon mb-6">
                Quick Facts
              </h3>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { label: 'Sessions', value: '~6-8 sessions', icon: '📅' },
                  { label: 'Duration', value: '15-45 mins', icon: '⏱' },
                  { label: 'Comfort', value: 'Mild sensation', icon: '✨' },
                  { label: 'Downtime', value: 'Minimal', icon: '🌟' },
                ].map((fact) => (
                  <div key={fact.label} className="space-y-1">
                    <div className="text-2xl">{fact.icon}</div>
                    <p className="text-xs text-charcoal/50 uppercase tracking-wider">{fact.label}</p>
                    <p className="text-charcoal font-medium">{fact.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 2: IS THIS FOR YOU?
          ============================================ */}
      <section className="py-20 md:py-24 bg-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-maroon font-medium uppercase tracking-[0.2em] text-xs mb-4 block">
                For You?
              </span>
              <h2 className="text-3xl md:text-4xl font-display text-charcoal">
                Is this treatment right for you?
              </h2>
            </div>
            
            <div className="bg-beige-warm/50 rounded-3xl p-8 md:p-12">
              <p className="text-lg text-charcoal/70 mb-8 text-center">
                This treatment is ideal if you experience any of the following:
              </p>
              <ul className="space-y-4 max-w-2xl mx-auto">
                {[
                  'You want a safe, long-lasting solution for this specific concern.',
                  'You prefer medical-grade treatment over temporary home remedies.',
                  'You are looking for results customised to your skin type and needs.',
                ].map((point, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-maroon/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-3 h-3 text-maroon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-charcoal/80">{point}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 3: WHAT HAPPENS IN A SESSION?
          ============================================ */}
      <section className="py-20 md:py-24 bg-beige-warm/30">
        <div className="section-container">
          <div className="text-center mb-16">
            <span className="text-maroon font-medium uppercase tracking-[0.2em] text-xs mb-4 block">
              The Process
            </span>
            <h2 className="text-3xl md:text-4xl font-display text-charcoal">
              What happens in a session?
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: '01',
                title: 'Before',
                description: 'We assess your skin, discuss your goals, and prepare the treatment area. Numbing may be applied if needed.'
              },
              {
                step: '02',
                title: 'During',
                description: 'The treatment is performed with precision using advanced equipment. Most sessions are comfortable and well-tolerated.'
              },
              {
                step: '03',
                title: 'After',
                description: 'We provide aftercare instructions and schedule follow-ups. Mild redness may occur but typically resolves quickly.'
              },
            ].map((item) => (
              <div key={item.step} className="relative">
                {/* Connector line */}
                <div className="hidden md:block absolute top-8 left-full w-full h-px bg-maroon/10 -translate-x-1/2" />
                
                <div className="bg-white rounded-2xl p-8 shadow-soft border border-maroon/5 relative z-10 h-full">
                  <div className="w-12 h-12 rounded-full bg-maroon text-beige-warm flex items-center justify-center font-mono text-sm mb-6">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-display text-charcoal mb-3">{item.title}</h3>
                  <p className="text-charcoal/60 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 4: RESULTS & AFTERCARE
          ============================================ */}
      <section className="py-20 md:py-24 bg-white">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image placeholder */}
            <div className="aspect-[4/3] bg-gradient-to-br from-terracotta/10 to-beige-warm rounded-3xl flex items-center justify-center border border-maroon/5">
              <p className="text-maroon/30 text-lg italic">Add image: Before/after or treatment result</p>
            </div>
            
            {/* Content */}
            <div className="space-y-8">
              <div>
                <span className="text-maroon font-medium uppercase tracking-[0.2em] text-xs mb-4 block">
                  Outcomes
                </span>
                <h2 className="text-3xl md:text-4xl font-display text-charcoal mb-6">
                  Results & Aftercare
                </h2>
              </div>
              
              <ul className="space-y-4">
                {[
                  'Visible improvement typically noticed within the first few sessions.',
                  'Full results develop over the course of your treatment plan.',
                  'Follow provided aftercare for optimal healing and results.',
                  'Maintenance sessions may be recommended for lasting outcomes.',
                ].map((point, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="w-2 h-2 rounded-full bg-maroon mt-2.5 flex-shrink-0" />
                    <p className="text-charcoal/70 leading-relaxed">{point}</p>
                  </li>
                ))}
              </ul>
              
              {/* Aftercare callout */}
              <div className="bg-terracotta/10 rounded-2xl p-6 border border-terracotta/20">
                <h4 className="font-medium text-maroon mb-2">Aftercare Tip</h4>
                <p className="text-charcoal/70 text-sm">
                  Protect treated skin from sun exposure and follow your dermatologist&apos;s specific instructions for best results.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 5: WHY PRAGNA + COMMON QUESTIONS
          ============================================ */}
      <section className="py-20 md:py-24 bg-charcoal text-beige-warm">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Why Pragna */}
            <div>
              <span className="text-terracotta-light font-medium uppercase tracking-[0.2em] text-xs mb-4 block">
                The Difference
              </span>
              <h2 className="text-3xl md:text-4xl font-display mb-8">
                Why Pragna for this treatment?
              </h2>
              
              <ul className="space-y-6">
                {[
                  'Dermatologist-supervised protocols tailored to Indian skin types.',
                  'Advanced technology with proven safety and efficacy records.',
                ].map((point, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-terracotta-light/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-3 h-3 text-terracotta-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-beige-warm/80">{point}</p>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Common Questions */}
            <div>
              <h3 className="text-xl font-display mb-6 text-terracotta-light">
                Common Questions
              </h3>
              
              <div className="space-y-4">
                {[
                  { q: 'How many sessions will I need?', a: 'Typically 4-8 sessions, depending on your individual response and goals.' },
                  { q: 'Is it painful?', a: 'Most patients find it comfortable. We use numbing and cooling when needed.' },
                  { q: 'When will I see results?', a: 'Initial improvements may be visible after 2-3 sessions, with full results over time.' },
                ].map((faq, i) => (
                  <details key={i} className="group">
                    <summary className="flex items-center justify-between cursor-pointer py-4 border-b border-beige-warm/10">
                      <span className="font-medium pr-4">{faq.q}</span>
                      <svg className="w-5 h-5 text-terracotta-light transform group-open:rotate-180 transition-transform flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <p className="py-4 text-beige-warm/70">{faq.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
          
          {/* CTA */}
          <div className="text-center mt-16 pt-16 border-t border-beige-warm/10">
            <p className="text-beige-warm/60 mb-6">Ready to get started?</p>
            <a 
              href="#contact" 
              className="inline-flex items-center gap-2 bg-terracotta-light text-charcoal px-8 py-4 rounded-full font-medium hover:bg-terracotta transition-colors"
            >
              Book Your Consultation
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Related Conditions & Back to Family */}
      <section className="py-12 bg-beige-warm/30">
        <div className="section-container">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <Link 
              href={`/treatments/${family.slug}`}
              className="text-maroon hover:underline underline-offset-4"
            >
              ← Back to {family.name}
            </Link>
            {relatedConditions.length > 0 && (
              <>
                <span className="text-charcoal/30">|</span>
                <span className="text-charcoal/50">Related conditions:</span>
                {relatedConditions.map((condition) => (
                  <Link
                    key={condition.slug}
                    href={`/conditions/${condition.slug}`}
                    className="text-maroon hover:underline underline-offset-4"
                  >
                    {condition.name}
                  </Link>
                ))}
              </>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

