'use client';

import { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, useInView, AnimatePresence, useMotionValue } from 'framer-motion';

// --- CLINIC LINKS ---
const KOKAPET_REVIEWS_LINK = "https://www.google.com/maps/place/Pragna+Skin+Clinic/@17.387853,78.3399881,17z/data=!4m14!1m5!8m4!1e1!2s115999419679947581609!3m1!1e1!3m7!1s0x3bcb951e16e74899:0xe00057759cb62037!8m2!3d17.387853!4d78.342563!9m1!1b1!16s%2Fg%2F11y310_wqr?hl=en-IN&entry=ttu&g_ep=EgoyMDI2MDEwNi4wIKXMDSoKLDEwMDc5MjA3MUgBUAM%3D";
const PANJAGUTTA_REVIEWS_LINK = "https://www.google.com/maps/place/Pragna+Skin+Clinic/@17.4240657,78.4475407,17z/data=!4m8!3m7!1s0x3bcb97b7fc3e3f91:0x89e1c6a9b15d7f58!8m2!3d17.4240657!4d78.4501156!9m1!1b1!16s%2Fg%2F11s9jq0my8?entry=ttu&g_ep=EgoyMDI2MDEwNi4wIKXMDSoKLDEwMDc5MjA3MUgBUAM%3D";

