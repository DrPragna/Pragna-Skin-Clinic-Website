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
 * - Integrates with booking API for Google Sheets + Email + WhatsApp
 */

interface FormData {
  name: string;
  email: string;
  countryCode: string;
  phone: string;
  branch: string;
  concerns: string;
}

// Country codes - Limited to India, UK, Australia, USA
const COUNTRY_CODES = [
  { code: "+91", flag: "🇮🇳", country: "India" },
  { code: "+44", flag: "🇬🇧", country: "UK" },
  { code: "+61", flag: "🇦🇺", country: "Australia" },
  { code: "+1", flag: "🇺🇸", country: "USA" },
];

// Branch options
const BRANCHES = [
  { value: "", label: "Select Branch" },
  { value: "punjagutta", label: "Punjagutta" },
  { value: "kokapet", label: "Kokapet" },
];

export default function Contact() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    countryCode: '+91',
    phone: '',
    branch: '',
    concerns: '',
  });
  const [whatsappLink, setWhatsappLink] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/book-appointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          source: 'contact-form',
        }),
      });

      const result = await response.json();

      if (result.success) {
        setFormState('success');
        setWhatsappLink(result.whatsappLink);
        // Reset form data
        setFormData({
          name: '',
          email: '',
          countryCode: '+91',
          phone: '',
          branch: '',
          concerns: '',
        });
      } else {
        throw new Error(result.error || 'Something went wrong');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setFormState('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to submit. Please try again.');
    }
  };

  const resetForm = () => {
    setFormState('idle');
    setWhatsappLink('');
    setErrorMessage('');
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

              <p className="text-charcoal/60 font-sans font-light leading-relaxed text-sm max-w-xs">
                Where expert dermatology meets the art of aesthetic refinement. Let us craft a journey unique to your skin.
              </p>
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
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600 mb-4">
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-display text-charcoal mb-2">Request Received!</h3>
                    <p className="text-charcoal/60 text-sm font-light mb-6">
                      Your details have been saved. Send us a WhatsApp message for instant confirmation.
                    </p>
                    
                    {/* WhatsApp CTA Button */}
                    <a 
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 px-8 py-4 bg-[#25D366] text-white rounded-xl font-medium hover:bg-[#20BD5A] transition-all duration-300 shadow-lg shadow-green-500/20 hover:shadow-green-500/30 hover:scale-[1.02]"
                    >
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      Send WhatsApp Message
                    </a>

                    <p className="text-charcoal/40 text-xs mt-4">
                      We&apos;ll also reach out to you via email/phone shortly.
                    </p>
                    
                    <button 
                      onClick={resetForm}
                      className="text-maroon text-[10px] uppercase tracking-widest mt-6 hover:opacity-70 transition-opacity underline underline-offset-4"
                    >
                      Submit another request
                    </button>
                  </motion.div>
                ) : formState === 'error' ? (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto text-red-600 mb-4">
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-display text-charcoal mb-2">Oops! Something went wrong</h3>
                    <p className="text-charcoal/60 text-sm font-light mb-4">
                      {errorMessage}
                    </p>
                    <p className="text-charcoal/50 text-xs mb-6">
                      You can also reach us directly on WhatsApp or call us.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <a 
                        href="https://wa.me/919380551547?text=Hi%2C%20I%20would%20like%20to%20book%20a%20consultation%20at%20Pragna%20Skin%20Clinic."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] text-white rounded-xl font-medium hover:bg-[#20BD5A] transition-all duration-300"
                      >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                        WhatsApp Us
                      </a>
                      <button 
                        onClick={resetForm}
                        className="px-6 py-3 border border-charcoal/20 text-charcoal rounded-xl font-medium hover:bg-charcoal/5 transition-all duration-300"
                      >
                        Try Again
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit} 
                    className="space-y-4"
                  >
                    <div className="space-y-3">
                      {/* Name Field */}
                      <div className="group">
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-white border border-charcoal/15 rounded-xl px-4 py-3.5 text-base text-charcoal focus:border-maroon focus:ring-2 focus:ring-maroon/20 focus:outline-none transition-all duration-300 placeholder:text-charcoal/40 font-light shadow-sm"
                          placeholder="Your Name" 
                        />
                      </div>
                      
                      {/* Email Field */}
                      <div className="group">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-white border border-charcoal/15 rounded-xl px-4 py-3.5 text-base text-charcoal focus:border-maroon focus:ring-2 focus:ring-maroon/20 focus:outline-none transition-all duration-300 placeholder:text-charcoal/40 font-light shadow-sm"
                          placeholder="Email Address" 
                        />
                      </div>
                      
                      {/* Phone with Country Code */}
                      <div className="flex gap-2">
                        <div className="relative w-28 shrink-0">
                          <select 
                            name="countryCode"
                            value={formData.countryCode}
                            onChange={handleInputChange}
                            className="w-full bg-white border border-charcoal/15 rounded-xl px-3 py-3.5 text-base text-charcoal focus:border-maroon focus:ring-2 focus:ring-maroon/20 focus:outline-none transition-all duration-300 appearance-none cursor-pointer font-light shadow-sm"
                          >
                            {COUNTRY_CODES.map((country) => (
                              <option key={country.code} value={country.code}>
                                {country.flag} {country.code}
                              </option>
                            ))}
                          </select>
                          <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-charcoal/40">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="flex-1 bg-white border border-charcoal/15 rounded-xl px-4 py-3.5 text-base text-charcoal focus:border-maroon focus:ring-2 focus:ring-maroon/20 focus:outline-none transition-all duration-300 placeholder:text-charcoal/40 font-light shadow-sm"
                          placeholder="Phone Number" 
                        />
                      </div>

                      {/* Branch Selection */}
                      <div className="relative">
                        <select
                          name="branch"
                          value={formData.branch}
                          onChange={handleInputChange}
                          required
                          className={`w-full bg-white border border-charcoal/15 rounded-xl px-4 py-3.5 text-base focus:border-maroon focus:ring-2 focus:ring-maroon/20 focus:outline-none transition-all duration-300 appearance-none cursor-pointer font-light shadow-sm ${
                            formData.branch ? "text-charcoal" : "text-charcoal/40"
                          }`}
                        >
                          {BRANCHES.map((branch) => (
                            <option key={branch.value} value={branch.value} className="text-charcoal">
                              {branch.label}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-charcoal/40">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="group">
                       <textarea
                          name="concerns"
                          value={formData.concerns}
                          onChange={handleInputChange}
                          rows={2}
                          className="w-full bg-white border border-charcoal/15 rounded-xl px-4 py-3.5 text-base text-charcoal focus:border-maroon focus:ring-2 focus:ring-maroon/20 focus:outline-none transition-all duration-300 placeholder:text-charcoal/40 font-light resize-none shadow-sm"
                          placeholder="Any specific concerns? (Optional)" 
                        />
                    </div>
                      
                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={formState === 'submitting'}
                        className="w-full bg-maroon text-cream py-4 rounded-xl text-sm font-sans font-medium uppercase tracking-[0.15em] hover:bg-maroon-dark transition-all duration-500 shadow-lg shadow-maroon/20 disabled:opacity-70 disabled:cursor-not-allowed group relative overflow-hidden"
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          {formState === 'submitting' ? (
                            <>
                              <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Sending Request...
                            </>
                          ) : (
                            <>
                              Book Appointment
                              <span className="w-3 h-[1px] bg-cream/50 group-hover:w-5 transition-all duration-300" />
                            </>
                          )}
                        </span>
                      </button>
                    </div>

                    <p className="text-center text-charcoal/40 text-[10px] pt-2">
                      By submitting, you agree to receive communication from Pragna Skin Clinic
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
