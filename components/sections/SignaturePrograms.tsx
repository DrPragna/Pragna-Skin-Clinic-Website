export default function SignaturePrograms() {
  const programs = [
    {
      title: 'Glow Getters',
      description:
        'Unveil your natural radiance with customized treatment plans that brighten, smooth, and refresh tired skin.',
      gradient: 'from-terracotta/30 to-terracotta-light/30',
    },
    {
      title: 'Mommy Makeover',
      description:
        'Gentle, effective post-pregnancy treatments to help you reclaim confidence in your skin, body, and hair.',
      gradient: 'from-dust-red/20 to-terracotta/30',
    },
    {
      title: 'Pre-wedding Glow Up',
      description:
        'Timed, step-by-step care to ensure your skin looks clear, even, and luminous on your big day—and in every photograph.',
      gradient: 'from-maroon/20 to-terracotta-light/30',
    },
    {
      title: 'Rewind the Years',
      description:
        'Target lines, wrinkles, and loss of firmness with advanced anti-aging solutions designed to restore a youthful, refined look.',
      gradient: 'from-terracotta-light/30 to-beige/50',
    },
    {
      title: 'Signature Radiance Reset',
      description:
        'A clinic-exclusive protocol that revives dull, tired skin with both instant luminosity and long-lasting results.',
      gradient: 'from-terracotta/30 to-dust-red/20',
    },
  ];

  return (
    <section className="section-padding bg-beige">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-charcoal">
            Discover a world of radiant skin solutions
          </h2>
          <p className="text-lg text-charcoal/70">
            Whether you're preparing for a wedding, recovering after pregnancy, or simply ready to invest 
            in your skin, our curated programs bring together advanced treatments into thoughtfully designed journeys.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program, index) => (
            <div
              key={index}
              className={`relative overflow-hidden rounded-3xl p-8 shadow-card hover:shadow-soft-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer group`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${program.gradient} transition-opacity group-hover:opacity-80`}></div>
              <div className="relative z-10 space-y-4">
                <h3 className="text-2xl font-serif font-semibold text-maroon">
                  {program.title}
                </h3>
                <p className="text-charcoal/80 leading-relaxed">
                  {program.description}
                </p>
                <div className="pt-4">
                  <span className="text-maroon font-medium inline-flex items-center group-hover:gap-2 transition-all">
                    Learn more
                    <svg
                      className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
