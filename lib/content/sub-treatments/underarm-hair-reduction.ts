import { SubTreatmentContent } from '@/lib/navigationData';

/**
 * Underarm Hair Reduction - Sub-Treatment Content
 * 
 * This is a sample content file showing the new schema structure.
 * Create similar files for each sub-treatment with custom content.
 */
export const underarmHairReductionContent: SubTreatmentContent = {
  hero: {
    title: 'Underarm Laser Hair Reduction',
    tagline: 'Freedom from daily shaving',
    intro: 'Smooth, hair-free underarms without the hassle of razors or the pain of waxing. Our laser treatment targets hair follicles for long-lasting results in just a few quick sessions.',
  },
  quickStats: {
    sessions: '6-8 sessions',
    duration: '10-15 mins',
    downtime: 'None',
    painLevel: 'Mild warmth',
  },
  overview: 'Underarm laser hair reduction is one of our most popular treatments. The underarm area responds exceptionally well to laser treatment due to the dark, coarse nature of the hair. Most patients see significant reduction after just a few sessions.',
  isThisForYou: [
    'You shave or wax your underarms regularly',
    'You experience razor burn, bumps, or ingrown hairs',
    'You want to feel confident in sleeveless clothing',
    'You\'re looking for a long-term solution, not temporary removal',
    'You want to save time on daily grooming',
  ],
  process: {
    steps: [
      {
        phase: 'before',
        title: 'Preparation',
        description: 'Shave the area 24 hours before your appointment. Avoid deodorant on the day of treatment. We\'ll cleanse the area and apply a cooling gel if needed.',
      },
      {
        phase: 'during',
        title: 'Treatment',
        description: 'The laser handpiece is passed over your underarms. You\'ll feel a mild warming sensation with each pulse. The built-in cooling system keeps you comfortable. The entire process takes about 10-15 minutes.',
      },
      {
        phase: 'after',
        title: 'Aftercare',
        description: 'You can return to normal activities immediately. Avoid hot showers, saunas, and intense exercise for 24 hours. Apply soothing aloe if needed. Hair will shed naturally over 1-2 weeks.',
      },
    ],
  },
  results: {
    timeline: 'You\'ll notice hair shedding 1-2 weeks after each session. After 3-4 sessions, you\'ll see significant reduction. Full results (80-90% permanent reduction) typically achieved after 6-8 sessions.',
    recovery: 'Zero downtime. Some mild redness may occur immediately after treatment but resolves within a few hours. You can apply deodorant the next day.',
  },
  faqs: [
    {
      question: 'How many sessions will I need?',
      answer: 'Most patients need 6-8 sessions spaced 4-6 weeks apart. This is because hair grows in cycles, and we can only treat hair in the active growth phase. Your dermatologist will create a personalised plan.',
    },
    {
      question: 'Does it hurt?',
      answer: 'Most patients describe it as a mild warming or snapping sensation. Our Candela laser has built-in cooling that makes the treatment very tolerable. Underarms are one of the least sensitive areas to treat.',
    },
    {
      question: 'Is it safe for dark skin?',
      answer: 'Absolutely. Our Nd:YAG laser is specifically designed for all skin types, including darker Indian skin tones. We adjust settings based on your individual skin type for safe, effective results.',
    },
    {
      question: 'Can I shave between sessions?',
      answer: 'Yes, you can shave between sessions. In fact, we recommend shaving rather than waxing or plucking, as these methods remove the hair root that the laser needs to target.',
    },
    {
      question: 'Will the hair grow back?',
      answer: 'Laser hair reduction is permanent for the follicles that are destroyed. You can expect 80-90% permanent reduction. Some fine, light hair may remain, and occasional maintenance sessions (once a year) may be needed.',
    },
  ],
};
