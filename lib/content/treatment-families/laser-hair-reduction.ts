import { TreatmentFamilyContent } from '@/lib/navigationData';

/**
 * Laser Hair Reduction - Treatment Family Content
 * 
 * This is a sample content file showing the new schema structure.
 * Create similar files for each treatment family with custom content.
 */
export const laserHairReductionContent: TreatmentFamilyContent = {
  hero: {
    title: 'Laser Hair Reduction',
    subtitle: 'Smooth skin, permanent results',
    intro: 'Say goodbye to razors, waxing, and ingrown hairs. Our advanced laser technology targets hair at the root, giving you long-lasting smoothness with minimal discomfort.',
    // image: '/images/treatments/laser-hair-hero.jpg' // Need: Editorial hero image - smooth skin texture with soft lighting
  },
  trustIndicators: [
    { value: '25+', label: 'Years Experience' },
    { value: 'FDA', label: 'Approved Lasers' },
    { value: '50K+', label: 'Sessions Performed' },
  ],
  howItWorks: {
    description: 'Our laser systems deliver concentrated light energy that is absorbed by the pigment in hair follicles. This damages the follicle and inhibits future hair growth, while leaving surrounding skin unharmed.',
    steps: [
      {
        title: 'Consultation',
        text: 'We assess your skin type, hair colour, and treatment areas to select the optimal laser settings for you.',
        icon: 'consultation',
      },
      {
        title: 'Treatment',
        text: 'The laser is applied to the treatment area. You\'ll feel a mild warming sensation. Sessions are quick—underarms take just 10-15 minutes.',
        icon: 'treatment',
      },
      {
        title: 'Results',
        text: 'Hair falls out over 1-2 weeks. With each session, regrowth becomes finer and sparser until permanent reduction is achieved.',
        icon: 'results',
      },
    ],
  },
  whoIsThisFor: {
    headline: 'Ideal for you if...',
    list: [
      'You\'re tired of constant shaving, waxing, or threading',
      'You experience ingrown hairs or razor bumps',
      'You want long-term hair reduction, not temporary removal',
      'You prefer a low-maintenance grooming routine',
      'You have dark hair (works best) on any skin tone',
    ],
  },
  whyPragna: [
    {
      title: 'Candela GentleMax Pro',
      description: 'We use the gold-standard Candela laser system, trusted worldwide for its safety and efficacy on all skin types, including Indian skin.',
    },
    {
      title: 'Customised Settings',
      description: 'Our dermatologists adjust laser parameters for your unique skin tone and hair type—no one-size-fits-all approach.',
    },
    {
      title: 'Comfort-Focused',
      description: 'Built-in cooling technology and trained technicians ensure a comfortable experience with minimal discomfort.',
    },
  ],
  relatedConditionSlugs: ['unwanted-facial-body-hair'],
};
