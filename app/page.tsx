'use client';

import Navbar from '@/components/navigation/Navbar';
import Hero from '@/components/sections/Hero';
import TrustStrip from '@/components/sections/TrustStrip';
import WhyPragna from '@/components/sections/WhyPragna';
import SignaturePrograms from '@/components/sections/SignaturePrograms';
import TreatmentPillars from '@/components/sections/TreatmentPillars';
import Doctors from '@/components/sections/Doctors';
import Testimonials from '@/components/sections/Testimonials';
import Branches from '@/components/sections/Branches';
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
 * 4. TreatmentPillars - Skin, Hair, Body
 * 5. SignaturePrograms - Curated offerings
 * 6. Doctors - Human connection
 * 7. Testimonials - Social proof
 * 8. Branches - Physical presence
 * 9. Contact - Conversion point
 * 10. Footer - Brand closure
 */
export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <TrustStrip />
      <WhyPragna />
      <TreatmentPillars />
      <SignaturePrograms />
      <Doctors />
      <Testimonials />
      <Branches />
      <Contact />
      <Footer />
    </main>
  );
}
