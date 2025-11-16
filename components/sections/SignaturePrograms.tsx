'use client';

import { useEffect, useRef, useState } from 'react';

export default function SignaturePrograms() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  const programs = [
    {
      title: 'Glow Getters',
      description:
        'Unveil your natural radiance with customized treatment plans that brighten, smooth, and refresh tired skin.',
      gradient: 'from-terracotta/30 to-terracotta-light/30',
      position: 'top-0 left-0',
      size: 'col-span-2 row-span-2',
    },
    {
      title: 'Mommy Makeover',
      description:
        'Gentle, effective post-pregnancy treatments to help you reclaim confidence in your skin, body, and hair.',
      gradient: 'from-dust-red/20 to-terracotta/30',
      position: 'top-0 right-0',
      size: 'col-span-1 row-span-1',
    },
    {
      title: 'Pre-wedding Glow Up',
      description:
        'Timed, step-by-step care to ensure your skin looks clear, even, and luminous on your big day.',
      gradient: 'from-maroon/20 to-terracotta-light/30',
      position: 'bottom-0 right-0',
      size: 'col-span-1 row-span-1',
    },
    {
      title: 'Rewind the Years',
      description:
        'Target lines, wrinkles, and loss of firmness with advanced anti-aging solutions.',
      gradient: 'from-terracotta-light/30 to-beige/50',
      position: 'bottom-0 left-0',
      size: 'col-span-1 row-span-1',
    },
    {
      title: 'Signature Radiance Reset',
      description:
        'A clinic-exclusive protocol that revives dull, tired skin with instant luminosity.',
      gradient: 'from-terracotta/30 to-dust-red/20',
      position: 'bottom-0 center',
      size: 'col-span-1 row-span-1',
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const scrollProgress = 1 - (rect.top / window.innerHeight);
        
        cardsRef.current.forEach((card, index) => {
          if (card) {
            const parallaxSpeed = 0.05 * (index % 2 === 0 ? 1 : -1);
            card.style.transform = `translateY(${scrollProgress * parallaxSpeed * 100}px)`;
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="section-padding relative bg-gradient-to-b from-beige via-beige-warm to-beige overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-terracotta/10 rounded-full filter blur-[100px] animate-float-slow"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-maroon/5 rounded-full filter blur-[120px] animate-float-slow" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="section-container relative z-10">
        {/* Asymmetric title placement */}
        <div className="lg:grid lg:grid-cols-12 gap-8 mb-16">
          <div className="lg:col-span-5 lg:col-start-2">
            <h2 className="text-4xl lg:text-6xl font-display font-normal text-charcoal mb-6">
              Discover a world of<br/>
              <span className="italic text-maroon">radiant skin</span> solutions
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-8 lg:pt-12">
            <p className="text-lg text-charcoal/70 leading-relaxed">
              Whether you're preparing for a wedding, recovering after pregnancy, or simply ready to invest 
              in your skin, our curated programs bring together advanced treatments.
            </p>
          </div>
        </div>

        {/* Bento grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]">
          {programs.map((program, index) => (
            <div
              key={index}
              ref={el => cardsRef.current[index] = el!}
              className={`relative group cursor-pointer transition-all duration-500 ${
                index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''
              } opacity-0 translate-y-8 [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0`}
              style={{ 
                transitionDelay: `${index * 100}ms`,
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className={`h-full relative overflow-hidden rounded-3xl shadow-card hover:shadow-2xl transition-all duration-500 ${
                hoveredIndex === index ? 'scale-[1.02]' : ''
              }`}>
                {/* Gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${program.gradient} transition-opacity duration-500 ${
                  hoveredIndex === index ? 'opacity-100' : 'opacity-80'
                }`}></div>
                
                {/* Content */}
                <div className="relative z-10 h-full p-8 flex flex-col justify-between">
                  <div>
                    <h3 className={`font-serif font-semibold text-maroon mb-4 transition-all duration-300 ${
                      index === 0 ? 'text-3xl lg:text-4xl' : 'text-2xl'
                    }`}>
                      {program.title}
                    </h3>
                    <p className={`text-charcoal/80 leading-relaxed ${
                      index === 0 ? 'text-lg' : ''
                    }`}>
                      {program.description}
                    </p>
                  </div>
                  
                  {/* Hover effect arrow */}
                  <div className="flex items-center gap-2 mt-6">
                    <span className="text-maroon font-medium">Explore</span>
                    <svg
                      className={`w-5 h-5 text-maroon transition-transform duration-300 ${
                        hoveredIndex === index ? 'translate-x-2' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>

                {/* Decorative number */}
                <div className="absolute -bottom-8 -right-8 text-[120px] font-display text-white/10 select-none">
                  {(index + 1).toString().padStart(2, '0')}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}