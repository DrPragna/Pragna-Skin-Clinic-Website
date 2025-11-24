'use client';

import { useEffect, useRef, ReactNode } from 'react';

/**
 * SmoothScroll Component
 * 
 * Provides smooth, momentum-based scrolling using CSS-only approach.
 * This is a lightweight alternative to Lenis that doesn't require
 * additional dependencies.
 * 
 * For a more robust solution, you can install 'lenis' package and
 * uncomment the Lenis implementation below.
 */

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add smooth scroll class to html element
    document.documentElement.classList.add('smooth-scroll');
    
    // Optional: For Lenis smooth scroll, uncomment below after installing:
    // npm install lenis
    /*
    import Lenis from 'lenis';
    
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
    */

    return () => {
      document.documentElement.classList.remove('smooth-scroll');
    };
  }, []);

  return <>{children}</>;
}

/**
 * ScrollReveal Component
 * 
 * Wraps content that should animate in when scrolled into view.
 * Uses Intersection Observer for performance.
 */
interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
}

export function ScrollReveal({ 
  children, 
  className = '', 
  delay = 0,
  threshold = 0.1 
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('active');
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [delay, threshold]);

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

