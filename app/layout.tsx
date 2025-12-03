import type { Metadata } from "next";
import "./globals.css";
import GrainOverlay from "@/components/ui/GrainOverlay";
import FloatingActions from "@/components/ui/FloatingActions";
import SmoothScroll from "@/components/ui/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import PageLoader from "@/components/ui/PageLoader";

export const metadata: Metadata = {
  title: "Pragna Advanced Skin Clinic | Advanced Dermatology in Hyderabad",
  description: "25+ years of trusted expertise in advanced skin and hair care. Pragna Advanced Skin Clinic combines science-backed treatments with personalized care for transformative results.",
  keywords: "dermatology, skin clinic, laser treatment, hair treatment, Hyderabad, Pragna, skin care, acne treatment, anti-aging",
  icons: {
    icon: '/Icon_Master.png',
    shortcut: '/Icon_Master.png',
    apple: '/Icon_Master.png',
  },
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
      <head>
        <link rel="icon" href="/Icon_Master.png" type="image/png" />
      </head>
      <body className="bg-cream text-charcoal antialiased">
        {/* Page Loader - Premium first impression */}
        <PageLoader />
        
        {/* Smooth Scroll Provider */}
        <SmoothScroll>
          {children}
          
          {/* Global UI Elements */}
          <GrainOverlay />
          <FloatingActions />
        </SmoothScroll>
        
        {/* Custom Cursor - Desktop only */}
        <CustomCursor />
      </body>
    </html>
  );
}
