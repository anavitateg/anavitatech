/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        cursive: ['"Dancing Script"', 'cursive'],
        handwriting: ['"Caveat"', 'cursive'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      colors: {
        brand: {
          // Sky-cyan — primary action color
          cyan:   '#0EA5E9',
          'cyan-light': '#BAE6FD',
          'cyan-dark':  '#0369A1',
          // Amber-yellow — highlights, numbers, tags
          yellow: '#F59E0B',
          'yellow-light': '#FEF3C7',
          'yellow-dark':  '#B45309',
          // Green — status, available
          green:  '#22C55E',
          'green-light': '#DCFCE7',
          // Red — danger, AI accent
          red:    '#EF4444',
          'red-light': '#FEE2E2',
          // Light blue — secondary
          blue:   '#60A5FA',
          'blue-light': '#DBEAFE',
        },
        surface: {
          // Page backgrounds
          base:   '#F8FAFC',
          card:   '#FFFFFF',
          muted:  '#F1F5F9',
          border: '#E2E8F0',
          'border-dark': '#CBD5E1',
        },
        ink: {
          // Text hierarchy
          primary:   '#0F172A',
          secondary: '#475569',
          tertiary:  '#94A3B8',
          inverse:   '#FFFFFF',
        },
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.06)',
        'card-hover': '0 4px 12px rgba(0,0,0,0.08), 0 16px 40px rgba(0,0,0,0.10)',
        'cyan': '0 4px 24px rgba(14,165,233,0.20)',
        'yellow': '0 4px 24px rgba(245,158,11,0.25)',
      },
      animation: {
        'fade-up': 'fadeUp 0.5s ease both',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
