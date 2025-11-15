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
  return (
    <main>
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
