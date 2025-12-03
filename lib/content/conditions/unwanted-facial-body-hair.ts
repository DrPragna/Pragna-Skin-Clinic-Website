import { ConditionContent } from '@/lib/navigationData';

export const unwantedFacialBodyHairContent: ConditionContent = {
  hero: {
    title: 'Unwanted Facial & Body Hair',
    empathyStatement:
      'Constant shaving, threading and waxing leave my skin irritated yet never truly smooth',
    intro:
      'Excess facial or body hair is common, especially with Indian skin and hormones. Laser hair reduction offers longer gaps and smoother skin when planned well.',
  },
  symptoms: {
    headline: 'Do you recognise these signs?',
    list: [
      'Upper lip hair returning within days after threading',
      'Chin, jawline or neck hair causing shadow',
      'Thick growth on arms, legs or back',
      'Underarms darkening from repeated shaving or friction',
      'Ingrown hairs, bumps and itching after waxing',
      'Facial hair worsening around PCOS, stress or medicines',
    ],
  },
  understanding: {
    whatItIs:
      'Unwanted facial and body hair refers to growth that feels excessive for your age, gender or comfort. It may be driven by hormones, genetics or hair removal methods that irritate and thicken regrowth over time.',
    whyItHappens: [
      'Genetic tendency for thicker, darker body hair',
      'Hormonal changes, PCOS or thyroid imbalances',
      'Frequent shaving, waxing and frictional irritation',
      'Certain medicines, steroids or underlying conditions',
      'Salon procedures without medical assessment or guidance',
    ],
  },
  pragnaApproach: {
    description:
      'We assess patterns, hormones and skin sensitivity, then recommend laser hair reduction or medical workup where needed, focusing on comfort, pigment safety and realistic, longer gaps between sessions.',
  },
  recommendedTreatments: [
    {
      type: 'family',
      slug: 'laser-hair-reduction',
      name: 'Laser Hair Reduction',
      bestFor: 'Long-term facial and body hair',
    },
    {
      type: 'sub-treatment',
      slug: 'facial-hair-reduction',
      name: 'Facial Hair Reduction',
      bestFor: 'Upper lip, chin and sideburns',
    },
    {
      type: 'sub-treatment',
      slug: 'full-body-laser-hair-reduction',
      name: 'Full Body Laser Hair Reduction',
      bestFor: 'Multiple body areas in one plan',
    },
    {
      type: 'sub-treatment',
      slug: 'bikini-brazilian-hair-reduction',
      name: 'Bikini & Brazilian Hair Reduction',
      bestFor: 'Bikini line and intimate areas',
    },
  ],
  timeline: {
    steps: [
      {
        title: 'First consultation',
        description:
          'We review hair patterns, medical history, medicines and hormones if needed, then test a patch to confirm how your skin and hair respond to laser.',
      },
      {
        title: 'Initial sessions',
        description:
          'Full sessions use eye protection, cooling and measured passes over chosen areas, spaced weeks apart to target hairs at the right growth stage.',
      },
      {
        title: 'Progressive reduction',
        description:
          'Over multiple sittings, growth reduces, becomes finer and slower. We adjust settings for comfort and pigment-prone Indian skin, watching for patchiness or irritation.',
      },
      {
        title: 'Maintenance phase',
        description:
          'Once hair is significantly reduced, we plan maintenance gaps, address any leftover patches and reinforce realistic expectations about future hormonal or life-stage related changes.',
      },
    ],
  },
  faqs: [
    {
      question: 'Is laser hair reduction permanent hair removal?',
      answer:
        'Laser reduces hair thickness and growth significantly but cannot guarantee lifelong zero regrowth. Some fine hair may return over time, especially with hormonal changes, and maintenance sessions may help.',
    },
    {
      question: 'Is laser safe for darker Indian skin tones?',
      answer:
        'With suitable devices, conservative settings and medical supervision, laser can be used safely. We avoid over-aggressive parameters that risk burns, patchy lightening or worsening pigmentation on Indian skin.',
    },
    {
      question: 'How many sessions will I typically need?',
      answer:
        'Most people need multiple sittings, often six or more, depending on area, colour, thickness and hormones. We estimate ranges after examining your growth and early response to treatment.',
    },
    {
      question: 'Can I continue waxing or threading between laser sessions?',
      answer:
        'We prefer trimming or shaving between sessions rather than waxing or threading, so the root remains for laser to target and your progress stays measurable and consistent.',
    },
  ],
  selfCareTips: [
    'Shave, do not wax, for weeks before sessions',
    'Avoid bleaching hair shortly before laser appointments',
    'Use broad-spectrum sunscreen on exposed treated areas daily',
    'Inform us about PCOS, thyroid or hormonal medicines',
    'Skip parlour procedures on treated skin between visits',
  ],
  relatedConditionSlugs: ['hair-fall-thinning-hair', 'ageing-skin-lines-wrinkles'],
};

