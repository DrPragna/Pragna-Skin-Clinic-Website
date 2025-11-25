'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

/**
 * CustomCursor Component
 * 
 * A premium custom cursor that adds sophistication to the experience.
 * - Smooth following motion
 * - Morphs on interactive elements
 * - Blends with brand colors
 * 
 * Hidden on mobile/touch devices automatically.
 */

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  const [isHoveringButton, setIsHoveringButton] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  // Smooth spring animation for the outline
  const springConfig = { damping: 25, stiffness: 300 };
  const outlineX = useSpring(cursorX, springConfig);
  const outlineY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if touch device
    const checkTouch = () => {
      setIsTouchDevice(
        'ontouchstart' in window || 
        navigator.maxTouchPoints > 0
      );
    };
    
    checkTouch();
    
    // Don't render on touch devices
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Check what element we're hovering
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check for interactive elements
      const isInteractive = target.closest('a, button, [role="button"], input, textarea, select, [data-cursor="pointer"]');
      const isButton = target.closest('button, .btn-primary, .btn-secondary, [data-cursor="button"]');
      const isLink = target.closest('a, [data-cursor="link"]');
      
      setIsHovering(!!isInteractive);
      setIsHoveringButton(!!isButton);
      setIsHoveringLink(!!isLink && !isButton);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY, isTouchDevice]);

  // Don't render on touch devices or during SSR
  if (isTouchDevice || typeof window === 'undefined') {
    return null;
  }

  const getDotSize = () => {
    if (isHoveringButton) return 16;
    if (isHoveringLink) return 12;
    if (isHovering) return 10;
    return 6;
  };

  const getOutlineSize = () => {
    if (isHoveringButton) return 64;
    if (isHoveringLink) return 48;
    if (isHovering) return 48;
    return 40;
  };

  return (
    <>
      {/* Main Cursor Dot */}
      <motion.div
        className="fixed pointer-events-none z-[9999] rounded-full mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: getDotSize(),
          height: getDotSize(),
          opacity: isVisible ? 1 : 0,
          backgroundColor: isHoveringButton ? '#B76E79' : '#FAF4F0',
        }}
        transition={{
          width: { duration: 0.2 },
          height: { duration: 0.2 },
          opacity: { duration: 0.2 },
          backgroundColor: { duration: 0.2 },
        }}
      />
      
      {/* Cursor Outline Ring */}
      <motion.div
        className="fixed pointer-events-none z-[9998] rounded-full border"
        style={{
          x: outlineX,
          y: outlineY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: getOutlineSize(),
          height: getOutlineSize(),
          opacity: isVisible ? (isHovering ? 0.8 : 0.4) : 0,
          borderColor: isHoveringButton ? '#B76E79' : 'rgba(114, 43, 43, 0.3)',
          borderWidth: isHovering ? 2 : 1,
        }}
        transition={{
          width: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
          height: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
          opacity: { duration: 0.2 },
          borderColor: { duration: 0.2 },
        }}
      />
    </>
  );
}

