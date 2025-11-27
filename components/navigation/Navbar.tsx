'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navigationData } from '@/lib/navigationData';

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState<string | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  
  const treatmentsRef = useRef<HTMLDivElement>(null);
  const conditionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveMobileDropdown(null);
  }, [pathname]);

  // Prevent body scroll when dropdown is open
  useEffect(() => {
    if (activeDropdown) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeDropdown]);

  const toggleMobileDropdown = (name: string) => {
    setActiveMobileDropdown(activeMobileDropdown === name ? null : name);
  };

  // Handle scroll within dropdown - prevent propagation to body
  const handleDropdownScroll = useCallback((e: React.WheelEvent) => {
    const target = e.currentTarget as HTMLDivElement;
    const { scrollTop, scrollHeight, clientHeight } = target;
    const isAtTop = scrollTop === 0;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight;
    
    // Prevent scroll propagation when at boundaries
    if ((isAtTop && e.deltaY < 0) || (isAtBottom && e.deltaY > 0)) {
      e.preventDefault();
    }
    e.stopPropagation();
  }, []);

  // Determine navbar styles based on scroll state
  const navbarClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    isScrolled
      ? 'bg-beige-warm/95 backdrop-blur-md shadow-soft'
      : 'bg-transparent'
  }`;

  const linkClasses = "text-charcoal/80 hover:text-maroon transition-colors duration-200 font-medium cursor-pointer flex items-center gap-1";

  return (
    <nav className={navbarClasses}>
      <div className="section-container">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group z-50 relative">
            <div className="text-2xl font-serif font-bold text-maroon transition-colors group-hover:text-maroon-light">
              Pragna
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link href="/" className={linkClasses}>Home</Link>
            
            {/* Treatments Dropdown (Mega Menu) */}
            <div 
              className="relative py-4"
              onMouseEnter={() => setActiveDropdown('treatments')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link href="/treatments" className={`${linkClasses} ${activeDropdown === 'treatments' ? 'text-maroon' : ''}`}>
                Treatments
                <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'treatments' ? 'rotate-180' : ''}`} />
              </Link>
              
              {/* Mega Menu Dropdown */}
              <div 
                className={`fixed top-[80px] left-4 right-4 mx-auto max-w-[1400px] bg-cream shadow-2xl rounded-2xl border border-maroon/10 transition-all duration-300 z-50 ${
                  activeDropdown === 'treatments' 
                    ? 'opacity-100 visible translate-y-0' 
                    : 'opacity-0 invisible translate-y-4'
                }`}
              >
                {/* Scrollable Content */}
                <div 
                  ref={treatmentsRef}
                  className="p-8 max-h-[60vh] overflow-y-auto"
                  onWheel={handleDropdownScroll}
                  style={{ overscrollBehavior: 'contain' }}
                >
                  <div className="grid grid-cols-4 gap-8">
                    {navigationData.treatments.map((pillar) => (
                      <div key={pillar.pillar} className="space-y-5">
                        {/* Pillar Header */}
                        <div className="border-b-2 border-maroon/20 pb-2">
                          <h3 className="font-serif text-lg text-maroon/60 font-bold uppercase tracking-widest">
                            {pillar.pillar}
                          </h3>
                        </div>
                        
                        {/* Categories */}
                        <div className="space-y-5">
                          {pillar.categories.map((category) => (
                            <div key={category.category} className="space-y-2">
                              {/* Treatment Family - Button Style */}
                              <Link 
                                href={category.href}
                                className="group/btn flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-maroon/5 hover:bg-maroon hover:shadow-md border border-maroon/10 hover:border-maroon transition-all duration-300"
                              >
                                <StylizedText 
                                  text={category.category} 
                                  className="font-serif text-maroon group-hover/btn:text-cream font-semibold text-base transition-colors"
                                  ampersandClassName="text-maroon group-hover/btn:text-cream transition-colors"
                                />
                                <ArrowRight className="w-4 h-4 text-maroon/40 group-hover/btn:text-cream group-hover/btn:translate-x-1 transition-all duration-300" />
                              </Link>
                              
                              {/* Sub-treatments */}
                              <ul className="space-y-0.5 pl-4 border-l-2 border-maroon/10">
                                {category.items.map((item) => (
                                  <li key={item.name}>
                                    <Link 
                                      href={item.href}
                                      className="text-sm text-charcoal/60 hover:text-maroon hover:pl-1 py-1 block transition-all duration-200"
                                    >
                                      {item.name}
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
            </div>

            {/* Conditions Dropdown */}
            <div 
              className="relative py-4"
              onMouseEnter={() => setActiveDropdown('conditions')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link href="/conditions" className={`${linkClasses} ${activeDropdown === 'conditions' ? 'text-maroon' : ''}`}>
                Conditions
                <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'conditions' ? 'rotate-180' : ''}`} />
              </Link>
              
              {/* Conditions Dropdown */}
              <div 
                className={`fixed top-[80px] left-1/2 -translate-x-1/2 w-[1100px] max-w-[95vw] bg-cream shadow-2xl rounded-2xl border border-maroon/10 transition-all duration-300 z-50 ${
                  activeDropdown === 'conditions' 
                    ? 'opacity-100 visible translate-y-0' 
                    : 'opacity-0 invisible translate-y-4'
                }`}
              >
                {/* Scrollable Content */}
                <div 
                  ref={conditionsRef}
                  className="p-8 max-h-[60vh] overflow-y-auto"
                  onWheel={handleDropdownScroll}
                  style={{ overscrollBehavior: 'contain' }}
                >
                  <div className="grid grid-cols-12 gap-8">
                    {/* Face & Skin - Spans 5 columns */}
                    <div className="col-span-5 space-y-4 border-r border-maroon/10 pr-6">
                      <h3 className="font-serif text-maroon font-semibold text-base border-b border-maroon/10 pb-2 uppercase tracking-wider">
                        <StylizedText text={navigationData.conditions[0].group} />
                      </h3>
                      <div className="grid grid-cols-1 gap-1">
                        {navigationData.conditions[0].items.map((item) => (
                          <Link 
                            key={item.name} 
                            href={item.href}
                            className="group/item flex items-center justify-between gap-2 px-3 py-2 rounded-lg hover:bg-maroon/5 border border-transparent hover:border-maroon/10 transition-all duration-200"
                          >
                            <div className="flex-1">
                              <span className={`font-medium text-sm ${item.isTopConcern ? 'text-maroon font-semibold' : 'text-charcoal/70'} group-hover/item:text-maroon transition-colors`}>
                                {item.name}
                              </span>
                              {item.subtitle && (
                                <p className="text-xs text-charcoal/40 mt-0.5 font-light leading-tight group-hover/item:text-charcoal/60">
                                  {item.subtitle}
                                </p>
                              )}
                            </div>
                            <div className="flex items-center gap-1">
                              {item.isTopConcern && <StarIcon className="w-3 h-3 text-maroon/50" />}
                              <ArrowRight className="w-3 h-3 text-maroon/30 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-0.5 transition-all duration-200" />
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Hair & Scalp - Spans 3 columns */}
                    <div className="col-span-3 space-y-4 border-r border-maroon/10 pr-6">
                      <h3 className="font-serif text-maroon font-semibold text-base border-b border-maroon/10 pb-2 uppercase tracking-wider">
                        <StylizedText text={navigationData.conditions[1].group} />
                      </h3>
                      <div className="space-y-1">
                        {navigationData.conditions[1].items.map((item) => (
                          <Link 
                            key={item.name} 
                            href={item.href}
                            className="group/item flex items-center justify-between gap-2 px-3 py-2 rounded-lg hover:bg-maroon/5 border border-transparent hover:border-maroon/10 transition-all duration-200"
                          >
                            <div className="flex-1">
                              <span className={`font-medium text-sm ${item.isTopConcern ? 'text-maroon font-semibold' : 'text-charcoal/70'} group-hover/item:text-maroon transition-colors`}>
                                {item.name}
                              </span>
                              {item.subtitle && (
                                <p className="text-xs text-charcoal/40 mt-0.5 font-light leading-tight group-hover/item:text-charcoal/60">
                                  {item.subtitle}
                                </p>
                              )}
                            </div>
                            <div className="flex items-center gap-1">
                              {item.isTopConcern && <StarIcon className="w-3 h-3 text-maroon/50" />}
                              <ArrowRight className="w-3 h-3 text-maroon/30 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-0.5 transition-all duration-200" />
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Body & Other - Spans 4 columns */}
                    <div className="col-span-4 space-y-6">
                      {/* Body Shape */}
                      <div className="space-y-3">
                        <h3 className="font-serif text-maroon font-semibold text-base border-b border-maroon/10 pb-2 uppercase tracking-wider">
                          <StylizedText text={navigationData.conditions[2].group} />
                        </h3>
                        <div className="space-y-1">
                          {navigationData.conditions[2].items.map((item) => (
                            <Link 
                              key={item.name} 
                              href={item.href}
                              className="group/item flex items-center justify-between gap-2 px-3 py-2 rounded-lg hover:bg-maroon/5 border border-transparent hover:border-maroon/10 transition-all duration-200"
                            >
                              <div className="flex-1">
                                <span className={`font-medium text-sm ${item.isTopConcern ? 'text-maroon font-semibold' : 'text-charcoal/70'} group-hover/item:text-maroon transition-colors`}>
                                  {item.name}
                                </span>
                                {item.subtitle && (
                                  <p className="text-xs text-charcoal/40 mt-0.5 font-light leading-tight group-hover/item:text-charcoal/60">
                                    {item.subtitle}
                                  </p>
                                )}
                              </div>
                              <ArrowRight className="w-3 h-3 text-maroon/30 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-0.5 transition-all duration-200" />
                            </Link>
                          ))}
                        </div>
                      </div>
                      
                      {/* Other Concerns */}
                      <div className="space-y-3">
                        <h3 className="font-serif text-maroon font-semibold text-base border-b border-maroon/10 pb-2 uppercase tracking-wider">
                          {navigationData.conditions[3].group}
                        </h3>
                        <div className="space-y-1">
                          {navigationData.conditions[3].items.map((item) => (
                            <Link 
                              key={item.name} 
                              href={item.href}
                              className="group/item flex items-center justify-between gap-2 px-3 py-2 rounded-lg hover:bg-maroon/5 border border-transparent hover:border-maroon/10 transition-all duration-200"
                            >
                              <div className="flex-1">
                                <span className={`font-medium text-sm ${item.isTopConcern ? 'text-maroon font-semibold' : 'text-charcoal/70'} group-hover/item:text-maroon transition-colors`}>
                                  {item.name}
                                </span>
                                {item.subtitle && (
                                  <p className="text-xs text-charcoal/40 mt-0.5 font-light leading-tight group-hover/item:text-charcoal/60">
                                    {item.subtitle}
                                  </p>
                                )}
                              </div>
                              <ArrowRight className="w-3 h-3 text-maroon/30 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-0.5 transition-all duration-200" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Link href="/#about" className={linkClasses}>About</Link>
            <Link href="/#contact" className={linkClasses}>Contact</Link>
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link href="/#contact" className="btn-primary text-sm px-6 py-3">
              Book Appointment
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-charcoal z-50 relative"
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

            <Link href="/#about" className="block text-xl font-medium text-charcoal hover:text-maroon">
              About
            </Link>
            <Link href="/#contact" className="block text-xl font-medium text-charcoal hover:text-maroon">
              Contact
            </Link>

            <div className="pt-6">
              <Link href="/#contact" className="btn-primary block text-center w-full">
                Book Appointment
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
