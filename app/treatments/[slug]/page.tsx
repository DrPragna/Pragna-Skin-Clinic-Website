import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/sections/Footer';
import { navigationData } from '@/lib/navigationData';

export function generateStaticParams() {
  const params: { slug: string | undefined }[] = [];
  for (const pillar of navigationData.treatments) {
    for (const category of pillar.categories) {
      for (const item of category.items) {
        params.push({ slug: item.href.split('/').pop() });
      }
    }
  }
  return params;
}

// Content Data for Active Acne Treatment
const activeAcneContent = {
  hero: {
    title: "Active Acne Treatment",
    summary: "A personalised, dermatologist-led plan to calm active breakouts, reduce inflammation, and prevent new acne from forming."
  },
  isForYou: [
    "You keep getting new pimples or painful cysts even after trying multiple products on your own.",
    "Your acne flares around your periods, stress, workouts, or certain foods and nothing seems consistent.",
    "You’re starting to notice marks or small dents after pimples heal and want to stop things before they turn into scars.",
    "You’ve had enough of random creams and facials and want a medically supervised, step-by-step plan."
  ],
  whatIs: {
    description: [
      "Active Acne Treatment at Pragna is not a single procedure, but a customised plan created by our dermatologists after examining your skin, triggers, and medical history.",
      "Depending on your acne type and severity, we combine prescription skincare, oral medications when needed, in-clinic procedures like chemical peels or medical facials, and device-based treatments such as blue-light or laser therapies. The goal is to calm inflammation, clear existing lesions, and reduce future breakouts in a safe, controlled way."
    ],
    helpsWith: [
      "Whiteheads and blackheads",
      "Red, inflamed pimples and papules",
      "Deep, painful or cystic acne on the face, back, or chest",
      "Breakouts linked to hormones, PCOS, stress, or lifestyle",
      "Frequent flare-ups that haven’t responded to over-the-counter products"
    ]
  },
  howWeTreat: [
    {
      title: "Dermatologist Consultation & Medical Plan",
      text: "We begin with a detailed consultation where we assess your acne pattern, skin type, and possible triggers such as hormones, medications, or lifestyle. Based on this, we design a personalised plan that may include prescription creams and gels, antibiotics or hormonal tablets (if required), and a simple skincare routine you can actually follow."
    },
    {
      title: "In-Clinic Procedures for Faster Control",
      text: "To speed up results, we often add in-clinic procedures like salicylic or mandelic chemical peels, acne-focused medifacials, carbon laser peels, or blue-light therapy. These treatments help unclog pores, reduce oil production, target acne-causing bacteria, and improve texture with minimal downtime."
    },
    {
      title: "Skin-Care & Lifestyle Guidance",
      text: "Alongside procedures, we guide you on the right cleansers, moisturisers, and sunscreens to use during treatment. We also discuss diet, exercise, makeup habits, and other factors that may be aggravating your acne so you understand how to support your skin at home."
    }
  ],
  expect: {
    steps: [
      {
        title: "Consultation & Skin Analysis",
        text: "At your first visit, we examine your skin closely, discuss your concerns, and review any previous treatments you’ve tried. Photographs may be taken so you can track progress over time."
      },
      {
        title: "Your Personalised Treatment Plan",
        text: "We start you on a tailored combination of skincare, medications (if needed), and in-clinic sessions. Procedures like peels, facials, or blue-light are usually spaced every 2–4 weeks depending on your skin’s tolerance and response."
      },
      {
        title: "Follow-ups & Maintenance",
        text: "You’ll have regular follow-ups where we adjust doses, change products, or add procedures as your skin improves. Once breakouts are under control, we shift focus towards maintenance and, if required, specialised treatments for acne scars and marks."
      }
    ],
    downtime: [
      "Most active-acne treatments have little to no downtime. After certain peels or when starting prescription creams, you may notice mild redness, dryness, or peeling for a few days—this is usually expected and temporary.",
      "We’ll give you clear instructions on moisturising, sun protection, and what to avoid (like harsh scrubs or picking) so your skin heals smoothly. Always follow your dermatologist’s advice and contact us if you notice anything unexpected."
    ]
  },
  whyPragna: [
    {
      title: "Dermatologist-Led Care",
      text: "Your plan is designed and monitored by qualified dermatologists who specialise in acne and acne scars, not generic salon therapists."
    },
    {
      title: "Advanced, Customisable Options",
      text: "From medical-grade peels and medifacials to blue-light and laser-based therapies, we have a wide range of options to customise your treatment instead of forcing one “standard” procedure on everyone."
    },
    {
      title: "Long-Term, Holistic Approach",
      text: "We don’t stop at clearing a few pimples. Our focus is on long-term control, prevention of new breakouts, and protecting you from future scars by addressing both the skin and the underlying triggers."
    }
  ],
  faq: [
    {
      q: "How long will it take to see results?",
      a: "This depends on how severe your acne is and how your skin responds. Many people notice calmer skin and fewer new pimples within a few weeks. For moderate to severe acne, significant improvement usually takes around 8–12 weeks of consistent treatment."
    },
    {
      q: "Will I definitely need oral medications?",
      a: "Not everyone does. Some people improve well with prescription creams and in-clinic procedures alone. Others, especially those with widespread or hormonal acne, may benefit from tablets. Your dermatologist will explain all options and recommend what is safest and most effective for you."
    },
    {
      q: "Are the procedures painful?",
      a: "Most treatments are very tolerable. Chemical peels may cause a mild tingling or warmth for a few minutes. Blue-light and laser-based treatments can feel like brief snaps on the skin. If needed, we use numbing creams or cooling to keep you comfortable."
    },
    {
      q: "Will this treatment remove my old acne scars?",
      a: "Active Acne Treatment is mainly focused on controlling current breakouts and preventing new scars. Once your acne is stable, we can plan dedicated scar-revision procedures such as microneedling, MNRF, fractional lasers, or subcision depending on your scar type."
    },
    {
      q: "Is it safe for sensitive or dark skin?",
      a: "Yes. We customise the strength and type of peels, products, and devices according to your skin type and colour. For very sensitive or darker skin, we start gently and build up slowly while watching your response closely."
    }
  ]
};

