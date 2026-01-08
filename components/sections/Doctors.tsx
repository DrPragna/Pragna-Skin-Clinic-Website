'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

/**
 * DOCTORS SECTION - Editorial Profiles Side-by-Side
 * 
 * Design Philosophy:
 * - Large, magazine-style portraits
 * - Side-by-side comparison of expertise
 * - Narrative focus on expertise
 */

const doctors = [
  {
    id: 'padmavathi',
    name: 'Dr. Padmavathi Surapaneni',
    role: 'Senior Dermatologist & Founder',
    credentials: 'MBBS, DD',
    experience: '25+ Years of Excellence',
    bio: 'A pioneer in clinical and aesthetic dermatology in South India with over 25 years of experience. She was among the first to introduce advanced technologies like HIFU and cryolipolysis to the region, combining diagnostic precision with an eye for aesthetic harmony.',
    highlights: [
      'Renowned National & International Faculty',
      'Speaker at IMCAS Paris & 5CC Barcelona',
      'National Trainer for Injectables & Lasers'
    ],
    image: '/doctors/padmavathi-portrait.jpg', // Placeholder path
    signature: 'Expertise & Ethics',
    badge: '25+ Years Experience',
  },
  {
    id: 'pragna',
    name: 'Dr. Pragna Surapaneni',
    role: 'Consultant Dermatologist',
    credentials: 'MBBS, MD, MRCP-SCE (UK)',
    experience: 'Advanced Aesthetic Dermatology',
    bio: 'A State Ranker and Gold Medalist, Dr. Pragna combines strong academic grounding with advanced aesthetic training. She specialises in personalised, results-driven care that balances medical safety with refined, natural-looking outcomes.',
    highlights: [
      'State Ranker & Gold Medalist in Dermatology',
      'MRCP-SCE (UK) Certified'
    ],
    image: '/doctors/pragna-portrait.jpg', // Placeholder path
    signature: 'Innovation & Care',
    badge: 'Gold Medalist',
  },
];

export default function Doctors() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  return (
    <section 
      id="about"
      ref={containerRef}
      className="py-12 lg:py-16 bg-cream relative overflow-hidden"
    >
      <div className="section-container max-w-6xl mx-auto">
        {/* Section Header - Center Aligned */}
        <div className="text-center mb-12 lg:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-maroon font-medium tracking-[0.2em] uppercase text-xs block mb-4"
          >
              Our Experts
          </motion.span>
            <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl lg:text-5xl font-display text-charcoal"
            >
            Meet the <span className="italic text-maroon">Dermatologists</span>
            </motion.h2>
        </div>

        {/* Doctor Profiles - Side by Side Grid - More Compact */}
        <motion.div 
          className="grid lg:grid-cols-2 gap-8 lg:gap-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {doctors.map((doctor, index) => (
            <div
              key={doctor.id}
              className="flex flex-col items-center text-center bg-white p-8 rounded-[2.5rem] shadow-sm border border-maroon/5 hover:shadow-md transition-all duration-500 group h-full"
            >
              {/* Image Section - Even Smaller */}
              <div className="w-full max-w-[260px] relative mb-8 group-hover:scale-105 transition-transform duration-700">
                <div className="relative aspect-[4/5] overflow-visible rounded-[2rem] shadow-xl shadow-maroon/5">
                  <div className="absolute inset-0 rounded-[2rem] overflow-hidden">
                    {/* Portrait Placeholder / Image */}
                    <div className="absolute inset-0 bg-beige-warm flex items-center justify-center">
                      {/* Actual Image would go here */}
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
                      <span className="text-maroon/20 font-display text-xl italic">
                        Portrait
                      </span>
                    </div>
                  </div>

                  {/* Floating Badge - Creative Positioning */}
                  <div className="absolute -bottom-6 -right-6 z-20">
                    <motion.div 
                      whileHover={{ scale: 1.05, rotate: 2 }}
                      className="bg-cream border border-maroon/10 px-5 py-2.5 rounded-xl shadow-lg shadow-maroon/10 flex items-center gap-3"
                    >
                      <div className="w-8 h-8 rounded-full bg-rose-gold/20 flex items-center justify-center text-maroon">
                        {index === 0 ? (
                          <span className="text-xs font-bold">25+</span>
                        ) : (
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z" />
                          </svg>
                        )}
                    </div>
                      <span className="text-maroon font-display text-sm font-medium whitespace-nowrap">{doctor.badge}</span>
                    </motion.div>
                    </div>

                  {/* Subtle Frame Border */}
                  <div className="absolute inset-0 border border-white/20 rounded-[2rem] z-10 pointer-events-none" />
                </div>
                </div>

              {/* Text Content - Improved Contrast */}
              <div className="w-full max-w-md flex flex-col flex-1">
                  <div className="mb-4">
                    <h3 className="text-2xl lg:text-3xl font-display text-charcoal font-medium mb-1">
                      {doctor.name}
                    </h3>
                    <p className="text-base text-maroon/80 font-medium italic">
                      {doctor.role}
                    </p>
                  </div>
                  
                <div className="w-12 h-px bg-maroon/30 mx-auto mb-4" />

                <div className="flex-1 flex flex-col gap-4">
                  <p className="text-charcoal/90 text-sm lg:text-base leading-relaxed font-normal">
                    {doctor.bio}
                  </p>

                  {/* Highlights Section */}
                  {doctor.highlights && (
                    <div className="py-3 px-4 bg-maroon/[0.03] rounded-xl border border-maroon/5">
                      <ul className="space-y-2">
                        {doctor.highlights.map((item, i) => (
                          <li key={i} className="text-xs lg:text-sm text-maroon/80 font-medium flex items-center justify-center gap-2 text-center">
                            <span className="w-1.5 h-1.5 rounded-full bg-maroon/40 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div className="pt-2 border-t border-maroon/5 mt-auto">
                    <p className="text-[10px] text-maroon/60 uppercase tracking-widest mb-1 font-bold">Credentials</p>
                    <p className="text-charcoal font-medium font-sans text-sm">{doctor.credentials}</p>
                  </div>
                </div>

                <div className="pt-6 mt-auto">
                  <a 
                    href="#contact" 
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-maroon/20 text-maroon text-xs uppercase tracking-widest font-medium hover:bg-maroon hover:text-white hover:border-maroon transition-all duration-300 group"
                  >
                    <span>Book Consultation</span>
                    <svg className="w-3 h-3 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
