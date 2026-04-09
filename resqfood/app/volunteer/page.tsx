'use client'

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
