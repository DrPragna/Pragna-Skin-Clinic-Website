/**
 * Navigation Data Structure
 * 
 * Three main content types:
 * 1. Treatment Families - Category pages (e.g., "Laser Hair Reduction")
 * 2. Sub-Treatments - Specific treatment pages (e.g., "Underarm Laser Hair Reduction")
 * 3. Conditions - Problem-focused pages (e.g., "Acne & Breakouts")
 * 
 * Relationships:
 * - Treatment Family → has many Sub-Treatments
 * - Condition → links to relevant Treatment Families/Sub-Treatments
 * - Sub-Treatment → belongs to a Treatment Family, relates to Conditions
 */

// ============================================
// TREATMENT FAMILIES (Base Data)
// ============================================
export interface TreatmentFamily {
  slug: string;
  name: string;
  pillar: 'Skin' | 'Hair' | 'Body' | 'Wellness';
  summary: string;
  subTreatments: SubTreatment[];
}

export interface SubTreatment {
  slug: string;
  name: string;
  description: string;
  image?: string; // Placeholder image URL
  relatedConditions?: string[]; // condition slugs
}

export const treatmentFamilies: TreatmentFamily[] = [
  // SKIN PILLAR
  {
    slug: 'acne-acne-scar-solutions',
    name: 'Acne & Acne Scar Solutions',
    pillar: 'Skin',
    summary: 'Comprehensive treatments to control active acne, heal breakouts, and restore smooth skin texture.',
    subTreatments: [
      { 
        slug: 'active-acne-treatment', 
        name: 'Active Acne Treatment', 
        description: 'Control ongoing breakouts and prevent new pimples', 
        relatedConditions: ['acne-breakouts'] 
      },
      { 
        slug: 'acne-scar-treatment', 
        name: 'Acne Scar Treatment', 
        description: 'Reduce pits, dents and uneven texture from past acne', 
        relatedConditions: ['acne-scars'] 
      },
      { 
        slug: 'post-acne-marks-redness', 
        name: 'Post-Acne Marks & Redness', 
        description: 'Fade dark spots and redness left after pimples heal', 
        relatedConditions: ['acne-breakouts', 'acne-scars'] 
      },
      { 
        slug: 'teen-acne-treatment', 
        name: 'Teen Acne Treatment', 
        description: 'Gentle, age-appropriate care for adolescent skin', 
        relatedConditions: ['acne-breakouts'] 
      },
    ]
  },
  {
    slug: 'pigmentation-tanning-glow',
    name: 'Pigmentation, Tanning & Glow Treatments',
    pillar: 'Skin',
    summary: 'Brighten uneven skin, reduce dark patches, and restore a natural, healthy glow.',
    subTreatments: [
      { slug: 'pigmentation-dark-spot-treatment', name: 'Pigmentation & Dark Spot Treatment', description: 'Target stubborn brown spots and uneven patches', relatedConditions: ['dark-spots-tan-pigmentation'] },
      { slug: 'melasma-treatment', name: 'Melasma Treatment', description: 'Specialised care for hormonal pigmentation', relatedConditions: ['dark-spots-tan-pigmentation'] },
      { slug: 'tan-removal-brightening', name: 'Tan Removal & Brightening', description: 'Reverse sun damage and restore even tone', relatedConditions: ['dark-spots-tan-pigmentation', 'uneven-skin-tone-texture'] },
      { slug: 'glow-radiance-facials', name: 'Glow & Radiance Facials', description: 'Instant luminosity and hydration boost', relatedConditions: ['uneven-skin-tone-texture'] },
    ]
  },
  {
    slug: 'anti-ageing-tightening-contouring',
    name: 'Anti-Ageing, Tightening & Contouring',
    pillar: 'Skin',
    summary: 'Turn back time with treatments that lift, firm, and restore youthful definition.',
    subTreatments: [
      { slug: 'fine-lines-wrinkles-treatment', name: 'Fine Lines & Wrinkles Treatment', description: 'Smooth expression lines and creases', relatedConditions: ['ageing-skin-lines-wrinkles'] },
      { slug: 'face-neck-skin-tightening', name: 'Face & Neck Skin Tightening', description: 'Lift and firm sagging skin non-surgically', relatedConditions: ['ageing-skin-lines-wrinkles', 'neck-lines-sagging-neck'] },
      { slug: 'jawline-chin-contouring', name: 'Jawline & Chin Contouring', description: 'Define and sculpt your lower face', relatedConditions: ['double-chin-jawline-fullness'] },
      { slug: 'neck-lines-treatment', name: 'Neck Lines Treatment', description: 'Reduce horizontal lines and crepey texture', relatedConditions: ['neck-lines-sagging-neck'] },
      { slug: 'under-eye-rejuvenation', name: 'Under-Eye Rejuvenation', description: 'Refresh tired, hollow or dark under-eyes', relatedConditions: ['dark-circles-under-eye'] },
      { slug: 'hand-decollete-rejuvenation', name: 'Hand & Décolleté Rejuvenation', description: 'Restore youthful appearance to hands and chest', relatedConditions: ['ageing-skin-lines-wrinkles'] },
    ]
  },
  {
    slug: 'advanced-facials-boosters',
    name: 'Advanced Facials, Boosters & Skin Maintenance',
    pillar: 'Skin',
    summary: 'Medical-grade facials and skin boosters that go beyond the surface for lasting results.',
    subTreatments: [
      { slug: 'signature-medifacials', name: 'Signature Medifacials', description: 'Customised clinical facials for your skin goals', relatedConditions: ['uneven-skin-tone-texture'] },
      { slug: 'hydrating-glow-facials', name: 'Hydrating & Glow Facials', description: 'Deep moisture and instant radiance', relatedConditions: ['uneven-skin-tone-texture'] },
      { slug: 'chemical-peels', name: 'Chemical Peels', description: 'Controlled exfoliation for renewal and clarity', relatedConditions: ['acne-breakouts', 'dark-spots-tan-pigmentation', 'uneven-skin-tone-texture'] },
      { slug: 'skin-boosters-profhilo', name: 'Skin Boosters & Profhilo', description: 'Injectable hydration for supple, bouncy skin', relatedConditions: ['ageing-skin-lines-wrinkles'] },
      { slug: 'personalised-skin-care-plan', name: 'Personalised Skin-Care Plan', description: 'A tailored home routine designed by dermatologists', relatedConditions: [] },
    ]
  },
  
  // HAIR PILLAR
  {
    slug: 'laser-hair-reduction',
    name: 'Laser Hair Reduction',
    pillar: 'Hair',
    summary: 'Long-lasting hair reduction using safe, advanced laser technology customised for your skin.',
    subTreatments: [
      { slug: 'full-body-laser-hair-reduction', name: 'Full Body Laser Hair Reduction', description: 'Comprehensive treatment for all major body areas', relatedConditions: ['unwanted-facial-body-hair'] },
      { slug: 'facial-hair-reduction', name: 'Facial Hair Reduction', description: 'Smooth, hair-free face and sideburns', relatedConditions: ['unwanted-facial-body-hair'] },
      { slug: 'upper-lip-chin-hair-reduction', name: 'Upper Lip & Chin Hair Reduction', description: 'Precise treatment for delicate facial zones', relatedConditions: ['unwanted-facial-body-hair'] },
      { slug: 'underarm-hair-reduction', name: 'Underarm Hair Reduction', description: 'Freedom from constant shaving or waxing', relatedConditions: ['unwanted-facial-body-hair'] },
      { slug: 'bikini-brazilian-hair-reduction', name: 'Bikini & Brazilian Hair Reduction', description: 'Private, comfortable intimate area treatment', relatedConditions: ['unwanted-facial-body-hair'] },
      { slug: 'arms-legs-hair-reduction', name: 'Arms & Legs Hair Reduction', description: 'Silky smooth limbs year-round', relatedConditions: ['unwanted-facial-body-hair'] },
      { slug: 'back-chest-hair-reduction', name: 'Back & Chest Hair Reduction', description: 'Clean, confident look for men', relatedConditions: ['unwanted-facial-body-hair'] },
    ]
  },
  {
    slug: 'hair-growth-scalp-treatments',
    name: 'Hair Growth & Scalp Treatments',
    pillar: 'Hair',
    summary: 'Science-backed treatments to slow hair loss, stimulate regrowth, and improve scalp health.',
    subTreatments: [
      { slug: 'hair-fall-thinning-treatment', name: 'Hair Fall & Thinning Treatment', description: 'Comprehensive approach to reduce shedding', relatedConditions: ['hair-fall-thinning-hair'] },
      { slug: 'prp-gfc-hair-growth', name: 'PRP / GFC for Hair Growth', description: 'Use your body\'s growth factors to revive follicles', relatedConditions: ['hair-fall-thinning-hair'] },
      { slug: 'mesotherapy-hair', name: 'Mesotherapy for Hair', description: 'Nutrient injections directly to the scalp', relatedConditions: ['hair-fall-thinning-hair'] },
      { slug: 'low-level-light-therapy-hair', name: 'Low-Level Light Therapy for Hair', description: 'Non-invasive light stimulation for density', relatedConditions: ['hair-fall-thinning-hair'] },
    ]
  },
  
  // BODY PILLAR
  {
    slug: 'body-contouring-fat-reduction',
    name: 'Body Contouring & Fat Reduction',
    pillar: 'Body',
    summary: 'Non-surgical solutions to sculpt, slim, and reshape stubborn problem areas.',
    subTreatments: [
      { slug: 'tummy-love-handles-shaping', name: 'Tummy & Love Handles Shaping', description: 'Target midsection bulges that resist diet and exercise', relatedConditions: ['stubborn-fat-body-shaping'] },
      { slug: 'thigh-hip-contouring', name: 'Thigh & Hip Contouring', description: 'Slim and smooth your lower body silhouette', relatedConditions: ['stubborn-fat-body-shaping'] },
      { slug: 'arm-fat-reduction', name: 'Arm Fat Reduction', description: 'Tone and tighten upper arms', relatedConditions: ['stubborn-fat-body-shaping'] },
      { slug: 'double-chin-fat-reduction', name: 'Double Chin Fat Reduction', description: 'Define your jawline without surgery', relatedConditions: ['double-chin-jawline-fullness'] },
      { slug: 'post-pregnancy-body-shaping', name: 'Post-Pregnancy Body Shaping', description: 'Restore your pre-baby confidence', relatedConditions: ['stubborn-fat-body-shaping', 'stretch-marks'] },
    ]
  },
  {
    slug: 'stretch-mark-body-scar-revision',
    name: 'Stretch Mark & Body Scar Revision',
    pillar: 'Body',
    summary: 'Advanced treatments to fade stretch marks and improve the appearance of body scars.',
    subTreatments: [
      { slug: 'stretch-mark-reduction', name: 'Stretch Mark Reduction', description: 'Minimise lines from growth, weight change or pregnancy', relatedConditions: ['stretch-marks'] },
      { slug: 'c-section-surgery-scar-revision', name: 'C-Section & Surgery Scar Revision', description: 'Improve the look of surgical scars', relatedConditions: ['stretch-marks'] },
      { slug: 'body-acne-body-scar-treatment', name: 'Body Acne & Body Scar Treatment', description: 'Clear breakouts and scars on back, chest and shoulders', relatedConditions: ['acne-breakouts', 'acne-scars'] },
    ]
  },
  
  // WELLNESS PILLAR
  {
    slug: 'wellness-iv-drips-corrective',
    name: 'Wellness, IV Drips & Corrective Procedures',
    pillar: 'Wellness',
    summary: 'Holistic wellness treatments and targeted corrective procedures for overall wellbeing.',
    subTreatments: [
      { slug: 'iv-drip-therapy', name: 'IV Drip Therapy', description: 'Vitamin and hydration infusions for energy and glow', relatedConditions: [] },
      { slug: 'mommy-makeover-program', name: 'Mommy Makeover Program', description: 'Comprehensive post-pregnancy rejuvenation', relatedConditions: ['stretch-marks', 'stubborn-fat-body-shaping'] },
      { slug: 'excess-sweating-treatment', name: 'Excess Sweating Treatment', description: 'Control hyperhidrosis in underarms, palms or feet', relatedConditions: ['excessive-sweating'] },
      { slug: 'mole-wart-skin-tag-removal', name: 'Mole, Wart & Skin Tag Removal', description: 'Safe removal of unwanted skin growths', relatedConditions: ['moles-warts-skin-tags'] },
      { slug: 'tattoo-removal', name: 'Tattoo Removal', description: 'Laser-based ink removal with minimal scarring', relatedConditions: ['tattoo-ink-pigment-removal'] },
    ]
  },
];

