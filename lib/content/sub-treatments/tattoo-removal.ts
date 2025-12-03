import { SubTreatmentContent } from '@/lib/navigationData';

export const tattooRemovalContent: SubTreatmentContent = {
  hero: {
    title: "Tattoo Removal",
    tagline: "Fade ink safely, step by step",
    intro:
      "Tattoo Removal uses specialised lasers to break down ink particles in the skin over multiple sessions. The aim is significant lightening or clearance where possible, with realistic discussion about ghosting, colours and scarring risk.",
  },
  quickStats: {
    sessions: "Often 6–10+ laser sessions",
    duration: "Each visit 15–40 minutes",
    downtime: "Whitening, crusts, tenderness",
    painLevel: "Snaps and heat, tolerable",
  },
  overview:
    "We use Q-switched or similar lasers suited for Indian skin to target tattoo pigment while protecting surrounding tissue. Session number depends on ink depth, colours, age, body site and your healing pattern.",
  isThisForYou: [
    "You regret a tattoo or it no longer fits your life, work or beliefs.",
    "You want lightening before cover-up or revision by an artist.",
    "The tattoo changed in colour, texture or feel and worries you.",
    "You understand removal is a journey, not a single-session eraser.",
    "You can follow strict sun and wound-care instructions between sessions.",
  ],
  process: {
    steps: [
      {
        phase: "before",
        title: "Assess tattoo and expectations",
        description:
          "We evaluate size, colours, depth, scarring, location and skin type, discuss medications and sun exposure, then outline session counts, possible ghosting and limitations before you commit to treatment.",
      },
      {
        phase: "during",
        title: "Perform laser tattoo sessions",
        description:
          "After cooling and eye protection, rapid laser pulses are delivered across the tattoo. You will see whitening and feel snapping sensations. Cooling and dressings follow to support comfortable healing.",
      },
      {
        phase: "after",
        title: "Support healing and fading",
        description:
          "We guide dressing changes, sun avoidance, moisturising and preventing infections, then space sessions several weeks apart to allow pigment clearing and skin recovery before the next sitting.",
      },
    ],
  },
  results: {
    timeline:
      "Black and blue inks usually lighten best; coloured inks can be slower or incomplete. Noticeable fading occurs over months as multiple sessions and your body's clearance mechanisms work together.",
    recovery:
      "Redness, swelling, blistering or crusts can occur for days. Proper care and sun protection are crucial to reduce scarring or pigment changes, especially in Indian skin tones.",
  },
  faqs: [
    {
      question: "Can you remove a tattoo in one or two sessions?",
      answer:
        "Very rarely. Most tattoos, especially professional ones, need many sittings. We avoid promising quick erasure because rushing increases risks of scarring and uneven pigment.",
    },
    {
      question: "Will my tattoo vanish without any trace?",
      answer:
        "Some clear nearly completely; others leave a shadow or colour shift. Outcomes depend on ink, depth, site and your skin. We discuss likely scenarios before you begin.",
    },
    {
      question: "Is tattoo removal more painful than getting a tattoo?",
      answer:
        "Many find the feeling sharper but quicker. Cooling, numbing and short passes keep it tolerable. We can break large tattoos into sections to manage comfort.",
    },
    {
      question: "Can tattoo removal cause scars or white patches?",
      answer:
        "Yes, especially with very aggressive settings or poor aftercare. We use conservative parameters and emphasise wound care to reduce risks, but they cannot be reduced to zero.",
    },
    {
      question: "How long should I wait between tattoo removal sessions?",
      answer:
        "Typically several weeks. Skin needs time to heal and your body needs time to clear fragmented pigment. Treating too frequently may increase complications without better fading.",
    },
  ],
};

