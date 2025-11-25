import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/sections/Footer';
import { treatmentFamilies, getSubTreatment, conditions } from '@/lib/navigationData';
import SubTreatmentClientContent from './SubTreatmentClientContent';

// Generate static params for all sub-treatments
export function generateStaticParams() {
  const params: { familySlug: string; subTreatmentSlug: string }[] = [];
  
  for (const family of treatmentFamilies) {
    for (const subTreatment of family.subTreatments) {
      params.push({
        familySlug: family.slug,
        subTreatmentSlug: subTreatment.slug,
      });
    }
  }
  
  return params;
}

// Generate metadata for SEO
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ familySlug: string; subTreatmentSlug: string }> 
}): Promise<Metadata> {
  const { familySlug, subTreatmentSlug } = await params;
  const result = getSubTreatment(subTreatmentSlug);
  
  if (!result || result.family.slug !== familySlug) {
    return { title: 'Treatment Not Found' };
  }

  const { subTreatment, family } = result;
  
  return {
    title: `${subTreatment.name} | ${family.name} | Pragna Skin Clinic`,
    description: `${subTreatment.description}. Professional ${subTreatment.name.toLowerCase()} treatment by expert dermatologists at Pragna Skin Clinic. Safe, effective results.`,
    keywords: [
      subTreatment.name,
      family.name,
      `${subTreatment.name} treatment`,
      `${subTreatment.name} Hyderabad`,
      'dermatologist',
      'skin clinic',
      family.pillar.toLowerCase(),
    ],
    openGraph: {
      title: `${subTreatment.name} Treatment | Pragna Skin Clinic`,
      description: subTreatment.description,
      type: 'website',
    },
  };
}

export default async function SubTreatmentPage({ 
  params 
}: { 
  params: Promise<{ familySlug: string; subTreatmentSlug: string }> 
}) {
  const { familySlug, subTreatmentSlug } = await params;
  const result = getSubTreatment(subTreatmentSlug);
  
  if (!result || result.family.slug !== familySlug) {
    notFound();
  }

  const { subTreatment, family } = result;
  
  // Get related conditions
  const relatedConditions = conditions.filter(c => 
    subTreatment.relatedConditions?.includes(c.slug)
  );
  
  // Get sibling treatments (other treatments in same family)
  const siblingTreatments = family.subTreatments.filter(t => t.slug !== subTreatment.slug);

  // FAQ Schema for SEO
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How many sessions will I need?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Typically 6-8 sessions are recommended, depending on your individual response and goals. Your dermatologist will create a personalised plan during your consultation.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is it painful?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Most patients find the treatment comfortable. You may feel a mild warming or tingling sensation. We use cooling and numbing techniques when needed to ensure your comfort.',
        },
      },
      {
        '@type': 'Question',
        name: 'When will I see results?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Initial improvements may be visible after 2-3 sessions, with full results developing over time. Results continue to improve for several weeks after your treatment course.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is there any downtime?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Minimal to none. Most patients return to normal activities immediately. Some mild redness may occur but typically resolves within a few hours to a day.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is it safe for all skin types?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our treatments are customised for Indian skin types. During your consultation, we assess your skin and select the most appropriate settings and protocols for you.',
        },
      },
    ],
  };

  // Breadcrumb Schema for SEO
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Treatments',
        item: 'https://pragnaskinclinic.com/treatments',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: family.name,
        item: `https://pragnaskinclinic.com/treatments/${family.slug}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: subTreatment.name,
        item: `https://pragnaskinclinic.com/treatments/${family.slug}/${subTreatment.slug}`,
      },
    ],
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      <main className="overflow-x-hidden bg-beige-warm">
        <Navbar />
        
        {/* Pass data to client component for interactive features */}
        <SubTreatmentClientContent 
          subTreatment={subTreatment}
          family={family}
          relatedConditions={relatedConditions}
          siblingTreatments={siblingTreatments}
        />

        <Footer />
      </main>
    </>
  );
}
