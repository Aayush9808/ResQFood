import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        rq: {
          bg:          '#060C09',
          surface:     '#0C1710',
          surface2:    '#112018',
          border:      '#1A3024',
          'border-hi': '#2A4A38',
          green:       '#22C55E',
          'green-dim': '#16A34A',
          'green-glow':'rgba(34,197,94,0.12)',
          orange:      '#F97316',
          'orange-dim':'#EA580C',
          'orange-glow':'rgba(249,115,22,0.12)',
          violet:      '#A78BFA',
          'violet-glow':'rgba(167,139,250,0.12)',
          text:        '#F0FDF4',
          muted:       '#6B8A76',
          subtle:      '#344D3C',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'monospace'],
      },
      animation: {
        'pulse-slow':    'pulse 3s ease-in-out infinite',
        'spin-slow':     'spin 10s linear infinite',
        'glow-green':    'glowGreen 2s ease-in-out infinite alternate',
        'glow-orange':   'glowOrange 2s ease-in-out infinite alternate',
        'float':         'float 6s ease-in-out infinite',
        'slide-up':      'slideUp 0.4s ease-out',
        'fade-in':       'fadeIn 0.4s ease-out',
        'shimmer':       'shimmer 2s infinite',
        'bounce-subtle': 'bounceSub 2s ease-in-out infinite',
        'ping-slow':     'ping 2s cubic-bezier(0,0,0.2,1) infinite',
      },
      keyframes: {
        glowGreen: {
          from: { boxShadow: '0 0 15px rgba(34,197,94,0.1)' },
          to:   { boxShadow: '0 0 35px rgba(34,197,94,0.3), 0 0 60px rgba(34,197,94,0.1)' },
        },
        glowOrange: {
          from: { boxShadow: '0 0 15px rgba(249,115,22,0.1)' },
          to:   { boxShadow: '0 0 35px rgba(249,115,22,0.3)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%':     { transform: 'translateY(-12px)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition:  '200% 0' },
        },
        bounceSub: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%':     { transform: 'translateY(-4px)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
