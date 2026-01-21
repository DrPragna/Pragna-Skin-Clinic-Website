'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { navigationData } from '@/lib/navigationData';
import { useBookingModal } from '@/components/ui/BookingModal';
import Lenis from 'lenis';
import { motion, AnimatePresence } from 'framer-motion';

// Declare lenis on window for TypeScript
declare global {
  interface Window {
    lenis?: Lenis;
  }
}

/**
 * Helper function to scroll to an element while bypassing Lenis conflicts.
 */
const scrollToElementBypassingLenis = (elementId: string, offset: number = 100) => {
  const targetElement = document.getElementById(elementId);
  if (!targetElement) return;

  const targetRect = targetElement.getBoundingClientRect();
  const lenis = window.lenis;

  if (lenis) {
    lenis.stop();
    document.documentElement.classList.remove('lenis-stopped');
  }

  const absoluteTop = window.scrollY + targetRect.top - offset;

  window.scrollTo({
    top: absoluteTop,
    behavior: 'smooth'
  });

  if (lenis) {
    setTimeout(() => lenis.start(), 1200);
  }
};

// Icons
const ChevronDown = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m6 9 6 6 6-6"/>
  </svg>
);

const ArrowRight = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

const StarIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
  </svg>
);

const StylizedText = ({ text, className = '', ampersandClassName = 'text-maroon' }: { text: string; className?: string; ampersandClassName?: string }) => {
  const parts = text.split('&');
  if (parts.length === 1) return <span className={className}>{text}</span>;
  
  return (
    <span className={className}>
      {parts.map((part, index) => (
        <span key={index}>
          {part}
          {index < parts.length - 1 && (
            <span className={`font-serif italic text-[1.15em] mx-0.5 ${ampersandClassName}`}>&amp;</span>
          )}
        </span>
      ))}
    </span>
  );
};

// Animation Variants
const menuContainerVariants = {
  hidden: { x: '100%' },
  visible: {
    x: '0%',
    transition: {
      duration: 0.8,
      ease: [0.32, 0.72, 0, 1] as any, // Graceful editorial easing
    },
  },
  exit: {
    x: '100%',
    transition: {
      duration: 0.5,
      ease: [0.32, 0.72, 0, 1] as any,
    },
  },
};

