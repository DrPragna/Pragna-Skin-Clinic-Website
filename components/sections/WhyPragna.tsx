export default function WhyPragna() {
  const pillars = [
    {
      title: 'Deep Experience, Real Results',
      description:
        'For over three decades, our dermatologists have been treating everyday concerns and complex cases in Hyderabad. From acne and melasma to hair thinning and aging skin, our approach is rooted in science, backed by research, and refined by thousands of patient journeys.',
      icon: '📊',
    },
    {
      title: 'Technology That Leads, Not Follows',
      description:
        'Pragna has consistently been ahead of the curve – introducing several advanced devices and procedures to India and Hyderabad before they became mainstream. Today, our clinics house cutting-edge lasers, skin resurfacing systems, body contouring technologies, and hair restoration protocols, all chosen for safety and effectiveness.',
      icon: '🔬',
    },
    {
      title: 'Ethical, Transparent Costing',
      description:
        'We believe excellent dermatology should be accessible and honest. Every recommendation is medically justified, every plan is explained, and our pricing is transparent and ethical—so you know you\'re paying for what you actually need, nothing more.',
      icon: '💎',
    },
  ];

  return (
    <section className="section-padding bg-beige-warm">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-charcoal">
            Why patients trust Pragna for their skin & hair
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <div
              key={index}
              className="card group cursor-pointer"
            >
              <div className="space-y-4">
                <div className="text-5xl transform group-hover:scale-110 transition-transform duration-300">
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

