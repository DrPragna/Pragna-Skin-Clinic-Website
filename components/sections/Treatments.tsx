'use client';

import { useState } from 'react';

export default function Treatments() {
  const [activeTab, setActiveTab] = useState('skin');

  const treatments = {
    skin: {
      title: 'Skin Treatments',
      description:
        'From daily-care routines to advanced laser and injectable procedures, our skin treatments are designed to improve texture, tone, clarity, and overall skin health.',
      list: [
        'Personalized skin care routine',
        'Laser toning',
        'Carbon laser peel',
        'Chemical peels',
        'PRP and GFC Vampire facial',
        'Laser hair reduction',
        'Intense Pulsed Light (IPL)',
        'Fractional Erbium Glass Laser',
        'Fractional CO2 Laser',
        'Skin boosters',
        'Medifacials',
        'Subcision',
        'HIFU',
        'Profhilo',
        'Radiofrequency Skin Tightening',
        'Dermal Fillers',
        'Botox',
        'Mesotherapy',
        'Thread lift',
        'Dermapen',
        'MNRF',
      ],
    },
    hair: {
      title: 'Hair Treatments',
      description:
        'We address hair fall, thinning, and scalp concerns with targeted therapies that support hair density and scalp health.',
      list: [
        'Low level light therapy (LLLT)',
        'GFC/PRP',
        'Mesotherapy',
        'PRF',
        'Exosomes',
      ],
    },
    body: {
      title: 'Body Treatments',
      description:
        'Body contouring, skin tightening, and rejuvenation solutions that focus on comfort, safety, and natural-looking outcomes.',
      list: [
        'Laser hair reduction',
        'Laser toning',
        'Chemical peels',
        'Cryolipolysis',
        'Radiofrequency skin tightening',
        'Morpheus 8',
        'Shockwave therapy',
        'Electromagnetic muscle stimulation',
        'Hand rejuvenation',
        'Decollete rejuvenation',
      ],
    },
    wellness: {
      title: 'Wellness Treatments',
      description:
        'Support your skin and body from within with wellness treatments that complement your in-clinic procedures.',
      list: [
        'IV drips',
        'Medifacials',
        'Electromagnetic muscle stimulation',
        'Mommy Makeover',
      ],
    },
  };

  const tabs = [
    { id: 'skin', label: 'Skin' },
    { id: 'hair', label: 'Hair' },
    { id: 'body', label: 'Body' },
    { id: 'wellness', label: 'Wellness' },
  ];

  return (
    <section id="treatments" className="section-padding bg-beige">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-display font-normal text-charcoal">
            Treatments <span className="italic">we offer</span>
          </h2>
          <p className="text-lg text-charcoal/70">
            Every treatment at Pragna is dermatologist-led, evidence-based, and customized. 
            Explore our full range of skin, hair, body, and wellness solutions.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-beige-warm rounded-full p-2 gap-2 border border-maroon/10">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 relative ${
                  activeTab === tab.id
                    ? 'bg-maroon text-beige-warm shadow-soft'
                    : 'text-charcoal/70 hover:text-maroon'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="max-w-5xl mx-auto">
          <div className="card animate-fade-in">
            <div className="space-y-6">
              <div className="space-y-3">
                <h3 className="text-3xl font-serif font-semibold text-maroon">
                  {treatments[activeTab as keyof typeof treatments].title}
                </h3>
                <p className="text-charcoal/70 text-lg leading-relaxed">
                  {treatments[activeTab as keyof typeof treatments].description}
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 pt-4">
                {treatments[activeTab as keyof typeof treatments].list.map(
                  (treatment, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-3 rounded-xl hover:bg-terracotta/20 transition-colors"
                    >
                      <div className="w-2 h-2 bg-dust-red rounded-full flex-shrink-0"></div>
                      <span className="text-charcoal/80 text-sm">
                        {treatment}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

