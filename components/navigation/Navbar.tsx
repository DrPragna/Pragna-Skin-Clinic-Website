'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { navigationData } from '@/lib/navigationData';
import { useBookingModal } from '@/components/ui/BookingModal';
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

// Simple ChevronDown Icon
const ChevronDown = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="m6 9 6 6 6-6"/>
  </svg>
);

// Arrow Icon for clickable items
const ArrowRight = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

// Star Icon for Top Concerns
const StarIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
  </svg>
);

// Helper component for stylized ampersand - now more prominent
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

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState<string | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const { openBookingModal } = useBookingModal();
  
  const treatmentsRef = useRef<HTMLDivElement>(null);
  const conditionsRef = useRef<HTMLDivElement>(null);
  const signatureProgramsRef = useRef<HTMLDivElement>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle dropdown with delay for better UX (allows diagonal mouse movement)
  const openDropdown = useCallback((name: string) => {
    // Clear any pending close timeout
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setActiveDropdown(name);
  }, []);

  const closeDropdown = useCallback(() => {
    // Delay closing to allow mouse to travel to megamenu
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150); // 150ms delay gives time to reach the megamenu
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  // Mark as mounted and set initial scroll state
  useEffect(() => {
    setHasMounted(true);
    setIsScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu and desktop megamenu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveMobileDropdown(null);
    setActiveDropdown(null);
    // Clear any pending timeout
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
  }, [pathname]);

  // Toggle body class for mega-menu blur effect
  useEffect(() => {
    if (activeDropdown) {
      document.body.classList.add('mega-menu-open');
    } else {
      document.body.classList.remove('mega-menu-open');
    }
    
    // Cleanup on unmount
    return () => {
      document.body.classList.remove('mega-menu-open');
    };
  }, [activeDropdown]);

  const toggleMobileDropdown = (name: string) => {
    setActiveMobileDropdown(activeMobileDropdown === name ? null : name);
  };

  // Check if we're on the homepage (with video hero)
  const isHomepage = pathname === '/';
  
  // Only use transparent styling on homepage when not scrolled
  // Wait for mount to avoid hydration mismatch
  const useTransparentStyle = hasMounted && isHomepage && !isScrolled;

  // Determine navbar styles based on scroll state and page
  const navbarClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    useTransparentStyle
      ? 'bg-gradient-to-b from-black/50 via-black/20 to-transparent'
      : 'bg-beige-warm/95 backdrop-blur-md shadow-soft'
  }`;

  const linkClasses = `transition-colors duration-200 font-medium cursor-pointer flex items-center gap-1 ${
    useTransparentStyle 
      ? 'text-white/90 hover:text-white' 
      : 'text-charcoal/80 hover:text-maroon'
  }`;

  return (
    <nav className={navbarClasses}>
      <div className="section-container">
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
          <div className="hidden lg:flex items-center space-x-8">
            <Link href="/" className={linkClasses}>Home</Link>
            
            {/* Treatments Dropdown (Mega Menu) */}
            <div 
              className="relative py-4"
              onMouseEnter={() => openDropdown('treatments')}
              onMouseLeave={closeDropdown}
            >
              <span className={`${linkClasses} ${activeDropdown === 'treatments' ? 'text-maroon' : ''}`}>
                Treatments
                <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'treatments' ? 'rotate-180' : ''}`} />
              </span>
            </div>
            
            {/* Mega Menu Dropdown - Positioned outside trigger for proper hover handling */}
            <div 
              className={`fixed top-[80px] left-1/2 -translate-x-1/2 w-[calc(100vw-2rem)] max-w-[1400px] bg-white shadow-[0_40px_60px_-15px_rgba(0,0,0,0.1)] rounded-[2rem] border border-gray-100 transition-all duration-500 z-50 overflow-hidden ${
                activeDropdown === 'treatments' 
                  ? 'opacity-100 visible translate-y-0 pointer-events-auto' 
                  : 'opacity-0 invisible translate-y-4 pointer-events-none'
              }`}
              onMouseEnter={() => openDropdown('treatments')}
              onMouseLeave={closeDropdown}
            >
              {/* Scrollable Content */}
              <div 
                ref={treatmentsRef}
                className="p-6 md:p-8 lg:p-12 max-h-[80vh] overflow-y-auto overflow-x-hidden custom-scrollbar"
                data-lenis-prevent
              >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-8">
                    <Link 
                      href="/treatments"
                      className="text-sm text-maroon hover:text-maroon-light font-medium flex items-center gap-2 transition-colors"
                    >
                      View All Treatments
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
                    {navigationData.treatments.map((pillar) => (
                      <div key={pillar.pillar} className="space-y-8">
                        {/* Pillar Header */}
                        <div className="relative">
                          <h3 className="font-sans text-xs text-maroon/80 font-bold uppercase tracking-[0.25em] mb-6">
                            {pillar.pillar}
                          </h3>
                          {/* Decorative Line */}
                          <div className="absolute -bottom-2 left-0 w-12 h-px bg-maroon/20" />
                        </div>
                        
                        {/* Categories */}
                        <div className="space-y-8">
                          {pillar.categories.map((category) => (
                            <div key={category.category} className="group/cat">
                              {/* Treatment Family Title */}
                              <Link 
                                href={category.href}
                                className="block mb-3 group/title relative pl-4 -ml-4 rounded-lg hover:bg-maroon/5 transition-all duration-300 py-2"
                              >
                                <div className="flex items-center justify-between pr-4">
                                  <h4 className="font-display text-xl text-charcoal group-hover/title:text-maroon transition-colors duration-300 leading-tight relative z-10">
                                    <StylizedText 
                                      text={category.category} 
                                      ampersandClassName="font-serif italic text-maroon/60"
                                    />
                                    {/* Underline Expand Animation */}
                                    <span className="absolute left-0 -bottom-1 w-0 h-px bg-maroon/40 transition-all duration-500 group-hover/title:w-full" />
                                  </h4>
                                  <ArrowRight className="w-4 h-4 text-maroon opacity-0 -translate-x-2 group-hover/title:opacity-100 group-hover/title:translate-x-0 transition-all duration-300" />
                                </div>
                              </Link>
                              
                              {/* Sub-treatments */}
                              <ul className="space-y-1 pl-2 border-l border-maroon/10 ml-2">
                                {category.items.map((item) => (
                                  <li key={item.name}>
                                    <Link 
                                      href={item.href}
                                      className="group/item flex items-center justify-between text-sm text-charcoal/60 hover:text-maroon hover:bg-maroon/5 px-3 py-1.5 rounded-md transition-all duration-300 font-light"
                                    >
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

            {/* Conditions Dropdown Trigger */}
            <div 
              className="relative py-4"
              onMouseEnter={() => openDropdown('conditions')}
              onMouseLeave={closeDropdown}
            >
              <span className={`${linkClasses} ${activeDropdown === 'conditions' ? 'text-maroon' : ''}`}>
                Conditions
                <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'conditions' ? 'rotate-180' : ''}`} />
              </span>
            </div>
            
            {/* Conditions Mega Menu - Positioned outside trigger for proper hover handling */}
            <div 
              className={`fixed top-[80px] left-1/2 -translate-x-1/2 w-[calc(100vw-2rem)] max-w-[1200px] bg-white shadow-[0_40px_60px_-15px_rgba(0,0,0,0.1)] rounded-[2rem] border border-gray-100 transition-all duration-500 z-50 overflow-hidden ${
                activeDropdown === 'conditions' 
                  ? 'opacity-100 visible translate-y-0 pointer-events-auto' 
                  : 'opacity-0 invisible translate-y-4 pointer-events-none'
              }`}
              onMouseEnter={() => openDropdown('conditions')}
              onMouseLeave={closeDropdown}
            >
              {/* Scrollable Content */}
              <div 
                ref={conditionsRef}
                className="p-6 md:p-8 lg:p-12 max-h-[80vh] overflow-y-auto overflow-x-hidden custom-scrollbar"
                data-lenis-prevent
              >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-8">
                    <Link 
                      href="/conditions"
                      className="text-sm text-maroon hover:text-maroon-light font-medium flex items-center gap-2 transition-colors"
                    >
                      View All Conditions
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-10">
                    {/* Skin - Spans 5 columns on lg */}
                    <div className="lg:col-span-5 space-y-6 md:space-y-8 lg:border-r border-maroon/5 lg:pr-8">
                      <div className="relative">
                      <h3 className="font-sans text-xs text-maroon/80 font-bold uppercase tracking-[0.25em] mb-6">
                          {navigationData.conditions[0].group}
                      </h3>
                        {/* Decorative Line */}
                        <div className="absolute -bottom-2 left-0 w-12 h-px bg-maroon/20" />
                      </div>
                      <div className="space-y-6">
                        {navigationData.conditions[0].items.map((item) => (
                          <Link 
                            key={item.name} 
                            href={item.href}
                            className="group/item block p-4 -mx-4 rounded-2xl hover:bg-maroon/5 transition-all duration-300 cursor-pointer"
                          >
                            <div className="flex items-baseline justify-between gap-4 mb-1">
                              <span className={`text-lg font-display ${item.isTopConcern ? 'text-maroon font-medium' : 'text-charcoal'} group-hover/item:text-maroon group-hover/item:font-medium transition-all duration-300`}>
                                {item.name}
                              </span>
                              {item.isTopConcern && <StarIcon className="w-3 h-3 text-rose-gold shrink-0" />}
                            </div>
                            {item.subtitle && (
                              <p className="text-sm text-charcoal/50 font-light leading-relaxed group-hover/item:text-charcoal/70 transition-colors">
                                {item.subtitle}
                              </p>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Hair - Spans 3 columns on lg */}
                    <div className="lg:col-span-3 space-y-6 md:space-y-8 lg:border-r border-maroon/5 lg:pr-8">
                      <div className="relative">
                      <h3 className="font-sans text-xs text-maroon/80 font-bold uppercase tracking-[0.25em] mb-6">
                          {navigationData.conditions[1].group}
                      </h3>
                        {/* Decorative Line */}
                        <div className="absolute -bottom-2 left-0 w-12 h-px bg-maroon/20" />
                      </div>
                      <div className="space-y-6">
                        {navigationData.conditions[1].items.map((item) => (
                          <Link 
                            key={item.name} 
                            href={item.href}
                            className="group/item block p-4 -mx-4 rounded-2xl hover:bg-maroon/5 transition-all duration-300 cursor-pointer"
                          >
                            <div className="flex items-baseline justify-between gap-4 mb-1">
                              <span className={`text-lg font-display ${item.isTopConcern ? 'text-maroon font-medium' : 'text-charcoal'} group-hover/item:text-maroon group-hover/item:font-medium transition-all duration-300`}>
                                {item.name}
                              </span>
                              {item.isTopConcern && <StarIcon className="w-3 h-3 text-rose-gold shrink-0" />}
                            </div>
                            {item.subtitle && (
                              <p className="text-sm text-charcoal/50 font-light leading-relaxed group-hover/item:text-charcoal/70 transition-colors">
                                {item.subtitle}
                              </p>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Body & Other - Spans 4 columns on lg, full width on md */}
                    <div className="md:col-span-2 lg:col-span-4 space-y-8 md:space-y-10">
                      {/* Body */}
                      <div>
                        <div className="relative">
                        <h3 className="font-sans text-xs text-maroon/80 font-bold uppercase tracking-[0.25em] mb-6">
                            {navigationData.conditions[2].group}
                        </h3>
                          {/* Decorative Line */}
                          <div className="absolute -bottom-2 left-0 w-12 h-px bg-maroon/20" />
                        </div>
                        <div className="space-y-5">
                          {navigationData.conditions[2].items.map((item) => (
                            <Link 
                              key={item.name} 
                              href={item.href}
                              className="group/item block p-3 -mx-3 rounded-xl hover:bg-maroon/5 transition-all duration-300 cursor-pointer"
                            >
                              <span className={`text-lg font-display ${item.isTopConcern ? 'text-maroon font-medium' : 'text-charcoal'} group-hover/item:text-maroon group-hover/item:font-medium transition-all duration-300 block mb-1`}>
                                {item.name}
                              </span>
                              {item.subtitle && (
                                <p className="text-sm text-charcoal/50 font-light leading-relaxed">
                                  {item.subtitle}
                                </p>
                              )}
                            </Link>
                          ))}
                        </div>
                      </div>
                      
                      {/* Others */}
                      <div>
                        <div className="relative">
                        <h3 className="font-sans text-xs text-maroon/80 font-bold uppercase tracking-[0.25em] mb-6">
                            Others
                        </h3>
                          {/* Decorative Line */}
                          <div className="absolute -bottom-2 left-0 w-12 h-px bg-maroon/20" />
                        </div>
                        <div className="space-y-5">
                          {navigationData.conditions[3].items.map((item) => (
                            <Link 
                              key={item.name} 
                              href={item.href}
                              className="group/item block p-3 -mx-3 rounded-xl hover:bg-maroon/5 transition-all duration-300 cursor-pointer"
                            >
                              <span className={`text-lg font-display ${item.isTopConcern ? 'text-maroon font-medium' : 'text-charcoal'} group-hover/item:text-maroon group-hover/item:font-medium transition-all duration-300 block mb-1`}>
                                {item.name}
                              </span>
                              {item.subtitle && (
                                <p className="text-sm text-charcoal/50 font-light leading-relaxed">
                                  {item.subtitle}
                                </p>
                              )}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            {/* Signature Programs Dropdown Trigger */}
            <div 
              className="relative py-4"
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
              {/* Scrollable Content */}
              <div 
                ref={signatureProgramsRef}
                className="p-6 md:p-8 lg:p-10 max-h-[80vh] overflow-y-auto overflow-x-hidden custom-scrollbar"
                data-lenis-prevent
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <Link 
                    href="/signature-programs"
                    className="text-sm text-maroon hover:text-maroon-light font-medium flex items-center gap-2 transition-colors"
                  >
                    View All Signature Programmes
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                
                {/* Programs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {navigationData.signaturePrograms.map((program) => (
                    <Link 
                      key={program.name}
                      href={program.href}
                      className="group/card relative p-5 rounded-2xl border border-maroon/5 hover:border-maroon/20 hover:bg-maroon/[0.02] transition-all duration-300"
                    >
                      {/* Content */}
                      <div className="relative">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <h4 className="font-display text-xl text-maroon group-hover/card:text-maroon-light transition-colors duration-300">
                            {program.name}
                          </h4>
                          <ArrowRight className="w-4 h-4 text-maroon opacity-0 -translate-x-2 group-hover/card:opacity-100 group-hover/card:translate-x-0 transition-all duration-300 shrink-0 mt-1" />
                        </div>
                        <p className="text-sm text-charcoal/60 font-medium mb-2">
                          {program.subtitle}
                        </p>
                        <p className="text-sm text-charcoal/50 font-light leading-relaxed mb-3 line-clamp-2">
                          {program.description}
                        </p>
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
            className={`lg:hidden p-2 z-50 relative ${useTransparentStyle ? 'text-white' : 'text-charcoal'}`}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Invisible backdrop to close mega menus on hover outside */}
      <div 
        className={`fixed inset-0 top-[80px] z-40 ${
          activeDropdown ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
        }`}
        onMouseEnter={closeDropdown}
      />

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-beige-warm/98 backdrop-blur-lg transition-all duration-300 lg:hidden z-40 flex flex-col ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <div className="flex-1 overflow-y-auto pt-24 px-6 pb-8">
          <div className="space-y-6">
            <Link href="/" className="block text-xl font-medium text-charcoal hover:text-maroon">
              Home
            </Link>

            {/* Mobile Treatments */}
            <div>
              <button 
                onClick={() => toggleMobileDropdown('treatments')}
                className="flex items-center justify-between w-full text-xl font-medium text-charcoal hover:text-maroon"
              >
                Treatments
                <ChevronDown className={`w-5 h-5 transition-transform ${activeMobileDropdown === 'treatments' ? 'rotate-180' : ''}`} />
              </button>
              <div className={`mt-4 space-y-8 pl-4 border-l-2 border-maroon/10 overflow-hidden transition-all duration-300 ${
                activeMobileDropdown === 'treatments' ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
              }`}>
                {navigationData.treatments.map((pillar) => (
                  <div key={pillar.pillar} className="space-y-4">
                    <h3 className="font-serif text-maroon/50 font-bold uppercase tracking-widest text-sm border-b border-maroon/10 pb-1">
                      {pillar.pillar}
                    </h3>
                    <div className="space-y-6 pl-2">
                      {pillar.categories.map((category) => (
                        <div key={category.category} className="space-y-2">
                          {/* Treatment Family Link */}
                          <Link 
                            href={category.href}
                            className="flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-maroon/5 hover:bg-maroon hover:text-cream border border-maroon/10 transition-all group/btn"
                          >
                            <StylizedText 
                              text={category.category} 
                              className="font-serif text-maroon group-hover/btn:text-cream font-medium text-lg transition-colors"
                              ampersandClassName="text-maroon group-hover/btn:text-cream transition-colors"
                            />
                            <ArrowRight className="w-4 h-4 text-maroon/40 group-hover/btn:text-cream" />
                          </Link>
                          <div className="pl-2 space-y-2">
                            {category.items.map((item) => (
                              <Link key={item.name} href={item.href} className="block text-sm text-charcoal/70 hover:text-maroon py-1">
                                {item.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Conditions */}
            <div>
              <button 
                onClick={() => toggleMobileDropdown('conditions')}
                className="flex items-center justify-between w-full text-xl font-medium text-charcoal hover:text-maroon"
              >
                Conditions
                <ChevronDown className={`w-5 h-5 transition-transform ${activeMobileDropdown === 'conditions' ? 'rotate-180' : ''}`} />
              </button>
              <div className={`mt-4 space-y-6 pl-4 border-l-2 border-maroon/10 overflow-hidden transition-all duration-300 ${
                activeMobileDropdown === 'conditions' ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
              }`}>
                {navigationData.conditions.map((group) => (
                  <div key={group.group} className="space-y-2">
                    <h4 className="font-serif text-maroon font-medium text-lg border-b border-maroon/10 pb-1">{group.group}</h4>
                    <div className="pl-2 space-y-3">
                      {group.items.map((item) => (
                        <Link key={item.name} href={item.href} className="block py-1">
                          <div className="flex items-center justify-between">
                             <span className={`text-sm ${item.isTopConcern ? 'text-maroon font-medium' : 'text-charcoal/70'} hover:text-maroon`}>
                              {item.name}
                            </span>
                            {item.isTopConcern && <StarIcon className="w-3 h-3 text-maroon/60" />}
                          </div>
                          {item.subtitle && (
                            <p className="text-xs text-charcoal/50 mt-0.5 leading-tight">{item.subtitle}</p>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Signature Programs */}
            <div>
              <button 
                onClick={() => toggleMobileDropdown('signature-programs')}
                className="flex items-center justify-between w-full text-xl font-medium text-charcoal hover:text-maroon"
              >
                Signature Programs
                <ChevronDown className={`w-5 h-5 transition-transform ${activeMobileDropdown === 'signature-programs' ? 'rotate-180' : ''}`} />
              </button>
              <div className={`mt-4 space-y-4 pl-4 border-l-2 border-maroon/10 overflow-hidden transition-all duration-300 ${
                activeMobileDropdown === 'signature-programs' ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
              }`}>
                {navigationData.signaturePrograms.map((program) => (
                  <Link 
                    key={program.name} 
                    href={program.href} 
                    className="block p-3 rounded-xl bg-maroon/5 hover:bg-maroon/10 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-serif text-maroon font-medium text-lg">{program.name}</span>
                      <ArrowRight className="w-4 h-4 text-maroon/40" />
                    </div>
                    <p className="text-sm text-maroon/60 mb-1">{program.subtitle}</p>
                    <p className="text-xs text-charcoal/50 leading-tight line-clamp-2">{program.description}</p>
                    <div className="flex items-center gap-1.5 text-xs text-charcoal/40 mt-2">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{program.duration}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <Link href="/#about" className="block text-xl font-medium text-charcoal hover:text-maroon">
              About
            </Link>

            <div className="pt-6">
              {isHomepage ? (
                <button 
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsMobileMenuOpen(false);
                    scrollToElementBypassingLenis('contact', 100);
                  }}
                  className="btn-primary block text-center w-full cursor-pointer"
                >
                  Book Appointment
                </button>
              ) : (
                <button 
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsMobileMenuOpen(false);
                    openBookingModal();
                  }}
                  className="btn-primary block text-center w-full cursor-pointer"
                >
                  Book Appointment
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