// ============================================
// CONDITIONS (Base Data)
// ============================================
export interface Condition {
  slug: string;
  name: string;
  subtitle: string;
  group: 'Skin' | 'Hair' | 'Body' | 'Wellness';
  isTopConcern?: boolean;
  relatedTreatmentFamilies: string[]; // family slugs
}

export const conditions: Condition[] = [
  // Skin (formerly Face & Skin)
  { 
    slug: 'acne-breakouts',
    name: 'Acne & Breakouts', 
    subtitle: 'Pimples, whiteheads or cystic acne that keep coming back',
    group: 'Skin',
    isTopConcern: true,
    relatedTreatmentFamilies: ['acne-acne-scar-solutions', 'advanced-facials-boosters']
  },
  { 
    slug: 'acne-scars',
    name: 'Acne Scars', 
    subtitle: 'Marks, dents or uneven skin left behind after acne',
    group: 'Skin',
    isTopConcern: true,
    relatedTreatmentFamilies: ['acne-acne-scar-solutions']
  },
  { 
    slug: 'dark-spots-tan-pigmentation',
    name: 'Dark Spots, Tan & Pigmentation', 
    subtitle: 'Brown patches, tanning or uneven dark areas on the skin',
    group: 'Skin',
    isTopConcern: true,
    relatedTreatmentFamilies: ['pigmentation-tanning-glow', 'advanced-facials-boosters']
  },
  { 
    slug: 'uneven-skin-tone-texture',
    name: 'Uneven Skin Tone & Texture', 
    subtitle: 'Skin that looks patchy, rough or has visible pores',
    group: 'Skin',
    relatedTreatmentFamilies: ['pigmentation-tanning-glow', 'advanced-facials-boosters']
  },
  { 
    slug: 'ageing-skin-lines-wrinkles',
    name: 'Ageing Skin, Lines & Wrinkles', 
    subtitle: 'Fine lines, wrinkles and loss of firmness over time',
    group: 'Skin',
    relatedTreatmentFamilies: ['anti-ageing-tightening-contouring', 'advanced-facials-boosters']
  },
  { 
    slug: 'dark-circles-under-eye',
    name: 'Dark Circles & Under-Eye Concerns', 
    subtitle: 'Tired, hollow or dark-looking under-eye area',
    group: 'Skin',
    relatedTreatmentFamilies: ['anti-ageing-tightening-contouring']
  },
  { 
    slug: 'rosacea-facial-redness',
    name: 'Rosacea & Facial Redness', 
    subtitle: 'Constant redness, flushing or visible vessels on the face',
    group: 'Skin',
    relatedTreatmentFamilies: ['advanced-facials-boosters']
  },
  { 
    slug: 'moles-warts-skin-tags',
    name: 'Moles, Warts & Skin Tags', 
    subtitle: 'Raised skin growths you want evaluated or removed',
    group: 'Wellness',
    relatedTreatmentFamilies: ['wellness-iv-drips-corrective']
  },
  { 
    slug: 'tattoo-ink-pigment-removal',
    name: 'Tattoo & Ink Pigment Removal', 
    subtitle: 'Fading or removing tattoo ink you no longer want',
    group: 'Wellness',
    relatedTreatmentFamilies: ['wellness-iv-drips-corrective']
  },
  
  // Hair (formerly Hair & Scalp)
  { 
    slug: 'hair-fall-thinning-hair',
    name: 'Hair Fall & Thinning Hair', 
    subtitle: 'Increased hair shedding or visibly reduced hair volume',
    group: 'Hair',
    isTopConcern: true,
    relatedTreatmentFamilies: ['hair-growth-scalp-treatments']
  },
  { 
    slug: 'unwanted-facial-body-hair',
    name: 'Unwanted Facial & Body Hair', 
    subtitle: 'Hair growth in areas you prefer to keep smooth',
    group: 'Hair',
    relatedTreatmentFamilies: ['laser-hair-reduction']
  },
  
  // Body (formerly Body Shape & Texture)
  { 
    slug: 'double-chin-jawline-fullness',
    name: 'Double Chin & Jawline Fullness', 
    subtitle: 'Fullness under the chin or a softer, less-defined jawline',
    group: 'Body',
    relatedTreatmentFamilies: ['anti-ageing-tightening-contouring', 'body-contouring-fat-reduction']
  },
  { 
    slug: 'neck-lines-sagging-neck',
    name: 'Neck Lines & Sagging Neck', 
    subtitle: 'Horizontal lines or loosening skin around the neck',
    group: 'Body',
    relatedTreatmentFamilies: ['anti-ageing-tightening-contouring']
  },
  { 
    slug: 'stretch-marks',
    name: 'Stretch Marks', 
    subtitle: 'Thin lines on the skin after growth, weight change or pregnancy',
    group: 'Body',
    relatedTreatmentFamilies: ['stretch-mark-body-scar-revision']
  },
  { 
    slug: 'stubborn-fat-body-shaping',
    name: 'Stubborn Fat & Body Shaping', 
    subtitle: 'Pockets of fat that stay despite healthy habits',
    group: 'Body',
    relatedTreatmentFamilies: ['body-contouring-fat-reduction']
  },
  
  // Wellness (formerly Other Concerns)
  { 
    slug: 'excessive-sweating',
    name: 'Excessive Sweating (Hyperhidrosis)', 
    subtitle: 'Sweating more than normal on palms, underarms or other areas',
    group: 'Wellness',
    relatedTreatmentFamilies: ['wellness-iv-drips-corrective']
  },
];

