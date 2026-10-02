/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Strict Black + White + Orange Color System
        dark: {
          950: '#0A0A0A', // Main black canvas
          900: '#121212', // Surface card 1
          850: '#171717', // Elevated surface 2
          800: '#1F1F1F', // Secondary surface 3
          700: '#262626', // Border subtle
          600: '#3E3E3E', // Border hover
          500: '#525252',
          400: '#737373', // Secondary gray text
        },
        brand: {
          orange: '#FF6B00',
          orangeHover: '#FF8533',
          orangeDark: '#E65A00',
          orangeMuted: 'rgba(255, 107, 0, 0.12)',
          dark: '#0A0A0A',
          surface: '#121212',
          surfaceHover: '#1A1A1A',
          border: '#262626',
          white: '#FFFFFF',
          grayLight: '#F5F5F5',
          graySecondary: '#737373',
        },
        // Mapped legacy tokens so existing components align immediately to orange
        electric: {
          400: '#FF8533',
          500: '#FF6B00',
          600: '#E65A00',
        },
        indigoAcc: {
          400: '#FF8533',
          500: '#FF6B00',
          600: '#E65A00',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Manrope', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Manrope', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'orange-glow': '0 0 25px -5px rgba(255, 107, 0, 0.25)',
        'orange-glow-lg': '0 0 40px -10px rgba(255, 107, 0, 0.35)',
        'card-subtle': '0 4px 20px -2px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
};
