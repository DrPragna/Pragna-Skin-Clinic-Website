'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { navigationData } from '@/lib/navigationData';

/**
 * Conditions Section
 * 
 * Uses a hover-reveal list pattern on desktop where hovering over
 * condition names reveals a floating image. Falls back to a clean
 * grid on mobile.
 * 
 * This creates visual intrigue while keeping the UI uncluttered.
 */

// Flatten conditions from navigationData for display
const topConditions = navigationData.conditions
  .flatMap(group => group.items)
  .filter(item => item.isTopConcern)
  .slice(0, 4);

const allConditions = navigationData.conditions
  .flatMap(group => group.items)
  .slice(0, 8); // Show top 8 for the homepage

export default function Conditions() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  // Image position with offset
  const imageStyle = {
    left: `${mousePosition.x + 30}px`,
    top: `${mousePosition.y - 120}px`,
  };

  return (
    <section id="conditions" className="section-padding-lg bg-white relative overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-terracotta/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      
      <div className="section-container relative">
        {/* Section Header */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 mb-16">
          <div>
            <span className="text-maroon font-medium tracking-[0.2em] uppercase text-xs mb-4 block">
              What We Treat
            </span>
            <h2 className="text-display-md font-display text-charcoal">
              Common skin & hair concerns we help with
            </h2>
          </div>
          <div className="flex items-end">
            <p className="text-lg text-charcoal/60 leading-relaxed">
              From stubborn acne to pigmentation and hair loss, we treat a wide spectrum 
              of concerns with personalized plans tailored to your skin type, lifestyle, and goals.
            </p>
          </div>
        </div>

        {/* Hover Reveal List - Desktop */}
        <div 
          ref={containerRef}
          className="relative hidden lg:block"
          onMouseMove={handleMouseMove}
        >
          <ul className="divide-y divide-charcoal/10">
            {allConditions.map((condition, index) => (
              <li key={condition.name}>
                <Link
                  href={condition.href}
                  className="group flex items-center justify-between py-6 transition-all duration-300"
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  {/* Left: Number & Name */}
                  <div className="flex items-center gap-8">
                    <span className="text-sm font-mono text-maroon/30 w-8">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <span className="text-2xl lg:text-3xl font-serif text-charcoal group-hover:text-maroon transition-colors duration-300">
                        {condition.name}
                      </span>
                      {condition.isTopConcern && (
                        <span className="ml-3 text-xs bg-terracotta/30 text-maroon px-2 py-1 rounded-full">
                          Popular
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Right: Arrow */}
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-charcoal/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      View treatment options
                    </span>
                    <div className="w-12 h-12 rounded-full border border-charcoal/10 flex items-center justify-center group-hover:bg-maroon group-hover:border-maroon transition-all duration-300">
                      <svg 
                        className="w-5 h-5 text-charcoal/40 group-hover:text-beige-warm transition-colors duration-300 transform group-hover:translate-x-0.5" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          {/* Floating Image */}
          <div
            className={`absolute pointer-events-none w-72 h-80 rounded-3xl overflow-hidden shadow-soft-xl transition-all duration-300 ease-out z-30 ${
              activeIndex !== null ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
            style={imageStyle}
          >
            {activeIndex !== null && (
              <div className="w-full h-full bg-gradient-to-br from-terracotta/40 to-beige flex items-center justify-center">
                <div className="text-center p-6">
                  <p className="text-maroon/40 text-sm italic mb-2">Add image for</p>
                  <p className="font-serif text-maroon text-lg">{allConditions[activeIndex].name}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Grid */}
        <div className="grid grid-cols-2 gap-4 lg:hidden">
          {allConditions.map((condition) => (
            <Link
              key={condition.name}
              href={condition.href}
              className="group p-5 bg-beige-warm rounded-2xl hover:bg-white hover:shadow-card transition-all duration-300"
            >
              <h3 className="font-serif text-charcoal group-hover:text-maroon transition-colors text-lg">
                {condition.name}
              </h3>
              {condition.isTopConcern && (
                <span className="text-xs text-maroon/60 mt-1 block">Popular</span>
              )}
            </Link>
          ))}
        </div>

        {/* View All Link */}
        <div className="mt-12 text-center">
          <Link 
            href="/#conditions-dropdown" 
            className="inline-flex items-center gap-2 text-maroon font-medium hover:gap-3 transition-all duration-300"
          >
            View all conditions we treat
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
