'use client';

import { useEffect, useRef } from 'react';

export default function Hero() {
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (imageRef.current) {
        const scrolled = window.scrollY;
        imageRef.current.style.transform = `translateY(${scrolled * 0.3}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center gradient-terracotta overflow-hidden">
      <div className="section-container py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-slide-up">
            <div className="space-y-4">
              <p className="text-maroon font-medium tracking-wide uppercase text-sm">
                Advanced Skin & Hair Dermatology in Hyderabad
              </p>
              <h1 className="text-hero-mobile lg:text-hero font-serif font-bold text-charcoal text-balance">
                Radiant skin, backed by 30+ years of trusted dermatology.
              </h1>
              <p className="text-lg text-charcoal/70 leading-relaxed max-w-xl">
                Pragna Skin & Laser Clinics combines decades of clinical experience, globally recognized expertise, 
                and state-of-the-art technology to offer ethical, personalized care for every skin and hair concern.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#contact" className="btn-primary text-center">
                Book a Consultation
              </a>
              <a href="#about" className="btn-secondary text-center">
                Meet Our Dermatologists
              </a>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative lg:h-[600px] h-[400px]" ref={imageRef}>
            <div className="absolute inset-0 bg-beige rounded-3xl shadow-soft-lg overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-terracotta/20 to-maroon/10 flex items-center justify-center">
                <div className="text-center text-maroon/20 font-serif text-6xl">
                  Clinic Photo
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Element */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-beige-warm to-transparent"></div>
    </section>
  );
}

