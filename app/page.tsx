'use client';

import Navbar from '@/components/navigation/Navbar';
import Hero from '@/components/sections/Hero';
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
 * 1. Hero - Immediate impact, brand statement (with integrated trust badges)
 * 2. WhyPragna - Core value propositions
 * 3. TreatmentPillars - Skin, Hair, Body
 * 4. SignaturePrograms - Curated offerings
 * 5. Doctors - Human connection
 * 6. Testimonials - Social proof
 * 7. Branches - Physical presence
 * 8. Contact - Conversion point
 * 9. Footer - Brand closure
 */
export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <Hero />
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