// ============================================
// CONTENT SCHEMAS (For Rich Page Content)
// ============================================

/**
 * Treatment Family Content
 * Used for: /treatments/[familySlug]
 */
export interface TreatmentFamilyContent {
  hero: {
    eyebrow?: string; // New field for the "Side Heading" (e.g. SKIN • RESTORE)
    title: string;
    subtitle: string;
    intro: string;
    image?: string;
  };
  trustIndicators?: {
    value: string;
    label: string;
  }[];
  howItWorks: {
    description: string;
    steps: {
      title: string;
      text: string;
      icon?: string;
    }[];
  };
  whoIsThisFor: {
    headline?: string;
    list: string[];
    image?: string;
  };
  whyPragna?: {
    title: string;
    description: string;
  }[];
  relatedConditionSlugs?: string[];
}

/**
 * Sub-Treatment Content
 * Used for: /treatments/[familySlug]/[subTreatmentSlug]
 */
export interface SubTreatmentContent {
  hero: {
    title: string;
    tagline?: string;
    intro: string;
  };
  quickStats: {
    sessions: string;
    duration: string;
    downtime: string;
    painLevel: string;
  };
  overview?: string;
  isThisForYou: string[];
  process: {
    steps: {
      phase: 'before' | 'during' | 'after';
      title: string;
      description: string;
    }[];
  };
  results: {
    timeline: string;
    recovery: string;
    image?: string;
  };
  faqs: {
    question: string;
    answer: string;
  }[];
}

