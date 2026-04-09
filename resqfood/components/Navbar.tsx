'use client'

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
