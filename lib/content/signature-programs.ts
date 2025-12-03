import { NavItem } from '../navigationData';

export interface SignatureProgram {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  image: string; // Path to image
  heroImage: string;
  longDescription: string;
  benefits: string[];
  process: {
    title: string;
    description: string;
    duration?: string;
  }[];
  inclusions: {
    item: string;
    detail: string;
  }[];
  idealFor: string[];
}

export const signaturePrograms: SignatureProgram[] = [
  {
    slug: 'glow-getters',
    title: 'Glow Getters',
    subtitle: 'Radiance Revival',
    description: 'Customized treatment plans that brighten, smooth, and refresh tired skin.',
    duration: '4-6 sessions',
    image: '/images/signature/glow-getters-card.jpg',
    heroImage: '/images/signature/glow-getters-hero.jpg',
    longDescription: 'A curated journey designed to restore your skin’s natural luminosity. Combining gentle exfoliation with deep hydration and collagen stimulation, this program targets dullness and uneven texture to reveal a radiant, camera-ready complexion.',
    benefits: [
      'Instant radiance and brightness',
      'Smoother skin texture',
      'Deep hydration',
      'Reduced pore visibility'
    ],
    process: [
      {
        title: 'The Prep',
        description: 'Deep cleansing and gentle chemical exfoliation to remove dead skin cells.',
        duration: 'Week 1'
      },
      {
        title: 'The Infusion',
        description: 'Mesotherapy or skin boosters to deliver hydration deep into the dermis.',
        duration: 'Week 2-3'
      },
      {
        title: 'The Polish',
        description: 'Laser toning or advanced peel for final texture refinement and glow.',
        duration: 'Week 4'
      }
    ],
    inclusions: [
      { item: '6 Sessions', detail: 'In-clinic treatments' },
      { item: 'Home Care', detail: 'Curated skincare kit' },
      { item: 'Consultations', detail: '2 Doctor reviews' }
    ],
    idealFor: ['Brides-to-be', 'Event preparation', 'Dull or tired skin']
  },
  {
    slug: 'mommy-makeover',
    title: 'Mommy Makeover',
    subtitle: 'Post-Pregnancy Care',
    description: 'Gentle treatments to reclaim confidence in skin, body, and hair.',
    duration: '6-8 sessions',
    image: '/images/signature/mommy-makeover-card.jpg',
    heroImage: '/images/signature/mommy-makeover-hero.jpg',
    longDescription: 'Motherhood is a beautiful journey, but it changes your body. Our Mommy Makeover is a compassionate, comprehensive program addressing post-partum concerns like stretch marks, skin laxity, hair thinning, and pigmentation, helping you feel like yourself again.',
    benefits: [
      'Stretch mark reduction',
      'Skin tightening',
      'Hair regrowth support',
      'Pigmentation correction'
    ],
    process: [
      {
        title: 'Consultation & Comfort',
        description: 'A relaxed assessment of your concerns and timeline.',
        duration: 'Day 1'
      },
      {
        title: 'Body Restoration',
        description: 'Targeted treatments for stretch marks and skin tightening.',
        duration: 'Month 1-2'
      },
      {
        title: 'Hair & Skin Health',
        description: 'Nutrient infusion for hair and gentle facials for glow.',
        duration: 'Month 2-3'
      }
    ],
    inclusions: [
      { item: 'Custom Plan', detail: 'Tailored to your recovery' },
      { item: 'Safety First', detail: 'Nursing-safe protocols' },
      { item: 'Relaxation', detail: 'Spa-like environment' }
    ],
    idealFor: ['Post-partum mothers', 'Stretch marks', 'Hair loss']
  },
  {
    slug: 'bridal-beauty',
    title: 'Bridal Beauty',
    subtitle: 'Pre-Wedding Glow',
    description: 'Step-by-step care for clear, even, and luminous skin on your big day.',
    duration: '3-6 months',
    image: '/images/signature/bridal-beauty-card.jpg',
    heroImage: '/images/signature/bridal-beauty-hero.jpg',
    longDescription: 'Your wedding day deserves your best skin. We create a timeline-based roadmap starting 3-6 months before the big day, addressing everything from acne to body polishing, ensuring you walk down the aisle with flawless confidence.',
    benefits: [
      'Flawless complexion',
      'Back & body polishing',
      'Acne control',
      'Lasting glow'
    ],
    process: [
      {
        title: 'Timeline Planning',
        description: 'Reverse-engineering your plan from the wedding date.',
        duration: 'Month 1'
      },
      {
        title: 'Correction Phase',
        description: 'Treating acne, marks, or pigmentation aggressively.',
        duration: 'Month 2-3'
      },
      {
        title: 'Maintenance & Glow',
        description: 'Hydration and polishing for the final look.',
        duration: 'Month 4-6'
      }
    ],
    inclusions: [
      { item: 'Full Body', detail: 'Face, neck, back, hands' },
      { item: 'Diet Plan', detail: 'Nutrition for skin health' },
      { item: 'Emergency Support', detail: 'For last-minute breakouts' }
    ],
    idealFor: ['Brides', 'Grooms', 'Wedding parties']
  },
  {
    slug: 'rewind',
    title: 'Rewind',
    subtitle: 'Anti-Aging',
    description: 'Target lines and loss of firmness with advanced anti-aging solutions.',
    duration: '4-8 sessions',
    image: '/images/signature/rewind-card.jpg',
    heroImage: '/images/signature/rewind-hero.jpg',
    longDescription: 'Age is just a number, but looking tired doesn’t have to be. The Rewind program combines non-surgical lifting, volume restoration, and skin resurfacing to subtly turn back the clock, giving you a refreshed, rested appearance without surgery.',
    benefits: [
      'Lifted facial contours',
      'Reduced fine lines',
      'Volume restoration',
      'Improved skin elasticity'
    ],
    process: [
      {
        title: 'Structural Lift',
        description: 'HIFU or RF treatments to tighten the foundation.',
        duration: 'Session 1'
      },
      {
        title: 'Volume & Balance',
        description: 'Fillers or Bio-remodeling to restore youthful curves.',
        duration: 'Session 2'
      },
      {
        title: 'Surface Refinement',
        description: 'Botox or skin boosters for a smooth finish.',
        duration: 'Session 3'
      }
    ],
    inclusions: [
      { item: 'Combo Therapy', detail: 'Layered modalities' },
      { item: 'Maintenance', detail: 'Yearly plan included' },
      { item: 'Skincare', detail: 'Anti-aging regimen' }
    ],
    idealFor: ['Signs of aging', 'Sagging skin', 'Deep lines']
  },
  {
    slug: 'signature-reset',
    title: 'Signature Reset',
    subtitle: 'Complete Revival',
    description: 'Clinic-exclusive protocol for instant luminosity and lasting results.',
    duration: '3-5 sessions',
    image: '/images/signature/reset-card.jpg',
    heroImage: '/images/signature/reset-hero.jpg',
    longDescription: 'Our namesake program for when you need a complete overhaul. Whether it’s from stress, travel, or neglect, the Signature Reset detoxifies, nourishes, and re-energizes your skin using our proprietary blend of therapies.',
    benefits: [
      'Deep detoxification',
      'Stress relief for skin',
      'Oxygenation',
      'Immediate vitality'
    ],
    process: [
      {
        title: 'Detox',
        description: 'Lymphatic drainage and deep pore cleansing.',
        duration: 'Step 1'
      },
      {
        title: 'Nourish',
        description: 'IV Drip therapy coupled with facial infusion.',
        duration: 'Step 2'
      },
      {
        title: 'Protect',
        description: 'Barrier repair treatment to lock in results.',
        duration: 'Step 3'
      }
    ],
    inclusions: [
      { item: 'Inside-Out', detail: 'IV Therapy included' },
      { item: 'Exclusive', detail: 'Pragna proprietary method' },
      { item: 'Express', detail: 'Fast results' }
    ],
    idealFor: ['Burnout recovery', 'Frequent travelers', 'Special occasions']
  }
];

export function getSignatureProgram(slug: string) {
  return signaturePrograms.find((p) => p.slug === slug);
}

