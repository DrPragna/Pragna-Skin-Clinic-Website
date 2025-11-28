import { TreatmentFamilyContent } from "@/lib/navigationData";

export const acneAcneScarSolutionsContent: TreatmentFamilyContent = {
  hero: {
    eyebrow: "SKIN • RESTORE • CONFIDENCE",
    title: "Acne & Acne Scar Solutions",
    subtitle: "From breakouts to clear skin",
    intro:
      "Whiteheads, painful cysts, marks and scars - acne rarely comes alone. This treatment family is built to handle all stages of the journey, from calming active breakouts to fading leftover marks and resurfacing scars, so your skin slowly returns to a calmer, smoother, more confident baseline.",
    image: "/images/treatments/acne-acne-scar-solutions.jpg",
  },
  trustIndicators: [
    { value: "All stages", label: "Active acne to scars" },
    { value: "Face & body", label: "Acne protocols" },
    { value: "Evidence-led", label: "Combines meds & procedures" },
  ],
  howItWorks: {
    description:
      "Acne has multiple layers - oil, bacteria, hormones, inflammation and healing. We address each one with the right mix of prescription medicines, medical facials, peels, light/laser therapies and scar procedures like MNRF, subcision, PRP and fractional lasers, instead of relying on only creams or only procedures.",
    steps: [
      {
        title: "Map your acne pattern",
        text:
          "We identify whether your acne is mostly whiteheads, blackheads, red bumps, nodules or cysts, and whether it affects the face, back, chest or all. Hormonal triggers, diet, stress and skincare habits are reviewed so we're not just treating spots but also the reasons they keep returning.",
        icon: "consultation",
      },
      {
        title: "Control breakouts, then fix the surface",
        text:
          "The first goal is to calm new pimples with the right combination of oral and topical medicines, specialised acne clean-ups, salicylic or azelaic peels and lifestyle tweaks. Once breakouts are under control, we shift focus to marks and scars with peels, Q-switch toning, MNRF, subcision, PRP and fractional lasers.",
        icon: "treatment",
      },
      {
        title: "Maintain clarity & prevent new scars",
        text:
          "We teach you a sustainable routine - non-comedogenic products, realistic makeup hygiene, flare management and maintenance treatments spaced through the year. This helps you stay ahead of long-term scarring instead of yo-yoing between good and bad phases.",
        icon: "results",
      },
    ],
  },
  whoIsThisFor: {
    headline: "Ideal for you if...",
    list: [
      "You keep getting new breakouts even after multiple creams, facials or home remedies",
      "Red, painful pimples or cysts leave dents or dark marks that don't fade",
      "You have old acne scars - ice pick, boxcar or rolling - that show up in every selfie",
      "Back or chest acne makes you avoid certain clothes or feel conscious at the gym",
      "You want a structured plan instead of jumping between random 'acne solutions'",
    ],
  },
  whyPragna: [
    {
      title: "Acne to scars, under one plan",
      description:
        "We don't treat active acne and scars as separate stories. Your protocol is planned so that as breakouts calm down, we already know how and when to move into mark and scar correction.",
    },
    {
      title: "Medicines plus in-clinic treatments",
      description:
        "Tablets and creams alone often aren't enough, and procedures without medical control just inflame the skin. We deliberately combine both so you get faster, safer and more stable results.",
    },
    {
      title: "Scar-type specific approach",
      description:
        "Not all scars are the same. Ice pick, boxcar, rolling and hypertrophic scars each respond to different tools. We use the appropriate mix of subcision, TCA CROSS, MNRF, PRP and fractional lasers instead of a single 'one-size' machine.",
    },
  ],
  relatedConditionSlugs: ["acne-breakouts", "acne-scars"],
};
