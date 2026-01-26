"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { SignatureProgram } from "@/lib/content/signature-programs";
import BookingModal from "@/components/ui/BookingModal";

interface Props {
  program: SignatureProgram;
}

// Smooth easing for all animations
const smoothEase = [0.22, 1, 0.36, 1] as const;

// Stagger container for children
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// Individual item animation
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: smoothEase },
  },
};

export default function SignatureProgramClientContent({ program }: Props) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <>
      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        programName={program.title}
      />

      {/* 1. HERO SECTION */}
      <HeroSection
        program={program}
        onBookClick={() => setIsBookingOpen(true)}
      />

      {/* 2. PHILOSOPHY SECTION - bg-white */}
      <PhilosophySection program={program} />

      {/* 3. THE PROTOCOL - bg-beige */}
      <ProtocolSection process={program.process} />

      {/* 4. FAQ Section - bg-white */}
      <FAQSection faqs={program.faqs} />

      {/* 5. CTA - bg-maroon */}
      <CTASection
        programTitle={program.title}
        onBookClick={() => setIsBookingOpen(true)}
      />
    </>
  );
}

// ============================================
// HERO SECTION
// ============================================
function HeroSection({
  program,
  onBookClick,
}: {
  program: SignatureProgram;
  onBookClick: () => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative pt-20 min-h-screen flex flex-col lg:flex-row"
    >
      {/* Left: Image */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1, ease: smoothEase }}
        className="lg:w-1/2 h-[50vh] lg:h-auto lg:min-h-screen relative bg-charcoal overflow-hidden"
      >
        {program.image ? (
          <Image
            src={program.image}
            alt={program.title}
            fill
            priority
            placeholder="blur"
            className="object-cover"
            style={{ objectPosition: "center 20%" }}
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        ) : (
          <div
            className={`absolute inset-0 bg-gradient-to-br ${program.gradient}`}
          >
            <div
              className="absolute inset-0 opacity-[0.15] mix-blend-overlay"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              }}
            />
          </div>
        )}

        {/* Mobile Overlay Text */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/30 to-transparent lg:hidden flex items-end p-6">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: smoothEase }}
              className="text-maroon-300 text-xs tracking-[0.25em] uppercase font-medium mb-2 block"
            >
              {program.subtitle}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4, ease: smoothEase }}
              className="text-4xl font-display text-white"
            >
              {program.title}
            </motion.h1>
          </div>
        </div>
      </motion.div>

      {/* Right: Content */}
      <div className="lg:w-1/2 bg-beige-warm flex items-center p-6 lg:p-10 xl:p-14">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-lg w-full"
        >
          <motion.span
            variants={fadeInUp}
            className="hidden lg:block text-maroon/80 text-[10px] md:text-xs tracking-[0.25em] uppercase font-medium mb-4"
          >
            {program.subtitle}
          </motion.span>

          <motion.h1
            variants={fadeInUp}
            className="hidden lg:block text-4xl md:text-5xl xl:text-6xl font-display text-charcoal mb-5 leading-[0.95]"
          >
            {program.title}
          </motion.h1>

          <motion.div
            variants={fadeInUp}
            className="flex items-center gap-3 mb-8 text-[10px] md:text-xs text-maroon/60 font-medium uppercase tracking-[0.2em]"
          >
            <span>{program.duration}</span>
            <span className="w-px h-3 bg-maroon/20" />
            <span>Signature Series</span>
          </motion.div>

          {/* Benefits - List Style */}
          <motion.div variants={fadeInUp} className="mb-8">
            <h3 className="text-[10px] md:text-xs font-medium text-maroon/70 mb-4 uppercase tracking-[0.25em]">
              At a Glance
            </h3>
            <ul className="space-y-3">
              {program.benefits.slice(0, 4).map((benefit, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-2.5 w-1.5 h-1.5 bg-maroon rounded-full flex-shrink-0" />
                  <span className="text-base text-charcoal/80 leading-relaxed">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Ideal For */}
          <motion.div variants={fadeInUp} className="mb-10">
            <h3 className="text-[10px] md:text-xs font-medium text-maroon/70 mb-4 uppercase tracking-[0.25em]">
              Ideal For
            </h3>
            <div className="flex flex-wrap gap-2">
              {program.idealFor.map((item, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-white border border-maroon/10 rounded-full text-xs uppercase tracking-wider text-charcoal/70 font-medium"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div variants={fadeInUp} className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onBookClick();
              }}
              className="px-7 py-3 bg-maroon text-white rounded-full font-medium hover:bg-maroon-dark transition-all duration-300 hover:shadow-lg text-sm cursor-pointer"
            >
              Book Consultation
            </button>
            <a
              href="#about"
              className="px-7 py-3 border border-charcoal/15 text-charcoal rounded-full font-medium hover:bg-white transition-all duration-300 text-sm"
            >
              Learn More
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================
// PHILOSOPHY SECTION - Clean centered text
// ============================================
function PhilosophySection({ program }: { program: SignatureProgram }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section
      id="about"
      ref={ref}
      className="py-12 md:py-16 bg-white scroll-mt-20"
    >
      <div className="section-container">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: smoothEase }}
            className="text-center"
          >
            <span className="text-maroon/70 font-medium uppercase tracking-[0.25em] text-[10px] md:text-xs mb-3 block">
              About the Programme
            </span>
            <h2 className="text-3xl md:text-4xl font-display text-charcoal mb-4">
              What is {program.title}?
            </h2>
            <p className="text-base md:text-lg text-charcoal/70 leading-relaxed">
              {program.longDescription}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// PROTOCOL SECTION - Simple, Reliable Layout
// ============================================
function ProtocolSection({ process }: { process: SignatureProgram["process"] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="py-12 md:py-16 bg-beige-warm">
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: smoothEase }}
          className="text-center mb-8"
        >
          <span className="text-maroon/70 font-medium uppercase tracking-[0.25em] text-[10px] md:text-xs mb-3 block">
            Treatment Timeline
          </span>
          <h2 className="text-3xl md:text-4xl font-display text-charcoal">
            The Protocol
          </h2>
        </motion.div>

        {/* Timeline - Simple Grid Layout */}
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Central Line (Desktop) */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-maroon/20 -translate-x-1/2" />

            {/* Steps */}
            <div className="space-y-6">
            {process.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.15 + i * 0.1,
                  ease: smoothEase,
                }}
                className="relative"
              >
                {/* Mobile Layout */}
                <div className="md:hidden">
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 bg-maroon rounded-full ring-4 ring-beige-warm flex-shrink-0 mt-1" />
                      {i < process.length - 1 && (
                        <div className="w-px flex-1 bg-maroon/20 mt-2" />
                      )}
                    </div>
                    <div className="pb-6 flex-1">
                      <h3 className="text-lg font-display text-maroon mb-1">
                        {step.title}
                      </h3>
                      <span className="text-maroon/60 text-xs font-medium uppercase tracking-[0.15em] mb-2 block">
                        {step.duration}
                      </span>
                      <p className="text-charcoal/70 text-base leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Desktop Layout - Grid Based */}
                <div className="hidden md:grid md:grid-cols-[1fr,auto,1fr] md:gap-8 md:items-start">
                  {/* Left Column */}
                  <div className={`${i % 2 === 0 ? "text-right" : ""}`}>
                    {i % 2 === 0 && (
                      <div className="bg-white p-5 rounded-xl border border-charcoal/5">
                        <h3 className="text-lg font-display text-maroon mb-1">
                          {step.title}
                        </h3>
                        <span className="text-maroon/60 text-xs font-medium uppercase tracking-[0.15em] mb-2 block">
                          {step.duration}
                        </span>
                        <p className="text-charcoal/70 text-base leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Center - Node */}
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 bg-maroon rounded-full ring-4 ring-beige-warm" />
                  </div>

                  {/* Right Column */}
                  <div className={`${i % 2 === 1 ? "" : ""}`}>
                    {i % 2 === 1 && (
                      <div className="bg-white p-5 rounded-xl border border-charcoal/5">
                        <h3 className="text-lg font-display text-maroon mb-1">
                          {step.title}
                        </h3>
                        <span className="text-maroon/60 text-xs font-medium uppercase tracking-[0.15em] mb-2 block">
                          {step.duration}
                        </span>
                        <p className="text-charcoal/70 text-base leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// FAQ SECTION - No scroll-triggered animations to prevent flash
// ============================================
function FAQSection({ faqs }: { faqs: SignatureProgram["faqs"] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="section-container">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <span className="text-maroon/70 font-medium uppercase tracking-[0.25em] text-[10px] md:text-xs mb-3 block">
              Common Questions
            </span>
            <h2 className="text-3xl md:text-4xl font-display text-charcoal">
              FAQs
            </h2>
          </div>

          {/* FAQ Items - Card Style */}
          <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`rounded-xl border transition-all duration-300 overflow-hidden ${
                openIndex === i
                  ? "bg-beige-warm border-maroon/20 shadow-sm"
                  : "bg-beige-warm/50 border-charcoal/5 hover:border-maroon/20 hover:bg-beige-warm"
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full p-5 flex items-center justify-between text-left cursor-pointer"
              >
                <h3 className="text-base md:text-lg font-display text-charcoal pr-4">
                  {faq.question}
                </h3>
                <motion.span
                  animate={{ rotate: openIndex === i ? 45 : 0 }}
                  transition={{ duration: 0.3, ease: smoothEase }}
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                    openIndex === i
                      ? "bg-maroon text-white"
                      : "bg-maroon/10 text-maroon"
                  }`}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </motion.span>
              </button>
              <motion.div
                initial={false}
                animate={{
                  height: openIndex === i ? "auto" : 0,
                  opacity: openIndex === i ? 1 : 0,
                }}
                transition={{ duration: 0.4, ease: smoothEase }}
                className="overflow-hidden"
              >
                <div className="px-5 pb-5 pt-0">
                  <p className="text-charcoal/70 text-base leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </motion.div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// CTA SECTION
// ============================================
function CTASection({
  programTitle,
  onBookClick,
}: {
  programTitle: string;
  onBookClick: () => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="py-12 md:py-16 bg-maroon relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay" />
      
      <div className="section-container relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: smoothEase }}
        >
          <h2 className="text-3xl md:text-4xl font-display text-white mb-3">
            Ready to begin?
          </h2>
          <p className="text-white/80 text-base mb-6 max-w-md mx-auto">
            Schedule your consultation for{" "}
            <span className="italic text-white">{programTitle}</span>. Our experts will customize the protocol for you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onBookClick();
              }}
              className="px-10 py-4 bg-white text-maroon rounded-full font-medium hover:bg-beige-warm transition-all duration-300 hover:scale-105 text-sm cursor-pointer shadow-lg shadow-black/10"
            >
              Book Consultation
            </button>
          </div>

          {/* Clinic Numbers */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-white/90 font-light">
              <div className="flex flex-col items-center sm:items-end">
                  <span className="text-[10px] uppercase tracking-widest opacity-60 mb-1">Punjagutta</span>
                  <a href="tel:09848367000" className="hover:text-white transition-colors flex items-center gap-2">
                      <svg className="w-4 h-4 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      098483 67000
                  </a>
              </div>
              <div className="hidden sm:block w-px h-8 bg-white/20"></div>
              <div className="flex flex-col items-center sm:items-start">
                  <span className="text-[10px] uppercase tracking-widest opacity-60 mb-1">Kokapet</span>
                  <a href="tel:08886421111" className="hover:text-white transition-colors flex items-center gap-2">
                      <svg className="w-4 h-4 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      088864 21111
                  </a>
              </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
