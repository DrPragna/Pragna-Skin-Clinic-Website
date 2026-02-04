import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { conditions, getCondition, getTreatmentFamiliesForCondition } from '@/lib/navigationData';
import { getConditionContent } from '@/lib/content';
import ConditionPageClient from './_components/ConditionPageClient';

// ============================================
// PILLAR THEMES (Consistent with Menu)
// ============================================
type ThemeKey = 'Skin' | 'Hair' | 'Body' | 'Wellness' | 'Others';

const THEMES: Record<ThemeKey, {
  gradientFrom: string;
  gradientTo: string;
  textAccent: string;
  textLight: string;
  bgSoft: string;
}> = {
  'Skin': {
    gradientFrom: '#5C2E26',
    gradientTo: '#3A1A15',
    textAccent: '#C28E79',
    textLight: '#F2E8E6',
    bgSoft: '#FFF8F5',
  },
  'Hair': {
    gradientFrom: '#5C4D22',
    gradientTo: '#3D3316',
    textAccent: '#CDAA5C',
    textLight: '#F5F2EB',
    bgSoft: '#FCFBF7',
  },
  'Body': {
    gradientFrom: '#423D33',
    gradientTo: '#2B2822',
    textAccent: '#9E8C6B',
    textLight: '#F2F2EE',
    bgSoft: '#F9F9F6',
  },
  'Wellness': {
    gradientFrom: '#2A3B33',
    gradientTo: '#1B2621',
    textAccent: '#87A896',
    textLight: '#ECF2EE',
    bgSoft: '#F5F9F7',
  },
  'Others': {
    gradientFrom: '#2A3B33',
    gradientTo: '#1B2621',
    textAccent: '#87A896',
    textLight: '#ECF2EE',
    bgSoft: '#F5F9F7',
  }
};

export function generateStaticParams() {
  return conditions.map((condition) => ({
    slug: condition.slug,
  }));
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params;
  const condition = getCondition(slug);
  
  if (!condition) {
    return { title: 'Condition Not Found' };
  }
  
  return {
    title: `${condition.name} Treatment | ${condition.group} | Pragna Skin Clinic`,
    description: `${condition.subtitle}. Expert treatment for ${condition.name.toLowerCase()} by qualified dermatologists at Pragna Skin Clinic Hyderabad.`,
  };
}

export default async function ConditionPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const condition = getCondition(slug);
  
  if (!condition) {
    notFound();
  }

  const relatedFamilies = getTreatmentFamiliesForCondition(slug);
  const content = getConditionContent(slug);
  const theme = THEMES[condition.group as ThemeKey] || THEMES['Others'];

  // Fallback symptoms if no content
  const defaultSymptoms = [
    'Visible symptoms that affect your confidence',
    'The issue keeps returning despite trying products',
    'You notice it getting worse over time',
    'It impacts your daily life or social interactions',
    'You want to understand what is causing it',
    'DIY solutions haven\'t given lasting results',
  ];

  const symptoms = content?.symptoms?.list || defaultSymptoms;

  return (
    <ConditionPageClient 
      condition={condition}
      content={content}
      relatedFamilies={relatedFamilies}
      symptoms={symptoms}
      theme={theme}
    />
  );
}
