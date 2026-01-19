import { MetadataRoute } from 'next'

/**
 * Pragna Skin Clinic Robots.txt Generator
 * Ensures proper indexing and points to the sitemap.
 * 
 * Target URL: https://www.pragnaskinclinic.com/robots.txt
 */

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: [
                '/api/',      // Exclude API routes
                '/_next/',    // Exclude Next.js internals
                '/static/',   // Exclude static assets if needed
                '/admin/',    // Future proofing
                '/test/',     // Future proofing
            ],
        },
        sitemap: 'https://www.pragnaskinclinic.com/sitemap.xml',
    }
}
