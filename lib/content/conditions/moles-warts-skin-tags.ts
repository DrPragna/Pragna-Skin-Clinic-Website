import { ConditionContent } from '@/lib/navigationData';

export const molesWartsSkinTagsContent: ConditionContent = {
  hero: {
    title: 'Moles, Warts & Skin Tags',
    empathyStatement:
      'These tiny growths bother me more than they probably look to others',
    intro:
      'Most moles, warts and skin tags are harmless. A dermatologist can assess them properly and remove troublesome ones safely, with minimal discomfort.',
  },
  symptoms: {
    headline: 'Do you recognise these signs?',
    list: [
      'Small bumps that catch on clothing or jewellery',
      'Raised growths that keep getting nicked while shaving',
      'New or changing mole worrying you in the mirror',
      'Multiple skin tags around neck, underarms or bra line',
      'Warty lesions on fingers, feet or near nails',
      'Cosmetic concern about growths on face or eyelids',
    ],
  },
  understanding: {
    whatItIs:
      'Moles, warts and skin tags are common skin growths. Most are benign, but some need closer evaluation. They may rub, bleed, look prominent in photos or simply make you feel self-conscious.',
    whyItHappens: [
      'Genetic tendency to form moles or tags',
      'Friction from collars, chains, straps or folds',
      'Human papillomavirus infections causing viral warts',
      'Hormonal shifts, weight change and ageing skin',
      'Sun damage and long-term ultraviolet exposure',
    ],
  },
  pragnaApproach: {
    description:
      'We first classify each lesion, ruling out suspicious signs, then use appropriate techniques for removal and biopsy when needed, aiming for clean healing and minimal scarring wherever possible.',
  },
  recommendedTreatments: [
    {
      type: 'family',
      slug: 'wellness-iv-drips-corrective',
      name: 'Wellness, IV Drips & Corrective Procedures',
      bestFor: 'Minor corrective skin procedures',
    },
    {
      type: 'sub-treatment',
      slug: 'mole-wart-skin-tag-removal',
      name: 'Mole, Wart & Skin Tag Removal',
      bestFor: 'Precise removal of unwanted growths',
    },
    {
      type: 'family',
      slug: 'advanced-facials-boosters',
      name: 'Advanced Facials, Boosters & Skin Maintenance',
      bestFor: 'Ongoing skin health and upkeep',
    },
    {
      type: 'sub-treatment',
      slug: 'personalised-skin-care-plan',
      name: 'Personalised Skin-Care Plan',
      bestFor: 'Daily care for mark-prone skin',
    },
  ],
  timeline: {
    steps: [
      {
        title: 'First visit',
        description:
          'We examine each growth, discuss symptoms and cosmetic concerns, explain which are harmless, which need biopsy and suggest suitable removal options.',
      },
      {
        title: 'Procedure day',
        description:
          'Selected growths are numbed and removed using cautery, excision or other methods. You go home the same day with clear aftercare instructions.',
      },
      {
        title: 'Healing phase',
        description:
          'Scabs fall over days, leaving fresh skin that gradually settles. Biopsy reports, if done, are discussed and scar care may be started.',
      },
    ],
  },
  faqs: [
    {
      question: 'Are all moles, warts and tags safe to remove cosmetically?',
      answer:
        'No. Some moles need biopsy or monitoring first. We never remove suspicious lesions purely for appearance; diagnosis and long-term safety always come before cosmetic goals.',
    },
    {
      question: 'Will removal leave a permanent scar or mark?',
      answer:
        'Any cut or burn on skin can leave some mark. We choose methods and aftercare to keep scars as small, smooth and discreet as possible.',
    },
    {
      question: 'Can I remove moles and tags at a salon?',
      answer:
        'We strongly discourage non-medical removal. Untrained burning or cutting can cause infection, scarring and missed early cancers. Dermatologist evaluation protects both appearance and underlying health.',
    },
    {
      question: 'Do removed moles or warts grow back again?',
      answer:
        'Certain warts can recur, especially with weak immunity or friction. If regrowth happens, we reassess causes and may repeat or modify treatment to improve control.',
    },
  ],
  selfCareTips: [
    'Avoid scratching, picking or cutting growths at home',
    'Protect suspicious moles from sun with diligent sunscreen',
    'Do not use strong acids or home cautery pens',
    'Photograph changing moles to track size and colour',
    'Schedule checks if a lesion suddenly behaves differently',
  ],
  relatedConditionSlugs: [
    'tattoo-ink-pigment-removal',
    'dark-spots-tan-pigmentation',
    'acne-scars',
  ],
};

