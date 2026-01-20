"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * BookingModal Component
 *
 * A reusable modal for booking appointments.
 * Design matches the Contact section on the home page.
 *
 * Usage:
 * - Import useBookingModal hook
 * - Call openBookingModal() to show the modal
 */

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  programName?: string; // Optional: pre-fill program name if booking from a specific program
}

// Form state interface
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

export default function BookingModal({
  isOpen,
  onClose,
  programName = "",
}: BookingModalProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    countryCode: "+91",
    phone: "",
    branch: "",
    concerns: programName ? `Interested in: ${programName}` : "",
  });
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [whatsappLink, setWhatsappLink] = useState("");

  // Update concerns if programName prop changes
  useEffect(() => {
    if (programName) {
      setFormData((prev) => ({
        ...prev,
        concerns: prev.concerns || `Interested in: ${programName}`
      }));
    }
  }, [programName]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setErrorMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.phone) {
      setErrorMessage("Please fill in your name and phone number.");
      return;
    }

    if (!formData.branch) {
      setErrorMessage("Please select a branch.");
      return;
    }

    setFormState("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/book-appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          program: programName,
          source: "booking-modal",
        }),
      });

      const result = await response.json();

      if (result.success) {
        setFormState("success");
        setWhatsappLink(result.whatsappLink);
      } else {
        throw new Error(result.error || "Something went wrong");
      }
    } catch (error) {
      setFormState("error");
      setErrorMessage(error instanceof Error ? error.message : "Failed to submit. Please try again.");
    }
  };

  const resetForm = () => {
    setFormState("idle");
    setFormData({
      name: "",
      email: "",
      countryCode: "+91",
      phone: "",
      branch: "",
      concerns: programName ? `Interested in: ${programName}` : "",
    });
    setWhatsappLink("");
    setErrorMessage("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-md bg-white/95 backdrop-blur-xl rounded-[2rem] shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto scrollbar-hide border border-white/50"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-charcoal/5 flex items-center justify-center text-charcoal/60 hover:text-charcoal hover:bg-charcoal/10 transition-colors"
              aria-label="Close modal"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <AnimatePresence mode="wait">
              {formState === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="p-8 text-center"
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

                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-[#25D366] text-white rounded-xl font-medium hover:bg-[#20BD5A] transition-all duration-300 shadow-lg shadow-green-500/20 hover:shadow-green-500/30 hover:scale-[1.02]"
                  >
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Send WhatsApp Message
                  </a>

                  <p className="text-charcoal/40 text-xs mt-4">
                    We will also reach out to you via email/phone shortly.
                  </p>

                  <button
                    onClick={handleClose}
                    className="text-maroon text-[10px] uppercase tracking-widest mt-6 hover:opacity-70 transition-opacity underline underline-offset-4"
                  >
                    Close
                  </button>
                </motion.div>
              ) : formState === "error" ? (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="p-8 text-center"
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

                  <div className="flex flex-col gap-3">
                    <a
                      href="https://wa.me/919380551547?text=Hi%2C%20I%20would%20like%20to%20book%20a%20consultation%20at%20Pragna%20Skin%20Clinic."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] text-white rounded-xl font-medium hover:bg-[#20BD5A] transition-all duration-300"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
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
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Header */}
                  <div className="p-6 pb-4">
                    <span className="inline-flex items-center gap-2 text-maroon/80 font-sans font-medium tracking-[0.2em] uppercase text-[10px] mb-3 border border-maroon/20 rounded-full px-3 py-1 bg-maroon/5 w-fit">
                      <span className="w-1.5 h-1.5 rounded-full bg-maroon animate-pulse" />
                      Book Consultation
                    </span>
                    <h2 className="text-2xl font-display text-charcoal">
                      Schedule Your Visit
                    </h2>
                    {programName && (
                      <p className="text-charcoal/60 mt-1 text-sm">
                        For: <span className="text-maroon font-medium">{programName}</span>
                      </p>
                    )}
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-3">
                    {/* Name Field */}
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-white border border-charcoal/15 rounded-xl px-4 py-3.5 text-base text-charcoal focus:border-maroon focus:ring-2 focus:ring-maroon/20 focus:outline-none transition-all duration-300 placeholder:text-charcoal/40 font-light shadow-sm"
                      placeholder="Your Name"
                    />

                    {/* Email Field */}
                    <input
                      type="text"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-white border border-charcoal/15 rounded-xl px-4 py-3.5 text-base text-charcoal focus:border-maroon focus:ring-2 focus:ring-maroon/20 focus:outline-none transition-all duration-300 placeholder:text-charcoal/40 font-light shadow-sm"
                      placeholder="Email Address (Optional)"
                    />

                    {/* Phone with Country Code */}
                    <div className="flex gap-2">
                      <div className="relative w-28 shrink-0">
                        <select
                          name="countryCode"
                          value={formData.countryCode}
                          onChange={handleChange}
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
                        onChange={handleChange}
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
                        onChange={handleChange}
                        required
                        className={`w-full bg-white border border-charcoal/15 rounded-xl px-4 py-3.5 text-base focus:border-maroon focus:ring-2 focus:ring-maroon/20 focus:outline-none transition-all duration-300 appearance-none cursor-pointer font-light shadow-sm ${formData.branch ? "text-charcoal" : "text-charcoal/40"
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

                    {/* Concerns */}
                    <textarea
                      name="concerns"
                      value={formData.concerns}
                      onChange={handleChange}
                      rows={2}
                      className="w-full bg-white border border-charcoal/15 rounded-xl px-4 py-3.5 text-base text-charcoal focus:border-maroon focus:ring-2 focus:ring-maroon/20 focus:outline-none transition-all duration-300 placeholder:text-charcoal/40 font-light resize-none shadow-sm"
                      placeholder="Any specific concerns? (Optional)"
                    />

                    {/* Error Message */}
                    {errorMessage && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-600 text-sm bg-red-50 px-4 py-2 rounded-lg"
                      >
                        {errorMessage}
                      </motion.p>
                    )}

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={formState === "submitting"}
                        className="w-full bg-maroon text-cream py-4 rounded-xl text-sm font-sans font-medium uppercase tracking-[0.15em] hover:bg-maroon-dark transition-all duration-500 shadow-lg shadow-maroon/20 disabled:opacity-70 disabled:cursor-not-allowed group relative overflow-hidden"
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          {formState === "submitting" ? (
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

                    <p className="text-center text-charcoal/40 text-[10px] pt-1">
                      By submitting, you agree to receive communication from Pragna Skin Clinic
                    </p>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// ============================================
// BOOKING MODAL CONTEXT & HOOK
// ============================================

import { createContext, useContext, ReactNode } from "react";

interface BookingModalContextType {
  openBookingModal: (programName?: string) => void;
  closeBookingModal: () => void;
  isBookingModalOpen: boolean;
}

const BookingModalContext = createContext<BookingModalContextType | undefined>(
  undefined
);

export function BookingModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [programName, setProgramName] = useState("");

  const openBookingModal = useCallback((program?: string) => {
    setProgramName(program || "");
    setIsOpen(true);
  }, []);

  const closeBookingModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <BookingModalContext.Provider
      value={{
        openBookingModal,
        closeBookingModal,
        isBookingModalOpen: isOpen,
      }}
    >
      {children}
      <BookingModal
        isOpen={isOpen}
        onClose={closeBookingModal}
        programName={programName}
      />
    </BookingModalContext.Provider>
  );
}

export function useBookingModal() {
  const context = useContext(BookingModalContext);
  if (!context) {
    throw new Error(
      "useBookingModal must be used within a BookingModalProvider"
    );
  }
  return context;
}
