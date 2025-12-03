import { ConditionContent } from '@/lib/navigationData';

export const tattooInkPigmentRemovalContent: ConditionContent = {
  hero: {
    title: 'Tattoo & Ink Pigment Removal',
    empathyStatement:
      'This tattoo no longer fits my life, but removing it feels intimidating',
    intro:
      'Laser tattoo removal is a gradual process, not an eraser. With realistic expectations and proper care, most tattoos can be lightened significantly.',
  },
  symptoms: {
    headline: 'Do you recognise these signs?',
    list: [
      'Regretted name or symbol from an earlier phase',
      'Tattoo affecting work roles, uniforms or perception',
      'Desire to lighten tattoo before professional cover-up',
      'Colour changes, blurring or spreading of old ink',
      'Unwanted cosmetic eyebrow or eyeliner tattoo pigment',
      'Embarrassment about placement in photos or social settings',
    ],
  },
  understanding: {
    whatItIs:
      'Tattoo and pigment removal uses specialised lasers to break ink into tiny fragments, allowing your body to gradually clear them. It usually takes multiple sittings and cannot always restore completely untouched skin.',
    whyItHappens: [
      'Impulsive tattoos done in teenage or college years',
      'Career shifts needing more conservative visible appearance',
      'Relationship changes making old names uncomfortable daily',
      'Faded lines, blurring or ink spreading with time',
      'Allergic, raised or textured reaction to certain pigments',
    ],
  },
  pragnaApproach: {
    description:
      'We assess colours, depth, scarring and your skin type, then plan conservative laser settings and spacing, prioritising safety, realistic fading and minimal pigment disturbance in Indian skin.',
  },
  recommendedTreatments: [
    {
      type: 'family',
      slug: 'wellness-iv-drips-corrective',
      name: 'Wellness, IV Drips & Corrective Procedures',
      bestFor: 'Medical-grade corrective laser procedures',
    },
    {
      type: 'sub-treatment',
      slug: 'tattoo-removal',
      name: 'Tattoo Removal',
      bestFor: 'Stepwise fading of unwanted tattoos',
    },
    {
      type: 'sub-treatment',
      slug: 'personalised-skin-care-plan',
      name: 'Personalised Skin-Care Plan',
      bestFor: 'Aftercare routine for treated areas',
    },
  ],
  timeline: {
    steps: [
      {
        title: 'First assessment',
        description:
          'We examine tattoo age, colours, texture, and any previous treatments, then estimate session count range and discuss limitations, downtime, cost and realistic improvement levels.',
      },
      {
        title: 'Initial sessions',
        description:
          'Early laser sittings focus on testing your healing and response. Whitening, crusts and temporary darkening are expected as ink begins breaking into smaller particles.',
      },
      {
        title: 'Mid-course fading',
        description:
          'Over several months, design and colours gradually soften. We adjust energy carefully, avoiding aggressive jumps that increase scarring and pigment change risk.',
      },
      {
        title: 'End results',
        description:
          'We review final lightening, discuss any residual ghosting or texture and decide whether further sessions, cover-up tattooing or simply acceptance feels right for you.',
      },
    ],
  },
  faqs: [
    {
      question: 'Can my tattoo be removed completely without any trace?',
      answer:
        'Some tattoos fade almost entirely; others leave shadows or colour shifts. Outcome depends on pigments, depth, age and your skin. We explain likely scenarios before starting treatment.',
    },
    {
      question: 'How painful is laser tattoo removal compared to getting one?',
      answer:
        'Most people describe sharp, quick snaps rather than prolonged pain. Cooling, numbing creams and breaking larger designs into sections help keep discomfort manageable.',
    },
    {
      question: 'Can laser tattoo removal cause scarring or white patches?',
      answer:
        'There is some risk, especially with strong settings or poor aftercare. We use conservative parameters and emphasise wound care and sun protection to reduce complications.',
    },
    {
      question: 'How long should I wait between tattoo removal sessions?',
      answer:
        'Sessions are usually spaced several weeks apart. This allows your skin to heal and your body to clear fragmented pigment, giving safer, more efficient results.',
    },
  ],
  selfCareTips: [
    'Keep treated area clean, moisturised and gently covered',
    'Avoid scratching blisters, scabs or dry flakes',
    'Use broad-spectrum sunscreen on fading tattoo daily',
    'Inform us about smoking or healing issues early',
    'Plan sessions away from major life events',
  ],
  relatedConditionSlugs: ['moles-warts-skin-tags', 'dark-spots-tan-pigmentation'],
};

