import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#030508',
          elevated: '#070b12',
          card: 'rgba(8, 14, 25, 0.7)',
        },
        accent: {
          DEFAULT: '#00d4ff',
          violet: '#7b61ff',
          red: '#ff6b6b',
          glow: 'rgba(0, 212, 255, 0.25)',
          subtle: 'rgba(0, 212, 255, 0.08)',
        },
        text: {
          primary: '#e4eaf5',
          dim: '#6b7b96',
          muted: '#3a4a63',
        },
        glass: {
          DEFAULT: 'rgba(10, 18, 32, 0.6)',
          border: 'rgba(0, 212, 255, 0.08)',
          'border-hover': 'rgba(0, 212, 255, 0.2)',
        },
      },
      fontFamily: {
        heading: ['var(--font-playfair)'],
        body: ['var(--font-space)'],
        mono: ['var(--font-jetbrains)'],
        display: ['var(--font-bebas)'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'orbit-spin': 'orbitSpin 15s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'grain': 'grain 0.5s steps(4) infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 0 0 rgba(0, 212, 255, 0.25)' },
          '50%': { opacity: '0.6', boxShadow: '0 0 0 8px transparent' },
        },
        orbitSpin: {
          from: { transform: 'rotateX(70deg) rotateY(0deg)' },
          to: { transform: 'rotateX(70deg) rotateY(360deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        grain: {
          '0%': { transform: 'translate(0, 0)' },
          '25%': { transform: 'translate(-2%, 2%)' },
          '50%': { transform: 'translate(1%, -1%)' },
          '75%': { transform: 'translate(-1%, 3%)' },
          '100%': { transform: 'translate(2%, -2%)' },
        },
      },
    },
  },
  plugins: [],
}

export default config