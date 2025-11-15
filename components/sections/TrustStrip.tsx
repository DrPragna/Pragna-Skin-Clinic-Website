export default function TrustStrip() {
  const stats = [
    {
      icon: '🏆',
      text: '30+ years of dermatology practice in Hyderabad',
    },
    {
      icon: '🌍',
      text: 'International speaker & researcher in dermatology',
    },
    {
      icon: '⭐',
      text: '20+ awards and recognitions',
    },
    {
      icon: '🔬',
      text: 'First-mover in bringing several advanced technologies to India',
    },
    {
      icon: '💎',
      text: 'Ethical, transparent costing for quality care',
    },
  ];

  return (
    <section className="bg-beige-warm section-padding">
      <div className="section-container">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-beige rounded-2xl p-6 text-center space-y-3 hover:shadow-card transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="text-3xl">{stat.icon}</div>
              <p className="text-sm text-charcoal/80 leading-relaxed">
                {stat.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

