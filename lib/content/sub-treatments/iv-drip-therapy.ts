import { SubTreatmentContent } from '../index';

export const ivDripTherapyContent: SubTreatmentContent = {
  hero: {
    title: "IV Drip Therapy",
    tagline: "Supervised boosts, not shortcuts",
    intro:
      "IV Drip Therapy delivers fluids and selected vitamins directly into the bloodstream under medical supervision. It can support recovery from travel, illness or exhaustion but never replaces balanced food, sleep or ongoing medical treatment.",
  },
  quickStats: {
    sessions: "Single or periodic sessions",
    duration: "Roughly 45–90 minutes",
    downtime: "Usually minimal downtime",
    painLevel: "Mild needle discomfort only",
  },
  overview:
    "After screening and consent, we place an IV line and infuse a tailored mix of fluids and nutrients. Protocols are customised to your needs and health status, avoiding blanket 'one drip fits all' formulas.",
  isThisForYou: [
    "You feel run-down after travel, illness or intense work phases with your doctor's clearance.",
    "Hydration and nutrition are difficult to maintain during periods of hectic schedules.",
    "You want medically supervised IV support, not salon or home-based drip experiments.",
    "You understand drips assist recovery but cannot fix chronic lifestyle neglect.",
    "You are comfortable with blood tests and screening before any drip plan.",
  ],
  process: {
    steps: [
      {
        phase: "before",
        title: "Screen and personalise safely",
        description:
          "We review symptoms, diagnoses, medicines, allergies and recent tests, checking heart, kidney and liver status. Only if safe and appropriate do we recommend a drip type, explaining ingredients, frequency and cost before you decide.",
      },
      {
        phase: "during",
        title: "Administer monitored IV infusion",
        description:
          "A vein is cannulated using sterile technique and the prepared solution is infused slowly. Staff monitor your comfort, pulse and blood pressure, pausing or adjusting the drip at any sign of discomfort or unusual symptoms.",
      },
      {
        phase: "after",
        title: "Reinforce lifestyle foundations",
        description:
          "We advise fluid intake, diet, rest and when to repeat, if needed. If persistent fatigue, infections or mood changes exist, we recommend appropriate medical evaluations rather than relying only on repeated drips.",
      },
    ],
  },
  results: {
    timeline:
      "Some people feel fresher within a day; others notice subtler changes. Response depends on underlying health, sleep and stress, so we avoid promising identical results for everyone.",
    recovery:
      "Most resume routine the same day. Mild needle-site soreness or bruising can occur and usually settles with simple care and observation.",
  },
  faqs: [
    {
      question: "Are IV drips a replacement for healthy lifestyle?",
      answer:
        "No. They may support recovery in select situations but cannot substitute consistent sleep, nutrition, exercise and medical treatment. We always emphasise lifestyle foundations over frequent drip dependence.",
    },
    {
      question: "Do I need blood tests before IV drips?",
      answer:
        "Often yes. Kidney, liver, sugar and some vitamin levels help ensure safety and guide formulation so we do not overload your system or miss an underlying medical problem.",
    },
    {
      question: "Are there risks with IV Drip Therapy?",
      answer:
        "Any IV carries small risks such as infection, phlebitis, allergy or fluid overload. Proper screening, sterile technique, monitoring and medical supervision significantly reduce, but do not entirely remove, these risks.",
    },
    {
      question: "How often can I safely take IV drips?",
      answer:
        "Frequency depends on indication, tests and response. We avoid turning drips into weekly rituals without clear medical reasoning, instead spacing or stopping when lifestyle and health are stable.",
    },
    {
      question: "Can I take IV drips at salons or at home?",
      answer:
        "We strongly advise medical settings with trained staff and emergency support. Drips are not beauty facials; they involve your bloodstream and deserve hospital-level safety standards.",
    },
  ],
};

