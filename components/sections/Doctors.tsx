'use client';

import { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

/**
 * DOCTORS SECTION - Editorial Profiles Side-by-Side
 * 
 * Design Philosophy:
 * - Desktop: Side-by-side editorial comparison (unchanged)
 * - Mobile: "Hero Morph" (Apple Today Tab Style)
 *   - Clean "Cover" view with moniker
 *   - Tap to expand into full immersive story
 */

const doctors = [
  {
    id: 'padmavathi',
    name: 'Dr. Padmavathi Surapaneni',
    shortName: 'Dr. Padmavathi',
    role: 'Senior Dermatologist & Founder',
    moniker: '25+ Years Experience',
    credentials: 'MBBS, DD',
    experience: '25+ Years of Excellence',
    bio: 'A pioneer in clinical and aesthetic dermatology in South India with over 25 years of experience. She was among the first to introduce advanced technologies like HIFU and cryolipolysis to the region, combining diagnostic precision with an eye for aesthetic harmony.',
    highlights: [
      'Renowned National & International Faculty',
      'Speaker at IMCAS Paris & 5CC Barcelona',
      'National Trainer for Injectables & Lasers'
    ],
    image: '/images/Dr Padmavathi.jpg',
    imageStyle: 'object-[center_15%]',
    expandedImageStyle: 'object-[center_25%]',
    badge: '25+ Years Experience',
  },
  {
    id: 'pragna',
    name: 'Dr. Pragna Surapaneni',
    shortName: 'Dr. Pragna',
    role: 'Dermatologist',
    moniker: 'Gold Medalist',
    credentials: 'MBBS, MD, MRCP-SCE (UK)',
    experience: 'Advanced Aesthetic Dermatology',
    bio: 'A State Ranker and Gold Medalist, Dr. Pragna combines strong academic grounding with advanced aesthetic training. She specialises in personalised, results-driven care that balances medical safety with refined, natural-looking outcomes.',
    highlights: [
      'State Ranker & Gold Medalist in Dermatology',
      'MRCP-SCE (UK) Certified'
    ],
    image: '/images/Dr Pragna.jpg',
    imageStyle: 'object-[center_12%]',
    expandedImageStyle: 'object-[center_22%]',
    badge: 'Gold Medalist',
  },
];

// --- DESKTOP COMPONENT (Unchanged style, simplified for clarity) ---
function DesktopDoctorCard({ doctor }: { doctor: typeof doctors[0] }) {
  return (
    <div className="flex flex-col items-center text-center bg-white p-6 md:p-8 rounded-2xl border border-maroon/5 shadow-md shadow-maroon/5 hover:shadow-xl hover:shadow-maroon/10 transition-all duration-500 group h-full relative overflow-hidden">
      {/* Image Section */}
      <div className="w-full max-w-[240px] lg:max-w-[280px] relative mb-8 z-10">
        <div className="relative aspect-[3/4] overflow-hidden rounded-t-[10rem] rounded-b-3xl shadow-2xl shadow-maroon/10 group-hover:shadow-maroon/20 transition-all duration-500">
          <div className="absolute inset-0 overflow-hidden rounded-t-[10rem] rounded-b-3xl">
            <div className="relative w-full h-full transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 will-change-transform">
              <Image
                src={doctor.image}
                alt={doctor.name}
                fill
                className={`object-cover ${doctor.imageStyle} brightness-[1.02] contrast-[1.05] saturate-[0.95]`}
                sizes="(max-width: 768px) 300px, 300px"
              />
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-maroon/20 via-transparent to-transparent opacity-40 mix-blend-multiply transition-opacity duration-500" />
        </div>
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-20 w-max max-w-[90%]">
          <div className="bg-white border border-maroon/10 px-4 py-2 lg:px-5 rounded-full shadow-lg flex items-center gap-2 transition-transform hover:scale-105 hover:-translate-y-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-gold animate-pulse" />
            <span className="text-maroon font-display text-xs lg:text-sm font-medium whitespace-nowrap tracking-wide">{doctor.badge}</span>
          </div>
        </div>
      </div>

      {/* Text Content */}
      <div className="w-full max-w-md flex flex-col flex-1 relative z-10">
        <div className="mb-6">
          <h3 className="text-2xl lg:text-4xl font-display text-charcoal font-medium mb-2 leading-tight">
            {doctor.name}
          </h3>
          <p className="text-xs lg:text-sm tracking-widest uppercase text-maroon/80 font-medium">
            {doctor.role}
          </p>
        </div>
        <div className="w-full h-px bg-gradient-to-r from-transparent via-maroon/20 to-transparent mb-6" />
        <div className="flex-1 flex flex-col gap-5">
          <p className="text-charcoal/80 text-sm lg:text-base leading-relaxed font-light text-center">
            {doctor.bio}
          </p>
          {doctor.highlights && (
            <div className="py-2 flex justify-center">
              <ul className="space-y-2 text-left inline-block">
                {doctor.highlights.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 group/item">
                    <span className="w-1 h-1 rounded-full bg-rose-gold mt-2 group-hover/item:scale-150 transition-transform duration-300 shrink-0" />
                    <span className="text-xs lg:text-sm text-charcoal/70 font-medium group-hover/item:text-charcoal transition-colors duration-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="pt-4 mt-auto">
            <p className="text-[10px] text-maroon/50 uppercase tracking-[0.2em] mb-2 font-bold text-center">Credentials</p>
            <p className="text-charcoal/90 font-serif italic text-base lg:text-lg">{doctor.credentials}</p>
          </div>
        </div>
        <div className="pt-8 mt-auto">
          <a href="#contact" className="inline-flex items-center gap-3 px-8 py-3 rounded-full bg-maroon text-white text-xs uppercase tracking-widest font-medium hover:bg-charcoal transition-all duration-500 shadow-lg shadow-maroon/20 hover:shadow-charcoal/20 group/btn">
            <span>Book Consultation</span>
            <svg className="w-3 h-3 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

// --- MOBILE "HERO MORPH" COMPONENT ---
export default function Doctors() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when expanded
  useEffect(() => {
    if (selectedDoctorId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selectedDoctorId]);

  return (
    <section 
      id="about"
      ref={containerRef}
      className="py-12 lg:py-24 bg-cream relative"
    >
      {/* Cinematic Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-40">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-rose-gold/20 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-maroon/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '1s' }} />
        </div>
      </div>

      <div className="section-container max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10 lg:mb-24 px-6">
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

        {/* --- MOBILE VIEW: VERTICAL STACK WITH MORPH --- */}
        <div className="flex flex-col gap-6 px-6 lg:hidden">
          {doctors.map((doctor) => (
            <motion.div
              key={doctor.id}
              onClick={() => setSelectedDoctorId(doctor.id)}
              className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl cursor-pointer group"
              whileTap={{ scale: 0.98 }}
            >
              {/* Background Image */}
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  fill
                  className={`object-cover ${doctor.imageStyle} transition-transform duration-[2s] ease-out scale-100 group-hover:scale-110`}
                  sizes="(max-width: 768px) 100vw, 400px"
                  priority
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
              </div>

              {/* Text Overlay (Collapsed) */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-[10px] uppercase tracking-[0.2em] mb-4 font-medium text-white/90">
                    {doctor.moniker}
                  </span>
                  <h3 className="text-4xl font-display leading-[0.9] mb-2 text-white/90">
                    {doctor.shortName}
                  </h3>
                  <p className="text-white/70 text-sm font-light tracking-wide mb-4">
                    {doctor.role}
                  </p>
                  
                  {/* Subtle "Read More" Indicator */}
                  <div className="flex items-center gap-2 text-white text-[10px] uppercase tracking-widest font-bold animate-pulse">
                    <span>Tap to read profile</span>
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- DESKTOP VIEW: GRID --- */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-16">
          {doctors.map((doctor) => (
            <DesktopDoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>

      </div>

      {/* --- EXPANDED OVERLAY (MOBILE) - PORTAL --- */}
      {mounted && createPortal(
        <AnimatePresence>
          {selectedDoctorId && (
            <>
               {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedDoctorId(null)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9990] lg:hidden"
              />
              
              {/* Expanded Card */}
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed inset-0 z-[9999] bg-white overflow-y-auto lg:hidden"
                style={{ height: '100dvh' }}
              >
                {(() => {
                  const doctor = doctors.find(d => d.id === selectedDoctorId)!;
                  return (
                    <div className="relative min-h-full pb-20">
                    {/* Close Button - Sticky/Fixed */}
                    <button 
                      onClick={(e) => { e.stopPropagation(); setSelectedDoctorId(null); }}
                      className="fixed top-4 right-4 lg:top-6 lg:right-6 z-[10000] w-10 h-10 rounded-full bg-black/20 backdrop-blur-md text-white flex items-center justify-center border border-white/20 active:scale-95 transition-transform"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>

                      {/* Header Image */}
                      <div className="relative w-full h-[50vh]">
                        <div className="absolute inset-0 w-full h-full">
                           <Image
                            src={doctor.image}
                            alt={doctor.name}
                            fill
                            className={`object-cover ${doctor.expandedImageStyle}`}
                            priority
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/30" />
                        </div>
                        
                        {/* Floating Title on Expanded View */}
                        <div className="absolute bottom-0 left-0 w-full p-8 pt-32 bg-gradient-to-t from-white via-white/80 to-transparent">
                           <motion.div 
                             initial={{ opacity: 0, y: 20 }}
                             animate={{ opacity: 1, y: 0 }}
                             transition={{ delay: 0.2, duration: 0.5 }}
                           >
                              <span className="inline-block px-3 py-1 rounded-full bg-maroon/10 border border-maroon/10 text-[10px] uppercase tracking-[0.2em] mb-4 font-medium text-maroon">
                                {doctor.moniker}
                              </span>
                              <h3 className="text-4xl font-display leading-[0.9] mb-2 text-charcoal">
                                {doctor.shortName}
                              </h3>
                              <p className="text-charcoal/70 text-sm font-light tracking-wide">
                                {doctor.role}
                              </p>
                           </motion.div>
                        </div>
                      </div>

                      {/* Scrollable Content */}
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                        className="px-8 space-y-8"
                      >
                        {/* Bio */}
                        <div>
                          <p className="text-charcoal/80 text-lg leading-relaxed font-light">
                            {doctor.bio}
                          </p>
                        </div>

                        {/* Highlights */}
                        <div className="p-6 bg-cream rounded-2xl border border-maroon/5">
                          <h4 className="text-xs uppercase tracking-widest text-maroon font-bold mb-4">Highlights</h4>
                          <ul className="space-y-4">
                             {doctor.highlights.map((item, i) => (
                              <li key={i} className="flex items-start gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-rose-gold mt-2 shrink-0" />
                                <span className="text-sm text-charcoal/80 font-medium">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                         {/* Credentials */}
                        <div className="text-center pt-4">
                          <p className="text-[10px] text-maroon/40 uppercase tracking-[0.2em] mb-2 font-bold">Credentials</p>
                          <p className="text-charcoal/90 font-serif italic text-xl">{doctor.credentials}</p>
                        </div>

                        {/* CTA */}
                        <div className="pt-4 pb-20 lg:pb-8">
                          <a 
                            href="#contact" 
                            onClick={(e) => { e.stopPropagation(); setSelectedDoctorId(null); }}
                            className="w-full flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-maroon text-white text-sm uppercase tracking-widest font-medium shadow-xl shadow-maroon/20 active:scale-[0.98] transition-transform"
                          >
                            <span>Book Consultation</span>
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </a>
                        </div>
                      </motion.div>
                    </div>
                  );
                })()}
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
