'use client';

import Navbar from '@/components/navigation/Navbar';
import Hero from '@/components/sections/Hero';
import TrustStrip from '@/components/sections/TrustStrip';
import WhyPragna from '@/components/sections/WhyPragna';
import SignaturePrograms from '@/components/sections/SignaturePrograms';
import Conditions from '@/components/sections/Conditions';
import Doctors from '@/components/sections/Doctors';
import Testimonials from '@/components/sections/Testimonials';
import Branches from '@/components/sections/Branches';
import Blog from '@/components/sections/Blog';
import FAQ from '@/components/sections/FAQ';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';

/**
 * PRAGNA SKIN CLINIC - WORLD CLASS HOMEPAGE
 * 
 * Design Philosophy:
 * - Cinematic, editorial experience
 * - Premium typography and animations
 * - Trust-building through sophistication
 * - Mobile-first, desktop-enhanced
 * 
 * Section Flow:
 * 1. Hero - Immediate impact, brand statement
 * 2. TrustStrip - Quick credibility markers
 * 3. WhyPragna - Core value propositions
 * 4. SignaturePrograms - Curated offerings
 * 5. Conditions - What we treat
 * 6. Doctors - Human connection
 * 7. Testimonials - Social proof
 * 8. Branches - Physical presence
 * 9. Blog - Thought leadership
 * 10. FAQ - Remove friction
 * 11. Contact - Conversion point
 * 12. Footer - Brand closure
 */
export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <TrustStrip />
      <WhyPragna />
      <SignaturePrograms />
      <Conditions />
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
