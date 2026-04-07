BASE = '/Users/aayus/Desktop/Galgotiya/resqfood'

# ── DonationCard.tsx ────────────────────────────────────────────────
donation_card = """'use client'

import { Clock, Users, MapPin, CheckCircle, Truck, Brain, Leaf, AlertTriangle } from 'lucide-react'
import type { Donation } from '@/lib/types'

const URGENCY_COLOR: Record<string, string> = { CRITICAL:'#DC2626', HIGH:'#EA580C', MEDIUM:'#D97706', LOW:'#16A34A' }
const URGENCY_BG:    Record<string, string> = { CRITICAL:'#FEF2F2', HIGH:'#FFF7ED', MEDIUM:'#FFFBEB', LOW:'#F0FDF4' }
const STATUS_LABEL: Record<string, string>  = { PENDING:'Pending', MATCHED:'NGO Matched', IN_TRANSIT:'In Transit', DELIVERED:'Delivered!' }
const STATUS_BG:    Record<string, string>  = { PENDING:'#EDE9FE', MATCHED:'#FFFBEB', IN_TRANSIT:'#FFF7ED', DELIVERED:'#F0FDF4' }
const STATUS_COL:   Record<string, string>  = { PENDING:'#7C3AED', MATCHED:'#D97706', IN_TRANSIT:'#EA580C', DELIVERED:'#16A34A' }

interface Props {
  donation: Donation
  showActions?: boolean
  onAccept?: (id: string) => void
  onSkip?:   (id: string) => void
}

export default function DonationCard({ donation, showActions, onAccept, onSkip }: Props) {
  const uc = URGENCY_COLOR[donation.urgency] ?? '#16A34A'
  const ub = URGENCY_BG[donation.urgency]   ?? '#F0FDF4'

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all overflow-hidden">
      {/* Top urgency stripe */}
      <div className="h-1 w-full" style={{ background: uc }} />

      <div className="p-4">
        {/* Header row */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-gray-900 truncate">{donation.foodName}</h3>
            <p className="text-xs text-gray-500 mt-0.5">{donation.donorName}</p>
          </div>
          <div className="flex gap-1.5 shrink-0">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={{ background: ub, color: uc }}>
              {donation.urgency}
            </span>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
              style={{ background: STATUS_BG[donation.status], color: STATUS_COL[donation.status] }}>
              {STATUS_LABEL[donation.status]}
            </span>
          </div>
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-4 mb-3 flex-wrap">
          <span className="flex items-center gap-1 text-xs text-gray-500">
            <Users className="w-3 h-3" />{donation.estimatedServings} serves
          </span>
          <span className="flex items-center gap-1 text-xs text-gray-500">
            <Clock className="w-3 h-3" />{donation.spoilageWindowHours}h left
          </span>
          <span className="flex items-center gap-1 text-xs text-gray-500">
            <MapPin className="w-3 h-3" />{donation.location}
          </span>
          <span className={`flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${donation.dietaryType === 'non-vegetarian' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-700'}`}>
            <Leaf className="w-2.5 h-2.5" />
            {donation.dietaryType === 'non-vegetarian' ? 'Non-Veg' : donation.dietaryType === 'vegan' ? 'Vegan' : 'Veg'}
          </span>
        </div>

        {/* Urgency reason */}
        {donation.urgencyReason && (
          <div className="flex items-start gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] mb-3"
            style={{ background: ub, color: uc }}>
            <AlertTriangle className="w-3 h-3 shrink-0 mt-0.5" />
            {donation.urgencyReason.slice(0, 90)}{donation.urgencyReason.length > 90 ? '…' : ''}
          </div>
        )}

        {/* NGO match */}
        {donation.ngoMatch && (
          <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-green-50 border border-green-100 mb-3">
            <div>
              <p className="text-xs font-semibold text-gray-900">{donation.ngoMatch.name}</p>
              <p className="text-[11px] text-gray-500">{donation.ngoMatch.distance} · {donation.ngoMatch.hasVolunteer ? 'Volunteer ready' : 'No volunteer yet'}</p>
            </div>
            {donation.ngoMatch.confidence && (
              <div className="text-lg font-black text-green-600">{donation.ngoMatch.confidence}%</div>
            )}
          </div>
        )}

        {/* Delivery status (in transit / delivered) */}
        {(donation.status === 'IN_TRANSIT' || donation.status === 'DELIVERED') && donation.volunteerName && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-orange-50 border border-orange-100 mb-3">
            <Truck className="w-3.5 h-3.5 text-orange-500" />
            <span className="text-[11px] text-orange-800 font-medium">{donation.status === 'DELIVERED' ? 'Delivered by' : 'En route with'} {donation.volunteerName}</span>
            {donation.status === 'DELIVERED' && <CheckCircle className="w-3.5 h-3.5 text-green-500 ml-auto" />}
          </div>
        )}

        {/* AI language indicator */}
        {donation.detectedLanguage && donation.detectedLanguage !== 'English' && (
          <div className="flex items-center gap-1.5 text-[10px] text-violet-600 mb-3">
            <Brain className="w-3 h-3" /> {donation.detectedLanguage} · processed by Gemini AI
          </div>
        )}

        {/* Actions */}
        {showActions && donation.status === 'PENDING' && (
          <div className="flex gap-2 pt-1">
            <button onClick={() => onSkip?.(donation.id)}
              className="flex-1 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
              Skip
            </button>
            <button onClick={() => onAccept?.(donation.id)}
              className="flex-1 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white text-xs font-bold transition-all hover:-translate-y-0.5 shadow-sm shadow-green-600/20">
              Accept Pickup
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
"""

