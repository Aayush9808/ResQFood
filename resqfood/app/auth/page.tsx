'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Utensils, Building2, Bike, ArrowRight, Heart } from 'lucide-react'
import Link from 'next/link'
import type { UserRole } from '@/lib/types'

const ROLES: { role: UserRole; icon: typeof Utensils; title: string; desc: string; color: string; border: string; bg: string; dot: string }[] = [
  {
    role:   'donor',
    icon:   Utensils,
    title:  'Food Donor',
    desc:   'I have surplus food to donate from a restaurant, event, or hostel.',
    color:  'text-emerald-400',
    border: 'border-emerald-500/40',
    bg:     'bg-emerald-500/8',
    dot:    'bg-emerald-400',
  },
  {
    role:   'ngo',
    icon:   Building2,
    title:  'NGO Partner',
    desc:   'We are an NGO, shelter, or community kitchen that can receive food.',
    color:  'text-violet-400',
    border: 'border-violet-500/40',
    bg:     'bg-violet-500/8',
    dot:    'bg-violet-400',
  },
  {
    role:   'volunteer',
    icon:   Bike,
    title:  'Volunteer',
    desc:   'I want to pick up and deliver rescued food to those in need.',
    color:  'text-orange-400',
    border: 'border-orange-500/40',
    bg:     'bg-orange-500/8',
    dot:    'bg-orange-400',
  },
]

export default function AuthPage() {
  const router   = useRouter()
  const [selected, setSelected] = useState<UserRole | null>(null)
  const [loading, setLoading]   = useState(false)

  function proceed() {
    if (!selected) return
    setLoading(true)
    localStorage.setItem('rq_role', selected)
    localStorage.setItem('rq_name', selected === 'donor' ? 'Aayush (Donor)' : selected === 'ngo' ? 'Asha Foundation' : 'Priya (Volunteer)')
    setTimeout(() => {
      router.push(`/${selected}`)
    }, 400)
  }

  return (
    <div className="min-h-screen bg-mesh flex flex-col items-center justify-center px-4 py-16">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 mb-10">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
          <Heart className="w-4.5 h-4.5 text-white" fill="white" />
        </div>
        <span className="text-xl font-bold text-emerald-50">ResQ<span className="text-emerald-400">Food</span></span>
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg"
      >
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-emerald-50">Choose your role</h1>
          <p className="text-rq-muted mt-2 text-sm">Select how you want to use ResQFood today</p>
        </div>

        <div className="space-y-3">
          {ROLES.map(({ role, icon: Icon, title, desc, color, border, bg, dot }) => (
            <button
              key={role}
              onClick={() => setSelected(role)}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 text-left ${
                selected === role
                  ? `${border} ${bg}`
                  : 'border-emerald-900/30 bg-[#0C1710] hover:border-emerald-800/50'
              }`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                selected === role ? `${bg} ${color}` : 'bg-[#172419] text-rq-muted'
              }`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className={`font-medium text-sm ${selected === role ? color : 'text-emerald-100'}`}>{title}</div>
                <div className="text-xs text-rq-muted mt-0.5 leading-relaxed">{desc}</div>
              </div>
              {selected === role && (
                <div className={`w-2 h-2 rounded-full shrink-0 ${dot}`} />
              )}
            </button>
          ))}
        </div>

        <button
          onClick={proceed}
          disabled={!selected || loading}
          className={`w-full mt-6 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 ${
            selected
              ? 'bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg shadow-emerald-500/20 hover:-translate-y-0.5'
              : 'bg-emerald-900/30 text-rq-subtle cursor-not-allowed'
          }`}
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              Continue <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

        <p className="text-center text-xs text-rq-muted mt-5">
          By continuing, you agree to support food rescue efforts. No account required.
        </p>
      </motion.div>
    </div>
  )
}
