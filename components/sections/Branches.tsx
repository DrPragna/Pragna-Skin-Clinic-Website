'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * BRANCHES - Location Cards with Map Integration Ready
 * 
 * Design Philosophy:
 * - Clean, visual location cards
 * - Easy contact access
 * - Premium presentation
 */

const branches = [
  {
    name: 'Punjagutta',
    address: '3rd Floor, Above Reliance Trends, Punjagutta, Hyderabad - 500082',
    phone: '+91 98765 43210',
    email: 'punjagutta@pragnaskin.com',
    hours: 'Mon - Sat: 10 AM - 7 PM',
    mapUrl: 'https://maps.google.com',
  },
  {
    name: 'Kokapet',
    address: 'Ground Floor, My Home Avatar, Kokapet, Hyderabad - 500075',
    phone: '+91 98765 43211',
    email: 'kokapet@pragnaskin.com',
    hours: 'Mon - Sat: 10 AM - 7 PM',
    mapUrl: 'https://maps.google.com',
  },
];

export default function Branches() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section 
      ref={containerRef}
      className="relative py-14 lg:py-20 overflow-hidden"
    >
      {/* Warm beige gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F5F2EF] via-[#FAF6F2] to-[#FDF8F4]" />
      
      {/* Subtle accent gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_80%_20%,rgba(234,199,187,0.1),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_10%_80%,rgba(183,110,121,0.06),transparent)]" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-terracotta/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-rose-gold/5 rounded-full blur-3xl" />
      
      {/* Top transition line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-maroon/8 to-transparent" />
      
      <div className="section-container relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 lg:mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 mb-8"
          >
            <span className="w-12 h-px bg-maroon/40" />
            <span className="text-maroon font-medium tracking-[0.3em] uppercase text-xs">
              Locations
            </span>
            <span className="w-12 h-px bg-maroon/40" />
          </motion.span>
          
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: 100 }}
              animate={isInView ? { y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-display-md font-display text-charcoal"
            >
              Visit our{' '}
              <span className="italic text-maroon">clinics</span>
            </motion.h2>
          </div>
        </div>

        {/* Branches Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {branches.map((branch, index) => (
            <motion.div
              key={branch.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="bg-white rounded-3xl p-8 shadow-soft hover:shadow-soft-lg transition-shadow duration-500"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-display text-charcoal">{branch.name}</h3>
                  <p className="text-sm text-maroon font-medium mt-1">Pragna Skin Clinic</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-maroon/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-maroon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-charcoal/40 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  <p className="text-charcoal/70 text-sm leading-relaxed">{branch.address}</p>
                </div>
                
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-charcoal/40 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href={`tel:${branch.phone}`} className="text-charcoal hover:text-maroon transition-colors">
                    {branch.phone}
                  </a>
                </div>
                
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-charcoal/40 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-charcoal/70 text-sm">{branch.hours}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-8 pt-6 border-t border-charcoal/10">
                <a
                  href={branch.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 bg-maroon text-cream text-sm font-medium rounded-full text-center hover:bg-maroon-dark transition-colors"
                >
                  Get Directions
                </a>
                <a
                  href={`tel:${branch.phone}`}
                  className="py-3 px-4 border border-charcoal/20 text-charcoal text-sm font-medium rounded-full hover:border-maroon hover:text-maroon transition-colors"
                >
                  Call Now
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
