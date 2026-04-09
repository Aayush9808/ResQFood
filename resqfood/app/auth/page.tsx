'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Utensils, Building2, Bike, ArrowRight, Leaf } from 'lucide-react'
import Link from 'next/link'
import type { UserRole } from '@/lib/types'

const ROLES: {
  role: UserRole; icon: typeof Utensils; title: string; desc: string
  accent: string; panelVar: string; borderVar: string; dotColor: string
}[] = [
  {
    role: 'donor', icon: Utensils, title: 'Food Donor',
    desc: 'I have surplus food to donate from a restaurant, event, or hostel.',
    accent: '#4ADE80', panelVar: 'var(--th-green-bg)', borderVar: 'var(--th-green-border)', dotColor: '#16A34A',
  },
  {
    role: 'ngo', icon: Building2, title: 'NGO Partner',
    desc: 'We are an NGO, shelter, or community kitchen that can receive food.',
    accent: '#A78BFA', panelVar: 'var(--th-violet-bg)', borderVar: 'var(--th-violet-border)', dotColor: '#7C3AED',
  },
  {
    role: 'volunteer', icon: Bike, title: 'Volunteer',
    desc: 'I want to pick up and deliver rescued food to those in need.',
    accent: '#FB923C', panelVar: 'var(--th-orange-bg)', borderVar: 'var(--th-orange-border)', dotColor: '#EA580C',
  },
]

export default function AuthPage() {
  const router = useRouter()
  const [selected, setSelected] = useState<UserRole | null>(null)
  const [loading, setLoading]   = useState(false)

  function proceed() {
    if (!selected) return
    setLoading(true)
    localStorage.setItem('rq_role', selected)
    localStorage.setItem('rq_name',
      selected === 'donor' ? 'Aayush (Donor)' :
      selected === 'ngo'   ? 'Asha Foundation' : 'Priya (Volunteer)')
    setTimeout(() => router.push(`/${selected}`), 400)
  }

  return (
    <div className="page min-h-screen flex flex-col items-center justify-center px-4 py-16">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 mb-10">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-green"
          style={{ background: '#16A34A' }}>
          <Leaf className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-bold" style={{ color: 'var(--th-text)' }}>
          Gemini<span style={{ color: '#16A34A' }}>Grain</span>
        </span>
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="card p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--th-text)' }}>
              Choose your role
            </h1>
            <p className="text-sm" style={{ color: 'var(--th-text-3)' }}>
              Select how you want to use GeminiGrain today
            </p>
          </div>

          <div className="space-y-3 mb-6">
            {ROLES.map(({ role, icon: Icon, title, desc, accent, panelVar, borderVar, dotColor }) => (
              <button
                key={role}
                onClick={() => setSelected(role)}
                className="w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all duration-150"
                style={{
                  background:   selected === role ? panelVar  : 'var(--th-hover)',
                  borderColor:  selected === role ? borderVar : 'var(--th-border)',
                  boxShadow:    selected === role ? `0 0 0 2px ${dotColor}33` : 'none',
                }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors"
                  style={{
                    background: selected === role ? panelVar : 'var(--th-surface)',
                    border:     `1px solid ${selected === role ? borderVar : 'var(--th-border)'}`,
                  }}>
                  <Icon className="w-5 h-5" style={{ color: selected === role ? accent : 'var(--th-text-3)' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm" style={{ color: selected === role ? accent : 'var(--th-text)' }}>
                    {title}
                  </div>
                  <div className="text-xs mt-0.5 leading-relaxed" style={{ color: 'var(--th-text-3)' }}>
                    {desc}
                  </div>
                </div>
                {selected === role && (
                  <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: dotColor }} />
                )}
              </button>
            ))}
          </div>

          <button
            onClick={proceed}
            disabled={!selected || loading}
            className="btn btn-primary w-full py-3.5 text-sm"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>Continue <ArrowRight className="w-4 h-4" /></>
            )}
          </button>

          <p className="text-center text-xs mt-4" style={{ color: 'var(--th-text-4)' }}>
            By continuing, you agree to support food rescue efforts. No account required.
          </p>
        </div>
      </motion.div>
    </div>
  )
}
