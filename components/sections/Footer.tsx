'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';

/**
 * FOOTER - Brand Moment
 * 
 * Design Philosophy:
 * - Large brand statement
 * - Clean, organized links
 * - Premium feel continues to the end
 * - Animated ticker/marquee
 */

const footerLinks = {
  main: [
    { name: 'Home', href: '/' },
    { name: 'Treatments', href: '/treatments' },
    { name: 'Conditions', href: '/conditions' },
    { name: 'About Us', href: '/#about' },
    { name: 'Contact', href: '/#contact' },
  ],
  treatments: [
    { name: 'Laser Hair Reduction', href: '/treatments/laser-hair-reduction' },
    { name: 'Acne Treatment', href: '/treatments/acne-acne-scar-solutions' },
    { name: 'Anti-Aging', href: '/treatments/anti-ageing-tightening-contouring' },
    { name: 'Body Contouring', href: '/treatments/body-contouring-fat-reduction' },
  ],
  social: [
    { name: 'Instagram', href: 'https://instagram.com', icon: 'instagram' },
    { name: 'Facebook', href: 'https://facebook.com', icon: 'facebook' },
    { name: 'WhatsApp', href: 'https://wa.me/919876543210', icon: 'whatsapp' },
  ],
};

export default function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <footer ref={containerRef} className="relative bg-black text-cream overflow-hidden">
      {/* Top Marquee */}
      <div className="py-8 border-b border-cream/10 overflow-hidden">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            x: { duration: 20, repeat: Infinity, ease: 'linear' },
          }}
          className="flex whitespace-nowrap"
        >
          {[...Array(4)].map((_, i) => (
            <span key={i} className="flex items-center gap-8 px-8">
              <span className="text-6xl lg:text-8xl font-display text-cream/5">Pragna</span>
              <span className="w-3 h-3 rounded-full bg-rose-gold/20" />
              <span className="text-6xl lg:text-8xl font-display text-cream/5 italic">Radiance</span>
              <span className="w-3 h-3 rounded-full bg-rose-gold/20" />
              <span className="text-6xl lg:text-8xl font-display text-cream/5">Skin</span>
              <span className="w-3 h-3 rounded-full bg-rose-gold/20" />
            </span>
          ))}
        </motion.div>
      </div>

      {/* Main Footer Content */}
      <div className="section-container py-16 lg:py-24">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <Link href="/" className="inline-block mb-6">
                <span className="text-4xl font-display text-cream">Pragna</span>
              </Link>
              
              <p className="text-cream/50 leading-relaxed max-w-md mb-8">
                Established in 2001, Pragna Skin & Laser Clinics has been Hyderabad's trusted destination 
                for advanced dermatology. With 25+ years of experience, we combine ethical practice, 
                cutting-edge technology, and personalized care.
              </p>
              
              {/* Social Links */}
              <div className="flex items-center gap-4">
                {footerLinks.social.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full border border-cream/20 flex items-center justify-center hover:bg-cream hover:text-black transition-all duration-300"
                    aria-label={social.name}
                  >
                    {social.icon === 'instagram' && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    )}
                    {social.icon === 'facebook' && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    )}
                    {social.icon === 'whatsapp' && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                    )}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4 className="text-cream/40 text-xs uppercase tracking-[0.2em] mb-6">Quick Links</h4>
              <ul className="space-y-4">
                {footerLinks.main.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-cream/70 hover:text-rose-gold transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="text-cream/40 text-xs uppercase tracking-[0.2em] mb-6">Popular Treatments</h4>
              <ul className="space-y-4">
                {footerLinks.treatments.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-cream/70 hover:text-rose-gold transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-cream/10">
        <div className="section-container py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-cream/40 text-sm">
            © {new Date().getFullYear()} Pragna Skin & Laser Clinics. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm">
            <Link href="#" className="text-cream/40 hover:text-cream transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-cream/40 hover:text-cream transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
