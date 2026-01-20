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
        // PRAGNA WORLD-CLASS COLOR SYSTEM
        // ===========================================
        // 
        // DRAMATIC PALETTE:
        // - Deep Black: Authority, Luxury, Drama
        // - Maroon: Medical Trust, Brand Identity
        // - Rose Gold: Premium Accent, Warmth
        // - Cream: Soft Backgrounds, Elegance
        // - Pure White: Clinical, Clean
        // ===========================================

        // Brand Primary - Authority & Trust
        maroon: {
          DEFAULT: '#722B2B',
          light: '#8B3A3A',
          dark: '#5A2222',
          50: '#FAF5F5',
          100: '#F3E8E8',
          200: '#E5D0D0',
          300: '#D4B0B0',
          400: '#B87878',
          500: '#722B2B',
          600: '#5A2222',
          700: '#441A1A',
          800: '#2E1111',
          900: '#170909',
        },
        
        // Accent - Rose Gold (Premium moments)
        rose: {
          gold: '#B76E79',
          dark: '#8B4D55',
        },
        
        // Brand Secondary - Warmth & Skin
        terracotta: {
          DEFAULT: '#EAC7BB',
          light: '#F3D7CD',
          dark: '#D4AFA3',
        },
        
        // Neutrals - Dramatic range
        cream: {
          DEFAULT: '#FFF8F0',
          warm: '#FFF5EB',
          pure: '#FFFCF9',
        },
        
        beige: {
          DEFAULT: '#F9F7F6',
          warm: '#FAF4F0',
          cool: '#F5F3F2',
        },
        
        // Drama Colors
        black: {
          DEFAULT: '#0A0A0A',
          pure: '#000000',
          soft: '#1A1A1A',
          muted: '#2A2A2A',
        },
        
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
        
        // Clinical White (for treatment pages)
        clinical: {
          white: '#FFFFFF',
          offwhite: '#FDFCFB',
        },
        
        // Legacy support
        'beige-warm': '#FAF4F0',
        'dust-red': '#C35A4A',
      },
      fontFamily: {
        // Display - Editorial elegance
        display: ['var(--font-display)', 'Cormorant Garamond', 'Georgia', 'serif'],
        // Serif - Refined headlines
        serif: ['var(--font-serif)', 'Cormorant Garamond', 'Georgia', 'serif'],
        // Sans - Modern body text
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        // Mono - Clinical data/numbers
        mono: ['var(--font-mono)', 'JetBrains Mono', 'monospace'],
      },
      fontSize: {
        // Fluid typography scale - More dramatic
        'display-hero': ['clamp(3.5rem, 12vw, 9rem)', { lineHeight: '0.95', letterSpacing: '-0.04em' }],
        'display-xl': ['clamp(3rem, 8vw, 7rem)', { lineHeight: '1', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(2.5rem, 6vw, 5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(2rem, 4vw, 3.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-sm': ['clamp(1.5rem, 3vw, 2.5rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'body-xl': ['1.375rem', { lineHeight: '1.6' }],
        'body-lg': ['1.125rem', { lineHeight: '1.7' }],
        'body': ['1rem', { lineHeight: '1.7' }],
        'body-sm': ['0.875rem', { lineHeight: '1.6' }],
        'caption': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.05em' }],
      },
      boxShadow: {
        'soft': '0 4px 24px rgba(114, 43, 43, 0.06)',
        'soft-lg': '0 8px 48px rgba(114, 43, 43, 0.08)',
        'soft-xl': '0 16px 64px rgba(114, 43, 43, 0.10)',
        'card': '0 2px 16px rgba(114, 43, 43, 0.04)',
        'card-hover': '0 8px 32px rgba(114, 43, 43, 0.08)',
        'glow': '0 0 40px rgba(114, 43, 43, 0.15)',
        'glow-rose': '0 0 60px rgba(183, 110, 121, 0.2)',
        'dramatic': '0 25px 50px -12px rgba(10, 10, 10, 0.25)',
        'inner-glow': 'inset 0 2px 20px rgba(255, 248, 240, 0.5)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'fade-in-down': 'fadeInDown 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.6s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'floatSlow 8s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
        'scale-in': 'scaleIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'reveal-up': 'revealUp 1s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'reveal-mask': 'revealMask 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'draw-line': 'drawLine 1.5s ease-out forwards',
        'shimmer': 'shimmer 2s linear infinite',
        'magnetic': 'magnetic 0.3s ease-out',
        'grain': 'grain 8s steps(10) infinite',
        'marquee': 'marquee 60s linear infinite',
        'marquee-reverse': 'marquee-reverse 60s linear infinite',
        'spin-slow': 'spin 20s linear infinite',
        'bounce-subtle': 'bounceSubtle 2s ease-in-out infinite',
        'mesh-rotate': 'meshRotate 20s ease-in-out infinite',
        'mesh-drift': 'meshDrift 15s ease-in-out infinite',
        'mesh-breathe': 'meshBreathe 10s ease-in-out infinite',
      },
      keyframes: {
        meshRotate: {
          '0%, 100%': { transform: 'rotate(0deg) scale(1)' },
          '50%': { transform: 'rotate(180deg) scale(1.1)' },
        },
        meshDrift: {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-20px) scale(1.05)' },
        },
        meshBreathe: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.8' },
          '50%': { transform: 'scale(1.1)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(2deg)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '33%': { transform: 'translateY(-15px) rotate(1deg)' },
          '66%': { transform: 'translateY(10px) rotate(-1deg)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.02)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        revealUp: {
          '0%': { 
            clipPath: 'inset(100% 0 0 0)',
            opacity: '0',
            transform: 'translateY(20px)'
          },
          '100%': { 
            clipPath: 'inset(0 0 0 0)',
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        revealMask: {
          '0%': { clipPath: 'inset(0 100% 0 0)' },
          '100%': { clipPath: 'inset(0 0 0 0)' },
        },
        drawLine: {
          '0%': { strokeDashoffset: '100%' },
          '100%': { strokeDashoffset: '0%' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        magnetic: {
          '0%': { transform: 'translate(0, 0)' },
          '100%': { transform: 'translate(var(--x), var(--y))' },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-5%, -10%)' },
          '20%': { transform: 'translate(-15%, 5%)' },
          '30%': { transform: 'translate(7%, -25%)' },
          '40%': { transform: 'translate(-5%, 25%)' },
          '50%': { transform: 'translate(-15%, 10%)' },
          '60%': { transform: 'translate(15%, 0%)' },
          '70%': { transform: 'translate(0%, 15%)' },
          '80%': { transform: 'translate(3%, 35%)' },
          '90%': { transform: 'translate(-10%, 10%)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce-soft': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'expo-in-out': 'cubic-bezier(0.87, 0, 0.13, 1)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '1000': '1000ms',
        '1200': '1200ms',
      },
      backdropBlur: {
        xs: '2px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-dramatic': 'linear-gradient(135deg, var(--tw-gradient-stops))',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};

export default config;
