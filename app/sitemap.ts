import { MetadataRoute } from 'next'
import { treatmentFamilies, conditions } from '@/lib/navigationData'
import { signaturePrograms } from '@/lib/content/signature-programs'

/**
 * Pragna Skin Clinic Sitemap Generator
 * Automatically includes all static and dynamic routes.
 * 
 * Target URL: https://www.pragnaskinclinic.com/sitemap.xml
 */

const BASE_URL = 'https://www.pragnaskinclinic.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  
  // 1. Static Pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/conditions`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/treatments`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/signature-programs`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]
  
  // 2. Condition Pages (~16 pages)
  const conditionPages: MetadataRoute.Sitemap = conditions.map(c => ({
    url: `${BASE_URL}/conditions/${c.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))
  
  // 3. Treatment Family Pages (~10 pages)
  const familyPages: MetadataRoute.Sitemap = treatmentFamilies.map(f => ({
    url: `${BASE_URL}/treatments/${f.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))
  
  // 4. Sub-Treatment Pages (~51 pages)
  const subTreatmentPages: MetadataRoute.Sitemap = treatmentFamilies.flatMap(f =>
    f.subTreatments.map(st => ({
      url: `${BASE_URL}/treatments/${f.slug}/${st.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    }))
  )
  
  // 5. Signature Program Pages (~5 pages)
  const programPages: MetadataRoute.Sitemap = signaturePrograms.map(p => ({
    url: `${BASE_URL}/signature-programs/${p.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))
  
  return [
    ...staticPages,
    ...conditionPages,
    ...familyPages,
    ...subTreatmentPages,
    ...programPages,
  ]
}
