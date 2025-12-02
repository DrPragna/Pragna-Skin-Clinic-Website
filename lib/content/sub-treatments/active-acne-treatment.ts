import { SubTreatmentContent } from "@/lib/navigationData";

export const activeAcneTreatmentContent: SubTreatmentContent = {
  hero: {
    // TITLE: 2-4 words
    title: "Active Acne Treatment",
    
    // TAGLINE: 3-5 words
    tagline: "Calm the breakouts fast",
    
    // INTRO: 30-40 words
    intro:
      "Painful pimples, oiliness and new bumps every week can be exhausting. This treatment focuses on bringing breakouts under control with medical therapy, peels and light-based treatments — so the cycle finally slows down.",
  },
  
  // QUICK STATS: 3-6 words each
  quickStats: {
    sessions: "4-6 visits over 3-4 months",
    duration: "20-45 mins per session",
    downtime: "Usually none; mild flaking",
    painLevel: "Mild stinging or warmth",
  },
  
  // OVERVIEW: 35-45 words
  overview:
    "We combine prescription medicines — adapalene, benzoyl peroxide, antibiotics or isotretinoin when needed — with in-clinic support: peels, comedone extraction and light therapies. This targets oil, bacteria, clogged pores and inflammation together.",
  
  // IS THIS FOR YOU: 4-5 items, each 10-15 words
  isThisForYou: [
    "New pimples pop up every week, especially around periods or stress",
    "Your forehead, cheeks or jawline feel bumpy even without big zits",
    "Back or shoulder acne makes you avoid sleeveless outfits",
    "Over-the-counter face washes haven't made a real difference",
    "You're worried every new pimple will become a future scar",
  ],
  
  process: {
    // STEPS: 30-40 words each
    steps: [
      {
        phase: "before",
        title: "Acne Typing & Planning",
        description:
          "We grade your acne, assess oiliness and review past treatments. Lifestyle factors like hormones and skincare are discussed. A clear plan is created combining medicines, clinic sessions and habit changes.",
      },
      {
        phase: "during",
        title: "Clearing & Calming Sessions",
        description:
          "Clinic visits include gentle acne facials, comedone extraction, salicylic peels and light therapies. You'll feel brief stinging or warmth. Medicines are adjusted based on how your skin responds.",
      },
      {
        phase: "after",
        title: "Stabilise & Maintain",
        description:
          "As breakouts reduce, we simplify your regimen to what you can maintain. We'll show you how to handle occasional flares and when to come in for top-up peels.",
      },
    ],
  },
  
  results: {
    // TIMELINE: 30-40 words
    timeline:
      "Most people notice fewer painful pimples within 4-6 weeks. Oiliness and bumpiness improve over 2-3 months. Old marks and scars are addressed once skin is calmer and new breakouts are rare.",
    
    // RECOVERY: 25-35 words
    recovery:
      "You may experience short phases of purging or mild flaking as actives start working. These are manageable with moisturisers and rarely need you to stop regular activities.",
  },
  
  // FAQS: 4-5 questions, answers 30-45 words
  faqs: [
    {
      question: "Will my acne get worse before it gets better?",
      answer:
        "Sometimes. When we start retinoids, clogged pores that were forming can surface together. This 'purging' phase is temporary and usually settles within a few weeks.",
    },
    {
      question: "Do I have to take isotretinoin for severe acne?",
      answer:
        "Not always. Isotretinoin is one option for stubborn cystic acne but not the only one. We'll discuss benefits, side effects and alternatives before deciding together.",
    },
    {
      question: "Can I continue wearing makeup during treatment?",
      answer:
        "Yes, but products should be non-comedogenic and removed thoroughly. We'll help you pick safer formulas so you're not sleeping with residue on your skin.",
    },
    {
      question: "Will squeezing pimples really cause scars?",
      answer:
        "Unfortunately, yes. Picking increases inflammation and infection risk, often leading to deeper scars. Part of treatment is giving you better ways to manage painful pimples.",
    },
  ],
};
