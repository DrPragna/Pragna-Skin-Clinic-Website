'use client';

import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: '',
  });

  const services = [
    'Acne Treatment',
    'Acne Scars Treatment',
    'Laser Hair Reduction',
    'Botox',
    'Fillers',
    'Anti Ageing Treatment',
    'Body Contouring',
    'PRP Hair Treatment',
    'PRP Skin Treatment',
    'Hair Loss Treatment',
    'Pigmentation Treatment',
    'Melasma Treatment',
    'Dark Circles Treatment',
    'Hydra Facial',
    'Warts and Moles Removal',
    'Skin Care',
    'Other Skin Treatment',
    'Other Hair Treatment',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic here
    console.log('Form submitted:', formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="section-padding gradient-terracotta">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-charcoal">
            We're here to help
          </h2>
          <p className="text-lg text-charcoal/70">
            Whether you're dealing with a specific concern or simply want expert guidance on caring 
            for your skin and hair, our team is ready to support you.
          </p>
          <h3 className="text-2xl font-serif font-semibold text-maroon pt-4">
            Book your appointment today
          </h3>
        </div>

        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="card">
            <div className="space-y-6">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-charcoal mb-2"
                >
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-beige-warm border-2 border-transparent focus:border-maroon focus:outline-none transition-colors"
                  placeholder="Your full name"
                />
              </div>

              {/* Phone & Email */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-charcoal mb-2"
                  >
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-beige-warm border-2 border-transparent focus:border-maroon focus:outline-none transition-colors"
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-charcoal mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-beige-warm border-2 border-transparent focus:border-maroon focus:outline-none transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              {/* Service */}
              <div>
                <label
                  htmlFor="service"
                  className="block text-sm font-medium text-charcoal mb-2"
                >
                  Service Required *
                </label>
                <select
                  id="service"
                  name="service"
                  required
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-beige-warm border-2 border-transparent focus:border-maroon focus:outline-none transition-colors"
                >
                  <option value="">Select a service</option>
                  {services.map((service, index) => (
                    <option key={index} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-charcoal mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-beige-warm border-2 border-transparent focus:border-maroon focus:outline-none transition-colors resize-none"
                  placeholder="Tell us more about your concerns..."
                />
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn-primary w-full">
                Submit & Book Appointment
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