const menuItemVariants = {
  hidden: { opacity: 1, x: 0 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 1, x: 0 },
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Mobile Accordion States
  const [activeMobileDropdown, setActiveMobileDropdown] = useState<string | null>(null);
  const [activeMobileCategory, setActiveMobileCategory] = useState<string | null>(null);

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const { openBookingModal } = useBookingModal();
  
  const treatmentsRef = useRef<HTMLDivElement>(null);
  const conditionsRef = useRef<HTMLDivElement>(null);
  const signatureProgramsRef = useRef<HTMLDivElement>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Desktop Dropdown Logic
  const openDropdown = useCallback((name: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setActiveDropdown(name);
  }, []);

  const closeDropdown = useCallback(() => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  }, []);

  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    setHasMounted(true);
    setIsScrolled(window.scrollY > 20);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reset states on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveMobileDropdown(null);
    setActiveMobileCategory(null);
    setActiveDropdown(null);
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      // Also stop lenis if it exists
      window.lenis?.stop();
    } else {
      document.body.style.overflow = '';
      window.lenis?.start();
    }
    return () => {
      document.body.style.overflow = '';
      window.lenis?.start();
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (activeDropdown) {
      document.body.classList.add('mega-menu-open');
    } else {
      document.body.classList.remove('mega-menu-open');
    }
    return () => document.body.classList.remove('mega-menu-open');
  }, [activeDropdown]);

  // Mobile Toggles
  const toggleMobileDropdown = (name: string) => {
    // If opening a new tab, close others and reset inner categories
    if (activeMobileDropdown !== name) {
      setActiveMobileDropdown(name);
      setActiveMobileCategory(null);
    } else {
      // If clicking active tab, close it
      setActiveMobileDropdown(null);
      setActiveMobileCategory(null);
    }
  };

  const toggleMobileCategory = (name: string) => {
    setActiveMobileCategory(activeMobileCategory === name ? null : name);
  };

  const isHomepage = pathname === '/';
  // Use transparent style only when menu is CLOSED. When open, we want the dark/solid style for contrast with the beige menu.
  const useTransparentStyle = hasMounted && isHomepage && !isScrolled && !isMobileMenuOpen;

  const linkClasses = `transition-colors duration-200 font-medium cursor-pointer flex items-center gap-1 ${
    useTransparentStyle 
      ? 'text-white/90 hover:text-white' 
      : 'text-charcoal/80 hover:text-maroon'
  }`;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-20 transition-all duration-300">
      
      {/* Background Layers */}
      <div 
        className={`absolute inset-0 bg-beige-warm/95 backdrop-blur-md shadow-soft transition-opacity duration-300 ease-in-out ${
          useTransparentStyle ? 'opacity-0' : 'opacity-100'
        }`}
      />
      <div 
        className={`absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-transparent transition-opacity duration-300 ease-in-out ${
          useTransparentStyle ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div className="relative z-10 section-container">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group z-50 relative">
            <Image 
              src="/icons/Icon_Master.png" 
              alt="Pragna Skin Clinic" 
              width={72} 
              height={72}
              className={`h-[3.9rem] w-auto transition-all duration-300 ${
                useTransparentStyle 
                  ? 'brightness-0 invert' 
                  : ''
              }`}
              priority
            />
            <div className={`flex flex-col -ml-4 transition-colors duration-300 ${
              useTransparentStyle 
                ? 'text-white' 
                : 'text-charcoal'
            }`}>
              <span className="font-display font-normal text-[1.25rem] tracking-[0.02em] uppercase leading-none">
                Pragna
              </span>
              <span className={`font-sans text-[0.45rem] tracking-[0.15em] uppercase leading-tight mt-0.5 ${
                useTransparentStyle 
                  ? 'text-white/70' 
                  : 'text-charcoal/60'
              }`}>
                Advanced Skin Clinic
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8 h-full">
            <Link href="/" className={linkClasses}>Home</Link>
            
            {/* Treatments Dropdown */}
            <div 
              className="relative h-full flex items-center"
              onMouseEnter={() => openDropdown('treatments')}
              onMouseLeave={closeDropdown}
            >
              <span className={`${linkClasses} ${activeDropdown === 'treatments' ? 'text-maroon' : ''}`}>
                Treatments
                <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'treatments' ? 'rotate-180' : ''}`} />
              </span>
            </div>
            
            {/* Treatments Mega Menu */}
            <div 
              className={`fixed top-[80px] left-1/2 -translate-x-1/2 w-[calc(100vw-2rem)] max-w-[1400px] bg-white shadow-[0_40px_60px_-15px_rgba(0,0,0,0.1)] rounded-[2rem] border border-gray-100 transition-all duration-500 z-50 overflow-hidden ${
                activeDropdown === 'treatments' 
                  ? 'opacity-100 visible translate-y-0 pointer-events-auto' 
                  : 'opacity-0 invisible translate-y-4 pointer-events-none'
              }`}
              onMouseEnter={() => openDropdown('treatments')}
              onMouseLeave={closeDropdown}
            >
              <div 
                ref={treatmentsRef}
                className="p-6 md:p-8 lg:p-12 max-h-[80vh] overflow-y-auto overflow-x-hidden custom-scrollbar"
                data-lenis-prevent
              >
                  <div className="flex items-center justify-between mb-8">
                    <Link href="/treatments" className="text-sm text-maroon hover:text-maroon-light font-medium flex items-center gap-2 transition-colors">
                      View All Treatments <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
                    {navigationData.treatments.map((pillar) => (
                      <div key={pillar.pillar} className="space-y-8">
                        <div className="relative">
                          <h3 className="font-sans text-xs text-maroon/80 font-bold uppercase tracking-[0.25em] mb-6">{pillar.pillar}</h3>
                          <div className="absolute -bottom-2 left-0 w-12 h-px bg-maroon/20" />
                        </div>
                        <div className="space-y-8">
                          {pillar.categories.map((category) => (
                            <div key={category.category} className="group/cat">
                              <Link href={category.href} className="block mb-3 group/title relative pl-4 -ml-4 rounded-lg hover:bg-maroon/5 transition-all duration-300 py-2">
                                <div className="flex items-center justify-between pr-4">
                                  <h4 className="font-display text-xl text-charcoal group-hover/title:text-maroon transition-colors duration-300 leading-tight relative z-10">
                                    <StylizedText text={category.category} ampersandClassName="font-serif italic text-maroon/60" />
                                    <span className="absolute left-0 -bottom-1 w-0 h-px bg-maroon/40 transition-all duration-500 group-hover/title:w-full" />
                                  </h4>
                                  <ArrowRight className="w-4 h-4 text-maroon opacity-0 -translate-x-2 group-hover/title:opacity-100 group-hover/title:translate-x-0 transition-all duration-300" />
                                </div>
                              </Link>
                              <ul className="space-y-1 pl-2 border-l border-maroon/10 ml-2">
                                {category.items.map((item) => (
                                  <li key={item.name}>
                                    <Link href={item.href} className="group/item flex items-center justify-between text-sm text-charcoal/60 hover:text-maroon hover:bg-maroon/5 px-3 py-1.5 rounded-md transition-all duration-300 font-light">
                                      <span>{item.name}</span>
                                      <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-300" />
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
              </div>
            </div>

            {/* Conditions Dropdown */}
            <div 
              className="relative h-full flex items-center"
              onMouseEnter={() => openDropdown('conditions')}
              onMouseLeave={closeDropdown}
            >
              <span className={`${linkClasses} ${activeDropdown === 'conditions' ? 'text-maroon' : ''}`}>
                Conditions
                <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'conditions' ? 'rotate-180' : ''}`} />
              </span>
            </div>
            
            {/* Conditions Mega Menu */}
            <div 
              className={`fixed top-[80px] left-1/2 -translate-x-1/2 w-[calc(100vw-2rem)] max-w-[1200px] bg-white shadow-[0_40px_60px_-15px_rgba(0,0,0,0.1)] rounded-[2rem] border border-gray-100 transition-all duration-500 z-50 overflow-hidden ${
                activeDropdown === 'conditions' 
                  ? 'opacity-100 visible translate-y-0 pointer-events-auto' 
                  : 'opacity-0 invisible translate-y-4 pointer-events-none'
              }`}
              onMouseEnter={() => openDropdown('conditions')}
              onMouseLeave={closeDropdown}
            >
              <div 
                ref={conditionsRef}
                className="p-6 md:p-8 lg:p-12 max-h-[80vh] overflow-y-auto overflow-x-hidden custom-scrollbar"
                data-lenis-prevent
              >
                  <div className="flex items-center justify-between mb-8">
                    <Link href="/conditions" className="text-sm text-maroon hover:text-maroon-light font-medium flex items-center gap-2 transition-colors">
                      View All Conditions <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-10">
                    <div className="lg:col-span-5 space-y-6 md:space-y-8 lg:border-r border-maroon/5 lg:pr-8">
                      <div className="relative">
                        <h3 className="font-sans text-xs text-maroon/80 font-bold uppercase tracking-[0.25em] mb-6">{navigationData.conditions[0].group}</h3>
                        <div className="absolute -bottom-2 left-0 w-12 h-px bg-maroon/20" />
                      </div>
                      <div className="space-y-6">
                        {navigationData.conditions[0].items.map((item) => (
                          <Link key={item.name} href={item.href} className="group/item block p-4 -mx-4 rounded-2xl hover:bg-maroon/5 transition-all duration-300 cursor-pointer">
                            <div className="flex items-baseline justify-between gap-4 mb-1">
                              <span className={`text-lg font-display ${item.isTopConcern ? 'text-maroon font-medium' : 'text-charcoal'} group-hover/item:text-maroon group-hover/item:font-medium transition-all duration-300`}>{item.name}</span>
                              {item.isTopConcern && <StarIcon className="w-3 h-3 text-rose-gold shrink-0" />}
                            </div>
                            {item.subtitle && <p className="text-sm text-charcoal/50 font-light leading-relaxed group-hover/item:text-charcoal/70 transition-colors">{item.subtitle}</p>}
                          </Link>
                        ))}
                      </div>
                    </div>
                    <div className="lg:col-span-3 space-y-6 md:space-y-8 lg:border-r border-maroon/5 lg:pr-8">
                      <div className="relative">
                        <h3 className="font-sans text-xs text-maroon/80 font-bold uppercase tracking-[0.25em] mb-6">{navigationData.conditions[1].group}</h3>
                        <div className="absolute -bottom-2 left-0 w-12 h-px bg-maroon/20" />
                      </div>
                      <div className="space-y-6">
                        {navigationData.conditions[1].items.map((item) => (
                          <Link key={item.name} href={item.href} className="group/item block p-4 -mx-4 rounded-2xl hover:bg-maroon/5 transition-all duration-300 cursor-pointer">
                            <div className="flex items-baseline justify-between gap-4 mb-1">
                              <span className={`text-lg font-display ${item.isTopConcern ? 'text-maroon font-medium' : 'text-charcoal'} group-hover/item:text-maroon group-hover/item:font-medium transition-all duration-300`}>{item.name}</span>
                              {item.isTopConcern && <StarIcon className="w-3 h-3 text-rose-gold shrink-0" />}
                            </div>
                            {item.subtitle && <p className="text-sm text-charcoal/50 font-light leading-relaxed group-hover/item:text-charcoal/70 transition-colors">{item.subtitle}</p>}
                          </Link>
                        ))}
                      </div>
                    </div>
                    <div className="md:col-span-2 lg:col-span-4 space-y-8 md:space-y-10">
                      <div>
                        <div className="relative">
                          <h3 className="font-sans text-xs text-maroon/80 font-bold uppercase tracking-[0.25em] mb-6">{navigationData.conditions[2].group}</h3>
                          <div className="absolute -bottom-2 left-0 w-12 h-px bg-maroon/20" />
                        </div>
                        <div className="space-y-5">
                          {navigationData.conditions[2].items.map((item) => (
                            <Link key={item.name} href={item.href} className="group/item block p-3 -mx-3 rounded-xl hover:bg-maroon/5 transition-all duration-300 cursor-pointer">
                              <span className={`text-lg font-display ${item.isTopConcern ? 'text-maroon font-medium' : 'text-charcoal'} group-hover/item:text-maroon group-hover/item:font-medium transition-all duration-300 block mb-1`}>{item.name}</span>
                              {item.subtitle && <p className="text-sm text-charcoal/50 font-light leading-relaxed">{item.subtitle}</p>}
                            </Link>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="relative">
                          <h3 className="font-sans text-xs text-maroon/80 font-bold uppercase tracking-[0.25em] mb-6">Others</h3>
                          <div className="absolute -bottom-2 left-0 w-12 h-px bg-maroon/20" />
                        </div>
                        <div className="space-y-5">
                          {navigationData.conditions[3].items.map((item) => (
                            <Link key={item.name} href={item.href} className="group/item block p-3 -mx-3 rounded-xl hover:bg-maroon/5 transition-all duration-300 cursor-pointer">
                              <span className={`text-lg font-display ${item.isTopConcern ? 'text-maroon font-medium' : 'text-charcoal'} group-hover/item:text-maroon group-hover/item:font-medium transition-all duration-300 block mb-1`}>{item.name}</span>
                              {item.subtitle && <p className="text-sm text-charcoal/50 font-light leading-relaxed">{item.subtitle}</p>}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
            </div>

            {/* Signature Programs Dropdown */}
            <div 
              className="relative h-full flex items-center"
              onMouseEnter={() => openDropdown('signature-programs')}
              onMouseLeave={closeDropdown}
            >
              <span className={`${linkClasses} ${activeDropdown === 'signature-programs' ? 'text-maroon' : ''}`}>
                Signature Programs
                <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'signature-programs' ? 'rotate-180' : ''}`} />
              </span>
            </div>
            
            {/* Signature Programs Mega Menu */}
            <div 
              className={`fixed top-[80px] left-1/2 -translate-x-1/2 w-[calc(100vw-2rem)] max-w-[1100px] bg-white shadow-[0_40px_60px_-15px_rgba(0,0,0,0.1)] rounded-[2rem] border border-gray-100 transition-all duration-500 z-50 overflow-hidden ${
                activeDropdown === 'signature-programs' 
                  ? 'opacity-100 visible translate-y-0 pointer-events-auto' 
                  : 'opacity-0 invisible translate-y-4 pointer-events-none'
              }`}
              onMouseEnter={() => openDropdown('signature-programs')}
              onMouseLeave={closeDropdown}
            >
              <div 
                ref={signatureProgramsRef}
                className="p-6 md:p-8 lg:p-10 max-h-[80vh] overflow-y-auto overflow-x-hidden custom-scrollbar"
                data-lenis-prevent
              >
                <div className="flex items-center justify-between mb-8">
                  <Link href="/signature-programs" className="text-sm text-maroon hover:text-maroon-light font-medium flex items-center gap-2 transition-colors">
                    View All Signature Programmes <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {navigationData.signaturePrograms.map((program) => (
                    <Link key={program.name} href={program.href} className="group/card relative p-5 rounded-2xl border border-maroon/5 hover:border-maroon/20 hover:bg-maroon/[0.02] transition-all duration-300">
                      <div className="relative">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <h4 className="font-display text-xl text-maroon group-hover/card:text-maroon-light transition-colors duration-300">{program.name}</h4>
                          <ArrowRight className="w-4 h-4 text-maroon opacity-0 -translate-x-2 group-hover/card:opacity-100 group-hover/card:translate-x-0 transition-all duration-300 shrink-0 mt-1" />
                        </div>
                        <p className="text-sm text-charcoal/60 font-medium mb-2">{program.subtitle}</p>
                        <p className="text-sm text-charcoal/50 font-light leading-relaxed mb-3 line-clamp-2">{program.description}</p>
                        <div className="flex items-center gap-2 text-xs text-charcoal/40">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{program.duration}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link href="/#about" className={linkClasses}>About</Link>
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            {isHomepage ? (
              <button 
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  scrollToElementBypassingLenis('contact', 100);
                }}
                className={`text-sm px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 cursor-pointer ${
                  useTransparentStyle 
                    ? 'bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white/40 hover:border-white/80 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]' 
                    : 'bg-maroon text-cream hover:bg-maroon-light hover:shadow-soft-lg'
                }`}
              >
                Book Appointment
              </button>
            ) : (
              <button 
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  openBookingModal();
                }}
                className="text-sm px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 bg-maroon text-cream hover:bg-maroon-light hover:shadow-soft-lg cursor-pointer"
              >
                Book Appointment
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 z-50 relative transition-colors duration-300 ${
              isMobileMenuOpen 
                ? 'text-charcoal' // Always dark when menu is open (on light drawer)
                : useTransparentStyle ? 'text-white' : 'text-charcoal'
            }`}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* 
        =============================================
        MOBILE MENU - FULL SCREEN EDITORIAL TAKEOVER
        =============================================
      */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuContainerVariants}
            className="fixed inset-0 bg-beige-warm z-40 lg:hidden overflow-y-auto overflow-x-hidden"
          >
            <div className="min-h-screen flex flex-col pt-24 px-6 pb-12">
              
              {/* Menu Items Container */}
              <div className="flex-1 space-y-0 divide-y divide-maroon/10 border-t border-maroon/10 relative mt-12">

                {/* Close Button - Internal */}
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="absolute -top-20 right-0 p-2 text-charcoal/50 hover:text-maroon transition-colors"
                  aria-label="Close menu"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
                
                {/* 1. HOME */}
                <motion.div variants={menuItemVariants} className="group">
                  <Link 
                    href="/" 
                    onClick={() => setIsMobileMenuOpen(false)} 
                    className="block py-6 text-2xl font-display text-charcoal hover:text-maroon transition-colors"
                  >
                    Home
                  </Link>
                </motion.div>

                {/* 2. TREATMENTS (Accordion) */}
                <motion.div variants={menuItemVariants} className="group">
                  <button 
                    onClick={() => toggleMobileDropdown('treatments')}
                    className="flex items-center justify-between w-full py-6 text-2xl font-display text-charcoal hover:text-maroon transition-colors text-left"
                  >
                    Treatments
                    <span className={`transform transition-transform duration-300 ${activeMobileDropdown === 'treatments' ? 'rotate-180' : 'rotate-0'}`}>
                      <ChevronDown className="w-5 h-5 text-maroon/40 group-hover:text-maroon" />
                    </span>
                  </button>
                  
                  <AnimatePresence>
                    {activeMobileDropdown === 'treatments' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="overflow-hidden"
                      >
                        <div className="pb-8 space-y-6">
                          {navigationData.treatments.map((pillar) => (
                            <div key={pillar.pillar} className="space-y-3">
                              <h3 className="font-sans text-xs text-maroon/60 font-bold uppercase tracking-widest pl-1">{pillar.pillar}</h3>
                              <div className="space-y-1 divide-y divide-maroon/5 border-t border-b border-maroon/5">
                                {pillar.categories.map((category) => (
                                  <div key={category.category} className="overflow-hidden">
                                    {/* Category Toggle */}
                                    <button 
                                      onClick={() => toggleMobileCategory(category.category)}
                                      className="w-full flex items-center justify-between py-4 px-2 text-left hover:bg-maroon/5 transition-colors group/cat"
                                    >
                                      <StylizedText 
                                        text={category.category} 
                                        className="font-display text-lg text-charcoal group-hover/cat:text-maroon transition-colors"
                                        ampersandClassName="font-serif italic text-maroon/60"
                                      />
                                      <ChevronDown className={`w-4 h-4 text-maroon/30 transition-transform duration-300 ${activeMobileCategory === category.category ? 'rotate-180' : ''}`} />
                                    </button>

                                    {/* Nested Items */}
                                    <AnimatePresence>
                                      {activeMobileCategory === category.category && (
                                        <motion.div
                                          initial={{ height: 0, opacity: 0 }}
                                          animate={{ height: 'auto', opacity: 1 }}
                                          exit={{ height: 0, opacity: 0 }}
                                          transition={{ duration: 0.3 }}
                                          className="overflow-hidden bg-maroon/[0.02]"
                                        >
                                          <div className="pl-6 py-2 space-y-1 border-l-2 border-maroon/10 ml-4 mb-4">
                                            <Link 
                                              href={category.href}
                                              onClick={() => setIsMobileMenuOpen(false)}
                                              className="flex items-center gap-2 text-xs font-bold text-maroon uppercase tracking-wider py-3 px-2 rounded-lg hover:bg-maroon/5 transition-colors"
                                            >
                                              Overview
                                              <ArrowRight className="w-3 h-3" />
                                            </Link>
                                            {category.items.map((item) => (
                                              <Link 
                                                key={item.name} 
                                                href={item.href}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className="flex items-center justify-between text-base text-charcoal/80 hover:text-maroon py-3 px-2 rounded-lg hover:bg-maroon/5 transition-all font-medium border-b border-maroon/5 last:border-0"
                                              >
                                                {item.name}
                                                <ArrowRight className="w-4 h-4 text-maroon/30" />
                                              </Link>
                                            ))}
                                          </div>
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* 3. CONDITIONS (Accordion) */}
                <motion.div variants={menuItemVariants} className="group">
                  <button 
                    onClick={() => toggleMobileDropdown('conditions')}
                    className="flex items-center justify-between w-full py-6 text-2xl font-display text-charcoal hover:text-maroon transition-colors text-left"
                  >
                    Conditions
                    <span className={`transform transition-transform duration-300 ${activeMobileDropdown === 'conditions' ? 'rotate-180' : 'rotate-0'}`}>
                      <ChevronDown className="w-5 h-5 text-maroon/40 group-hover:text-maroon" />
                    </span>
                  </button>
                  
                  <AnimatePresence>
                    {activeMobileDropdown === 'conditions' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="overflow-hidden"
                      >
                        <div className="pb-8 space-y-2">
                          {navigationData.conditions.map((group) => (
                            <div key={group.group} className="overflow-hidden border-b border-maroon/5 last:border-0">
                              {/* Group Toggle */}
                              <button 
                                onClick={() => toggleMobileCategory(group.group)}
                                className="w-full flex items-center justify-between py-4 px-2 text-left hover:bg-maroon/5 transition-colors group/cat"
                              >
                                <span className="font-serif text-lg text-charcoal group-hover/cat:text-maroon transition-colors">
                                  {group.group}
                                </span>
                                <ChevronDown className={`w-4 h-4 text-maroon/30 transition-transform duration-300 transform ${activeMobileCategory === group.group ? 'rotate-180' : 'rotate-0'}`} />
                              </button>

                              {/* Nested Items */}
                              <AnimatePresence>
                                {activeMobileCategory === group.group && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden bg-maroon/[0.02]"
                                  >
                                    <div className="pl-6 py-2 space-y-1 border-l-2 border-maroon/10 ml-4 mb-4">
                                      {group.items.map((item) => (
                                        <Link 
                                          key={item.name} 
                                          href={item.href}
                                          onClick={() => setIsMobileMenuOpen(false)}
                                          className="block group/item py-2"
                                        >
                                          <div className="flex items-center justify-between pr-4">
                                             <span className={`text-sm ${item.isTopConcern ? 'text-maroon font-medium' : 'text-charcoal/70'} group-hover/item:text-maroon transition-colors font-light`}>
                                              {item.name}
                                            </span>
                                            {item.isTopConcern && <StarIcon className="w-3 h-3 text-maroon/40" />}
                                          </div>
                                        </Link>
                                      ))}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* 4. SIGNATURE PROGRAMS (Accordion) */}
                <motion.div variants={menuItemVariants} className="group">
                  <button 
                    onClick={() => toggleMobileDropdown('signature-programs')}
                    className="flex items-center justify-between w-full py-6 text-2xl font-display text-charcoal hover:text-maroon transition-colors text-left"
                  >
                    Signature Programs
                    <span className={`transform transition-transform duration-300 ${activeMobileDropdown === 'signature-programs' ? 'rotate-180' : 'rotate-0'}`}>
                      <ChevronDown className="w-5 h-5 text-maroon/40 group-hover:text-maroon" />
                    </span>
                  </button>
                  
                  <AnimatePresence>
                    {activeMobileDropdown === 'signature-programs' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="overflow-hidden"
                      >
                        <div className="pb-8 pt-2 space-y-3">
                          {navigationData.signaturePrograms.map((program) => (
                            <Link 
                              key={program.name} 
                              href={program.href} 
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="block p-4 rounded-xl bg-white border border-maroon/5 hover:border-maroon/20 transition-all shadow-sm group/prog"
                            >
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-serif text-maroon font-medium text-lg group-hover/prog:text-maroon-dark transition-colors">{program.name}</span>
                                <ArrowRight className="w-4 h-4 text-maroon/40" />
                              </div>
                              <p className="text-xs text-maroon/60 mb-1">{program.subtitle}</p>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* 5. ABOUT */}
                <motion.div variants={menuItemVariants} className="group">
                  <Link 
                    href="/#about" 
                    onClick={() => setIsMobileMenuOpen(false)} 
                    className="block py-6 text-2xl font-display text-charcoal hover:text-maroon transition-colors"
                  >
                    About
                  </Link>
                </motion.div>

              </div>

              {/* Footer / CTA */}
              <motion.div variants={menuItemVariants} className="mt-12 space-y-6">
                <button 
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsMobileMenuOpen(false);
                    if (isHomepage) {
                      scrollToElementBypassingLenis('contact', 100);
                    } else {
                      openBookingModal();
                    }
                  }}
                  className="w-full py-5 rounded-full bg-maroon text-cream font-medium text-lg shadow-lg hover:bg-maroon-light transition-all active:scale-95"
                >
                  Book Appointment
                </button>
                
                <div className="text-center space-y-2">
                  <p className="text-xs text-maroon/60 tracking-widest uppercase font-bold">Pragna Skin Clinic</p>
                  <p className="text-xs text-charcoal/40 font-light">Advanced Dermatological Care</p>
                </div>
              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
