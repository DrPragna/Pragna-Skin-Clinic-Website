"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useBookingModal } from "./BookingModal";
import Lenis from "lenis";

// Declare lenis on window for TypeScript
declare global {
  interface Window {
    lenis?: Lenis;
  }
}

/**
 * Helper function to scroll to an element while bypassing Lenis conflicts.
 * Stops Lenis, uses native smooth scroll, then restarts Lenis.
 */
const scrollToElementBypassingLenis = (elementId: string, offset: number = 100) => {
  const targetElement = document.getElementById(elementId);
  if (!targetElement) return;

  const targetRect = targetElement.getBoundingClientRect();
  const lenis = window.lenis;

  if (lenis) {
    // Stop Lenis to prevent it from fighting with native scroll
    lenis.stop();
    // Remove the class that hides scrollbar (lenis-stopped adds overflow:hidden)
    document.documentElement.classList.remove("lenis-stopped");
  }

  // Calculate absolute position
  const absoluteTop = window.scrollY + targetRect.top - offset;

  // Use native smooth scroll instead of Lenis
  window.scrollTo({
    top: absoluteTop,
    behavior: "smooth"
  });

  // Re-enable Lenis after scroll animation completes
  if (lenis) {
    setTimeout(() => lenis.start(), 1200); // Match scroll duration
  }
};

/**
 * FloatingActions Component
 *
 * Provides quick access to booking and WhatsApp contact.
 * - On mobile: Shows both WhatsApp (left) and Book (right) buttons
 * - On desktop: Only shows after scrolling past the hero section
 * - On homepage: Book button scrolls to contact section
 * - On other pages: Book button opens the booking modal
 */

// WhatsApp icon
const WhatsAppIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-7 h-7"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

// Calendar icon
const CalendarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5"
  >
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" x2="16" y1="2" y2="6" />
    <line x1="8" x2="8" y1="2" y2="6" />
    <line x1="3" x2="21" y1="10" y2="10" />
  </svg>
);

export default function FloatingActions() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const { openBookingModal } = useBookingModal();

  const isHomePage = pathname === "/";

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check scroll position
    const handleScroll = () => {
      // Show after scrolling 400px (past the hero)
      setIsVisible(window.scrollY > 400);
    };

    checkMobile();
    handleScroll();

    window.addEventListener("resize", checkMobile);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // WhatsApp number for Pragna Skin Clinic
  const whatsappNumber = "918886531111"; // Format: country code + number
  const whatsappMessage = encodeURIComponent(
    "Hi, I would like to book a consultation at Pragna Skin Clinic."
  );
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  // Always show on mobile, or show after scroll on desktop
  const shouldShow = isMobile || isVisible;

  // Track if action was already triggered to prevent double-firing
  const actionTriggeredRef = useRef(false);

  // Handle book button click
  const handleBookClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Prevent double-firing from mousedown + click
    if (actionTriggeredRef.current) {
      actionTriggeredRef.current = false;
      return;
    }
    actionTriggeredRef.current = true;

    // Reset after a short delay
    setTimeout(() => {
      actionTriggeredRef.current = false;
    }, 300);

    if (isHomePage) {
      // Smooth scroll to contact section with offset (bypassing Lenis)
      scrollToElementBypassingLenis("contact", 100);
    } else {
      // Open booking modal on other pages
      openBookingModal();
    }
  };

  // Don't render if not visible (cleaner than pointer-events-none during transitions)
  if (!shouldShow) {
    return null;
  }

  return (
    <>
      {/* WhatsApp Button - Left side */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-btn"
        aria-label="Contact us on WhatsApp"
      >
        <WhatsAppIcon />
      </a>

      {/* Book Appointment Button - Right side */}
      <button
        type="button"
        onClick={handleBookClick}
        onMouseDown={handleBookClick}
        className="floating-book-btn cursor-pointer"
        aria-label="Book an appointment"
        style={{ touchAction: 'manipulation' }}
      >
        <CalendarIcon />
        <span className="hidden sm:inline">Book Now</span>
      </button>
    </>
  );
}
