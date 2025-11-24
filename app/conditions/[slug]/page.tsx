import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/sections/Footer';
import { navigationData } from '@/lib/navigationData';

export function generateStaticParams() {
  const params: { slug: string | undefined }[] = [];
  for (const group of navigationData.conditions) {
    for (const item of group.items) {
      params.push({ slug: item.href.split('/').pop() });
    }
  }
  return params;
}

export default async function ConditionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let condition;

  for (const group of navigationData.conditions) {
    const found = group.items.find(c => c.href.endsWith(slug));
    if (found) {
      condition = found;
      break;
    }
  }

  return (
    <main className="overflow-x-hidden bg-beige-warm">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-terracotta relative overflow-hidden">
        <div className="section-container relative z-10">
          <div className="max-w-4xl">
             <span className="text-maroon font-medium uppercase tracking-wider text-sm mb-4 block">
              Condition Overview
            </span>
            <h1 className="text-4xl md:text-6xl font-display text-charcoal mb-6 leading-tight">
              {condition?.name || 'Condition'}
            </h1>
            <p className="text-xl md:text-2xl text-charcoal/70 font-light leading-relaxed max-w-2xl mb-8">
              {condition?.subtitle || 'Detailed information about this condition will be available soon.'}
            </p>
            <a href="#book" className="btn-primary inline-block">
              Book a Consultation
            </a>
          </div>
        </div>
        {/* Decorative Background Element */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white/10 rounded-l-full blur-3xl transform translate-x-1/4"></div>
      </section>

      {/* Is this you? Section */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif text-maroon mb-8 text-center">Is this you?</h2>
            <div className="bg-beige-warm rounded-2xl p-8 md:p-10 shadow-soft">
              <ul className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-maroon/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-3 h-3 text-maroon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-charcoal/80 text-lg">
                      Common symptom or feeling {i} related to {condition?.name}...
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What is it & Why it happens Grid */}
      <section className="section-padding bg-beige-warm">
        <div className="section-container">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* What is it */}
            <div className="space-y-6">
              <h2 className="text-3xl font-serif text-charcoal">What is {condition?.name}?</h2>
              <div className="prose prose-lg text-charcoal/70">
                <p>
                  Short explanation of the condition in plain English. Describe what the patient sees/feels, not just the medical definition.
                </p>
                <p>
                  It affects the skin by...
                </p>
              </div>
            </div>
            
             {/* Why it happens */}
            <div className="bg-white rounded-2xl p-8 shadow-card space-y-6">
               <h3 className="text-2xl font-serif text-maroon">Why does it happen?</h3>
               <p className="text-charcoal/70">
                 Brief, patient-friendly explanation of common causes or contributing factors:
               </p>
               <ul className="space-y-3 pl-4 list-disc text-charcoal/70 marker:text-maroon">
                 <li>Hormonal changes</li>
                 <li>Environmental factors</li>
                 <li>Lifestyle and diet</li>
                 <li>Genetics</li>
               </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How we treat it */}
      <section className="section-padding bg-maroon text-beige-warm relative overflow-hidden">
        <div className="section-container relative z-10">
           <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-serif mb-6">How we treat {condition?.name} at Pragna</h2>
            <p className="text-beige-warm/80 text-lg">
              We use a combination of advanced technology and medical expertise to create a personalized treatment plan.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl hover:bg-white/10 transition-colors">
                <h3 className="text-xl font-serif mb-3">Treatment Option {i}</h3>
                <p className="text-beige-warm/70">
                  Specific laser or procedure description. How it helps reduce the symptoms effectively.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What to expect */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
               <div className="w-full aspect-[4/5] bg-terracotta/20 rounded-2xl flex items-center justify-center">
                 <p className="text-maroon/50 italic">Add photo/Add image: Doctor consultation or treatment</p>
               </div>
            </div>
            <div className="lg:col-span-7 space-y-8">
              <h2 className="text-3xl font-serif text-charcoal">What to expect</h2>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-beige-warm rounded-full flex items-center justify-center text-maroon font-serif text-xl font-bold flex-shrink-0">1</div>
                  <div>
                    <h4 className="text-xl font-medium text-charcoal mb-2">Consultation & Analysis</h4>
                    <p className="text-charcoal/70">In-depth skin analysis to understand the severity and underlying causes.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-beige-warm rounded-full flex items-center justify-center text-maroon font-serif text-xl font-bold flex-shrink-0">2</div>
                  <div>
                    <h4 className="text-xl font-medium text-charcoal mb-2">Personalized Plan</h4>
                    <p className="text-charcoal/70">Custom protocol designed for your specific skin type and lifestyle.</p>
                  </div>
                </div>
                 <div className="flex gap-4">
                  <div className="w-12 h-12 bg-beige-warm rounded-full flex items-center justify-center text-maroon font-serif text-xl font-bold flex-shrink-0">3</div>
                  <div>
                    <h4 className="text-xl font-medium text-charcoal mb-2">Treatment & Results</h4>
                    <p className="text-charcoal/70">Sessions typically take 30-60 mins. Visible improvements often seen after 2-3 sessions.</p>
                  </div>
                </div>
              </div>

              <div className="bg-beige-warm p-6 rounded-xl border border-maroon/10 mt-8">
                <h4 className="font-medium text-charcoal mb-2">Downtime & Aftercare</h4>
                <p className="text-charcoal/70 text-sm">
                  Most treatments have minimal to zero downtime. You can return to work immediately. Sun protection is mandatory.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Pragna & FAQ */}
      <section className="section-padding bg-beige-warm">
        <div className="section-container">
           <div className="max-w-3xl mx-auto text-center mb-16">
             <h2 className="text-3xl font-serif text-charcoal mb-6">Why choose Pragna for {condition?.name}?</h2>
             <div className="grid md:grid-cols-3 gap-8 text-left">
               <div className="space-y-2">
                 <h4 className="text-maroon font-medium text-lg">Dermatologist-Led</h4>
                 <p className="text-charcoal/70 text-sm">All treatments are supervised by experienced medical professionals.</p>
               </div>
               <div className="space-y-2">
                 <h4 className="text-maroon font-medium text-lg">US-FDA Approved</h4>
                 <p className="text-charcoal/70 text-sm">We use only the safest, gold-standard technology globally.</p>
               </div>
               <div className="space-y-2">
                 <h4 className="text-maroon font-medium text-lg">Holistic Approach</h4>
                 <p className="text-charcoal/70 text-sm">Addressing internal health and external symptoms together.</p>
               </div>
             </div>
           </div>

           {/* FAQs */}
           <div className="max-w-2xl mx-auto">
             <h3 className="text-2xl font-serif text-charcoal mb-6 text-center">Frequently Asked Questions</h3>
             <div className="space-y-4">
               {[1, 2].map((i) => (
                 <details key={i} className="group bg-white rounded-xl shadow-sm overflow-hidden">
                   <summary className="flex items-center justify-between p-4 cursor-pointer">
                     <span className="font-medium text-charcoal">Common question about {condition?.name}?</span>
                     <svg className="w-5 h-5 text-maroon transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                     </svg>
                   </summary>
                   <div className="px-4 pb-4 pt-0 text-charcoal/70">
                     <p>Answer explaining the details simply and clearly to the patient.</p>
                   </div>
                 </details>
               ))}
             </div>
           </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
