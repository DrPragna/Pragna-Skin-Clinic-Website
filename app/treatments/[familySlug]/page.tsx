import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Footer from '@/components/sections/Footer';
import { treatmentFamilies, getTreatmentFamily, getConditionsForFamily } from '@/lib/navigationData';
import { getTreatmentFamilyContent } from '@/lib/content';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/ui/Reveal';
import { LuminousBackground } from '@/components/ui/LuminousBackground';

export function generateStaticParams() {
  return treatmentFamilies.map((family) => ({
    familySlug: family.slug,
  }));
}

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

  const heroTitle = content?.hero.title || family.name;
  const heroEyebrow = content?.hero.eyebrow || `${family.pillar} • TREATMENTS`;
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

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Treatments', item: 'https://pragnaskinclinic.com/treatments' },
      { '@type': 'ListItem', position: 2, name: family.pillar },
      { '@type': 'ListItem', position: 3, name: family.name, item: `https://pragnaskinclinic.com/treatments/${family.slug}` },
    ],
  };

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

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      
    <main className="overflow-x-hidden bg-beige-warm">
      
      {/* ============================================
          HERO
          ============================================ */}
      <section className="relative min-h-[65vh] flex items-center justify-center overflow-hidden bg-charcoal text-white pt-20">
        <div className="absolute inset-0 z-0">
            {content?.hero.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={content.hero.image} alt={heroTitle} className="w-full h-full object-cover opacity-50" />
            ) : (
                 <LuminousBackground pillar={family.pillar} variant="family" />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-transparent" />
        </div>

        <div className="section-container relative z-10 text-center pt-10 pb-16">
            <Reveal>
                <span className="inline-block text-white/60 font-sans text-[10px] md:text-xs tracking-[0.4em] uppercase mb-5 border border-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                    {heroEyebrow}
                </span>

                <h1 className="text-5xl md:text-6xl lg:text-7xl font-display leading-[1.1] mb-5 text-white">
                    {heroTitle}
                </h1>

                <p className="text-xl md:text-2xl text-white/80 font-light italic mb-6 max-w-2xl mx-auto">
                    {heroSubtitle}
                </p>
                
                <p className="text-base text-white/60 leading-relaxed mb-8 max-w-3xl mx-auto">
                    {heroIntro}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a 
                        href="#treatments" 
                        className="px-8 py-4 bg-white text-charcoal rounded-full font-medium hover:bg-beige-warm hover:scale-[1.02] transition-all duration-300 min-w-[180px]"
                    >
                        Explore Treatments
                    </a>
                </div>
            </Reveal>
        </div>

         <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-black/20 backdrop-blur-md py-3">
            <div className="section-container">
                 <div className="flex flex-wrap justify-center md:justify-between items-center gap-6 text-white/70 text-xs tracking-widest uppercase">
                    {trustIndicators.map((stat, i) => (
                         <Reveal key={i} delay={i * 0.1} width="fit-content">
                            <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-maroon" />
                                {stat.value} {stat.label}
                            </div>
                         </Reveal>
                    ))}
                 </div>
            </div>
        </div>
      </section>

      {/* ============================================
          WHY PRAGNA
          ============================================ */}
      <section className="py-16 bg-beige-warm">
        <div className="section-container">
            <Reveal>
                <div className="text-center mb-12">
                    <span className="text-maroon/60 font-medium uppercase tracking-[0.25em] text-[10px] mb-4 block">
                        The Pragna Difference
                    </span>
                    <h2 className="text-3xl md:text-4xl font-display text-charcoal">
                        Why Pragna
                    </h2>
                </div>
            </Reveal>

            <div className="grid lg:grid-cols-3 gap-6">
                 {whyPragnaItems.map((item, i) => (
                    <Reveal key={i} delay={i * 0.1} className="h-full">
                        <div className="group relative bg-white p-8 rounded-[2rem] shadow-sm hover:shadow-lg border border-maroon/5 transition-all duration-400 hover:-translate-y-1 overflow-hidden h-full flex flex-col">
                            <div className="absolute inset-0 bg-gradient-to-br from-white to-maroon/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                            
                            <div className="relative z-10 flex flex-col h-full">
                                <span className="text-4xl font-display text-charcoal/10 group-hover:text-maroon/15 transition-colors duration-400 block mb-4">
                                    0{i + 1}
                                </span>
                                <h3 className="text-lg font-display text-maroon mb-3">
                                    {item.title}
                                </h3>
                                <p className="text-charcoal/60 text-sm leading-relaxed flex-grow">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    </Reveal>
                 ))}
            </div>
        </div>
      </section>

      {/* ============================================
          HOW IT WORKS
          ============================================ */}
      <section className="py-12 bg-white relative overflow-hidden">
        <div className="section-container relative z-10">
             <div className="max-w-3xl mx-auto text-center mb-10">
                <Reveal>
                    <span className="text-maroon/60 font-medium uppercase tracking-[0.25em] text-[10px] mb-4 block">
                        The Process
                    </span>
                    <h2 className="text-3xl lg:text-4xl font-display text-charcoal mb-6">
                        How It <span className="italic text-maroon">Works</span>
                    </h2>
                    <p className="text-base text-charcoal/60 leading-relaxed max-w-2xl mx-auto">
                        {howItWorksDescription}
                    </p>
                </Reveal>
             </div>

             <div className="grid md:grid-cols-3 gap-8 relative">
                {howItWorksSteps.map((step, i) => (
                    <Reveal key={i} delay={i * 0.15} className="h-full">
                        <div className="group relative bg-beige-warm p-8 rounded-[2rem] h-full border border-maroon/5 hover:border-maroon/20 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col items-center text-center">
                            
                            {/* Number Circle */}
                            <div className="w-16 h-16 mb-6 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300 border border-maroon/10">
                                <span className="font-display text-xl text-maroon">
                                    0{i + 1}
                                </span>
                            </div>

                            <div>
                                <h3 className="text-xl font-display text-maroon mb-3">
                                    {step.title}
                                </h3>
                                <p className="text-charcoal/60 text-sm font-sans leading-relaxed">
                                    {step.text}
                                </p>
                            </div>
                        </div>
                    </Reveal>
                ))}
             </div>
        </div>
      </section>


      {/* ============================================
          TREATMENT OPTIONS
          ============================================ */}
      <section id="treatments" className="py-16 bg-beige-warm">
        <div className="section-container">
          <Reveal>
            <div className="text-center mb-12">
                <span className="text-maroon/60 font-medium uppercase tracking-[0.25em] text-[10px] mb-4 block">
                    Available Options
                </span>
                <h2 className="text-3xl lg:text-4xl font-display text-charcoal mb-5">
                    Sub-Treatments
                </h2>
                <p className="text-base text-charcoal/60 max-w-2xl mx-auto">
                    Select a treatment to learn more about the procedure, downtime, and expected results.
                </p>
            </div>
          </Reveal>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {family.subTreatments.map((treatment, i) => {
              const treatmentImage = (treatment as any).image;
              
              return (
                <Reveal key={treatment.slug} delay={i * 0.1} className="h-full">
                  <Link
                      href={`/treatments/${family.slug}/${treatment.slug}`}
                      className="group relative block aspect-[4/5] overflow-hidden rounded-2xl h-full"
                  >
                      {/* Background: Image or Gradient */}
                      {treatmentImage ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img 
                              src={treatmentImage}
                              alt={treatment.name}
                              className="absolute inset-0 w-full h-full object-cover transition-transform duration-600 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                          />
                      ) : (
                          <div className="absolute inset-0 transition-transform duration-600 group-hover:scale-105">
                              <LuminousBackground pillar={family.pillar} variant="sub-treatment" />
                          </div>
                      )}
                      
                      {/* Overlay - lighter for gradients */}
                      <div className={`absolute inset-0 bg-gradient-to-t ${treatmentImage ? 'from-black/90 via-black/20' : 'from-black/70 via-transparent'} to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-400`} />

                      <div className="absolute inset-0 p-6 flex flex-col justify-end">
                          <h3 className="text-xl font-display text-white mb-2 group-hover:text-white/90 transition-colors">
                              {treatment.name}
                          </h3>
                          <p className="text-white/70 text-sm mb-4 line-clamp-2 group-hover:text-white/80 transition-colors">
                              {treatment.description}
                          </p>
                          
                          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">
                              <span>View Treatment</span>
                              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                          </div>
                      </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* ============================================
          WHO IS THIS FOR
          ============================================ */}
       <section className="py-16 bg-white text-charcoal border-t border-charcoal/5">
        <div className="section-container">
            <div className="grid lg:grid-cols-12 gap-10 items-start">
                <div className="lg:col-span-4 lg:sticky lg:top-28">
                    <Reveal>
                        <div>
                            <span className="text-maroon/60 font-medium uppercase tracking-[0.25em] text-[10px] mb-4 block">
                                Suitability
                            </span>
                            <h2 className="text-3xl font-display text-charcoal mb-5">
                                Who Is This For
                            </h2>
                            <p className="text-charcoal/60 text-base leading-relaxed">
                                This treatment family is specifically curated to address these common concerns with clinical precision.
                            </p>
                        </div>
                    </Reveal>
                </div>
                
                <div className="lg:col-span-8">
                     <div className="grid md:grid-cols-2 gap-x-10 gap-y-6">
                        {whoIsThisForList.map((item, i) => (
                            <Reveal key={i} delay={i * 0.05}>
                                <div className="group flex items-start gap-4">
                                    <span className="flex-shrink-0 w-7 h-7 rounded-full border border-maroon/20 flex items-center justify-center text-maroon font-display text-sm group-hover:bg-maroon group-hover:text-white transition-all duration-300 mt-0.5">
                                        {i + 1}
                                    </span>
                                    <p className="text-base text-charcoal/75 leading-relaxed group-hover:text-charcoal transition-colors">
                                        {item}
                                    </p>
                                </div>
                            </Reveal>
                        ))}
                     </div>
                </div>
            </div>
        </div>
      </section>

      {/* ============================================
          RELATED CONDITIONS
          ============================================ */}
      {relatedConditions.length > 0 && (
        <section className="py-10 bg-beige-warm border-t border-charcoal/5">
          <div className="section-container text-center">
            <Reveal>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-maroon mb-5 block flex items-center justify-center gap-3">
                    <span className="w-6 h-px bg-maroon/30" />
                    Treats Conditions
                    <span className="w-6 h-px bg-maroon/30" />
                </span>
            </Reveal>
            <div className="flex flex-wrap items-center justify-center gap-3">
                {relatedConditions.map((condition, i) => (
                <Reveal key={condition.slug} delay={i * 0.05} width="fit-content">
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
                </Reveal>
                ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
    </>
  );
}
