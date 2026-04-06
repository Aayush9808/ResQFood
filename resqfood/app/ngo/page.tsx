'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Building2, CheckCircle, Clock, Users, Zap, LogOut, RefreshCw, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import Navbar from '@/components/Navbar'
import DonationCard from '@/components/DonationCard'
import type { Donation } from '@/lib/types'
import { cn } from '@/lib/utils'

const FILTER_TABS: { id: string; label: string; color: string }[] = [
  { id: 'all',         label: 'All',          color: 'text-emerald-300'  },
  { id: 'PENDING',     label: 'Pending',      color: 'text-violet-300'   },
  { id: 'MATCHED',     label: 'Matched',      color: 'text-amber-300'    },
  { id: 'IN_TRANSIT',  label: 'In Transit',   color: 'text-orange-300'   },
  { id: 'DELIVERED',   label: 'Delivered',    color: 'text-emerald-400'  },
]

export default function NGODashboard() {
  const router = useRouter()
  const [ngoName,    setNgoName]    = useState('NGO Partner')
  const [donations,  setDonations]  = useState<Donation[]>([])
  const [filter,     setFilter]     = useState('all')
  const [loading,    setLoading]    = useState(true)
  const [accepting,  setAccepting]  = useState<string | null>(null)

  useEffect(() => {
    const role = localStorage.getItem('rq_role')
    const name = localStorage.getItem('rq_name')
    if (role !== 'ngo') { router.push('/auth'); return }
    if (name) setNgoName(name)
  }, [router])

  const fetchDonations = useCallback(async () => {
    try {
      const res  = await fetch('/api/donations')
      const data = await res.json()
      if (data.success) setDonations(data.data)
    } catch { /* silent */ }
    finally { setLoading(false) }
  }, [])

  useEffect(() => {
    fetchDonations()
    const id = setInterval(fetchDonations, 5000)
    return () => clearInterval(id)
  }, [fetchDonations])

  async function acceptDonation(id: string) {
    setAccepting(id)
    try {
      const res = await fetch(`/api/donations/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'IN_TRANSIT', ngoId: 'ngo-1', ngoName }),
      })
      const data = await res.json()
      if (!data.success) throw new Error()
      toast.success('Donation accepted! Notifying volunteers…')
      fetchDonations()
    } catch {
      toast.error('Failed to accept. Please try again.')
    } finally {
      setAccepting(null)
    }
  }

  const displayed = filter === 'all'
    ? donations
    : donations.filter((d) => d.status === filter)

  // Sort: CRITICAL → HIGH → MEDIUM → LOW, then by createdAt
  const urgencyOrder: Record<string, number> = { CRITICAL: 0, HIGH: 1, MEDIUM: 2, LOW: 3 }
  const sorted = [...displayed].sort(
    (a, b) => (urgencyOrder[a.urgency] - urgencyOrder[b.urgency]) ||
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  // Stats
  const pendingCount  = donations.filter((d) => d.status === 'PENDING').length
  const matchedCount  = donations.filter((d) => d.status === 'IN_TRANSIT').length
  const deliveredToday = donations.filter((d) => d.status === 'DELIVERED').length
  const totalMeals    = donations.reduce((s, d) => s + (d.estimatedServings || 0), 0)

  return (
    <div className="min-h-screen bg-mesh">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 pt-28 pb-16">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
                <Building2 className="w-4 h-4 text-amber-400" />
              </div>
              <span className="text-amber-400 text-sm font-medium">{ngoName}</span>
            </div>
            <h1 className="text-2xl font-bold text-emerald-50">Incoming Food Requests</h1>
            <p className="text-rq-muted text-sm mt-1">Priority-sorted by urgency and spoilage window</p>
          </div>
          <button
            onClick={fetchDonations}
            className="p-2.5 rounded-xl border border-emerald-900/40 text-rq-muted hover:text-emerald-300 hover:border-emerald-700/50 transition-all"
            title="Refresh"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-3 mb-8">
          {[
            { label: 'Awaiting Pickup', val: pendingCount,   icon: Clock,       color: 'text-violet-400', border: 'border-violet-900/30', bg: 'bg-violet-500/5'   },
            { label: 'In Transit',      val: matchedCount,   icon: Zap,         color: 'text-orange-400', border: 'border-orange-900/30', bg: 'bg-orange-500/5'   },
            { label: 'Delivered Today', val: deliveredToday, icon: CheckCircle, color: 'text-emerald-400', border: 'border-emerald-900/30', bg: 'bg-emerald-500/5' },
            { label: 'Total Meals',     val: totalMeals,     icon: Users,       color: 'text-amber-400',  border: 'border-amber-900/30',  bg: 'bg-amber-500/5'     },
          ].map(({ label, val, icon: Icon, color, border, bg }) => (
            <div key={label} className={`p-4 rounded-xl border ${border} ${bg}`}>
              <Icon className={`w-5 h-5 ${color} mb-2`} />
              <div className={`text-xl font-bold ${color}`}>{val}</div>
              <div className="text-xs text-rq-muted mt-0.5">{label}</div>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div className="flex gap-1 p-1 bg-[#0C1710] rounded-xl border border-emerald-900/30 mb-6 overflow-x-auto">
          {FILTER_TABS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setFilter(id)}
              className={cn(
                'flex-1 min-w-[72px] py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap',
                filter === id
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                  : 'text-rq-muted hover:text-emerald-300',
              )}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Donation list */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-7 h-7 text-emerald-500 animate-spin" />
          </div>
        ) : sorted.length === 0 ? (
          <div className="text-center py-16">
            <Building2 className="w-10 h-10 text-rq-muted mx-auto mb-3" />
            <p className="text-rq-muted">No donations in this category yet</p>
          </div>
        ) : (
          <AnimatePresence>
            <div className="space-y-4">
              {sorted.map((donation) => (
                <motion.div
                  key={donation.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <DonationCard
                    donation={donation}
                    viewAs="ngo"
                    onAccept={acceptDonation}
                    accepting={accepting}
                  />
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        )}
      </main>
    </div>
  )
}
