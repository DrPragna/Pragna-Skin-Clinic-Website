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
    credentials: 'MBBS, DVD, DNB',
    experience: '25+ Years of Excellence',
    bio: 'A pioneer in clinical dermatology, Dr. Padmavathi has spent over two decades refining the art of skin care. Known for her diagnostic precision and ethical approach, she combines deep medical knowledge with an eye for aesthetic harmony.',
    image: '/doctors/padmavathi-portrait.jpg', // Placeholder path
    signature: 'Expertise & Ethics',
    badge: '25+ Years Experience',
  },
  {
    id: 'pragna',
    name: 'Dr. Pragna Surapaneni',
    role: 'Consultant Dermatologist',
    credentials: 'MBBS, MD (Dermatology)',
    experience: 'Advanced Laser Specialist',
    bio: 'Representing the next generation of dermatology, Dr. Pragna specializes in advanced laser technologies and cosmetic procedures. Her approach is holistic, ensuring every treatment is tailored to the patient’s unique lifestyle and goals.',
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
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {doctors.map((doctor, index) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.2,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="flex flex-col items-center text-center bg-white p-8 rounded-[2.5rem] shadow-sm border border-maroon/5 hover:shadow-md transition-all duration-500 group"
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
              <div className="w-full max-w-md space-y-4">
                  <div>
                  <h3 className="text-2xl lg:text-3xl font-display text-charcoal font-medium mb-1">
                      {doctor.name}
                    </h3>
                  <p className="text-base text-maroon/80 font-medium italic">
                    {doctor.role}
                  </p>
                  </div>
                  
                <div className="w-12 h-px bg-maroon/30 mx-auto" />

                <div className="space-y-3">
                  <p className="text-charcoal/90 text-sm lg:text-base leading-relaxed font-normal line-clamp-4 lg:line-clamp-none">
                    {doctor.bio}
                  </p>
                  
                  <div className="pt-1">
                    <p className="text-[10px] text-maroon/60 uppercase tracking-widest mb-1 font-bold">Credentials</p>
                    <p className="text-charcoal font-medium font-sans text-sm">{doctor.credentials}</p>
                  </div>
                </div>

                <div className="pt-3">
                  <a href="#contact" className="inline-flex items-center gap-2 text-maroon text-xs uppercase tracking-widest hover:opacity-70 transition-opacity group">
                    <span>Book Consultation</span>
                    <svg className="w-3 h-3 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
