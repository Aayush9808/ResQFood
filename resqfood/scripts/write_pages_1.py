import os
BASE = '/Users/aayus/Desktop/Galgotiya/resqfood'

# ════════════════════════════════════════════════════════════════════
# AUTH PAGE — uses dark glassmorphism intentionally for the hero feel
# ════════════════════════════════════════════════════════════════════
auth_page = """'use client'

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
"""

# ════════════════════════════════════════════════════════════════════
# DONOR DASHBOARD
# ════════════════════════════════════════════════════════════════════
donor_page = """'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Plus, Leaf, Package, Users, CheckCircle, Clock, Loader2 } from 'lucide-react'
import Navbar from '@/components/Navbar'
import DonationCard from '@/components/DonationCard'
import type { Donation, ImpactStats } from '@/lib/types'

export default function DonorDashboard() {
  const router = useRouter()
  const [donations, setDonations] = useState<Donation[]>([])
  const [stats, setStats]         = useState<ImpactStats | null>(null)
  const [loading, setLoading]     = useState(true)
  const [name, setName]           = useState('Donor')

  const fetchData = useCallback(async () => {
    try {
      const [dRes, sRes] = await Promise.all([fetch('/api/donations'), fetch('/api/impact')])
      const dData = await dRes.json()
      const sData = await sRes.json()
      if (dData.success) setDonations((dData.data as Donation[]).filter(d => d.donorId === 'donor-1'))
      if (sData.success) setStats(sData.data)
    } finally { setLoading(false) }
  }, [])

  useEffect(() => {
    const role = localStorage.getItem('rq_role')
    const n    = localStorage.getItem('rq_name')
    if (role !== 'donor') { router.push('/auth'); return }
    if (n) setName(n)
    fetchData()
    const id = setInterval(fetchData, 8000)
    return () => clearInterval(id)
  }, [router, fetchData])

  const statCards = [
    { label: 'Meals Rescued',   value: stats?.mealsRescued ?? 0,       icon: Users,       varColor: 'var(--th-green-text)',  varBg: 'var(--th-green-bg)' },
    { label: 'Active',          value: stats?.activeDonations ?? 0,     icon: Clock,       varColor: 'var(--th-orange-text)', varBg: 'var(--th-orange-bg)' },
    { label: 'Delivered Today', value: stats?.deliveredToday ?? 0,      icon: CheckCircle, varColor: 'var(--th-blue-text)',   varBg: 'var(--th-blue-bg)' },
    { label: 'CO₂ Avoided',     value: `${stats?.co2AvoidedKg ?? 0}kg`, icon: Leaf,        varColor: 'var(--th-violet-text)', varBg: 'var(--th-violet-bg)' },
  ]

  return (
    <div className="page pt-16">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-black" style={{ color: 'var(--th-text)' }}>Your Dashboard</h1>
            <p className="text-sm mt-0.5" style={{ color: 'var(--th-text-3)' }}>Welcome back, {name}</p>
          </div>
          <Link href="/donor/submit" className="btn btn-primary text-sm">
            <Plus className="w-4 h-4" /> Donate Grain
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {statCards.map(({ label, value, icon: Icon, varColor, varBg }) => (
            <div key={label} className="card p-4">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-2"
                style={{ background: varBg }}>
                <Icon className="w-4 h-4" style={{ color: varColor }} />
              </div>
              <div className="text-xl font-black" style={{ color: 'var(--th-text)' }}>
                {typeof value === 'number' ? value.toLocaleString() : value}
              </div>
              <div className="text-xs mt-0.5" style={{ color: 'var(--th-text-3)' }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Donations */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold" style={{ color: 'var(--th-text)' }}>Your Donations</h2>
          <button onClick={fetchData} className="text-xs" style={{ color: 'var(--th-text-3)' }}>Refresh</button>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin" style={{ color: '#16A34A' }} />
          </div>
        ) : donations.length === 0 ? (
          <div className="card flex flex-col items-center py-16">
            <Package className="w-12 h-12 mb-3" style={{ color: 'var(--th-text-4)' }} />
            <p className="font-medium mb-4" style={{ color: 'var(--th-text-3)' }}>No donations yet</p>
            <Link href="/donor/submit" className="btn btn-primary text-sm">
              <Plus className="w-4 h-4" /> Create First Donation
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {donations.map(d => (
              <motion.div key={d.id} initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }}>
                <DonationCard donation={d} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
"""

