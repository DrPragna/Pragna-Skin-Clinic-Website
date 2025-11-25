import Link from 'next/link';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/sections/Footer';
import { getFamiliesByPillar } from '@/lib/navigationData';

export default function TreatmentsPage() {
  const familiesByPillar = getFamiliesByPillar();
  
  const pillarConfig = {
    Skin: { 
      description: 'Treatments for acne, pigmentation, ageing, and overall skin health.',
      gradient: 'from-terracotta/20 to-beige-warm'
    },
    Hair: { 
      description: 'Solutions for hair removal, hair growth, and scalp concerns.',
      gradient: 'from-maroon/10 to-beige-warm'
    },
    Body: { 
      description: 'Contouring, stretch marks, and body-focused rejuvenation.',
      gradient: 'from-terracotta/15 to-beige-warm'
    },
    Wellness: { 
      description: 'IV therapy, corrective procedures, and holistic wellness.',
      gradient: 'from-maroon/5 to-beige-warm'
    },
  };

  return (
    <main className="overflow-x-hidden">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-br from-beige-warm via-white to-terracotta/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-gradient-radial from-terracotta/10 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        
        <div className="section-container relative z-10">
          <div className="max-w-4xl">
            <span className="text-maroon font-medium uppercase tracking-[0.2em] text-xs mb-4 block">
              Our Treatments
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display text-charcoal mb-6 leading-[1.1]">
              Treatment Families
            </h1>
            <p className="text-xl md:text-2xl text-charcoal/60 font-light leading-relaxed max-w-2xl">
              Explore our comprehensive range of dermatologist-led treatments, organised 
              by category to help you find the right solution for your concern.
            </p>
          </div>
        </div>
      </section>

      {/* Treatment Families by Pillar */}
      {familiesByPillar.map((pillarGroup, pillarIndex) => (
        <section 
          key={pillarGroup.pillar}
          className={`py-20 md:py-28 ${pillarIndex % 2 === 0 ? 'bg-white' : 'bg-beige-warm/30'}`}
        >
          <div className="section-container">
            {/* Pillar Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
              <div>
                <span className="text-maroon font-medium uppercase tracking-[0.2em] text-xs mb-2 block">
                  {pillarGroup.pillar} Treatments
                </span>
                <h2 className="text-3xl md:text-4xl font-display text-charcoal">
                  {pillarGroup.pillar}
                </h2>
              </div>
              <p className="text-charcoal/60 max-w-md">
                {pillarConfig[pillarGroup.pillar as keyof typeof pillarConfig]?.description}
              </p>
            </div>
            
            {/* Family Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pillarGroup.families.map((family, index) => (
                <Link
                  key={family.slug}
                  href={`/treatments/${family.slug}`}
                  className="group relative bg-gradient-to-br from-white to-beige-warm/50 rounded-3xl p-8 border border-maroon/5 hover:border-maroon/20 hover:shadow-soft-xl transition-all duration-300 overflow-hidden"
                >
                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-maroon/0 to-maroon/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="relative z-10">
                    {/* Number badge */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-xs font-mono text-maroon/40 uppercase tracking-wider">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <svg 
                        className="w-5 h-5 text-maroon opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                    
                    {/* Content */}
                    <h3 className="text-xl font-display text-charcoal group-hover:text-maroon transition-colors mb-3">
                      {family.name}
                    </h3>
                    <p className="text-charcoal/60 text-sm leading-relaxed mb-4">
                      {family.summary}
                    </p>
                    
                    {/* Sub-treatment count */}
                    <div className="flex items-center gap-2 text-sm text-maroon/60">
                      <span>{family.subTreatments.length} treatments</span>
                      <span className="text-maroon/30">•</span>
                      <span className="group-hover:underline underline-offset-4">View options</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-maroon text-beige-warm">
        <div className="section-container text-center">
          <h2 className="text-3xl md:text-4xl font-display mb-6">
            Not sure where to start?
          </h2>
          <p className="text-lg text-beige-warm/70 max-w-2xl mx-auto mb-10">
            Our dermatologists can help you find the right treatment based on your concerns, 
            skin type, and goals. Book a consultation to get personalised recommendations.
          </p>
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
      </section>

      <Footer />
    </main>
  );
}

