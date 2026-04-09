import os
BASE = '/Users/aayus/Desktop/Galgotiya/resqfood'

# ════════════════════════════════════════════════════════════════════
# 1. globals.css  —  token definitions + all utility classes
# ════════════════════════════════════════════════════════════════════
globals_css = r"""@import url('https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

/* ╔══════════════════════════════════════════════════════════════════╗
   ║  DESIGN TOKEN LAYER  —  GeminiGrain Design System v2.0         ║
   ║  All colours live here. Components NEVER hard-code a hex.      ║
   ╚══════════════════════════════════════════════════════════════════╝ */

/* ── Light mode tokens ────────────────────────────────────────────── */
:root {
  color-scheme: light;

  /* Backgrounds */
  --th-bg:       #F8FAF9;
  --th-surface:  #FFFFFF;
  --th-raised:   #FFFFFF;
  --th-hover:    #F1F5F2;
  --th-active:   #E6EFEA;
  --th-overlay:  rgba(255,255,255,0.90);
  --th-input:    #FFFFFF;

  /* Text */
  --th-text:   #0F1F15;
  --th-text-2: #374151;
  --th-text-3: #6B7280;
  --th-text-4: #9CA3AF;

  /* Borders */
  --th-border:   #E2E8E4;
  --th-border-2: #CBD5D8;
  --th-input-border: #D1D5DB;

  /* Shadows */
  --shadow-card:    0 1px 3px 0 rgb(0 0 0/0.06), 0 1px 2px -1px rgb(0 0 0/0.04);
  --shadow-card-md: 0 4px 16px -2px rgb(0 0 0/0.08), 0 2px 8px -2px rgb(0 0 0/0.04);
  --shadow-card-xl: 0 20px 60px -12px rgb(0 0 0/0.12);
  --shadow-nav:     0 1px 0 0 #E2E8E4;

  /* Toast */
  --toast-bg:     #FFFFFF;
  --toast-text:   #0F1F15;
  --toast-border: #E2E8E4;

  /* Accent tints */
  --th-green-bg:       #F0FDF4;
  --th-green-border:   #BBF7D0;
  --th-green-text:     #15803D;
  --th-orange-bg:      #FFF7ED;
  --th-orange-border:  #FED7AA;
  --th-orange-text:    #C2410C;
  --th-violet-bg:      #F5F3FF;
  --th-violet-border:  #C4B5FD;
  --th-violet-text:    #6D28D9;
  --th-red-bg:         #FEF2F2;
  --th-red-border:     #FECACA;
  --th-red-text:       #B91C1C;
  --th-amber-bg:       #FFFBEB;
  --th-amber-border:   #FDE68A;
  --th-amber-text:     #B45309;
  --th-blue-bg:        #EFF6FF;
  --th-blue-border:    #BFDBFE;
  --th-blue-text:      #1D4ED8;
}

/* ── Dark mode tokens ─────────────────────────────────────────────── */
html.dark {
  color-scheme: dark;

  /* Backgrounds — deep GitHub-style dark */
  --th-bg:       #0D1117;
  --th-surface:  #161B22;
  --th-raised:   #1C2128;
  --th-hover:    #21262D;
  --th-active:   #30363D;
  --th-overlay:  rgba(22,27,34,0.95);
  --th-input:    #21262D;

  /* Text */
  --th-text:   #E6EDF3;
  --th-text-2: #CDD9E5;
  --th-text-3: #8B949E;
  --th-text-4: #545D68;

  /* Borders */
  --th-border:   #30363D;
  --th-border-2: #444C56;
  --th-input-border: #444C56;

  /* Shadows — more visible in dark */
  --shadow-card:    0 1px 0 0 rgb(255 255 255/0.04), 0 2px 8px 0 rgb(0 0 0/0.30);
  --shadow-card-md: 0 4px 20px -2px rgb(0 0 0/0.50), 0 0 0 1px rgb(255 255 255/0.04);
  --shadow-card-xl: 0 24px 64px -12px rgb(0 0 0/0.70);
  --shadow-nav:     0 1px 0 0 #30363D;

  /* Toast */
  --toast-bg:     #1C2128;
  --toast-text:   #E6EDF3;
  --toast-border: #30363D;

  /* Accent tints — deep glass feel */
  --th-green-bg:       #0A1F13;
  --th-green-border:   #1D4131;
  --th-green-text:     #4ADE80;
  --th-orange-bg:      #1F150A;
  --th-orange-border:  #3D2010;
  --th-orange-text:    #FB923C;
  --th-violet-bg:      #12102B;
  --th-violet-border:  #2D2060;
  --th-violet-text:    #A78BFA;
  --th-red-bg:         #200D0D;
  --th-red-border:     #7F1D1D;
  --th-red-text:       #F87171;
  --th-amber-bg:       #1F1B08;
  --th-amber-border:   #78350F;
  --th-amber-text:     #FCD34D;
  --th-blue-bg:        #0D1B2A;
  --th-blue-border:    #1E3A5F;
  --th-blue-text:      #60A5FA;
}

/* ╔══════════════════════════════════════════════════════════════════╗
   ║  BASE STYLES                                                    ║
   ╚══════════════════════════════════════════════════════════════════╝ */

*, *::before, *::after { box-sizing: border-box; }

html { scroll-behavior: smooth; }

body {
  background-color: var(--th-bg);
  color: var(--th-text);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
  transition: background-color 0.2s ease, color 0.2s ease;
}

::selection { background: #BBF7D0; color: #14532D; }
html.dark ::selection { background: #14532D; color: #4ADE80; }

/* Scrollbar */
::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: var(--th-bg); }
::-webkit-scrollbar-thumb { background: var(--th-border-2); border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: var(--th-text-4); }

/* ╔══════════════════════════════════════════════════════════════════╗
   ║  COMPONENT LAYER — design-system utility classes                ║
   ╚══════════════════════════════════════════════════════════════════╝ */

/* ── Cards ────────────────────────────────────────────────────────── */
.card {
  background:    var(--th-surface);
  border:        1px solid var(--th-border);
  border-radius: 16px;
  box-shadow:    var(--shadow-card);
  transition:    background 0.2s, border-color 0.2s, box-shadow 0.2s;
}
.card-sm { border-radius: 12px; }
.card-hover:hover {
  box-shadow: var(--shadow-card-md);
  transform:  translateY(-1px);
  border-color: var(--th-border-2);
}
.card-raised {
  background: var(--th-raised);
  border:     1px solid var(--th-border);
  border-radius: 16px;
  box-shadow: var(--shadow-card-md);
}

/* ── Buttons ──────────────────────────────────────────────────────── */
.btn {
  display: inline-flex; align-items: center; justify-content: center;
  gap: 6px; font-weight: 600; border-radius: 12px;
  transition: all 0.15s ease; cursor: pointer; white-space: nowrap;
  font-size: 14px; padding: 10px 18px; line-height: 1;
}
.btn:disabled { opacity: 0.45; cursor: not-allowed; transform: none !important; }

.btn-primary {
  background: #16A34A; color: #fff;
  box-shadow: 0 4px 16px -2px rgb(22 163 74/0.30);
}
.btn-primary:hover:not(:disabled) { background: #15803D; transform: translateY(-1px); }
.btn-primary:active:not(:disabled) { background: #166534; transform: translateY(0); }

.btn-secondary {
  background: var(--th-surface);
  color: var(--th-text-2);
  border: 1px solid var(--th-border);
  box-shadow: var(--shadow-card);
}
.btn-secondary:hover:not(:disabled) {
  background: var(--th-hover);
  border-color: var(--th-border-2);
}

.btn-ghost {
  background: transparent;
  color: var(--th-text-3);
  border: 1px solid transparent;
}
.btn-ghost:hover:not(:disabled) {
  background: var(--th-hover);
  color: var(--th-text);
}

/* ── Inputs ───────────────────────────────────────────────────────── */
.input,
.textarea {
  width: 100%;
  background:    var(--th-input);
  color:         var(--th-text);
  border:        1px solid var(--th-input-border);
  border-radius: 12px;
  padding:       10px 14px;
  font-size:     14px;
  font-family:   inherit;
  outline:       none;
  transition:    border-color 0.15s, box-shadow 0.15s;
}
.input::placeholder, .textarea::placeholder { color: var(--th-text-4); }
.input:focus, .textarea:focus {
  border-color: #16A34A;
  box-shadow:   0 0 0 3px rgb(22 163 74/0.12);
}
.textarea { resize: vertical; min-height: 100px; line-height: 1.6; }

/* ── Tabs ─────────────────────────────────────────────────────────── */
.tab-group {
  display: flex; gap: 4px; padding: 4px;
  background: var(--th-hover);
  border-radius: 14px;
}
.tab-item {
  flex: 1; padding: 8px 12px; border-radius: 10px;
  font-size: 13px; font-weight: 600; text-align: center;
  cursor: pointer; transition: all 0.15s;
  color: var(--th-text-3);
}
.tab-item:hover { color: var(--th-text-2); }
.tab-item.active {
  background: var(--th-surface);
  color: var(--th-text);
  box-shadow: var(--shadow-card);
}

/* ── Urgency badges ───────────────────────────────────────────────── */
.urg { display:inline-flex; align-items:center; gap:4px; font-size:11px; font-weight:700;
  padding:3px 8px; border-radius:999px; border-width:1px; border-style:solid; }
.urg-critical { color:#DC2626; background:var(--th-red-bg);    border-color:var(--th-red-border); }
.urg-high     { color:#EA580C; background:var(--th-orange-bg); border-color:var(--th-orange-border); }
.urg-medium   { color:#D97706; background:var(--th-amber-bg);  border-color:var(--th-amber-border); }
.urg-low      { color:#16A34A; background:var(--th-green-bg);  border-color:var(--th-green-border); }
html.dark .urg-critical { color:var(--th-red-text); }
html.dark .urg-high     { color:var(--th-orange-text); }
html.dark .urg-medium   { color:var(--th-amber-text); }
html.dark .urg-low      { color:var(--th-green-text); }

/* ── Status badges ────────────────────────────────────────────────── */
.status { display:inline-flex; align-items:center; font-size:11px; font-weight:700;
  padding:3px 8px; border-radius:999px; border-width:1px; border-style:solid; }
.status-pending   { color:var(--th-violet-text); background:var(--th-violet-bg); border-color:var(--th-violet-border); }
.status-matched   { color:var(--th-amber-text);  background:var(--th-amber-bg);  border-color:var(--th-amber-border); }
.status-transit   { color:var(--th-orange-text); background:var(--th-orange-bg); border-color:var(--th-orange-border); }
.status-delivered { color:var(--th-green-text);  background:var(--th-green-bg);  border-color:var(--th-green-border); }

/* ── Tinted section panels ────────────────────────────────────────── */
.panel-green  { background:var(--th-green-bg);  border:1px solid var(--th-green-border);  border-radius:12px; }
.panel-orange { background:var(--th-orange-bg); border:1px solid var(--th-orange-border); border-radius:12px; }
.panel-violet { background:var(--th-violet-bg); border:1px solid var(--th-violet-border); border-radius:12px; }
.panel-red    { background:var(--th-red-bg);    border:1px solid var(--th-red-border);    border-radius:12px; }
.panel-amber  { background:var(--th-amber-bg);  border:1px solid var(--th-amber-border);  border-radius:12px; }

/* ── Gradient text ────────────────────────────────────────────────── */
.gradient-text {
  background: linear-gradient(135deg, #16A34A, #4ADE80);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* ── Skeleton shimmer ─────────────────────────────────────────────── */
.skeleton {
  background: linear-gradient(90deg, var(--th-hover) 25%, var(--th-active) 50%, var(--th-hover) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

/* ── Navbar ───────────────────────────────────────────────────────── */
.navbar {
  background:   var(--th-overlay);
  border-bottom: 1px solid var(--th-border);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

/* ── Page wrapper ─────────────────────────────────────────────────── */
.page {
  min-height: 100vh;
  background: var(--th-bg);
  color:       var(--th-text);
}

/* ╔══════════════════════════════════════════════════════════════════╗
   ║  LEAFLET MAP OVERRIDES                                          ║
   ╚══════════════════════════════════════════════════════════════════╝ */

.leaflet-container {
  height: 100%; width: 100%;
  font-family: 'Inter', system-ui, sans-serif;
  background: var(--th-bg);
}
.leaflet-popup-content-wrapper {
  background:    var(--th-surface) !important;
  border:        1px solid var(--th-border) !important;
  border-radius: 12px !important;
  box-shadow:    var(--shadow-card-md) !important;
  padding:       0 !important;
  color:         var(--th-text) !important;
}
.leaflet-popup-content { margin: 0 !important; color: var(--th-text) !important; }
.leaflet-popup-tip { background: var(--th-surface) !important; }
.leaflet-control-zoom {
  border:        1px solid var(--th-border) !important;
  border-radius: 12px !important;
  overflow:      hidden;
  box-shadow:    var(--shadow-card) !important;
}
.leaflet-control-zoom a {
  background: var(--th-surface) !important;
  color:      var(--th-text-3) !important;
  border-bottom-color: var(--th-border) !important;
  font-size: 16px !important; line-height: 30px !important;
}
.leaflet-control-zoom a:hover {
  background: var(--th-hover) !important;
  color:      #16A34A !important;
}
.leaflet-attribution-flag { display: none !important; }

/* Map ping keyframe */
@keyframes map-ping {
  0%   { transform: scale(1);   opacity: 0.7; }
  100% { transform: scale(2.8); opacity: 0;   }
}
"""

