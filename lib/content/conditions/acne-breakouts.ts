import { ConditionContent } from '@/lib/navigationData';

export const acneBreakoutsContent: ConditionContent = {
  hero: {
    title: "Acne & Breakouts",
    empathyStatement: "Those frustrating pimples that keep returning despite everything you have tried",
    intro:
      "Acne affects people across ages—not just teenagers. With proper dermatologist-led care, most acne responds well to treatment.",
  },
  symptoms: {
    headline: "Do you recognise these signs?",
    list: [
      "Recurring pimples, blackheads or whiteheads",
      "Painful bumps under the skin that take weeks to heal",
      "Oily skin even after washing",
      "Dark marks or scars left behind after breakouts",
      "Flare-ups around periods, stress or travel",
      "Products that used to work no longer help",
    ],
  },
  quickStats: [
    { stat: "85%", text: "of 12–24 year olds affected" },
    { stat: "Treatable", text: "with structured dermatology care" },
    { stat: "4–8 weeks", text: "for visible improvement typically" },
  ],
  understanding: {
    whatItIs:
      "Acne forms when oil and dead cells clog pores, letting bacteria trigger inflammation. It is not about hygiene—hormones, genetics, stress and products all play a role.",
    whyItHappens: [
      "Hormonal shifts (puberty, periods, PCOS, pregnancy)",
      "Overactive oil glands and clogged pores",
      "Genetics and family history",
      "Stress, sleep and lifestyle factors",
      "Pore-clogging skincare or makeup",
    ],
  },
  pragnaApproach: {
    description:
      "We identify your acne type, triggers and sensitivity first, then build a layered plan—controlling breakouts, preventing new ones and fading marks.",
  },
  recommendedTreatments: [
    {
      type: "family",
      slug: "acne-acne-scar-solutions",
      name: "Acne & Acne Scar Solutions",
      bestFor: "Comprehensive acne and scar management",
    },
    {
      type: "sub-treatment",
      slug: "active-acne-treatment",
      name: "Active Acne Treatment",
      bestFor: "Calming current breakouts first",
    },
    {
      type: "sub-treatment",
      slug: "chemical-peels",
      name: "Chemical Peels",
      bestFor: "Unclogging pores and oil control",
    },
    {
      type: "family",
      slug: "advanced-facials-boosters",
      name: "Advanced Facials & Boosters",
      bestFor: "Ongoing maintenance and skin health",
    },
  ],
  timeline: {
    steps: [
      {
        title: "Week 1–2",
        description:
          "Initial consultation, diagnosis and treatment start. Some temporary purging or dryness may occur as skin adjusts.",
      },
      {
        title: "Week 4–6",
        description:
          "Active breakouts begin settling. New pimples reduce in frequency and severity. Skin starts looking calmer.",
      },
      {
        title: "Week 8–12",
        description:
          "Noticeable clearing visible. Focus shifts to fading marks and preventing recurrence with maintenance care.",
      },
      {
        title: "Ongoing",
        description:
          "Maintenance routine with periodic reviews. Adjustments made for seasons, stress phases or hormonal changes.",
      },
    ],
  },
  faqs: [
    {
      question: "Will my acne ever go away completely?",
      answer:
        "For many, yes. With structured treatment, acne can be well-controlled or cleared. Some need ongoing maintenance if hormones play a role.",
    },
    {
      question: "Is it okay to pop pimples at home?",
      answer:
        "No. Squeezing pushes bacteria deeper, worsens inflammation and can leave scars. If a pimple is troublesome, visit us for safe extraction.",
    },
    {
      question: "Do I have to stop wearing makeup during treatment?",
      answer:
        "Not necessarily. We recommend non-comedogenic products. Brief makeup breaks may help during certain procedures.",
    },
    {
      question: "Why do I still get acne as an adult?",
      answer:
        "Adult acne is common. Hormones, stress, diet and skincare ingredients can trigger breakouts into your thirties and beyond. It responds well to treatment.",
    },
  ],
  selfCareTips: [
    "Cleanse twice daily with a gentle cleanser—skip harsh scrubs",
    "Use non-comedogenic moisturiser and sunscreen daily",
    "Avoid touching your face with unwashed hands",
    "Change pillowcases every 2–3 days",
    "Don't layer too many actives—protect your skin barrier",
  ],
  relatedConditionSlugs: ["acne-scars", "dark-spots-tan-pigmentation", "uneven-skin-tone-texture"],
};
