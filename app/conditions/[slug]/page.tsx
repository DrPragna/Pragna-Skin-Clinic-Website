import { Metadata } from 'next';
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

// Generate metadata for SEO
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
    keywords: [
      condition.name,
      `${condition.name} treatment`,
      `${condition.name} Hyderabad`,
      condition.group.toLowerCase(),
      'dermatologist',
      'skin clinic',
    ],
    openGraph: {
      title: `${condition.name} Treatment | Pragna Skin Clinic`,
      description: condition.subtitle,
      type: 'website',
    },
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
  
  // Get related conditions (same group, excluding current)
  const relatedConditions = conditions.filter(
    c => c.group === condition.group && c.slug !== condition.slug
  ).slice(0, 3);

  // Breadcrumb Schema for SEO
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Conditions',
        item: 'https://pragnaskinclinic.com/conditions',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: condition.group,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: condition.name,
        item: `https://pragnaskinclinic.com/conditions/${condition.slug}`,
      },
    ],
  };

  // FAQ Schema for SEO
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Will this go away completely?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Many conditions can be significantly improved or fully resolved with the right treatment. Our dermatologists will give you realistic expectations based on your specific situation.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is it my fault?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutely not. Most skin conditions are influenced by genetics, hormones, and environmental factors beyond your control.',
        },
      },
      {
        '@type': 'Question',
        name: 'What happens if I ignore it?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Some conditions may worsen over time if left untreated, while others may stabilise. Early intervention often leads to better outcomes.',
        },
      },
    ],
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
    <main className="overflow-x-hidden bg-beige-warm">
      <Navbar />
      
      {/* ============================================
          HERO - The Validation
          ============================================ */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 relative overflow-hidden">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-terracotta/5 via-beige-warm to-white" />
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-terracotta/5 rounded-full blur-3xl -translate-y-1/2" />
        
        <div className="section-container relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm mb-10">
            <Link href="/conditions" className="text-charcoal/40 hover:text-maroon transition-colors">
              Conditions
            </Link>
            <span className="text-charcoal/20">/</span>
            <span className="text-charcoal/40">{condition.group}</span>
            <span className="text-charcoal/20">/</span>
            <span className="text-maroon">{condition.name}</span>
          </nav>
          
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Content */}
            <div>
              {/* Tiny label */}
              <span className="text-maroon/60 font-medium uppercase tracking-[0.3em] text-[10px] mb-6 block">
                Condition Overview
              </span>
              
              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-charcoal leading-[1.05] mb-6">
                {condition.name}
              </h1>
              
              {/* Empathy statement */}
              <p className="text-xl md:text-2xl text-charcoal/50 font-light italic mb-8 leading-relaxed">
                &ldquo;{condition.subtitle}&rdquo;
              </p>
              
              {/* Reassurance */}
              <p className="text-lg text-charcoal/60 leading-relaxed mb-8">
                You&apos;re not alone, and this can be treated. Our dermatologists 
                will help you understand what&apos;s happening and guide you to the right solution.
              </p>
              
              {/* CTA */}
              <a 
                href="#treatments" 
                className="inline-flex items-center gap-3 bg-charcoal text-beige-warm px-8 py-4 rounded-full font-medium hover:bg-maroon transition-colors duration-300 group"
              >
                Find Your Solution
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
            
            {/* Right: Hero Image */}
            <div>
              {/* 
                IMAGE NEEDED: Empathetic, non-clinical image for {condition.name}
                Style: Person in soft light, contemplative, or abstract representation
                NOT: Clinical before/after, graphic skin conditions
                Aspect: 1:1 square
              */}
              <div className="aspect-square bg-gradient-to-br from-maroon/5 via-beige-warm to-terracotta/10 rounded-[2rem] relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 border border-maroon/10 rounded-full" />
                  <div className="absolute w-48 h-48 border border-terracotta/10 rounded-full" />
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-maroon/30 text-sm italic">
                    Need: Empathetic hero image for {condition.name}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          DO YOU RECOGNISE THIS? - Symptoms
          ============================================ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-maroon/60 font-medium uppercase tracking-[0.3em] text-[10px] mb-4 block">
                Recognise This?
              </span>
              <h2 className="text-3xl md:text-4xl font-display text-charcoal mb-4">
                Do you experience any of these?
              </h2>
              <p className="text-charcoal/50">
                If you&apos;re nodding, you&apos;re in the right place.
              </p>
            </div>
            
            {/* Symptom cards - Visual checklist */}
            <div className="grid md:grid-cols-2 gap-4">
              {[
                'Visible symptoms that bother you or affect your confidence',
                'The issue keeps coming back despite trying various products',
                'You notice the problem getting worse over time',
                'It impacts your daily life, work, or social interactions',
                'You want to understand what is actually causing it',
                'You&apos;ve tried DIY solutions without lasting success',
              ].map((symptom, i) => (
                <div 
                  key={i}
                  className="flex items-start gap-4 p-5 bg-beige-warm/50 rounded-xl border border-charcoal/5"
                >
                  <div className="w-6 h-6 rounded-full bg-maroon/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-maroon text-xs font-mono">{i + 1}</span>
                  </div>
                  <p className="text-charcoal/70">{symptom}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          QUICK STATS - The Normalizer
          ============================================ */}
      <section className="py-12 bg-charcoal text-beige-warm">
        <div className="section-container">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {[
              { stat: '85%', text: 'of people experience this at some point' },
              { stat: 'Treatable', text: 'with the right approach' },
              { stat: '4-8 weeks', text: 'to see visible improvement' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <span className="text-3xl md:text-4xl font-display text-terracotta-light block mb-1">
                  {item.stat}
                </span>
                <span className="text-sm text-beige-warm/60">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          UNDERSTANDING YOUR CONDITION
          ============================================ */}
      <section className="py-20 md:py-28 bg-beige-warm">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-maroon/60 font-medium uppercase tracking-[0.3em] text-[10px] mb-4 block">
                Understanding Your Concern
              </span>
              <h2 className="text-3xl md:text-4xl font-display text-charcoal">
                What is it & why does it happen?
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* What it is */}
              <div className="bg-white rounded-2xl p-8 shadow-soft border border-charcoal/5">
                <h3 className="text-xl font-display text-maroon mb-4">What it is</h3>
                <p className="text-charcoal/70 leading-relaxed">
                  {condition.name} is a common concern that affects many people. 
                  It involves specific changes to your skin that can be visible, 
                  uncomfortable, or both. Understanding the condition is the first 
                  step toward finding the right solution. Our dermatologists can 
                  assess your specific situation and provide clarity.
                </p>
              </div>
              
              {/* Why it happens */}
              <div className="bg-white rounded-2xl p-8 shadow-soft border border-charcoal/5">
                <h3 className="text-xl font-display text-maroon mb-4">Why it happens</h3>
                <ul className="space-y-3">
                  {[
                    'Genetics and family history',
                    'Hormonal changes or imbalances',
                    'Environmental factors and sun exposure',
                    'Lifestyle, stress, or dietary factors',
                    'Underlying skin sensitivity',
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
          THE PRAGNA APPROACH
          ============================================ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-maroon/60 font-medium uppercase tracking-[0.3em] text-[10px] mb-4 block">
              Our Approach
            </span>
            <h2 className="text-3xl md:text-4xl font-display text-charcoal mb-6">
              How we treat this at Pragna
            </h2>
            <p className="text-lg text-charcoal/60 leading-relaxed">
              Our dermatologists take a personalised, multi-step approach. We assess 
              your unique situation, identify root causes, and create a treatment plan 
              combining the most effective options for your skin type and goals. 
              No cookie-cutter solutions—just care designed for you.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================
          YOUR TREATMENT OPTIONS - The Solution
          ============================================ */}
      <section id="treatments" className="py-20 md:py-28 bg-maroon text-beige-warm relative overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />
        </div>
        
        <div className="section-container relative z-10">
          <div className="text-center mb-12">
            <span className="text-terracotta-light font-medium uppercase tracking-[0.3em] text-[10px] mb-4 block">
              Your Treatment Options
            </span>
            <h2 className="text-3xl md:text-4xl font-display mb-4">
              How we can help
            </h2>
            <p className="text-beige-warm/70 max-w-xl mx-auto">
              Based on your specific situation, our dermatologists may recommend 
              one or a combination of these treatment approaches.
            </p>
          </div>
          
          {/* Treatment family cards */}
          {relatedFamilies.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {relatedFamilies.map((family) => (
                <Link
                  key={family.slug}
                  href={`/treatments/${family.slug}`}
                  className="group bg-beige-warm/10 backdrop-blur-sm border border-beige-warm/10 rounded-2xl p-8 hover:bg-beige-warm/20 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-[10px] uppercase tracking-wider text-terracotta-light/70">
                      {family.pillar}
                    </span>
                    <svg className="w-5 h-5 text-terracotta-light opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-display mb-3 group-hover:text-terracotta-light transition-colors">
                    {family.name}
                  </h3>
                  <p className="text-beige-warm/60 text-sm leading-relaxed mb-4">
                    {family.summary}
                  </p>
                  <p className="text-xs text-terracotta-light">
                    {family.subTreatments.length} treatment options →
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <p className="text-beige-warm/60 mb-4">
                Treatment options for this condition are being updated.
              </p>
              <a href="#contact" className="text-terracotta-light underline underline-offset-4">
                Contact us for more information
              </a>
            </div>
          )}
          
          {/* CTA */}
          <div className="text-center mt-12">
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
          WHAT TO EXPECT - Timeline
          ============================================ */}
      <section className="py-20 md:py-28 bg-beige-warm">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-maroon/60 font-medium uppercase tracking-[0.3em] text-[10px] mb-4 block">
                Your Journey
              </span>
              <h2 className="text-3xl md:text-4xl font-display text-charcoal">
                What to expect
              </h2>
            </div>
            
            {/* Timeline */}
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-maroon/20" />
              
              <div className="space-y-10">
                {[
                  {
                    step: '01',
                    title: 'Initial Consultation',
                    description: 'We assess your condition, understand your concerns, and discuss your goals. No judgment, just understanding.',
                  },
                  {
                    step: '02',
                    title: 'Personalised Plan',
                    description: 'Based on your assessment, we create a treatment plan tailored to your specific needs and lifestyle.',
                  },
                  {
                    step: '03',
                    title: 'Treatment & Progress',
                    description: 'We begin treatment and monitor your progress, adjusting as needed to ensure optimal results.',
                  },
                  {
                    step: '04',
                    title: 'Lasting Results',
                    description: 'With proper care and follow-up, you achieve clear, healthy skin and the confidence that comes with it.',
                  },
                ].map((item, i) => (
                  <div key={i} className="relative flex gap-6 md:gap-8">
                    {/* Node */}
                    <div className="relative z-10 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white border-2 border-maroon flex items-center justify-center flex-shrink-0 shadow-soft">
                      <span className="text-xs md:text-sm font-mono text-maroon">
                        {item.step}
                      </span>
                    </div>
                    
                    {/* Content */}
                    <div className="pt-2 md:pt-4">
                      <h3 className="text-xl font-display text-charcoal mb-2">
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
          FAQ & SELF-CARE
          ============================================ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* FAQs */}
            <div>
              <span className="text-maroon/60 font-medium uppercase tracking-[0.3em] text-[10px] mb-4 block">
                Common Questions
              </span>
              <h3 className="text-2xl md:text-3xl font-display text-charcoal mb-8">
                Questions patients usually ask
              </h3>
              
              <div className="space-y-4">
                {[
                  { 
                    q: 'Will this go away completely?', 
                    a: 'Many conditions can be significantly improved or fully resolved with the right treatment. Our dermatologists will give you realistic expectations based on your specific situation.' 
                  },
                  { 
                    q: 'Is it my fault?', 
                    a: 'Absolutely not. Most skin conditions are influenced by genetics, hormones, and environmental factors beyond your control. What matters now is finding the right solution.' 
                  },
                  { 
                    q: 'Can I still wear makeup / continue my routine?', 
                    a: 'In most cases, yes. We will guide you on any temporary adjustments needed during active treatment phases.' 
                  },
                  { 
                    q: 'What happens if I ignore it?', 
                    a: 'Some conditions may worsen over time if left untreated, while others may stabilise. Early intervention often leads to better outcomes.' 
                  },
                ].map((faq, i) => (
                  <details 
                    key={i} 
                    className="group bg-beige-warm/30 rounded-xl overflow-hidden border border-charcoal/5"
                  >
                    <summary className="flex items-center justify-between p-5 cursor-pointer">
                      <span className="font-medium text-charcoal pr-6">{faq.q}</span>
                      <div className="w-6 h-6 rounded-full bg-charcoal/5 flex items-center justify-center flex-shrink-0 group-open:bg-maroon group-open:text-beige-warm transition-colors">
                        <svg className="w-3 h-3 transform group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </summary>
                    <div className="px-5 pb-5 text-charcoal/60 leading-relaxed">
                      {faq.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>
            
            {/* Self-Care Tips */}
            <div>
              <span className="text-maroon/60 font-medium uppercase tracking-[0.3em] text-[10px] mb-4 block">
                At Home
              </span>
              <h3 className="text-2xl md:text-3xl font-display text-charcoal mb-8">
                Self-care tips
              </h3>
              
              <p className="text-charcoal/60 mb-6">
                While professional treatment is often necessary, these habits can help support your skin health:
              </p>
              
              <ul className="space-y-4">
                {[
                  'Use gentle, fragrance-free cleansers suited to your skin type',
                  'Apply sunscreen daily, even on cloudy days',
                  'Avoid picking or touching affected areas',
                  'Stay hydrated and maintain a balanced diet',
                  'Manage stress through exercise or relaxation techniques',
                  'Be patient—skin takes time to heal and respond',
                ].map((tip, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-terracotta/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-maroon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-charcoal/70 pt-1">{tip}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8 p-6 bg-maroon/5 rounded-xl border border-maroon/10">
                <p className="text-charcoal/60 text-sm">
                  <strong className="text-maroon">Note:</strong> Self-care supports but doesn&apos;t replace 
                  professional treatment. For persistent concerns, consult a dermatologist.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          RELATED CONDITIONS
          ============================================ */}
      {relatedConditions.length > 0 && (
        <section className="py-12 bg-beige-warm border-t border-charcoal/5">
          <div className="section-container">
            <p className="text-[10px] uppercase tracking-[0.3em] text-charcoal/40 mb-6">
              People with {condition.name} also look at
            </p>
            <div className="flex flex-wrap gap-3">
              {relatedConditions.map((related) => (
                <Link
                  key={related.slug}
                  href={`/conditions/${related.slug}`}
                  className="text-sm text-charcoal/60 hover:text-maroon bg-white px-4 py-2 rounded-full border border-charcoal/5 hover:border-maroon/20 transition-colors"
                >
                  {related.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============================================
          FINAL CTA
          ============================================ */}
      <section className="py-20 md:py-28 bg-charcoal text-beige-warm">
        <div className="section-container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display mb-6">
              Ready to address your {condition.name.toLowerCase()}?
            </h2>
            <p className="text-lg text-beige-warm/70 mb-10">
              Book a consultation and let our dermatologists create your personalised treatment plan.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="#contact" 
                className="inline-flex items-center gap-2 bg-terracotta-light text-charcoal px-8 py-4 rounded-full font-medium hover:bg-beige-warm transition-colors"
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

      {/* Back link */}
      <section className="py-8 bg-beige-warm border-t border-charcoal/5">
        <div className="section-container">
          <div className="flex justify-center">
            <Link 
              href="/conditions"
              className="text-sm text-maroon hover:text-maroon/70 transition-colors"
            >
              ← View all conditions
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
    </>
  );
}
