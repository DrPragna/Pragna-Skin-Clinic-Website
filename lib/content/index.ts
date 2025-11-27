/**
 * Content Loader
 * 
 * Centralized loader for all treatment and sub-treatment content.
 * Import content files here and register them in the maps below.
 * 
 * To add new content:
 * 1. Create the content file in the appropriate folder
 * 2. Import it here
 * 3. Add it to the corresponding map with the slug as key
 */

import { TreatmentFamilyContent, SubTreatmentContent } from '@/lib/navigationData';

// ============================================
// TREATMENT FAMILY CONTENT IMPORTS
// ============================================
import { laserHairReductionContent } from './treatment-families/laser-hair-reduction';
import { acneAcneScarSolutionsContent } from './treatment-families/acne-acne-scar-solutions';

// ============================================
// SUB-TREATMENT CONTENT IMPORTS
// ============================================
// Laser Hair Reduction family
import { fullBodyLaserHairReductionContent } from './sub-treatments/full-body-laser-hair-reduction';
import { facialHairReductionContent } from './sub-treatments/facial-hair-reduction';
import { upperLipChinHairReductionContent } from './sub-treatments/upper-lip-chin-hair-reduction';
import { underarmHairReductionContent } from './sub-treatments/underarm-hair-reduction';
import { bikiniBrazilianHairReductionContent } from './sub-treatments/bikini-brazilian-hair-reduction';
import { armsLegsHairReductionContent } from './sub-treatments/arms-legs-hair-reduction';
import { backChestHairReductionContent } from './sub-treatments/back-chest-hair-reduction';

// Acne & Acne Scar Solutions family
import { activeAcneTreatmentContent } from './sub-treatments/active-acne-treatment';
import { acneScarTreatmentContent } from './sub-treatments/acne-scar-treatment';
import { postAcneMarksRednessContent } from './sub-treatments/post-acne-marks-redness';
import { teenAcneTreatmentContent } from './sub-treatments/teen-acne-treatment';

// ============================================
// CONTENT MAPS
// ============================================

/**
 * Map of treatment family slug -> content
 * Key must match the slug in navigationData.ts
 */
export const treatmentFamilyContentMap: Record<string, TreatmentFamilyContent> = {
  'laser-hair-reduction': laserHairReductionContent,
  'acne-acne-scar-solutions': acneAcneScarSolutionsContent,
  // Add more as content files are created:
  // 'pigmentation-tanning-glow': pigmentationTanningGlowContent,
  // 'anti-ageing-tightening-contouring': antiAgeingTighteningContouringContent,
  // 'advanced-facials-boosters': advancedFacialsBoostersContent,
  // 'hair-growth-scalp-treatments': hairGrowthScalpTreatmentsContent,
  // 'body-contouring-fat-reduction': bodyContouringFatReductionContent,
  // 'stretch-mark-body-scar-revision': stretchMarkBodyScarRevisionContent,
  // 'wellness-iv-drips-corrective': wellnessIvDripsCorrectiveContent,
};

/**
 * Map of sub-treatment slug -> content
 * Key must match the slug in navigationData.ts
 */
export const subTreatmentContentMap: Record<string, SubTreatmentContent> = {
  // Laser Hair Reduction
  'full-body-laser-hair-reduction': fullBodyLaserHairReductionContent,
  'facial-hair-reduction': facialHairReductionContent,
  'upper-lip-chin-hair-reduction': upperLipChinHairReductionContent,
  'underarm-hair-reduction': underarmHairReductionContent,
  'bikini-brazilian-hair-reduction': bikiniBrazilianHairReductionContent,
  'arms-legs-hair-reduction': armsLegsHairReductionContent,
  'back-chest-hair-reduction': backChestHairReductionContent,
  
  // Acne & Acne Scar Solutions
  'active-acne-treatment': activeAcneTreatmentContent,
  'acne-scar-treatment': acneScarTreatmentContent,
  'post-acne-marks-redness': postAcneMarksRednessContent,
  'teen-acne-treatment': teenAcneTreatmentContent,
  
  // Add more as content files are created...
};

// ============================================
// CONTENT GETTERS
// ============================================

/**
 * Get treatment family content by slug
 * Returns null if content not found (page will use fallback)
 */
export function getTreatmentFamilyContent(slug: string): TreatmentFamilyContent | null {
  return treatmentFamilyContentMap[slug] ?? null;
}

/**
 * Get sub-treatment content by slug
 * Returns null if content not found (page will use fallback)
 */
export function getSubTreatmentContent(slug: string): SubTreatmentContent | null {
  return subTreatmentContentMap[slug] ?? null;
}

/**
 * Check if content exists for a treatment family
 */
export function hasTreatmentFamilyContent(slug: string): boolean {
  return slug in treatmentFamilyContentMap;
}

/**
 * Check if content exists for a sub-treatment
 */
export function hasSubTreatmentContent(slug: string): boolean {
  return slug in subTreatmentContentMap;
}

