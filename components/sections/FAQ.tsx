'use client';

import { useState } from 'react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'How do I book an appointment?',
      answer:
        'You can book an appointment by calling our clinic, using the online booking form on our website, or sending us a message on WhatsApp or Instagram.',
    },
    {
      question: 'Do you provide personalized treatment plans?',
      answer:
        'Yes. Every treatment plan at Pragna is customized based on your unique skin type, concerns, and goals.',
    },
    {
      question: 'Are your treatments safe?',
      answer:
        'Yes. All our treatments are performed by experienced dermatologists using advanced, well-evaluated technology. Safety and evidence-based care are non-negotiable for us.',
    },
    {
      question: 'How do I prepare for my first consultation?',
      answer:
        'Just come as you are. If you're currently using any skincare products or medications, it helps to bring a list or photos of them so we can understand your routine better.',
    },
    {
      question: 'Do you offer packages for treatments?',
      answer:
        'Yes, we offer packages for certain treatments, and seasonal discounts may also apply. Our team will guide you to options that match your needs and budget.',
    },
    {
      question: 'How soon can I expect results?',
      answer:
        'It depends on the treatment and your individual skin type. Some procedures deliver visible results immediately, while others may require a few sessions for optimal outcomes.',
    },
    {
      question: 'Do you have solutions for bridal skincare?',
      answer:
        'Yes. We offer pre-bridal skincare plans and programs designed to help brides achieve glowing, camera-ready skin for their big day.',
    },
    {
      question: 'Do you provide virtual consultations?',
      answer:
        'Yes, virtual consultations are available for your convenience. You can discuss your concerns with our dermatologists from home and plan your next steps.',
    },
  ];

  return (
    <section className="section-padding bg-beige-warm">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-charcoal">
            Frequently asked questions
          </h2>
          <p className="text-lg text-charcoal/70">
            Here are some of the questions we're asked most often. If you don't see your question here, 
            our team will be happy to help.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-beige rounded-2xl overflow-hidden shadow-card hover:shadow-soft transition-shadow"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-terracotta/10 transition-colors"
              >
                <span className="font-serif font-semibold text-lg text-charcoal pr-4">
                  {faq.question}
                </span>
                <svg
                  className={`w-6 h-6 text-maroon flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-8 pb-6 animate-fade-in">
                  <p className="text-charcoal/70 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

