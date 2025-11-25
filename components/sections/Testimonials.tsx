'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

/**
 * TESTIMONIALS - Stories Format
 * 
 * Design Philosophy:
 * - Instagram Stories-style progression
 * - Large, impactful testimonial display
 * - Progress bars like Stories
 * - Auto-advance with manual control
 */

const testimonials = [
  {
    id: 1,
    name: 'Sony S.',
    treatment: 'Acne Treatment',
    location: 'Hyderabad',
    text: 'Best skin clinic with state-of-the-art facilities. I came here with multiple problems and have always been happy with remarkable results. Dr. Pragna is kind, patient, and caring.',
    rating: 5,
    image: '/images/testimonials/sony.jpg',
  },
  {
    id: 2,
    name: 'Vinannya S.',
    treatment: 'Acne Treatment',
    location: 'Hyderabad',
    text: 'Dr. Padmavathi is the best dermatologist in Hyderabad! Great treatments, very hygienic and the staff is super friendly. Would highly recommend to anyone!',
    rating: 5,
    image: '/images/testimonials/vinannya.jpg',
  },
  {
    id: 3,
    name: 'Shruthi K.',
    treatment: 'Skin Care',
    location: 'Hyderabad',
    text: 'I have been visiting Dr. Padmavathi for a long time now. She understands your needs well and gives the best solution possible. Most treatments I took were quite effective.',
    rating: 5,
    image: '/images/testimonials/shruthi.jpg',
  },
  {
    id: 4,
    name: 'A. Saathvi',
    treatment: 'Laser Hair Reduction',
    location: 'Hyderabad',
    text: 'I was here for laser hair removal on the face and I see significant change after a few sittings. The staff here were very helpful and polite. Great experience overall!',
    rating: 5,
    image: '/images/testimonials/saathvi.jpg',
  },
  {
    id: 5,
    name: 'Bala Kishore',
    treatment: 'Skin Treatment',
    location: 'Hyderabad',
    text: 'Pragna Skin Clinic is best for skin treatment. The doctor is well experienced, treats well, and gives good suggestions. One of the best skin clinics in Hyderabad.',
    rating: 5,
    image: '/images/testimonials/bala.jpg',
  },
];

const AUTOPLAY_DURATION = 5000; // 5 seconds per testimonial

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  // Auto-advance with progress
  useEffect(() => {
    if (!isInView || isPaused) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentIndex((current) => (current + 1) % testimonials.length);
          return 0;
        }
        return prev + (100 / (AUTOPLAY_DURATION / 100));
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isInView, isPaused, currentIndex]);

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
    setProgress(0);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section 
      ref={containerRef}
      className="relative py-24 lg:py-40 bg-black overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-maroon-dark/30 to-black" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-rose-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-64 h-64 bg-maroon/10 rounded-full blur-3xl" />

      <div className="section-container relative">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 mb-8"
          >
            <span className="w-12 h-px bg-cream/20" />
            <span className="text-cream/40 font-medium tracking-[0.3em] uppercase text-xs">
              Patient Stories
            </span>
            <span className="w-12 h-px bg-cream/20" />
          </motion.span>
          
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: 100 }}
              animate={isInView ? { y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-display-md font-display text-cream"
            >
              What our patients{' '}
              <span className="italic text-rose-gold">say</span>
            </motion.h2>
          </div>
        </div>

        {/* Progress Bars */}
        <div className="flex gap-2 mb-12 max-w-2xl mx-auto">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className="flex-1 h-1 bg-cream/20 rounded-full overflow-hidden"
            >
              <motion.div
                className="h-full bg-rose-gold rounded-full"
                initial={{ width: '0%' }}
                animate={{ 
                  width: index === currentIndex 
                    ? `${progress}%` 
                    : index < currentIndex 
                    ? '100%' 
                    : '0%' 
                }}
                transition={{ duration: 0.1 }}
              />
            </button>
          ))}
        </div>

        {/* Testimonial Card */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              {/* Quote */}
              <div className="text-center mb-12">
                <svg className="w-12 h-12 text-rose-gold/30 mx-auto mb-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                
                <p className="text-2xl lg:text-4xl font-display text-cream leading-relaxed italic">
                  "{currentTestimonial.text}"
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center justify-center gap-6">
                {/* Avatar placeholder */}
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-gold/30 to-maroon/30 flex items-center justify-center">
                  <span className="text-cream/30 text-xl font-display">
                    {currentTestimonial.name[0]}
                  </span>
                </div>
                
                <div className="text-left">
                  <p className="text-cream font-medium text-lg">{currentTestimonial.name}</p>
                  <p className="text-cream/50 text-sm">{currentTestimonial.treatment}</p>
                  
                  {/* Stars */}
                  <div className="flex gap-1 mt-2">
                    {[...Array(currentTestimonial.rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 text-rose-gold fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Arrows */}
        <div className="flex justify-center gap-4 mt-12">
          <button
            onClick={() => goToTestimonial((currentIndex - 1 + testimonials.length) % testimonials.length)}
            className="w-14 h-14 rounded-full border border-cream/20 flex items-center justify-center text-cream/50 hover:bg-cream/10 hover:text-cream transition-all"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => goToTestimonial((currentIndex + 1) % testimonials.length)}
            className="w-14 h-14 rounded-full border border-cream/20 flex items-center justify-center text-cream/50 hover:bg-cream/10 hover:text-cream transition-all"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
