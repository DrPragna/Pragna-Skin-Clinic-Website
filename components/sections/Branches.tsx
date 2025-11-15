export default function Branches() {
  const branches = [
    {
      name: 'Punjagutta Branch',
      address: 'Pragna Skin Care and Laser Clinic\nSaibaba Temple Lane, 6-3-347/22b/1/1,\nPanjagutta, Hyderabad – 500082',
      phone: '+91 98765 43210',
      email: 'info@pragnaclinicindia.com',
      mapLink: 'https://maps.google.com',
    },
    {
      name: 'Kokapet Branch',
      address: 'Pragna Skin Care and Laser Clinic\n3rd Floor, Plot 21, Gandipet Main Road,\nAbove Vijetha Supermarket',
      phone: '+91 98765 43210',
      email: 'info@pragnaclinicindia.com',
      mapLink: 'https://maps.google.com',
    },
  ];

  return (
    <section className="section-padding bg-beige-warm">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-charcoal">
            Our clinics in Hyderabad
          </h2>
          <p className="text-lg text-charcoal/70">
            Visit us at either of our conveniently located branches in the city.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {branches.map((branch, index) => (
            <div key={index} className="card">
              <div className="space-y-6">
                <h3 className="text-2xl font-serif font-semibold text-maroon">
                  {branch.name}
                </h3>

                <div className="space-y-4">
                  {/* Address */}
                  <div className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-dust-red flex-shrink-0 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <p className="text-charcoal/70 whitespace-pre-line">
                      {branch.address}
                    </p>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-dust-red flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <a
                      href={`tel:${branch.phone}`}
                      className="text-charcoal/70 hover:text-maroon transition-colors"
                    >
                      {branch.phone}
                    </a>
                  </div>

                  {/* Email */}
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-dust-red flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <a
                      href={`mailto:${branch.email}`}
                      className="text-charcoal/70 hover:text-maroon transition-colors"
                    >
                      {branch.email}
                    </a>
                  </div>
                </div>

                <a
                  href={branch.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-maroon font-medium hover:gap-3 transition-all"
                >
                  View on Map
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

