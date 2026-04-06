'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Bike, MapPin, CheckCircle, Package, Loader2, Trophy, ArrowRight } from 'lucide-react'
import toast from 'react-hot-toast'
import Navbar from '@/components/Navbar'
import DonationCard from '@/components/DonationCard'
import type { Donation } from '@/lib/types'
import { cn } from '@/lib/utils'

export default function VolunteerDashboard() {
  const router = useRouter()
  const [volunteerName, setVolunteerName] = useState('Volunteer')
  const [donations,     setDonations]     = useState<Donation[]>([])
  const [loading,       setLoading]       = useState(true)
  const [actioning,     setActioning]     = useState<string | null>(null)
  const [streak,        setStreak]        = useState(0)

  useEffect(() => {
    const role = localStorage.getItem('rq_role')
    const name = localStorage.getItem('rq_name')
    if (role !== 'volunteer') { router.push('/auth'); return }
    if (name) setVolunteerName(name)
    const s = parseInt(localStorage.getItem('rq_streak') || '0')
    setStreak(s)
  }, [router])

  const fetchDonations = useCallback(async () => {
    try {
      const res  = await fetch('/api/donations')
      const data = await res.json()
      if (data.success) {
        // Volunteers see MATCHED + IN_TRANSIT donations
        setDonations(data.data.filter((d: Donation) => d.status === 'MATCHED' || d.status === 'IN_TRANSIT'))
      }
    } catch { /* silent */ }
    finally { setLoading(false) }
  }, [])

  useEffect(() => {
    fetchDonations()
    const id = setInterval(fetchDonations, 5000)
    return () => clearInterval(id)
  }, [fetchDonations])

  async function pickup(id: string) {
    setActioning(id)
    try {
      const res = await fetch(`/api/donations/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'IN_TRANSIT', volunteerName }),
      })
      const data = await res.json()
      if (!data.success) throw new Error()
      toast.success('Picked up! Head to the NGO.')
      fetchDonations()
    } catch {
      toast.error('Error updating pickup.')
    } finally {
      setActioning(null)
    }
  }

  async function deliver(id: string) {
    setActioning(id)
    try {
      const res = await fetch(`/api/donations/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'DELIVERED', volunteerName }),
      })
      const data = await res.json()
      if (!data.success) throw new Error()
      const newStreak = streak + 1
      setStreak(newStreak)
      localStorage.setItem('rq_streak', String(newStreak))
      toast.success(`Delivered! 🎉 ${newStreak} meals rescued by you!`)
      fetchDonations()
    } catch {
      toast.error('Error updating delivery.')
    } finally {
      setActioning(null)
    }
  }

  const inTransit = donations.filter((d) => d.status === 'IN_TRANSIT')
  const available = donations.filter((d) => d.status === 'MATCHED')

  return (
    <div className="min-h-screen bg-mesh">
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 pt-28 pb-16">
        {/* Header + streak */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-lg bg-orange-500/15 border border-orange-500/30 flex items-center justify-center">
                <Bike className="w-4 h-4 text-orange-400" />
              </div>
              <span className="text-orange-400 text-sm font-medium">{volunteerName}</span>
            </div>
            <h1 className="text-2xl font-bold text-emerald-50">Volunteer Hub</h1>
            <p className="text-rq-muted text-sm mt-1">Pick up food and deliver to the nearest NGO</p>
          </div>

          {streak > 0 && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <Trophy className="w-4 h-4 text-amber-400" />
              <div className="text-right">
                <div className="text-lg font-bold text-amber-400">{streak}</div>
                <div className="text-xs text-rq-muted">meals rescued</div>
              </div>
            </div>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-7 h-7 text-emerald-500 animate-spin" />
          </div>
        ) : (
          <>
            {/* Active deliveries */}
            {inTransit.length > 0 && (
              <section className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
                  <h2 className="text-sm font-semibold text-orange-300 uppercase tracking-wide">Active Deliveries</h2>
                </div>
                <AnimatePresence>
                  <div className="space-y-3">
                    {inTransit.map((d) => (
                      <motion.div key={d.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                        <DonationCard
                          donation={d}
                          viewAs="volunteer"
                          onDeliver={deliver}
                          actioning={actioning}
                        />
                        {/* Simple GPS placeholder */}
                        <div className="mt-2 p-3 rounded-xl bg-[#0C1710] border border-emerald-900/30 flex items-center gap-2.5">
                          <MapPin className="w-4 h-4 text-emerald-500 shrink-0" />
                          <div className="text-xs text-rq-muted flex-1">
                            Navigate to: <span className="text-emerald-300 font-medium">{d.ngoMatch?.name ?? 'Assigned NGO'}</span> · {d.ngoMatch?.distance ?? '2–3 km'}
                          </div>
                          <ArrowRight className="w-4 h-4 text-rq-muted" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </AnimatePresence>
              </section>
            )}

            {/* Available pickups */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Package className="w-4 h-4 text-emerald-400" />
                <h2 className="text-sm font-semibold text-emerald-300 uppercase tracking-wide">
                  Available Pickups ({available.length})
                </h2>
              </div>

              {available.length === 0 ? (
                <div className="text-center py-14">
                  <CheckCircle className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
                  <p className="text-emerald-300 font-medium mb-1">All caught up!</p>
                  <p className="text-rq-muted text-sm">No pickups available right now. Check back soon.</p>
                </div>
              ) : (
                <AnimatePresence>
                  <div className="space-y-3">
                    {available.map((d) => (
                      <motion.div key={d.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                        <DonationCard
                          donation={d}
                          viewAs="volunteer"
                          onPickup={pickup}
                          actioning={actioning}
                        />
                      </motion.div>
                    ))}
                  </div>
                </AnimatePresence>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  )
}
