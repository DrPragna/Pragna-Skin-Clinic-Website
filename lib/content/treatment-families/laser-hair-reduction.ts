import { TreatmentFamilyContent } from "@/lib/navigationData";

export const laserHairReductionContent: TreatmentFamilyContent = {
  hero: {
    title: "Laser Hair Reduction",
    subtitle: "Less hair, less effort",
    intro:
      "Shaving every other day, painful waxing sessions, ingrown bumps under tight clothes - unwanted hair can feel like a full-time chore. Laser hair reduction uses focused light to target the root of the hair so growth becomes finer, slower, and dramatically reduced over time.",
    image: "https://images.pexels.com/photos/4426559/pexels-photo-4426559.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", // Clean, medical-grade aesthetic, woman with smooth skin, white background
  },
  trustIndicators: [
    { value: "Diode + Alexandrite", label: "Advanced laser platforms used" },
    { value: "Face to Full Body", label: "Multiple areas treated in one plan" },
    { value: "Doctor-Supervised", label: "Parameters set by dermatologist" },
  ],
  howItWorks: {
    description:
      "Laser hair reduction directs a beam of light at the pigment inside the hair follicle. This light converts to heat and weakens the follicle without damaging the surrounding skin. Because hair grows in cycles, a series of sessions is needed to catch hair in its active growth phase.",
    steps: [
      {
        title: "Skin & Hair Mapping",
        text:
          "First, your dermatologist looks at your skin tone, hair thickness, growth pattern, and any history of tanning or sensitivity. Based on this, they choose appropriate settings on diode and Alexandrite platforms and plan which areas to treat in each session.",
        icon: "consultation",
      },
      {
        title: "Laser Session",
        text:
          "A cooling gel may be applied, then the laser handpiece is moved across the area in passes. You'll feel quick, hot 'snaps' like a rubber band on the skin, balanced by cooling from the device. Different areas take different times - from a few minutes to nearly an hour.",
        icon: "treatment",
      },
      {
        title: "Hair Shedding & Follow-Up",
        text:
          "Over the next 1-2 weeks, treated hair sheds from the follicles. Regrowth that appears is usually finer and slower. Sessions are spaced several weeks apart and parameters are adjusted as hair reduces, until you reach long-term reduction.",
        icon: "results",
      },
    ],
  },
  whoIsThisFor: {
    headline: "Ideal for you if...",
    list: [
      "You're tired of waxing appointments, threading, or daily shaving",
      "Ingrown hairs, razor bumps, or underarm shadow make you self-conscious",
      "You want smooth skin for the long term, not just for a few days",
      "Different body areas have patchy or fast regrowth that's hard to manage",
      "You'd like one plan that covers multiple areas instead of random sessions",
    ],
    image: "https://images.pexels.com/photos/3762873/pexels-photo-3762873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", // Confident, clean aesthetic, showing smooth skin results naturally
  },
  whyPragna: [
    {
      title: "Lasers Chosen for Indian Skin",
      description:
        "We work with diode and Alexandrite platforms that can be tuned for higher melanin skin, helping reduce hair while respecting your skin tone and history of tanning.",
    },
    {
      title: "Doctor-Planned, Technician-Delivered",
      description:
        "A dermatologist first assesses you and sets the protocol. Trained therapists then carry out sessions under supervision so energy levels and passes stay within safe, effective ranges.",
    },
    {
      title: "From Single Area to Full Body",
      description:
        "Whether you only want upper lip and chin or are ready for full-body sessions, plans are built around your comfort, budget, and schedule so you can phase treatments in a practical way.",
    },
  ],
  relatedConditionSlugs: ["unwanted-facial-body-hair"],
};
