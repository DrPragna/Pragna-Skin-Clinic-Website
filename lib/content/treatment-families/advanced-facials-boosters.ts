import { TreatmentFamilyContent } from "@/lib/navigationData";

export const advancedFacialsBoostersContent: TreatmentFamilyContent = {
  hero: {
    eyebrow: "SKIN • MAINTENANCE",
    title: "Advanced Facials, Boosters & Skin Maintenance",
    subtitle: "Support for long-term skin health",
    intro:
      "These are the in-clinic treatments that keep your skin on track between bigger procedures. Advanced facials, gentle peels, skin boosters and review visits are planned around your acne, pigmentation or anti-ageing treatment so you stay glowing, comfortable and barrier-safe over the long term.",
  },
  trustIndicators: [
    {
      value: "Plan-first",
      label: "Built around your main treatment",
    },
    {
      value: "Barrier-safe",
      label: "Balanced for Indian skin",
    },
    {
      value: "Maintenance",
      label: "Helps results last longer",
    },
  ],
  howItWorks: {
    description:
      "Instead of random parlour facials, we design a maintenance layer around your main skin goals. Depending on whether you are treating acne, pigmentation or early ageing, we use a mix of hydrating facials, medical-grade peels, injectable skin boosters and skincare tweaks to keep results going without over-doing it.",
    steps: [
      {
        title: "Start from your main concern",
        text:
          "We first look at the bigger picture—are you on treatment for acne, pigmentation or ageing, or just starting your journey? We check how your skin is tolerating medicines or procedures, note any sensitivity, and understand your routine and upcoming events.",
        icon: "consultation",
      },
      {
        title: "Choose the right maintenance tools",
        text:
          "Based on that, we suggest the right mix of hydrating facials, peels, skin boosters or review visits. The idea is to support your plan—calm dryness from retinoids, keep pores clear, brighten tan or add back hydration—without clashing with your core treatment.",
        icon: "treatment",
      },
      {
        title: "Set a realistic rhythm",
        text:
          "We then space these sessions across the year—maybe once a month in active treatment phases, then less often for maintenance. You will know which sessions are optional \"nice-to-have\" and which ones are important to protect your results.",
        icon: "results",
      },
    ],
  },
  whoIsThisFor: {
    headline: "Ideal for you if…",
    list: [
      "You are already treating acne, pigmentation or ageing and want to maintain results",
      "Your skin swings between dry and oily because of medicines or actives",
      "You are confused whether parlour facials will undo your dermatologist's work",
      "You prefer a plan for the whole year instead of booking random sessions",
      "You want facials, peels and boosters that respect your skin barrier",
    ],
  },
  whyPragna: [
    {
      title: "Designed by dermatologists, not menus",
      description:
        "Every \"extra\" facial, peel or booster is chosen by your dermatologist based on what your skin is going through—not picked blindly from a spa menu.",
    },
    {
      title: "Syncs with your main treatment",
      description:
        "Maintenance sessions are timed to support your acne, pigmentation or anti-ageing plan. We avoid anything that increases irritation or pigmentation risk in Indian skin.",
    },
    {
      title: "Clear guidance on what matters",
      description:
        "We will tell you honestly which visits are essential and which are optional, so you can prioritise time and budget without guessing.",
    },
  ],
  relatedConditionSlugs: [
    "acne-breakouts",
    "dark-spots-tan-pigmentation",
    "uneven-skin-tone-texture",
    "ageing-skin-lines-wrinkles",
    "rosacea-facial-redness",
  ],
};
