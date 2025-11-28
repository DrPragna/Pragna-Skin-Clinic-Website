'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

interface RevealProps {
  children: React.ReactNode;
  width?: 'fit-content' | '100%';
  delay?: number;
  className?: string;
}

// Smooth cubic-bezier for premium feel
const smoothEase = [0.22, 1, 0.36, 1];

// Custom hook that only triggers once and never resets
function useOnceInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || hasTriggered) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHasTriggered(true);
            observer.disconnect();
          }
        });
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, hasTriggered]);

  return { ref, hasTriggered };
}

export const Reveal = ({ 
  children, 
  width = '100%', 
  delay = 0,
  className = "",
}: RevealProps) => {
  const { ref, hasTriggered } = useOnceInView(0.2);

  return (
    <div ref={ref} style={{ width }} className={className}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={hasTriggered ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ 
          duration: 0.6, 
          ease: smoothEase, 
          delay: delay 
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export const StaggerContainer = ({
    children,
    className = "",
    delay = 0
}: {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}) => {
    const { ref, hasTriggered } = useOnceInView(0.1);

    return (
        <motion.div
            ref={ref}
            className={className}
            initial="hidden"
            animate={hasTriggered ? "visible" : "hidden"}
            variants={{
                hidden: {},
                visible: {
                    transition: {
                        staggerChildren: 0.08,
                        delayChildren: delay
                    }
                }
            }}
        >
            {children}
        </motion.div>
    );
};

export const StaggerItem = ({
    children,
    className = ""
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <motion.div
            className={className}
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: { 
                        duration: 0.5, 
                        ease: smoothEase 
                    } 
                }
            }}
        >
            {children}
        </motion.div>
    );
};

// Simple fade for subtle elements
export const FadeIn = ({
    children,
    delay = 0,
    className = ""
}: {
    children: React.ReactNode;
    delay?: number;
    className?: string;
}) => {
    const { ref, hasTriggered } = useOnceInView(0.3);

    return (
        <motion.div
            ref={ref}
            className={className}
            initial={{ opacity: 0 }}
            animate={hasTriggered ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay, ease: "easeOut" }}
        >
            {children}
        </motion.div>
    );
};
