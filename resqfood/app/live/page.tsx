'use client'

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
