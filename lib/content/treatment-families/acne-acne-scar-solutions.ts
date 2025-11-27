import { TreatmentFamilyContent } from "@/lib/navigationData";

export const acneAcneScarSolutionsContent: TreatmentFamilyContent = {
  hero: {
    title: "Acne & Acne Scar Solutions",
    subtitle: "Clear skin, lasting confidence",
    intro: "From active breakouts to stubborn scars and marks, acne can affect your confidence at any age. At Pragna Skin Clinic, we create dermatologist-led, customised plans to calm active acne, fade marks, and smooth scars gently and safely for Indian skin.",
    image: "" // TODO: Add actual image to /public/images/treatments/acne-acne-scar-solutions.jpg
  },
  howItWorks: {
    description: "We start by understanding your skin, lifestyle, hormones, and previous treatments. Based on the severity and type of acne and scars, we combine prescription medicines, in-clinic procedures, and a simple home-care routine to control breakouts, prevent new marks, and gradually improve scars.",
    steps: [
      {
        title: "Dermatologist Consultation & Skin Mapping",
        text: "Your dermatologist examines your skin, identifies acne type, scars, and triggers, and may suggest basic blood or hormone tests if needed. Together, we decide on a realistic plan that fits your routine.",
        icon: "consultation"
      },
      {
        title: "Active Acne Control",
        text: "We calm active pimples using prescription creams, oral medicines when required, and gentle in-clinic treatments such as peels or clean-ups. The goal is to reduce inflammation, oiliness, and new breakouts.",
        icon: "acne-control"
      },
      {
        title: "Scars, Marks & Maintenance",
        text: "Once breakouts are under control, we focus on scars and marks using targeted procedures like microneedling-based treatments, lasers, or specialised peels, along with long-term skincare to maintain results.",
        icon: "repair"
      }
    ]
  },
  whoIsThisFor: {
    headline: "This family is ideal if...",
    list: [
      "You get frequent pimples that leave dark marks or pits behind",
      "You've tried over-the-counter products but still keep breaking out",
      "Old acne scars or dents make you feel conscious in photos or at work",
      "You had teenage acne that has left marks well into adulthood",
      "You want a medical, dermatologist-led solution instead of home remedies"
    ]
  },
  whyPragna: [
    {
      title: "Dermatologist-Led, Not One-Size-Fits-All",
      description: "Every acne case is different. We customise medicines and procedures based on your skin type, acne type, age, and lifestyle instead of following a generic template."
    },
    {
      title: "Focus on Indian Skin & Pigmentation",
      description: "Indian skin is prone to dark marks and post-inflammatory pigmentation. Our plans are designed to control breakouts while minimising the risk of new marks."
    },
    {
      title: "Stepwise, Sustainable Plans",
      description: "We don't rush you into aggressive procedures. We first stabilise acne, then treat scars and marks, and finally guide you on maintenance so results are easier to sustain."
    }
  ],
  relatedConditionSlugs: ["acne-breakouts", "acne-scars"]
};

