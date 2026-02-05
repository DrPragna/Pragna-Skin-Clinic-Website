'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { navigationData } from '@/lib/navigationData';
import { useBookingModal } from '@/components/ui/BookingModal';
import { motion, AnimatePresence } from 'framer-motion';

// Icons
const ChevronDown = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m6 9 6 6 6-6"/>
  </svg>
);

const ChevronRight = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m9 18 6-6-6-6"/>
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

const PlusMinusIcon = ({ isOpen, className = '' }: { isOpen: boolean; className?: string }) => (
  <div className={`relative w-5 h-5 ${className}`}>
    <span className="absolute top-1/2 left-0 w-full h-[1.5px] bg-current transform -translate-y-1/2 transition-all duration-300 ease-out" />
    <span className={`absolute top-0 left-1/2 w-[1.5px] h-full bg-current transform -translate-x-1/2 transition-all duration-300 ease-out ${isOpen ? 'scale-y-0 opacity-0' : 'scale-y-100 opacity-100'}`} />
  </div>
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
  hidden: { 
    x: '100%',
  },
  visible: {
    x: '0%',
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    x: '100%',
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
} as const;

const menuItemVariants = {
  hidden: {},
  visible: {},
  exit: {},
} as const;

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
      document.documentElement.style.overflow = 'hidden';
      document.body.classList.add('mobile-menu-open');
      // Also stop lenis if it exists
      window.lenis?.stop();
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.classList.remove('mobile-menu-open');
      window.lenis?.start();
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.classList.remove('mobile-menu-open');
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
  
  // Defines if we are at the top of the homepage (Hero section) - independent of menu state
  const isAtHeroSection = hasMounted && isHomepage && !isScrolled;
  
  // Use transparent style (white text) only when menu is CLOSED. When open, we want the dark/solid style for contrast with the beige menu.
  const useTransparentStyle = isAtHeroSection && !isMobileMenuOpen;

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
          isAtHeroSection ? 'opacity-0' : 'opacity-100'
        }`}
      />
      <div 
        className={`absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-transparent transition-opacity duration-300 ease-in-out ${
          isAtHeroSection ? 'opacity-100' : 'opacity-0'
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
                isAtHeroSection
                  ? 'brightness-0 invert' 
                  : ''
              }`}
              priority
            />
            <div className={`flex flex-col -ml-4 transition-colors duration-300 ${
              isAtHeroSection 
                ? 'text-white' 
                : 'text-charcoal'
            }`}>
              <span className="font-display font-normal text-[1.25rem] tracking-[0.02em] uppercase leading-none">
                Pragna
              </span>
              <span className={`font-sans text-[0.45rem] tracking-[0.15em] uppercase leading-tight mt-0.5 ${
                isAtHeroSection 
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
            <button 
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                openBookingModal();
              }}
              className={`text-sm px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 cursor-pointer ${
                useTransparentStyle 
                  ? 'bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white/40 hover:border-white/80 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]' 
                  : 'bg-maroon text-cream hover:bg-maroon-light hover:shadow-soft-lg'
              }`}
            >
              Book Appointment
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-4 z-50 relative transition-colors duration-300 ${
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
        MOBILE MENU - CINEMATIC FOCUS EXPERIENCE
        =============================================
      */}
      <AnimatePresence mode="wait">
        {isMobileMenuOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="fixed inset-0 bg-black/20 z-[35] lg:hidden backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Main Menu Container */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: '0%' }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-0 h-[100dvh] bg-cream z-40 lg:hidden overflow-hidden flex flex-col"
            >
              {/* Cinematic Background */}
              <div className="absolute inset-0 z-0 pointer-events-none">
                <Image
                  src="/mobile-menu.webp"
                  alt="Menu Background"
                  fill
                  className="object-cover object-[center_60%] opacity-100"
                  priority
                />
                {/* Editorial Gradient Overlay - Ensures text legibility while keeping mood */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#FDFBF9]/95 via-[#FDFBF9]/85 to-[#FDFBF9]/95 backdrop-blur-[2px]" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#FDFBF9]/90 to-transparent" />
              </div>

              {/* Content Layer */}
              <div className="relative z-10 flex flex-col h-full">
                
                {/* Focus View Container */}
                <div className="flex-1 relative overflow-hidden">
                  <AnimatePresence mode="wait" initial={false}>
                    {activeMobileDropdown === null ? (
                      /* MAIN MENU VIEW */
                      <motion.div
                        key="main-menu"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute inset-0 flex flex-col h-full overflow-y-auto custom-scrollbar overscroll-contain"
                      >
                        {/* Header: Branding & Close (Moved inside Main Menu) */}
                        <div className="flex items-center justify-between px-8 pt-8 pb-6 border-b border-maroon/20 shrink-0 bg-gradient-to-b from-[#FDFBF9]/95 to-transparent">
                          <div className="flex flex-col">
                            <span className="font-display text-3xl text-maroon tracking-wide">Pragna</span>
                            <span className="font-sans text-[0.6rem] text-maroon/60 uppercase tracking-[0.25em] font-medium mt-0.5">Advanced Skin Clinic</span>
                          </div>

                          <button 
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="group relative w-12 h-12 flex items-center justify-center transition-all duration-300 active:scale-90"
                            aria-label="Close menu"
                          >
                            <span className="absolute inset-0 bg-maroon/0 rounded-full transition-colors duration-300 group-active:bg-maroon/5" />
                            <svg className="w-8 h-8 text-maroon/80 transition-colors duration-300 group-active:text-maroon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>

                        <div className="flex-1 px-8 flex flex-col pt-12 pb-8 min-h-0">
                          <nav className="space-y-8">
                          <Link 
                            href="/" 
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block text-4xl md:text-5xl font-display font-light leading-tight text-charcoal hover:text-maroon transition-all duration-300 transform origin-left hover:scale-[1.02]"
                          >
                            Home
                          </Link>
                          
                          <button 
                            onClick={() => setActiveMobileDropdown('treatments')}
                            className="flex items-center justify-between w-full text-4xl md:text-5xl font-display font-light leading-tight text-charcoal hover:text-maroon transition-all duration-300 text-left group"
                          >
                            <span>Treatments</span>
                            <ChevronRight className="w-6 h-6 text-maroon/30 group-hover:text-maroon group-hover:translate-x-2 transition-all duration-300" />
                          </button>

                          <button 
                            onClick={() => setActiveMobileDropdown('conditions')}
                            className="flex items-center justify-between w-full text-4xl md:text-5xl font-display font-light leading-tight text-charcoal hover:text-maroon transition-all duration-300 text-left group"
                          >
                            <span>Conditions</span>
                            <ChevronRight className="w-6 h-6 text-maroon/30 group-hover:text-maroon group-hover:translate-x-2 transition-all duration-300" />
                          </button>

                          <button 
                            onClick={() => setActiveMobileDropdown('programs')}
                            className="flex items-center justify-between w-full text-4xl md:text-5xl font-display font-light leading-tight text-charcoal hover:text-maroon transition-all duration-300 text-left group"
                          >
                            <span>Signature Programs</span>
                            <ChevronRight className="w-6 h-6 text-maroon/30 group-hover:text-maroon group-hover:translate-x-2 transition-all duration-300" />
                          </button>

                          <Link 
                            href="/#about" 
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block text-4xl md:text-5xl font-display font-light leading-tight text-charcoal hover:text-maroon transition-all duration-300 transform origin-left hover:scale-[1.02]"
                          >
                            About
                          </Link>
                        </nav>

                        {/* CTA Footer in Main View */}
                        <div className="mt-auto pt-8 space-y-4">
                          <button 
                            onClick={() => { setIsMobileMenuOpen(false); openBookingModal(); }}
                            className="w-full py-3.5 bg-maroon text-cream font-medium text-base rounded-full shadow-lg"
                          >
                            Book Appointment
                          </button>
                          
                          <a
                            href="https://wa.me/918886531111?text=Hi%2C%20I%20would%20like%20to%20book%20a%20consultation%20at%20Pragna%20Skin%20Clinic."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-3.5 bg-transparent border border-maroon/20 text-maroon font-medium text-base rounded-full flex items-center justify-center gap-2 hover:bg-maroon/5 transition-colors"
                          >
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            Contact on WhatsApp
                          </a>
                        </div>
                        </div>
                      </motion.div>
                    ) : (
                      /* FOCUS VIEW (Generic Container for Sub-menus) */
                      <motion.div
                        key="focus-view"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute inset-0 flex flex-col bg-transparent"
                      >
                        {/* Focus Header */}
                        <div className="px-6 pb-6 pt-8 border-b border-maroon/20 flex items-center justify-between shrink-0 bg-gradient-to-b from-[#FDFBF9]/95 to-transparent">
                          <h2 className="text-3xl font-display font-light text-maroon">
                            {activeMobileDropdown === 'treatments' && 'Treatments'}
                            {activeMobileDropdown === 'conditions' && 'Conditions'}
                            {activeMobileDropdown === 'programs' && 'Signature Programs'}
                          </h2>
                          <button 
                            onClick={() => setActiveMobileDropdown(null)}
                            className="text-xs font-bold text-maroon/60 hover:text-maroon flex items-center gap-2 uppercase tracking-widest"
                          >
                            <span className="text-lg leading-none mb-0.5">←</span> Back
                          </button>
                        </div>

                        {/* Scrollable Content Area */}
                        <div className="flex-1 overflow-y-auto px-6 py-8 custom-scrollbar overscroll-contain">
                          
                          {/* TREATMENTS CONTENT */}
                          {activeMobileDropdown === 'treatments' && (
                            <div className="space-y-0 pb-20">
                               {/* View All Button - Integrated more cleanly */}
                                <div className="flex justify-start border-b border-maroon/10">
                                  <Link 
                                    href="/treatments" 
                                    onClick={() => setIsMobileMenuOpen(false)} 
                                    className="flex items-center gap-2 py-4 hover:opacity-70 transition-opacity"
                                  >
                                    <span className="font-sans text-xs font-bold uppercase tracking-widest text-maroon">View All Treatments</span>
                                    <ArrowRight className="w-4 h-4 text-maroon" />
                                  </Link>
                                </div>
                              
                              {navigationData.treatments.map((pillar, idx) => (
                                <motion.div 
                                  key={pillar.pillar}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: idx * 0.05, duration: 0.4 }}
                                  className="space-y-0"
                                >
                                  {pillar.categories.map((category) => (
                                      <div key={category.category} className="group/cat border-b border-maroon/10 last:border-0">
                                        <button 
                                          onClick={() => toggleMobileCategory(category.category)}
                                          className="w-full flex items-center justify-between py-4 px-2 -ml-2 text-left transition-colors hover:bg-maroon/[0.02] rounded-lg"
                                        >
                                          <div className="pr-4">
                                            {/* Pillar Label Small */}
                                            <h3 className="text-[0.6rem] font-bold text-maroon/40 uppercase tracking-[0.2em] mb-1.5">{pillar.pillar}</h3>
                                            {/* Category Title - Reduced Size */}
                                            <StylizedText 
                                              text={category.category} 
                                              className={`font-display text-xl transition-colors duration-300 ${activeMobileCategory === category.category ? 'text-maroon' : 'text-charcoal'}`}
                                              ampersandClassName="font-serif italic text-maroon/60"
                                            />
                                          </div>
                                          <div className={`shrink-0 text-maroon transition-transform duration-300 ${activeMobileCategory === category.category ? 'rotate-180' : ''}`}>
                                            <PlusMinusIcon isOpen={activeMobileCategory === category.category} />
                                          </div>
                                        </button>
                                        
                                        <AnimatePresence>
                                          {activeMobileCategory === category.category && (
                                            <motion.div
                                              initial={{ height: 0, opacity: 0 }}
                                              animate={{ height: 'auto', opacity: 1 }}
                                              exit={{ height: 0, opacity: 0 }}
                                              transition={{ duration: 0.3, ease: 'easeOut' }}
                                              className="overflow-hidden bg-maroon/[0.02]"
                                            >
                                              <div className="px-4 py-4 space-y-1">
                                                {/* Overview Link - More Prominent */}
                                                <Link 
                                                  href={category.href}
                                                  onClick={() => setIsMobileMenuOpen(false)}
                                                  className="flex items-center gap-3 py-3 px-3 -mx-2 rounded-lg bg-white/50 border border-maroon/5 text-maroon mb-2"
                                                >
                                                  <span className="font-sans text-xs font-bold uppercase tracking-wider">Overview</span>
                                                  <ArrowRight className="w-3.5 h-3.5 ml-auto" />
                                                </Link>
                                                
                                                {/* Sub Items - Clear Clickable Look */}
                                                {category.items.map((item) => (
                                                  <Link 
                                                    key={item.name}
                                                    href={item.href}
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                    className="block py-2.5 px-3 -mx-2 rounded-lg text-base text-charcoal/80 hover:text-maroon hover:bg-maroon/5 transition-colors flex items-center justify-between group/link"
                                                  >
                                                    <span>{item.name}</span>
                                                    <ArrowRight className="w-3 h-3 text-maroon/30 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                                                  </Link>
                                                ))}
                                              </div>
                                            </motion.div>
                                          )}
                                        </AnimatePresence>
                                      </div>
                                    ))}
                                </motion.div>
                              ))}
                            </div>
                          )}

                          {/* CONDITIONS CONTENT */}
                          {activeMobileDropdown === 'conditions' && (
                            <div className="space-y-0 pb-20">
                                <div className="flex justify-start border-b border-maroon/10">
                                  <Link 
                                    href="/conditions" 
                                    onClick={() => setIsMobileMenuOpen(false)} 
                                    className="flex items-center gap-2 py-4 hover:opacity-70 transition-opacity"
                                  >
                                    <span className="font-sans text-xs font-bold uppercase tracking-widest text-maroon">View All Conditions</span>
                                    <ArrowRight className="w-4 h-4 text-maroon" />
                                  </Link>
                                </div>

                              {navigationData.conditions.map((group, idx) => (
                                <motion.div 
                                  key={group.group}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: idx * 0.05, duration: 0.4 }}
                                  className="space-y-0"
                                >
                                  {/* Accordion Group */}
                                  <div className="group/cat border-b border-maroon/10 last:border-0">
                                    <button 
                                      onClick={() => toggleMobileCategory(group.group)}
                                      className="w-full flex items-center justify-between py-4 px-2 -ml-2 text-left transition-colors hover:bg-maroon/[0.02] rounded-lg"
                                    >
                                      <h3 className={`font-display text-xl transition-colors duration-300 ${activeMobileCategory === group.group ? 'text-maroon' : 'text-charcoal'}`}>{group.group}</h3>
                                      <div className={`shrink-0 text-maroon transition-transform duration-300 ${activeMobileCategory === group.group ? 'rotate-180' : ''}`}>
                                        <PlusMinusIcon isOpen={activeMobileCategory === group.group} />
                                      </div>
                                    </button>

                                    <AnimatePresence>
                                      {activeMobileCategory === group.group && (
                                        <motion.div
                                          initial={{ height: 0, opacity: 0 }}
                                          animate={{ height: 'auto', opacity: 1 }}
                                          exit={{ height: 0, opacity: 0 }}
                                          transition={{ duration: 0.3, ease: 'easeOut' }}
                                          className="overflow-hidden bg-maroon/[0.02]"
                                        >
                                          <div className="px-4 py-4 space-y-1">
                                            {group.items.map((item) => (
                                              <Link 
                                                key={item.name} 
                                                href={item.href}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className="block py-2.5 px-3 -mx-2 rounded-lg text-base text-charcoal/80 hover:text-maroon hover:bg-maroon/5 transition-colors flex items-center justify-between group/link"
                                              >
                                                <span className={`flex items-center gap-2 ${item.isTopConcern ? 'text-maroon font-medium' : ''}`}>
                                                  {item.name}
                                                  {item.isTopConcern && <StarIcon className="w-3 h-3 text-rose-gold" />}
                                                </span>
                                                <ArrowRight className="w-3 h-3 text-maroon/30 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                                              </Link>
                                            ))}
                                          </div>
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          )}

                          {/* SIGNATURE PROGRAMS CONTENT */}
                          {activeMobileDropdown === 'programs' && (
                            <div className="space-y-0 pb-20">
                                <div className="flex justify-start border-b border-maroon/10">
                                  <Link 
                                    href="/signature-programs" 
                                    onClick={() => setIsMobileMenuOpen(false)} 
                                    className="flex items-center gap-2 py-4 hover:opacity-70 transition-opacity"
                                  >
                                    <span className="font-sans text-xs font-bold uppercase tracking-widest text-maroon">View All Programs</span>
                                    <ArrowRight className="w-4 h-4 text-maroon" />
                                  </Link>
                                </div>

                              {navigationData.signaturePrograms.map((program, idx) => (
                                <motion.div 
                                  key={program.name} 
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: idx * 0.05, duration: 0.4 }}
                                >
                                  <Link
                                    href={program.href} 
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block py-4 px-2 -ml-2 border-b border-maroon/10 last:border-0 group hover:bg-maroon/[0.02] rounded-lg transition-colors"
                                  >
                                    <div className="flex justify-between items-center mb-1">
                                      <h4 className="font-display text-xl text-charcoal group-hover:text-maroon transition-colors">{program.name}</h4>
                                      <ArrowRight className="w-4 h-4 text-maroon/30 group-hover:text-maroon transition-colors" />
                                    </div>
                                    <p className="text-sm text-charcoal/50 font-normal leading-relaxed line-clamp-1">{program.subtitle}</p>
                                  </Link>
                                </motion.div>
                              ))}
                            </div>
                          )}

                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
