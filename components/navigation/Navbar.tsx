'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Conditions data for mega menu
const conditionsMenu = [
  { label: "Acne & Breakouts", slug: "acne-breakouts" },
  { label: "Acne Scars", slug: "acne-scars" },
  { label: "Pigmentation, Tanning & Dark Spots", slug: "pigmentation-tanning-dark-spots" },
  { label: "Uneven Skin Tone & Texture", slug: "uneven-skin-tone-texture" },
  { label: "Ageing Skin, Fine Lines & Wrinkles", slug: "ageing-fine-lines-wrinkles" },
  { label: "Dark Circles & Under-Eye Concerns", slug: "dark-circles-under-eye" },
  { label: "Rosacea & Facial Redness", slug: "rosacea-facial-redness" },
  { label: "Hair Fall & Hair Thinning", slug: "hair-fall-thinning" },
  { label: "Double Chin & Jawline Fullness", slug: "double-chin-jawline" },
  { label: "Neck Lines & Sagging Neck", slug: "neck-lines-sagging-neck" },
  { label: "Stretch Marks", slug: "stretch-marks" },
  { label: "Unwanted Facial & Body Hair", slug: "unwanted-facial-body-hair" },
  { label: "Stubborn Fat & Body Shaping", slug: "stubborn-fat-body-shaping" },
  { label: "Excessive Sweating (Hyperhidrosis)", slug: "excessive-sweating-hyperhidrosis" },
  { label: "Moles, Warts & Skin Tags", slug: "moles-warts-skin-tags" },
  { label: "Tattoo Removal & Permanent Ink Pigment", slug: "tattoo-removal" },
];

