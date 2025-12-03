'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/sections/Footer';
import { signaturePrograms } from '@/lib/content/signature-programs';

export default function SignatureProgramsPage() {
  return (
    <main className="min-h-screen bg-beige-warm">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-[#3D3632] overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[120px] bg-maroon/20 mix-blend-overlay" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[100px] bg-rose-gold/15 mix-blend-overlay" />
        </div>
        
        <div className="section-container relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl"
          >
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-medium uppercase tracking-[0.25em] text-[10px] md:text-xs mb-6 block text-white/50"
            >
              Curated Experiences
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl md:text-7xl lg:text-8xl font-display leading-[0.9] mb-8 text-white"
            >
              Signature Programs
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="text-lg md:text-xl font-light max-w-2xl leading-relaxed text-white/70"
            >
              Thoughtfully designed treatment journeys that address your goals holistically, 
              combining multiple modalities for transformative results.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-20 md:py-28">
        <div className="section-container">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
            {signaturePrograms.map((program, index) => (
              <motion.div
                key={program.slug}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1] 
                }}
                className={index === 0 ? 'md:col-span-2 lg:col-span-1 lg:row-span-2' : ''}
              >
                <Link 
                  href={`/signature-programs/${program.slug}`}
                  className="group relative block h-full p-8 md:p-10 rounded-[2rem] bg-white border border-charcoal/5 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
                >
                  {/* Gradient Background on Hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-maroon/5 to-rose-gold/5" />

                  <div className="relative z-10 flex flex-col h-full min-h-[280px]">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-6">
                      <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-maroon">
                        {program.subtitle}
                      </span>
                      <span className="font-display text-5xl text-maroon/10 transition-opacity duration-300 group-hover:text-maroon/20">
                        {index < 9 ? `0${index + 1}` : index + 1}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h2 className="text-3xl md:text-4xl font-display text-charcoal mb-4 group-hover:translate-x-1 transition-transform duration-300">
                        {program.title}
                      </h2>
                      
                      <p className="text-charcoal/60 text-base leading-relaxed mb-6 line-clamp-3">
                        {program.description}
                      </p>

                      {/* Benefits Preview */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {program.benefits.slice(0, 3).map((benefit, i) => (
                          <span 
                            key={i}
                            className="text-xs px-3 py-1.5 rounded-full bg-maroon/5 text-maroon/70 font-medium"
                          >
                            {benefit}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-6 border-t border-charcoal/5">
                      <div className="flex items-center gap-2 text-sm text-charcoal/50">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{program.duration}</span>
                      </div>
                      
                      <div className="flex items-center text-xs uppercase tracking-widest font-medium text-charcoal/40 group-hover:text-maroon transition-colors">
                        <span>Explore</span>
                        <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="section-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-3xl md:text-4xl font-display text-charcoal mb-4">
              Not sure which program is right for you?
            </h2>
            <p className="text-charcoal/60 font-light max-w-xl mx-auto mb-8">
              Our specialists will help you choose the perfect program based on your unique goals and timeline.
            </p>
            <Link 
              href="/#contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-maroon text-cream rounded-full font-medium hover:bg-maroon-light transition-colors"
            >
              Book a Consultation
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}

