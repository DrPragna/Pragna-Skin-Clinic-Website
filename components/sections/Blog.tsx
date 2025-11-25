'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';

/**
 * BLOG - Editorial Card Layout
 * 
 * Design Philosophy:
 * - Magazine-style blog cards
 * - Large featured post
 * - Clean typography
 */

const posts = [
  {
    title: 'The Science Behind Medifacials: Fast Fixes for Your Skin',
    excerpt: 'Discover how medical-grade facials combine active ingredients with professional techniques for instant, visible results.',
    category: 'Treatments',
    date: 'Nov 20, 2025',
    readTime: '5 min read',
    image: '/images/blog/medifacials.jpg',
    featured: true,
  },
  {
    title: 'Turn Back the Clock with Ultrasound Skin Tightening',
    excerpt: 'Non-invasive ultrasound technology is revolutionizing anti-aging treatments. Here\'s what you need to know.',
    category: 'Anti-Aging',
    date: 'Nov 15, 2025',
    readTime: '4 min read',
    image: '/images/blog/ultrasound.jpg',
  },
  {
    title: 'Understanding Melasma: Causes and Treatment Options',
    excerpt: 'Melasma can be stubborn, but with the right approach, clearer skin is possible. Learn about effective treatments.',
    category: 'Skin Care',
    date: 'Nov 10, 2025',
    readTime: '6 min read',
    image: '/images/blog/melasma.jpg',
  },
  {
    title: 'Laser Hair Reduction: Your Complete Guide',
    excerpt: 'Everything you need to know about permanent hair reduction—from preparation to aftercare.',
    category: 'Hair',
    date: 'Nov 5, 2025',
    readTime: '7 min read',
    image: '/images/blog/laser-hair.jpg',
  },
];

export default function Blog() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const featuredPost = posts.find(p => p.featured);
  const regularPosts = posts.filter(p => !p.featured);

  return (
    <section 
      id="blog"
      ref={containerRef}
      className="relative py-24 lg:py-40 bg-cream overflow-hidden"
    >
      <div className="section-container">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 mb-8"
            >
              <span className="w-12 h-px bg-maroon/40" />
              <span className="text-maroon font-medium tracking-[0.3em] uppercase text-xs">
                Insights
              </span>
            </motion.span>
            
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: 100 }}
                animate={isInView ? { y: 0 } : {}}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-display-md font-display text-charcoal"
              >
                From our{' '}
                <span className="italic text-maroon">blog</span>
              </motion.h2>
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 text-maroon font-medium hover:gap-3 transition-all"
            >
              View all articles
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* Blog Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Featured Post */}
          {featuredPost && (
            <motion.article
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="lg:row-span-2"
            >
              <Link href="#" className="group block h-full">
                <div className="h-full bg-beige rounded-3xl overflow-hidden border-2 border-transparent hover:border-maroon/20 hover:shadow-soft-xl transition-all duration-500 hover:-translate-y-2">
                  {/* Image */}
                  <div className="aspect-[4/3] bg-gradient-to-br from-terracotta/30 to-rose-gold/20 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
                      <span className="text-maroon/20 font-display text-xl italic">Add image</span>
                    </div>
                    <div className="absolute inset-0 bg-maroon/0 group-hover:bg-maroon/10 transition-colors duration-500" />
                    
                    {/* Category Badge */}
                    <span className="absolute top-6 left-6 px-4 py-1.5 bg-white/90 backdrop-blur-sm text-maroon text-xs font-medium rounded-full transition-all duration-300 group-hover:bg-maroon group-hover:text-white">
                      {featuredPost.category}
                    </span>
                  </div>
                  
                  {/* Content */}
                  <div className="p-8">
                    <div className="flex items-center gap-4 text-sm text-charcoal/50 mb-4">
                      <span>{featuredPost.date}</span>
                      <span>•</span>
                      <span>{featuredPost.readTime}</span>
                    </div>
                    
                    <h3 className="text-2xl lg:text-3xl font-display text-charcoal group-hover:text-maroon transition-colors duration-300 mb-4">
                      {featuredPost.title}
                    </h3>
                    
                    <p className="text-charcoal/60 leading-relaxed">
                      {featuredPost.excerpt}
                    </p>
                    
                    <div className="mt-6 flex items-center gap-2 text-maroon font-medium">
                      <span>Read article</span>
                      <svg className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          )}

          {/* Regular Posts */}
          <div className="space-y-4">
            {regularPosts.map((post, index) => (
              <motion.article
                key={post.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.1 + index * 0.1,
                  ease: [0.16, 1, 0.3, 1]
                }}
              >
                <Link href="#" className="group flex gap-6 p-4 rounded-2xl border-2 border-transparent hover:border-maroon/15 hover:bg-beige-warm hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1">
                  {/* Thumbnail */}
                  <div className="w-32 h-24 flex-shrink-0 bg-gradient-to-br from-terracotta/20 to-beige rounded-xl overflow-hidden transition-transform duration-300 group-hover:scale-105">
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-maroon/15 text-xs">Image</span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <div className="flex items-center gap-3 text-xs text-charcoal/50 mb-2">
                      <span className="text-maroon font-medium">{post.category}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                    
                    <h3 className="font-display text-lg text-charcoal group-hover:text-maroon transition-colors duration-300 line-clamp-2">
                      {post.title}
                    </h3>
                  </div>
                  
                  {/* Arrow indicator */}
                  <div className="flex-shrink-0 self-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-8 h-8 rounded-full bg-maroon/10 flex items-center justify-center group-hover:bg-maroon transition-colors duration-300">
                      <svg className="w-4 h-4 text-maroon group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
