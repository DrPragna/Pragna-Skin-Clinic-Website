import { Metadata } from 'next';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/sections/Footer';
import { treatmentFamilies } from '@/lib/navigationData';
import TreatmentsDirectory from './TreatmentsDirectory';

export const metadata: Metadata = {
  title: 'Treatments Menu | Pragna Skin Clinic',
  description: 'Explore our comprehensive range of dermatologist-led treatments for Skin, Hair, Body, and Wellness at Pragna Skin Clinic Hyderabad.',
};

export default function TreatmentsPage() {
  return (
    <main className="bg-beige-warm min-h-screen">
      <Navbar />
      <TreatmentsDirectory families={treatmentFamilies} />
      <Footer />
    </main>
  );
}