# ── app/donor/page.tsx ───────────────────────────────────────────────
donor_page = """'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Plus, Leaf, Package, Users, CheckCircle, Clock, Loader2, LogOut } from 'lucide-react'
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
      const [dRes, sRes] = await Promise.all([
        fetch('/api/donations'),
        fetch('/api/impact'),
      ])
      const dData = await dRes.json()
      const sData = await sRes.json()
      if (dData.success) setDonations((dData.data as Donation[]).filter(d => d.donorId === 'donor-1'))
      if (sData.success) setStats(sData.data)
    } finally {
      setLoading(false)
    }
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
    { label:'Meals Rescued',   value: stats?.mealsRescued ?? 0,      icon: Users,        color:'text-green-600',  bg:'bg-green-50' },
    { label:'Active',          value: stats?.activeDonations ?? 0,    icon: Clock,        color:'text-orange-600', bg:'bg-orange-50' },
    { label:'Delivered Today', value: stats?.deliveredToday ?? 0,     icon: CheckCircle,  color:'text-blue-600',   bg:'bg-blue-50' },
    { label:'CO₂ Avoided',     value: `${stats?.co2AvoidedKg ?? 0}kg`,icon: Leaf,         color:'text-violet-600', bg:'bg-violet-50' },
  ]

  return (
    <div className="min-h-screen bg-rq-bg">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-8 pt-24">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-black text-gray-900">Your Dashboard</h1>
            <p className="text-gray-500 text-sm mt-0.5">Welcome back, {name}</p>
          </div>
          <Link href="/donor/submit"
            className="flex items-center gap-2 px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white text-sm font-bold rounded-xl shadow-sm shadow-green-600/20 transition-all hover:-translate-y-0.5">
            <Plus className="w-4 h-4" /> Donate Food
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {statCards.map(({ label, value, icon: Icon, color, bg }) => (
            <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center mb-2`}>
                <Icon className={`w-4 h-4 ${color}`} />
              </div>
              <div className="text-xl font-black text-gray-900">{value.toLocaleString()}</div>
              <div className="text-xs text-gray-500 mt-0.5">{label}</div>
            </div>
          ))}
        </div>

        {/* Donations list */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-gray-900">Your Donations</h2>
          <button onClick={fetchData} className="text-xs text-gray-500 hover:text-gray-700">Refresh</button>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="w-8 h-8 text-green-500 animate-spin" />
          </div>
        ) : donations.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
            <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium mb-4">No donations yet</p>
            <Link href="/donor/submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-xl transition-colors">
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

# ── app/ngo/page.tsx ─────────────────────────────────────────────────
ngo_page = """'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Building2, RotateCcw, Loader2, Filter } from 'lucide-react'
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
    } finally {
      setLoading(false)
    }
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
    <div className="min-h-screen bg-rq-bg">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-8 pt-24">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-black text-gray-900">NGO Queue</h1>
            <p className="text-gray-500 text-sm mt-0.5">Priority-sorted by urgency · {name}</p>
          </div>
          <button onClick={fetchDonations}
            className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-400 hover:text-gray-600 transition-colors">
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-1 p-1 bg-gray-100 rounded-xl mb-6">
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${
                tab === t ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>
              {t}
            </button>
          ))}
        </div>

        {/* List */}
        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="w-8 h-8 text-green-500 animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
            <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No donations in this category yet</p>
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

