import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import ThemeProvider from '@/components/ThemeProvider'

export const metadata: Metadata = {
  title: 'GeminiGrain — AI Food Rescue Platform',
  description: 'Bridging the gap between food waste and hunger using Google Gemini AI',
}

const themeScript = `(function(){try{var t=localStorage.getItem('gg_theme');if(!t)t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';if(t==='dark')document.documentElement.classList.add('dark');}catch(e){}})();`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <ThemeProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background:   'var(--toast-bg)',
                color:        'var(--toast-text)',
                border:       '1px solid var(--toast-border)',
                borderRadius: '12px',
                fontSize:     '14px',
                boxShadow:    'var(--shadow-card-md)',
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
