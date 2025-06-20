/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        // Clean dark mode color scheme inspired by the image
        dark: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        // Modern professional theme colors - warm grays and sophisticated accents
        'dark-bg': '#1a1a1a',
        'dark-surface': '#2a2a2a',
        'dark-card': '#333333',
        'dark-border': '#404040',
        'dark-text': '#f5f5f5',
        'dark-muted': '#a3a3a3',
        'dark-accent': '#d4af37',
        'dark-success': '#22c55e',
        'dark-warning': '#f59e0b',
        'dark-error': '#ef4444',
        primary: {
          50: '#faf8f3',
          100: '#f4f0e6',
          200: '#e8dcc7',
          300: '#d4af37',
          400: '#c19b26',
          500: '#b8941f',
          600: '#a0801a',
          700: '#856817',
          800: '#6d5318',
          900: '#5a4417',
        },
        secondary: {
          50: '#f8f9fa',
          100: '#f1f3f4',
          200: '#e8eaed',
          300: '#dadce0',
          400: '#bdc1c6',
          500: '#9aa0a6',
          600: '#80868b',
          700: '#5f6368',
          800: '#3c4043',
          900: '#202124',
        },
        accent: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        // Modern gradient colors - sophisticated and professional
        gradient: {
          gold: '#d4af37',
          bronze: '#cd7f32',
          silver: '#c0c0c0',
          charcoal: '#36454f',
          sage: '#9caf88',
          warm: '#f5f5dc',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'dark-gradient': 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
        'card-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
        'dark-card-gradient': 'linear-gradient(135deg, #333333 0%, #2a2a2a 100%)',
        'professional-gradient': 'linear-gradient(135deg, #d4af37 0%, #b8941f 100%)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'bounce-subtle': 'bounceSubtle 2s infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-10px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-2px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      boxShadow: {
        'dark': '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
        'dark-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)',
        'dark-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
        'glow': '0 0 20px rgba(212, 175, 55, 0.3)',
        'glow-gold': '0 0 20px rgba(212, 175, 55, 0.4)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'professional': '0 4px 20px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
};