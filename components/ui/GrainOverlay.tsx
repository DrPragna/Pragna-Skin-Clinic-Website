'use client';

/**
 * GrainOverlay Component
 * 
 * Adds a subtle noise/grain texture overlay to the entire page.
 * This removes the "digital flatness" and gives the site a more
 * tactile, premium feel - similar to high-end print materials.
 * 
 * The effect is very subtle (3% opacity) and doesn't impact readability.
 */
export default function GrainOverlay() {
  return (
    <div 
      className="grain-overlay"
      aria-hidden="true"
    />
  );
}