# ════════════════════════════════════════════════════════════════════
# 2. ThemeProvider.tsx  —  no changes, just clean version
# ════════════════════════════════════════════════════════════════════
theme_provider = """'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

const ThemeCtx = createContext<{ theme: Theme; toggle: () => void }>({
  theme: 'light',
  toggle: () => {},
})

export const useTheme = () => useContext(ThemeCtx)

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem('gg_theme') as Theme | null
    const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    const t = stored ?? preferred
    setTheme(t)
    applyTheme(t)
  }, [])

  function applyTheme(t: Theme) {
    document.documentElement.classList.toggle('dark', t === 'dark')
  }

  function toggle() {
    const next: Theme = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    localStorage.setItem('gg_theme', next)
    applyTheme(next)
  }

  // Avoid SSR mismatch — render children only once mounted
  if (!mounted) return <>{children}</>

  return <ThemeCtx.Provider value={{ theme, toggle }}>{children}</ThemeCtx.Provider>
}
"""

# ════════════════════════════════════════════════════════════════════
# 3. layout.tsx
# ════════════════════════════════════════════════════════════════════
layout = """import type { Metadata } from 'next'
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
"""

# ════════════════════════════════════════════════════════════════════
# 4. Navbar.tsx
# ════════════════════════════════════════════════════════════════════
navbar = """'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Leaf, Menu, X, LogOut, Sun, Moon } from 'lucide-react'
import { useTheme } from './ThemeProvider'

const NAV_LINKS = [
  { href: '/live', label: 'Live Feed' },
]

const ROLE_BADGES: Record<string, { label: string; bg: string; text: string; href: string }> = {
  donor:     { label: 'Donor',     bg: 'var(--th-green-bg)',  text: 'var(--th-green-text)',  href: '/donor' },
  ngo:       { label: 'NGO',       bg: 'var(--th-amber-bg)',  text: 'var(--th-amber-text)',  href: '/ngo' },
  volunteer: { label: 'Volunteer', bg: 'var(--th-orange-bg)', text: 'var(--th-orange-text)', href: '/volunteer' },
}

export default function Navbar() {
  const [role, setRole]       = useState<string | null>(null)
  const [name, setName]       = useState<string | null>(null)
  const [open, setOpen]       = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname  = usePathname()
  const router    = useRouter()
  const { theme, toggle } = useTheme()

  useEffect(() => {
    setRole(localStorage.getItem('rq_role'))
    setName(localStorage.getItem('rq_name'))
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname])

  function logout() {
    localStorage.removeItem('rq_role')
    localStorage.removeItem('rq_name')
    router.push('/auth')
  }

  const badge = role ? ROLE_BADGES[role] : null

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${scrolled ? 'navbar' : 'navbar'}`}
      style={{ background: 'var(--th-overlay)', borderBottom: '1px solid var(--th-border)', backdropFilter: 'blur(16px)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center shadow-green"
            style={{ background: '#16A34A' }}>
            <Leaf className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-[15px] tracking-tight" style={{ color: 'var(--th-text)' }}>
            Gemini<span style={{ color: '#16A34A' }}>Grain</span>
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-6 flex-1 justify-center">
          {NAV_LINKS.map(({ href, label }) => (
            <Link key={href} href={href}
              className="text-sm font-medium transition-colors flex items-center gap-1.5"
              style={{ color: pathname === href ? '#16A34A' : 'var(--th-text-3)' }}>
              {href === '/live' && <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />}
              {label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-2">
          {/* Theme toggle */}
          <button onClick={toggle} aria-label="Toggle theme"
            className="btn btn-ghost p-2 rounded-xl"
            style={{ color: 'var(--th-text-3)' }}>
            {theme === 'dark'
              ? <Sun className="w-4 h-4" style={{ color: '#FCD34D' }} />
              : <Moon className="w-4 h-4" />}
          </button>

          {badge && role ? (
            <>
              <Link href={badge.href}
                className="text-xs font-semibold px-3 py-1.5 rounded-full"
                style={{ background: badge.bg, color: badge.text }}>
                {name ?? badge.label}
              </Link>
              {role === 'donor' && (
                <Link href="/donor/submit" className="btn btn-primary text-xs px-3 py-2">
                  + Donate Grain
                </Link>
              )}
              <button onClick={logout} className="btn btn-ghost p-2 rounded-xl">
                <LogOut className="w-4 h-4" />
              </button>
            </>
          ) : (
            <Link href="/auth" className="btn btn-primary text-sm px-4 py-2">
              Get Started
            </Link>
          )}
        </div>

        {/* Mobile burger */}
        <button onClick={() => setOpen(!open)} className="btn btn-ghost md:hidden p-2">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t px-4 py-4 space-y-1"
          style={{ background: 'var(--th-surface)', borderColor: 'var(--th-border)' }}>
          {NAV_LINKS.map(({ href, label }) => (
            <Link key={href} href={href} onClick={() => setOpen(false)}
              className="block py-2.5 text-sm font-medium transition-colors"
              style={{ color: pathname === href ? '#16A34A' : 'var(--th-text-2)' }}>
              {label}
            </Link>
          ))}
          <button onClick={toggle}
            className="flex items-center gap-2 py-2.5 text-sm font-medium w-full"
            style={{ color: 'var(--th-text-2)' }}>
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>
          {!role && (
            <Link href="/auth" onClick={() => setOpen(false)}
              className="btn btn-primary w-full mt-2 text-sm">
              Get Started
            </Link>
          )}
          {role && (
            <button onClick={logout}
              className="block w-full text-left py-2.5 text-sm font-medium"
              style={{ color: '#DC2626' }}>
              Sign Out
            </button>
          )}
        </div>
      )}
    </nav>
  )
}
"""