# ════════════════════════════════════════════════════════════════════
# NGO DASHBOARD
# ════════════════════════════════════════════════════════════════════
ngo_page = """'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Building2, RotateCcw, Loader2 } from 'lucide-react'
import Navbar from '@/components/Navbar'
import DonationCard from '@/components/DonationCard'
import type { Donation } from '@/lib/types'

const TABS = ['ALL', 'PENDING', 'MATCHED'] as const
type Tab = typeof TABS[number]

export default function NGODashboard() {
  const router = useRouter()
  const [donations, setDonations] = useState<Donation[]>([])
  const [tab, setTab]             = useState<Tab>('ALL')
  const [loading, setLoading]     = useState(true)
  const [name, setName]           = useState('NGO')

  const fetchDonations = useCallback(async () => {
    try {
      const res  = await fetch('/api/donations')
      const data = await res.json()
      if (data.success) setDonations(data.data as Donation[])
    } finally { setLoading(false) }
  }, [])

  useEffect(() => {
    const role = localStorage.getItem('rq_role')
    const n    = localStorage.getItem('rq_name')
    if (role !== 'ngo') { router.push('/auth'); return }
    if (n) setName(n)
    fetchDonations()
    const id = setInterval(fetchDonations, 6000)
    return () => clearInterval(id)
  }, [router, fetchDonations])

  async function handleAccept(id: string) {
    await fetch(`/api/donations/${id}`, {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'MATCHED', ngoName: name }),
    })
    fetchDonations()
  }

  const urgOrder = { CRITICAL:0, HIGH:1, MEDIUM:2, LOW:3 }
  const filtered = donations
    .filter(d => tab === 'ALL' || d.status === tab || (tab === 'MATCHED' && d.status === 'MATCHED'))
    .sort((a, b) => (urgOrder[a.urgency] ?? 3) - (urgOrder[b.urgency] ?? 3))

  return (
    <div className="page pt-16">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-black" style={{ color: 'var(--th-text)' }}>NGO Queue</h1>
            <p className="text-sm mt-0.5" style={{ color: 'var(--th-text-3)' }}>Priority-sorted by urgency · {name}</p>
          </div>
          <button onClick={fetchDonations} className="btn btn-ghost p-2">
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Tabs */}
        <div className="tab-group mb-6">
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)} className={`tab-item ${tab === t ? 'active' : ''}`}>
              {t}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin" style={{ color: '#16A34A' }} />
          </div>
        ) : filtered.length === 0 ? (
          <div className="card flex flex-col items-center py-16">
            <Building2 className="w-12 h-12 mb-3" style={{ color: 'var(--th-text-4)' }} />
            <p style={{ color: 'var(--th-text-3)' }}>No donations in this category yet</p>
          </div>
        ) : (
          <AnimatePresence>
            <div className="space-y-3">
              {filtered.map(d => (
                <motion.div key={d.id} initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}>
                  <DonationCard donation={d} showActions onAccept={handleAccept} />
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        )}
      </div>
    </div>
  )
}
"""

