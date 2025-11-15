import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pragna Skin & Laser Clinics | Advanced Dermatology in Hyderabad",
  description: "Pragna Skin & Laser Clinics combines decades of clinical experience, globally recognized expertise, and state-of-the-art technology to offer ethical, personalized care for every skin and hair concern.",
  keywords: "dermatology, skin clinic, laser treatment, hair treatment, Hyderabad, Pragna",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
