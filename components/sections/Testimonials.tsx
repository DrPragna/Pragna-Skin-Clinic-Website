'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * TESTIMONIALS - Editorial Carousel
 * 
 * Design Philosophy:
 * - Clean, 3-column layout with horizontal navigation
 * - Vogue-style typography and spacing
 * - Smooth sliding animation (1 card at a time)
 * - Equal height cards for visual consistency
 */

const testimonials = [
  {
    id: 1,
    text: "I came here with multiple concerns and have always been happy with the remarkable results. Dr. Pragna is kind, patient, and caring - a rare combination.",
    author: "Sony S.",
    treatment: "Acne Journey",
    location: "Hyderabad"
  },
  {
    id: 2,
    text: "Dr. Padmavathi is arguably the best dermatologist in Hyderabad. The treatments are world-class, but it's the hygiene and staff warmth that brings me back.",
    author: "Vinannya S.",
    treatment: "Signature Facial",
    location: "Banjara Hills"
  },
  {
    id: 3,
    text: "I see a significant change after just a few sittings. They don't just treat the skin; they educate you on how to maintain it. A truly great experience.",
    author: "A. Saathvi",
    treatment: "Laser Reduction",
    location: "Jubilee Hills"
  },
  {
    id: 4,
    text: "The team at Pragna understands that every skin is different. They didn't push products, just focused on what my skin actually needed.",
    author: "Priya R.",
    treatment: "Consultation",
    location: "Madhapur"
  },
  {
    id: 5,
    text: "My wedding prep was handled beautifully. The glow was real, and I felt so confident. Thank you for making my big day special.",
    author: "Meghana K.",
    treatment: "Bridal Package",
    location: "Gachibowli"
  },
  {
    id: 6,
    text: "Professional, ethical, and effective. I've visited many clinics, but Pragna stands out for their honesty and results.",
    author: "Rahul V.",
    treatment: "Hair Restoration",
    location: "Hyderabad"
  }
];

const ArrowIcon = ({ direction }: { direction: 'left' | 'right' }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={`w-5 h-5 ${direction === 'right' ? '' : 'rotate-180'}`}
  >
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const visibleCount = 3;
  const maxIndex = testimonials.length - visibleCount;

  const nextSlide = () => {
    setCurrentIndex(prev => prev < maxIndex ? prev + 1 : 0);
  };

  const prevSlide = () => {
    setCurrentIndex(prev => prev > 0 ? prev - 1 : maxIndex);
  };

  return (
    <section 
      ref={containerRef}
      className="py-12 lg:py-16 bg-beige overflow-hidden"
    >
      <div className="section-container max-w-7xl mx-auto">
        {/* Header - Center Aligned */}
        <div className="text-center mb-12 lg:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-maroon font-medium tracking-[0.2em] uppercase text-xs block mb-4"
          >
            Patient Stories
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl lg:text-5xl font-display text-charcoal"
          >
            Real results, <span className="italic text-maroon">real confidence.</span>
          </motion.h2>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          
          {/* Navigation Arrows - Outside the carousel */}
          <button 
            onClick={prevSlide}
            className="absolute top-1/2 -translate-y-1/2 -left-4 lg:-left-16 z-20 w-12 h-12 rounded-full border border-maroon/10 flex items-center justify-center text-maroon/60 hover:bg-maroon hover:text-white hover:border-maroon transition-all duration-300 bg-white shadow-soft hidden lg:flex"
            aria-label="Previous testimonial"
          >
            <ArrowIcon direction="left" />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute top-1/2 -translate-y-1/2 -right-4 lg:-right-16 z-20 w-12 h-12 rounded-full border border-maroon/10 flex items-center justify-center text-maroon/60 hover:bg-maroon hover:text-white hover:border-maroon transition-all duration-300 bg-white shadow-soft hidden lg:flex"
            aria-label="Next testimonial"
          >
            <ArrowIcon direction="right" />
          </button>

          {/* Carousel Track */}
          <div className="overflow-hidden">
            <motion.div 
              className="flex gap-6 lg:gap-8"
              animate={{ 
                x: `calc(-${currentIndex * (100 / visibleCount)}% - ${currentIndex * (currentIndex > 0 ? 24 : 0)}px)` 
              }}
              transition={{ 
                duration: 0.6, 
                ease: [0.32, 0.72, 0, 1]
              }}
            >
              {testimonials.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.1,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className="flex-shrink-0 w-full md:w-[calc(33.333%-16px)] lg:w-[calc(33.333%-21.33px)]"
                >
                  <div className="bg-white p-8 lg:p-10 rounded-[2rem] shadow-soft h-full min-h-[340px] border border-maroon/5 hover:shadow-lg hover:-translate-y-1 transition-all duration-500 flex flex-col group">
                    {/* Quote Mark */}
                    <div className="text-4xl text-maroon/10 font-serif leading-none mb-4 group-hover:text-maroon/20 transition-colors">
                      &ldquo;
                    </div>
                    
                    <div className="flex-1">
                      <p className="text-base lg:text-lg leading-relaxed font-display text-charcoal/80">
                        {item.text}
                      </p>
                    </div>

                    <div className="pt-6 border-t border-maroon/5 mt-6">
                      <p className="font-display text-lg text-maroon mb-1">
                        {item.author}
                      </p>
                      <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-charcoal/40 font-medium">
                        <span>{item.treatment}</span>
                        <span className="w-1 h-1 rounded-full bg-maroon/20" />
                        <span>{item.location}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          {/* Mobile Navigation (Bottom) */}
          <div className="flex justify-center gap-4 mt-8 lg:hidden">
            <button 
              onClick={prevSlide}
              className="w-10 h-10 rounded-full border border-maroon/10 flex items-center justify-center text-maroon/60 hover:bg-maroon hover:text-white transition-colors bg-white"
            >
              <ArrowIcon direction="left" />
            </button>
            <button 
              onClick={nextSlide}
              className="w-10 h-10 rounded-full border border-maroon/10 flex items-center justify-center text-maroon/60 hover:bg-maroon hover:text-white transition-colors bg-white"
            >
              <ArrowIcon direction="right" />
            </button>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentIndex === index 
                    ? 'bg-maroon w-6' 
                    : 'bg-maroon/20 hover:bg-maroon/40'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

        </div>

        {/* Social Proof Badge */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 1 }}
          className="mt-10 text-center"
        >
          <a 
            href="https://www.google.com/maps" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 py-3 px-6 rounded-full bg-white border border-maroon/10 shadow-soft hover:shadow-md transition-all duration-300 group"
          >
            <div className="flex -space-x-2">
              {[1,2,3].map(i => (
                <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-100 to-beige border-2 border-white" />
              ))}
            </div>
            <div className="text-left">
              <div className="flex gap-0.5 text-amber-400 text-xs mb-0.5">
                {'★★★★★'}
              </div>
              <p className="text-xs text-charcoal/60 uppercase tracking-wider font-medium group-hover:text-maroon transition-colors">
                Rated 4.9/5 on Google
              </p>
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
