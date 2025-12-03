import { SubTreatmentContent } from "@/lib/navigationData";

export const facialHairReductionContent: SubTreatmentContent = {
  hero: {
    title: "Facial Hair Reduction",
    tagline: "Gentle control of facial growth",
    intro:
      "Facial Hair Reduction targets upper lip, chin, side-locks and jawline hair safely, especially for Indian skin prone to darkening with repeated threading, waxing or harsh hair-removal creams.",
  },
  quickStats: {
    sessions: "Usually 6–8 primary sessions",
    duration: "Each visit 15–30 minutes",
    downtime: "Redness, mild bumps briefly",
    painLevel: "Snaps and warmth, tolerable",
  },
  overview:
    "Using triple-wavelength diode settings suited for the face, we gradually thin facial hair while protecting surrounding skin. Sessions are short, spaced a few weeks apart and planned around work or social commitments.",
  isThisForYou: [
    "You regularly thread or wax your upper lip, chin or side-locks.",
    "Repeated parlour work has caused darkness or tiny bumps on your face.",
    "Hormonal issues like PCOS have increased beard-like facial growth.",
    "Hair shadow shows even after very close shaving or threading sessions.",
    "You want smoother makeup application without constant regrowth.",
  ],
  process: {
    steps: [
      {
        phase: "before",
        title: "Assess pattern and hormones",
        description:
          "We examine facial hair pattern, check for PCOS clues, ask about cycles, medicines and past parlour methods, then plan realistic reduction goals and shave or trim guidance specific to each zone.",
      },
      {
        phase: "during",
        title: "Perform focused facial passes",
        description:
          "After shaving and gel application, the laser handpiece delivers controlled pulses across marked areas. We use conservative energies initially, especially around lip corners, jawline and sideburn junctions.",
      },
      {
        phase: "after",
        title: "Care for pigment-prone skin",
        description:
          "We apply soothing products, reinforce sunscreen and advise avoiding threading or waxing between sessions. Follow-ups track both hair reduction and any pigment changes so we can adjust settings early.",
      },
    ],
  },
  results: {
    timeline:
      "You may notice slower regrowth and softer stubble within a few sessions. Visible thinning and fewer coarse strands usually appear over four to eight sessions, especially when hormones are stable.",
    recovery:
      "Temporary redness, small bumps or mild swelling can appear for a few hours. Gentle moisturiser and strict sunscreen help them settle quickly without drawing attention.",
  },
  faqs: [
    {
      question: "Is laser safe for facial hair on women?",
      answer:
        "Yes, when done with the right machine and settings. We take extra care with pigment-prone Indian skin and discuss hormone factors so expectations, timelines and maintenance needs stay realistic.",
    },
    {
      question: "Will facial laser make hair thicker if I stop?",
      answer:
        "No. Laser targets roots; it does not stimulate new ones. If you stop midway, hair usually returns to its natural pattern over time, not thicker just because of treatment.",
    },
    {
      question: "Can I continue threading between laser sessions?",
      answer:
        "We prefer shaving or trimming. Threading and waxing remove roots, leaving less target for the laser. They also irritate facial skin, raising the risk of darkening, especially around the mouth.",
    },
    {
      question: "Does facial hair reduction help with ingrowns?",
      answer:
        "Yes. As hair becomes finer and fewer follicles remain active, ingrowns and repeated bumps usually reduce, especially on the chin, jawline and sideburn areas that see frequent parlour work.",
    },
    {
      question: "Can I do laser if I have active acne?",
      answer:
        "Mild acne is usually manageable with careful technique. For very inflamed acne, we may first calm breakouts or adjust areas treated to avoid unnecessary irritation on already angry spots.",
    },
  ],
};
