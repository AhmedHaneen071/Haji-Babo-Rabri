import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: '#1A7A50',
          'green-dark': '#0D5C3A',
          'green-darker': '#072D1E',
          'green-deep': '#041A12',
          maroon: '#7A1015',
          'maroon-dark': '#4A080B',
          'maroon-deep': '#2D0507',
          gold: '#D4A62A',
          'gold-light': '#E8C547',
          'gold-dark': '#A87B18',
          'gold-pale': '#F0D98A',
          cream: '#F7EBD0',
          'cream-dark': '#EDD9B0',
          'off-white': '#FFF8E7',
          dark: '#171717',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #072D1E 0%, #0D5C3A 50%, #1A7A50 100%)',
        'gold-gradient': 'linear-gradient(135deg, #A87B18 0%, #D4A62A 50%, #E8C547 100%)',
        'hero-radial': 'radial-gradient(ellipse at center, #1A7A50 0%, #0D5C3A 40%, #072D1E 100%)',
        'maroon-gradient': 'linear-gradient(135deg, #2D0507 0%, #4A080B 50%, #7A1015 100%)',
      },
      boxShadow: {
        'gold': '0 0 0 1px rgba(212, 166, 42, 0.3), 0 4px 24px rgba(212, 166, 42, 0.15)',
        'gold-lg': '0 0 0 1px rgba(212, 166, 42, 0.4), 0 8px 40px rgba(212, 166, 42, 0.2)',
        'card': '0 2px 16px rgba(0,0,0,0.3), 0 0 0 1px rgba(212, 166, 42, 0.15)',
        'card-hover': '0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(212, 166, 42, 0.5)',
        'inner-gold': 'inset 0 0 0 1px rgba(212, 166, 42, 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-up': 'fadeUp 0.7s ease-out forwards',
        'fade-up-slow': 'fadeUp 1s ease-out forwards',
        'shimmer': 'shimmer 2s infinite linear',
        'float': 'float 3s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
        'slide-in-right': 'slideInRight 0.3s ease-out forwards',
        'slide-out-right': 'slideOutRight 0.3s ease-in forwards',
        'scale-in': 'scaleIn 0.2s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(212, 166, 42, 0.4)' },
          '50%': { boxShadow: '0 0 0 8px rgba(212, 166, 42, 0)' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideOutRight: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
