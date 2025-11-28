import { SubTreatmentContent } from "@/lib/navigationData";

export const activeAcneTreatmentContent: SubTreatmentContent = {
  hero: {
    title: "Active Acne Treatment",
    tagline: "Calm the breakouts fast",
    intro:
      "Painful pimples, oiliness and new bumps every week can be exhausting. Active acne treatment focuses on bringing breakouts under control with the right mix of medical therapy, acne-focused clean-ups, peels and light-based treatments - so the cycle of 'new pimple, new mark' finally starts to slow down.",
  },
  quickStats: {
    sessions: "4-6 clinic visits over 3-4 months",
    duration: "20-45 mins per session",
    downtime: "Usually none; occasional 1-2 days flaking",
    painLevel: "Mild stinging or warmth",
  },
  overview:
    "We combine prescription medicines (like adapalene, benzoyl peroxide, antibiotics or isotretinoin when needed) with in-clinic support - salicylic/azelaic peels, comedone extraction, blue/red light or laser-based acne therapies. This approach targets oil, bacteria, clogged pores and inflammation together, not one at a time.",
  isThisForYou: [
    "New pimples pop up every week, especially around your period or with stress",
    "Your forehead, cheeks or jawline feel bumpy even when you don't see big zits",
    "Back or shoulder acne leaves you avoiding sleeveless or backless outfits",
    "Over-the-counter face washes and creams haven't made a real difference",
    "You're worried that every new pimple is another future scar or mark",
  ],
  process: {
    steps: [
      {
        phase: "before",
        title: "Acne typing & treatment planning",
        description:
          "We grade your acne, look at oiliness, sensitivity and scarring, and go through your past treatments in detail. Lifestyle, PCOS or other hormonal issues and current skincare are discussed. A clear plan is created combining medicines, clinic sessions and small habit changes like makeup hygiene and hair product use.",
      },
      {
        phase: "during",
        title: "Clearing pores, calming inflammation",
        description:
          "Clinic visits may include gentle acne facials with steam-free comedone extraction, salicylic or azelaic peels, and light or laser-based acne therapies. You'll feel brief stinging or warmth with peels and a warm, prickly or snapping sensation with devices. Medicines and skincare are tweaked based on how your skin responds between visits.",
      },
      {
        phase: "after",
        title: "Stabilising skin & avoiding rebound",
        description:
          "As breakouts come under control, we slowly simplify your regimen to what you can realistically maintain. We'll show you how to handle the occasional breakout without panicking, when to come in for top-up peels and how to avoid harsh home treatments that undo progress.",
      },
    ],
  },
  results: {
    timeline:
      "Most people notice fewer painful new pimples within 4-6 weeks of sticking to the plan. Oiliness and bumpiness usually improve over 2-3 months. Old marks and scars are addressed in the next phase once the skin is calmer and new breakouts are rare.",
    recovery:
      "You may see short phases of purging, dryness or mild flaking as actives start working. These are usually manageable with moisturisers and dosage adjustments and rarely need you to stop regular work or college.",
  },
  faqs: [
    {
      question: "Will my acne get worse before it gets better?",
      answer:
        "Sometimes, yes. When we start active treatments and retinoids, clogged pores that were already forming can surface together. This 'purging' phase is temporary and usually settles within a few weeks. We'll tell you what's normal and when to check in sooner.",
    },
    {
      question: "Do I have to take isotretinoin (Accutane) for severe acne?",
      answer:
        "Not always. Isotretinoin is one option for stubborn, cystic acne but not the only one. We'll discuss benefits, side effects, blood tests and safer alternatives. If we do use it, it's with close monitoring and clear do's and don'ts.",
    },
    {
      question: "Can I continue makeup during acne treatment?",
      answer:
        "Yes, but products need to be non-comedogenic and removed thoroughly. We'll help you pick safer formulas and teach you a quick routine so you're not sleeping with residue on your skin.",
    },
    {
      question: "Will squeezing or popping pimples really cause scars?",
      answer:
        "Unfortunately, yes. Picking increases inflammation and infection risk and often leads to deeper scars or darker marks. Part of treatment is giving you better ways to manage painful pimples so you don't feel tempted to pick.",
    },
    {
      question: "How long do I need to stay on acne medicines?",
      answer:
        "Active treatment typically runs for a few months. After that, we shift to a lighter maintenance phase with lower-strength medicines and clinic visits spaced further apart, so control is maintained without you feeling 'always on treatment'.",
    },
  ],
};
