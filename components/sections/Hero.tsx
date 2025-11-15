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
    <section ref={sectionRef} id="home" className="relative min-h-screen flex items-center gradient-terracotta overflow-hidden">
      {/* Subtle animated background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-terracotta/20 rounded-full filter blur-[100px] animate-float-slow"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-maroon/10 rounded-full filter blur-[100px] animate-float-slow" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="section-container py-24 lg:py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Content - Clean and sophisticated */}
          <div className="space-y-10">
            <div className="space-y-6">
              <p className="text-maroon font-medium tracking-[0.2em] uppercase text-xs animate-fade-in opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
                Advanced Skin & Hair Dermatology in Hyderabad
              </p>
              <h1 className="text-5xl lg:text-[4rem] font-display font-normal text-charcoal leading-[1.1] animate-fade-in opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
                Radiant skin,<br/>
                backed by <span className="italic text-maroon">30+ years</span><br/>
                of trusted dermatology.
              </h1>
              <p className="text-lg text-charcoal/60 leading-relaxed max-w-lg animate-fade-in opacity-0" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
                Pragna Skin & Laser Clinics combines decades of clinical experience, globally recognized expertise, 
                and state-of-the-art technology to offer ethical, personalized care for every skin and hair concern.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
              <a href="#contact" className="btn-primary text-center group relative overflow-hidden">
                <span className="relative z-10">Book a Consultation</span>
                <div className="absolute inset-0 bg-maroon transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
              </a>
              <a href="#about" className="btn-secondary text-center hover:shadow-soft transition-all duration-300">
                Meet Our Dermatologists
              </a>
            </div>
          </div>

          {/* Right Image - 3D card with subtle effect */}
          <div className="relative lg:h-[600px] h-[400px] perspective-1000" ref={imageRef}>
            <div 
              className="absolute inset-0 transform-3d transition-transform duration-700 ease-out animate-fade-in opacity-0"
              style={{
                transform: `rotateY(${mousePos.x * 0.5}deg) rotateX(${-mousePos.y * 0.5}deg)`,
                animationDelay: '0.5s',
                animationFillMode: 'forwards'
              }}
            >
              <div className="w-full h-full bg-gradient-to-br from-beige via-terracotta-light/30 to-beige rounded-3xl shadow-2xl overflow-hidden border border-maroon/5">
                <div className="w-full h-full flex items-center justify-center relative">
                  <div className="text-center text-maroon/15 font-serif text-5xl">
                    Clinic Photo
                  </div>
                  {/* Subtle floating accent */}
                  <div className="absolute top-12 right-12 w-3 h-3 bg-maroon/20 rounded-full"></div>
                  <div className="absolute bottom-12 left-12 w-3 h-3 bg-terracotta/30 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle decorative element */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-maroon/10 to-transparent"></div>
    </section>
  );
}

