'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Lenis from 'lenis';

// Declare lenis on window for TypeScript
declare global {
  interface Window {
    lenis?: Lenis;
  }
}

/**
 * Helper function to scroll to an element while bypassing Lenis conflicts.
 * Stops Lenis, uses native smooth scroll, then restarts Lenis.
 */
const scrollToElementBypassingLenis = (elementId: string, offset: number = 100) => {
  const targetElement = document.getElementById(elementId);
  if (!targetElement) return;

  const targetRect = targetElement.getBoundingClientRect();
  const lenis = window.lenis;

  if (lenis) {
    // Stop Lenis to prevent it from fighting with native scroll
    lenis.stop();
    // Remove the class that hides scrollbar (lenis-stopped adds overflow:hidden)
    document.documentElement.classList.remove('lenis-stopped');
  }

  // Calculate absolute position
  const absoluteTop = window.scrollY + targetRect.top - offset;

  // Use native smooth scroll instead of Lenis
  window.scrollTo({
    top: absoluteTop,
    behavior: 'smooth'
  });

  // Re-enable Lenis after scroll animation completes
  if (lenis) {
    setTimeout(() => lenis.start(), 1200); // Match scroll duration
  }
};

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 400]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  // Detect mobile vs desktop on mount
  useEffect(() => {
    setIsLoaded(true);
    // Use 768px as breakpoint (matches md: in Tailwind)
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    
    // Note: We don't add resize listener to avoid video switching mid-session
    // The video is determined on initial load only
  }, []);

  // Handle video autoplay for mobile browsers
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isLoaded) return;

    const attemptPlay = async () => {
      try {
        // Ensure video is muted (required for autoplay on mobile)
        video.muted = true;
        await video.play();
        setIsVideoPlaying(true);
      } catch (error) {
        // Autoplay was prevented, video will show fallback image
        console.log("Video autoplay prevented:", error);
      }
    };

    // Try to play immediately if video has enough data
    if (video.readyState >= 3) {
      attemptPlay();
    }

    // Also try when video can play through
    const handleCanPlay = () => attemptPlay();
    const handlePlaying = () => setIsVideoPlaying(true);
    
    video.addEventListener("canplaythrough", handleCanPlay);
    video.addEventListener("playing", handlePlaying);

    // Attempt play on user interaction as fallback (for very strict browsers)
    const handleInteraction = () => {
      if (!isVideoPlaying) {
        attemptPlay();
      }
    };
    
    document.addEventListener("touchstart", handleInteraction, { once: true });
    document.addEventListener("click", handleInteraction, { once: true });

    return () => {
      video.removeEventListener("canplaythrough", handleCanPlay);
      video.removeEventListener("playing", handlePlaying);
      document.removeEventListener("touchstart", handleInteraction);
      document.removeEventListener("click", handleInteraction);
    };
  }, [isVideoPlaying, isLoaded]);

  return (
    <section 
      ref={containerRef}
      id="home" 
      className="relative h-[100svh] w-full overflow-hidden bg-charcoal"
    >
      {/* Background Layer - Video with Image Fallback */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y, opacity }}
      >
        {/* Overlay for text readability - darker on mobile due to warmer video tones */}
        <div className={`absolute inset-0 z-10 ${isMobile ? 'bg-black/[0.5]' : 'bg-black/[0.4]'}`} /> 
        
        {/* Poster image - exact first frame of video, shows until video plays */}
        {isLoaded && (
          <img
            src={isMobile ? "/images/hero-mobile-poster.jpg" : "/images/hero-desktop-poster.jpg"}
            alt=""
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              isVideoPlaying ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          />
        )}

        {/* The Video - starts invisible to hide mobile play button, fades in when playing */}
        {/* Uses different video sources for mobile vs desktop */}
        {isLoaded && (
          <video
            ref={videoRef}
            key={isMobile ? "mobile" : "desktop"}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              isVideoPlaying ? "opacity-100" : "opacity-0"
            }`}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            // webkit-playsinline for older iOS
            webkit-playsinline="true"
            // Disable default controls to prevent play button
            controls={false}
            onError={(e) => {
              console.error("Video failed to load:", e);
              setIsVideoPlaying(false);
            }}
          >
            {isMobile ? (
              // Mobile video - portrait optimized
              <>
                <source src="/hero-mobile.webm" type="video/webm" />
                <source src="/hero-mobile.mp4" type="video/mp4" />
              </>
            ) : (
              // Desktop video - landscape
              <>
                <source src="/hero-main.webm" type="video/webm" />
                <source src="/hero-main.mp4" type="video/mp4" />
              </>
            )}
          </video>
        )}
      </motion.div>

      {/* Content Layer - adjusted spacing for better visual grouping */}
      <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 pt-16 md:pt-32 pb-24 md:pb-20">
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
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-6 w-full max-w-xs mx-auto sm:max-w-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <button 
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                scrollToElementBypassingLenis('contact', 100);
              }}
              className="w-full sm:w-auto px-8 py-3 sm:py-4 bg-cream text-maroon rounded-full font-medium hover:bg-white hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-300 min-w-[180px] cursor-pointer"
            >
              Book Consultation
            </button>
            <Link 
              href="/treatments"
              className="w-full sm:w-auto px-8 py-3 sm:py-4 border border-cream/30 text-cream rounded-full font-medium hover:bg-cream/20 hover:border-cream/80 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,248,240,0.2)] transition-all duration-300 backdrop-blur-sm min-w-[180px] text-center"
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
        <div className="max-w-7xl mx-auto px-4 py-3 md:py-4">
          <div className="grid grid-cols-[auto_auto] justify-between gap-y-3 gap-x-4 lg:flex lg:justify-between lg:w-full items-center text-white text-[10px] md:text-xs lg:text-sm tracking-wider uppercase font-sans">
            {/* Item 1 */}
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-rose-gold shrink-0" />
              <span className="whitespace-nowrap">US-FDA Approved</span>
            </span>

            <span className="hidden lg:block text-white/30">|</span>

            {/* Item 2 */}
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-rose-gold shrink-0" />
              <span className="whitespace-nowrap">25+ Years Excellence</span>
            </span>

            <span className="hidden lg:block text-white/30">|</span>

            {/* Item 3 */}
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-rose-gold shrink-0" />
              <span className="whitespace-nowrap">100k+ Treatments</span>
            </span>

            <span className="hidden lg:block text-white/30">|</span>

            {/* Item 4 */}
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-rose-gold shrink-0" />
              <span className="whitespace-nowrap">30k+ Happy Patients</span>
            </span>
          </div>
        </div>
      </div>

    </section>
  );
}
