'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';

// Declare lenis on window for TypeScript
declare global {
  interface Window {
    lenis?: Lenis;
  }
}

/**
 * SmoothScroll Component
 * 
 * Provides buttery smooth, momentum-based scrolling using Lenis.
 * This creates a premium, luxury feel that's essential for world-class websites.
 * 
 * The Lenis instance is exposed on window.lenis for programmatic scroll control
 * that needs to bypass Lenis (e.g., when scrolling after manual wheel scroll).
 */

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  // Initialize Lenis once
  useEffect(() => {
    // Check if touch device - disable Lenis on mobile to prevent "vibrating" scroll
    // Native scroll is much smoother on touch devices
    const isTouchDevice = 
      'ontouchstart' in window || 
      navigator.maxTouchPoints > 0;

    if (isTouchDevice) {
      // Add class for optional native-scroll specific styles
      document.documentElement.classList.add('native-scroll');
      return;
    }

    /* Initialize Lenis for desktop/mouse users only */
    const lenis = new Lenis({
      duration: 1.35, // Lighter, floaty feel (was 0.8)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Expo easing
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.1, // Slight sensitivity boost
      // touchMultiplier is not needed as we disabled it on touch
      infinite: false,
      // Hide native scrollbar
      autoResize: true,
    });

    lenisRef.current = lenis;
    
    // Expose lenis instance on window for programmatic scroll control
    // This allows other components to stop/start Lenis when needed
    window.lenis = lenis;

    // Add lenis class to html
    document.documentElement.classList.add('lenis');

    // Animation frame loop
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Handle anchor links smoothly (only for same-page anchors)
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      
      if (anchor) {
        const href = anchor.getAttribute('href');
        // Only handle pure anchor links (not /#something which is cross-page)
        if (href && href.startsWith('#') && !href.includes('/')) {
          e.preventDefault();
          const targetElement = document.querySelector(href);
          if (targetElement) {
            lenis.scrollTo(targetElement as HTMLElement, {
              offset: -80, // Account for fixed header
              duration: 1.5,
            });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      lenis.destroy();
      document.documentElement.classList.remove('lenis');
      document.removeEventListener('click', handleAnchorClick);
      // Clean up window.lenis reference
      delete window.lenis;
    };
  }, []);

  // Reset scroll position on route change (unless there's a hash in the URL)
  useEffect(() => {
    // Check if there's a hash in the URL - if so, let the browser handle scrolling to that element
    const hash = window.location.hash;
    if (hash) {
      // Small delay to ensure the DOM is ready, then scroll to the hash target
      setTimeout(() => {
        const targetElement = document.querySelector(hash);
        if (targetElement) {
          if (lenisRef.current) {
            // Use smooth scroll "glide" on load instead of instant jump for a more premium feel
            lenisRef.current.scrollTo(targetElement as HTMLElement, {
              offset: -80, // Account for fixed header
              duration: 1.5,
              immediate: false, 
            });
          } else {
            // Fallback for mobile/touch
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
          }
        }
      }, 100);
      return;
    }
    
    // No hash - scroll to top
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
    // Also set native scroll as fallback
    window.scrollTo(0, 0);
  }, [pathname]);

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
  animation?: 'fade' | 'slide-up' | 'slide-left' | 'slide-right' | 'scale' | 'mask';
}

export function ScrollReveal({ 
  children, 
  className = '', 
  delay = 0,
  threshold = 0.1,
  animation = 'slide-up'
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
      { threshold, rootMargin: '0px 0px -100px 0px' }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [delay, threshold]);

  const animationClass = {
    'fade': 'reveal-fade',
    'slide-up': 'reveal',
    'slide-left': 'reveal',
    'slide-right': 'reveal',
    'scale': 'reveal-scale',
    'mask': 'reveal-mask',
  }[animation];

  return (
    <div ref={ref} className={`${animationClass} ${className}`}>
      {children}
    </div>
  );
}

/**
 * ParallaxLayer Component
 * 
 * Creates parallax scrolling effect on child elements.
 */
interface ParallaxLayerProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export function ParallaxLayer({ 
  children, 
  speed = 0.5, 
  className = '' 
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const scrolled = window.scrollY;
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top + scrolled;
      const viewportCenter = scrolled + window.innerHeight / 2;
      const distance = viewportCenter - elementTop - rect.height / 2;
      
      element.style.transform = `translateY(${distance * speed}px)`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}
