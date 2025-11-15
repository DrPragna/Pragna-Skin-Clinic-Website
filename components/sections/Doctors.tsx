export default function Doctors() {
  const doctors = [
    {
      name: 'Dr. Padmavathi Surapaneni',
      title: 'Senior Dermatologist, Pragna Skin & Laser Clinics',
      description:
        'With decades of dermatology experience in Hyderabad and an active role as an international speaker and researcher, Dr. Padmavathi leads Pragna\'s clinical vision. Her focus is on safe, effective treatments that respect both medical ethics and patient comfort.',
    },
    {
      name: 'Dr. Pragna Surapaneni',
      title: 'Dermatologist, Pragna Skin & Laser Clinics',
      description:
        'Dr. Pragna specializes in advanced skin, hair, and laser procedures, blending technology with a personalized, empathetic approach. Patients appreciate her attention to detail, clear explanations, and commitment to long-term results.',
    },
  ];

  return (
    <section id="about" className="section-padding bg-beige-warm">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-charcoal">
            Meet your dermatologists
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {doctors.map((doctor, index) => (
            <div
              key={index}
              className="card group cursor-pointer"
            >
              <div className="space-y-6">
                {/* Photo Placeholder */}
                <div className="aspect-[4/3] bg-gradient-to-br from-terracotta/30 to-maroon/20 rounded-2xl overflow-hidden flex items-center justify-center">
                  <div className="text-center text-maroon/30 font-serif text-4xl">
                    Doctor Photo
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-3">
                  <h3 className="text-2xl font-serif font-semibold text-maroon">
                    {doctor.name}
                  </h3>
                  <p className="text-sm text-dust-red font-medium">
                    {doctor.title}
                  </p>
                  <p className="text-charcoal/70 leading-relaxed">
                    {doctor.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

