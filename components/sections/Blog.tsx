export default function Blog() {
  const posts = [
    {
      title: 'Fast Fixes for Your Skin – Medifacials',
      date: 'Jan 1, 2025',
      excerpt:
        'Why professional medifacials matter, what to look for in your dermatologist, and how treatments like chemical peels, LED therapy, and dermal fillers can be combined for better results.',
      image: 'medifacials',
    },
    {
      title: 'Turn Back the Clock with Ultrasound',
      date: 'Dec 24, 2024',
      excerpt:
        'How ultrasound-based treatments lift and tighten the face, and why choosing a clinic with skilled dermatologists and advanced aesthetic technology makes all the difference.',
      image: 'ultrasound',
    },
    {
      title: 'The Science of Beauty',
      date: 'Nov 25, 2024',
      excerpt:
        'An exploration of facial aesthetics through a dermatologist\'s lens—balancing symmetry, proportion, and natural results with scientifically sound treatments.',
      image: 'science',
    },
    {
      title: 'Freeze Out the Fat with Cryolipolysis',
      date: 'Nov 22, 2024',
      excerpt:
        'A closer look at cryolipolysis for stubborn fat areas, what to expect from the procedure, and how we prioritize precise, comfortable, and non-surgical body contouring.',
      image: 'cryolipolysis',
    },
  ];

  return (
    <section id="blog" className="section-padding bg-beige">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-charcoal">
            Latest from our blog
          </h2>
          <p className="text-lg text-charcoal/70">
            Stay informed with expert guidance on treatments, trends, and skincare decisions 
            from our dermatology team.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.map((post, index) => (
            <article
              key={index}
              className="card group cursor-pointer"
            >
              {/* Image Placeholder */}
              <div className="aspect-[4/3] bg-gradient-to-br from-terracotta/30 to-maroon/20 rounded-2xl mb-6 overflow-hidden flex items-center justify-center">
                <div className="text-maroon/30 font-serif text-sm text-center px-4">
                  {post.image}
                </div>
              </div>

              {/* Content */}
              <div className="space-y-3">
                <p className="text-xs text-dust-red font-medium uppercase tracking-wide">
                  {post.date}
                </p>
                <h3 className="text-xl font-serif font-semibold text-maroon group-hover:text-maroon-light transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-charcoal/70 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="pt-2">
                  <span className="text-maroon text-sm font-medium inline-flex items-center group-hover:gap-2 transition-all">
                    Read more
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
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

