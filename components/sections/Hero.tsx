'use client';

import { useEffect, useRef, useState } from 'react';

export default function Hero() {
  const imageRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      if (imageRef.current) {
        const scrolled = window.scrollY;
        imageRef.current.style.transform = `translateY(${scrolled * 0.3}px) rotateY(${scrolled * 0.02}deg)`;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePos({
          x: (e.clientX - rect.left - rect.width / 2) / 50,
          y: (e.clientY - rect.top - rect.height / 2) / 50,
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section ref={sectionRef} id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 opacity-60">
        <div className="absolute inset-0 bg-gradient-to-br from-terracotta via-beige to-terracotta-light animate-gradient-shift"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-maroon/10 rounded-full filter blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-terracotta/20 rounded-full filter blur-3xl animate-float-slow" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="section-container py-32 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Content - Offset grid */}
          <div className="lg:col-span-7 lg:col-start-1 space-y-8">
            <div className="space-y-6">
              <p className="text-maroon font-medium tracking-[0.3em] uppercase text-xs animate-stagger-1">
                Advanced Skin & Hair Dermatology in Hyderabad
              </p>
              <h1 className="text-hero-mobile lg:text-[4.5rem] font-display font-normal text-charcoal leading-[0.9] animate-stagger-2">
                Radiant skin,<br/>
                <span className="text-outline">backed by</span><br/>
                <span className="italic text-maroon">30+ years</span> of<br/>
                trusted dermatology.
              </h1>
              <p className="text-lg text-charcoal/70 leading-relaxed max-w-xl lg:ml-20 animate-stagger-3">
                Pragna Skin & Laser Clinics combines decades of clinical experience, globally recognized expertise, 
                and state-of-the-art technology to offer ethical, personalized care.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 lg:ml-20 animate-stagger-3">
              <a href="#contact" className="magnetic-btn btn-primary text-center group relative overflow-hidden">
                <span className="relative z-10">Book a Consultation</span>
                <div className="absolute inset-0 bg-maroon transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
              </a>
              <a href="#about" className="btn-secondary text-center">
                Meet Our Dermatologists
              </a>
            </div>
          </div>

          {/* Right Image - Overlapping */}
          <div className="lg:col-span-6 lg:col-start-7 relative lg:h-[700px] h-[400px] perspective-1000" ref={imageRef}>
            <div 
              className="absolute inset-0 transform-3d transition-transform duration-700 ease-out"
              style={{
                transform: `rotateY(${mousePos.x}deg) rotateX(${-mousePos.y}deg)`
              }}
            >
              <div className="w-full h-full bg-gradient-to-br from-terracotta/30 via-beige to-maroon/20 rounded-[40px] shadow-2xl overflow-hidden border border-maroon/10">
                <div className="w-full h-full flex items-center justify-center relative">
                  <div className="text-center text-maroon/20 font-serif text-6xl">
                    Clinic Photo
                  </div>
                  {/* Floating elements */}
                  <div className="absolute top-10 right-10 w-20 h-20 bg-maroon/10 rounded-full animate-float-slow"></div>
                  <div className="absolute bottom-10 left-10 w-16 h-16 bg-terracotta/20 rounded-full animate-float-slow" style={{ animationDelay: '2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative dots pattern */}
      <div className="absolute top-20 right-20 grid grid-cols-3 gap-2 opacity-20">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="w-2 h-2 bg-maroon rounded-full animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}></div>
        ))}
      </div>
    </section>
  );
}

