'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 400]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section 
      ref={containerRef}
      id="home" 
      className="relative h-screen w-full overflow-hidden bg-charcoal"
    >
      {/* Background Layer - Video with Image Fallback */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y, opacity }}
      >
        {/* Overlay for text readability - increased opacity for better contrast */}
        <div className="absolute inset-0 bg-black/40 z-10" /> 
        
        {/* The Video */}
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onError={(e) => {
            console.error("Video failed to load:", e);
            // Hide video on error, fallback image will show
            const video = e.target as HTMLVideoElement;
            if (video) {
              video.style.display = "none";
            }
          }}
        >
          <source src="/hero-main.mp4" type="video/mp4" />
        </video>

        {/* Fallback Image (visible if video fails or loads slow) */}
        <img 
          src="/clinic-interior.png" 
          alt="Pragna Skin Clinic"
          className="absolute inset-0 w-full h-full object-cover -z-10"
          loading="eager"
        />
      </motion.div>

      {/* Content Layer - adjusted spacing for better visual grouping */}
      <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        {/* Main Typography */}
        <div className="max-w-5xl mx-auto space-y-4">
          {/* Eyebrow - smaller and more subtle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-white/70 font-sans text-[10px] md:text-xs tracking-[0.4em] uppercase drop-shadow-md">
              SKIN • HAIR • BODY • WELLNESS
            </p>
          </motion.div>

          {/* Headline */}
          <motion.h1 
            className="text-display-xl text-white font-display italic leading-[1] md:leading-[0.95] mt-3 mb-6"
            style={{ textShadow: '0 4px 30px rgba(0,0,0,0.4)' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            World-Class Dermatology Care
          </motion.h1>

          {/* Subtext */}
          <motion.p 
            className="text-base md:text-lg text-white/85 max-w-xl mx-auto font-light leading-relaxed drop-shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Advanced dermatology meets cutting-edge technology — skin, hair, body & wellness, all under one roof in Hyderabad.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <button 
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  const offset = 100;
                  const elementPosition = contactSection.getBoundingClientRect().top + window.scrollY;
                  window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
                }
              }}
              className="px-8 py-4 bg-cream text-maroon rounded-full font-medium hover:bg-white hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-300 min-w-[180px] cursor-pointer"
            >
              Book Consultation
            </button>
            <Link 
              href="/treatments"
              className="px-8 py-4 border border-cream/30 text-cream rounded-full font-medium hover:bg-cream/20 hover:border-cream/80 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,248,240,0.2)] transition-all duration-300 backdrop-blur-sm min-w-[180px] text-center"
            >
              View Treatments
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none z-10" />
      
      {/* Trust Strip - Fixed at bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-black/50 backdrop-blur-md border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-6 md:gap-4 text-white text-xs md:text-sm tracking-widest uppercase font-sans">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-gold" />
              US-FDA Approved Technology
            </span>
            <span className="hidden md:block text-white/30">|</span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-gold" />
              1,00,000+ Successful Treatments
            </span>
            <span className="hidden md:block text-white/30">|</span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-gold" />
              30k+ Happy Patients
            </span>
            <span className="hidden md:block text-white/30">|</span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-gold" />
              25+ Years Excellence
            </span>
          </div>
        </div>
      </div>

    </section>
  );
}
