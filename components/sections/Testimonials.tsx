'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useAnimation, PanInfo, useInView } from 'framer-motion';

// --- DATA ---
const testimonials = [
  {
    id: 1,
    text: "I came here with multiple concerns and have always been happy with the remarkable results. Dr. Pragna is kind, patient, and caring - a rare combination.",
    author: "Sony S.",
    initial: "S",
    bg: "bg-rose-100"
  },
  {
    id: 2,
    text: "Dr. Padmavathi is arguably the best dermatologist in Hyderabad. The treatments are world-class, but it's the hygiene and staff warmth that brings me back.",
    author: "Vinannya S.",
    initial: "V",
    bg: "bg-blue-100"
  },
  {
    id: 3,
    text: "I see a significant change after just a few sittings. They don't just treat the skin; they educate you on how to maintain it. A truly great experience.",
    author: "A. Saathvi",
    initial: "A",
    bg: "bg-green-100"
  },
  {
    id: 4,
    text: "The team at Pragna understands that every skin is different. They didn't push products, just focused on what my skin actually needed.",
    author: "Priya R.",
    initial: "P",
    bg: "bg-yellow-100"
  },
  {
    id: 5,
    text: "My wedding prep was handled beautifully. The glow was real, and I felt so confident. Thank you for making my big day special.",
    author: "Meghana K.",
    initial: "M",
    bg: "bg-purple-100"
  },
  {
    id: 6,
    text: "Professional, ethical, and effective. I've visited many clinics, but Pragna stands out for their honesty and results.",
    author: "Rahul V.",
    initial: "R",
    bg: "bg-orange-100"
  },
  {
    id: 7,
    text: "Best clinic in Kokapet! The hydrafacial results were instant. Love the ambiance and the professional staff.",
    author: "Sneha Reddy",
    initial: "S",
    bg: "bg-teal-100"
  },
  {
    id: 8,
    text: "Dr. Pragna's approach to acne scars is amazing. I've seen 80% improvement in just 3 sessions.",
    author: "Karthik M.",
    initial: "K",
    bg: "bg-indigo-100"
  }
];

// --- ICONS ---
const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

const StarIcon = () => (
  <svg className="w-5 h-5 text-[#FBBC05]" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

// --- COMPONENTS ---
const ReviewCard = ({ review }: { review: typeof testimonials[0] }) => (
  <div
    className="block w-[360px] md:w-[420px] h-[300px] flex-shrink-0 mx-4 select-none relative group"
    onDragStart={(e) => e.preventDefault()} // Prevent native drag
  >
    <div className="h-full bg-cream rounded-[2rem] p-8 shadow-[0_2px_20px_rgba(0,0,0,0.04)] border border-maroon/5 hover:border-maroon/20 hover:shadow-[0_8px_30px_rgba(114,43,43,0.08)] transition-all duration-300 flex flex-col relative overflow-hidden">
      
      {/* Noise Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.4] mix-blend-multiply pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content Container (z-10 to sit above texture) */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className={`w-12 h-12 rounded-full ${review.bg} flex items-center justify-center text-charcoal/80 font-display font-bold text-lg border border-white/50 shadow-sm`}>
              {review.initial}
            </div>
            {/* Meta */}
            <div>
              <h4 className="font-sans font-semibold text-charcoal text-base">{review.author}</h4>
              <div className="flex items-center gap-1 mt-1">
                {[1,2,3,4,5].map(i => <StarIcon key={i} />)}
              </div>
            </div>
          </div>
          <GoogleIcon />
        </div>

        {/* Content */}
        <div className="flex-grow">
          <p className="text-charcoal/70 text-[0.95rem] leading-[1.7] font-sans line-clamp-4">
            "{review.text}"
          </p>
        </div>

        {/* Footer / Read More */}
        <div className="mt-4 pt-4 border-t border-maroon/5 flex items-center justify-start opacity-60 group-hover:opacity-100 transition-opacity">
          <a
            href="https://www.google.com/maps/place/Pragna+Skin+Clinic"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium text-maroon flex items-center gap-1 group/link hover:underline cursor-pointer relative z-20"
            onClick={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()} // Prevent drag start on link
          >
            Read Full Reviews
            <svg className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  
  // Animation state
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();
  const xPos = useRef(0);

  // Triple the list to ensure infinite scroll seamlessness
  // We need enough copies to fill the screen + buffer for looping
  const extendedList = [...testimonials, ...testimonials, ...testimonials];

  // Auto-scroll logic using Framer Motion
  useEffect(() => {
    let animationFrameId: number;
    
    const animate = () => {
      if (!isHovered) {
        xPos.current -= 0.5; // Controls speed (lower = slower)
        
        // Reset position for seamless loop
        // Width calculation: (Card Width 420 + Margin 32) * 8 cards = 3616px
        if (xPos.current <= -3616) {
          xPos.current = 0;
        }
        
        controls.set({ x: xPos.current });
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered, controls]);

  // Handle Drag
  const onDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    // Add momentum to the current position based on drag
    xPos.current += info.offset.x;
  };

  const onDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    // We don't need to manually update controls here because 
    // framer-motion's 'drag' prop handles the visual transform during the gesture.
    // We just need to capture the delta if needed, but framer handles it.
  };

  return (
    <section 
      ref={containerRef}
      className="pt-20 lg:pt-24 pb-10 lg:pb-12 bg-beige overflow-hidden relative"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-rose-100/20 to-transparent rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3" />
      </div>

      <div className="section-container mb-12 relative z-10">
        {/* Centered Header */}
        <div className="text-center max-w-4xl mx-auto mb-10">
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
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl lg:text-6xl font-display text-charcoal mb-6"
          >
            Real results, <span className="italic text-maroon">real confidence.</span>
          </motion.h2>
          
          {/* Elegant Rating Badge - Centered */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="inline-flex items-center gap-3 bg-white/40 backdrop-blur-sm px-5 py-2.5 rounded-full border border-maroon/10 shadow-sm"
          >
             <div className="flex -space-x-2">
                {[1,2,3].map(i => (
                  <div key={i} className={`w-6 h-6 rounded-full border border-white flex items-center justify-center text-[8px] font-bold text-white shadow-sm ${i === 1 ? 'bg-rose-300' : i === 2 ? 'bg-maroon' : 'bg-charcoal'}`}>
                    {i === 3 ? '250+' : ''}
                  </div>
                ))}
            </div>
            <div className="text-xs text-left">
              <span className="font-bold text-charcoal block leading-none">4.9/5 Rating</span>
              <span className="text-charcoal/60">on Google Reviews</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Infinite Marquee Track */}
      <div 
        className="relative w-full cursor-grab active:cursor-grabbing pb-4"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Gradient Masks - Soft Fade */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-beige via-beige/90 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-beige via-beige/90 to-transparent z-20 pointer-events-none" />

        <motion.div 
          className="flex w-max px-4 py-4" 
          animate={controls}
          drag="x"
          dragConstraints={{ left: -3616, right: 0 }} 
          onDragEnd={onDragEnd}
          onDrag={onDrag}
          whileTap={{ cursor: "grabbing" }}
        >
          {extendedList.map((review, i) => (
            <ReviewCard key={`${review.id}-${i}`} review={review} />
          ))}
        </motion.div>
      </div>

    </section>
  );
}
