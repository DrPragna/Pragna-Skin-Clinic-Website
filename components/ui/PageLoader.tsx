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
    // Minimum display time - total ~2.5s (1.0s display + 1.5s exit fade)
    const minDisplayTime = 1000;
    const startTime = Date.now();

    const handleLoad = () => {
      // Calculate how much time has passed since mount
      const elapsed = Date.now() - startTime;
      // Ensure we show the loader for at least minDisplayTime
      const remainingTime = Math.max(0, minDisplayTime - elapsed);
      
      setTimeout(() => {
        setIsExiting(true);
        // Wait for curtain animation to finish before unmounting
        setTimeout(() => setIsLoading(false), 1200); 
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
          transition={{ duration: 1.5, ease: "easeInOut" }}
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
              className="overflow-hidden px-6 py-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.h1
                className="text-4xl md:text-6xl lg:text-7xl font-display font-light text-maroon tracking-tight text-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.1
                }}
              >
                Pragna Skin Clinic
              </motion.h1>
            </motion.div>
            
            {/* Tagline */}
            <motion.p
              className="text-sm tracking-[0.3em] uppercase text-maroon/50 mt-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                ease: [0.16, 1, 0.3, 1],
                delay: 0.5
              }}
            >
              World Class Dermatology Care
            </motion.p>
            
            {/* Loading indicator line - oscillating */}
            <motion.div
              className="mt-8 h-px bg-maroon/20 overflow-hidden w-32"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.2 }}
            >
              <motion.div
                className="h-full w-full bg-maroon"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  duration: 1,
                  ease: "easeInOut",
                  repeat: Infinity,
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

