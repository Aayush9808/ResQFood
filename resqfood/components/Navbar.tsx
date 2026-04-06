'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Heart, LogOut, Menu, X, Zap } from 'lucide-react'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import type { UserRole } from '@/lib/types'

const roleLabel: Record<UserRole, string> = {
  donor:     'Food Donor',
  ngo:       'NGO Partner',
  volunteer: 'Volunteer',
}

const roleColor: Record<UserRole, string> = {
  donor:     'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
  ngo:       'text-violet-400  bg-violet-500/10  border-violet-500/30',
  volunteer: 'text-orange-400  bg-orange-500/10  border-orange-500/30',
}

const roleHome: Record<UserRole, string> = {
  donor:     '/donor',
  ngo:       '/ngo',
  volunteer: '/volunteer',
}

export default function Navbar() {
  const router     = useRouter()
  const [role, setRole] = useState<UserRole | null>(null)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('rq_role') as UserRole | null
    setRole(stored)
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function signOut() {
    localStorage.removeItem('rq_role')
    router.push('/')
  }

  return (
    <nav
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-[#060C09]/90 backdrop-blur-md border-b border-emerald-900/30 py-3'
          : 'bg-transparent py-5',
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Heart className="w-4 h-4 text-white" fill="white" />
          </div>
          <span className="font-bold text-lg text-emerald-50 tracking-tight">
            ResQ<span className="text-emerald-400">Food</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {role && (
            <>
              <Link
                href={roleHome[role]}
                className="text-sm text-rq-muted hover:text-emerald-300 transition-colors"
              >
                Dashboard
              </Link>
              {role === 'donor' && (
                <Link
                  href="/donor/submit"
                  className="text-sm text-rq-muted hover:text-emerald-300 transition-colors"
                >
                  Donate Food
                </Link>
              )}
              <Link
                href="/live"
                className="text-sm text-rq-muted hover:text-emerald-300 transition-colors flex items-center gap-1"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Feed
              </Link>
            </>
          )}
        </div>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-3">
          {role ? (
            <>
              <span className={cn('text-xs px-2.5 py-1 rounded-full border font-medium', roleColor[role])}>
                {roleLabel[role]}
              </span>
              <button
                onClick={signOut}
                className="flex items-center gap-1.5 text-sm text-rq-muted hover:text-red-400 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/auth"
                className="text-sm text-rq-muted hover:text-emerald-300 transition-colors"
              >
                Sign in
              </Link>
              <Link
                href="/auth"
                className="flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white transition-colors shadow-lg shadow-emerald-500/20"
              >
                <Zap className="w-3.5 h-3.5" />
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-rq-muted p-1"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#0C1710] border-t border-emerald-900/30 px-4 py-4 flex flex-col gap-3">
          {role ? (
            <>
              <Link href={roleHome[role]} className="text-sm text-emerald-100 py-2" onClick={() => setOpen(false)}>Dashboard</Link>
              {role === 'donor' && (
                <Link href="/donor/submit" className="text-sm text-emerald-100 py-2" onClick={() => setOpen(false)}>Donate Food</Link>
              )}
              <Link href="/live" className="text-sm text-emerald-100 py-2" onClick={() => setOpen(false)}>Live Feed</Link>
              <button onClick={signOut} className="text-sm text-red-400 text-left py-2">Sign out</button>
            </>
          ) : (
            <Link href="/auth" className="text-sm text-emerald-300 py-2" onClick={() => setOpen(false)}>Get Started →</Link>
          )}
        </div>
      )}
    </nav>
  )
}
