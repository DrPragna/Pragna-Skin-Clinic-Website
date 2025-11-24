import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/sections/Footer';
import { navigationData } from '@/lib/navigationData';

export function generateStaticParams() {
  const params: { slug: string | undefined }[] = [];
  for (const group of navigationData.conditions) {
    for (const item of group.items) {
      params.push({ slug: item.href.split('/').pop() });
    }
  }
  return params;
}

// Content for Acne & Breakouts
const acneBreakoutsContent = {
  hero: {
    label: "Condition overview",
    title: "Acne & Breakouts",
    subtitle: "Pimples, whiteheads or cystic acne that keep coming back — treated with science, not guesswork."
  },
  isYou: [
    "You keep getting new pimples just as the old ones are healing.",
    "Your skin flares up around your period, stress, or certain foods.",
    "You’ve tried over-the-counter creams but nothing seems to work for long.",
    "You’re worried existing breakouts will leave marks or scars.",
    "Acne is starting to affect your confidence at work, college, or in photos."
  ],
  whatIs: [
    "Acne happens when tiny openings in the skin (pores) get clogged with oil, dead skin cells and bacteria. This can lead to whiteheads, blackheads, red bumps, painful cysts and occasional pus-filled lesions.",
    "It is common in teenagers but increasingly affects adults as well. The pattern and severity of your breakouts can be very different from someone else’s, which is why copy-paste routines or random products from social media rarely work. At Pragna, we first understand *what kind* of acne you have and *why* it is happening, then plan treatment accordingly."
  ],
  whyHappens: {
    intro: "Several factors can trigger or worsen acne. We look at all of these before deciding your plan:",
    list: [
      "Hormonal changes – especially around puberty, PCOS, pre-menopause or certain contraceptive pills.",
      "Excess oil production and clogged pores from genetics or incorrect skin care.",
      "Bacteria in the follicles, leading to inflammation and painful red bumps.",
      "Lifestyle triggers such as stress, lack of sleep and high-glycaemic diets.",
      "Medications like steroids, some anti-epileptics and others can also play a role.",
      "We also screen for underlying health issues (like PCOS) when needed, so we’re treating the root cause, not just the surface."
    ]
  },
  howTreat: {
    intro: "There is no one “best acne treatment” — the right plan is usually a smart combination of medical treatment, clinic procedures and a simple, sustainable skin-care routine. Your dermatologist will design this based on your skin type, acne severity and lifestyle.",
    cards: [
      {
        title: "Dermatologist-led medical treatment",
        body: "We start with a detailed consultation to understand your triggers, medical history and current products. Based on this, we may prescribe a mix of topical creams, gels and sometimes oral medication to calm inflammation, clear clogged pores and prevent new lesions. We also set up a simple daily routine with the right cleanser, moisturizer and sunscreen for acne-prone skin."
      },
      {
        title: "Targeted peels & acne facials",
        body: "To speed up results, we often add in-clinic procedures such as salicylic acid or other chemical peels, Hydrafacial, medical-grade facials and deep-cleansing treatments. These help unclog pores, reduce oiliness, dry out active lesions and brighten post-inflammatory marks, with minimal downtime."
      },
      {
        title: "Light & laser-based therapies",
        body: "For stubborn or frequently recurring acne, we may use blue-light therapy and carbon laser peels to reduce acne-causing bacteria and oil activity, calm redness and improve overall skin texture. These technologies are carefully selected and customised to your skin tone and sensitivity."
      }
    ]
  },
  expect: {
    steps: [
      {
        title: "Consultation & Analysis",
        text: "Your first visit includes a detailed consultation, skin examination and, if needed, questions about your periods, medications and lifestyle. This helps us identify the *type* of acne you have (comedonal, inflammatory, cystic, hormonal, etc.) and any underlying medical triggers."
      },
      {
        title: "Personalised plan",
        text: "We design a plan that fits your skin and schedule — usually a mix of home-care products, medication where required, and clinic procedures spaced a few weeks apart. You’ll know exactly what to use, when to come in, and what results to expect at each stage."
      },
      {
        title: "Treatment & results",
        text: "Most people start noticing calmer, fewer breakouts within a few weeks. Deeper improvement, especially for long-standing or severe acne, typically takes around three months of consistent treatment. We adjust the plan as your skin improves so that results are long-term, not temporary."
      }
    ],
    downtime: "Most active-acne procedures have minimal downtime. You may experience mild redness or dryness for a day or two after peels or light-based treatments. We’ll give you clear aftercare instructions, including gentle products and strict sun protection, so your skin heals quickly and comfortably."
  },
  whyPragna: [
    {
      title: "Dermatologist-led, not trial-and-error",
      text: "All acne plans are designed and supervised by qualified dermatologists — not technicians — so you’re getting evidence-based treatment instead of random product trials."
    },
    {
      title: "Advanced technology with medical insight",
      text: "From medical-grade peels and Hydrafacial to blue-light therapy, lasers and microneedling, we combine global-standard technology with careful diagnosis to choose what *actually* suits your skin."
    },
    {
      title: "Holistic, root-cause approach",
      text: "We don’t just chase individual pimples. When needed, we screen for hormonal and medication-related triggers, work alongside your other doctors and help you build habits that keep your skin clearer in the long run."
    }
  ],
  faq: [
    {
      q: "How long will it take for my acne to improve?",
      a: "You may notice calmer, fewer breakouts within a few weeks of starting treatment. For moderate to severe acne, meaningful, stable improvement usually takes around three months of consistent treatment because acne forms deep inside the skin before it appears on the surface."
    },
    {
      q: "Will I definitely need oral medication?",
      a: "Not always. Mild acne may respond well to the right cleansers, moisturisers and topical creams alone. We consider oral medicines only when necessary — for example, in more severe, widespread or hormonally driven acne — and always after discussing benefits and possible side-effects with you."
    },
    {
      q: "Can acne be treated if I have sensitive skin?",
      a: "Yes. We adjust the strength and frequency of peels, facials and active ingredients to suit your skin’s tolerance. Sensitive or reactive skin often does better with slower, gentler layering of treatments rather than aggressive quick fixes."
    },
    {
      q: "Will my acne leave scars? Can you help with that?",
      a: "Active acne can leave dark marks and textural scars if not treated early or if lesions are picked. Our first goal is always to calm active breakouts. If scars are already present, we can plan dedicated scar-revision procedures such as microneedling, MNRF, fractional lasers, subcision or Dermapen in a later phase to improve texture once the acne is under control."
    },
    {
      q: "What can I do at home to support my treatment?",
      a: "Stick to the products and routine prescribed for you, avoid picking or squeezing pimples, use non-comedogenic makeup, manage stress and follow strict sun protection. Small, consistent habits make a big difference to how well your in-clinic treatments work."
    }
  ]
};

