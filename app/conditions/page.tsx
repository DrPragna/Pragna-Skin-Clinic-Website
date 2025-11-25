import Link from 'next/link';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/sections/Footer';
import { getConditionsByGroup } from '@/lib/navigationData';

export default function ConditionsPage() {
  const conditionsByGroup = getConditionsByGroup();

  return (
    <main className="overflow-x-hidden">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-br from-terracotta/10 via-beige-warm to-white relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-radial from-terracotta/10 to-transparent rounded-full blur-3xl -translate-y-1/2" />
        
        <div className="section-container relative z-10">
          <div className="max-w-4xl">
            <span className="text-maroon font-medium uppercase tracking-[0.2em] text-xs mb-4 block">
              Conditions We Treat
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display text-charcoal mb-6 leading-[1.1]">
              What&apos;s bothering you?
            </h1>
            <p className="text-xl md:text-2xl text-charcoal/60 font-light leading-relaxed max-w-2xl">
              Start with your concern. We will guide you to the right treatment 
              based on what you are experiencing.
            </p>
          </div>
        </div>
      </section>

      {/* Conditions by Group */}
      {conditionsByGroup.map((group, groupIndex) => (
        <section 
          key={group.group}
          className={`py-20 md:py-24 ${groupIndex % 2 === 0 ? 'bg-white' : 'bg-beige-warm/30'}`}
        >
          <div className="section-container">
            {/* Group Header */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-display text-charcoal mb-2">
                {group.group}
              </h2>
              <div className="w-16 h-px bg-maroon/30" />
            </div>
            
            {/* Condition Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {group.items.map((condition) => (
                <Link
                  key={condition.slug}
                  href={`/conditions/${condition.slug}`}
                  className="group relative bg-white rounded-2xl p-6 border border-maroon/5 hover:border-maroon/20 hover:shadow-soft-lg transition-all duration-300"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-display text-charcoal group-hover:text-maroon transition-colors">
                          {condition.name}
                        </h3>
                        {condition.isTopConcern && (
                          <span className="text-[10px] bg-terracotta/20 text-maroon px-2 py-0.5 rounded-full uppercase tracking-wider">
                            Common
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-charcoal/60 leading-relaxed">
                        {condition.subtitle}
                      </p>
                    </div>
                    
                    {/* Arrow */}
                    <div className="w-8 h-8 rounded-full bg-beige-warm group-hover:bg-maroon flex items-center justify-center flex-shrink-0 transition-colors">
                      <svg 
                        className="w-4 h-4 text-maroon group-hover:text-beige-warm transition-colors" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-charcoal text-beige-warm">
        <div className="section-container text-center">
          <h2 className="text-3xl md:text-4xl font-display mb-6">
            Don&apos;t see your concern listed?
          </h2>
          <p className="text-lg text-beige-warm/70 max-w-2xl mx-auto mb-10">
            We treat many more conditions than listed here. Book a consultation and our 
            dermatologists will assess your specific situation and recommend the best approach.
          </p>
          <a 
            href="#contact" 
            className="inline-flex items-center gap-2 bg-terracotta-light text-charcoal px-8 py-4 rounded-full font-medium hover:bg-terracotta transition-colors"
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