# ════════════════════════════════════════════════════════════════════
# VOLUNTEER PAGE
# ════════════════════════════════════════════════════════════════════
volunteer_page = """'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Truck, CheckCircle2, Loader2, Package } from 'lucide-react'
import Navbar from '@/components/Navbar'
import DonationCard from '@/components/DonationCard'
import type { Donation } from '@/lib/types'

export default function VolunteerHub() {
  const router    = useRouter()
  const [all, setAll]           = useState<Donation[]>([])
  const [loading, setLoading]   = useState(true)
  const [name, setName]         = useState('Volunteer')

  const fetchDonations = useCallback(async () => {
    try {
      const res  = await fetch('/api/donations')
      const data = await res.json()
      if (data.success) setAll(data.data as Donation[])
    } finally { setLoading(false) }
  }, [])

  useEffect(() => {
    const role = localStorage.getItem('rq_role')
    const n    = localStorage.getItem('rq_name')
    if (role !== 'volunteer') { router.push('/auth'); return }
    if (n) setName(n)
    fetchDonations()
    const id = setInterval(fetchDonations, 8000)
    return () => clearInterval(id)
  }, [router, fetchDonations])

  async function handleAccept(id: string) {
    await fetch(`/api/donations/${id}`, {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'IN_TRANSIT', volunteerName: name }),
    })
    fetchDonations()
  }

  const available = all.filter(d => d.status === 'MATCHED')
  const myPickups = all.filter(d => d.volunteerName === name)

  return (
    <div className="page pt-16">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-black" style={{ color: 'var(--th-text)' }}>Volunteer Hub</h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--th-text-3)' }}>Deliver food to NGOs · {name}</p>
        </div>

        {myPickups.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-bold mb-3 flex items-center gap-2" style={{ color: 'var(--th-text)' }}>
              <Truck className="w-4 h-4" style={{ color: 'var(--th-orange-text)' }} /> Your Active Pickups
            </h2>
            <div className="space-y-3">
              {myPickups.map(d => (
                <motion.div key={d.id} initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }}>
                  <DonationCard donation={d} />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold flex items-center gap-2" style={{ color: 'var(--th-text)' }}>
              <CheckCircle2 className="w-4 h-4" style={{ color: 'var(--th-green-text)' }} />
              Available Pickups ({available.length})
            </h2>
            <button onClick={fetchDonations} className="text-xs" style={{ color: 'var(--th-text-3)' }}>Refresh</button>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin" style={{ color: '#16A34A' }} />
            </div>
          ) : available.length === 0 ? (
            <div className="card flex flex-col items-center py-12">
              <Package className="w-10 h-10 mb-2" style={{ color: 'var(--th-text-4)' }} />
              <p className="text-sm" style={{ color: 'var(--th-text-3)' }}>No pickups available right now.</p>
              <p className="text-xs mt-1" style={{ color: 'var(--th-text-4)' }}>Check back shortly.</p>
            </div>
          ) : (
            <AnimatePresence>
              <div className="space-y-3">
                {available.map(d => (
                  <motion.div key={d.id} initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}>
                    <DonationCard donation={d} showActions onAccept={handleAccept} />
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  )
}
"""

