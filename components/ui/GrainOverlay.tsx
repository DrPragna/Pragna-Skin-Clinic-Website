'use client';

/**
 * GrainOverlay Component
 * 
 * Adds a subtle film grain texture over the entire page.
 * This removes the "too digital" feeling and adds warmth.
 * 
 * The grain is:
 * - Very subtle (3.5% opacity)
 * - Animated for a living feel
 * - Non-interactive (pointer-events: none)
 */

export default function GrainOverlay() {
  return (
    <div 
      className="grain-overlay"
      aria-hidden="true"
    />
  );
}
