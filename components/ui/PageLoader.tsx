'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * PageLoader Component
 * 
 * Premium loading experience that transitions elegantly into the page.
 * - Logo animation draws/reveals
 * - Smooth curtain reveal
 * - Sets the tone for the entire experience
 */

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Minimum display time for the loader to feel intentional
    const minDisplayTime = 1500;
    const startTime = Date.now();

    const handleLoad = () => {
      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, minDisplayTime - elapsed);
      
      setTimeout(() => {
        setIsExiting(true);
        setTimeout(() => setIsLoading(false), 800);
      }, remainingTime);
    };

    // Check if page is already loaded
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      // Fallback in case load event doesn't fire
      setTimeout(handleLoad, 3000);
    }

    return () => window.removeEventListener('load', handleLoad);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-cream"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Background gradient */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-cream via-terracotta-light/20 to-cream"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
          
          {/* Animated logo */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Brand Name */}
            <motion.div
              className="overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.h1
                className="text-5xl md:text-7xl font-display font-light text-maroon tracking-tight"
                initial={{ y: 100 }}
                animate={{ y: isExiting ? -100 : 0 }}
                transition={{ 
                  duration: 0.8, 
                  ease: [0.16, 1, 0.3, 1],
                  delay: isExiting ? 0 : 0.2
                }}
              >
                Pragna
              </motion.h1>
            </motion.div>
            
            {/* Tagline */}
            <motion.p
              className="text-sm tracking-[0.3em] uppercase text-maroon/50 mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: isExiting ? 0 : 1, 
                y: isExiting ? -20 : 0 
              }}
              transition={{ 
                duration: 0.5, 
                ease: [0.16, 1, 0.3, 1],
                delay: isExiting ? 0 : 0.5
              }}
            >
              The Art of Radiance
            </motion.p>
            
            {/* Loading indicator line */}
            <motion.div
              className="mt-8 h-px bg-maroon/20 overflow-hidden"
              initial={{ width: 0 }}
              animate={{ width: isExiting ? 0 : 120 }}
              transition={{ 
                duration: isExiting ? 0.3 : 1,
                ease: [0.16, 1, 0.3, 1],
                delay: isExiting ? 0 : 0.6
              }}
            >
              <motion.div
                className="h-full bg-maroon"
                initial={{ x: '-100%' }}
                animate={{ x: isExiting ? '100%' : '100%' }}
                transition={{
                  duration: 1,
                  ease: 'linear',
                  repeat: isExiting ? 0 : Infinity,
                }}
              />
            </motion.div>
          </div>

          {/* Decorative elements */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-terracotta/10 blur-3xl"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: isExiting ? 2 : 1, 
              opacity: isExiting ? 0 : 0.5 
            }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-rose-gold/10 blur-3xl"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: isExiting ? 2 : 1, 
              opacity: isExiting ? 0 : 0.5 
            }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

