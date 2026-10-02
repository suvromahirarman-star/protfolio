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
        // Strict White (#FAFAFA) + Black (#0A0A0A) + Cards (#F3F3F3) + Orange (#FF6B00)
        brand: {
          bg: '#FAFAFA',          // Main website background (soft off-white)
          card: '#F3F3F3',        // Cards / secondary light backgrounds
          border: '#E5E5E5',      // Subtle borders / dividers
          text: '#0A0A0A',        // Primary text / headings
          secondary: '#525252',   // Secondary text / descriptions
          muted: '#737373',       // Muted text / metadata
          orange: '#FF6B00',      // Primary accent color
          orangeHover: '#FF8533', // Hover state
          orangeDark: '#E65A00',
          orangeMuted: 'rgba(255, 107, 0, 0.12)',
          black: '#0A0A0A',       // Dark sections background
          darkCard: '#121212',    // Dark cards background
          darkBorder: '#262626',  // Dark borders
        },
        dark: {
          950: '#0A0A0A',
          900: '#121212',
          850: '#171717',
          800: '#1F1F1F',
          700: '#262626',
          600: '#3E3E3E',
          500: '#525252',
          400: '#737373',
        },
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
        'card-subtle': '0 2px 10px -2px rgba(0, 0, 0, 0.05)',
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
