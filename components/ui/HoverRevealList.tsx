'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

/**
 * HoverRevealList Component
 * 
 * An elegant treatment/condition list where hovering over items
 * reveals a floating image that follows the cursor.
 * 
 * Desktop: Image appears and follows cursor
 * Mobile: Falls back to a simple list (no hover)
 * 
 * This creates visual intrigue while keeping the UI clean.
 */

interface ListItem {
  name: string;
  href: string;
  image?: string; // URL to image, placeholder if not provided
  category?: string;
}

interface HoverRevealListProps {
  items: ListItem[];
  title?: string;
  subtitle?: string;
}

export default function HoverRevealList({ items, title, subtitle }: HoverRevealListProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  // Smooth image position with offset
  const imageStyle = {
    left: `${mousePosition.x + 20}px`,
    top: `${mousePosition.y - 100}px`,
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Header */}
      {(title || subtitle) && (
        <div className="mb-12 text-center">
          {title && (
            <h2 className="text-display-md font-display text-charcoal mb-4">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-lg text-charcoal/60 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* List Items */}
      <ul className="divide-y divide-maroon/10">
        {items.map((item, index) => (
          <li key={item.name}>
            <Link
              href={item.href}
              className="group flex items-center justify-between py-6 md:py-8 transition-all duration-300"
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {/* Left: Number & Name */}
              <div className="flex items-center gap-6">
                <span className="text-sm font-mono text-maroon/40 w-8">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-xl md:text-2xl lg:text-3xl font-serif text-charcoal group-hover:text-maroon transition-colors duration-300">
                  {item.name}
                </span>
              </div>

              {/* Right: Category & Arrow */}
              <div className="flex items-center gap-4">
                {item.category && (
                  <span className="hidden md:block text-sm text-charcoal/40 uppercase tracking-wider">
                    {item.category}
                  </span>
                )}
                <div className="w-10 h-10 rounded-full border border-maroon/20 flex items-center justify-center group-hover:bg-maroon group-hover:border-maroon transition-all duration-300">
                  <svg 
                    className="w-4 h-4 text-maroon group-hover:text-beige-warm transition-colors duration-300 transform group-hover:translate-x-0.5" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {/* Floating Image (Desktop Only) */}
      <div
        ref={imageRef}
        className={`absolute pointer-events-none hidden lg:block w-64 h-80 rounded-2xl overflow-hidden shadow-soft-xl transition-all duration-300 ease-out z-30 ${
          activeIndex !== null ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
        style={imageStyle}
      >
        {activeIndex !== null && (
          <div className="w-full h-full bg-terracotta/30 flex items-center justify-center">
            {items[activeIndex].image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img 
                src={items[activeIndex].image} 
                alt={items[activeIndex].name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-center p-6">
                <p className="text-maroon/50 text-sm italic">
                  Add image for<br />
                  <span className="font-medium">{items[activeIndex].name}</span>
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * SimpleTreatmentGrid
 * 
 * A simpler grid-based alternative for mobile or when hover isn't desired.
 */
export function SimpleTreatmentGrid({ items, title }: HoverRevealListProps) {
  return (
    <div>
      {title && (
        <h2 className="text-display-md font-display text-charcoal mb-8 text-center">
          {title}
        </h2>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="group p-6 bg-white rounded-2xl border border-maroon/5 hover:shadow-card-hover hover:border-maroon/20 transition-all duration-300"
          >
            <h3 className="font-serif text-charcoal group-hover:text-maroon transition-colors">
              {item.name}
            </h3>
            {item.category && (
              <p className="text-xs text-charcoal/40 mt-1 uppercase tracking-wider">
                {item.category}
              </p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}

