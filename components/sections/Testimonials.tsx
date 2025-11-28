'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * TESTIMONIALS - Patient Stories Wall
 * 
 * Design Philosophy:
 * - Masonry-style grid for a "Wall of Love"
 * - Focus on "Love Notes" / emotional connection
 * - Elegant, curated typography
 * - Increased density for better social proof
 */

const testimonials = [
  {
    id: 1,
    text: "I came here with multiple concerns and have always been happy with the remarkable results. Dr. Pragna is kind, patient, and caring - a rare combination.",
    author: "Sony S.",
    treatment: "Acne Journey",
    location: "Hyderabad"
  },
  {
    id: 2,
    text: "Dr. Padmavathi is arguably the best dermatologist in Hyderabad. The treatments are world-class, but it's the hygiene and staff warmth that brings me back.",
    author: "Vinannya S.",
    treatment: "Signature Facial",
    location: "Banjara Hills"
  },
  {
    id: 3,
    text: "I see a significant change after just a few sittings. They don't just treat the skin; they educate you on how to maintain it. A truly great experience.",
    author: "A. Saathvi",
    treatment: "Laser Reduction",
    location: "Jubilee Hills"
  },
  {
    id: 4,
    text: "The team at Pragna understands that every skin is different. They didn't push products, just focused on what my skin actually needed.",
    author: "Priya R.",
    treatment: "Consultation",
    location: "Madhapur"
  },
  {
    id: 5,
    text: "My wedding prep was handled beautifully. The glow was real, and I felt so confident. Thank you for making my big day special.",
    author: "Meghana K.",
    treatment: "Bridal Package",
    location: "Gachibowli"
  },
  {
    id: 6,
    text: "Professional, ethical, and effective. I've visited many clinics, but Pragna stands out for their honesty and results.",
    author: "Rahul V.",
    treatment: "Hair Restoration",
    location: "Hyderabad"
  }
];

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section 
      ref={containerRef}
      className="py-12 lg:py-16 bg-beige overflow-hidden"
    >
      <div className="section-container max-w-7xl mx-auto">
        {/* Header - Center Aligned */}
        <div className="text-center mb-12 lg:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-maroon font-medium tracking-[0.2em] uppercase text-xs block mb-4"
          >
            Patient Stories
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl lg:text-5xl font-display text-charcoal"
          >
            Real results, <span className="italic text-maroon">real confidence.</span>
          </motion.h2>
        </div>

        {/* Stories Grid - 3 Column Masonry feel */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="relative h-full"
            >
              <div className="bg-white p-8 lg:p-10 rounded-[2rem] shadow-soft h-full border border-maroon/5 hover:shadow-lg hover:-translate-y-1 transition-all duration-500 flex flex-col">
                {/* Quote Mark */}
                <div className="text-5xl text-maroon/10 font-serif leading-none mb-6">
                  &ldquo;
                </div>
                
                <div className="flex-grow">
                  <p className="text-lg leading-relaxed font-display text-charcoal/80 mb-8">
                    {item.text}
                  </p>
                </div>

                <div className="pt-6 border-t border-maroon/5 mt-auto">
                  <p className="font-display text-lg text-maroon mb-1">
                    {item.author}
                  </p>
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-charcoal/40 font-medium">
                    <span>{item.treatment}</span>
                    <span className="w-1 h-1 rounded-full bg-maroon/20" />
                    <span>{item.location}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Social Proof Badge */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 1 }}
          className="mt-12 text-center"
        >
          <a 
            href="https://www.google.com/maps" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 py-3 px-6 rounded-full bg-white border border-maroon/10 shadow-soft hover:shadow-md transition-all duration-300 group"
          >
            <div className="flex -space-x-2">
              {[1,2,3].map(i => (
                <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-100 to-beige border-2 border-white" />
              ))}
            </div>
            <div className="text-left">
              <div className="flex gap-0.5 text-amber-400 text-xs mb-0.5">
                {'★★★★★'}
              </div>
              <p className="text-xs text-charcoal/60 uppercase tracking-wider font-medium group-hover:text-maroon transition-colors">
                Rated 4.9/5 on Google
              </p>
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
