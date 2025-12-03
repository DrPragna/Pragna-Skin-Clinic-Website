import { ConditionContent } from '@/lib/navigationData';

export const acneScarsContent: ConditionContent = {
  hero: {
    title: 'Acne Scars',
    empathyStatement:
      'These pits and marks stay even after my acne has finally settled',
    intro:
      'Acne scars are common and treatable. With the right combination of procedures and skincare, we can soften them and improve overall texture.',
  },
  symptoms: {
    headline: 'Do you recognise these signs?',
    list: [
      'Small dents or pits where old pimples once were',
      'Uneven cheeks that look rough in side lighting',
      'Makeup settling into tiny holes or lines',
      'Flat brown marks long after breakouts healed',
      'Skin looks textured in photos and close-ups',
      'Scars feel more visible than current acne',
    ],
  },
  understanding: {
    whatItIs:
      'Acne scars are lasting changes in the skin left after inflammation damages deeper layers. They can appear as pits, raised areas or flat marks that change how light reflects off your face.',
    whyItHappens: [
      'Repeated inflamed cystic or nodular acne',
      'Delaying or skipping proper acne treatment',
      'Picking, squeezing or home extractions',
      'Genetic tendency for deeper scarring',
      'Inadequate sun protection during healing',
    ],
  },
  pragnaApproach: {
    description:
      'We examine scar types, skin tone and healing pattern, then combine peels, microneedling, lasers and targeted procedures into a staged plan that remodels collagen while protecting Indian skin from darkening.',
  },
  recommendedTreatments: [
    {
      type: 'family',
      slug: 'acne-acne-scar-solutions',
      name: 'Acne & Acne Scar Solutions',
      bestFor: 'Comprehensive scar and mark care',
    },
    {
      type: 'sub-treatment',
      slug: 'acne-scar-treatment',
      name: 'Acne Scar Treatment',
      bestFor: 'Pitted scars and uneven texture',
    },
    {
      type: 'sub-treatment',
      slug: 'post-acne-marks-redness',
      name: 'Post-Acne Marks & Redness',
      bestFor: 'Brown and red post-acne marks',
    },
    {
      type: 'sub-treatment',
      slug: 'chemical-peels',
      name: 'Chemical Peels',
      bestFor: 'Support for texture, tone and marks',
    },
  ],
  timeline: {
    steps: [
      {
        title: 'Week 1–2',
        description:
          'We map scar types, stabilise any active acne, start basic skincare and discuss realistic expectations about texture change and required number of sessions.',
      },
      {
        title: 'Week 4–8',
        description:
          'Initial peels, microneedling or laser sessions begin. Skin may feel temporarily rough or red while deeper collagen remodelling slowly starts under the surface.',
      },
      {
        title: 'Month 3–6',
        description:
          'Scars gradually soften, pits look shallower and makeup sits better. We fine-tune technologies and spacing depending on your response and tolerance.',
      },
      {
        title: 'Ongoing care',
        description:
          'Focus shifts to maintaining results with sun protection, gentle actives and periodic top-up procedures if needed, preventing new acne from creating fresh scars.',
      },
    ],
  },
  faqs: [
    {
      question: 'Can acne scars really be treated without surgery?',
      answer:
        'Many acne scars improve significantly with peels, microneedling, lasers and fillers. We may not remove every mark, but we can usually make texture and light reflection much gentler.',
    },
    {
      question: 'How long will it take to see improvement?',
      answer:
        'You may notice small changes within a few sessions, but collagen remodelling is slow. Most people see meaningful improvement over several months, not days or weeks.',
    },
    {
      question: 'Will treatments make my skin thinner or weaker?',
      answer:
        'Done correctly, scar treatments stimulate collagen rather than strip skin away. We space sessions and adjust strengths so barriers stay supported while deeper layers are encouraged to remodel.',
    },
    {
      question: 'Do I have to stop work or college for procedures?',
      answer:
        'Most procedures have social downtime of a few days at most. We plan sessions around important events so temporary redness or marks do not disrupt your routine significantly.',
    },
  ],
  selfCareTips: [
    'Wear broad-spectrum sunscreen daily, even on cloudy days.',
    'Avoid picking or squeezing any new breakouts yourself.',
    'Use gentle, non-foaming cleansers instead of harsh scrubs.',
    'Introduce actives slowly; overuse delays scar healing.',
    'Share all home remedies tried before starting treatment.',
  ],
  relatedConditionSlugs: [
    'acne-breakouts',
    'dark-spots-tan-pigmentation',
    'uneven-skin-tone-texture',
  ],
};

