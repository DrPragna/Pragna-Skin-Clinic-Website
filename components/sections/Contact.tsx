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
      className="py-12 lg:py-16 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #F5EDE8 0%, #FAF4F0 50%, #F8EFE8 100%)' }}
    >
      {/* Artistic Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-gold/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4 pointer-events-none mix-blend-multiply" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-maroon/5 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4 pointer-events-none mix-blend-multiply" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('/noise.png')] opacity-[0.03] pointer-events-none" />
      
      <div className="section-container max-w-5xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          
          {/* Left: Artistic Typography & Invite */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10"
            >
              <span className="inline-flex items-center gap-2 text-maroon/80 font-sans font-medium tracking-[0.2em] uppercase text-[10px] mb-6 border border-maroon/20 rounded-full px-3 py-1 bg-white/30 backdrop-blur-sm w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-maroon animate-pulse" />
                Book Consultation
              </span>
              
              <h2 className="text-4xl lg:text-[3.5rem] font-display text-charcoal mb-4 leading-[1.1] -tracking-[0.02em]">
                Begin your <br />
                <span className="italic text-maroon font-light relative inline-block">
                  transformation
                  <svg className="absolute -bottom-1 left-0 w-full h-2 text-maroon/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  </svg>
                </span>
              </h2>

              <p className="text-charcoal/60 font-sans font-light leading-relaxed text-sm max-w-xs mb-8">
                Where expert dermatology meets the art of aesthetic refinement. Let us craft a journey unique to your skin.
              </p>

              <div className="flex items-center gap-6">
                 <div className="group cursor-pointer">
                    <p className="text-[9px] uppercase tracking-[0.2em] text-charcoal/40 mb-1">Direct Line</p>
                    <a href="tel:+919876543210" className="text-lg font-display text-charcoal group-hover:text-maroon transition-colors duration-300 flex items-center gap-2">
                      +91 98765 43210
                    </a>
                 </div>
              </div>
            </motion.div>
          </div>
            
          {/* Right: Creative Form Card */}
          <div className="lg:col-span-7 relative">
            {/* Decorative overlapping element */}
            <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-rose-gold/20 to-transparent rounded-full blur-2xl pointer-events-none" />
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white/80 backdrop-blur-xl rounded-[2rem] rounded-tr-none p-6 lg:p-8 shadow-[0_15px_30px_-10px_rgba(114,43,43,0.05)] border border-white/50 relative overflow-hidden"
            >
               {/* Rotating Badge - Absolute Positioned on Card */}
               <div className="absolute -top-4 -right-4 w-24 h-24 hidden md:block pointer-events-none opacity-40 mix-blend-multiply">
                 <div className="absolute inset-0 animate-[spin_12s_linear_infinite]">
                   <svg viewBox="0 0 100 100" className="w-full h-full">
                     <defs>
                       <path id="circle" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
                     </defs>
                     <text fontSize="10" letterSpacing="2">
                       <textPath href="#circle" className="fill-maroon font-mono uppercase font-bold">
                         • PRAGNA SKIN CLINIC • PRAGNA SKIN CLINIC
                       </textPath>
                     </text>
                   </svg>
                 </div>
               </div>

              <AnimatePresence mode="wait">
                {formState === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 bg-rose-gold/10 rounded-full flex items-center justify-center mx-auto text-maroon mb-4">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-display text-charcoal mb-2 italic">Request Received</h3>
                    <p className="text-charcoal/50 text-xs font-light">We will be in touch shortly.</p>
                    <button 
                      onClick={() => setFormState('idle')}
                      className="text-maroon text-[10px] uppercase tracking-widest mt-6 hover:opacity-70 transition-opacity underline underline-offset-4"
                    >
                      Send another
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-3">
                      {/* Name Field */}
                      <div className="group">
                        <input
                          type="text"
                          required
                          className="w-full bg-white border border-charcoal/15 rounded-xl px-4 py-3.5 text-base text-charcoal focus:border-maroon focus:ring-2 focus:ring-maroon/20 focus:outline-none transition-all duration-300 placeholder:text-charcoal/40 font-light shadow-sm"
                          placeholder="Your Name" 
                        />
                      </div>
                      
                      {/* Email Field */}
                      <div className="group">
                        <input
                          type="email"
                          required
                          className="w-full bg-white border border-charcoal/15 rounded-xl px-4 py-3.5 text-base text-charcoal focus:border-maroon focus:ring-2 focus:ring-maroon/20 focus:outline-none transition-all duration-300 placeholder:text-charcoal/40 font-light shadow-sm"
                          placeholder="Email Address" 
                        />
                      </div>
                      
                      {/* Phone with Country Code */}
                      <div className="flex gap-2">
                        <div className="relative w-28 shrink-0">
                          <select 
                            defaultValue="+91" 
                            className="w-full bg-white border border-charcoal/15 rounded-xl px-3 py-3.5 text-base text-charcoal focus:border-maroon focus:ring-2 focus:ring-maroon/20 focus:outline-none transition-all duration-300 appearance-none cursor-pointer font-light shadow-sm"
                          >
                            <option value="+91">🇮🇳 +91</option>
                            <option value="+1">🇺🇸 +1</option>
                            <option value="+44">🇬🇧 +44</option>
                            <option value="+971">🇦🇪 +971</option>
                            <option value="+65">🇸🇬 +65</option>
                            <option value="+61">🇦🇺 +61</option>
                            <option value="+49">🇩🇪 +49</option>
                            <option value="+33">🇫🇷 +33</option>
                            <option value="+81">🇯🇵 +81</option>
                            <option value="+86">🇨🇳 +86</option>
                          </select>
                          <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-charcoal/40">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                        <input
                          type="tel"
                          required
                          className="flex-1 bg-white border border-charcoal/15 rounded-xl px-4 py-3.5 text-base text-charcoal focus:border-maroon focus:ring-2 focus:ring-maroon/20 focus:outline-none transition-all duration-300 placeholder:text-charcoal/40 font-light shadow-sm"
                          placeholder="Phone Number" 
                        />
                      </div>
                    </div>

                    <div className="group">
                       <textarea
                          rows={2}
                          className="w-full bg-white border border-charcoal/15 rounded-xl px-4 py-3.5 text-base text-charcoal focus:border-maroon focus:ring-2 focus:ring-maroon/20 focus:outline-none transition-all duration-300 placeholder:text-charcoal/40 font-light resize-none shadow-sm"
                          placeholder="Any specific concerns? (Optional)" 
                        />
                    </div>
                      
                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={formState === 'submitting'}
                        className="w-full bg-maroon text-cream py-4 rounded-xl text-[10px] uppercase tracking-[0.2em] hover:bg-maroon-dark transition-all duration-500 shadow-lg shadow-maroon/20 disabled:opacity-70 group relative overflow-hidden"
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          {formState === 'submitting' ? 'Sending Request...' : 'Book Appointment'}
                          {!formState && (
                             <span className="w-3 h-[1px] bg-cream/50 group-hover:w-5 transition-all duration-300" />
                          )}
                        </span>
                      </button>
                    </div>
                  </form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
