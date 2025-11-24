'use client';

import { useState, useEffect } from 'react';
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

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState<string | null>(null);
  const pathname = usePathname();

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

  const toggleMobileDropdown = (name: string) => {
    setActiveMobileDropdown(activeMobileDropdown === name ? null : name);
  };

  // Determine navbar styles based on scroll state
  const navbarClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    isScrolled
      ? 'bg-beige-warm/95 backdrop-blur-md shadow-soft'
      : 'bg-transparent'
  }`;

  const linkClasses = "text-charcoal/80 hover:text-maroon transition-colors duration-200 font-medium cursor-pointer flex items-center gap-1";
  // Base dropdown classes without positioning (to be used for standard dropdowns)
  const baseDropdownClasses = "bg-[#FAF4F0] shadow-soft-lg rounded-xl border border-maroon/5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50";
  // Positioning for standard dropdowns
  const standardDropdownPosition = "absolute top-full left-1/2 -translate-x-1/2 translate-y-4 group-hover:translate-y-0";

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
            <div className="group relative py-4">
              <button className={linkClasses}>
                Treatments
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
              </button>
              {/* Fixed positioning relative to viewport for robustness */}
              <div className={`${baseDropdownClasses} fixed top-[80px] left-4 right-4 mx-auto max-w-[1400px] p-8 translate-y-4 group-hover:translate-y-0 mt-2`}>
                <div className="grid grid-cols-4 gap-8 max-h-[80vh] overflow-y-auto scrollbar-hide">
                  {navigationData.treatments.map((pillar) => (
                    <div key={pillar.pillar} className="space-y-6">
                      <h3 className="font-serif text-2xl text-maroon/40 font-bold border-b-2 border-maroon/10 pb-2 mb-4 uppercase tracking-widest">
                        {pillar.pillar}
                      </h3>
                      <div className="space-y-8">
                        {pillar.categories.map((category) => (
                          <div key={category.category} className="space-y-3 break-inside-avoid">
                            <h4 className="font-serif text-maroon font-semibold text-lg">
                              {category.category}
                            </h4>
                            <ul className="space-y-1.5">
                              {category.items.map((item) => (
                                <li key={item.name}>
                                  <Link 
                                    href={item.href}
                                    className="text-sm text-charcoal/70 hover:text-maroon hover:translate-x-1 transition-all duration-200 block py-0.5"
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

            {/* Conditions Dropdown */}
            <div className="group relative py-4">
              <button className={linkClasses}>
                Conditions
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
              </button>
              {/* Use max-w-[90vw] to prevent overflow on smaller screens */}
              <div className={`${baseDropdownClasses} ${standardDropdownPosition} w-[1100px] max-w-[95vw] p-8`}>
                <div className="grid grid-cols-12 gap-10">
                  {/* Face & Skin - Spans 5 columns */}
                  <div className="col-span-5 space-y-4 border-r border-maroon/10 pr-6">
                     <h3 className="font-serif text-maroon font-semibold text-lg border-b border-maroon/10 pb-2 uppercase tracking-wider">
                        {navigationData.conditions[0].group}
                      </h3>
                      <div className="grid grid-cols-1 gap-3">
                        {navigationData.conditions[0].items.map((item) => (
                          <Link 
                            key={item.name} 
                            href={item.href}
                            className="group/item block p-2 rounded-lg hover:bg-white/50 transition-all duration-200"
                          >
                            <div className="flex items-start justify-between">
                              <span className={`font-medium text-[15px] ${item.isTopConcern ? 'text-maroon font-semibold' : 'text-charcoal/80'} group-hover/item:text-maroon transition-colors`}>
                                {item.name}
                              </span>
                              {item.isTopConcern && <StarIcon className="w-3 h-3 text-maroon/60 mt-1" />}
                            </div>
                            {item.subtitle && (
                              <p className="text-xs text-charcoal/50 mt-0.5 font-light leading-tight group-hover/item:text-charcoal/70">
                                {item.subtitle}
                              </p>
                            )}
                          </Link>
                        ))}
                      </div>
                  </div>

                  {/* Hair & Scalp - Spans 3 columns */}
                  <div className="col-span-3 space-y-4 border-r border-maroon/10 pr-6">
                    <h3 className="font-serif text-maroon font-semibold text-lg border-b border-maroon/10 pb-2 uppercase tracking-wider">
                        {navigationData.conditions[1].group}
                      </h3>
                      <div className="space-y-3">
                        {navigationData.conditions[1].items.map((item) => (
                          <Link 
                            key={item.name} 
                            href={item.href}
                            className="group/item block p-2 rounded-lg hover:bg-white/50 transition-all duration-200"
                          >
                            <div className="flex items-start justify-between">
                              <span className={`font-medium text-[15px] ${item.isTopConcern ? 'text-maroon font-semibold' : 'text-charcoal/80'} group-hover/item:text-maroon transition-colors`}>
                                {item.name}
                              </span>
                              {item.isTopConcern && <StarIcon className="w-3 h-3 text-maroon/60 mt-1" />}
                            </div>
                            {item.subtitle && (
                              <p className="text-xs text-charcoal/50 mt-0.5 font-light leading-tight group-hover/item:text-charcoal/70">
                                {item.subtitle}
                              </p>
                            )}
                          </Link>
                        ))}
                      </div>
                  </div>

                  {/* Body & Other - Spans 4 columns */}
                  <div className="col-span-4 space-y-8">
                    {/* Body Shape */}
                    <div className="space-y-4">
                      <h3 className="font-serif text-maroon font-semibold text-lg border-b border-maroon/10 pb-2 uppercase tracking-wider">
                          {navigationData.conditions[2].group}
                        </h3>
                        <div className="space-y-3">
                          {navigationData.conditions[2].items.map((item) => (
                            <Link 
                              key={item.name} 
                              href={item.href}
                              className="group/item block p-2 rounded-lg hover:bg-white/50 transition-all duration-200"
                            >
                              <div className="flex items-start justify-between">
                                <span className={`font-medium text-[15px] ${item.isTopConcern ? 'text-maroon font-semibold' : 'text-charcoal/80'} group-hover/item:text-maroon transition-colors`}>
                                  {item.name}
                                </span>
                              </div>
                              {item.subtitle && (
                                <p className="text-xs text-charcoal/50 mt-0.5 font-light leading-tight group-hover/item:text-charcoal/70">
                                  {item.subtitle}
                                </p>
                              )}
                            </Link>
                          ))}
                        </div>
                    </div>
                    
                    {/* Other Concerns */}
                    <div className="space-y-4">
                       <h3 className="font-serif text-maroon font-semibold text-lg border-b border-maroon/10 pb-2 uppercase tracking-wider">
                          {navigationData.conditions[3].group}
                        </h3>
                        <div className="space-y-3">
                          {navigationData.conditions[3].items.map((item) => (
                            <Link 
                              key={item.name} 
                              href={item.href}
                              className="group/item block p-2 rounded-lg hover:bg-white/50 transition-all duration-200"
                            >
                              <div className="flex items-start justify-between">
                                <span className={`font-medium text-[15px] ${item.isTopConcern ? 'text-maroon font-semibold' : 'text-charcoal/80'} group-hover/item:text-maroon transition-colors`}>
                                  {item.name}
                                </span>
                              </div>
                              {item.subtitle && (
                                <p className="text-xs text-charcoal/50 mt-0.5 font-light leading-tight group-hover/item:text-charcoal/70">
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

            <Link href="/#about" className={linkClasses}>About</Link>
            <Link href="/#blog" className={linkClasses}>Blog</Link>
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
                          <h4 className="font-serif text-maroon font-medium text-lg">{category.category}</h4>
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
            <Link href="/#blog" className="block text-xl font-medium text-charcoal hover:text-maroon">
              Blog
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
