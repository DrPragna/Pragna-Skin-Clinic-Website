'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

/**
 * BRANCHES - Boutique Locations
 * 
 * Design Philosophy:
 * - Split card layout (Image + Info)
 * - Focus on "Destination" feel
 * - Clear, elegant contact details
 */

const branches = [
  {
    id: 'punjagutta',
    name: 'Punjagutta',
    label: 'Flagship Clinic',
    address: '3rd Floor, Above Reliance Trends,\nPunjagutta, Hyderabad - 500082',
    phone: '+91 98765 43210',
    mapUrl: 'https://maps.app.goo.gl/GHW2EhGtHpeUrU228',
    image: '/clinics/punjagutta.jpg', // Placeholder
  },
  {
    id: 'kokapet',
    name: 'Kokapet',
    label: 'Advanced Center',
    address: 'Ground Floor, My Home Avatar,\nKokapet, Hyderabad - 500075',
    phone: '+91 98765 43211',
    mapUrl: 'https://maps.app.goo.gl/RZjN7F1WbhMAo5eL9',
    image: '/clinics/kokapet.jpg', // Placeholder
  },
];

export default function Branches() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section 
      ref={containerRef}
      className="py-12 lg:py-16 bg-cream overflow-hidden"
    >
      <div className="section-container max-w-6xl mx-auto">
        {/* Header - Center Aligned */}
        <div className="text-center mb-12 lg:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-maroon font-medium tracking-[0.2em] uppercase text-xs block mb-4"
          >
            Our Locations
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl lg:text-5xl font-display text-charcoal"
          >
            Visit our <span className="italic text-maroon">Sanctuaries</span>
          </motion.h2>
        </div>

        {/* Locations Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {branches.map((branch, index) => (
            <motion.div
              key={branch.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.2,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="group relative bg-white rounded-[2.5rem] overflow-hidden shadow-soft hover:shadow-xl transition-shadow duration-500"
            >
              <div className="flex flex-col h-full">
                {/* Image Section - Top Half */}
                <div className="relative h-64 lg:h-72 overflow-hidden bg-beige-warm">
                  {/* Placeholder for Clinic Image */}
                  <div className="absolute inset-0 bg-gradient-to-br from-terracotta/20 to-beige flex items-center justify-center group-hover:scale-105 transition-transform duration-1000">
                     <span className="text-maroon/20 font-display text-xl italic">Clinic Interior</span>
              </div>

                  {/* Overlay Badge */}
                  <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full">
                    <span className="text-xs font-medium text-maroon uppercase tracking-wider">
                      {branch.label}
                    </span>
                </div>
                </div>
                
                {/* Info Section - Bottom Half */}
                <div className="p-8 lg:p-10 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="text-3xl font-display text-charcoal mb-4">
                      {branch.name}
                    </h3>
                    <div className="flex items-start gap-3 text-charcoal/70 mb-6">
                      <svg className="w-5 h-5 mt-0.5 text-maroon/60 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                      <p className="leading-relaxed font-light whitespace-pre-line">
                        {branch.address}
                      </p>
                </div>
              </div>

                  <div className="pt-8 border-t border-maroon/10 flex gap-4">
                <a
                  href={`tel:${branch.phone}`}
                      className="flex-1 py-3 flex items-center justify-center gap-2 border border-charcoal/10 rounded-full text-sm uppercase tracking-widest hover:bg-charcoal hover:text-white hover:border-charcoal transition-colors duration-300"
                >
                  Call Now
                </a>
                    <a 
                      href={branch.mapUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 py-3 flex items-center justify-center gap-2 bg-maroon text-white rounded-full text-sm uppercase tracking-widest hover:bg-maroon-dark transition-colors duration-300"
                    >
                      Directions
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
