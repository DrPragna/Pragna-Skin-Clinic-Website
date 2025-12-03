export interface SignatureProgram {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  image: string; // Path to image
  heroImage: string;
  gradient: string; // Tailwind gradient classes for fallback
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
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const signaturePrograms: SignatureProgram[] = [
  {
    slug: 'glow-getters',
    title: 'Glow Getters',
    subtitle: 'Radiance Revival',
    description: 'A personalised glow journey combining facials, peels and boosters to revive tired, uneven, event-ready skin.',
    duration: '4-6 sessions',
    image: '/images/signature/glow-getters.jpg',
    heroImage: '/images/signature/glow-getters.jpg',
    gradient: 'from-[#6B5B4F] via-[#524539] to-[#3A302A]',
    longDescription: 'Glow Getters is your structured radiance reset when everyday skincare is no longer enough. Across a few focused sessions, we combine deep cleansing, gentle exfoliation, hydrating medifacials, laser toning and skin boosters to smooth texture, brighten tone and leave your face naturally lit-from-within, not overdone.',
    benefits: [
      'Brighter, even complexion',
      'Refined skin texture',
      'Deep, lasting hydration',
      'Camera-ready natural glow',
    ],
    process: [
      {
        title: 'Prep & Polish',
        description: 'We start with cleansing, gentle exfoliation and basic barrier repair to prepare your skin.',
        duration: 'Week 1',
      },
      {
        title: 'Infuse & Treat',
        description: 'Hydrating medifacials, glow facials and targeted peels address dullness, tan, roughness and congestion.',
        duration: 'Week 2-3',
      },
      {
        title: 'Finish & Maintain',
        description: 'Laser toning or skin boosters enhance radiance while we set a simple, sustainable home routine.',
        duration: 'Week 4-5',
      },
    ],
    inclusions: [
      { item: '6 sessions', detail: 'Clinic-based treatments' },
      { item: 'Home care', detail: 'Curated skincare kit' },
      { item: 'Doctor reviews', detail: 'Two progress checks' },
    ],
    idealFor: [
      'Brides and event days',
      'Busy professionals on camera',
      'Dull, uneven complexions',
    ],
    faqs: [
      {
        question: 'How far before an event should I start?',
        answer: 'Ideally, start four to six weeks before an important event. This gives enough time for multiple sessions, mild peeling to settle and your natural glow to peak without rushing or overloading your skin.',
      },
      {
        question: 'Will I peel or need to hide at home?',
        answer: 'Most treatments have little visible peeling. If we use stronger peels, flaking is usually mild and planned around your calendar so you can manage social events comfortably with basic makeup, if desired.',
      },
      {
        question: 'Can this program help with pigmentation and tan?',
        answer: 'Yes, we often combine gentle peels, laser toning and glow facials to address tan and mild pigmentation, while still keeping the overall focus on radiance, hydration and healthy, even-looking skin tone.',
      },
      {
        question: 'Is Glow Getters suitable for very sensitive skin?',
        answer: 'We modify products, peel strengths and device settings for sensitive skin. During consultation, we patch test where needed and build your plan gradually, so your barrier strengthens instead of feeling stripped or irritated.',
      },
    ],
  },
  {
    slug: 'mommy-makeover',
    title: 'Mommy Makeover',
    subtitle: 'Post-Pregnancy Care',
    description: 'A gentle, structured reset for post-pregnancy body, skin and hair, paced kindly around real motherhood.',
    duration: '6-8 sessions',
    image: '/images/signature/mommy-makeover.jpg',
    heroImage: '/images/signature/mommy-makeover.jpg',
    gradient: 'from-[#7A5850] via-[#62413C] to-[#3E2B29]',
    longDescription: 'Motherhood changes your body, skin and energy in ways that diet or facials alone cannot address. The Mommy Makeover brings together body contouring, stretch mark care, C-section scar support, hair recovery and glow facials, sequenced thoughtfully so you feel looked after, not rushed.',
    benefits: [
      'Flatter, supported tummy',
      'Softer stretch marks',
      'Healthier, fuller hair',
      'Rested, glowing skin',
    ],
    process: [
      {
        title: 'Stabilise & Plan',
        description: 'We review delivery history, scars, hair fall, energy levels and schedule, then map realistic priorities together.',
        duration: 'Weeks 1-2',
      },
      {
        title: 'Shape & Repair',
        description: 'Body contouring, stretch mark sessions and scar care start slowly, matched to your healing, feeding and childcare routines.',
        duration: 'Weeks 3-6',
      },
      {
        title: 'Glow & Maintain',
        description: 'Hair growth sessions and glow facials are added, plus home routines, to keep results gentle and sustainable.',
        duration: 'Weeks 7-10',
      },
    ],
    inclusions: [
      { item: '8 sessions', detail: 'Body and skin' },
      { item: 'Home kit', detail: 'Postpartum skincare support' },
      { item: 'Doctor reviews', detail: 'Regular progress check-ins' },
    ],
    idealFor: [
      'New mothers post-delivery',
      'Second or third pregnancies',
      'Body and hair reset',
    ],
    faqs: [
      {
        question: 'When is the right time to start after delivery?',
        answer: 'We usually wait until your gynaecologist clears you for routine activity. Certain treatments start earlier; others, like stronger contouring or peels, are timed carefully around breastfeeding, recovery and your energy levels.',
      },
      {
        question: 'Is the program safe while I am breastfeeding?',
        answer: 'We avoid certain medicines and aggressive fat treatments while you breastfeed. Instead, we focus on gentle contouring, skin health, stretch mark care and nutrition guidance, always coordinated with your obstetrician when needed.',
      },
      {
        question: 'Will I get my pre-pregnancy body back completely?',
        answer: 'Every body responds differently. Our aim is to improve comfort, shape and confidence rather than chase old photos. We celebrate strength, support healing and focus on realistic, healthy, sustainable change.',
      },
      {
        question: 'Can I bring my baby along for sessions?',
        answer: 'Many new mothers do. We try to schedule convenient slots and keep visits efficient. However, for longer procedures, having a caregiver accompany you often makes the experience calmer and easier.',
      },
    ],
  },
  {
    slug: 'bridal-beauty',
    title: 'Bridal Beauty',
    subtitle: 'Pre-Wedding Glow',
    description: 'Step-by-step care for clear, even, and luminous skin on your big day.',
    duration: '3-6 months',
    image: '/images/signature/bridal-beauty.jpg',
    heroImage: '/images/signature/bridal-beauty.jpg',
    gradient: 'from-[#635850] via-[#4D453E] to-[#36302B]', // Taupe
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
    idealFor: ['Brides', 'Grooms', 'Wedding parties'],
    faqs: [
      {
        question: "How far in advance should I start?",
        answer: "Ideally, start 3-6 months before your wedding. This gives us time to address any active skin issues first and then focus on achieving that perfect glow without rushing."
      },
      {
        question: "What if I have a breakout close to my wedding?",
        answer: "We include emergency support as part of the program. If you experience a last-minute breakout, contact us immediately and we will provide same-day or next-day solutions."
      },
      {
        question: "Does the program include body treatments?",
        answer: "Yes! The Bridal Beauty program covers face, neck, back, and hands. We can also add specific treatments for areas that will be visible in your wedding outfit."
      },
      {
        question: "Can my partner also do this program?",
        answer: "Of course! We offer Bridal Beauty for grooms too. Many couples do the program together, which can be a lovely pre-wedding bonding experience."
      }
    ]
  },
  {
    slug: 'rewind',
    title: 'Rewind',
    subtitle: 'Anti-Aging',
    description: 'Target lines and loss of firmness with advanced anti-aging solutions.',
    duration: '4-8 sessions',
    image: '/images/signature/rewind.jpg',
    heroImage: '/images/signature/rewind.jpg',
    gradient: 'from-[#574F48] via-[#443D38] to-[#2E2926]', // Espresso
    longDescription: "Age is just a number, but looking tired doesn't have to be. The Rewind program combines non-surgical lifting, volume restoration, and skin resurfacing to subtly turn back the clock, giving you a refreshed, rested appearance without surgery.",
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
    idealFor: ['Signs of aging', 'Sagging skin', 'Deep lines'],
    faqs: [
      {
        question: "Will I look natural or overdone?",
        answer: "Our philosophy is subtle enhancement, not dramatic change. The goal is to look like a refreshed, well-rested version of yourself - not a different person."
      },
      {
        question: "How long do results last?",
        answer: "Results vary by treatment. Skin tightening effects can last 1-2 years, while fillers typically last 6-18 months. We include a maintenance plan to help you preserve results."
      },
      {
        question: "Is there significant downtime?",
        answer: "Most treatments have minimal downtime. You may have slight swelling or redness for 1-2 days after certain procedures, but nothing that prevents normal activities."
      },
      {
        question: "At what age should I start anti-aging treatments?",
        answer: "Prevention is easier than correction. Many people start in their late 20s to early 30s with preventive treatments. However, the Rewind program benefits anyone noticing signs of aging."
      }
    ]
  },
  {
    slug: 'signature-reset',
    title: 'Signature Reset',
    subtitle: 'Complete Revival',
    description: 'Clinic-exclusive protocol for instant luminosity and lasting results.',
    duration: '3-5 sessions',
    image: '/images/signature/signature-reset.jpg',
    heroImage: '/images/signature/signature-reset.jpg',
    gradient: 'from-[#5A524A] via-[#45403A] to-[#302C28]', // Warm Charcoal
    longDescription: "Our namesake program for when you need a complete overhaul. Whether it's from stress, travel, or neglect, the Signature Reset detoxifies, nourishes, and re-energizes your skin using our proprietary blend of therapies.",
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
    idealFor: ['Burnout recovery', 'Frequent travelers', 'Special occasions'],
    faqs: [
      {
        question: "What makes this different from a regular facial?",
        answer: "The Signature Reset is a medical-grade, multi-modality treatment that works both inside and out. It includes IV therapy for internal nourishment, lymphatic drainage, and advanced skin treatments - far beyond what a spa facial offers."
      },
      {
        question: "How quickly will I see results?",
        answer: "You will notice immediate improvements in skin vitality and energy levels. This is our express program, designed for those who need visible results quickly for a special occasion or recovery."
      },
      {
        question: "Is IV therapy safe?",
        answer: "Yes, our IV drips are administered by trained medical professionals using sterile techniques. We customize the nutrient blend based on your specific needs and health profile."
      },
      {
        question: "Can I do this as a one-time treatment?",
        answer: "Absolutely! While the full program is 3-5 sessions, many clients do a single session before important events. We can also create a regular maintenance schedule if you enjoy the results."
      }
    ]
  }
];

export function getSignatureProgram(slug: string) {
  return signaturePrograms.find((p) => p.slug === slug);
}

