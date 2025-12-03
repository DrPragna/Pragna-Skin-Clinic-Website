import { TreatmentFamilyContent } from "@/lib/navigationData";

export const acneAcneScarSolutionsContent: TreatmentFamilyContent = {
  hero: {
    eyebrow: "SKIN • ACNE CARE",
    title: "Acne & Acne Scar Solutions",
    subtitle: "Calm breakouts, soften scars gently",
    intro:
      "Breakouts show up quickly, but the marks and dents can stay for years. This acne solutions family combines medicines, peels, lasers and needling to calm active pimples first, then gradually fade spots and soften scars while protecting your skin barrier.",
  },
  trustIndicators: [
    {
      value: "Doctor-led",
      label: "Dermatology first care",
    },
    {
      value: "Layered care",
      label: "Acne and scar focus",
    },
    {
      value: "Safe devices",
      label: "Peels, lasers, needling",
    },
  ],
  howItWorks: {
    description:
      "This plan starts with a detailed assessment of your acne type, triggers and current routine. Then we calm active breakouts, protect your barrier and only later add scar-focused procedures, so improvements build steadily without sudden irritation or darkening.",
    steps: [
      {
        title: "Understand your skin and acne",
        text:
          "We review your history, hormones, products, diet and stress, examine active acne, marks and scars, and click baseline photos. This helps us classify acne type, check for PCOS clues when relevant and design a practical plan you can realistically follow.",
        icon: "consultation",
      },
      {
        title: "Stabilise active breakouts first",
        text:
          "You start prescription creams, sometimes tablets, paired with gentle peels, hydrafacials or blue light sessions when needed. The goal is fewer new pimples, less pain and minimal fresh marks while keeping your skin barrier comfortable and daily life unchanged.",
        icon: "treatment",
      },
      {
        title: "Then address scars and marks",
        text:
          "We gradually introduce scar procedures like subcision, microneedling, MNRF or fractional lasers once acne is quieter. Sessions are spaced out, with sun protection and soothing skincare, so collagen can rebuild safely and texture improves over months, not overnight.",
        icon: "results",
      },
    ],
  },
  whoIsThisFor: {
    headline: "Who this family helps",
    list: [
      "Every breakout leaves a dark spot that takes months to fade on your skin.",
      "You see dents and pits that catch light, making cheeks look uneven in photos.",
      "You have tried salon facials and home remedies, but acne keeps returning with marks.",
      "You feel nervous about strong treatments because past products caused burning or darker patches.",
      "You want a stepwise plan that first calms pimples, then works slowly on scars and colour.",
    ],
  },
  whyPragna: [
    {
      title: "Dermatologist-led, evidence-based plans always",
      description:
        "Your plan is designed and monitored by a dermatologist, not a parlour menu. We combine medicines with procedures only when needed, adjusting doses and gaps based on how your skin responds over time.",
    },
    {
      title: "Layered focus on acne and scars",
      description:
        "Instead of chasing every single pimple, we stabilise active acne first. Then we gradually add scar-focused sessions, so procedures work on a calmer base and results tend to be more predictable.",
    },
    {
      title: "Protocols adapted for Indian skin",
      description:
        "We choose peels, lasers and energy devices with settings suited to darker tones, slow and steady when required. Sun-care counselling and gentle home routines help reduce the chances of unwanted pigmentation.",
    },
  ],
  relatedConditionSlugs: [
    "acne-breakouts",
    "acne-scars",
    "dark-spots-tan-pigmentation",
  ],
};
