import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: 'ResQFood — Rescue Surplus Food with AI',
  description:
    'AI-powered food rescue platform connecting surplus food donors with NGOs in real-time using Google Gemini API.',
  keywords: 'food rescue, AI, Gemini, NGO, food waste, sustainability',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-[#060C09] text-emerald-50 antialiased min-h-screen">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#0C1710',
              color: '#F0FDF4',
              border: '1px solid rgba(34,197,94,0.2)',
              borderRadius: '10px',
              fontSize: '14px',
            },
            success: {
              iconTheme: { primary: '#22C55E', secondary: '#060C09' },
            },
            error: {
              iconTheme: { primary: '#F87171', secondary: '#060C09' },
            },
          }}
        />
      </body>
    </html>
  )
}
