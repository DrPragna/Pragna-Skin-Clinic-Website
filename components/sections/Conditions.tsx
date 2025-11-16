export default function Conditions() {
  const conditions = [
    'Acne',
    'Acne Scars',
    'Melasma',
    'Double chin',
    'Neck lines',
    'Stretch marks',
    'Uneven skin tone',
    'Aging skin treatment',
    'Dark circles',
    'Rosacea',
    'Hair fall and hair thinning',
  ];

  return (
    <section id="conditions" className="section-padding bg-beige-warm">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-charcoal">
            Conditions we commonly treat
          </h2>
          <p className="text-lg text-charcoal/70">
            From stubborn acne to pigmentation and hair loss, we treat a wide spectrum of concerns 
            with personalized plans tailored to your skin type, lifestyle, and goals.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {conditions.map((condition, index) => (
            <div
              key={index}
              className="bg-beige rounded-2xl p-6 text-center hover:bg-white transition-all duration-300 hover:shadow-card hover:scale-[1.03] cursor-pointer group"
            >
              <div className="space-y-2">
                <div className="w-12 h-12 mx-auto bg-terracotta rounded-full flex items-center justify-center group-hover:bg-maroon transition-colors">
                  <svg
                    className="w-6 h-6 text-maroon group-hover:text-beige-warm transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p className="text-sm font-medium text-charcoal">{condition}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
