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
        space: {
          950: '#040711',
          900: '#070B16',
          850: '#0B1124',
          800: '#0F172E',
          750: '#15203D',
          700: '#1E294B',
          600: '#334155',
          500: '#64748B',
          400: '#94A3B8',
          300: '#CBD5E1',
          200: '#E2E8F0',
          100: '#F1F5F9',
        },
        cyan: {
          glow: '#00F2FE',
          brand: '#0AE4BA',
          electric: '#00E5FF',
          deep: '#0369A1',
        },
        teach: {
          accent: '#0AE4BA',
          cyan: '#00F2FE',
          amber: '#F59E0B',
          coral: '#F43F5E',
          emerald: '#10B981',
          indigo: '#6366F1',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"Geist Mono"', '"JetBrains Mono"', 'Menlo', 'monospace'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow-flow': 'glowFlow 4s linear infinite',
        'wave-bar': 'waveBar 1.2s ease-in-out infinite alternate',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.02)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        glowFlow: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
        waveBar: {
          '0%': { height: '15%' },
          '100%': { height: '95%' },
        }
      },
      boxShadow: {
        'cyan-glow': '0 0 25px -5px rgba(0, 242, 254, 0.3)',
        'cyan-sm': '0 0 15px -3px rgba(10, 228, 186, 0.25)',
        'card-dark': '0 10px 30px -10px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
        'card-glow': '0 20px 40px -15px rgba(0, 242, 254, 0.15), inset 0 1px 0 rgba(0, 242, 254, 0.2)',
      }
    },
  },
  plugins: [],
}
