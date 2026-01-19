import { MetadataRoute } from 'next'

/**
 * Pragna Skin Clinic Robots.txt Generator
 * Ensures proper indexing and points to the sitemap.
 * 
 * Target URL: https://pragnaskinclinic.com/robots.txt
 */

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: [
                '/api/',      // Exclude API routes
                '/admin/',    // Future proofing
                '/test/',     // Future proofing
            ],
        },
        sitemap: 'https://pragnaskinclinic.com/sitemap.xml',
    }
}