// --- DATA (Mixed Kokapet & Panjagutta reviews) ---
const testimonials = [
  {
    id: 1,
    text: "I had an amazing experience with the doctor. She has solved my long pending issue and am very happy with her way of treatment. She doesn't push people to just take any treatment or medicine. She always focuses on the underlying issue and tries solving the roots first and not just a superficial treatment. I am very much satisfied with her and I'd strongly suggest her.",
    author: "Anuradha Channapragada",
    initial: "A",
    bg: "bg-maroon-50",
    clinic: "kokapet"
  },
  {
    id: 2,
    text: "Dr. Padmavathi Surapaneni is one of the best dermatologists in the city. She is highly knowledgeable, patient, and takes the time to listen and explain the treatment clearly. I underwent treatment for pigmentation and saw visible results in short time. The staff is also very friendly and informative. I highly recommend this clinic for anyone looking for genuine skin care.",
    author: "Kavitha Thanubuddi",
    initial: "K",
    bg: "bg-maroon-50",
    clinic: "panjagutta"
  },
  {
    id: 3,
    text: "Visited Dr. Pragna mam for my son's skin dryness. She explained the cause and care routine very clearly and suggested the right medication. Really helpful and approachable doctor!",
    author: "Kiran Shetty",
    initial: "K",
    bg: "bg-maroon-50",
    clinic: "kokapet"
  },
  {
    id: 4,
    text: "I had a really good experience at Pragna Skin Clinic. The doctors were very professional and explained the treatment clearly. The staff was friendly and helpful, and the clinic was well maintained. I'm already seeing good results and would definitely recommend this clinic to anyone looking for skin care treatments.",
    author: "Lakshman Kumar Blina",
    initial: "L",
    bg: "bg-maroon-50",
    clinic: "panjagutta"
  },
  {
    id: 5,
    text: "Best skin clinic with the state of the art facilities. I have come here with multiple problems and have always been happy with remarkable results. Dr Pragna is kind, patient and caring. A one stop destination for all your skin and hair problems.",
    author: "Sony Sharma",
    initial: "S",
    bg: "bg-maroon-50",
    clinic: "kokapet"
  },
  {
    id: 6,
    text: "Consulted for skin issues. Liked the attention towards the issues and treatment done successfully. I have been visiting Padmavathi mam for past 4 years. Extremely happy with the results.",
    author: "Pavithra Gera",
    initial: "P",
    bg: "bg-maroon-50",
    clinic: "panjagutta"
  },
  {
    id: 7,
    text: "Love the doctors, explanations, procedures, everything. Dr. Pragna is very professional, kind, and attentive. She really listens and explains things clearly. I had a great experience and highly recommend!",
    author: "Saania Reddy",
    initial: "S",
    bg: "bg-maroon-50",
    clinic: "kokapet"
  },
  {
    id: 8,
    text: "I have been coming here since 4 years. Dr Padmavathi is my fav doctor here and I have seen effective results. Staff service is also excellent.",
    author: "Juweria Anam",
    initial: "J",
    bg: "bg-maroon-50",
    clinic: "panjagutta"
  },
  {
    id: 9,
    text: "Dr. Pragna is very knowledgeable and understood our concerns perfectly and explained the causal agents to our problems. I'd definitely refer her to everyone for any dermatology condition.",
    author: "Rishik Sharma",
    initial: "R",
    bg: "bg-maroon-50",
    clinic: "kokapet"
  },
  {
    id: 10,
    text: "Dr Padmavati is a well experienced doctor with a decent staff. I had undergone my acne treatment and Melasma control well. Pragna Skin Clinic is one of the best clinics in Hyderabad.",
    author: "Kumar Chiguru",
    initial: "K",
    bg: "bg-maroon-50",
    clinic: "panjagutta"
  },
  {
    id: 11,
    text: "Doctor is really good and one thing which differentiates her is her simplicity and sincerely listening to patients' problems. Overall cost including appointment and medicine is comparatively economical. Don't hesitate, just make an appointment for your skin and hair related issues. Thank you, Dr. Padmavati madam.",
    author: "Chandra Shekhar Mekala",
    initial: "C",
    bg: "bg-maroon-50",
    clinic: "panjagutta"
  },
  {
    id: 12,
    text: "Dr. Padmavathi garu is a very good doctor. We had great experience till now. Thanks for Dr. Padmavathi garu, she is an excellent dermatologist. She is soft spoken and very friendly, she clears all the doubts. I got good results. And the whole staff is also very friendly.",
    author: "Kavya Olupalli",
    initial: "K",
    bg: "bg-maroon-50",
    clinic: "panjagutta"
  },
  {
    id: 13,
    text: "I had an amazing experience with Dr. Padmathi. Their expertise and personalized approach truly stood out. The diagnosis was spot-on, and the treatment plan yielded remarkable results. The clinic's atmosphere is welcoming, and the staff is friendly and professional. I highly recommend Dr. Padmathi for anyone seeking top-notch dermatological care.",
    author: "Sowjanya Pandranki",
    initial: "S",
    bg: "bg-maroon-50",
    clinic: "panjagutta"
  },
  {
    id: 14,
    text: "Dr. Padmavathi Surapaneni is truly one of the best and most experienced dermatologists I've ever consulted. Her knowledge and the way she explains everything in detail show how strong she is in her subject. I've never faced any issues with the treatments or creams she has prescribed - they've always worked beautifully for me. What I really appreciate is that she never recommends anything unnecessary, which shows her integrity and genuine care for patients. The clinic staff are also very friendly, helpful, and well-trained. Highly recommend her clinic for anyone looking for trustworthy and effective dermatological care.",
    author: "Swathi Kodali",
    initial: "S",
    bg: "bg-maroon-50",
    clinic: "panjagutta"
  },
  {
    id: 15,
    text: "We had a great experience at Pragna Skin Clinic. Dr. Padmavathi ma'am and Dr. Pragna ma'am are extremely knowledgeable and kind. The support staff were courteous and helpful. Highly recommended for anyone seeking treatment for hair and skin-related concerns.",
    author: "Saran Ravipati",
    initial: "S",
    bg: "bg-maroon-50",
    clinic: "panjagutta"
  },
  {
    id: 16,
    text: "I'm very pleased with the care and treatment I received. From the first consultation, you took the time to listen to my concerns, explain the underlying issues, and walk me through the treatment options clearly. Your expertise and personalized approach made a big difference, and I've seen noticeable improvement in both my hair. Thank you for your professionalism.",
    author: "Nayeem Mohammed",
    initial: "N",
    bg: "bg-maroon-50",
    clinic: "panjagutta"
  }
];

// --- ICONS ---
const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

