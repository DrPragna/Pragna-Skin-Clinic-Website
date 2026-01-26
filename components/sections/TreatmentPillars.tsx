'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

const pillars = [
  {
    id: 'skin',
    title: 'Skin',
    subtitle: 'Rejuvenate & Restore',
    description: 'Advanced dermatological solutions for glowing, healthy skin.',
    href: '/conditions?filter=Skin', 
    image: '/images/areas-of-focus/skin.webp',
    color: '#E8D4D0', // Soft Rose
  },
  {
    id: 'hair',
    title: 'Hair',
    subtitle: 'Growth & Vitality',
    description: 'Comprehensive care for restoration and scalp health.',
    href: '/conditions?filter=Hair',
    image: '/images/areas-of-focus/hair.webp',
    color: '#F2EBE6', // Warm Cream
  },
  {
    id: 'body',
    title: 'Body',
    subtitle: 'Sculpt & Define',
    description: 'Non-invasive contouring and wellness treatments.',
    href: '/conditions?filter=Body',
    image: '/images/areas-of-focus/body.webp',
    color: '#EAE4DD', // Beige
  },
];

function MobilePillarCard({ pillar }: { pillar: typeof pillars[0] }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  
  // Track scroll progress of the card relative to the viewport
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  // Cinematic Zoom: Scale gently from 1.0 to 1.15 as it scrolls
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  
  // Parallax Text: Text moves slightly slower than card for depth
  const yText = useTransform(scrollYProgress, [0, 1], [0, -20]);

  return (
    <Link
      href={pillar.href}
      className="block relative h-[250px] overflow-hidden group"
      ref={cardRef}
    >
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          style={{ scale }}
          className="relative w-full h-full will-change-transform"
        >
          <Image 
            src={pillar.image} 
            alt={pillar.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </motion.div>
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
      
      <motion.div 
        style={{ y: yText }}
        className="absolute inset-0 p-6 flex flex-col justify-end z-10"
      >
        <div className="flex justify-between items-end">
          <div>
            <h3 className="text-4xl font-display text-white mb-1">{pillar.title}</h3>
            <p className="text-white/80 text-sm font-light">{pillar.subtitle}</p>
          </div>
          
          <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white mb-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export default function TreatmentPillars() {
  const [activeId, setActiveId] = useState<string | null>(null); // Initial state: none selected

  return (
    <section className="relative py-12 lg:py-16 bg-cream overflow-hidden">
      <div className="max-w-[1440px] mx-auto lg:px-6">
        
        {/* Section Header - Center Aligned */}
        <div className="text-center mb-10 lg:mb-16 px-6">
          <span className="text-maroon font-medium tracking-[0.2em] uppercase text-xs block mb-4">
              Our Expertise
            </span>
          <h2 className="text-4xl lg:text-5xl font-display text-charcoal">
            Areas of <span className="italic text-maroon">Focus</span>
            </h2>
        </div>

        {/* Desktop: Cinematic Accordion */}
        <div className="hidden lg:flex h-[520px] gap-3">
          {pillars.map((pillar, index) => (
            <Link 
              key={pillar.id} 
              href={pillar.href}
              className="relative min-w-[120px] overflow-hidden rounded-2xl transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group"
              style={{ 
                flexGrow: activeId === pillar.id ? 4 : 1,
                flexBasis: '0%'
              }}
              onMouseEnter={() => setActiveId(pillar.id)}
              onMouseLeave={() => setActiveId(null)}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image 
                  src={pillar.image} 
                  alt={pillar.title}
                  fill
                  className={`object-cover transition-all duration-1000 ease-out
                    ${activeId === pillar.id 
                      ? 'scale-100 saturate-100 brightness-100 contrast-100' 
                      : 'scale-110 saturate-[0.6] brightness-[0.8] contrast-110'
                    }
                  `}
                  sizes="(min-width: 1024px) 33vw, 100vw"
                />
                
                {/* Overlays */}
                <div className={`absolute inset-0 transition-colors duration-700 ${
                  activeId === pillar.id ? 'bg-black/0' : 'bg-black/10'
                }`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
              </div>

              {/* Content Wrapper */}
              <div className="absolute inset-0 z-10">
                
                {/* Top: Number & Icon */}
                <div className="absolute top-8 left-8 right-8 flex justify-between items-start">
                  <span className={`text-xl font-display transition-all duration-500 ${
                    activeId === pillar.id 
                      ? 'text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] scale-110' 
                      : 'text-white'
                  }`}>
                    0{index + 1}
                  </span>
                  <div className={`w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white transition-all duration-500 ${
                    activeId === pillar.id ? 'rotate-0 bg-white/10 backdrop-blur-md' : '-rotate-45'
                  }`}>
                     <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                     </svg>
                  </div>
                </div>

                {/* Vertical Title - CENTERED for visibility */}
                <div className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-500 ${
                  activeId === pillar.id ? 'opacity-0' : 'opacity-100'
                }`}>
                  <h3 className="text-6xl xl:text-7xl font-display text-white/90 whitespace-nowrap -rotate-90 tracking-wide">
                      {pillar.title}
                    </h3>
                </div>
                    
                {/* Expanded Content */}
                <div className={`absolute bottom-0 left-0 w-full p-12 flex flex-col justify-end transition-all duration-700 delay-100 ${
                  activeId === pillar.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                }`}>
                  <h3 className="text-7xl xl:text-8xl font-display text-white mb-4">
                    {pillar.title}
                  </h3>
                  <p className="text-white/90 font-medium text-2xl mb-4">
                              {pillar.subtitle}
                            </p>
                  <p className="text-white/70 text-lg max-w-md leading-relaxed font-light">
                              {pillar.description}
                            </p>
                  <div className="mt-8 flex items-center gap-3 text-white/90 text-sm uppercase tracking-widest group/btn">
                    <span>Explore Treatments</span>
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile: Cinematic Tall Cards with Scroll Zoom */}
        <div className="lg:hidden space-y-1">
          {pillars.map((pillar) => (
            <MobilePillarCard key={pillar.id} pillar={pillar} />
          ))}
        </div>
      </div>
    </section>
  );
}
