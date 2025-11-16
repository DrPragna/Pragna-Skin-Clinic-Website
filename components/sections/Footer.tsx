export default function Footer() {
  const links = {
    main: [
      { name: 'Home', href: '#home' },
      { name: 'About Us', href: '#about' },
      { name: 'Conditions', href: '#conditions' },
      { name: 'Treatments', href: '#treatments' },
      { name: 'Blog', href: '#blog' },
      { name: 'Contact Us', href: '#contact' },
    ],
    social: [
      {
        name: 'Instagram',
        icon: (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z" />
            <path d="M12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998z" />
            <circle cx="18.406" cy="5.594" r="1.44" />
          </svg>
        ),
        href: '#',
      },
      {
        name: 'Facebook',
        icon: (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        ),
        href: '#',
      },
    ],
  };

  return (
    <footer className="bg-charcoal text-beige-warm">
      <div className="section-container section-padding">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-2xl font-serif font-bold text-beige-warm">
              Pragna Skin & Laser Clinics
            </h3>
            <p className="text-beige-warm/70 leading-relaxed max-w-xl">
              Pragna Skin & Laser Clinics was established in 2001 under the supervision of 
              Senior Dermatologist Dr. Padmavathi Surapaneni. Today, with 25+ years of dermatology 
              experience in Hyderabad, the clinic continues to combine ethical practice, advanced 
              technology, and personalized care to deliver radiant, healthy skin.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-serif font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {links.main.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-beige-warm/70 hover:text-terracotta transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-lg font-serif font-semibold mb-4">Connect With Us</h4>
            <div className="flex gap-4">
              {links.social.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-beige-warm/10 hover:bg-terracotta flex items-center justify-center transition-colors"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-beige-warm/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-beige-warm/60 text-sm">
            © {new Date().getFullYear()} Pragna Skin & Laser Clinics. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a
              href="#"
              className="text-beige-warm/60 hover:text-terracotta transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-beige-warm/60 hover:text-terracotta transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