# ── app/volunteer/page.tsx ───────────────────────────────────────────
volunteer_page = """'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Truck, CheckCircle2, Loader2, Package } from 'lucide-react'
import Navbar from '@/components/Navbar'
import DonationCard from '@/components/DonationCard'
import type { Donation } from '@/lib/types'

export default function VolunteerHub() {
  const router      = useRouter()
  const [all, setAll]           = useState<Donation[]>([])
  const [loading, setLoading]   = useState(true)
  const [name, setName]         = useState('Volunteer')

  const fetchDonations = useCallback(async () => {
    try {
      const res  = await fetch('/api/donations')
      const data = await res.json()
      if (data.success) setAll(data.data as Donation[])
    } finally {
      setLoading(false)
    }
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
    <div className="min-h-screen bg-rq-bg">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-8 pt-24">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-black text-gray-900">Volunteer Hub</h1>
          <p className="text-gray-500 text-sm mt-0.5">Pick up food and deliver it to an NGO · {name}</p>
        </div>

        {/* My pickups */}
        {myPickups.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
              <Truck className="w-4 h-4 text-orange-500" /> Your Active Pickups
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

        {/* Available */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-gray-700 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" /> Available Pickups ({available.length})
            </h2>
            <button onClick={fetchDonations} className="text-xs text-gray-500 hover:text-gray-700">Refresh</button>
          </div>
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 text-green-500 animate-spin" />
            </div>
          ) : available.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
              <Package className="w-10 h-10 text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-500">No pickups available right now.</p>
              <p className="text-xs text-gray-400 mt-1">Check back shortly — donations come in fast.</p>
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

# ── app/live/page.tsx ────────────────────────────────────────────────
live_page = """'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Activity, CheckCircle, Zap, Users, Clock, Loader2 } from 'lucide-react'
import Navbar from '@/components/Navbar'
import DonationCard from '@/components/DonationCard'
import type { Donation, ImpactStats } from '@/lib/types'

const STATUS_TABS = ['ALL', 'PENDING', 'MATCHED', 'IN_TRANSIT', 'DELIVERED'] as const
type StatusTab = typeof STATUS_TABS[number]

const STAT_LABELS: Record<string, string> = {
  ALL: 'Total', PENDING: 'Pending', MATCHED: 'Matched', IN_TRANSIT: 'In Transit', DELIVERED: 'Delivered',
}

function LiveClock() {
  const [t, setT] = useState('')
  useEffect(() => {
    const tick = () => setT(new Date().toLocaleTimeString('en-IN', { hour:'2-digit', minute:'2-digit', second:'2-digit' }))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  return <span className="font-mono text-xs text-gray-400 tabular-nums">{t}</span>
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
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchAll()
    const id = setInterval(fetchAll, 5000)
    return () => clearInterval(id)
  }, [fetchAll])

  const filtered = allDonations.filter(d => tab === 'ALL' || d.status === tab)

  const impactCards = stats ? [
    { icon: Activity,      label: 'Total',        value: stats.totalDonations,  color: 'text-violet-600', bg: 'bg-violet-50' },
    { icon: Users,         label: 'Meals Rescued', value: stats.mealsRescued,   color: 'text-green-600',  bg: 'bg-green-50' },
    { icon: Zap,           label: 'Active Now',    value: stats.activeDonations, color: 'text-orange-600', bg: 'bg-orange-50' },
    { icon: CheckCircle,   label: 'Delivered',     value: stats.deliveredToday, color: 'text-blue-600',   bg: 'bg-blue-50' },
  ] : []

  return (
    <div className="min-h-screen bg-rq-bg">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-8 pt-24">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <h1 className="text-2xl font-black text-gray-900">Live Feed</h1>
            </div>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <Clock className="w-3.5 h-3.5" />
              <span>Updates every 5 seconds</span>
              <span className="mx-1">·</span>
              <LiveClock />
            </div>
          </div>
          <button onClick={fetchAll}
            className="text-xs text-gray-500 hover:text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors">
            Refresh
          </button>
        </div>

        {/* Impact stats */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {impactCards.map(({ icon: Icon, label, value, color, bg }) => (
              <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3.5">
                <div className={`w-8 h-8 rounded-xl ${bg} flex items-center justify-center mb-2`}>
                  <Icon className={`w-4 h-4 ${color}`} />
                </div>
                <div className="text-xl font-black text-gray-900">{value.toLocaleString()}</div>
                <div className="text-[11px] text-gray-500">{label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Status tabs */}
        <div className="flex gap-1.5 mb-6 flex-wrap">
          {STATUS_TABS.map(t => {
            const count = t === 'ALL' ? allDonations.length : allDonations.filter(d => d.status === t).length
            return (
              <button key={t} onClick={() => setTab(t)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                  tab === t
                    ? 'bg-green-600 text-white border-green-600 shadow-sm shadow-green-600/20'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}>
                {STAT_LABELS[t]}
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${tab === t ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'}`}>
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Donations */}
        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="w-8 h-8 text-green-500 animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
            <Activity className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No donations in this category</p>
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
    f'{BASE}/components/DonationCard.tsx': donation_card,
    f'{BASE}/app/donor/page.tsx':          donor_page,
    f'{BASE}/app/ngo/page.tsx':            ngo_page,
    f'{BASE}/app/volunteer/page.tsx':      volunteer_page,
    f'{BASE}/app/live/page.tsx':           live_page,
}

for path, content in files.items():
    open(path, 'w').write(content)
    print(f'Written {path}')