// Treatments data organized by category
const treatmentsMenu = {
  skin: [
    { label: "Laser Toning", slug: "laser-toning" },
    { label: "Carbon Laser Peel", slug: "carbon-laser-peel" },
    { label: "Chemical Peels", slug: "chemical-peels" },
    { label: "PRP & GFC Vampire Facial", slug: "prp-gfc-vampire-facial" },
    { label: "Intense Pulsed Light (IPL)", slug: "ipl" },
    { label: "Fractional Erbium Glass Laser", slug: "fractional-erbium-glass-laser" },
    { label: "Fractional CO2 Laser", slug: "fractional-co2-laser" },
    { label: "Skin Boosters", slug: "skin-boosters" },
    { label: "Medifacials", slug: "medifacials" },
    { label: "HIFU", slug: "hifu" },
    { label: "Profhilo", slug: "profhilo" },
    { label: "Dermal Fillers", slug: "dermal-fillers" },
    { label: "Botox", slug: "botox" },
    { label: "Thread Lift", slug: "thread-lift" },
  ],
  hair: [
    { label: "Low Level Light Therapy (LLLT)", slug: "lllt" },
    { label: "GFC/PRP for Hair", slug: "gfc-prp-hair" },
    { label: "Hair Mesotherapy", slug: "hair-mesotherapy" },
    { label: "PRF for Hair", slug: "prf-hair" },
    { label: "Exosomes", slug: "exosomes" },
  ],
  body: [
    { label: "Laser Hair Reduction", slug: "laser-hair-reduction" },
    { label: "Cryolipolysis", slug: "cryolipolysis" },
    { label: "RF Skin Tightening", slug: "rf-skin-tightening" },
    { label: "Morpheus 8", slug: "morpheus-8" },
    { label: "Shockwave Therapy", slug: "shockwave-therapy" },
    { label: "Electromagnetic Muscle Stimulation", slug: "ems" },
    { label: "Hand Rejuvenation", slug: "hand-rejuvenation" },
    { label: "Décolleté Rejuvenation", slug: "decollete-rejuvenation" },
  ],
  wellness: [
    { label: "IV Drips", slug: "iv-drips" },
    { label: "Mommy Makeover", slug: "mommy-makeover" },
  ],
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '#about' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-beige-warm/95 backdrop-blur-md shadow-soft'
          : 'bg-transparent'
      }`}
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="text-2xl font-serif font-bold text-maroon transition-colors group-hover:text-maroon-light">
              Pragna
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {/* Treatments Mega Menu */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('treatments')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="text-charcoal/80 hover:text-maroon transition-colors duration-200 font-medium flex items-center gap-1">
                Treatments
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Treatments Dropdown */}
              {activeDropdown === 'treatments' && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[900px] bg-beige-warm/98 backdrop-blur-lg rounded-2xl shadow-2xl border border-maroon/10 p-8 animate-fade-in">
                  <div className="grid grid-cols-3 gap-8">
                    {/* Skin Treatments */}
                    <div>
                      <h3 className="text-lg font-semibold text-maroon mb-4 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-maroon rounded-full"></div>
                        Skin Treatments
                      </h3>
                      <div className="space-y-2">
                        {treatmentsMenu.skin.map((treatment) => (
                          <Link
                            key={treatment.slug}
                            href={`/treatments/${treatment.slug}`}
                            className="block text-sm text-charcoal/70 hover:text-maroon hover:translate-x-1 transition-all duration-200 py-1.5"
                          >
                            {treatment.label}
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Hair & Body Treatments */}
                    <div>
                      <h3 className="text-lg font-semibold text-maroon mb-4 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-maroon rounded-full"></div>
                        Hair Treatments
                      </h3>
                      <div className="space-y-2 mb-8">
                        {treatmentsMenu.hair.map((treatment) => (
                          <Link
                            key={treatment.slug}
                            href={`/treatments/${treatment.slug}`}
                            className="block text-sm text-charcoal/70 hover:text-maroon hover:translate-x-1 transition-all duration-200 py-1.5"
                          >
                            {treatment.label}
                          </Link>
                        ))}
                      </div>

                      <h3 className="text-lg font-semibold text-maroon mb-4 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-maroon rounded-full"></div>
                        Wellness
                      </h3>
                      <div className="space-y-2">
                        {treatmentsMenu.wellness.map((treatment) => (
                          <Link
                            key={treatment.slug}
                            href={`/treatments/${treatment.slug}`}
                            className="block text-sm text-charcoal/70 hover:text-maroon hover:translate-x-1 transition-all duration-200 py-1.5"
                          >
                            {treatment.label}
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Body Treatments */}
                    <div>
                      <h3 className="text-lg font-semibold text-maroon mb-4 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-maroon rounded-full"></div>
                        Body Treatments
                      </h3>
                      <div className="space-y-2">
                        {treatmentsMenu.body.map((treatment) => (
                          <Link
                            key={treatment.slug}
                            href={`/treatments/${treatment.slug}`}
                            className="block text-sm text-charcoal/70 hover:text-maroon hover:translate-x-1 transition-all duration-200 py-1.5"
                          >
                            {treatment.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Conditions Mega Menu */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('conditions')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="text-charcoal/80 hover:text-maroon transition-colors duration-200 font-medium flex items-center gap-1">
                Conditions
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Conditions Dropdown */}
              {activeDropdown === 'conditions' && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[700px] bg-beige-warm/98 backdrop-blur-lg rounded-2xl shadow-2xl border border-maroon/10 p-8 animate-fade-in">
                  <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                    {conditionsMenu.map((condition) => (
                      <Link
                        key={condition.slug}
                        href={`/conditions/${condition.slug}`}
                        className="text-sm text-charcoal/70 hover:text-maroon hover:translate-x-1 transition-all duration-200 py-2 flex items-center gap-2"
                      >
                        <div className="w-1 h-1 bg-dust-red rounded-full flex-shrink-0"></div>
                        {condition.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Regular Nav Links */}
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-charcoal/80 hover:text-maroon transition-colors duration-200 font-medium"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <a href="#contact" className="btn-primary">
              Book Appointment
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-charcoal"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden pb-6 animate-fade-in">
            <div className="flex flex-col space-y-2">
              {/* Treatments Accordion */}
              <div className="border-b border-maroon/10">
                <button
                  onClick={() => setMobileAccordion(mobileAccordion === 'treatments' ? null : 'treatments')}
                  className="w-full text-left py-3 text-charcoal/80 hover:text-maroon transition-colors duration-200 font-medium flex items-center justify-between"
                >
                  Treatments
                  <svg
                    className={`w-5 h-5 transition-transform duration-200 ${
                      mobileAccordion === 'treatments' ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {mobileAccordion === 'treatments' && (
                  <div className="pb-4 pl-4 space-y-3">
                    <div>
                      <p className="text-xs font-semibold text-maroon mb-2">Skin</p>
                      {treatmentsMenu.skin.map((treatment) => (
                        <Link
                          key={treatment.slug}
                          href={`/treatments/${treatment.slug}`}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block text-sm text-charcoal/70 hover:text-maroon py-1.5"
                        >
                          {treatment.label}
                        </Link>
                      ))}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-maroon mb-2">Hair</p>
                      {treatmentsMenu.hair.map((treatment) => (
                        <Link
                          key={treatment.slug}
                          href={`/treatments/${treatment.slug}`}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block text-sm text-charcoal/70 hover:text-maroon py-1.5"
                        >
                          {treatment.label}
                        </Link>
                      ))}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-maroon mb-2">Body</p>
                      {treatmentsMenu.body.map((treatment) => (
                        <Link
                          key={treatment.slug}
                          href={`/treatments/${treatment.slug}`}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block text-sm text-charcoal/70 hover:text-maroon py-1.5"
                        >
                          {treatment.label}
                        </Link>
                      ))}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-maroon mb-2">Wellness</p>
                      {treatmentsMenu.wellness.map((treatment) => (
                        <Link
                          key={treatment.slug}
                          href={`/treatments/${treatment.slug}`}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block text-sm text-charcoal/70 hover:text-maroon py-1.5"
                        >
                          {treatment.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Conditions Accordion */}
              <div className="border-b border-maroon/10">
                <button
                  onClick={() => setMobileAccordion(mobileAccordion === 'conditions' ? null : 'conditions')}
                  className="w-full text-left py-3 text-charcoal/80 hover:text-maroon transition-colors duration-200 font-medium flex items-center justify-between"
                >
                  Conditions
                  <svg
                    className={`w-5 h-5 transition-transform duration-200 ${
                      mobileAccordion === 'conditions' ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {mobileAccordion === 'conditions' && (
                  <div className="pb-4 pl-4 space-y-2">
                    {conditionsMenu.map((condition) => (
                      <Link
                        key={condition.slug}
                        href={`/conditions/${condition.slug}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block text-sm text-charcoal/70 hover:text-maroon py-1.5"
                      >
                        {condition.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Regular Links */}
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-charcoal/80 hover:text-maroon transition-colors duration-200 font-medium py-3"
                >
                  {link.name}
                </a>
              ))}
              
              <a href="#contact" className="btn-primary text-center mt-4">
                Book Appointment
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

