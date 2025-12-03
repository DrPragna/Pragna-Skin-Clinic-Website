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
    description: 'A layered pre-wedding journey that clears, brightens and refines skin, hair and body gently.',
    duration: '3-6 months',
    image: '/images/signature/bridal-beauty.jpg',
    heroImage: '/images/signature/bridal-beauty.jpg',
    gradient: 'from-[#7A5A4A] via-[#5E4639] to-[#3B2C24]',
    longDescription: "Bridal Beauty is designed to take you from tired and tanned to calm, polished and photo-ready without crash treatments. Over a few months, we combine acne or pigmentation care, glow facials, skin boosters, hair support and body shaping in a sequence that respects your calendar, outfits and rituals.",
    benefits: [
      'Clear, even tone',
      'Lasting bridal glow',
      'Smoother skin texture',
      'Calmer, brighter photographs',
    ],
    process: [
      {
        title: 'Clarify & Calm',
        description: 'We first settle breakouts, tan and sensitivity with gentle treatments and a simplified home routine.',
        duration: 'Month 1-2',
      },
      {
        title: 'Glow & Enhance',
        description: 'Next, medifacials, glow facials and peels brighten tone and refine texture without last-minute surprises.',
        duration: 'Month 2-4',
      },
      {
        title: 'Polish & Protect',
        description: 'Closer to events, we add boosters, under-eye care and body polish while planning safe cut-offs.',
        duration: 'Month 4-6',
      },
    ],
    inclusions: [
      { item: 'Skin plan', detail: 'Face and neck care' },
      { item: 'Hair support', detail: 'Basic bridal hair protocol' },
      { item: 'Body focus', detail: 'Targeted shaping or polish' },
    ],
    idealFor: [
      'Brides and grooms',
      'Engagement and reception',
      'Destination weddings timeline',
    ],
    faqs: [
      {
        question: 'When should I start the Bridal Beauty program?',
        answer: 'Ideally, begin three to six months before your wedding. This allows time to treat deeper concerns like acne or pigmentation calmly, then layer glow sessions closer to events without stressing your skin or schedule.',
      },
      {
        question: 'Can I join if my wedding is next month?',
        answer: 'We can still help, but the focus shifts to safe, quick wins like medifacials and gentle peels. Deeper concerns may need a longer plan that continues even after the main events finish.',
      },
      {
        question: 'Is this program only for brides, not grooms?',
        answer: 'No. Skin, hair and body concerns affect everyone. We customise timelines, intensity and focus areas differently for brides, grooms and families so everyone feels comfortable and confident in shared photographs and functions.',
      },
      {
        question: 'Can I continue parlour facials during the program?',
        answer: "We prefer you pause unplanned parlour facials, steaming and extractions. Instead, we schedule medical facials and peels that match your skin's needs so nothing clashes or overloads your barrier close to important events.",
      },
    ],
  },
  {
    slug: 'rewind',
    title: 'Rewind',
    subtitle: 'Anti-Aging',
    description: 'A focused anti-aging journey to soften lines, firm contours and refresh tired, overworked skin gently.',
    duration: '4-8 sessions',
    image: '/images/signature/rewind.jpg',
    heroImage: '/images/signature/rewind.jpg',
    gradient: 'from-[#6C5A55] via-[#51403B] to-[#362827]',
    longDescription: 'Rewind is for when your face looks more tired than you feel. We combine skin-tightening devices, injectables where appropriate, medifacials, boosters and home routines to address lines, laxity and dullness together. The goal is subtle, believable change that makes colleagues ask if you rested, not what procedure you did.',
    benefits: [
      'Softer facial lines',
      'Firmer face contours',
      'Brighter, smoother skin',
      'Ageing with confidence',
    ],
    process: [
      {
        title: 'Assess & Prioritise',
        description: 'We map lines, volume loss and lifestyle, then agree on priorities and comfortable starting points.',
        duration: 'Week 1-2',
      },
      {
        title: 'Treat & Support',
        description: 'Skin-tightening, injectables, peels and facials are layered gradually while we stabilise barrier and routines.',
        duration: 'Week 3-8',
      },
      {
        title: 'Refine & Maintain',
        description: 'We slow treatment pace, shift to maintenance sessions and adjust actives around seasons, travel and big events.',
        duration: 'Month 3-6',
      },
    ],
    inclusions: [
      { item: '8 sessions', detail: 'Face and neck' },
      { item: 'Booster plan', detail: 'Optional injectables support' },
      { item: 'Home routine', detail: 'Curated anti-ageing kit' },
    ],
    idealFor: [
      'Fine lines and laxity',
      'Post-40 skin reset',
      'Photo-conscious professionals',
    ],
    faqs: [
      {
        question: 'Will anti-aging treatments make my face look unnatural?',
        answer: 'Our approach is conservative and layered. We start with structure and skin quality, use small doses and review photos together so changes feel like a fresher version of you, not a different person.',
      },
      {
        question: 'What age is right to start the Rewind program?',
        answer: 'There is no fixed age. We recommend Rewind when you begin noticing lines, laxity or tiredness that bother you in daily life, not just in close-up photographs or under harsh lighting.',
      },
      {
        question: 'How long will the results of Rewind last?',
        answer: 'Longevity depends on lifestyle, sun exposure and chosen treatments. Many injectable and tightening results hold several months or longer, after which spaced maintenance keeps improvements steady instead of dropping suddenly.',
      },
      {
        question: 'Can I do this program if I am new to treatments?',
        answer: 'Yes. We explain options slowly, start with low-intensity procedures and pause whenever you need. You always control the pace, and every step is discussed before we move forward.',
      },
    ],
  },
  {
    slug: 'signature-reset',
    title: 'Signature Reset',
    subtitle: 'Complete Revival',
    description: 'A complete inside-out reset combining wellness drips, skin, hair and body care for recovery seasons.',
    duration: '3-5 sessions',
    image: '/images/signature/signature-reset.jpg',
    heroImage: '/images/signature/signature-reset.jpg',
    gradient: 'from-[#5F554F] via-[#463A34] to-[#2F2521]',
    longDescription: 'Signature Reset is for phases when life has felt heavy—long work stretches, illness, stress or big changes. We blend IV drips, medifacials, body contouring, hair support and simple nutrition guidance to gently recharge you. The focus is sustainable recovery, not dramatic overnight transformation or impossible, short-term goals.',
    benefits: [
      'Renewed overall energy',
      'Fresher face and eyes',
      'Supported hair and body',
      'Structured self-care rhythm',
    ],
    process: [
      {
        title: 'Review & Reset',
        description: 'We map stress, sleep, skin, hair and weight, then outline realistic goals and priorities.',
        duration: 'Week 1',
      },
      {
        title: 'Treat & Restore',
        description: 'IV drips, facials, hair sessions and body treatments are spaced to suit work and family life.',
        duration: 'Weeks 2-6',
      },
      {
        title: 'Rebuild & Sustain',
        description: 'We gradually reduce clinic frequency, refine home routines and teach simple habits to protect your progress.',
        duration: 'Weeks 7-10',
      },
    ],
    inclusions: [
      { item: 'Wellness drips', detail: 'Curated IV therapy' },
      { item: 'Skin plan', detail: 'Face and body focus' },
      { item: 'Hair and body', detail: 'Supportive add-on sessions' },
    ],
    idealFor: [
      'Burnout and long stress',
      'Post-illness recovery',
      'Life-change transitions',
    ],
    faqs: [
      {
        question: 'Is Signature Reset a detox or crash program?',
        answer: 'No. We do not believe in extreme detoxes. Signature Reset focuses on realistic improvements in energy, appearance and routines using medically guided drips and treatments paced around your actual responsibilities and health status.',
      },
      {
        question: 'Can I do this while on regular medicines?',
        answer: 'In most cases yes, but we always review your prescriptions and speak with your physician when needed. Certain drips or treatments may be modified or avoided depending on your medical history and current stability.',
      },
      {
        question: 'How is Signature Reset different from Glow Getters?',
        answer: 'Glow Getters mainly targets facial radiance over a short window. Signature Reset looks at the bigger picture—energy, hair, body comfort and routines—making it better suited for recovery phases after demanding periods.',
      },
      {
        question: 'Do I need to change my entire lifestyle immediately?',
        answer: 'We prefer small, sustainable changes over strict rules. Together, we pick two or three habits to start with, then build from there as your energy, mood and confidence improve gradually.',
      },
    ],
  }
];

export function getSignatureProgram(slug: string) {
  return signaturePrograms.find((p) => p.slug === slug);
}

