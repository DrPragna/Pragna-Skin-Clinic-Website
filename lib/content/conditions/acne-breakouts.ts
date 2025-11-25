import { ConditionContent } from '@/lib/navigationData';

/**
 * Acne & Breakouts - Condition Content
 * 
 * This is a sample content file showing the new schema structure.
 * Create similar files for each condition with custom content.
 */
export const acneBreakoutsContent: ConditionContent = {
  hero: {
    title: 'Acne & Breakouts',
    empathyStatement: 'Those stubborn pimples that keep coming back no matter what you try',
    intro: 'Acne isn\'t just a teenage problem. It affects people of all ages and can significantly impact confidence. The good news? With the right approach, it\'s highly treatable.',
    // image: '/images/conditions/acne-hero.jpg' // Need: Empathetic hero image
  },
  symptoms: {
    headline: 'Do you recognise these signs?',
    list: [
      'Recurring pimples, whiteheads, or blackheads on face, chest, or back',
      'Painful, deep cysts that take weeks to heal',
      'Oily skin that feels greasy even after washing',
      'Dark marks or scars left behind after breakouts clear',
      'Breakouts that worsen around your period or during stress',
      'Products that worked before no longer seem effective',
    ],
  },
  quickStats: [
    { stat: '85%', text: 'of people aged 12-24 experience acne' },
    { stat: 'Treatable', text: 'with dermatologist-led care' },
    { stat: '4-8 weeks', text: 'to see significant improvement' },
  ],
  understanding: {
    whatItIs: 'Acne occurs when hair follicles become clogged with oil and dead skin cells. This creates an environment where bacteria thrive, leading to inflammation and those frustrating breakouts. It\'s not about being "dirty" or having bad hygiene—it\'s a complex condition influenced by hormones, genetics, and other factors.',
    whyItHappens: [
      'Hormonal fluctuations (puberty, menstrual cycle, PCOS)',
      'Excess oil (sebum) production',
      'Bacterial overgrowth (C. acnes)',
      'Genetics and family history',
      'Certain medications or supplements',
      'Stress and lifestyle factors',
      'Using comedogenic (pore-clogging) products',
    ],
  },
  pragnaApproach: {
    description: 'We don\'t believe in one-size-fits-all acne treatment. Our dermatologists assess your specific acne type, triggers, and skin type to create a multi-pronged approach that addresses active breakouts, prevents new ones, and heals existing damage.',
  },
  recommendedTreatments: [
    {
      type: 'family',
      slug: 'acne-acne-scar-solutions',
      name: 'Acne & Acne Scar Solutions',
      bestFor: 'Comprehensive acne management',
    },
    {
      type: 'sub-treatment',
      slug: 'chemical-peels',
      name: 'Chemical Peels',
      bestFor: 'Unclogging pores and reducing oil',
    },
    {
      type: 'family',
      slug: 'advanced-facials-boosters',
      name: 'Advanced Facials',
      bestFor: 'Regular maintenance and prevention',
    },
  ],
  timeline: {
    steps: [
      { title: 'Week 1-2', description: 'Initial consultation and treatment begins. Some purging may occur.' },
      { title: 'Week 4-6', description: 'Active breakouts start reducing. Skin begins to clear.' },
      { title: 'Week 8-12', description: 'Significant improvement visible. Focus shifts to maintenance.' },
      { title: 'Ongoing', description: 'Maintenance routine to prevent recurrence and address scarring.' },
    ],
  },
  faqs: [
    {
      question: 'Will my acne ever go away completely?',
      answer: 'For many people, yes. With proper treatment, acne can be controlled and often cleared. Some may need ongoing maintenance, especially if hormonal factors are involved. Our dermatologists will give you realistic expectations based on your specific situation.',
    },
    {
      question: 'Is it okay to pop pimples?',
      answer: 'We strongly advise against it. Popping can push bacteria deeper, cause scarring, and spread infection. If you have a particularly bothersome pimple, come see us—we can safely extract it without damage.',
    },
    {
      question: 'Will I have to give up makeup?',
      answer: 'Not necessarily. We\'ll guide you on non-comedogenic products that won\'t clog pores. During certain treatments, you may need to avoid makeup briefly, but we\'ll work with your lifestyle.',
    },
    {
      question: 'Why do I still get acne as an adult?',
      answer: 'Adult acne is common, especially in women. Hormonal fluctuations, stress, and even certain skincare products can trigger breakouts. The good news is adult acne responds well to treatment.',
    },
  ],
  selfCareTips: [
    'Cleanse twice daily with a gentle, non-foaming cleanser',
    'Use non-comedogenic moisturisers and sunscreen',
    'Avoid touching your face throughout the day',
    'Change pillowcases frequently (every 2-3 days)',
    'Don\'t over-wash or use harsh scrubs—this can worsen acne',
    'Be patient—most treatments take 6-8 weeks to show results',
  ],
  relatedConditionSlugs: ['acne-scars', 'dark-spots-tan-pigmentation'],
};
