import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/sections/Footer';
import { treatmentFamilies, getTreatmentFamily, getConditionsForFamily } from '@/lib/navigationData';
import { getTreatmentFamilyContent } from '@/lib/content';

export function generateStaticParams() {
  return treatmentFamilies.map((family) => ({
    familySlug: family.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ familySlug: string }> 
}): Promise<Metadata> {
  const { familySlug } = await params;
  const family = getTreatmentFamily(familySlug);
  const content = getTreatmentFamilyContent(familySlug);
  
  if (!family) {
    return { title: 'Treatment Not Found' };
  }
  
  return {
    title: `${family.name} | ${family.pillar} Treatments | Pragna Skin Clinic`,
    description: content?.hero.intro || `${family.summary} Expert ${family.name.toLowerCase()} treatments by qualified dermatologists at Pragna Skin Clinic Hyderabad.`,
    keywords: [
      family.name,
      `${family.name} treatment`,
      `${family.name} Hyderabad`,
      family.pillar.toLowerCase(),
      'dermatologist',
      'skin clinic',
      ...family.subTreatments.map(st => st.name),
    ],
    openGraph: {
      title: `${family.name} | Pragna Skin Clinic`,
      description: content?.hero.intro || family.summary,
      type: 'website',
    },
  };
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
  const content = getTreatmentFamilyContent(familySlug);

  // Fallback content if no content file exists
  const heroTitle = content?.hero.title || family.name;
  const heroSubtitle = content?.hero.subtitle || 'Expert dermatologist care';
  const heroIntro = content?.hero.intro || family.summary;
  
  const trustIndicators = content?.trustIndicators || [
    { value: '25+', label: 'Years Experience' },
    { value: 'FDA', label: 'Approved Technology' },
    { value: '10K+', label: 'Patients Treated' },
  ];
  
  const howItWorksDescription = content?.howItWorks.description || 
    'Our dermatologists use advanced, evidence-based techniques tailored to your unique needs.';
  
  const howItWorksSteps = content?.howItWorks.steps || [
    {
      title: 'Assessment',
      text: 'We evaluate your skin type, concerns, and goals to create a personalised treatment plan.',
      icon: 'consultation',
    },
    {
      title: 'Treatment',
      text: 'Using state-of-the-art technology, we deliver precise, comfortable treatments with optimal results.',
      icon: 'treatment',
    },
    {
      title: 'Results',
      text: 'We monitor your progress and adjust as needed to ensure lasting, beautiful outcomes.',
      icon: 'results',
    },
  ];
  
  const whoIsThisForHeadline = content?.whoIsThisFor.headline || 'Ideal for you if...';
  const whoIsThisForList = content?.whoIsThisFor.list || [
    'You want long-lasting results, not temporary fixes',
    'You prefer medically supervised care over salon treatments',
    'You have tried over-the-counter solutions without success',
    'You value personalised treatment plans over one-size-fits-all',
  ];
  
  const whyPragnaItems = content?.whyPragna || [
    {
      title: 'Dermatologist-Led',
      description: 'Every treatment is designed and supervised by qualified dermatologists with decades of experience.',
    },
    {
      title: 'Advanced Technology',
      description: 'We use only US-FDA approved devices and medical-grade protocols for optimal safety and results.',
    },
    {
      title: 'Personalised Care',
      description: 'No cookie-cutter treatments. Every plan is tailored to your unique skin type, concerns, and goals.',
    },
  ];

  // Breadcrumb Schema for SEO
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Treatments',
        item: 'https://pragnaskinclinic.com/treatments',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: family.pillar,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: family.name,
        item: `https://pragnaskinclinic.com/treatments/${family.slug}`,
      },
    ],
  };

  // Service Schema for SEO
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: family.name,
    description: heroIntro,
    procedureType: 'https://schema.org/CosmeticProcedure',
    howPerformed: 'By qualified dermatologists using advanced technology',
    preparation: 'Initial consultation and skin assessment',
    followup: 'Regular monitoring and aftercare support',
  };

  // Icon components for how it works
  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'consultation':
        return (
          <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="16" cy="16" r="12" />
            <path d="M16 10v6l4 2" strokeLinecap="round" />
          </svg>
        );
      case 'treatment':
        return (
          <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M16 4v24M4 16h24" strokeLinecap="round" />
            <circle cx="16" cy="16" r="6" />
          </svg>
        );
      case 'results':
        return (
          <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 16l6 6L26 8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      default:
        return (
          <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="16" cy="16" r="12" />
          </svg>
        );
    }
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      
    <main className="overflow-x-hidden bg-beige-warm">
      <Navbar />
      
      {/* ============================================
          HERO - Editorial Split Layout
          ============================================ */}
      <section className="pt-28 pb-12 md:pt-36 md:pb-16 relative overflow-hidden">
        <div className="section-container relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm mb-10">
            <Link href="/treatments" className="text-charcoal/40 hover:text-maroon transition-colors">
              Treatments
            </Link>
            <span className="text-charcoal/20">/</span>
            <span className="text-charcoal/40">{family.pillar}</span>
            <span className="text-charcoal/20">/</span>
            <span className="text-maroon">{family.name}</span>
          </nav>
          
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Content */}
            <div className="order-2 lg:order-1">
              {/* Tiny label */}
              <span className="text-maroon/60 font-medium uppercase tracking-[0.3em] text-[10px] mb-6 block">
                Treatment Family
              </span>
              
              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-charcoal leading-[1.05] mb-4">
                {heroTitle}
              </h1>
              
              {/* Subtitle */}
              <p className="text-xl md:text-2xl text-maroon/60 font-light italic mb-6">
                {heroSubtitle}
              </p>
              
              {/* Intro */}
              <p className="text-lg text-charcoal/60 leading-relaxed mb-8">
                {heroIntro}
              </p>
              
              {/* CTA */}
              <a 
                href="#treatments" 
                className="inline-flex items-center gap-3 bg-charcoal text-beige-warm px-8 py-4 rounded-full font-medium hover:bg-maroon transition-colors duration-300 group"
              >
                Explore Treatments
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
            <div className="order-1 lg:order-2">
              <div className="aspect-[4/5] bg-gradient-to-br from-maroon/5 via-beige-warm to-terracotta/10 rounded-[2rem] overflow-hidden relative">
                {content?.hero.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img 
                    src={content.hero.image} 
                    alt={heroTitle}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    {/* Decorative elements */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-32 h-32 border border-maroon/10 rounded-full" />
                      <div className="absolute w-48 h-48 border border-terracotta/10 rounded-full" />
                    </div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <p className="text-maroon/30 text-sm italic">
                        Need: Editorial hero image for {family.name}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          TRUST STRIP - The Badge
          ============================================ */}
      <section className="py-8 border-y border-charcoal/5 bg-white/50">
        <div className="section-container">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {trustIndicators.map((stat, i) => (
              <div key={i} className="flex items-center gap-3 text-charcoal/60">
                <span className="text-2xl md:text-3xl font-display text-maroon">{stat.value}</span>
                <span className="text-xs uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          HOW IT WORKS - The Science (Simplified)
          ============================================ */}
      <section className="py-14 md:py-20 bg-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            {/* Section header */}
            <div className="text-center mb-10">
              <span className="text-maroon/60 font-medium uppercase tracking-[0.3em] text-[10px] mb-4 block">
                The Approach
              </span>
              <h2 className="text-3xl md:text-4xl font-display text-charcoal mb-6">
                How it works
              </h2>
              <p className="text-lg text-charcoal/50 max-w-2xl mx-auto">
                {howItWorksDescription}
              </p>
            </div>
            
            {/* 3-Step Process */}
            <div className="grid md:grid-cols-3 gap-8 md:gap-12">
              {howItWorksSteps.map((item, i) => (
                <div key={i} className="text-center">
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-beige-warm text-maroon mb-6">
                    {getStepIcon(item.icon || 'default')}
                  </div>
                  
                  {/* Step number */}
                  <p className="text-[10px] font-mono text-charcoal/30 uppercase tracking-wider mb-2">
                    Step {String(i + 1).padStart(2, '0')}
                  </p>
                  
                  {/* Title */}
                  <h3 className="text-xl font-display text-charcoal mb-3">
                    {item.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-charcoal/50 text-sm leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          WHO IS THIS FOR - Checklist Card
          ============================================ */}
      <section className="py-14 md:py-20 bg-beige-warm">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Image */}
            <div>
              <div className="aspect-square bg-gradient-to-br from-terracotta/10 via-white to-maroon/5 rounded-[2rem] relative overflow-hidden group">
                {content?.whoIsThisFor.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={content.whoIsThisFor.image}
                    alt="Is this for you?"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-40 h-40 border border-maroon/10 rounded-full animate-pulse" />
                    </div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <p className="text-maroon/30 text-sm italic">
                        Need: Lifestyle image for {family.name}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
            
            {/* Right: Content */}
            <div>
              <span className="text-maroon/60 font-medium uppercase tracking-[0.3em] text-[10px] mb-4 block">
                Is This For You?
              </span>
              <h2 className="text-3xl md:text-4xl font-display text-charcoal mb-6">
                {whoIsThisForHeadline}
              </h2>
              
              {/* Checklist */}
              <ul className="space-y-4">
                {whoIsThisForList.map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-maroon/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-maroon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-charcoal/70">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          TREATMENT OPTIONS - The Menu
          ============================================ */}
      <section id="treatments" className="py-14 md:py-20 bg-white">
        <div className="section-container">
          {/* Section header */}
          <div className="text-center mb-10">
            <span className="text-maroon/60 font-medium uppercase tracking-[0.3em] text-[10px] mb-4 block">
              Your Options
            </span>
            <h2 className="text-3xl md:text-4xl font-display text-charcoal mb-4">
              Treatments in this family
            </h2>
            <p className="text-lg text-charcoal/50 max-w-2xl mx-auto">
              Choose the specific treatment that matches your goals. Each is customised to your needs.
            </p>
          </div>
          
          {/* Treatment cards - Magazine style list */}
          <div className="space-y-4">
            {family.subTreatments.map((treatment, index) => (
              <Link
                key={treatment.slug}
                href={`/treatments/${family.slug}/${treatment.slug}`}
                className="group block bg-beige-warm/30 hover:bg-beige-warm rounded-2xl p-6 md:p-8 border border-transparent hover:border-charcoal/5 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Left: Number + Content */}
                  <div className="flex items-start gap-6">
                    {/* Number */}
                    <span className="text-4xl md:text-5xl font-display text-charcoal/10 group-hover:text-maroon/20 transition-colors">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    
                    {/* Content */}
                    <div>
                      <h3 className="text-xl md:text-2xl font-display text-charcoal group-hover:text-maroon transition-colors mb-2">
                        {treatment.name}
                      </h3>
                      <p className="text-charcoal/50 text-sm md:text-base">
                        {treatment.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Right: Arrow */}
                  <div className="flex-shrink-0 self-end md:self-center">
                    <div className="w-12 h-12 rounded-full bg-white group-hover:bg-maroon flex items-center justify-center transition-all duration-300 shadow-soft">
                      <svg 
                        className="w-5 h-5 text-charcoal/30 group-hover:text-beige-warm transition-colors" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          WHY PRAGNA - The Differentiators
          ============================================ */}
      <section className="py-14 md:py-20 bg-charcoal text-beige-warm relative overflow-hidden">
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
          <div className="text-center mb-10">
            <span className="text-terracotta-light font-medium uppercase tracking-[0.3em] text-[10px] mb-4 block">
              The Pragna Difference
            </span>
            <h2 className="text-3xl md:text-4xl font-display mb-4">
              Why choose Pragna?
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {whyPragnaItems.map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-beige-warm/10 flex items-center justify-center mb-6">
                  <span className="text-2xl font-display text-terracotta-light">{i + 1}</span>
                </div>
                <h3 className="text-xl font-display mb-3">{item.title}</h3>
                <p className="text-beige-warm/60 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
          
          {/* CTA */}
          <div className="text-center mt-10">
            <a 
              href="#contact" 
              className="inline-flex items-center gap-2 bg-terracotta-light text-charcoal px-8 py-4 rounded-full font-medium hover:bg-beige-warm transition-colors"
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
          RELATED CONDITIONS - The Bridge
          ============================================ */}
      {relatedConditions.length > 0 && (
        <section className="py-12 bg-beige-warm border-t border-charcoal/5">
          <div className="section-container">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
              <span className="text-charcoal/40 text-sm flex-shrink-0">
                This treatment helps with:
              </span>
              <div className="flex flex-wrap gap-2">
                {relatedConditions.map((condition) => (
                  <Link
                    key={condition.slug}
                    href={`/conditions/${condition.slug}`}
                    className="text-sm text-maroon hover:text-maroon/70 bg-white px-4 py-2 rounded-full border border-maroon/10 hover:border-maroon/30 transition-colors"
                  >
                    {condition.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
    </>
  );
}