# ════════════════════════════════════════════════════════════════════
# 5. DonationCard.tsx
# ════════════════════════════════════════════════════════════════════
donation_card = """'use client'

import { Clock, Users, MapPin, CheckCircle, Truck, Brain, Leaf, AlertTriangle, Zap } from 'lucide-react'
import type { Donation } from '@/lib/types'

const URG_CLASS: Record<string, string> = {
  CRITICAL: 'urg urg-critical', HIGH: 'urg urg-high', MEDIUM: 'urg urg-medium', LOW: 'urg urg-low',
}
const STATUS_CLASS: Record<string, string> = {
  PENDING: 'status status-pending', MATCHED: 'status status-matched',
  IN_TRANSIT: 'status status-transit', DELIVERED: 'status status-delivered',
}
const STATUS_LABEL: Record<string, string> = {
  PENDING: 'Pending', MATCHED: 'NGO Matched', IN_TRANSIT: 'In Transit', DELIVERED: 'Delivered',
}
const URG_STRIPE: Record<string, string> = {
  CRITICAL: '#DC2626', HIGH: '#EA580C', MEDIUM: '#D97706', LOW: '#16A34A',
}

interface Props {
  donation: Donation
  showActions?: boolean
  onAccept?: (id: string) => void
  onSkip?:   (id: string) => void
}

export default function DonationCard({ donation, showActions, onAccept, onSkip }: Props) {
  return (
    <div className="card card-hover overflow-hidden transition-all">
      {/* Urgency stripe */}
      <div className="h-[3px]" style={{ background: URG_STRIPE[donation.urgency] }} />

      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold truncate" style={{ color: 'var(--th-text)' }}>{donation.foodName}</h3>
            <p className="text-xs mt-0.5" style={{ color: 'var(--th-text-3)' }}>{donation.donorName}</p>
          </div>
          <div className="flex gap-1.5 shrink-0 flex-wrap justify-end">
            <span className={URG_CLASS[donation.urgency]}>{donation.urgency}</span>
            <span className={STATUS_CLASS[donation.status]}>{STATUS_LABEL[donation.status]}</span>
          </div>
        </div>

        {/* Meta row */}
        <div className="flex flex-wrap gap-3 mb-3">
          {[
            { icon: Users,  val: `${donation.estimatedServings} serves` },
            { icon: Clock,  val: `${donation.spoilageWindowHours}h left` },
            { icon: MapPin, val: donation.location },
          ].map(({ icon: Icon, val }) => (
            <span key={val} className="flex items-center gap-1 text-xs" style={{ color: 'var(--th-text-3)' }}>
              <Icon className="w-3 h-3 shrink-0" />{val}
            </span>
          ))}
          <span className={`flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${
            donation.dietaryType === 'non-vegetarian' ? 'panel-red' : 'panel-green'
          }`} style={{ color: donation.dietaryType === 'non-vegetarian' ? 'var(--th-red-text)' : 'var(--th-green-text)' }}>
            <Leaf className="w-2.5 h-2.5" />
            {donation.dietaryType === 'non-vegetarian' ? 'Non-Veg' : donation.dietaryType === 'vegan' ? 'Vegan' : 'Veg'}
          </span>
        </div>

        {/* Urgency reason */}
        {donation.urgencyReason && (
          <div className="flex items-start gap-1.5 px-3 py-2 panel-amber mb-3 text-xs" style={{ color: 'var(--th-amber-text)' }}>
            <AlertTriangle className="w-3 h-3 shrink-0 mt-0.5" />
            {donation.urgencyReason.slice(0, 90)}{donation.urgencyReason.length > 90 ? '…' : ''}
          </div>
        )}

        {/* NGO match */}
        {donation.ngoMatch && (
          <div className="flex items-center justify-between px-3 py-2.5 panel-green mb-3">
            <div>
              <p className="text-xs font-semibold" style={{ color: 'var(--th-text)' }}>{donation.ngoMatch.name}</p>
              <p className="text-[11px] mt-0.5" style={{ color: 'var(--th-text-3)' }}>
                {donation.ngoMatch.distance} · {donation.ngoMatch.hasVolunteer ? 'Volunteer ready' : 'No volunteer yet'}
              </p>
            </div>
            {donation.ngoMatch.confidence && (
              <div className="text-lg font-black" style={{ color: 'var(--th-green-text)' }}>
                {donation.ngoMatch.confidence}%
              </div>
            )}
          </div>
        )}

        {/* Delivery banner */}
        {(donation.status === 'IN_TRANSIT' || donation.status === 'DELIVERED') && donation.volunteerName && (
          <div className="flex items-center gap-2 px-3 py-2 panel-orange mb-3 text-xs" style={{ color: 'var(--th-orange-text)' }}>
            <Truck className="w-3.5 h-3.5 shrink-0" />
            {donation.status === 'DELIVERED' ? 'Delivered by' : 'En route with'} {donation.volunteerName}
            {donation.status === 'DELIVERED' && <CheckCircle className="w-3.5 h-3.5 ml-auto" style={{ color: 'var(--th-green-text)' }} />}
          </div>
        )}

        {/* Language tag */}
        {donation.detectedLanguage && donation.detectedLanguage !== 'English' && (
          <div className="flex items-center gap-1.5 text-[10px] mb-3" style={{ color: 'var(--th-violet-text)' }}>
            <Brain className="w-3 h-3" /> {donation.detectedLanguage} · processed by Gemini AI
          </div>
        )}

        {/* Actions */}
        {showActions && donation.status === 'PENDING' && (
          <div className="flex gap-2 pt-1">
            <button onClick={() => onSkip?.(donation.id)} className="btn btn-secondary flex-1 text-xs py-2">
              Skip
            </button>
            <button onClick={() => onAccept?.(donation.id)} className="btn btn-primary flex-1 text-xs py-2">
              Accept Pickup
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
"""

files = {
    f'{BASE}/app/globals.css':              globals_css,
    f'{BASE}/components/ThemeProvider.tsx': theme_provider,
    f'{BASE}/app/layout.tsx':               layout,
    f'{BASE}/components/Navbar.tsx':        navbar,
    f'{BASE}/components/DonationCard.tsx':  donation_card,
}

for path, content in files.items():
    os.makedirs(os.path.dirname(path), exist_ok=True)
    open(path, 'w').write(content)
    print(f'✓ {path}')

print('\nPhase 1 done — design tokens, ThemeProvider, Navbar, DonationCard')
