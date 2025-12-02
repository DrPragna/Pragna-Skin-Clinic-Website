import { SubTreatmentContent } from "@/lib/navigationData";

export const activeAcneTreatmentContent: SubTreatmentContent = {
  hero: {
    // TITLE: 2-5 words (matches treatment name)
    title: "Active Acne Treatment",
    
    // TAGLINE: 3-6 words, italicized
    tagline: "Calm the breakouts, stop the cycle",
    
    // INTRO: 35-50 words - Sets context, appears with left border accent
    intro:
      "Painful pimples, oiliness and new bumps every week can be exhausting. Active acne treatment focuses on bringing breakouts under control with the right mix of medical therapy, acne-focused clean-ups, peels and light-based treatments — so the cycle of 'new pimple, new mark' finally slows down.",
  },
  
  // QUICK STATS: Exactly 4 items, each 2-5 words
  quickStats: {
    sessions: "4–6 visits over 3–4 months",
    duration: "20–45 mins per session",
    downtime: "Usually none; mild flaking",
    painLevel: "Mild stinging or warmth",
  },
  
  // OVERVIEW: 40-60 words - Appears centered below hero
  overview:
    "We combine prescription medicines — adapalene, benzoyl peroxide, antibiotics or isotretinoin when needed — with in-clinic support: salicylic and azelaic peels, comedone extraction, blue/red light or laser-based acne therapies. This approach targets oil, bacteria, clogged pores and inflammation together, not one at a time.",
  
  // IS THIS FOR YOU: 4-6 items, each 12-18 words
  isThisForYou: [
    "New pimples pop up every week, especially around your period or with stress",
    "Your forehead, cheeks or jawline feel bumpy even without visible big zits",
    "Back or shoulder acne makes you avoid sleeveless or backless outfits",
    "Over-the-counter face washes and creams haven't made a real difference",
    "You're worried every new pimple will become another future scar or mark",
  ],
  
  process: {
    // STEPS: Exactly 3 steps (before, during, after)
    steps: [
      {
        phase: "before",
        // TITLE: 3-5 words
        title: "Acne typing & planning",
        // DESCRIPTION: 40-55 words
        description:
          "We grade your acne, assess oiliness and sensitivity, and review past treatments. Lifestyle factors like PCOS, hormonal issues and current skincare are discussed. A clear plan is created combining medicines, clinic sessions and small habit changes like makeup hygiene and hair product use.",
      },
      {
        phase: "during",
        title: "Clearing and calming",
        description:
          "Clinic visits may include gentle acne facials with steam-free comedone extraction, salicylic or azelaic peels, and light or laser-based therapies. You'll feel brief stinging or warmth. Medicines and skincare are adjusted based on how your skin responds between visits.",
      },
      {
        phase: "after",
        title: "Stabilise and maintain",
        description:
          "As breakouts reduce, we simplify your regimen to what you can realistically maintain. We'll show you how to handle occasional flares without panicking, when to come in for top-up peels, and how to avoid harsh treatments that undo progress.",
      },
    ],
  },
  
  results: {
    // TIMELINE: 35-50 words
    timeline:
      "Most people notice fewer painful new pimples within 4–6 weeks of sticking to the plan. Oiliness and bumpiness usually improve over 2–3 months. Old marks and scars are addressed in the next phase once skin is calmer and new breakouts are rare.",
    
    // RECOVERY: 30-45 words
    recovery:
      "You may experience short phases of purging, dryness or mild flaking as actives start working. These are manageable with moisturisers and dosage adjustments, and rarely need you to stop regular work or college.",
  },
  
  // FAQS: 4-6 questions
  faqs: [
    {
      // QUESTION: 6-12 words
      question: "Will my acne get worse before it gets better?",
      // ANSWER: 35-55 words
      answer:
        "Sometimes, yes. When we start active treatments and retinoids, clogged pores that were already forming can surface together. This 'purging' phase is temporary and usually settles within a few weeks. We'll tell you what's normal and when to check in sooner.",
    },
    {
      question: "Do I have to take isotretinoin for severe acne?",
      answer:
        "Not always. Isotretinoin is one option for stubborn, cystic acne but not the only one. We'll discuss benefits, side effects, blood tests and safer alternatives. If we do use it, it's with close monitoring and clear guidelines.",
    },
    {
      question: "Can I continue wearing makeup during treatment?",
      answer:
        "Yes, but products need to be non-comedogenic and removed thoroughly. We'll help you pick safer formulas and teach you a quick routine so you're not sleeping with residue on your skin.",
    },
    {
      question: "Will squeezing pimples really cause scars?",
      answer:
        "Unfortunately, yes. Picking increases inflammation and infection risk, often leading to deeper scars or darker marks. Part of treatment is giving you better ways to manage painful pimples so you don't feel tempted to pick.",
    },
    {
      question: "How long do I need to stay on acne medicines?",
      answer:
        "Active treatment typically runs for a few months. After that, we shift to a lighter maintenance phase with lower-strength medicines and clinic visits spaced further apart, so you're not 'always on treatment'.",
    },
  ],
};
