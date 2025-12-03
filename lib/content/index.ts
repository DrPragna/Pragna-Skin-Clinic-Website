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

import { TreatmentFamilyContent, SubTreatmentContent, ConditionContent } from '@/lib/navigationData';

// ============================================
// CONDITION CONTENT IMPORTS
// ============================================
import { acneBreakoutsContent } from './conditions/acne-breakouts';
import { acneScarsContent } from './conditions/acne-scars';
import { darkSpotsTanPigmentationContent } from './conditions/dark-spots-tan-pigmentation';
import { unevenSkinToneTextureContent } from './conditions/uneven-skin-tone-texture';
import { ageingSkinLinesWrinklesContent } from './conditions/ageing-skin-lines-wrinkles';
import { darkCirclesUnderEyeContent } from './conditions/dark-circles-under-eye';
import { rosaceaFacialRednessContent } from './conditions/rosacea-facial-redness';
import { molesWartsSkinTagsContent } from './conditions/moles-warts-skin-tags';
import { tattooInkPigmentRemovalContent } from './conditions/tattoo-ink-pigment-removal';
import { hairFallThinningHairContent } from './conditions/hair-fall-thinning-hair';

// ============================================
// TREATMENT FAMILY CONTENT IMPORTS
// ============================================
import { laserHairReductionContent } from './treatment-families/laser-hair-reduction';
import { acneAcneScarSolutionsContent } from './treatment-families/acne-acne-scar-solutions';
import { antiAgeingTighteningContouringContent } from './treatment-families/anti-ageing-tightening-contouring';
import { pigmentationTanningGlowContent } from './treatment-families/pigmentation-tanning-glow';
import { advancedFacialsBoostersContent } from './treatment-families/advanced-facials-boosters';
import { hairGrowthScalpTreatmentsFamilyContent } from './treatment-families/hair-growth-scalp-treatments';
import { bodyContouringFatReductionFamilyContent } from './treatment-families/body-contouring-fat-reduction';
import { stretchMarkBodyScarRevisionFamilyContent } from './treatment-families/stretch-mark-body-scar-revision';
import { wellnessIvDripsCorrectiveFamilyContent } from './treatment-families/wellness-iv-drips-corrective';

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

// Anti-Ageing, Tightening & Contouring family
import { fineLinesWrinklesTreatmentContent } from './sub-treatments/fine-lines-wrinkles-treatment';
import { faceNeckSkinTighteningContent } from './sub-treatments/face-neck-skin-tightening';
import { jawlineChinContouringContent } from './sub-treatments/jawline-chin-contouring';
import { neckLinesTreatmentContent } from './sub-treatments/neck-lines-treatment';
import { underEyeRejuvenationContent } from './sub-treatments/under-eye-rejuvenation';
import { handDecolleteRejuvenationContent } from './sub-treatments/hand-decollete-rejuvenation';

// Pigmentation, Tanning & Glow family
import { pigmentationDarkSpotTreatmentContent } from './sub-treatments/pigmentation-dark-spot-treatment';
import { melasmaTreatmentContent } from './sub-treatments/melasma-treatment';
import { tanRemovalBrighteningContent } from './sub-treatments/tan-removal-brightening';
import { glowRadianceFacialsContent } from './sub-treatments/glow-radiance-facials';

// Advanced Facials, Boosters & Skin Maintenance family
import { signatureMedifacialsContent } from './sub-treatments/signature-medifacials';
import { hydratingGlowFacialsContent } from './sub-treatments/hydrating-glow-facials';
import { chemicalPeelsContent } from './sub-treatments/chemical-peels';
import { skinBoostersProfhiloContent } from './sub-treatments/skin-boosters-profhilo';
import { personalisedSkinCarePlanContent } from './sub-treatments/personalised-skin-care-plan';

// Hair Growth & Scalp Treatments family
import { hairFallThinningTreatmentContent } from './sub-treatments/hair-fall-thinning-treatment';
import { prpGfcHairGrowthContent } from './sub-treatments/prp-gfc-hair-growth';
import { mesotherapyHairContent } from './sub-treatments/mesotherapy-hair';
import { lowLevelLightTherapyHairContent } from './sub-treatments/low-level-light-therapy-hair';

// Body Contouring & Fat Reduction family
import { tummyLoveHandlesShapingContent } from './sub-treatments/tummy-love-handles-shaping';
import { thighHipContouringContent } from './sub-treatments/thigh-hip-contouring';
import { armFatReductionContent } from './sub-treatments/arm-fat-reduction';
import { doubleChinFatReductionContent } from './sub-treatments/double-chin-fat-reduction';
import { postPregnancyBodyShapingContent } from './sub-treatments/post-pregnancy-body-shaping';

// Stretch Mark & Body Scar Revision family
import { stretchMarkReductionContent } from './sub-treatments/stretch-mark-reduction';
import { cSectionSurgeryScarRevisionContent } from './sub-treatments/c-section-surgery-scar-revision';
import { bodyAcneBodyScarTreatmentContent } from './sub-treatments/body-acne-body-scar-treatment';

