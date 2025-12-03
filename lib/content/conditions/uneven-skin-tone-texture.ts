import { ConditionContent } from '@/lib/navigationData';

export const unevenSkinToneTextureContent: ConditionContent = {
  hero: {
    title: 'Uneven Skin Tone & Texture',
    empathyStatement:
      'My skin looks patchy and rough, even when I am not breaking out',
    intro:
      'Uneven tone and texture are extremely common with sun, pollution and ageing. With tailored care, skin can look smoother, calmer and more uniform over time.',
  },
  symptoms: {
    headline: 'Do you recognise these signs?',
    list: [
      'Patchy colour with some areas darker than others',
      'Roughness you can feel when fingers glide',
      'Visible pores or tiny bumps under makeup',
      'Skin looks dull despite regular cleansing and creams',
      'Old marks and tan blending into muddled tone',
      'Foundation sits unevenly, catching on dry patches',
    ],
  },
  understanding: {
    whatItIs:
      'Uneven skin tone and texture describe patchy colour and surface irregularities. Instead of a smooth, even look, some areas appear darker, rougher or pore-heavy, especially in certain lighting and photographs.',
    whyItHappens: [
      'Chronic sun exposure without regular sunscreen',
      'Past acne, marks and post-inflammatory pigmentation',
      'Build-up of dead cells from inadequate exfoliation',
      'Pollution, smoking and high-stress lifestyles',
      'Using too many actives or harsh scrubs',
    ],
  },
  pragnaApproach: {
    description:
      'We separate issues of tone, texture and scarring, then layer peels, facials, boosters and prescription skincare to gradually resurface skin, brighten dullness and protect against future damage and irritation.',
  },
  recommendedTreatments: [
    {
      type: 'family',
      slug: 'advanced-facials-boosters',
      name: 'Advanced Facials, Boosters & Skin Maintenance',
      bestFor: 'Overall tone, glow and upkeep',
    },
    {
      type: 'sub-treatment',
      slug: 'signature-medifacials',
      name: 'Signature Medifacials',
      bestFor: 'Custom facials for multiple concerns',
    },
    {
      type: 'sub-treatment',
      slug: 'chemical-peels',
      name: 'Chemical Peels',
      bestFor: 'Controlled resurfacing for smoother skin',
    },
    {
      type: 'sub-treatment',
      slug: 'skin-boosters-profhilo',
      name: 'Skin Boosters & Profhilo',
      bestFor: 'Hydration and plumpness from within',
    },
  ],
  timeline: {
    steps: [
      {
        title: 'Week 1–2',
        description:
          'We assess tone, texture, products and routine, pare back irritants and start gentle cleansing, moisturising and sunscreen while planning any peels or facials.',
      },
      {
        title: 'Week 4–8',
        description:
          'Light peels, medi-facials or boosters begin. Skin may briefly feel tighter or flaky as old build-up sheds and fresher, calmer surface starts emerging.',
      },
      {
        title: 'Month 3–6',
        description:
          'Texture usually feels smoother; makeup sits better. We fine-tune maintenance with at-home actives, spacing clinic treatments to support results without overwhelming the skin barrier.',
      },
    ],
  },
  faqs: [
    {
      question: 'Can uneven tone and texture be fully reversed?',
      answer:
        'Many people see significant improvement in brightness and smoothness. Deep scars or very long-standing damage may not disappear completely, but skin can usually look noticeably more even and refined.',
    },
    {
      question: 'Will exfoliating daily fix my uneven texture?',
      answer:
        'Over-exfoliating often worsens sensitivity and redness. We prefer planned, periodic peels or facials and well-chosen home actives rather than daily harsh scrubs or strong acids.',
    },
    {
      question: 'Do I need expensive products for smoother skin?',
      answer:
        'Not always. Consistency with a simple, suitable routine plus targeted clinic treatments often works better than constantly switching between multiple trending, high-priced products.',
    },
  ],
  selfCareTips: [
    'Cleanse gently twice daily; avoid foaming, drying face washes.',
    'Use sunscreen daily to prevent further patchiness and dullness.',
    'Limit physical scrubs; choose chemical exfoliants used sparingly.',
    'Introduce retinoids or acids slowly under dermatologist guidance.',
    'Stay hydrated and prioritise regular, sufficient sleep nightly.',
  ],
  relatedConditionSlugs: [
    'dark-spots-tan-pigmentation',
    'acne-breakouts',
    'ageing-skin-lines-wrinkles',
  ],
};

