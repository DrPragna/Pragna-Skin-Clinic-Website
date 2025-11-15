export default function WhyPragna() {
  const pillars = [
    {
      title: 'Deep Experience, Real Results',
      description:
        'For over three decades, our dermatologists have been treating everyday concerns and complex cases in Hyderabad. From acne and melasma to hair thinning and aging skin, our approach is rooted in science, backed by research, and refined by thousands of patient journeys.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      title: 'Technology That Leads, Not Follows',
      description:
        'Pragna has consistently been ahead of the curve – introducing several advanced devices and procedures to India and Hyderabad before they became mainstream. Today, our clinics house cutting-edge lasers, skin resurfacing systems, body contouring technologies, and hair restoration protocols, all chosen for safety and effectiveness.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
    {
      title: 'Ethical, Transparent Costing',
      description:
        'We believe excellent dermatology should be accessible and honest. Every recommendation is medically justified, every plan is explained, and our pricing is transparent and ethical—so you know you\'re paying for what you actually need, nothing more.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="section-padding bg-beige-warm">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-display font-normal text-charcoal leading-tight">
            Why patients <span className="italic">trust Pragna</span> for their skin & hair
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <div
              key={index}
              className="card group cursor-pointer"
            >
              <div className="space-y-4">
                <div className="text-maroon transform group-hover:scale-110 transition-transform duration-300">
                  {pillar.icon}
                </div>
                <h3 className="text-2xl font-serif font-semibold text-maroon">
                  {pillar.title}
                </h3>
                <p className="text-charcoal/70 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

