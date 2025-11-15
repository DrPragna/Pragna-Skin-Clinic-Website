'use client';

import { useState } from 'react';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: 'Sony S',
      treatment: 'Treated for Acne',
      text: 'Best skin clinic with state-of-the-art facilities. I have come here with multiple problems and have always been happy with remarkable results. Dr. Pragna is kind, patient, and caring. A one-stop destination for all your skin and hair problems.',
      rating: 5,
    },
    {
      name: 'Vinannya S',
      treatment: 'Treated for Acne',
      text: 'Dr. Padmavathi is the best dermatologist in Hyderabad! Great treatments, very hygienic and the staff is super friendly. Dr. Shraddha is also excellent. Would highly recommend to anyone!',
      rating: 5,
    },
    {
      name: 'Shruthi K',
      treatment: 'Treated for Acne',
      text: 'I have been visiting Dr. Padmavathi for a long time now and I must say I have found a suitable doctor for myself. She understands your needs well and gives the best solution possible. Most of the treatments I took were quite effective.',
      rating: 5,
    },
    {
      name: 'A. Saathvi',
      treatment: 'Laser Hair Reduction',
      text: 'I was here for laser hair removal on the face and I see significant change after a few sittings. The staff here were very helpful and polite. Overall my experience was great!',
      rating: 5,
    },
    {
      name: 'Bala Kishore',
      treatment: 'Skin Treatment',
      text: 'Pragna Skin Clinic is best for skin treatment. The doctor is well experienced, treats well, and gives good suggestions for all skin problems. I suggest Pragna Skin Clinic as one of the best skin clinics in Hyderabad.',
      rating: 5,
    },
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="section-padding gradient-terracotta">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-charcoal">
            What our patients say
          </h2>
          <p className="text-lg text-charcoal/70">
            Our patients are at the heart of everything we do. Here are a few of their stories, 
            shared in their own words.
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Testimonial Card */}
          <div className="bg-beige rounded-3xl p-8 md:p-12 shadow-soft-lg">
            <div className="space-y-6">
              {/* Stars */}
              <div className="flex gap-1">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-dust-red fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>

              {/* Text */}
              <p className="text-xl text-charcoal/80 leading-relaxed italic">
                "{testimonials[currentIndex].text}"
              </p>

              {/* Author */}
              <div className="pt-4 border-t border-charcoal/10">
                <p className="font-semibold text-maroon text-lg">
                  {testimonials[currentIndex].name}
                </p>
                <p className="text-sm text-charcoal/60">
                  {testimonials[currentIndex].treatment}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full bg-beige hover:bg-maroon text-maroon hover:text-beige-warm transition-all duration-300 flex items-center justify-center shadow-card hover:shadow-soft"
              aria-label="Previous testimonial"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full bg-beige hover:bg-maroon text-maroon hover:text-beige-warm transition-all duration-300 flex items-center justify-center shadow-card hover:shadow-soft"
              aria-label="Next testimonial"
            >
              <svg
                className="w-5 h-5"
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
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-maroon w-8'
                    : 'bg-maroon/30 hover:bg-maroon/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

