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
        // Pragna Brand Colors
        maroon: {
          DEFAULT: '#722B2B',
          light: '#8B3A3A',
        },
        terracotta: {
          DEFAULT: '#EAC7BB',
          light: '#F3D7CD',
        },
        beige: {
          DEFAULT: '#F9F7F6',
          warm: '#FAF4F0',
        },
        'beige-warm': '#FAF4F0',
        charcoal: '#111111',
        dust: {
          red: '#C35A4A',
        },
        'dust-red': '#C35A4A',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['DM Serif Display', 'Playfair Display', 'Georgia', 'serif'],
      },
      fontSize: {
        'hero': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'hero-mobile': ['2.25rem', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
      },
      boxShadow: {
        'soft': '0 4px 24px rgba(114, 43, 43, 0.06)',
        'soft-lg': '0 8px 48px rgba(114, 43, 43, 0.08)',
        'card': '0 2px 16px rgba(114, 43, 43, 0.04)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;

