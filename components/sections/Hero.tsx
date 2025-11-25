'use client';

import { useEffect, useRef, useState } from 'react';

export default function Hero() {
  const imageRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger entrance animations
    setIsLoaded(true);

    const handleScroll = () => {
      if (imageRef.current) {
        const scrolled = window.scrollY;
        imageRef.current.style.transform = `translateY(${scrolled * 0.2}px)`;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePos({
          x: (e.clientX - rect.left - rect.width / 2) / 80,
          y: (e.clientY - rect.top - rect.height / 2) / 80,
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="home" 
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Layered Background - Enhanced gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFF8F0] via-[#F9E4D8] to-[#F3D0C4]" />
      
      {/* Subtle radial accent */}
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_80%_50%_at_80%_-20%,rgba(183,110,121,0.15),transparent)]" />
      
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-[-10%] right-[-5%] w-[700px] h-[700px] bg-gradient-to-br from-terracotta/25 to-rose-gold/15 rounded-full filter blur-[120px]"
          style={{
            transform: `translate(${mousePos.x * 2}px, ${mousePos.y * 2}px)`,
            transition: 'transform 0.8s ease-out',
          }}
        />
        <div 
          className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-gradient-to-tr from-maroon/8 to-terracotta/10 rounded-full filter blur-[100px]"
          style={{
            transform: `translate(${-mousePos.x * 1.5}px, ${-mousePos.y * 1.5}px)`,
            transition: 'transform 1s ease-out',
          }}
        />
        {/* Additional subtle orb */}
        <div className="absolute top-[40%] left-[20%] w-[300px] h-[300px] bg-rose-gold/5 rounded-full filter blur-[80px]" />
      </div>

      <div className="section-container py-24 lg:py-32 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Content */}
          <div className="lg:col-span-6 space-y-8">
            {/* Eyebrow */}
            <p 
              className={`text-maroon font-medium tracking-[0.25em] uppercase text-xs transition-all duration-700 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Advanced Skin & Hair Dermatology in Hyderabad
            </p>

            {/* Main Headline */}
            <h1 
              className={`text-display-lg font-display font-normal text-charcoal leading-[1.05] transition-all duration-700 delay-100 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              Radiant skin,<br/>
              backed by{' '}
              <span className="relative inline-block">
                <span className="italic text-maroon">25+ years</span>
                <svg 
                  className="absolute -bottom-2 left-0 w-full h-3 text-terracotta/40" 
                  viewBox="0 0 200 12" 
                  fill="none"
                >
                  <path 
                    d="M2 8.5C50 2 100 2 198 8.5" 
                    stroke="currentColor" 
                    strokeWidth="4" 
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <br/>
              of trusted care.
            </h1>

            {/* Subheadline */}
            <p 
              className={`text-xl text-charcoal/60 leading-relaxed max-w-lg transition-all duration-700 delay-200 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              Pragna Skin & Laser Clinics combines decades of clinical experience, 
              globally recognized expertise, and state-of-the-art technology to offer 
              ethical, personalized care for every skin and hair concern.
            </p>

            {/* CTAs */}
            <div 
              className={`flex flex-col sm:flex-row gap-4 pt-4 transition-all duration-700 delay-300 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <a href="#contact" className="btn-primary text-center group">
                <span>Book a Consultation</span>
              </a>
              <a 
                href="#about" 
                className="btn-ghost text-center flex items-center justify-center gap-2 group"
              >
                <span>Meet Our Dermatologists</span>
                <svg 
                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>

            {/* Trust Badges */}
            <div 
              className={`flex items-center gap-8 pt-8 border-t border-charcoal/10 transition-all duration-700 delay-400 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <div>
                <p className="text-3xl font-serif text-maroon">25+</p>
                <p className="text-xs text-charcoal/50 uppercase tracking-wider">Years Experience</p>
              </div>
              <div className="w-px h-12 bg-charcoal/10" />
              <div>
                <p className="text-3xl font-serif text-maroon">10k+</p>
                <p className="text-xs text-charcoal/50 uppercase tracking-wider">Happy Patients</p>
              </div>
              <div className="w-px h-12 bg-charcoal/10" />
              <div>
                <p className="text-3xl font-serif text-maroon">3</p>
                <p className="text-xs text-charcoal/50 uppercase tracking-wider">Locations</p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:col-span-6 relative" ref={imageRef}>
            <div 
              className={`relative h-[500px] lg:h-[650px] transition-all duration-1000 delay-300 ${
                isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
            >
              {/* Main Image Container */}
              <div 
                className="absolute inset-0 rounded-[2.5rem] overflow-hidden shadow-soft-xl border border-white/50"
                style={{
                  transform: `rotateY(${mousePos.x * 0.3}deg) rotateX(${-mousePos.y * 0.3}deg)`,
                  transition: 'transform 0.6s ease-out',
                }}
              >
                {/* Hero Image */}
                <img 
                  src="/doctors-hero.png" 
                  alt="Dr. Mounika and Dr. Karuna at Pragna Skin & Laser Clinics"
                  className="w-full h-full object-cover"
                />
                
                {/* Subtle Overlay for better text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
              </div>

              {/* Floating Accent Card */}
              <div 
                className={`absolute -bottom-6 -left-6 bg-white rounded-2xl p-5 shadow-soft-lg border border-maroon/5 transition-all duration-700 delay-500 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transform: `translate(${-mousePos.x * 4}px, ${-mousePos.y * 4}px)`,
                  transition: 'transform 0.8s ease-out, opacity 0.7s ease-out',
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-terracotta/20 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-maroon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-charcoal">US-FDA Approved</p>
                    <p className="text-xs text-charcoal/50">Technology & Protocols</p>
                  </div>
                </div>
              </div>

              {/* Floating Rating */}
              <div 
                className={`absolute -top-4 -right-4 bg-maroon text-beige-warm rounded-2xl px-4 py-3 shadow-soft-lg transition-all duration-700 delay-600 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
                }`}
                style={{
                  transform: `translate(${mousePos.x * 3}px, ${mousePos.y * 3}px)`,
                  transition: 'transform 0.8s ease-out, opacity 0.7s ease-out',
                }}
              >
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-terracotta-light fill-current" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm font-medium">4.9</span>
                </div>
                <p className="text-xs text-beige-warm/70 mt-1">Google Reviews</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade - Smoother transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#FAF4F0] via-[#FAF4F0]/80 to-transparent" />
      
      {/* Decorative bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-maroon/10 to-transparent" />
    </section>
  );
}
