import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import ThemeProvider from '@/components/ThemeProvider'

export const metadata: Metadata = {
  title: 'GeminiGrain — AI Food Rescue Platform',
  description: 'Bridging the gap between food waste and hunger using Google Gemini AI',
}

// Prevent flash of unstyled content on page load
const themeScript = `
  (function() {
    try {
      var t = localStorage.getItem('gg_theme');
      if (!t) t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      if (t === 'dark') document.documentElement.classList.add('dark');
    } catch(e) {}
  })();
`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="bg-rq-bg text-rq-text antialiased">
        <ThemeProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: 'var(--toast-bg, #fff)',
                color: 'var(--toast-text, #111827)',
                border: '1px solid var(--toast-border, #E5E7EB)',
                borderRadius: '12px',
                fontSize: '14px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
              },
              success: { iconTheme: { primary: '#16A34A', secondary: '#fff' } },
              error:   { iconTheme: { primary: '#DC2626', secondary: '#fff' } },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  )
}
