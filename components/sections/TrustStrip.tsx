'use client';

import { useEffect, useRef, useState } from 'react';

export default function TrustStrip() {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState<number[]>([30, 50000, 20]); // Start with final values
  const sectionRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<any>(null);
  const lastAnimationTime = useRef<number>(0);

  const stats = [
    {
      number: '30+',
      label: 'Years',
      description: 'of dermatology excellence in Hyderabad',
      target: 30,
    },
    {
      number: '50,000+',
      label: 'Patients',
      description: 'treated with personalized care',
      target: 50000,
    },
    {
      number: '20+',
      label: 'Awards',
      description: 'and international recognitions',
      target: 20,
    },
  ];

  const animateNumbers = () => {
    const startTime = performance.now();
    const duration = 1500;
    const startValues = [0, 0, 0];
    const endValues = [30, 50000, 20];
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuad = (t: number) => t * (2 - t);
      const easedProgress = easeOutQuad(progress);
      
      const newCounts = startValues.map((start, i) => {
        const end = endValues[i];
        return Math.floor(start + (end - start) * easedProgress);
      });
      
      setCounts(newCounts);
      
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };
    
    // Cancel any existing animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const now = Date.now();
        const timeSinceLastAnimation = now - lastAnimationTime.current;
        
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Only animate if enough time has passed (4 second cooldown)
          if (timeSinceLastAnimation > 4000) {
            animateNumbers();
            lastAnimationTime.current = now;
          }
        } else {
          setIsVisible(false);
          // Reset to final values when out of view
          setCounts([30, 50000, 20]);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-beige-warm to-beige relative">
      {/* Subtle top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-maroon/20 to-transparent"></div>
      
      <div className="section-container">
        <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`text-center space-y-2 transition-all duration-1000 ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Number with animation */}
              <div className="relative">
                <h3 className="text-5xl lg:text-6xl font-display text-maroon">
                  {index === 1 
                    ? counts[index].toLocaleString() 
                    : counts[index]}
                  {stat.number.includes('+') && '+'}
                </h3>
                {/* Subtle underline */}
                <div 
                  className={`h-0.5 bg-terracotta mx-auto mt-3 transition-all duration-1000 ${
                    isVisible ? 'w-12' : 'w-0'
                  }`}
                  style={{ transitionDelay: `${index * 200 + 500}ms` }}
                ></div>
              </div>
              
              {/* Label */}
              <p className="text-maroon font-semibold text-lg tracking-wide uppercase">
                {stat.label}
              </p>
              
              {/* Description */}
              <p className="text-charcoal/60 text-sm max-w-xs mx-auto leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Subtle bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-maroon/10 to-transparent"></div>
    </section>
  );
}

