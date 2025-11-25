import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/sections/Footer';
import { conditions, getCondition, getTreatmentFamiliesForCondition } from '@/lib/navigationData';

export function generateStaticParams() {
  return conditions.map((condition) => ({
    slug: condition.slug,
  }));
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

  return (
    <main className="overflow-x-hidden">
      <Navbar />
      
      {/* ============================================
          SECTION 1: HERO (Condition Overview)
          ============================================ */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-b from-terracotta/10 via-beige-warm to-white relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-terracotta/5 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-maroon/5 rounded-full blur-3xl translate-y-1/2" />
        
        <div className="section-container relative z-10">
          <div className="max-w-4xl">
            {/* Label */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-maroon font-medium uppercase tracking-[0.2em] text-xs">
                Condition Overview
              </span>
              <span className="w-12 h-px bg-maroon/30" />
              <span className="text-charcoal/40 text-xs uppercase tracking-wider">
                {condition.group}
              </span>
            </div>
            
            {/* Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display text-charcoal mb-6 leading-[1.1]">
              {condition.name}
            </h1>
            
            {/* Empathy line */}
            <p className="text-xl md:text-2xl text-charcoal/60 font-light leading-relaxed max-w-2xl mb-10 italic">
              &ldquo;{condition.subtitle}&rdquo;
            </p>
            
            {/* CTA */}
            <a 
              href="#treatments" 
              className="btn-primary inline-flex items-center gap-2 group"
            >
              See Treatment Options
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
          SECTION 2: IS THIS YOU? (Symptoms)
          ============================================ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image placeholder */}
            <div className="order-2 lg:order-1">
              <div className="aspect-square bg-gradient-to-br from-beige-warm to-terracotta/10 rounded-3xl flex items-center justify-center border border-maroon/5 relative overflow-hidden">
                <p className="text-maroon/30 text-lg italic">Add image: Visual representation</p>
                {/* Decorative circles */}
                <div className="absolute -bottom-10 -right-10 w-40 h-40 border border-maroon/10 rounded-full" />
                <div className="absolute -top-5 -left-5 w-24 h-24 border border-terracotta/20 rounded-full" />
              </div>
            </div>
            
            {/* Content */}
            <div className="order-1 lg:order-2 space-y-8">
              <div>
                <span className="text-maroon font-medium uppercase tracking-[0.2em] text-xs mb-4 block">
                  Recognise This?
                </span>
                <h2 className="text-3xl md:text-4xl font-display text-charcoal mb-6">
                  Is this you?
                </h2>
                <p className="text-lg text-charcoal/60 leading-relaxed">
                  You might be dealing with this condition if you notice any of these signs:
                </p>
              </div>
              
              <ul className="space-y-4">
                {[
                  'Visible symptoms that bother you or affect your confidence.',
                  'The issue keeps coming back despite trying various products.',
                  'You notice the problem getting worse over time.',
                  'It impacts your daily life, work, or social interactions.',
                  'You want to understand what is actually causing it.',
                ].map((symptom, i) => (
                  <li key={i} className="flex items-start gap-4 group">
                    <div className="w-8 h-8 rounded-full bg-terracotta/10 group-hover:bg-terracotta/20 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors">
                      <span className="text-maroon text-sm font-mono">{i + 1}</span>
                    </div>
                    <p className="text-charcoal/80 text-lg">{symptom}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 3: WHAT IT IS & WHY IT HAPPENS
          ============================================ */}
      <section className="py-20 md:py-28 bg-beige-warm/50">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-maroon font-medium uppercase tracking-[0.2em] text-xs mb-4 block">
                Understanding Your Concern
              </span>
              <h2 className="text-3xl md:text-4xl font-display text-charcoal">
                What is it & why does it happen?
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12">
              {/* What it is */}
              <div className="bg-white rounded-2xl p-8 shadow-soft border border-maroon/5">
                <h3 className="text-xl font-display text-maroon mb-4">What it is</h3>
                <p className="text-charcoal/70 leading-relaxed">
                  This is a common concern that affects many people. It involves specific 
                  changes to your skin or hair that can be visible, uncomfortable, or both. 
                  Understanding the condition is the first step toward finding the right solution.
                </p>
              </div>
              
              {/* Why it happens */}
              <div className="bg-white rounded-2xl p-8 shadow-soft border border-maroon/5">
                <h3 className="text-xl font-display text-maroon mb-4">Common causes</h3>
                <ul className="space-y-3">
                  {[
                    'Genetics and family history',
                    'Hormonal changes or imbalances',
                    'Environmental factors and sun exposure',
                    'Lifestyle, stress, or dietary factors',
                  ].map((cause, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-maroon mt-2.5 flex-shrink-0" />
                      <span className="text-charcoal/70">{cause}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 4: HOW WE TREAT THIS AT PRAGNA
          ============================================ */}
      <section id="treatments" className="py-20 md:py-28 bg-maroon text-beige-warm relative overflow-hidden">
        {/* Decorative */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-terracotta/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        
        <div className="section-container relative z-10">
          <div className="max-w-4xl mx-auto mb-16">
            <div className="text-center">
              <span className="text-terracotta-light font-medium uppercase tracking-[0.2em] text-xs mb-4 block">
                Your Treatment Options
              </span>
              <h2 className="text-3xl md:text-4xl font-display mb-6">
                How we treat this at Pragna
              </h2>
              <p className="text-lg text-beige-warm/70 leading-relaxed max-w-2xl mx-auto">
                Our dermatologists take a personalised, multi-step approach. We assess your unique 
                situation, identify root causes, and create a treatment plan combining the most 
                effective options for your skin type and goals.
              </p>
            </div>
          </div>
          
          {/* Treatment Families */}
          {relatedFamilies.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {relatedFamilies.map((family) => (
                <Link
                  key={family.slug}
                  href={`/treatments/${family.slug}`}
                  className="group bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/20 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-xs uppercase tracking-wider text-terracotta-light/70">
                      {family.pillar}
                    </span>
                    <svg className="w-5 h-5 text-terracotta-light opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-display mb-3 group-hover:text-terracotta-light transition-colors">
                    {family.name}
                  </h3>
                  <p className="text-beige-warm/60 text-sm leading-relaxed">
                    {family.summary}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center text-beige-warm/60">
              <p>Treatment options for this condition are being updated.</p>
              <a href="#contact" className="text-terracotta-light underline underline-offset-4 mt-2 inline-block">
                Contact us for more information
              </a>
            </div>
          )}
          
          {/* CTA */}
          <div className="text-center mt-16">
            <p className="text-beige-warm/60 mb-6">Not sure which treatment is right for you?</p>
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

      {/* ============================================
          SECTION 5: QUESTIONS PATIENTS USUALLY ASK
          ============================================ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-maroon font-medium uppercase tracking-[0.2em] text-xs mb-4 block">
                Your Questions Answered
              </span>
              <h2 className="text-3xl md:text-4xl font-display text-charcoal">
                Questions patients usually ask
              </h2>
            </div>
            
            <div className="space-y-4">
              {[
                { q: 'Will this go away completely?', a: 'Many conditions can be significantly improved or fully resolved with the right treatment. Our dermatologists will give you realistic expectations based on your specific situation.' },
                { q: 'Is it my fault?', a: 'Absolutely not. Most skin and hair conditions are influenced by genetics, hormones, and environmental factors beyond your control. What matters now is finding the right solution.' },
                { q: 'Can I still wear makeup / continue my routine?', a: 'In most cases, yes. We will guide you on any temporary adjustments needed during active treatment phases.' },
                { q: 'What happens if I ignore it?', a: 'Some conditions may worsen over time if left untreated, while others may stabilise. Early intervention often leads to better outcomes and prevents complications.' },
              ].map((faq, i) => (
                <details 
                  key={i} 
                  className="group bg-beige-warm/30 rounded-2xl overflow-hidden border border-maroon/5 hover:border-maroon/10 transition-colors"
                >
                  <summary className="flex items-center justify-between p-6 cursor-pointer">
                    <span className="font-medium text-charcoal pr-8">{faq.q}</span>
                    <div className="w-8 h-8 rounded-full bg-maroon/10 flex items-center justify-center flex-shrink-0 group-open:bg-maroon group-open:text-beige-warm transition-colors">
                      <svg className="w-4 h-4 transform group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </summary>
                  <div className="px-6 pb-6 text-charcoal/70 leading-relaxed">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Back link */}
      <section className="py-8 bg-beige-warm/30">
        <div className="section-container">
          <div className="flex justify-center">
            <Link 
              href="/conditions"
              className="text-sm text-maroon hover:underline underline-offset-4"
            >
              ← View all conditions
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
