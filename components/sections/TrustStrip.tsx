'use client';

import { useEffect, useRef, useState } from 'react';

export default function TrustStrip() {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState<number[]>([0, 0, 0]);
  const sectionRef = useRef<HTMLDivElement>(null);

  const stats = [
    {
      number: '30+',
      label: 'Years',
      description: 'of dermatology excellence in Hyderabad',
    },
    {
      number: '50,000+',
      label: 'Patients',
      description: 'treated with personalized care',
    },
    {
      number: '20+',
      label: 'Awards',
      description: 'and international recognitions',
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          // Animate numbers
          const duration = 2000;
          const steps = 60;
          const interval = duration / steps;
          
          stats.forEach((stat, index) => {
            const target = parseInt(stat.number.replace(/[^0-9]/g, ''));
            let current = 0;
            const increment = target / steps;
            
            const timer = setInterval(() => {
              current += increment;
              if (current >= target) {
                current = target;
                clearInterval(timer);
              }
              setCounts(prev => {
                const newCounts = [...prev];
                newCounts[index] = Math.floor(current);
                return newCounts;
              });
            }, interval);
          });
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

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
                  {isVisible ? (
                    <>
                      {index === 1 
                        ? counts[index].toLocaleString() 
                        : counts[index]}
                      {stat.number.includes('+') && '+'}
                    </>
                  ) : '0'}
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

