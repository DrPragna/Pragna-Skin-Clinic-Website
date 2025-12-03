import { ConditionContent } from '@/lib/navigationData';

export const hairFallThinningHairContent: ConditionContent = {
  hero: {
    title: 'Hair Fall & Thinning Hair',
    empathyStatement:
      'Every shower, pillow and comb reminds me how much hair I am losing',
    intro:
      'Hair fall can be deeply upsetting, but many causes are treatable. Understanding your pattern early gives the best chance of preserving density.',
  },
  symptoms: {
    headline: 'Do you recognise these signs?',
    list: [
      'More hair on pillow, floor or shower drain',
      'Widening parting line visible in photographs and mirrors',
      'Scalp showing through when hair is tied back',
      'Thinner ponytail compared to older photos',
      'Family history of balding or thinning patterns',
      'Itchy, flaky or oily scalp alongside hair fall',
    ],
  },
  understanding: {
    whatItIs:
      'Hair fall and thinning describe increased shedding, reduced volume or visible scalp. Patterns vary from patchy loss to gradual thinning, and are influenced by genetics, hormones, nutrition, scalp health and stress.',
    whyItHappens: [
      'Genetic androgenetic alopecia in men and women',
      'Post-pregnancy, thyroid or other hormonal shifts',
      'Iron, vitamin D or protein deficiencies',
      'Dandruff, scalp infections or chronic oiliness',
      'Stress, illness, crash diets or medications',
    ],
  },
  pragnaApproach: {
    description:
      'We first identify pattern and causes using history, examination and tests, then combine medical treatments, scalp procedures and lifestyle guidance into a structured, trackable hair recovery plan.',
  },
  recommendedTreatments: [
    {
      type: 'family',
      slug: 'hair-growth-scalp-treatments',
      name: 'Hair Growth & Scalp Treatments',
      bestFor: 'Comprehensive hair loss management plans',
    },
    {
      type: 'sub-treatment',
      slug: 'hair-fall-thinning-treatment',
      name: 'Hair Fall & Thinning Treatment',
      bestFor: 'Diagnosing and treating shedding causes',
    },
    {
      type: 'sub-treatment',
      slug: 'prp-gfc-hair-growth',
      name: 'PRP / GFC for Hair Growth',
      bestFor: 'Boosting follicles with growth factors',
    },
    {
      type: 'sub-treatment',
      slug: 'low-level-light-therapy-hair',
      name: 'Low-Level Light Therapy for Hair',
      bestFor: 'Non-invasive light support for regrowth',
    },
  ],
  timeline: {
    steps: [
      {
        title: 'First month',
        description:
          'We assess pattern, scalp condition and health, order needed tests and start baseline treatments like lotions, tablets and supportive shampoos or serums.',
      },
      {
        title: 'Month 2–3',
        description:
          'Shedding may stabilise first. Early baby hairs sometimes appear along parting, hairline or temples as follicles respond to medicines and scalp procedures.',
      },
      {
        title: 'Month 4–6',
        description:
          'Volume and density changes become more noticeable in photos rather than daily mirrors. We fine-tune dosing, treatments and supportive care based on progress.',
      },
      {
        title: 'Long-term care',
        description:
          'Hair conditions often need maintenance. We plan sustainable routines, realistic timelines and periodic reviews to prevent sudden relapses during stress, illness or major life changes.',
      },
    ],
  },
  faqs: [
    {
      question: 'Is all hair fall abnormal or worrying?',
      answer:
        'Losing some hair daily is normal. We worry when shedding increases, density reduces or patterns change, especially with family history, illness or sudden life events.',
    },
    {
      question: 'How long before I see regrowth after treatment starts?',
      answer:
        'Hair cycles are slow. Visible change usually appears after several months of consistent treatment; early wins are reduced shedding and new short, baby hairs.',
    },
    {
      question: 'Can oiling or home remedies alone stop hair loss?',
      answer:
        'Oiling supports scalp comfort but rarely fixes underlying causes like hormones or deficiencies. Evidence-based medicines and procedures, plus nutrition, give better, more predictable results.',
    },
    {
      question: 'Will I need to take hair medicines forever?',
      answer:
        'Some patterns, particularly genetic ones, need long-term support. We explain which treatments are temporary and which likely require maintenance, so you can plan realistically.',
    },
  ],
  selfCareTips: [
    'Avoid crash diets; prioritise protein-rich balanced meals',
    'Use gentle shampoos; skip daily harsh chemical treatments',
    'Limit tight hairstyles that constantly pull the hairline',
    'Manage stress with routines, movement and sleep hygiene',
    'Seek early help when noticing thinning or widening',
  ],
  relatedConditionSlugs: ['unwanted-facial-body-hair', 'ageing-skin-lines-wrinkles'],
};

