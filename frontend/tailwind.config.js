/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // "Void" neutral scale — deep space navy, not flat black
        dark: {
          50: '#F4F5FB',
          100: '#E5E7F4',
          200: '#C6CAE3',
          300: '#A2A8CB',
          400: '#8189AD',
          500: '#656C90',
          600: '#4B5171',
          700: '#343A55',
          800: '#1D2138',
          900: '#12142A',
          950: '#07081A',
        },
        // "Signal" cyan — primary accent, data & energy
        primary: {
          50: '#EAFDFF',
          100: '#CEFAFF',
          200: '#9BF1FF',
          300: '#5FE3FC',
          400: '#3AD3F2',
          500: '#17B8DC',
          600: '#0C93B4',
          700: '#0C7390',
          800: '#125A72',
          900: '#134A5E',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Sora', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(58,211,242,0.45)' },
          '70%': { boxShadow: '0 0 0 12px rgba(58,211,242,0)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.16,1,0.3,1) both',
        'pulse-glow': 'pulseGlow 2.6s ease-in-out infinite',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};