/**
 * Condition Content
 * Used for: /conditions/[slug]
 */
export interface ConditionContent {
  hero: {
    title: string;
    empathyStatement: string;
    intro?: string;
    image?: string;
  };
  symptoms: {
    headline?: string;
    list: string[];
  };
  quickStats?: {
    stat: string;
    text: string;
  }[];
  understanding: {
    whatItIs: string;
    whyItHappens: string[];
  };
  pragnaApproach?: {
    description: string;
  };
  recommendedTreatments: {
    type: 'family' | 'sub-treatment';
    slug: string;
    name: string;
    bestFor: string;
  }[];
  timeline?: {
    steps: { title: string; description: string }[];
  };
  faqs: {
    question: string;
    answer: string;
  }[];
  selfCareTips?: string[];
  relatedConditionSlugs?: string[];
}

// ============================================
// HELPER FUNCTIONS
// ============================================

// Get treatment family by slug
export function getTreatmentFamily(slug: string): TreatmentFamily | undefined {
  return treatmentFamilies.find(f => f.slug === slug);
}

// Get sub-treatment by slug (searches all families)
export function getSubTreatment(slug: string): { subTreatment: SubTreatment; family: TreatmentFamily } | undefined {
  for (const family of treatmentFamilies) {
    const subTreatment = family.subTreatments.find(st => st.slug === slug);
    if (subTreatment) {
      return { subTreatment, family };
    }
  }
  return undefined;
}

