'use client';

import { useState, useRef, useEffect } from 'react';

export default function Conditions() {
  const [activeIndex, setActiveIndex] = useState(2); // Start with middle card
  const containerRef = useRef<HTMLDivElement>(null);

  const conditions = [
    {
      category: 'Acne & Scarring',
      items: ['Active acne', 'Acne scars', 'Post-inflammatory hyperpigmentation', 'Large pores'],
      icon: '✨',
      color: 'from-terracotta-light to-beige',
    },
    {
      category: 'Pigmentation',
      items: ['Melasma', 'Sun spots', 'Age spots', 'Uneven skin tone'],
      icon: '🌟',
      color: 'from-beige to-terracotta-light',
    },
    {
      category: 'Anti-Aging',
      items: ['Fine lines', 'Wrinkles', 'Skin laxity', 'Volume loss'],
      icon: '💫',
      color: 'from-maroon/20 to-terracotta-light/30',
    },
    {
      category: 'Hair Concerns',
      items: ['Hair loss', 'Thinning hair', 'Alopecia', 'Scalp conditions'],
      icon: '🌿',
      color: 'from-terracotta/30 to-beige',
    },
    {
      category: 'Skin Texture',
      items: ['Rough texture', 'Dullness', 'Dehydration', 'Sensitivity'],
      icon: '🌸',
      color: 'from-dust-red/20 to-terracotta-light/30',
    },
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setActiveIndex((prev) => (prev - 1 + conditions.length) % conditions.length);
      } else if (e.key === 'ArrowRight') {
        setActiveIndex((prev) => (prev + 1) % conditions.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [conditions.length]);

  const getCardStyle = (index: number) => {
    const diff = index - activeIndex;
    const totalCards = conditions.length;
    
    // Handle wrapping
    let adjustedDiff = diff;
    if (Math.abs(diff) > totalCards / 2) {
      adjustedDiff = diff > 0 ? diff - totalCards : diff + totalCards;
    }
    
    const translateX = adjustedDiff * 120;
    const scale = activeIndex === index ? 1.1 : 0.85 - Math.abs(adjustedDiff) * 0.1;
    const opacity = activeIndex === index ? 1 : 0.6 - Math.abs(adjustedDiff) * 0.2;
    const zIndex = activeIndex === index ? 20 : 10 - Math.abs(adjustedDiff);
    const rotate = adjustedDiff * 5;
    
    return {
      transform: `translateX(${translateX}px) scale(${scale}) rotateY(${rotate}deg)`,
      opacity,
      zIndex,
    };
  };

  return (
    <section id="conditions" className="section-padding bg-gradient-to-b from-beige-warm to-beige relative overflow-hidden">
      {/* Dynamic background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-terracotta/5 rounded-full filter blur-[150px] animate-pulse"></div>
      </div>

      <div className="section-container relative z-10">
        {/* Title with offset positioning */}
        <div className="max-w-4xl mb-20">
          <h2 className="text-4xl lg:text-6xl font-display font-normal text-charcoal mb-6">
            Conditions we <span className="italic text-maroon">expertly</span> treat
          </h2>
          <p className="text-lg text-charcoal/70 max-w-2xl">
            From common skin concerns to complex dermatological conditions, 
            our expertise spans the full spectrum of skin and hair health.
          </p>
        </div>

        {/* 3D Carousel */}
        <div className="relative h-[500px] perspective-1000" ref={containerRef}>
          <div className="absolute inset-0 flex items-center justify-center">
            {conditions.map((condition, index) => (
              <div
                key={index}
                className="absolute w-80 h-96 transition-all duration-700 ease-out cursor-pointer"
                style={getCardStyle(index)}
                onClick={() => setActiveIndex(index)}
              >
                <div className={`h-full bg-gradient-to-br ${condition.color} rounded-3xl shadow-2xl p-8 backdrop-blur-sm border border-white/20`}>
                  <div className="h-full flex flex-col">
                    {/* Icon */}
                    <div className="text-5xl mb-6">{condition.icon}</div>
                    
                    {/* Category */}
                    <h3 className="text-3xl font-serif font-semibold text-maroon mb-6">
                      {condition.category}
                    </h3>
                    
                    {/* Items */}
                    <ul className="space-y-3 flex-grow">
                      {condition.items.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-3">
                          <div className="w-1.5 h-1.5 bg-maroon rounded-full"></div>
                          <span className="text-charcoal/80">{item}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {/* Card number */}
                    <div className="mt-6 text-right text-6xl font-display text-white/20">
                      {(index + 1).toString().padStart(2, '0')}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation hints */}
        <div className="flex justify-center gap-8 mt-12">
          <button
            onClick={() => setActiveIndex((prev) => (prev - 1 + conditions.length) % conditions.length)}
            className="p-3 rounded-full bg-maroon/10 hover:bg-maroon text-maroon hover:text-beige-warm transition-all"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          {/* Dots indicator */}
          <div className="flex items-center gap-2">
            {conditions.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`transition-all duration-300 ${
                  activeIndex === index
                    ? 'w-8 h-2 bg-maroon rounded-full'
                    : 'w-2 h-2 bg-maroon/30 rounded-full hover:bg-maroon/50'
                }`}
              />
            ))}
          </div>
          
          <button
            onClick={() => setActiveIndex((prev) => (prev + 1) % conditions.length)}
            className="p-3 rounded-full bg-maroon/10 hover:bg-maroon text-maroon hover:text-beige-warm transition-all"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}