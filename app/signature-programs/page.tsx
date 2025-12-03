import React from 'react';
import { Metadata } from 'next';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/sections/Footer';
import { signaturePrograms } from '@/lib/content/signature-programs';
import SignatureProgramsDirectory from './SignatureProgramsDirectory';

export const metadata: Metadata = {
  title: 'Signature Programs | Pragna Skin Clinic',
  description: 'Explore our curated signature programs for skin, hair, and body transformation.',
};

export default function SignatureProgramsPage() {
  return (
    <main className="min-h-screen bg-beige-warm">
      <Navbar />
      <SignatureProgramsDirectory programs={signaturePrograms} />
      <Footer />
    </main>
  );
}
