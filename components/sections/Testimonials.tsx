'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

/**
 * TESTIMONIALS - Elegant Card Carousel
 * 
 * Design Philosophy:
 * - Light, warm aesthetic matching site palette
 * - Compact card-based design
 * - Subtle progress indicators
 * - Smooth transitions
 */

const testimonials = [
  {
    id: 1,
    name: 'Sony S.',
    treatment: 'Acne Treatment',
    location: 'Hyderabad',
    text: 'Best skin clinic with state-of-the-art facilities. I came here with multiple problems and have always been happy with remarkable results. Dr. Pragna is kind, patient, and caring.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Vinannya S.',
    treatment: 'Acne Treatment',
    location: 'Hyderabad',
    text: 'Dr. Padmavathi is the best dermatologist in Hyderabad! Great treatments, very hygienic and the staff is super friendly. Would highly recommend to anyone!',
    rating: 5,
  },
  {
    id: 3,
    name: 'Shruthi K.',
    treatment: 'Skin Care',
    location: 'Hyderabad',
    text: 'I have been visiting Dr. Padmavathi for a long time now. She understands your needs well and gives the best solution possible. Most treatments I took were quite effective.',
    rating: 5,
  },
  {
    id: 4,
    name: 'A. Saathvi',
    treatment: 'Laser Hair Reduction',
    location: 'Hyderabad',
    text: 'I was here for laser hair removal on the face and I see significant change after a few sittings. The staff here were very helpful and polite. Great experience overall!',
    rating: 5,
  },
  {
    id: 5,
    name: 'Bala Kishore',
    treatment: 'Skin Treatment',
    location: 'Hyderabad',
    text: 'Pragna Skin Clinic is best for skin treatment. The doctor is well experienced, treats well, and gives good suggestions. One of the best skin clinics in Hyderabad.',
    rating: 5,
  },
];

const AUTOPLAY_DURATION = 6000;

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

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
      className="relative py-12 lg:py-16 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Gradient background - cooler tone to distinguish from Doctors */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FBF0E8] via-[#F8F5F2] to-[#F5F2EF]" />
      
      {/* Subtle center glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(255,255,255,0.5),transparent)]" />
      
      {/* Decorative elements */}
      <div className="absolute top-10 right-0 w-80 h-80 bg-gradient-to-bl from-terracotta/8 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-0 w-64 h-64 bg-gradient-to-tr from-rose-gold/6 to-transparent rounded-full blur-3xl" />
      
      {/* Top transition line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-maroon/8 to-transparent" />

      <div className="section-container relative">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 lg:mb-10">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 mb-5"
          >
            <span className="w-8 h-px bg-maroon/40" />
            <span className="text-maroon font-medium tracking-[0.2em] uppercase text-xs">
              Patient Stories
            </span>
            <span className="w-8 h-px bg-maroon/40" />
          </motion.span>
          
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: 80 }}
              animate={isInView ? { y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl lg:text-4xl font-display text-charcoal"
            >
              What our patients{' '}
              <span className="italic text-maroon">say</span>
            </motion.h2>
          </div>
        </div>

        {/* Testimonial Card */}
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              {/* Card */}
              <div className="bg-beige rounded-3xl p-8 lg:p-10 shadow-soft border border-terracotta/10">
                {/* Quote Icon */}
                <div className="flex justify-center mb-6">
                  <div className="w-10 h-10 rounded-full bg-maroon/5 flex items-center justify-center">
                    <svg className="w-5 h-5 text-maroon/40" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                </div>
                
                {/* Testimonial Text */}
                <p className="text-lg lg:text-xl font-display text-charcoal/90 leading-relaxed text-center mb-8">
                  &ldquo;{currentTestimonial.text}&rdquo;
                </p>

                {/* Author Info */}
                <div className="flex items-center justify-center gap-4">
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-terracotta/30 to-rose-gold/20 flex items-center justify-center border-2 border-white shadow-sm">
                    <span className="text-maroon font-display text-lg">
                      {currentTestimonial.name[0]}
                    </span>
                  </div>
                  
                  {/* Name & Treatment */}
                  <div className="text-left">
                    <p className="text-charcoal font-medium">{currentTestimonial.name}</p>
                    <p className="text-charcoal/50 text-sm">{currentTestimonial.treatment}</p>
                  </div>

                  {/* Divider */}
                  <span className="w-px h-8 bg-charcoal/10 mx-2" />
                  
                  {/* Stars */}
                  <div className="flex gap-0.5">
                    {[...Array(currentTestimonial.rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 text-amber-400 fill-current"
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

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mt-8">
          {/* Previous Button */}
          <button
            onClick={() => goToTestimonial((currentIndex - 1 + testimonials.length) % testimonials.length)}
            className="w-10 h-10 rounded-full border border-charcoal/10 flex items-center justify-center text-charcoal/40 hover:bg-maroon hover:border-maroon hover:text-white transition-all duration-300"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Progress Dots */}
          <div className="flex items-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className="relative p-1 group"
              >
                {/* Background dot */}
                <span className={`block w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-maroon' 
                    : index < currentIndex 
                    ? 'bg-maroon/40' 
                    : 'bg-charcoal/20'
                }`} />
                
                {/* Progress ring for current */}
                {index === currentIndex && (
                  <svg className="absolute inset-0 w-4 h-4 -rotate-90" viewBox="0 0 16 16">
                    <circle
                      cx="8"
                      cy="8"
                      r="6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="text-maroon/20"
                    />
                    <circle
                      cx="8"
                      cy="8"
                      r="6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeDasharray={`${progress * 0.377} 37.7`}
                      className="text-maroon transition-all duration-100"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={() => goToTestimonial((currentIndex + 1) % testimonials.length)}
            className="w-10 h-10 rounded-full border border-charcoal/10 flex items-center justify-center text-charcoal/40 hover:bg-maroon hover:border-maroon hover:text-white transition-all duration-300"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Google Rating Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center justify-center gap-3 mt-8 text-charcoal/50 text-sm"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          <span>Rated 4.9/5 from 500+ reviews</span>
        </motion.div>
      </div>
    </section>
  );
}
