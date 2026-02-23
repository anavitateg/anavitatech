/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'Inter', 'sans-serif'],
      },
      colors: {
        dark: {
          900: '#030712',
          800: '#0a0f1e',
          700: '#0f172a',
          600: '#1e293b',
        },
        neon: {
          cyan: '#00f5ff',
          purple: '#a855f7',
          blue: '#3b82f6',
          pink: '#f472b6',
        }
      },
      animation: {
        'gradient-shift': 'gradientShift 8s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.6s ease forwards',
        'fade-in': 'fadeIn 0.8s ease forwards',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #00f5ff, 0 0 10px #00f5ff' },
          '100%': { boxShadow: '0 0 20px #00f5ff, 0 0 40px #00f5ff, 0 0 60px #00f5ff' },
        },
        slideUp: {
          '0%': { transform: 'translateY(60px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      backgroundSize: {
        '300%': '300% 300%',
      },
      boxShadow: {
        'neon-cyan': '0 0 20px rgba(0, 245, 255, 0.4)',
        'neon-purple': '0 0 20px rgba(168, 85, 247, 0.4)',
        'neon-blue': '0 0 20px rgba(59, 130, 246, 0.4)',
        'card': '0 4px 32px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [],
}
