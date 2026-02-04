'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { SignatureProgram } from '@/lib/content/signature-programs';
import { Reveal } from '@/components/ui/Reveal';
import BookingButton from '@/components/ui/BookingButton';
import Footer from '@/components/sections/Footer';

// --- Accordion Component for FAQs ---
function AccordionItem({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`bg-white rounded-xl border transition-all duration-300 overflow-hidden ${isOpen ? 'border-maroon/20 shadow-sm' : 'border-charcoal/5'}`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-start justify-between p-5 text-left"
      >
        <span className={`text-sm font-medium pr-4 font-display ${isOpen ? 'text-maroon' : 'text-charcoal'} transition-colors`}>
          {title}
        </span>
        <span className={`transform transition-transform duration-300 flex-shrink-0 mt-0.5 ${isOpen ? 'rotate-180' : ''} text-maroon/50`}>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="px-5 pb-5 pt-0">
               <div className="text-sm text-charcoal/70 leading-relaxed border-t border-charcoal/5 pt-3">
                 {children}
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function MobileSignatureProgram({ program }: { program: SignatureProgram }) {
  
  return (
    <div className="w-full bg-white overflow-x-hidden min-h-screen">
      
      {/* ==================== 
          1. IMMERSIVE HERO (85svh)
      ==================== */}
      <section className="relative h-[85svh] w-full flex flex-col justify-end bg-charcoal">
        <div className="absolute inset-0 z-0">
            <Image
                src={program.image}
                alt={program.title}
                fill
                className="object-cover"
                style={{ objectPosition: program.imagePosition || 'center' }}
                priority
            />
            {/* Scrim Gradient for text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/80" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 px-6 pb-16">
            <Reveal>
                <div className="inline-block px-3 py-1 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white/90 font-sans text-[10px] tracking-[0.2em] uppercase mb-4 shadow-sm">
                    {program.subtitle}
                </div>

                <h1 className="text-5xl font-display text-white leading-[0.95] mb-4 shadow-sm">
                    {program.title}
                </h1>
                
                <div className="flex items-center gap-3 text-white/80 text-xs font-medium tracking-widest uppercase mb-6">
                    <span>{program.duration}</span>
                    <span className="w-1 h-1 rounded-full bg-white/50" />
                    <span>Signature Series</span>
                </div>

                <BookingButton 
                    className="w-full py-4 bg-white text-maroon rounded-full font-medium active:scale-95 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.15)] flex items-center justify-center gap-2"
                    programName={program.title}
                >
                    Book Consultation
                </BookingButton>
            </Reveal>
        </div>
      </section>

      {/* ==================== 
          SHEET CONTAINER
      ==================== */}
      <div className="relative z-20 bg-white -mt-8 rounded-t-[2.5rem] shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.1)] overflow-hidden">
        
        {/* --- ABOUT THE PROGRAMME --- */}
        <section className="px-6 pt-10 pb-8">
            <span className="text-maroon/60 font-medium uppercase tracking-[0.2em] text-[10px] block mb-3">
                About the Programme
            </span>
            <h2 className="text-2xl font-display text-charcoal mb-4">
                What is {program.title}?
            </h2>
            <p className="text-charcoal/70 text-base leading-relaxed font-light mb-8">
                {program.longDescription}
            </p>

            <div className="grid grid-cols-1 gap-8 pt-8 border-t border-charcoal/5">
                {/* --- AT A GLANCE (Horizontal Text) --- */}
                <div>
                    <span className="text-maroon/60 font-medium uppercase tracking-[0.2em] text-[10px] block mb-3">
                        At a Glance
                    </span>
                    <p className="text-charcoal/80 text-base leading-relaxed font-light">
                        {program.benefits.slice(0, 4).map((benefit, i, arr) => (
                            <span key={i}>
                                {benefit}
                                {i < arr.length - 1 && (
                                    <span className="mx-2.5 text-maroon/40 inline-block">•</span>
                                )}
                            </span>
                        ))}
                    </p>
                </div>

                {/* --- IDEAL FOR (Horizontal Text) --- */}
                <div>
                    <span className="text-maroon/60 font-medium uppercase tracking-[0.2em] text-[10px] block mb-3">
                        Ideal For
                    </span>
                    <p className="text-charcoal/70 text-base font-medium leading-relaxed">
                        {program.idealFor.map((item, i, arr) => (
                            <span key={i}>
                                {item}
                                {i < arr.length - 1 && (
                                    <span className="mx-2.5 text-maroon/40 inline-block">•</span>
                                )}
                            </span>
                        ))}
                    </p>
                </div>
            </div>
        </section>

        {/* --- PROTOCOL (Vertical Timeline) --- */}
        <section className="px-6 py-12 bg-[#FAF9F6] border-t border-charcoal/5">
            <div className="mb-8">
                <span className="text-maroon/60 font-medium uppercase tracking-[0.2em] text-[10px] block mb-2">
                    Treatment Timeline
                </span>
                <h2 className="text-2xl font-display text-charcoal">
                    The Protocol
                </h2>
            </div>

            <div className="relative pl-4 space-y-10 border-l border-maroon/20 ml-2">
                {program.process.map((step, i) => (
                    <Reveal key={i} delay={i * 0.1}>
                        <div className="relative pl-8">
                            {/* Dot */}
                            <div className="absolute -left-[21px] top-0 w-10 h-10 rounded-full bg-white flex items-center justify-center border border-maroon/10 shadow-sm z-10">
                                <div className="w-2.5 h-2.5 rounded-full bg-maroon" />
                            </div>
                            
                            <span className="text-[10px] text-maroon/60 uppercase tracking-widest mb-1 block font-medium">
                                {step.duration}
                            </span>
                            <h3 className="text-lg font-display text-maroon mb-2">
                                {step.title}
                            </h3>
                            <p className="text-sm text-charcoal/70 leading-relaxed">
                                {step.description}
                            </p>
                        </div>
                    </Reveal>
                ))}
            </div>
        </section>

        {/* --- FAQs --- */}
        <section className="px-6 py-10 bg-white">
            <div className="mb-6">
                <span className="text-maroon/60 font-medium uppercase tracking-[0.2em] text-[10px] block mb-2">
                    Common Questions
                </span>
                <h2 className="text-2xl font-display text-charcoal">
                    FAQs
                </h2>
            </div>
            <div className="space-y-3">
                {program.faqs.map((faq, i) => (
                    <AccordionItem key={i} title={faq.question}>
                        {faq.answer}
                    </AccordionItem>
                ))}
            </div>
        </section>

        {/* --- READY TO BEGIN (CTA) - Matches Conditions Detail Page --- */}
        <section className="py-12 px-6 bg-maroon relative overflow-hidden">
             <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay" />
             
             <div className="relative z-10 text-center">
                <h2 className="text-3xl font-display text-white mb-3">
                    Ready to begin?
                </h2>
                <p className="text-white/80 text-sm mb-8 max-w-xs mx-auto leading-relaxed">
                    Schedule your consultation for <span className="italic text-white">{program.title}</span>. Our experts will customize the protocol for you.
                </p>
                
                <BookingButton 
                    className="w-full py-4 rounded-full font-medium text-sm transition-transform active:scale-95 bg-white text-maroon shadow-lg shadow-black/20 mb-8 flex items-center justify-center gap-2"
                    programName={program.title}
                >
                    Book Consultation
                </BookingButton>
                
                {/* Clinic Numbers */}
                <div className="flex flex-col gap-4 pt-6 border-t border-white/10">
                    <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase tracking-widest text-white/50">Punjagutta</span>
                        <a href="tel:09848367000" className="text-white hover:text-white/80 transition-colors flex items-center gap-2 text-sm font-medium">
                            098483 67000
                        </a>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase tracking-widest text-white/50">Kokapet</span>
                        <a href="tel:08886421111" className="text-white hover:text-white/80 transition-colors flex items-center gap-2 text-sm font-medium">
                            088864 21111
                        </a>
                    </div>
                </div>
             </div>
        </section>

      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
