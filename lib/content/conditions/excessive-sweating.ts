import { ConditionContent } from '@/lib/navigationData';

export const excessiveSweatingContent: ConditionContent = {
  hero: {
    title: 'Excessive Sweating (Hyperhidrosis)',
    empathyStatement:
      'I constantly worry about sweat patches, handshakes and holding pens or phones',
    intro:
      'Excessive sweating can affect confidence, work and social life. With structured evaluation and treatment, many people regain comfortable control over everyday situations.',
  },
  symptoms: {
    headline: 'Do you recognise these signs?',
    list: [
      'Palms dripping or clammy even in air-conditioning',
      'Underarm patches soaking through shirts quickly',
      'Sweat on soles making footwear slippery or smelly',
      'Need to carry tissues, napkins or spare clothes',
      'Sweating worse during exams, meetings or social events',
      'Devices, papers or steering wheels slipping from hands',
    ],
  },
  understanding: {
    whatItIs:
      'Hyperhidrosis is sweating that exceeds what your body needs for temperature control. It can affect palms, soles, underarms or face, often independent of weather or activity level.',
    whyItHappens: [
      'Overactive nerve signals to sweat glands',
      'Family tendency towards sweaty palms or soles',
      'Heat, anxiety, caffeine or spicy foods',
      'Thyroid, diabetes or other medical conditions',
      'Certain medicines or hormonal fluctuations',
    ],
  },
  pragnaApproach: {
    description:
      'We confirm true hyperhidrosis, rule out underlying illnesses and then layer topical treatments, tablets, procedures and lifestyle guidance, adjusting intensity to your daily responsibilities.',
  },
  recommendedTreatments: [
    {
      type: 'family',
      slug: 'wellness-iv-drips-corrective',
      name: 'Wellness, IV Drips & Corrective Procedures',
      bestFor: 'Medical correction of comfort concerns',
    },
    {
      type: 'sub-treatment',
      slug: 'excess-sweating-treatment',
      name: 'Excess Sweating Treatment',
      bestFor: 'Focused care for palms, soles, underarms',
    },
    {
      type: 'sub-treatment',
      slug: 'personalised-skin-care-plan',
      name: 'Personalised Skin-Care Plan',
      bestFor: 'Daily routines around sweat-prone areas',
    },
  ],
  timeline: {
    steps: [
      {
        title: 'Initial workup',
        description:
          'We discuss sweating patterns, triggers and impact, examine involved areas and advise tests when needed to exclude thyroid, sugar or other medical contributors.',
      },
      {
        title: 'First-line control',
        description:
          'Prescription antiperspirants, lifestyle changes and sometimes tablets are started. Many people notice lowered intensity or frequency of episodes over the first few weeks.',
      },
      {
        title: 'Advanced options',
        description:
          'If required, we introduce procedures like iontophoresis or injectables, planned around exams, weddings or work so any temporary soreness or weakness is manageable.',
      },
      {
        title: 'Maintenance and review',
        description:
          'We schedule follow-ups to track confidence, side-effects and new triggers, fine-tuning your plan so sweating stays controlled without overtreating.',
      },
    ],
  },
  faqs: [
    {
      question: 'Is excessive sweating only due to poor hygiene?',
      answer:
        'No. Hyperhidrosis is often a nerve-related condition. You can be very hygienic and still sweat excessively; soaps alone cannot correct the underlying signalling.',
    },
    {
      question: 'Will I stop sweating completely after treatment?',
      answer:
        'The goal is comfortable, functional dryness, not zero sweat. Completely blocking sweating everywhere would be unhealthy; we focus on the most disruptive areas.',
    },
    {
      question: 'Are botulinum toxin injections safe for underarm sweat?',
      answer:
        'When done correctly in suitable candidates, they can significantly reduce sweating for months. We discuss discomfort, cost and possible side-effects beforehand in detail.',
    },
    {
      question: 'Can stress management alone fix my sweating?',
      answer:
        'Stress often worsens sweating, so managing it helps. But persistent hyperhidrosis usually needs medical treatment alongside relaxation techniques and lifestyle adjustments.',
    },
  ],
  selfCareTips: [
    'Choose breathable fabrics like cotton and linen daily',
    'Rotate shoes; allow pairs to dry fully between wears',
    'Limit caffeine and very spicy meals when possible',
    'Carry a small towel or tissues discreetly for support',
    'Note patterns in a diary to identify clear triggers',
  ],
  relatedConditionSlugs: [
    'moles-warts-skin-tags',
    'rosacea-facial-redness',
  ],
};

