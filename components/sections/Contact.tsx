'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

/**
 * CONTACT - Premium Multi-Step Booking
 * 
 * Design Philosophy:
 * - Clean, focused form experience
 * - Visual step progression
 * - Premium input styling
 * - Clear feedback and validation
 */

const services = [
  { category: 'Skin', items: ['Acne Treatment', 'Pigmentation', 'Anti-Aging', 'Skin Brightening'] },
  { category: 'Hair', items: ['Laser Hair Reduction', 'Hair Fall Treatment', 'PRP Therapy'] },
  { category: 'Body', items: ['Body Contouring', 'Stretch Marks', 'Scar Treatment'] },
  { category: 'Other', items: ['General Consultation', 'Second Opinion', 'Other'] },
];

export default function Contact() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    console.log('Form submitted:', formData);
  };

  const canProceed = () => {
    if (step === 1) return formData.name && formData.phone;
    if (step === 2) return formData.service;
    return true;
  };

  return (
    <section 
      id="contact"
      ref={containerRef}
      className="relative py-16 lg:py-24 overflow-hidden"
    >
      {/* Rich layered gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F9E4D8] via-[#FDF6F0] to-[#FBF0EA]" />
      
      {/* Additional gradient layers for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_60%_at_0%_0%,rgba(243,215,205,0.5),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_100%_100%,rgba(183,110,121,0.08),transparent)]" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-maroon/12 to-transparent" />
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-gradient-to-bl from-rose-gold/15 to-terracotta/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-gradient-to-tr from-terracotta/12 to-rose-gold/8 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/20 rounded-full blur-3xl" />

      <div className="section-container relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: Info */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 mb-8"
            >
              <span className="w-12 h-px bg-maroon/40" />
              <span className="text-maroon font-medium tracking-[0.3em] uppercase text-xs">
                Get In Touch
              </span>
            </motion.span>
            
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: 100 }}
                animate={isInView ? { y: 0 } : {}}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-display-md font-display text-charcoal mb-6"
              >
                Book your{' '}
                <span className="italic text-maroon">consultation</span>
              </motion.h2>
            </div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-charcoal/60 mb-12"
            >
              Take the first step towards healthier, radiant skin. Our team will reach out 
              within 24 hours to confirm your appointment.
            </motion.p>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-maroon/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-maroon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-charcoal">Call us</p>
                  <a href="tel:+919876543210" className="text-maroon hover:text-rose-gold transition-colors">
                    +91 98765 43210
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-maroon/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-maroon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-charcoal">Visit us</p>
                  <p className="text-charcoal/60">Punjagutta & Kokapet, Hyderabad</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-soft-xl">
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                      <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-display text-charcoal mb-2">Thank you!</h3>
                    <p className="text-charcoal/60">We'll contact you within 24 hours to confirm your appointment.</p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    {/* Step Indicators */}
                    <div className="flex items-center gap-2 mb-8">
                      {[1, 2, 3].map((s) => (
                        <div key={s} className="flex-1 flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                            s <= step ? 'bg-maroon text-cream' : 'bg-charcoal/10 text-charcoal/40'
                          }`}>
                            {s}
                          </div>
                          {s < 3 && (
                            <div className={`flex-1 h-0.5 rounded ${s < step ? 'bg-maroon' : 'bg-charcoal/10'}`} />
                          )}
                        </div>
                      ))}
                    </div>

                    <AnimatePresence mode="wait">
                      {step === 1 && (
                        <motion.div
                          key="step1"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-6"
                        >
                          <div>
                            <label className="block text-sm font-medium text-charcoal mb-2">Full Name *</label>
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-4 rounded-xl bg-beige-warm border-2 border-transparent focus:border-maroon focus:outline-none transition-colors text-charcoal placeholder:text-charcoal/30"
                              placeholder="Your name"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-charcoal mb-2">Phone Number *</label>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-4 rounded-xl bg-beige-warm border-2 border-transparent focus:border-maroon focus:outline-none transition-colors text-charcoal placeholder:text-charcoal/30"
                              placeholder="+91 98765 43210"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-charcoal mb-2">Email Address</label>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              className="w-full px-4 py-4 rounded-xl bg-beige-warm border-2 border-transparent focus:border-maroon focus:outline-none transition-colors text-charcoal placeholder:text-charcoal/30"
                              placeholder="your@email.com"
                            />
                          </div>
                        </motion.div>
                      )}

                      {step === 2 && (
                        <motion.div
                          key="step2"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-6"
                        >
                          <div>
                            <label className="block text-sm font-medium text-charcoal mb-4">Select Service *</label>
                            <div className="grid grid-cols-2 gap-3">
                              {services.flatMap(cat => cat.items).slice(0, 8).map((service) => (
                                <button
                                  key={service}
                                  type="button"
                                  onClick={() => setFormData({ ...formData, service })}
                                  className={`p-4 rounded-xl text-left text-sm transition-all ${
                                    formData.service === service
                                      ? 'bg-maroon text-cream'
                                      : 'bg-beige-warm text-charcoal hover:bg-terracotta/20'
                                  }`}
                                >
                                  {service}
                                </button>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {step === 3 && (
                        <motion.div
                          key="step3"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-6"
                        >
                          <div>
                            <label className="block text-sm font-medium text-charcoal mb-2">Additional Message</label>
                            <textarea
                              name="message"
                              value={formData.message}
                              onChange={handleChange}
                              rows={4}
                              className="w-full px-4 py-4 rounded-xl bg-beige-warm border-2 border-transparent focus:border-maroon focus:outline-none transition-colors text-charcoal placeholder:text-charcoal/30 resize-none"
                              placeholder="Tell us about your concern..."
                            />
                          </div>
                          
                          {/* Summary */}
                          <div className="bg-beige-warm rounded-xl p-4 space-y-2">
                            <p className="text-sm text-charcoal/50">Booking Summary</p>
                            <p className="font-medium text-charcoal">{formData.name}</p>
                            <p className="text-sm text-charcoal/70">{formData.phone}</p>
                            <p className="text-sm text-maroon">{formData.service}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <div className="flex gap-4 pt-4">
                      {step > 1 && (
                        <button
                          type="button"
                          onClick={() => setStep(step - 1)}
                          className="flex-1 py-4 rounded-full border border-charcoal/20 text-charcoal font-medium hover:border-maroon hover:text-maroon transition-colors"
                        >
                          Back
                        </button>
                      )}
                      
                      {step < 3 ? (
                        <button
                          type="button"
                          onClick={() => setStep(step + 1)}
                          disabled={!canProceed()}
                          className="flex-1 py-4 rounded-full bg-black text-cream font-medium hover:bg-maroon transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Continue
                        </button>
                      ) : (
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="flex-1 py-4 rounded-full bg-maroon text-cream font-medium hover:bg-maroon-dark transition-colors disabled:opacity-50"
                        >
                          {isSubmitting ? 'Submitting...' : 'Book Appointment'}
                        </button>
                      )}
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