# ════════════════════════════════════════════════════════════════════
# LIVE FEED
# ════════════════════════════════════════════════════════════════════
live_page = """'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Activity, CheckCircle, Zap, Users, Clock, Loader2 } from 'lucide-react'
import Navbar from '@/components/Navbar'
import DonationCard from '@/components/DonationCard'
import type { Donation, ImpactStats } from '@/lib/types'

const STATUS_TABS = ['ALL', 'PENDING', 'MATCHED', 'IN_TRANSIT', 'DELIVERED'] as const
type StatusTab = typeof STATUS_TABS[number]

function LiveClock() {
  const [t, setT] = useState('')
  useEffect(() => {
    const tick = () => setT(new Date().toLocaleTimeString('en-IN', { hour:'2-digit', minute:'2-digit', second:'2-digit' }))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  return <span className="font-mono text-xs tabular-nums" style={{ color: 'var(--th-text-3)' }}>{t}</span>
}

export default function LiveFeed() {
  const [allDonations, setAll]  = useState<Donation[]>([])
  const [stats, setStats]       = useState<ImpactStats | null>(null)
  const [tab, setTab]           = useState<StatusTab>('ALL')
  const [loading, setLoading]   = useState(true)

  const fetchAll = useCallback(async () => {
    try {
      const [dRes, sRes] = await Promise.all([fetch('/api/donations'), fetch('/api/impact')])
      const dData = await dRes.json()
      const sData = await sRes.json()
      if (dData.success) setAll(dData.data as Donation[])
      if (sData.success) setStats(sData.data)
    } finally { setLoading(false) }
  }, [])

  useEffect(() => {
    fetchAll()
    const id = setInterval(fetchAll, 5000)
    return () => clearInterval(id)
  }, [fetchAll])

  const filtered = allDonations.filter(d => tab === 'ALL' || d.status === tab)

  const impactCards = stats ? [
    { icon: Activity,    label: 'Total',         value: stats.totalDonations,  varColor: 'var(--th-violet-text)', varBg: 'var(--th-violet-bg)' },
    { icon: Users,       label: 'Meals Rescued',  value: stats.mealsRescued,    varColor: 'var(--th-green-text)',  varBg: 'var(--th-green-bg)' },
    { icon: Zap,         label: 'Active Now',     value: stats.activeDonations, varColor: 'var(--th-orange-text)', varBg: 'var(--th-orange-bg)' },
    { icon: CheckCircle, label: 'Delivered',      value: stats.deliveredToday,  varColor: 'var(--th-blue-text)',   varBg: 'var(--th-blue-bg)' },
  ] : []

  return (
    <div className="page pt-16">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <h1 className="text-2xl font-black" style={{ color: 'var(--th-text)' }}>Live Feed</h1>
            </div>
            <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--th-text-3)' }}>
              <Clock className="w-3.5 h-3.5" />
              <span>Updates every 5s</span>
              <span>·</span>
              <LiveClock />
            </div>
          </div>
          <button onClick={fetchAll} className="btn btn-ghost text-xs px-3 py-1.5">Refresh</button>
        </div>

        {/* Impact stats */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {impactCards.map(({ icon: Icon, label, value, varColor, varBg }) => (
              <div key={label} className="card p-3.5">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-2"
                  style={{ background: varBg }}>
                  <Icon className="w-4 h-4" style={{ color: varColor }} />
                </div>
                <div className="text-xl font-black" style={{ color: 'var(--th-text)' }}>
                  {value.toLocaleString()}
                </div>
                <div className="text-[11px]" style={{ color: 'var(--th-text-3)' }}>{label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {STATUS_TABS.map(t => {
            const count = t === 'ALL' ? allDonations.length : allDonations.filter(d => d.status === t).length
            const isActive = tab === t
            return (
              <button key={t} onClick={() => setTab(t)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border"
                style={{
                  background:  isActive ? '#16A34A' : 'var(--th-surface)',
                  color:       isActive ? '#fff'    : 'var(--th-text-2)',
                  borderColor: isActive ? '#16A34A' : 'var(--th-border)',
                  boxShadow:   isActive ? '0 4px 16px -2px rgb(22 163 74/0.30)' : 'var(--shadow-card)',
                }}>
                {t}
                <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold"
                  style={{
                    background: isActive ? 'rgba(255,255,255,0.2)' : 'var(--th-hover)',
                    color:      isActive ? '#fff' : 'var(--th-text-3)',
                  }}>
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {/* List */}
        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin" style={{ color: '#16A34A' }} />
          </div>
        ) : filtered.length === 0 ? (
          <div className="card flex flex-col items-center py-16">
            <Activity className="w-12 h-12 mb-3" style={{ color: 'var(--th-text-4)' }} />
            <p style={{ color: 'var(--th-text-3)' }}>No donations in this category</p>
          </div>
        ) : (
          <AnimatePresence>
            <div className="space-y-3">
              {filtered.map(d => (
                <motion.div key={d.id} initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}>
                  <DonationCard donation={d} />
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        )}
      </div>
    </div>
  )
}
"""

files = {
    f'{BASE}/app/auth/page.tsx':       auth_page,
    f'{BASE}/app/donor/page.tsx':      donor_page,
    f'{BASE}/app/ngo/page.tsx':        ngo_page,
    f'{BASE}/app/volunteer/page.tsx':  volunteer_page,
    f'{BASE}/app/live/page.tsx':       live_page,
}

for path, content in files.items():
    os.makedirs(os.path.dirname(path), exist_ok=True)
    open(path, 'w').write(content)
    print(f'✓ {path}')

print('\nPhase 2 done — all dashboard pages use CSS variable tokens')
