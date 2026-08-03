import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import GrainOverlay from "@/components/ui/GrainOverlay";
import FloatingActions from "@/components/ui/FloatingActions";
import SmoothScroll from "@/components/ui/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import PageLoader from "@/components/ui/PageLoader";
import { BookingModalProvider } from "@/components/ui/BookingModal";
import Navbar from "@/components/navigation/Navbar";

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
      <head>
        {/* Meta Pixel Code */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1371163561699951');
            fbq('track', 'PageView');
          `}
        </Script>
        {/* End Meta Pixel Code */}
      </head>
      <body className="bg-cream text-charcoal antialiased">
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1371163561699951&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>

        {/* Google Ads tag */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18160084401"
          strategy="afterInteractive"
        />
        <Script id="google-ads-tag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18160084401');
          `}
        </Script>

        {/* Page Loader - Premium first impression */}
        <PageLoader />
        
        {/* Booking Modal Provider - Global */}
        <BookingModalProvider>
          {/* Navbar - Outside main content for blur effect */}
          <Navbar />
          
          {/* Smooth Scroll Provider */}
          <SmoothScroll>
            {/* Main content wrapper - will be blurred when mega menu opens */}
            {/* Outer wrapper prevents horizontal overflow on Android */}
            <div className="w-full overflow-x-clip">
              <div id="main-content">
                {children}
              </div>
            </div>
            
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
