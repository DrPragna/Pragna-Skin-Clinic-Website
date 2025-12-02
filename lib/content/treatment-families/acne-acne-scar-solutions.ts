import { TreatmentFamilyContent } from "@/lib/navigationData";

export const acneAcneScarSolutionsContent: TreatmentFamilyContent = {
  hero: {
    // EYEBROW: 3-5 words, uppercase style, separated by bullets
    eyebrow: "SKIN • RESTORE • CONFIDENCE",
    
    // TITLE: 3-6 words (this is the main heading)
    title: "Acne & Acne Scar Solutions",
    
    // SUBTITLE: 4-8 words, italicized tagline
    subtitle: "From breakouts to clear skin",
    
    // INTRO: 40-60 words - This appears below the subtitle, sets the tone
    intro:
      "Whiteheads, painful cysts, marks and scars — acne rarely comes alone. Our treatment family addresses every stage of your journey: calming active breakouts, fading stubborn marks, and resurfacing old scars. The goal is simple — help your skin return to a calmer, smoother, more confident baseline.",
    
    image: "/images/treatments/acne-acne-scar-solutions.jpg",
  },
  
  // TRUST INDICATORS: Exactly 3 items, each with 1-2 word value + 2-4 word label
  trustIndicators: [
    { value: "All stages", label: "Active acne to scars" },
    { value: "Face & body", label: "Acne protocols" },
    { value: "Evidence-led", label: "Meds + procedures" },
  ],
  
  howItWorks: {
    // DESCRIPTION: 35-50 words - Explains the overall approach
    description:
      "Acne has multiple layers — oil, bacteria, hormones, inflammation and healing. We address each one with the right mix of prescription medicines, medical facials, peels, light therapies and scar procedures, rather than relying on creams or procedures alone.",
    
    // STEPS: Exactly 3 steps
    steps: [
      {
        // STEP TITLE: 3-6 words
        title: "Map your acne pattern",
        // STEP TEXT: 35-50 words
        text:
          "We identify your acne type — whiteheads, cysts, nodules — and affected areas. Hormonal triggers, diet, stress and skincare habits are reviewed so we treat not just spots, but the reasons they keep returning.",
        icon: "consultation",
      },
      {
        title: "Control, then correct",
        text:
          "First, we calm active breakouts with oral and topical medicines, specialised clean-ups and peels. Once breakouts are under control, we shift focus to marks and scars with Q-switch toning, MNRF, subcision and fractional lasers.",
        icon: "treatment",
      },
      {
        title: "Maintain and prevent",
        text:
          "We create a sustainable routine — non-comedogenic products, realistic makeup hygiene, flare management and spaced maintenance treatments. This helps you stay ahead of scarring instead of cycling between good and bad phases.",
        icon: "results",
      },
    ],
  },
  
  whoIsThisFor: {
    // HEADLINE: 3-5 words (optional)
    headline: "Ideal for you if...",
    
    // LIST: 4-6 items, each 12-20 words
    list: [
      "You keep getting new breakouts even after multiple creams, facials or home remedies",
      "Red, painful pimples or cysts leave dents or dark marks that won't fade",
      "You have old acne scars — ice pick, boxcar or rolling — visible in photos",
      "Back or chest acne makes you avoid certain clothes or feel self-conscious",
      "You want a structured plan instead of jumping between random solutions",
    ],
  },
  
  // WHY PRAGNA: 3 items
  whyPragna: [
    {
      // TITLE: 4-7 words
      title: "Acne to scars, one plan",
      // DESCRIPTION: 25-40 words
      description:
        "We don't treat active acne and scars as separate problems. Your protocol is planned so that as breakouts calm, we already know how and when to move into mark and scar correction.",
    },
    {
      title: "Medicines plus procedures",
      description:
        "Tablets and creams alone often aren't enough. Procedures without medical control just inflame skin. We deliberately combine both for faster, safer and more stable results.",
    },
    {
      title: "Scar-type specific approach",
      description:
        "Ice pick, boxcar, rolling and hypertrophic scars each respond to different tools. We use the appropriate mix — subcision, TCA CROSS, MNRF, PRP, fractional lasers — instead of one-size-fits-all.",
    },
  ],
  
  relatedConditionSlugs: ["acne-breakouts", "acne-scars"],
};