export default async function ConditionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let condition;

  for (const group of navigationData.conditions) {
    const found = group.items.find(c => c.href.endsWith(slug));
    if (found) {
      condition = found;
      break;
    }
  }

  const isAcneBreakouts = slug === 'acne-breakouts';
  
  // Placeholder content for other conditions
  const placeholderContent = {
    hero: {
      label: "Condition Overview",
      title: condition?.name || 'Condition',
      subtitle: condition?.subtitle || 'Detailed information about this condition will be available soon.'
    },
    isYou: [1, 2, 3].map(i => `Common symptom or feeling ${i} related to ${condition?.name}...`),
    whatIs: [
      "Short explanation of the condition in plain English. Describe what the patient sees/feels, not just the medical definition.",
      "It affects the skin by..."
    ],
    whyHappens: {
      intro: "Brief, patient-friendly explanation of common causes or contributing factors:",
      list: ["Hormonal changes", "Environmental factors", "Lifestyle and diet", "Genetics"]
    },
    howTreat: {
      intro: "We use a combination of advanced technology and medical expertise to create a personalized treatment plan.",
      cards: [1, 2, 3].map(i => ({
        title: `Treatment Option ${i}`,
        body: "Specific laser or procedure description. How it helps reduce the symptoms effectively."
      }))
    },
    expect: {
      steps: [
        { title: "Consultation & Analysis", text: "In-depth skin analysis to understand the severity and underlying causes." },
        { title: "Personalized Plan", text: "Custom protocol designed for your specific skin type and lifestyle." },
        { title: "Treatment & Results", text: "Sessions typically take 30-60 mins. Visible improvements often seen after 2-3 sessions." }
      ],
      downtime: "Most treatments have minimal to zero downtime. You can return to work immediately. Sun protection is mandatory."
    },
    whyPragna: [
      { title: "Dermatologist-Led", text: "All treatments are supervised by experienced medical professionals." },
      { title: "US-FDA Approved", text: "We use only the safest, gold-standard technology globally." },
      { title: "Holistic Approach", text: "Addressing internal health and external symptoms together." }
    ],
    faq: [1, 2].map(i => ({
      q: `Common question about ${condition?.name}?`,
      a: "Answer explaining the details simply and clearly to the patient."
    }))
  };

  const content = isAcneBreakouts ? acneBreakoutsContent : placeholderContent;

  return (
    <main className="overflow-x-hidden bg-beige-warm">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-terracotta relative overflow-hidden">
        <div className="section-container relative z-10">
          <div className="max-w-4xl">
             <span className="text-maroon font-medium uppercase tracking-wider text-sm mb-4 block">
              {content.hero.label}
            </span>
            <h1 className="text-4xl md:text-6xl font-display text-charcoal mb-6 leading-tight">
              {content.hero.title}
            </h1>
            <p className="text-xl md:text-2xl text-charcoal/70 font-light leading-relaxed max-w-2xl mb-8">
              {content.hero.subtitle}
            </p>
            <a href="#book" className="btn-primary inline-block">
              Book a consultation
            </a>
          </div>
        </div>
        {/* Decorative Background Element */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white/10 rounded-l-full blur-3xl transform translate-x-1/4"></div>
      </section>

      {/* Is this you? Section */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif text-maroon mb-8 text-center">Is this you?</h2>
            <div className="bg-beige-warm rounded-2xl p-8 md:p-10 shadow-soft">
              <ul className="space-y-4">
                {content.isYou.map((item, i) => (
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

      {/* What is it & Why it happens Grid */}
      <section className="section-padding bg-beige-warm">
        <div className="section-container">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* What is it */}
            <div className="space-y-6">
              <h2 className="text-3xl font-serif text-charcoal">What is {content.hero.title}?</h2>
              <div className="prose prose-lg text-charcoal/70 space-y-4">
                {content.whatIs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
            
             {/* Why it happens */}
            <div className="bg-white rounded-2xl p-8 shadow-card space-y-6">
               <h3 className="text-2xl font-serif text-maroon">Why does it happen?</h3>
               <p className="text-charcoal/70">
                 {content.whyHappens.intro}
               </p>
               <ul className="space-y-3 pl-4 list-disc text-charcoal/70 marker:text-maroon">
                 {content.whyHappens.list.map((item, i) => (
                   <li key={i}>{item}</li>
                 ))}
               </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How we treat it */}
      <section className="section-padding bg-maroon text-beige-warm relative overflow-hidden">
        <div className="section-container relative z-10">
           <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-serif mb-6">How we treat {content.hero.title} at Pragna</h2>
            <p className="text-beige-warm/80 text-lg">
              {content.howTreat.intro}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {content.howTreat.cards.map((card, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl hover:bg-white/10 transition-colors">
                <h3 className="text-xl font-serif mb-3 text-terracotta-light">{card.title}</h3>
                <p className="text-beige-warm/80 leading-relaxed">
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What to expect */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
               <div className="w-full aspect-[4/5] bg-terracotta/20 rounded-2xl flex items-center justify-center sticky top-32">
                 <p className="text-maroon/50 italic">Add photo/Add image: Doctor consultation or treatment</p>
               </div>
            </div>
            <div className="lg:col-span-7 space-y-8">
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
                <p className="text-charcoal/70 leading-relaxed">
                  {content.expect.downtime}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Pragna & FAQ */}
      <section className="section-padding bg-beige-warm">
        <div className="section-container">
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
