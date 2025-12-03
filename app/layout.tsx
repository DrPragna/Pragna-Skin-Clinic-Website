import type { Metadata } from "next";
import "./globals.css";
import GrainOverlay from "@/components/ui/GrainOverlay";
import FloatingActions from "@/components/ui/FloatingActions";
import SmoothScroll from "@/components/ui/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import PageLoader from "@/components/ui/PageLoader";
import { BookingModalProvider } from "@/components/ui/BookingModal";

export const metadata: Metadata = {
  title: "Pragna Advanced Skin Clinic | Advanced Dermatology in Hyderabad",
  description: "25+ years of trusted expertise in advanced skin and hair care. Pragna Advanced Skin Clinic combines science-backed treatments with personalized care for transformative results.",
  keywords: "dermatology, skin clinic, laser treatment, hair treatment, Hyderabad, Pragna, skin care, acne treatment, anti-aging",
  openGraph: {
    title: "Pragna Advanced Skin Clinic | The Art of Radiant Skin",
    description: "25+ years of trusted expertise in advanced dermatology. Science-backed treatments. Results that speak for themselves.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-cream text-charcoal antialiased">
        {/* Page Loader - Premium first impression */}
        <PageLoader />
        
        {/* Booking Modal Provider - Global */}
        <BookingModalProvider>
          {/* Smooth Scroll Provider */}
          <SmoothScroll>
            {children}
            
            {/* Global UI Elements */}
            <GrainOverlay />
            <FloatingActions />
          </SmoothScroll>
        </BookingModalProvider>
        
        {/* Custom Cursor - Desktop only */}
        <CustomCursor />
      </body>
    </html>
  );
}
