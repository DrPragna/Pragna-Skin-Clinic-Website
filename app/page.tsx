'use client';

import { useEffect, useRef } from 'react';
import Navbar from '@/components/navigation/Navbar';
import Hero from '@/components/sections/Hero';
import TrustStrip from '@/components/sections/TrustStrip';
import WhyPragna from '@/components/sections/WhyPragna';
import SignaturePrograms from '@/components/sections/SignaturePrograms';
import Conditions from '@/components/sections/Conditions';
import Treatments from '@/components/sections/Treatments';
import Doctors from '@/components/sections/Doctors';
import Testimonials from '@/components/sections/Testimonials';
import Branches from '@/components/sections/Branches';
import Blog from '@/components/sections/Blog';
import FAQ from '@/components/sections/FAQ';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';

export default function Home() {
  const cursorGlowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorGlowRef.current) {
        cursorGlowRef.current.style.left = `${e.clientX}px`;
        cursorGlowRef.current.style.top = `${e.clientY}px`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <main className="overflow-x-hidden">
      {/* Cursor glow effect - subtle and elegant */}
      <div 
        ref={cursorGlowRef}
        className="fixed w-[500px] h-[500px] pointer-events-none z-50 opacity-20 hidden lg:block"
        style={{
          background: 'radial-gradient(circle, rgba(234, 199, 187, 0.3) 0%, transparent 50%)',
          transform: 'translate(-50%, -50%)',
          filter: 'blur(40px)',
        }}
      />
      
      <Navbar />
      <Hero />
      <TrustStrip />
      <WhyPragna />
      <SignaturePrograms />
      <Conditions />
      <Treatments />
      <Doctors />
      <Testimonials />
      <Branches />
      <Blog />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
