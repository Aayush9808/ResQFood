'use client'

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
