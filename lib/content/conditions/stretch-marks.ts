import { ConditionContent } from '@/lib/navigationData';

export const stretchMarksContent: ConditionContent = {
  hero: {
    title: 'Stretch Marks',
    empathyStatement:
      'These lines remind me of every weight change, pregnancy and growth spurt',
    intro:
      'Stretch marks are extremely common after growth, pregnancy or weight change. With realistic care, they can usually be softened and blended better.',
  },
  symptoms: {
    headline: 'Do you recognise these signs?',
    list: [
      'Fine lines appearing during or after pregnancy',
      'Pink, red or purple streaks on tummy or thighs',
      'Old silvery lines that still catch the light',
      'Marks around breasts, hips, buttocks or upper arms',
      'Skin feels slightly thinner over marked areas',
      'Self-consciousness in swimwear, sarees or gym wear',
    ],
  },
  understanding: {
    whatItIs:
      'Stretch marks form when skin stretches faster than its deeper support can adapt. Fibres tear slightly, leaving lines that start coloured and gradually lighten, but rarely vanish on their own.',
    whyItHappens: [
      'Rapid growth during teenage years or puberty',
      'Pregnancy-related stretching and hormonal changes',
      'Quick weight gain or loss over short periods',
      'Genetic tendency to mark more easily',
      'Certain medicines or medical conditions affecting skin',
    ],
  },
  pragnaApproach: {
    description:
      'We examine mark age, colour and depth, then mix topical care, peels, microneedling and lasers, pacing treatment around your life events and comfort with downtime.',
  },
  recommendedTreatments: [
    {
      type: 'family',
      slug: 'stretch-mark-body-scar-revision',
      name: 'Stretch Mark & Body Scar Revision',
      bestFor: 'Overall plan for marks and scars',
    },
    {
      type: 'sub-treatment',
      slug: 'stretch-mark-reduction',
      name: 'Stretch Mark Reduction',
      bestFor: 'Softening and blending stretch lines',
    },
    {
      type: 'sub-treatment',
      slug: 'c-section-surgery-scar-revision',
      name: 'C-Section & Surgery Scar Revision',
      bestFor: 'Improving surgical scar appearance',
    },
    {
      type: 'sub-treatment',
      slug: 'mommy-makeover-program',
      name: 'Mommy Makeover Program',
      bestFor: 'Post-pregnancy body and skin changes',
    },
  ],
  timeline: {
    steps: [
      {
        title: 'First month',
        description:
          'We classify marks as new or old, start supportive skincare, sun protection and, where suited, gentle procedures targeting texture and colour without overwhelming recently stretched skin.',
      },
      {
        title: 'Month 2–4',
        description:
          'Microneedling, lasers or peels are spaced out. Newer marks usually fade and smooth faster; older ones change more slowly but can still blend better.',
      },
      {
        title: 'Month 5–8',
        description:
          'We reassess photos and your comfort in everyday clothing. Top-ups or combined treatments may be added while reinforcing realistic expectations around complete erasure versus visible softening.',
      },
    ],
  },
  faqs: [
    {
      question: 'Can stretch marks be completely removed?',
      answer:
        'Completely erasing stretch marks is rare. However, colour and texture can often improve enough that they feel less noticeable in day-to-day life and photos.',
    },
    {
      question: 'Do creams alone work for old, white stretch marks?',
      answer:
        'Creams support moisture and mild improvement but rarely change deep, older marks alone. Procedures that stimulate collagen usually make a more visible difference when used correctly.',
    },
    {
      question: 'Is it safe to treat stretch marks while breastfeeding?',
      answer:
        "Many external treatments are possible, but we avoid certain medicines and aggressive procedures. Plans are customised with your gynaecologist's guidance and your comfort.",
    },
    {
      question: 'Will gaining or losing weight again create new marks?',
      answer:
        'Rapid changes can trigger fresh stretch marks. We encourage gradual weight adjustments, balanced nutrition and ongoing skin care to reduce the risk of new lines forming.',
    },
  ],
  selfCareTips: [
    'Moisturise stretched areas daily after bathing',
    'Avoid rapid crash diets and extreme bulking plans',
    'Use sunscreen on exposed marks to reduce darkening',
    'Stay hydrated and include protein in everyday meals',
    'Start early discussions during pregnancy or growth phases',
  ],
  relatedConditionSlugs: [
    'stubborn-fat-body-shaping',
    'ageing-skin-lines-wrinkles',
    'acne-scars',
  ],
};

