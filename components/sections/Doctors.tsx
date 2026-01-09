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
    image: '/images/Dr Padmavathi.jpg',
    imageStyle: 'scale-[1.4] object-[center_15%]',
    signature: 'Expertise & Ethics',
    badge: '25+ Years Experience',
  },
  {
    id: 'pragna',
    name: 'Dr. Pragna Surapaneni',
    role: 'Dermatologist',
    credentials: 'MBBS, MD, MRCP-SCE (UK)',
    experience: 'Advanced Aesthetic Dermatology',
    bio: 'A State Ranker and Gold Medalist, Dr. Pragna combines strong academic grounding with advanced aesthetic training. She specialises in personalised, results-driven care that balances medical safety with refined, natural-looking outcomes.',
    highlights: [
      'State Ranker & Gold Medalist in Dermatology',
      'MRCP-SCE (UK) Certified'
    ],
    image: '/images/Dr Pragna.jpg',
    imageStyle: 'scale-[1.6] object-[center_12%]',
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
      className="py-12 lg:py-24 bg-cream relative overflow-hidden"
    >
      {/* Cinematic Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated Orbs - Enhanced Visibility */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-40">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-rose-gold/20 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-maroon/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '1s' }} />
        </div>
        
        {/* Grain Texture - Local subtle grain if global isn't enough */}
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
        />
      </div>

      <div className="section-container max-w-6xl mx-auto relative z-10">
        {/* Section Header - Center Aligned */}
        <div className="text-center mb-16 lg:mb-24">
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
              className="text-4xl lg:text-6xl font-display text-charcoal"
            >
            Meet the <span className="italic text-maroon relative inline-block">
              Dermatologists
              <span className="absolute -bottom-2 left-0 w-full h-px bg-gradient-to-r from-transparent via-maroon/30 to-transparent" />
            </span>
            </motion.h2>
        </div>

        {/* Doctor Profiles - Side by Side Grid - Glassmorphism */}
        <motion.div 
          className="grid lg:grid-cols-2 gap-8 lg:gap-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {doctors.map((doctor, index) => (
            <div
              key={doctor.id}
              className="flex flex-col items-center text-center bg-white/60 backdrop-blur-md p-8 lg:p-10 rounded-[2rem] border border-white/50 shadow-lg shadow-maroon/5 hover:shadow-xl hover:shadow-maroon/10 transition-all duration-700 group h-full relative overflow-hidden"
            >
              {/* Card Highlight Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-transparent to-transparent opacity-50" />
              
              {/* Image Section */}
              <div className="w-full max-w-[300px] relative mb-10 group-hover:scale-[1.02] transition-transform duration-700 z-10">
                <div className="relative aspect-[4/5] overflow-visible">
                  <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl shadow-maroon/10">
                    {/* Doctor Portrait Image - Cinematic Treatment */}
                    <Image
                      src={doctor.image}
                      alt={doctor.name}
                      fill
                      className={`object-cover ${doctor.imageStyle} brightness-[1.03] contrast-[1.05] saturate-[0.9] transition-all duration-700 group-hover:scale-110 group-hover:brightness-[1.08] group-hover:saturate-100`}
                      sizes="(max-width: 768px) 300px, 300px"
                    />
                    {/* Cinematic Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-maroon/20 via-transparent to-transparent opacity-60 mix-blend-multiply group-hover:opacity-40 transition-opacity duration-700" />
                    
                    {/* Inner Border */}
                    <div className="absolute inset-0 border border-white/10 rounded-2xl z-10" />
                  </div>

                  {/* Floating Badge - Centered & Elegant */}
                  <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 z-20 w-max max-w-[90%]">
                    <motion.div 
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="bg-white/95 backdrop-blur-sm border border-maroon/10 px-6 py-2.5 rounded-full shadow-lg flex items-center gap-2.5 mx-auto"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-gold animate-pulse" />
                      <span className="text-maroon font-display text-sm font-medium whitespace-nowrap tracking-wide">{doctor.badge}</span>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Text Content - Elegant Typography */}
              <div className="w-full max-w-md flex flex-col flex-1 relative z-10">
                  <div className="mb-6">
                    <h3 className="text-3xl lg:text-4xl font-display text-charcoal font-medium mb-2 leading-tight">
                      {doctor.name}
                    </h3>
                    <p className="text-sm tracking-widest uppercase text-maroon/80 font-medium">
                      {doctor.role}
                    </p>
                  </div>
                  
                <div className="w-full h-px bg-gradient-to-r from-transparent via-maroon/20 to-transparent mb-6" />

                <div className="flex-1 flex flex-col gap-5">
                  <p className="text-charcoal/80 text-base leading-relaxed font-light text-center">
                    {doctor.bio}
                  </p>

                  {/* Highlights Section */}
                  {doctor.highlights && (
                    <div className="py-2 flex justify-center">
                      <ul className="space-y-2 text-left inline-block">
                        {doctor.highlights.map((item, i) => (
                          <li key={i} className="flex items-center gap-3 group/item">
                            <span className="w-1 h-1 rounded-full bg-rose-gold group-hover/item:scale-150 transition-transform duration-300" />
                            <span className="text-sm text-charcoal/70 font-medium group-hover/item:text-charcoal transition-colors duration-300">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div className="pt-4 mt-auto">
                    <p className="text-[10px] text-maroon/50 uppercase tracking-[0.2em] mb-2 font-bold text-center">Credentials</p>
                    <p className="text-charcoal/90 font-serif italic text-lg">{doctor.credentials}</p>
                  </div>
                </div>

                <div className="pt-8 mt-auto">
                  <a 
                    href="#contact" 
                    className="inline-flex items-center gap-3 px-8 py-3 rounded-full bg-maroon text-white text-xs uppercase tracking-widest font-medium hover:bg-charcoal transition-all duration-500 shadow-lg shadow-maroon/20 hover:shadow-charcoal/20 group/btn"
                  >
                    <span>Book Consultation</span>
                    <svg className="w-3 h-3 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