// Get condition by slug
export function getCondition(slug: string): Condition | undefined {
  return conditions.find(c => c.slug === slug);
}

// Get all treatment families for a condition
export function getTreatmentFamiliesForCondition(conditionSlug: string): TreatmentFamily[] {
  const condition = getCondition(conditionSlug);
  if (!condition) return [];
  return condition.relatedTreatmentFamilies
    .map(slug => getTreatmentFamily(slug))
    .filter((f): f is TreatmentFamily => f !== undefined);
}

// Get all conditions for a treatment family
export function getConditionsForFamily(familySlug: string): Condition[] {
  return conditions.filter(c => c.relatedTreatmentFamilies.includes(familySlug));
}

// Get conditions grouped by group name
export function getConditionsByGroup(): { group: string; items: Condition[] }[] {
  const groups = ['Skin', 'Hair', 'Body', 'Wellness'];
  return groups.map(group => ({
    group,
    items: conditions.filter(c => c.group === group)
  }));
}

// Get treatment families grouped by pillar
export function getFamiliesByPillar(): { pillar: string; families: TreatmentFamily[] }[] {
  const pillars = ['Skin', 'Hair', 'Body', 'Wellness'];
  return pillars.map(pillar => ({
    pillar,
    families: treatmentFamilies.filter(f => f.pillar === pillar)
  }));
}

// ============================================
// SIGNATURE PROGRAMS NAVIGATION DATA
// ============================================
import { signaturePrograms } from './content/signature-programs';

export const signatureProgramsNav = signaturePrograms.map(program => ({
  name: program.title,
  subtitle: program.subtitle,
  description: program.description,
  duration: program.duration,
  href: `/signature-programs/${program.slug}`,
  image: program.image
}));

// ============================================
// LEGACY SUPPORT (for existing navbar)
// ============================================
export const navigationData = {
  conditions: getConditionsByGroup().map(g => ({
    group: g.group,
    items: g.items.map(c => ({
      name: c.name,
      subtitle: c.subtitle,
      href: `/conditions/${c.slug}`,
      isTopConcern: c.isTopConcern
    }))
  })),
  treatments: getFamiliesByPillar().map(p => ({
    pillar: p.pillar,
    categories: p.families.map(f => ({
      category: f.name,
      slug: f.slug,
      href: `/treatments/${f.slug}`,
      items: f.subTreatments.map(st => ({
        name: st.name,
        href: `/treatments/${f.slug}/${st.slug}`
      }))
    }))
  })),
  signaturePrograms: signatureProgramsNav
};

