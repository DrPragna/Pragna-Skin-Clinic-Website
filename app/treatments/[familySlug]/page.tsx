import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { treatmentFamilies, getTreatmentFamily, getConditionsForFamily } from '@/lib/navigationData';
import { getTreatmentFamilyContent } from '@/lib/content';
import TreatmentFamilyClient from './_components/TreatmentFamilyClient';

export function generateStaticParams() {
  return treatmentFamilies.map((family) => ({
    familySlug: family.slug,
  }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ familySlug: string }>
}): Promise<Metadata> {
  const { familySlug } = await params;
  const family = getTreatmentFamily(familySlug);
  const content = getTreatmentFamilyContent(familySlug);

  if (!family) {
    return { title: 'Treatment Not Found' };
  }

  return {
    title: `${family.name} | ${family.pillar} Treatments | Pragna Skin Clinic`,
    description: content?.hero.intro || `${family.summary} Expert ${family.name.toLowerCase()} treatments by qualified dermatologists at Pragna Skin Clinic Hyderabad.`,
    keywords: [
      family.name,
      `${family.name} treatment`,
      `${family.name} Hyderabad`,
      family.pillar.toLowerCase(),
      'dermatologist',
      'skin clinic',
      ...family.subTreatments.map(st => st.name),
    ],
    openGraph: {
      title: `${family.name} | Pragna Skin Clinic`,
      description: content?.hero.intro || family.summary,
      type: 'website',
    },
  };
}

export default async function TreatmentFamilyPage({
  params
}: {
  params: Promise<{ familySlug: string }>
}) {
  const { familySlug } = await params;
  const family = getTreatmentFamily(familySlug);

  if (!family) {
    notFound();
  }

  const relatedConditions = getConditionsForFamily(familySlug);
  const content = getTreatmentFamilyContent(familySlug);

  // Schema data needs to be serialized and passed to client or injected here. 
  // It's better to inject JSON-LD here in the server component for SEO.
  const heroIntro = content?.hero.intro || family.summary;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Treatments', item: 'https://pragnaskinclinic.com/treatments' },
      { '@type': 'ListItem', position: 2, name: family.pillar, item: 'https://pragnaskinclinic.com/treatments' },
      { '@type': 'ListItem', position: 3, name: family.name, item: `https://pragnaskinclinic.com/treatments/${family.slug}` },
    ],
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: family.name,
    description: heroIntro,
    procedureType: 'https://schema.org/CosmeticProcedure',
    howPerformed: 'By qualified dermatologists using advanced technology',
    preparation: 'Initial consultation and skin assessment',
    followup: 'Regular monitoring and aftercare support',
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      
      <TreatmentFamilyClient 
        family={family} 
        content={content} 
        relatedConditions={relatedConditions} 
      />
    </>
  );
}
