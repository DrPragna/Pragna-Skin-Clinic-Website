'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

/**
 * CONTACT - Compact & Light
 * 
 * Design Philosophy:
 * - Light, airy aesthetic (Cream/Beige)
 * - Compact "Card" layout
 * - Minimalist form fields
 */

export default function Contact() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    // Simulate
    await new Promise(resolve => setTimeout(resolve, 1500));
    setFormState('success');
  };

  return (
    <section 
      id="contact"
      ref={containerRef}
      className="py-12 lg:py-16 bg-beige relative overflow-hidden"
    >
      <div className="section-container max-w-5xl mx-auto">
      
        {/* Compact Card Container */}
        <div className="bg-white rounded-[2.5rem] p-8 lg:p-10 shadow-soft-xl border border-maroon/5 relative overflow-hidden">
          {/* Decorative corner blur */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-rose-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

          <div className="grid lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: Invitation (Compact) */}
            <div className="lg:col-span-5 space-y-5">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                <span className="text-maroon font-medium tracking-[0.2em] uppercase text-xs block mb-4">
                  Consultation
                </span>
                <h2 className="text-3xl lg:text-4xl font-display text-charcoal mb-3 leading-tight">
                  Start your <span className="italic text-maroon">transformation</span>
                </h2>
                <p className="text-charcoal/60 font-light leading-relaxed text-sm">
                  Schedule a visit with our experts. We'll craft a personalized plan just for you.
                </p>
              </motion.div>

              <div className="pt-4 border-t border-maroon/5">
                <p className="text-xs uppercase tracking-widest text-charcoal/40 mb-1">Call us directly</p>
                <a href="tel:+919876543210" className="text-lg font-display text-maroon hover:opacity-80 transition-opacity">
                  +91 98765 43210
                </a>
              </div>
            </div>
              
            {/* Right: Form (Minimalist) */}
            <div className="lg:col-span-7">
          <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-beige-warm/50 rounded-2xl p-6 lg:p-8"
          >
              <AnimatePresence mode="wait">
                  {formState === 'success' ? (
                  <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8"
                  >
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600 mb-4">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                      <h3 className="text-2xl font-display text-charcoal mb-2">Request Received</h3>
                      <p className="text-charcoal/60 text-sm">We'll confirm your appointment shortly.</p>
                      <button 
                        onClick={() => setFormState('idle')}
                        className="text-maroon text-sm font-medium hover:underline mt-4"
                      >
                        New request
                      </button>
                  </motion.div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <input
                              type="text"
                              required
                            className="w-full bg-white border border-charcoal/5 rounded-xl px-4 py-3 text-sm focus:border-maroon/30 focus:outline-none transition-colors placeholder:text-charcoal/30"
                            placeholder="Name" 
                            />
                          </div>
                        <div className="space-y-1.5">
                            <input
                              type="tel"
                              required
                            className="w-full bg-white border border-charcoal/5 rounded-xl px-4 py-3 text-sm focus:border-maroon/30 focus:outline-none transition-colors placeholder:text-charcoal/30"
                            placeholder="Phone" 
                            />
                          </div>
                          </div>

                      <div className="space-y-1.5">
                        <select 
                          defaultValue="" 
                          className="w-full bg-white border border-charcoal/5 rounded-xl px-4 py-3 text-sm text-charcoal/70 focus:border-maroon/30 focus:outline-none transition-colors"
                        >
                          <option value="" disabled>Select Treatment</option>
                          <option value="general">General Consultation</option>
                          <option value="acne">Acne & Scars</option>
                          <option value="laser">Laser Hair Reduction</option>
                          <option value="anti-aging">Anti-Aging</option>
                        </select>
                          </div>

                      <div className="space-y-1.5">
                            <textarea
                          rows={2}
                          className="w-full bg-white border border-charcoal/5 rounded-xl px-4 py-3 text-sm focus:border-maroon/30 focus:outline-none transition-colors placeholder:text-charcoal/30 resize-none"
                          placeholder="Any specific concerns? (Optional)" 
                            />
                          </div>
                          
                        <button
                          type="submit"
                        disabled={formState === 'submitting'}
                        className="w-full bg-maroon text-white py-4 rounded-xl text-xs uppercase tracking-widest font-medium hover:bg-maroon-dark transition-all duration-300 shadow-lg shadow-maroon/20 disabled:opacity-70"
                        >
                        {formState === 'submitting' ? 'Sending...' : 'Book Consultation'}
                        </button>
                    </form>
                )}
              </AnimatePresence>
              </motion.div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
