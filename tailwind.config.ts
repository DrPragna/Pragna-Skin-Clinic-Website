import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ===========================================
        // PRAGNA SEMANTIC COLOR SYSTEM
        // ===========================================
        // 
        // COLOR MEANINGS:
        // - Maroon (#722B2B): Authority, Medical Trust, CTAs
        // - Terracotta (#EAC7BB): Warmth, Skin, Empathy  
        // - Beige (#FAF4F0): Calm, Background, Breathing Room
        // - Charcoal (#111111): Text, Confidence, Grounding
        // - Dust Red (#C35A4A): Accent, Energy, Highlights
        //
        // PAGE ASSOCIATIONS:
        // - Homepage: Full palette, welcoming warmth
        // - Treatments: Clinical white + maroon authority
        // - Conditions: Empathetic terracotta warmth
        // - Contact: Action-oriented maroon dominance
        // ===========================================

        // Brand Primary - Authority & Trust
        maroon: {
          DEFAULT: '#722B2B',
          light: '#8B3A3A',
          dark: '#5A2222',
        },
        
        // Brand Secondary - Warmth & Skin
        terracotta: {
          DEFAULT: '#EAC7BB',
          light: '#F3D7CD',
          dark: '#D4AFA3',
        },
        
        // Neutrals - Calm & Clinical
        beige: {
          DEFAULT: '#F9F7F6',
          warm: '#FAF4F0',
          cool: '#F5F3F2',
        },
        'beige-warm': '#FAF4F0',
        
        // Text & Grounding
        charcoal: {
          DEFAULT: '#111111',
          light: '#2A2A2A',
          muted: '#666666',
        },
        
        // Accent - Energy
        dust: {
          red: '#C35A4A',
        },
        'dust-red': '#C35A4A',
        
        // Clinical White (for treatment pages)
        clinical: {
          white: '#FFFFFF',
          offwhite: '#FDFCFB',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['DM Serif Display', 'Playfair Display', 'Georgia', 'serif'],
      },
      fontSize: {
        // Fluid typography scale
        'display-xl': ['clamp(3rem, 8vw, 6rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(2.5rem, 6vw, 4.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(2rem, 4vw, 3rem)', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'hero': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'hero-mobile': ['2.25rem', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
      },
      boxShadow: {
        'soft': '0 4px 24px rgba(114, 43, 43, 0.06)',
        'soft-lg': '0 8px 48px rgba(114, 43, 43, 0.08)',
        'soft-xl': '0 16px 64px rgba(114, 43, 43, 0.10)',
        'card': '0 2px 16px rgba(114, 43, 43, 0.04)',
        'card-hover': '0 8px 32px rgba(114, 43, 43, 0.08)',
        'glow': '0 0 40px rgba(114, 43, 43, 0.15)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.6s ease-out forwards',
        'float': 'float 3s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'scale-in': 'scaleIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce-soft': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
