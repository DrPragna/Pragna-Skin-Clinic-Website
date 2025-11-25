'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { conditions } from '@/lib/navigationData';

/**
 * CONDITIONS SECTION - Tabbed by Category
 * 
 * Design Philosophy:
 * - Skin, Hair, Body, Wellness as clickable tabs
 * - Clean card grid for each category
 * - Links to individual condition pages
 */

// Map groups to pillars for cleaner tabs
const categoryTabs = [
  { id: 'skin', label: 'Skin', group: 'Face & Skin' },
  { id: 'hair', label: 'Hair', group: 'Hair & Scalp' },
  { id: 'body', label: 'Body', group: 'Body Shape & Texture' },
  { id: 'wellness', label: 'Wellness', group: 'Other Concerns' },
];

// Get conditions for each group
const getConditionsByGroup = (group: string) => {
  return conditions.filter(c => c.group === group);
};

export default function Conditions() {
  const [activeTab, setActiveTab] = useState('skin');
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const activeCategory = categoryTabs.find(t => t.id === activeTab);
  const activeConditions = activeCategory ? getConditionsByGroup(activeCategory.group) : [];

  return (
    <section 
      id="conditions"
      ref={containerRef}
      className="relative py-20 lg:py-32 bg-beige-warm overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-maroon/10 to-transparent" />

      <div className="section-container relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <span className="w-8 h-px bg-maroon/40" />
            <span className="text-maroon font-medium tracking-[0.2em] uppercase text-xs">
              What We Treat
            </span>
            <span className="w-8 h-px bg-maroon/40" />
          </motion.span>
          
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: 80 }}
              animate={isInView ? { y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl lg:text-5xl font-display text-charcoal"
            >
              Common concerns{' '}
              <span className="italic text-maroon">we help with</span>
            </motion.h2>
          </div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-charcoal/60 mt-4 max-w-xl mx-auto"
          >
            From stubborn acne to pigmentation and hair loss, we treat a wide spectrum 
            of concerns with personalized plans tailored to your skin type, lifestyle, and goals.
          </motion.p>
        </div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex bg-cream rounded-full p-1.5 shadow-soft">
            {categoryTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-6 lg:px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'text-cream'
                    : 'text-charcoal/60 hover:text-charcoal'
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-maroon rounded-full"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Conditions Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6"
          >
            {activeConditions.map((condition, index) => (
              <motion.div
                key={condition.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Link
                  href={`/conditions/${condition.slug}`}
                  className="group block p-6 bg-cream rounded-2xl border border-transparent hover:border-maroon/10 hover:shadow-soft transition-all duration-300"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-display text-lg text-charcoal group-hover:text-maroon transition-colors">
                          {condition.name}
                        </h3>
                        {condition.isTopConcern && (
                          <span className="px-2 py-0.5 bg-maroon/10 text-maroon text-xs rounded-full uppercase tracking-wider">
                            Popular
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-charcoal/50 leading-relaxed">
                        {condition.subtitle}
                      </p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-maroon/5 flex items-center justify-center flex-shrink-0 group-hover:bg-maroon group-hover:text-cream transition-all duration-300">
                      <svg 
                        className="w-4 h-4" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 text-center"
        >
          <Link 
            href="/conditions"
            className="inline-flex items-center gap-2 text-maroon font-medium hover:gap-3 transition-all duration-300"
          >
            <span>View all conditions</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
