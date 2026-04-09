import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        /* ── Legacy rq.* tokens (keep for compat) ───── */
        rq: {
          bg:      '#F7FAF8',
          surface: '#FFFFFF',
          dark:    '#0C2117',
          text:    '#111827',
          muted:   '#6B7280',
          subtle:  '#9CA3AF',
          border:  '#E5E7EB',
          'green':        '#16A34A',
          'green-hover':  '#15803D',
          'green-light':  '#4ADE80',
          'green-bg':     '#F0FDF4',
          'green-border': '#BBF7D0',
          'orange':        '#EA580C',
          'orange-bg':     '#FFF7ED',
          'orange-border': '#FED7AA',
          'violet':        '#7C3AED',
          'violet-bg':     '#F5F3FF',
          'violet-border': '#C4B5FD',
          'red':           '#DC2626',
          'red-bg':        '#FEF2F2',
        },
        /* ── NEW semantic th.* tokens (CSS var backed) ── */
        'th-bg':         'var(--th-bg)',
        'th-surface':    'var(--th-surface)',
        'th-raised':     'var(--th-raised)',
        'th-hover':      'var(--th-hover)',
        'th-input':      'var(--th-input)',
        'th-text':       'var(--th-text)',
        'th-text-2':     'var(--th-text-2)',
        'th-text-3':     'var(--th-text-3)',
        'th-text-4':     'var(--th-text-4)',
        'th-border':     'var(--th-border)',
        'th-border-2':   'var(--th-border-2)',
        'th-green-bg':       'var(--th-green-bg)',
        'th-green-border':   'var(--th-green-border)',
        'th-orange-bg':      'var(--th-orange-bg)',
        'th-orange-border':  'var(--th-orange-border)',
        'th-violet-bg':      'var(--th-violet-bg)',
        'th-violet-border':  'var(--th-violet-border)',
        'th-red-bg':         'var(--th-red-bg)',
        'th-red-border':     'var(--th-red-border)',
        'th-amber-bg':       'var(--th-amber-bg)',
        'th-amber-border':   'var(--th-amber-border)',
        'th-blue-bg':        'var(--th-blue-bg)',
        'th-blue-border':    'var(--th-blue-border)',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'monospace'],
      },
      keyframes: {
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition:  '200% center' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%':   { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slide-right': {
          '0%':   { opacity: '0', transform: 'translateX(-12px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        ping2: {
          '0%':   { transform: 'scale(1)', opacity: '0.6' },
          '100%': { transform: 'scale(2.2)', opacity: '0' },
        },
      },
      animation: {
        shimmer:       'shimmer 2s linear infinite',
        float:         'float 3s ease-in-out infinite',
        'fade-up':     'fade-up 0.4s ease-out',
        'scale-in':    'scale-in 0.3s ease-out',
        'slide-right': 'slide-right 0.3s ease-out',
        ping2:         'ping2 1.5s ease-in-out infinite',
      },
      boxShadow: {
        'card':    '0 1px 3px 0 rgb(0 0 0/0.06), 0 1px 2px -1px rgb(0 0 0/0.06)',
        'card-md': '0 4px 16px -2px rgb(0 0 0/0.08), 0 2px 8px -2px rgb(0 0 0/0.04)',
        'card-xl': '0 20px 40px -8px rgb(0 0 0/0.12)',
        'green':   '0 4px 16px -2px rgb(22 163 74/0.25)',
        'orange':  '0 4px 16px -2px rgb(234 88 12/0.25)',
      },
    },
  },
  plugins: [],
}

export default config