// Wellness, IV Drips & Corrective Procedures family
import { ivDripTherapyContent } from './sub-treatments/iv-drip-therapy';
import { mommyMakeoverProgramContent } from './sub-treatments/mommy-makeover-program';
import { excessSweatingTreatmentContent } from './sub-treatments/excess-sweating-treatment';
import { moleWartSkinTagRemovalContent } from './sub-treatments/mole-wart-skin-tag-removal';
import { tattooRemovalContent } from './sub-treatments/tattoo-removal';

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
  'anti-ageing-tightening-contouring': antiAgeingTighteningContouringContent,
  'pigmentation-tanning-glow': pigmentationTanningGlowContent,
  'advanced-facials-boosters': advancedFacialsBoostersContent,
  'hair-growth-scalp-treatments': hairGrowthScalpTreatmentsFamilyContent,
  'body-contouring-fat-reduction': bodyContouringFatReductionFamilyContent,
  'stretch-mark-body-scar-revision': stretchMarkBodyScarRevisionFamilyContent,
  'wellness-iv-drips-corrective': wellnessIvDripsCorrectiveFamilyContent,
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
  
  // Anti-Ageing, Tightening & Contouring
  'fine-lines-wrinkles-treatment': fineLinesWrinklesTreatmentContent,
  'face-neck-skin-tightening': faceNeckSkinTighteningContent,
  'jawline-chin-contouring': jawlineChinContouringContent,
  'neck-lines-treatment': neckLinesTreatmentContent,
  'under-eye-rejuvenation': underEyeRejuvenationContent,
  'hand-decollete-rejuvenation': handDecolleteRejuvenationContent,
  
  // Pigmentation, Tanning & Glow
  'pigmentation-dark-spot-treatment': pigmentationDarkSpotTreatmentContent,
  'melasma-treatment': melasmaTreatmentContent,
  'tan-removal-brightening': tanRemovalBrighteningContent,
  'glow-radiance-facials': glowRadianceFacialsContent,
  
  // Advanced Facials, Boosters & Skin Maintenance
  'signature-medifacials': signatureMedifacialsContent,
  'hydrating-glow-facials': hydratingGlowFacialsContent,
  'chemical-peels': chemicalPeelsContent,
  'skin-boosters-profhilo': skinBoostersProfhiloContent,
  'personalised-skin-care-plan': personalisedSkinCarePlanContent,
  
  // Hair Growth & Scalp Treatments
  'hair-fall-thinning-treatment': hairFallThinningTreatmentContent,
  'prp-gfc-hair-growth': prpGfcHairGrowthContent,
  'mesotherapy-hair': mesotherapyHairContent,
  'low-level-light-therapy-hair': lowLevelLightTherapyHairContent,
  
  // Body Contouring & Fat Reduction
  'tummy-love-handles-shaping': tummyLoveHandlesShapingContent,
  'thigh-hip-contouring': thighHipContouringContent,
  'arm-fat-reduction': armFatReductionContent,
  'double-chin-fat-reduction': doubleChinFatReductionContent,
  'post-pregnancy-body-shaping': postPregnancyBodyShapingContent,
  
  // Stretch Mark & Body Scar Revision
  'stretch-mark-reduction': stretchMarkReductionContent,
  'c-section-surgery-scar-revision': cSectionSurgeryScarRevisionContent,
  'body-acne-body-scar-treatment': bodyAcneBodyScarTreatmentContent,
  
  // Wellness, IV Drips & Corrective Procedures
  'iv-drip-therapy': ivDripTherapyContent,
  'mommy-makeover-program': mommyMakeoverProgramContent,
  'excess-sweating-treatment': excessSweatingTreatmentContent,
  'mole-wart-skin-tag-removal': moleWartSkinTagRemovalContent,
  'tattoo-removal': tattooRemovalContent,
};

// ============================================
// CONDITION CONTENT MAP
// ============================================

/**
 * Map of condition slug -> content
 * Key must match the slug in navigationData.ts
 */
export const conditionContentMap: Record<string, ConditionContent> = {
  'acne-breakouts': acneBreakoutsContent,
  'acne-scars': acneScarsContent,
  'dark-spots-tan-pigmentation': darkSpotsTanPigmentationContent,
  'uneven-skin-tone-texture': unevenSkinToneTextureContent,
  'ageing-skin-lines-wrinkles': ageingSkinLinesWrinklesContent,
  'dark-circles-under-eye': darkCirclesUnderEyeContent,
  'rosacea-facial-redness': rosaceaFacialRednessContent,
  'moles-warts-skin-tags': molesWartsSkinTagsContent,
  'tattoo-ink-pigment-removal': tattooInkPigmentRemovalContent,
  'hair-fall-thinning-hair': hairFallThinningHairContent,
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

/**
 * Get condition content by slug
 * Returns null if content not found (page will use fallback)
 */
export function getConditionContent(slug: string): ConditionContent | null {
  return conditionContentMap[slug] ?? null;
}

/**
 * Check if content exists for a condition
 */
export function hasConditionContent(slug: string): boolean {
  return slug in conditionContentMap;
}