export default async function TreatmentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let treatment;
  
  for (const pillar of navigationData.treatments) {
    for (const category of pillar.categories) {
      const found = category.items.find(t => t.href.endsWith(slug));
      if (found) {
        treatment = found;
        break;
      }
    }
    if (treatment) break;
  }

  const isAcne = slug === 'active-acne-treatment';
  
  // Fallback placeholder data
  const content = isAcne ? activeAcneContent : {
    hero: {
      title: treatment?.name || "Treatment Overview",
      summary: "Detailed information about this treatment will be available soon. A personalised, dermatologist-led plan designed for your specific needs."
    },
    isForYou: [
      "You are looking for a safe, effective solution for your concern.",
      "You want a medically supervised treatment plan.",
      "You have tried over-the-counter products without success.",
      "You are looking for long-term results rather than quick fixes."
    ],
    whatIs: {
      description: [
        `This section will explain what ${treatment?.name || 'this treatment'} is in detail. It involves a customised approach tailored to your skin type and condition.`,
        "Our dermatologists use advanced technology and evidence-based protocols to ensure safety and efficacy."
      ],
      helpsWith: [
        "Specific symptom 1",
        "Specific symptom 2",
        "Specific symptom 3",
        "Specific symptom 4"
      ]
    },
    howWeTreat: [
      {
        title: "Comprehensive Assessment",
        text: "We start by analyzing your skin and medical history to understand the root cause of your concern."
      },
      {
        title: "Customized Procedure",
        text: "Using state-of-the-art equipment and techniques, we perform the treatment with precision and care."
      },
      {
        title: "Post-Treatment Guidance",
        text: "We provide detailed aftercare instructions and lifestyle advice to maintain and enhance your results."
      }
    ],
    expect: {
      steps: [
        {
          title: "Consultation",
          text: "A thorough discussion of your goals and a physical examination of the area to be treated."
        },
        {
          title: "The Procedure",
          text: "The treatment is performed in a comfortable, sterile environment by trained professionals."
        },
        {
          title: "Follow-up",
          text: "Scheduled visits to monitor your progress and adjust the plan as needed for optimal outcomes."
        }
      ],
      downtime: [
        "Recovery time varies by individual and treatment intensity. Your doctor will provide specific details during your consultation.",
        "Generally, we aim for minimal downtime so you can return to your daily activities as soon as possible."
      ]
    },
    whyPragna: [
      {
        title: "Expert Team",
        text: "Our treatments are performed by qualified dermatologists with extensive experience."
      },
      {
        title: "Advanced Technology",
        text: "We invest in the latest, US-FDA approved technologies for superior safety and results."
      },
      {
        title: "Patient-Centric Care",
        text: "Your comfort and satisfaction are our top priorities throughout your treatment journey."
      }
    ],
    faq: [
      {
        q: "How many sessions will I need?",
        a: "The number of sessions depends on the severity of the condition and your individual response to treatment. We will provide an estimate during your consultation."
      },
      {
        q: "Is the treatment painful?",
        a: "Most treatments involve minimal discomfort. We take every measure to ensure your experience is as comfortable as possible."
      },
      {
        q: "Are the results permanent?",
        a: "Many results are long-lasting, but maintenance sessions may be recommended for certain conditions. We will discuss realistic expectations with you."
      },
      {
        q: "Is it safe?",
        a: "Yes, all our procedures are safe when performed by our trained medical professionals using approved protocols."
      }
    ]
  };

  return (
    <main className="overflow-x-hidden bg-beige-warm">
      <Navbar />

      {/* 1. Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-terracotta relative overflow-hidden">
        <div className="section-container relative z-10">
          <div className="max-w-4xl">
             <span className="text-maroon font-medium uppercase tracking-wider text-sm mb-4 block">
              TREATMENT OVERVIEW
            </span>
            <h1 className="text-4xl md:text-6xl font-display text-charcoal mb-6 leading-tight">
              {content.hero.title}
            </h1>
            <p className="text-xl md:text-2xl text-charcoal/70 font-light leading-relaxed max-w-2xl mb-8">
              {content.hero.summary}
            </p>
            <a href="#book" className="btn-primary inline-block">
              Book a Consultation
            </a>
          </div>
        </div>
        {/* Decorative Background Element */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white/10 rounded-l-full blur-3xl transform translate-x-1/4"></div>
      </section>

      {/* 2. Is this for you? Section */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif text-maroon mb-8 text-center">Is this for you?</h2>
            <div className="bg-beige-warm rounded-2xl p-8 md:p-10 shadow-soft">
              <ul className="space-y-4">
                {content.isForYou.map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-maroon/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-3 h-3 text-maroon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-charcoal/80 text-lg">
                      {item}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Two-column explanation Section */}
      <section className="section-padding bg-beige-warm">
        <div className="section-container">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* What is it */}
            <div className="space-y-6">
              <h2 className="text-3xl font-serif text-charcoal">What is {content.hero.title}?</h2>
              <div className="prose prose-lg text-charcoal/70 space-y-4">
                {content.whatIs.description.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
            
             {/* What does it help with */}
            <div className="bg-white rounded-2xl p-8 shadow-card space-y-6">
               <h3 className="text-2xl font-serif text-maroon">What does it help with?</h3>
               <ul className="space-y-3 pl-4 list-disc text-charcoal/70 marker:text-maroon">
                 {content.whatIs.helpsWith.map((item, i) => (
                   <li key={i}>{item}</li>
                 ))}
               </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. How we treat you at Pragna */}
      <section className="section-padding bg-maroon text-beige-warm relative overflow-hidden">
        <div className="section-container relative z-10">
           <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-serif mb-6">How we treat you at Pragna</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {content.howWeTreat.map((card, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl hover:bg-white/10 transition-colors">
                <h3 className="text-xl font-serif mb-3 text-terracotta-light">{card.title}</h3>
                <p className="text-beige-warm/80 leading-relaxed">
                  {card.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. What to expect */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5 order-2 lg:order-1">
               <div className="w-full aspect-[4/5] bg-terracotta/20 rounded-2xl flex items-center justify-center sticky top-32">
                 <p className="text-maroon/50 italic">Add photo/Add image: Treatment in progress</p>
               </div>
            </div>
            <div className="lg:col-span-7 space-y-8 order-1 lg:order-2">
              <h2 className="text-3xl font-serif text-charcoal">What to expect</h2>
              
              <div className="space-y-8">
                {content.expect.steps.map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-12 h-12 bg-beige-warm rounded-full flex items-center justify-center text-maroon font-serif text-xl font-bold flex-shrink-0 border border-maroon/10">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="text-xl font-medium text-charcoal mb-2">{step.title}</h4>
                      <p className="text-charcoal/70 leading-relaxed">{step.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-beige-warm p-8 rounded-xl border border-maroon/10 mt-8">
                <h4 className="font-serif text-xl text-maroon mb-3">Downtime & Aftercare</h4>
                <div className="space-y-4 text-charcoal/70">
                  {content.expect.downtime.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Why Choose Pragna & 7. FAQ */}
      <section className="section-padding bg-beige-warm">
        <div className="section-container">
           {/* Why Choose Pragna */}
           <div className="max-w-4xl mx-auto text-center mb-20">
             <h2 className="text-3xl md:text-4xl font-serif text-charcoal mb-12">Why choose Pragna for {content.hero.title}?</h2>
             <div className="grid md:grid-cols-3 gap-8 text-left">
               {content.whyPragna.map((pillar, i) => (
                 <div key={i} className="space-y-3 bg-white p-6 rounded-xl shadow-sm border border-maroon/5 h-full">
                   <h4 className="text-maroon font-medium text-lg font-serif">{pillar.title}</h4>
                   <p className="text-charcoal/70 text-sm leading-relaxed">{pillar.text}</p>
                 </div>
               ))}
             </div>
           </div>

           {/* FAQs */}
           <div className="max-w-3xl mx-auto">
             <h3 className="text-2xl md:text-3xl font-serif text-charcoal mb-8 text-center">Frequently Asked Questions</h3>
             <div className="space-y-4">
               {content.faq.map((item, i) => (
                 <details key={i} className="group bg-white rounded-xl shadow-sm overflow-hidden border border-maroon/5">
                   <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-beige/50 transition-colors">
                     <span className="font-medium text-charcoal pr-4">{item.q}</span>
                     <svg className="w-5 h-5 text-maroon transition-transform duration-300 group-open:rotate-180 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                     </svg>
                   </summary>
                   <div className="px-5 pb-5 pt-0 text-charcoal/70 leading-relaxed">
                     <p>{item.a}</p>
                   </div>
                 </details>
               ))}
             </div>
           </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
