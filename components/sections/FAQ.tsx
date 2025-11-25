'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

/**
 * FAQ - Premium Accordion
 * 
 * Design Philosophy:
 * - Clean, minimal accordion
 * - Smooth expand/collapse animations
 * - Two-column layout for visual interest
 */

const faqs = [
  {
    question: 'How do I book an appointment?',
    answer: 'You can book an appointment through our website by filling out the contact form, calling us directly, or sending us a WhatsApp message. Our team typically responds within a few hours during business hours.',
  },
  {
    question: 'What should I expect during my first consultation?',
    answer: 'Your first consultation includes a thorough skin analysis, discussion of your concerns and goals, and a personalized treatment plan recommendation. The consultation typically lasts 30-45 minutes.',
  },
  {
    question: 'Are your treatments safe?',
    answer: 'All our treatments are US-FDA approved and performed by qualified dermatologists using state-of-the-art equipment. We follow strict safety protocols and customize treatments based on individual skin types.',
  },
  {
    question: 'How many sessions will I need?',
    answer: 'The number of sessions varies depending on the treatment and your individual concerns. During your consultation, we\'ll provide a detailed treatment plan with expected timelines and results.',
  },
  {
    question: 'Do you offer payment plans?',
    answer: 'Yes, we offer flexible payment options including EMI facilities for treatment packages. Our team can discuss the best payment plan for your needs during consultation.',
  },
  {
    question: 'How do I prepare for my treatment?',
    answer: 'Preparation varies by treatment. Generally, we recommend avoiding sun exposure, certain skincare products, and blood thinners before procedures. Specific instructions will be provided during your consultation.',
  },
  {
    question: 'Is there any downtime after treatments?',
    answer: 'Downtime varies by procedure. Many of our treatments have minimal to no downtime, allowing you to return to daily activities immediately. We\'ll discuss what to expect for your specific treatment.',
  },
  {
    question: 'Do you offer virtual consultations?',
    answer: 'Yes, we offer virtual consultations for initial assessments and follow-ups. However, certain treatments require an in-person visit for proper evaluation and treatment.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const leftFaqs = faqs.slice(0, 4);
  const rightFaqs = faqs.slice(4);

  return (
    <section 
      ref={containerRef}
      className="relative py-24 lg:py-40 bg-beige overflow-hidden"
    >
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 mb-8"
          >
            <span className="w-12 h-px bg-maroon/40" />
            <span className="text-maroon font-medium tracking-[0.3em] uppercase text-xs">
              FAQ
            </span>
            <span className="w-12 h-px bg-maroon/40" />
          </motion.span>
          
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: 100 }}
              animate={isInView ? { y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-display-md font-display text-charcoal"
            >
              Common{' '}
              <span className="italic text-maroon">questions</span>
            </motion.h2>
          </div>
        </div>

        {/* FAQ Grid */}
        <div className="grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Left Column */}
          <div className="space-y-4">
            {leftFaqs.map((faq, index) => (
              <FAQItem
                key={index}
                faq={faq}
                index={index}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                isInView={isInView}
              />
            ))}
          </div>
          
          {/* Right Column */}
          <div className="space-y-4">
            {rightFaqs.map((faq, index) => (
              <FAQItem
                key={index + 4}
                faq={faq}
                index={index + 4}
                isOpen={openIndex === index + 4}
                onToggle={() => setOpenIndex(openIndex === index + 4 ? null : index + 4)}
                isInView={isInView}
              />
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-charcoal/60 mb-4">Can't find what you're looking for?</p>
          <a 
            href="#contact"
            className="inline-flex items-center gap-2 text-maroon font-medium hover:gap-3 transition-all"
          >
            <span>Contact us directly</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

interface FAQItemProps {
  faq: { question: string; answer: string };
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  isInView: boolean;
}

function FAQItem({ faq, index, isOpen, onToggle, isInView }: FAQItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ 
        duration: 0.5, 
        delay: 0.1 + index * 0.05,
        ease: [0.16, 1, 0.3, 1]
      }}
      className="bg-white rounded-2xl overflow-hidden"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-beige-warm/50 transition-colors"
      >
        <span className="font-display text-lg text-charcoal pr-4">{faq.question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 w-8 h-8 rounded-full bg-maroon/10 flex items-center justify-center"
        >
          <svg className="w-4 h-4 text-maroon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-0">
              <p className="text-charcoal/60 leading-relaxed">{faq.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
