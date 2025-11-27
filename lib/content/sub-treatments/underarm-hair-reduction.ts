import { SubTreatmentContent } from "@/lib/navigationData";

export const underarmHairReductionContent: SubTreatmentContent = {
  hero: {
    title: "Underarm Hair Reduction",
    tagline: "Sleeveless without second thoughts",
    intro:
      "Razor shadow, in-grown bumps, and stubble that returns within days - underarm hair can make sleeveless outfits feel like a risk. Laser hair reduction in the underarm area offers smoother skin with far less upkeep.",
  },
  quickStats: {
    sessions: "6-8 sessions, 4-6 weeks apart",
    duration: "10-15 mins per session",
    downtime: "Redness for 1-3 hours",
    painLevel: "Quick heat snaps + cooling",
  },
  overview:
    "Underarm hair tends to be coarse and responds very well to laser. By targeting the follicles with each session, growth becomes sparser and finer, often with improvement in underarm texture simply because there's less friction, shaving, and irritation.",
  isThisForYou: [
    "You avoid sleeveless clothes because of underarm hair or shadow",
    "Shaving causes bumps, itching, or dark dots on the skin",
    "Waxing is painful and leaves your underarms sore for a day",
    "You don't want to remember hair removal before every event",
    "You're hoping underarm hair reduction will also reduce ingrowns",
  ],
  process: {
    steps: [
      {
        phase: "before",
        title: "Simple Prep the Day Before",
        description:
          "You'll be asked to shave the underarms 24 hours before your visit so the laser can focus on the root, not long hair. Deodorants or perfumes are avoided on the day of treatment, and the area is cleansed before starting.",
      },
      {
        phase: "during",
        title: "Short, Focused Laser Session",
        description:
          "With your arms comfortably positioned, the handpiece is moved across each underarm in passes. You'll feel hot pinpricks followed by a cooling sensation. Both underarms are usually done within 10-15 minutes.",
      },
      {
        phase: "after",
        title: "Post-Session Calm & Deodorant Rules",
        description:
          "The area may look pink and feel slightly warm for a few hours, similar to mild sunburn. We advise skipping deodorant, perfumes, and vigorous workouts for 24 hours, wearing loose cotton, and applying a soothing gel if needed.",
      },
    ],
  },
  results: {
    timeline:
      "Underarms often show noticeable change early. Within 2-3 sessions, many people see slower growth and fewer ingrowns. By 6-8 sessions, hair is dramatically reduced and daily shaving usually becomes unnecessary.",
    recovery:
      "Most people can go back to normal office or home routines the same day. Any tenderness settles quickly as long as heat, friction, and fragranced products are avoided for a day.",
    image: "https://images.unsplash.com/photo-1508669232496-137669ed92e1?q=80&w=1000&auto=format&fit=crop", // Gentle water ripple, implies soothing/smooth
  },
  faqs: [
    {
      question: "Can I use deodorant after underarm laser?",
      answer:
        "We recommend skipping deodorant and strong fragrances for at least 24 hours after your session, as freshly treated skin can be more sensitive. From the next day, you can ease back into your regular routine if there is no irritation.",
    },
    {
      question: "Will laser also help with underarm darkening?",
      answer:
        "Laser by itself is not a whitening treatment, but as shaving, friction, and ingrowns reduce, the area often looks more even. If you have significant darkening, we can add targeted pigmentation treatments separately.",
    },
    {
      question: "Is it okay to get underarm laser during periods?",
      answer:
        "Yes, if you are comfortable. Just let the clinic know in advance so we can schedule your session at a time that works for you.",
    },
    {
      question: "Do I need to grow the hair out first?",
      answer:
        "No. Laser works best on closely shaved hair. Long hair can increase discomfort and reduce efficiency, so shaving 24 hours before is ideal.",
    },
  ],
};
