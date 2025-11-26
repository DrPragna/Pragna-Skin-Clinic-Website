'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const pillars = [
  {
    id: 'skin',
    title: 'Skin',
    subtitle: 'Rejuvenate & Restore',
    description: 'Advanced dermatological solutions for glowing, healthy skin.',
    href: '/treatments/skin', 
    image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=2070&auto=format&fit=crop',
    color: '#E8D4D0', // Soft Rose
    hoverColor: '#D4A59A',
  },
  {
    id: 'hair',
    title: 'Hair',
    subtitle: 'Growth & Vitality',
    description: 'Comprehensive care for restoration and scalp health.',
    href: '/treatments/hair',
    image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=2069&auto=format&fit=crop',
    color: '#F2EBE6', // Warm Cream
    hoverColor: '#E6D5CD',
  },
  {
    id: 'body',
    title: 'Body',
    subtitle: 'Sculpt & Define',
    description: 'Non-invasive contouring and wellness treatments.',
    href: '/treatments/body',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2020&auto=format&fit=crop',
    color: '#EAE4DD', // Beige
    hoverColor: '#DBCAC0',
  },
];

export default function TreatmentPillars() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section className="relative py-12 lg:py-24 bg-cream overflow-hidden">
      <div className="section-container">
        {/* Section Header - Minimal */}
        <div className="mb-12 lg:mb-16 flex items-end justify-between">
          <div>
            <span className="text-xs tracking-[0.25em] text-maroon/60 uppercase block mb-4">
              Our Expertise
            </span>
            <h2 className="text-4xl lg:text-5xl font-display text-maroon">
              Areas of Focus
            </h2>
          </div>
          <div className="hidden lg:block max-w-xs text-right text-maroon/60 text-sm">
            <p>Holistic care tailored to your unique needs.</p>
          </div>
        </div>

        {/* Desktop: Cinematic Accordion */}
        <div className="hidden lg:flex h-[600px] gap-4">
          {pillars.map((pillar) => (
            <Link 
              key={pillar.id} 
              href={pillar.href}
              className="relative flex-1 min-w-[120px] overflow-hidden rounded-2xl transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group"
              style={{ 
                flexGrow: activeId === pillar.id ? 3.5 : 1,
                backgroundColor: pillar.color
              }}
              onMouseEnter={() => setActiveId(pillar.id)}
              onMouseLeave={() => setActiveId(null)}
            >
              {/* Background Image - Ghost (Resting) -> Full (Hover) */}
              <div className="absolute inset-0">
                <Image 
                  src={pillar.image} 
                  alt={pillar.title}
                  fill
                  className={`object-cover transition-all duration-1000 ease-out
                    ${activeId === pillar.id 
                      ? 'scale-100 grayscale-0 opacity-100' 
                      : 'scale-110 grayscale opacity-20 mix-blend-multiply'
                    }
                  `}
                  sizes="(max-width: 1200px) 33vw, 50vw"
                />
                
                {/* Active Overlay - Darkens bottom for text readability when expanded */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-700 ${
                    activeId === pillar.id ? 'opacity-100' : 'opacity-0'
                  }`} 
                />
              </div>

              <div className="absolute inset-0 flex flex-col justify-between p-10 z-10">
                {/* Number/Index */}
                <div className="flex justify-between items-start">
                  <span className={`text-lg font-mono transition-colors duration-300 ${activeId === pillar.id ? 'text-white/90' : 'text-maroon/40'}`}>
                    0{pillars.indexOf(pillar) + 1}
                  </span>
                  
                  {/* Arrow Icon */}
                  <motion.div 
                    className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${
                      activeId === pillar.id ? 'border-white/40 text-white' : 'border-maroon/10 text-maroon/40'
                    }`}
                    animate={{ 
                      rotate: activeId === pillar.id ? 0 : -45,
                      scale: activeId === pillar.id ? 1 : 0.9
                    }}
                  >
                     <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                     </svg>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="relative h-full flex flex-col justify-end">
                  <div className="relative">
                    {/* Vertical Text Title */}
                    <h3 className={`text-5xl font-display transition-all duration-500 whitespace-nowrap origin-bottom-left ${
                      activeId === pillar.id 
                        ? 'text-white translate-y-0 rotate-0' 
                        : 'text-maroon/80 -rotate-90 absolute bottom-0 left-2 translate-x-0'
                    }`}>
                      {pillar.title}
                    </h3>
                    
                    {/* Description - Reveals on Expand */}
                    <AnimatePresence>
                      {activeId === pillar.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 20, height: 0 }}
                          animate={{ opacity: 1, y: 0, height: 'auto' }}
                          exit={{ opacity: 0, y: 10, height: 0 }}
                          transition={{ duration: 0.4, delay: 0.1 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4">
                            <p className="text-white/90 font-medium text-xl mb-2">
                              {pillar.subtitle}
                            </p>
                            <p className="text-white/70 text-sm max-w-sm leading-relaxed">
                              {pillar.description}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile: Card Stack with Images */}
        <div className="lg:hidden space-y-4">
          {pillars.map((pillar, index) => (
            <Link
              key={pillar.id}
              href={pillar.href}
              className="block relative overflow-hidden rounded-2xl aspect-[4/3] group"
            >
              {/* Background Image */}
              <Image 
                src={pillar.image} 
                alt={pillar.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-maroon/20 mix-blend-multiply" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                <div className="flex justify-between items-start">
                  <span className="text-white/60 font-mono">0{index + 1}</span>
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
                    <svg className="w-3 h-3 -rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-3xl font-display text-white mb-2">{pillar.title}</h3>
                  <p className="text-white/90 font-medium mb-1">{pillar.subtitle}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
