'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * DOCTORS SECTION - Compact Professional Layout
 * 
 * Design Philosophy:
 * - Smaller, elegant portraits
 * - Focus on credentials
 * - Clean, professional feel
 */

const doctors = [
  {
    name: 'Dr. Padmavathi Surapaneni',
    title: 'Senior Dermatologist & Founder',
    credentials: 'MBBS, DVD, DNB',
    experience: '25+ years',
    description: 'With decades of experience and an international reputation as a speaker and researcher, Dr. Padmavathi leads Pragna\'s clinical vision with a focus on safe, effective treatments.',
  },
  {
    name: 'Dr. Pragna Surapaneni',
    title: 'Dermatologist',
    credentials: 'MBBS, MD (Dermatology)',
    badge: 'Gold Medalist',
    description: 'Dr. Pragna specializes in advanced skin, hair, and laser procedures, blending cutting-edge technology with a personalized, empathetic approach.',
  },
];

export default function Doctors() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section 
      id="about"
      ref={containerRef}
      className="relative py-20 lg:py-32 bg-cream overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-terracotta/10 rounded-full blur-3xl" />

      <div className="section-container relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <span className="w-8 h-px bg-maroon/40" />
            <span className="text-maroon font-medium tracking-[0.2em] uppercase text-xs">
              Our Experts
            </span>
            <span className="w-8 h-px bg-maroon/40" />
          </motion.span>
          
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: 80 }}
              animate={isInView ? { y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl lg:text-5xl font-display text-charcoal"
            >
              Meet your{' '}
              <span className="italic text-maroon">dermatologists</span>
            </motion.h2>
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
          {doctors.map((doctor, index) => (
            <motion.div
              key={doctor.name}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.7, 
                delay: index * 0.15,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="group cursor-pointer"
            >
              {/* Card Container with hover effects */}
              <div className="h-full bg-beige rounded-3xl overflow-hidden border-2 border-transparent hover:border-maroon/10 shadow-soft hover:shadow-soft-xl transition-all duration-500 hover:-translate-y-2 p-6 lg:p-8">
                {/* Portrait Container - Smaller */}
                <div className="relative mb-6">
                  {/* Image */}
                  <div className="relative aspect-[4/5] max-w-[200px] mx-auto overflow-hidden rounded-2xl bg-gradient-to-br from-terracotta/30 via-rose-gold/20 to-beige-warm transition-transform duration-500 group-hover:scale-[1.02]">
                    {/* Placeholder */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <span className="text-maroon/20 font-display text-lg italic block">Add portrait</span>
                      </div>
                    </div>
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-maroon/0 group-hover:bg-maroon/5 transition-colors duration-500" />
                  </div>

                  {/* Badge - Experience or Gold Medalist */}
                  {doctor.badge ? (
                    <div 
                      className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-maroon text-cream px-4 py-2 rounded-full shadow-soft text-center transition-transform duration-300 group-hover:scale-110"
                    >
                      <span className="text-sm font-medium">{doctor.badge}</span>
                    </div>
                  ) : doctor.experience && (
                    <div 
                      className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-maroon text-cream px-4 py-2 rounded-full shadow-soft text-center transition-transform duration-300 group-hover:scale-110"
                    >
                      <span className="text-sm font-medium">{doctor.experience}</span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="text-center space-y-3 pt-4">
                  <div>
                    <h3 className="text-xl lg:text-2xl font-display text-charcoal transition-colors duration-300 group-hover:text-maroon">
                      {doctor.name}
                    </h3>
                    <p className="text-maroon font-medium text-sm mt-1">{doctor.title}</p>
                    <p className="text-charcoal/50 text-xs mt-0.5">{doctor.credentials}</p>
                  </div>
                  
                  <p className="text-charcoal/70 text-sm leading-relaxed max-w-sm mx-auto">
                    {doctor.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