const StarIcon = () => (
  <svg className="w-4 h-4 text-[#FBBC05]" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

// --- MODAL COMPONENT ---
const ReviewModal = ({ review, onClose }: { review: typeof testimonials[0], onClose: () => void }) => {
  const reviewLink = review.clinic === "kokapet" ? KOKAPET_REVIEWS_LINK : PANJAGUTTA_REVIEWS_LINK;

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEscape);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-charcoal/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-cream rounded-[2rem] p-8 md:p-10 max-w-2xl w-full shadow-2xl border border-maroon/10 relative overflow-hidden"
      >
         {/* Noise Texture */}
         <div 
          className="absolute inset-0 opacity-[0.4] mix-blend-multiply pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative z-10">
          <button 
            onClick={onClose}
            className="absolute -top-2 -right-2 w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors text-charcoal/60 hover:text-charcoal"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>

          <div className="flex items-center gap-4 mb-8">
            <div className={`w-16 h-16 rounded-full ${review.bg} flex items-center justify-center text-charcoal/80 font-display font-bold text-2xl border border-white/50 shadow-sm`}>
              {review.initial}
            </div>
            <div>
              <h3 className="font-display text-2xl text-charcoal">{review.author}</h3>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-0.5">
                  {[1,2,3,4,5].map(i => <StarIcon key={i} />)}
                </div>
                <span className="text-xs font-medium text-charcoal/50 uppercase tracking-wider border border-charcoal/10 px-2 py-0.5 rounded-full">
                  {review.clinic}
                </span>
              </div>
            </div>
          </div>

          <p className="text-charcoal/80 text-lg leading-relaxed font-sans mb-8 max-h-[50vh] overflow-y-auto pr-2">
            "{review.text}"
          </p>

          <div className="flex justify-end pt-6 border-t border-maroon/10">
            <a
              href={reviewLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-maroon flex items-center gap-2 hover:underline"
            >
              Read Full Reviews on Google
              <GoogleIcon />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- REVIEW CARD COMPONENT ---
const ReviewCard = ({ review, onClick }: { review: typeof testimonials[0], onClick: () => void }) => {
  // Responsive threshold: wider cards on md+ screens fit more text
  const [charThreshold, setCharThreshold] = useState(180);
  
  useEffect(() => {
    const updateThreshold = () => {
      // md breakpoint (768px) has wider cards (420px vs 360px)
      // More width = more chars per line = higher threshold needed
      setCharThreshold(window.innerWidth >= 768 ? 220 : 180);
    };
    updateThreshold();
    window.addEventListener("resize", updateThreshold);
    return () => window.removeEventListener("resize", updateThreshold);
  }, []);

  const showReadMore = review.text.length > charThreshold;

  return (
    <div
      className="block w-[360px] md:w-[420px] h-[320px] flex-shrink-0 mx-4 select-none relative group"
      onDragStart={(e) => e.preventDefault()}
    >
      <div className="h-full bg-cream rounded-[2rem] p-8 shadow-[0_2px_20px_rgba(0,0,0,0.04)] border border-maroon/5 hover:border-maroon/20 hover:shadow-[0_8px_30px_rgba(114,43,43,0.08)] transition-all duration-300 flex flex-col relative overflow-hidden">
        
        {/* Noise Texture Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.4] mix-blend-multiply pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Content Container */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full ${review.bg} flex items-center justify-center text-charcoal/80 font-display font-bold text-lg border border-white/50 shadow-sm`}>
                {review.initial}
              </div>
              <div>
                <h4 className="font-sans font-semibold text-charcoal text-base">{review.author}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-0.5">
                    {[1,2,3,4,5].map(i => <StarIcon key={i} />)}
                  </div>
                  {/* Subtle Clinic Badge */}
                  <span className="text-[10px] font-medium text-charcoal/40 uppercase tracking-wider border border-charcoal/10 px-1.5 py-px rounded-full">
                    {review.clinic}
                  </span>
                </div>
              </div>
            </div>
            <GoogleIcon />
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col">
            <p className="text-charcoal/70 text-[0.95rem] leading-[1.7] font-sans line-clamp-5">
              "{review.text}"
            </p>
            {showReadMore && (
              <div className="mt-auto pt-3">
                <button
                  className="text-maroon hover:underline cursor-pointer font-medium text-sm transition-colors flex items-center gap-1 group/btn"
                  onClick={onClick}
                >
                  Read More
                  <svg 
                    className="w-3 h-3 transform group-hover/btn:translate-x-0.5 transition-transform" 
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- PORTAL COMPONENT FOR MODAL ---
function ModalPortal({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;
  
  return createPortal(children, document.body);
}

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const [selectedReview, setSelectedReview] = useState<typeof testimonials[0] | null>(null);
  
  // Animation state
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);

  // Triple the list to ensure infinite scroll seamlessness
  const extendedList = [...testimonials, ...testimonials, ...testimonials];

  // Calculate reset point based on screen size
  const getResetPoint = () => {
    // Card width: 360px (mobile) / 420px (desktop at md breakpoint)
    // Margin: mx-4 = 32px total per card
    // 16 testimonials per set
    const cardWidth = typeof window !== "undefined" && window.innerWidth >= 768 ? 420 : 360;
    const cardMargin = 32;
    return (cardWidth + cardMargin) * testimonials.length;
  };

  // Auto-scroll logic using Framer Motion
  useEffect(() => {
    let animationFrameId: number;
    let resetPoint = getResetPoint();
    
    // Update reset point on resize
    const handleResize = () => {
      resetPoint = getResetPoint();
    };
    window.addEventListener("resize", handleResize);
    
    const animate = () => {
      if (!isHovered && !selectedReview) {
        let currentX = x.get();
        currentX -= 0.5; // Controls speed (lower = slower)
        
        // Reset position for seamless loop
        if (currentX <= -resetPoint) {
          currentX += resetPoint;
        }
        
        x.set(currentX);
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [isHovered, selectedReview, x]);

  return (
    <>
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
              className="text-4xl lg:text-6xl font-display text-charcoal mb-8"
            >
              Real results, <span className="italic text-maroon">real confidence.</span>
            </motion.h2>
            
            {/* Elegant Clinic Pills - Centered */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4"
            >
              {/* Panjagutta Pill - Reordered First */}
              <a
                href={PANJAGUTTA_REVIEWS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-white/40 backdrop-blur-sm px-6 py-3 rounded-full border border-maroon/10 shadow-sm hover:bg-white/60 hover:shadow-md transition-all group"
              >
                <div className="w-8 h-8 rounded-full bg-maroon/10 flex items-center justify-center text-maroon shadow-sm group-hover:scale-110 transition-transform">
                  <StarIcon />
                </div>
                <div className="text-left">
                  <span className="font-bold text-charcoal block leading-none text-sm">4.8/5 Rating</span>
                  <span className="text-charcoal/60 text-xs">Panjagutta Clinic</span>
                </div>
              </a>

              {/* Kokapet Pill - Reordered Second */}
              <a
                href={KOKAPET_REVIEWS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-white/40 backdrop-blur-sm px-6 py-3 rounded-full border border-maroon/10 shadow-sm hover:bg-white/60 hover:shadow-md transition-all group"
              >
                <div className="w-8 h-8 rounded-full bg-maroon/10 flex items-center justify-center text-maroon shadow-sm group-hover:scale-110 transition-transform">
                  <StarIcon />
                </div>
                <div className="text-left">
                  <span className="font-bold text-charcoal block leading-none text-sm">5/5 Rating</span>
                  <span className="text-charcoal/60 text-xs">Kokapet Clinic</span>
                </div>
              </a>
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
            style={{ x }}
            drag="x"
            dragConstraints={{ left: -getResetPoint() * 2, right: 0 }} 
            whileTap={{ cursor: "grabbing" }}
          >
            {extendedList.map((review, i) => (
              <ReviewCard 
                key={`${review.id}-${i}`} 
                review={review}
                onClick={() => setSelectedReview(review)}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Modal Portal - Renders outside section to avoid overflow:hidden */}
      <ModalPortal>
        <AnimatePresence>
          {selectedReview && (
            <ReviewModal 
              review={selectedReview} 
              onClose={() => setSelectedReview(null)} 
            />
          )}
        </AnimatePresence>
      </ModalPortal>
    </>
  );
}
