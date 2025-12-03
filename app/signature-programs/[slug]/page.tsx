import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/sections/Footer';
import { signaturePrograms, getSignatureProgram } from '@/lib/content/signature-programs';
import { Reveal } from '@/components/ui/Reveal';

export function generateStaticParams() {
  return signaturePrograms.map((program) => ({
    slug: program.slug,
  }));
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params;
  const program = getSignatureProgram(slug);
  
  if (!program) {
    return { title: 'Program Not Found' };
  }
  
  return {
    title: `${program.title} | Signature Programs | Pragna Skin Clinic`,
    description: program.description,
  };
}

export default async function SignatureProgramPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const program = getSignatureProgram(slug);
  
  if (!program) {
    notFound();
  }

  return (
    <main className="overflow-x-hidden bg-white">
      <Navbar />

      {/* 1. HERO SECTION - Editorial Split */}
      <section className="relative pt-20 min-h-screen flex flex-col lg:flex-row">
        {/* Left: Image */}
        <div className="lg:w-1/2 h-[60vh] lg:h-auto relative bg-charcoal overflow-hidden">
          {program.heroImage ? (
             // eslint-disable-next-line @next/next/no-img-element
             <img 
               src={program.heroImage} 
               alt={program.title} 
               className="absolute inset-0 w-full h-full object-cover opacity-90"
             />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-charcoal to-black">
               <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay" />
            </div>
          )}
          
          {/* Mobile Overlay Text (Visible only on small screens) */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent lg:hidden flex items-end p-8">
            <div>
              <span className="text-maroon/80 text-xs tracking-[0.25em] uppercase font-medium mb-2 block">
                {program.subtitle}
              </span>
              <h1 className="text-4xl font-display text-white mb-2">
                {program.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Right: Minimalist Typography Content */}
        <div className="lg:w-1/2 bg-white flex items-center p-8 lg:p-20 xl:p-24">
          <div className="max-w-xl">
            <Reveal>
              <span className="hidden lg:block text-maroon text-xs tracking-[0.25em] uppercase font-medium mb-6">
                {program.subtitle}
              </span>
              <h1 className="hidden lg:block text-6xl xl:text-7xl font-display text-charcoal mb-8 leading-[0.9]">
                {program.title}
              </h1>
              
              <div className="flex items-center gap-4 mb-10 text-sm text-charcoal/40 font-mono uppercase tracking-wider">
                <span>{program.duration}</span>
                <span className="w-px h-4 bg-charcoal/20" />
                <span>Signature Series</span>
              </div>

              <p className="text-lg lg:text-xl text-charcoal/70 font-light leading-relaxed mb-12">
                {program.longDescription}
              </p>

              <div className="flex flex-wrap gap-6">
                <a 
                  href="#booking" 
                  className="px-8 py-4 bg-maroon text-white rounded-full font-medium hover:bg-charcoal transition-colors duration-300 min-w-[200px] text-center"
                >
                  Book Consultation
                </a>
                <a 
                  href="#process" 
                  className="px-8 py-4 border border-charcoal/10 text-charcoal rounded-full font-medium hover:bg-charcoal/5 transition-colors duration-300"
                >
                  View Journey
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 2. BENEFITS - Minimal Grid */}
      <section className="py-20 bg-beige-warm/30">
        <div className="section-container">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {program.benefits.map((benefit, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="flex flex-col gap-4 border-t border-maroon/20 pt-6">
                  <span className="text-maroon/40 font-display text-2xl">0{i + 1}</span>
                  <p className="text-charcoal font-medium text-lg">{benefit}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3. THE JOURNEY - Timeline */}
      <section id="process" className="py-24 lg:py-32 bg-white">
        <div className="section-container max-w-4xl mx-auto">
          <Reveal>
            <div className="text-center mb-20">
              <span className="text-maroon/60 font-medium uppercase tracking-[0.25em] text-[10px] mb-4 block">
                The Protocol
              </span>
              <h2 className="text-4xl lg:text-5xl font-display text-charcoal">
                Your Journey
              </h2>
            </div>
          </Reveal>

          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-[20px] top-4 bottom-4 w-px bg-charcoal/10 md:left-1/2 md:-translate-x-1/2" />

            <div className="space-y-16">
              {program.process.map((step, i) => (
                <Reveal key={i} width="100%">
                  <div className={`flex flex-col md:flex-row gap-8 md:gap-0 items-start ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                    {/* Content Side */}
                    <div className="pl-14 md:pl-0 md:w-1/2 md:px-12 pt-2">
                      <div className={`md:text-${i % 2 === 0 ? 'left' : 'right'}`}>
                         <span className="text-maroon font-mono text-xs uppercase tracking-widest mb-2 block">
                           {step.duration}
                         </span>
                         <h3 className="text-2xl font-display text-charcoal mb-3">
                           {step.title}
                         </h3>
                         <p className="text-charcoal/60 leading-relaxed font-light">
                           {step.description}
                         </p>
                      </div>
                    </div>

                    {/* Center Marker */}
                    <div className="absolute left-[20px] md:left-1/2 md:-translate-x-1/2 w-10 h-10 flex items-center justify-center">
                      <div className="w-3 h-3 bg-maroon rounded-full ring-4 ring-white" />
                    </div>

                    {/* Empty Side for balance */}
                    <div className="hidden md:block md:w-1/2" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. INCLUSIONS - Card Style */}
      <section className="py-24 bg-charcoal text-white">
        <div className="section-container">
           <div className="grid lg:grid-cols-2 gap-16 items-center">
             <Reveal>
                <div>
                  <h2 className="text-4xl lg:text-5xl font-display mb-8">
                    What's Included
                  </h2>
                  <p className="text-white/60 text-lg font-light leading-relaxed max-w-md mb-12">
                    A comprehensive package designed to ensure you have everything you need for optimal results.
                  </p>
                  <ul className="space-y-4">
                    {program.idealFor.map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-white/80">
                         <span className="w-1.5 h-1.5 bg-maroon rounded-full" />
                         Ideal for: {item}
                      </li>
                    ))}
                  </ul>
                </div>
             </Reveal>

             <div className="grid gap-4">
                {program.inclusions.map((inc, i) => (
                  <Reveal key={i} delay={i * 0.1}>
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl flex items-center justify-between hover:bg-white/10 transition-colors duration-300">
                      <span className="text-xl font-display">{inc.item}</span>
                      <span className="text-white/50 text-sm font-mono uppercase tracking-widest">{inc.detail}</span>
                    </div>
                  </Reveal>
                ))}
             </div>
           </div>
        </div>
      </section>
      
      {/* 5. CTA */}
      <section id="booking" className="py-24 bg-maroon text-white text-center">
        <div className="section-container max-w-3xl">
           <Reveal>
             <h2 className="text-4xl lg:text-6xl font-display mb-8">
               Ready to begin?
             </h2>
             <p className="text-white/80 text-xl font-light mb-10">
               Schedule your initial consultation to customize this program for your unique needs.
             </p>
             <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/contact" className="px-10 py-4 bg-white text-maroon rounded-full font-medium hover:bg-beige-warm transition-colors min-w-[200px]">
                  Book Appointment
                </Link>
                <a href="tel:+919876543210" className="px-10 py-4 border border-white/30 text-white rounded-full font-medium hover:bg-white/10 transition-colors min-w-[200px]">
                  Call Clinic
                </a>
             </div>
           </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}

