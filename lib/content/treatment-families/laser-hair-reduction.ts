import { TreatmentFamilyContent } from "@/lib/navigationData";

export const laserHairReductionContent: TreatmentFamilyContent = {
  hero: {
    eyebrow: "HAIR • LASER CARE",
    title: "Laser Hair Reduction",
    subtitle: "Long-term relief from constant hair removal",
    intro:
      "Unwanted facial and body hair can affect confidence, comfort and time. This family uses triple-wavelength diode lasers, safe settings for Indian skin and spaced sessions to thin growth, reduce ingrowns and make everyday grooming easier, smoother and more predictable long term.",
  },
  trustIndicators: [
    {
      value: "Triple wave",
      label: "Advanced diode system",
    },
    {
      value: "All tones",
      label: "Indian-skin protocols",
    },
    {
      value: "Doctor-led",
      label: "Safety-first planning",
    },
  ],
  howItWorks: {
    description:
      "Laser light targets pigment in the hair root, heating and disabling follicles in their active growth phase. With each session, many hairs grow back finer and fewer, giving long-term reduction while your skin stays protected with cooling and carefully chosen energy levels.",
    steps: [
      {
        title: "Map hair, skin and goals",
        text:
          "We examine hair thickness, density and growth pattern across each area, note your skin tone and sensitivity, review waxing or threading history and discuss hormones or PCOS if relevant, so we know what level of reduction is realistic for your body.",
        icon: "consultation",
      },
      {
        title: "Perform sessions with cooling",
        text:
          "A patch test checks your comfort and response. During each session, the triple-wavelength diode glides over gel-coated skin, delivering controlled light pulses with in-built cooling so the sensation feels like quick snaps and heat, not burning.",
        icon: "treatment",
      },
      {
        title: "Space sessions for best cycles",
        text:
          "Sessions are usually spaced four to eight weeks apart depending on area. Over time, coarse hairs reduce, finer regrowth appears slowly and many follicles become inactive. We then move you to maintenance as results stabilise.",
        icon: "results",
      },
    ],
  },
  whoIsThisFor: {
    headline: "Who this family helps",
    list: [
      "You are tired of repeated waxing, threading or shaving and the rashes that follow every visit.",
      "You get bumps, ingrown hairs or darkness on underarms, bikini line or beard-like facial areas.",
      "PCOS or hormonal changes have increased facial or body hair that feels difficult to manage.",
      "You want cleaner arms, legs or back for personal comfort, photos or sports without constant upkeep.",
      "You prefer doctor-supervised laser over parlour experiments or unregulated home devices.",
    ],
  },
  whyPragna: [
    {
      title: "Triple-wavelength diode technology",
      description:
        "We use advanced triple-wavelength diode systems that target different follicle depths effectively. Settings, passes and energy levels are customised for Indian skin tones to maximise hair reduction while prioritising comfort and safety.",
    },
    {
      title: "Hormone-aware treatment planning",
      description:
        "For PCOS or other hormonal patterns, we plan realistic expectations, possible maintenance and, when needed, coordinate with gynaecologists or endocrinologists so your laser sessions work alongside proper medical management.",
    },
    {
      title: "Protocols for each body area",
      description:
        "Face, bikini, underarms, back and limbs all behave differently. We adjust energy, overlap, cooling and frequency for every zone instead of using one fixed setting head-to-toe, aiming for effective yet skin-friendly results.",
    },
  ],
  relatedConditionSlugs: ["unwanted-facial-body-hair"],
};
