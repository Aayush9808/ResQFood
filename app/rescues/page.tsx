'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Search, Filter, MapPin, Clock, AlertTriangle,
  ArrowRight, X, Users, Building2, Utensils,
  CheckCircle2, ChevronDown, Plus,
} from 'lucide-react'
import Navbar from '@/components/Navbar'

type Urgency = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'

interface Rescue {
  id: number
  title: string
  description: string
  fullDescription: string
  goal: string
  raised: string
  progress: number
  image: string
  location: string
  timeLeft: string
  urgency: Urgency
  foodType: string
  ngo: string
  donor: string
  servings: number
  volunteersNeeded: number
}

const ALL_RESCUES: Rescue[] = [
  {
    id: 1,
    title: 'Community Kitchen Night Rescue',
    description: 'Surplus dinner trays redirected from a banquet hall to nearby shelters.',
    fullDescription: 'A local banquet hall has 80+ surplus dinner trays after a corporate event. Food is fresh, packaged, and still hot. Needs an NGO and 2 volunteers for pickup before 10 PM.',
    goal: '₹8,000', raised: '₹6,250', progress: 78,
    image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=900&q=80',
    location: 'Sector 62, Noida', timeLeft: '2 hrs left', urgency: 'HIGH',
    foodType: 'Non-Veg', ngo: 'Roti Bank Delhi', donor: 'Grand Banquet Hall',
    servings: 80, volunteersNeeded: 2,
  },
  {
    id: 2,
    title: 'Weekend Event Food Recovery',
    description: 'Fresh packaged meals rescued after a large city-level social event.',
    fullDescription: 'A 3-day social event ended with 50+ packaged veg meals left. All individually sealed and safe. Pickup available from Expo Mart, Greater Noida. NGO and 1 volunteer needed.',
    goal: '₹10,000', raised: '₹7,100', progress: 71,
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=900&q=80',
    location: 'Expo Mart, Greater Noida', timeLeft: '5 hrs left', urgency: 'MEDIUM',
    foodType: 'Veg', ngo: 'Asha Foundation', donor: 'City Events Corp',
    servings: 50, volunteersNeeded: 1,
  },
  {
    id: 3,
    title: 'Hotel Breakfast Redistribution',
    description: 'Breakfast buffet surplus distributed to three NGOs before noon.',
    fullDescription: 'Premium hotel has surplus breakfast items (bread, eggs, fruits, cereals). Approximately 120 servings. Must be picked up before 11 AM. Refrigerated storage available until then.',
    goal: '₹5,500', raised: '₹4,820', progress: 87,
    image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=900&q=80',
    location: 'Sector 18, Noida', timeLeft: '1 hr left', urgency: 'CRITICAL',
    foodType: 'Veg', ngo: 'Sewa Samiti', donor: 'Taj Vivanta Hotel',
    servings: 120, volunteersNeeded: 3,
  },
  {
    id: 4,
    title: 'Wedding Feast Surplus',
    description: '200+ plates of paneer and rice dishes from a large wedding function.',
    fullDescription: 'A wedding at a community hall ended with over 200 plates of assorted dishes — paneer, dal, rice, and dessert. All food is fresh from today. Needs urgent dispatch to Kasna Labour Colony.',
    goal: '₹12,000', raised: '₹5,400', progress: 45,
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=900&q=80',
    location: 'Kasna, Greater Noida', timeLeft: '3 hrs left', urgency: 'HIGH',
    foodType: 'Veg', ngo: 'Helping Hands NGO', donor: 'Sharma Family (Wedding)',
    servings: 200, volunteersNeeded: 4,
  },
  {
    id: 5,
    title: 'Restaurant Daily Leftover Drive',
    description: 'A popular restaurant donates unsold meals every evening after 9 PM.',
    fullDescription: 'This restaurant donates 30–40 plates nightly. Mix of chicken curries and rice items. Reliable recurring donor. NGO pickup arranged but needs a backup volunteer on weekends.',
    goal: '₹3,000', raised: '₹2,700', progress: 90,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80',
    location: 'Sector 50, Noida', timeLeft: '4 hrs left', urgency: 'MEDIUM',
    foodType: 'Non-Veg', ngo: 'Roti Bank Delhi', donor: 'Spice Route Restaurant',
    servings: 35, volunteersNeeded: 1,
  },
  {
    id: 6,
    title: 'College Canteen Bulk Rescue',
    description: 'End-of-week bulk surplus from a large college canteen.',
    fullDescription: 'A college canteen has 60 surplus lunch plates every Friday. Mix of veg and egg items. All packed. Pickup point is Gate 2 of the campus. 1 volunteer with a two-wheeler needed.',
    goal: '₹4,500', raised: '₹1,800', progress: 40,
    image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=900&q=80',
    location: 'Bisrakh, Greater Noida', timeLeft: '6 hrs left', urgency: 'LOW',
    foodType: 'Veg', ngo: 'Asha Foundation', donor: 'GNIOT Campus Canteen',
    servings: 60, volunteersNeeded: 1,
  },
]

const URGENCY_CONFIG: Record<Urgency, { label: string; cls: string }> = {
  CRITICAL: { label: 'Critical', cls: 'bg-red-100 text-red-700 border-red-200'     },
  HIGH:     { label: 'High',     cls: 'bg-orange-100 text-orange-700 border-orange-200' },
  MEDIUM:   { label: 'Medium',   cls: 'bg-amber-100 text-amber-700 border-amber-200'  },
  LOW:      { label: 'Low',      cls: 'bg-green-100 text-green-700 border-green-200'  },
}

export default function RescuesPage() {
  const [search,       setSearch]       = useState('')
  const [foodFilter,   setFoodFilter]   = useState('All')
  const [urgFilter,    setUrgFilter]    = useState('All')
  const [selected,     setSelected]     = useState<Rescue | null>(null)

  const filtered = ALL_RESCUES.filter(r => {
    const matchSearch = r.title.toLowerCase().includes(search.toLowerCase()) ||
                        r.location.toLowerCase().includes(search.toLowerCase())
    const matchFood   = foodFilter === 'All' || r.foodType === foodFilter
    const matchUrg    = urgFilter  === 'All' || r.urgency  === urgFilter
    return matchSearch && matchFood && matchUrg
  })

  return (
    <div className="min-h-screen bg-rq-bg text-rq-text">
      <Navbar />

      {/* ── HEADER ─────────────────────────────────────────────────────── */}
      <section className="pt-32 pb-12 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-1/4 w-72 h-72 rounded-full bg-rq-amber/8 blur-3xl" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Demo banner */}
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full px-4 py-2 text-xs font-semibold text-amber-800 mb-6">
            <AlertTriangle className="w-3.5 h-3.5" />
            Demo Data — Not Real Campaigns
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <span className="label-kicker">Live Rescues</span>
              <h1 className="mt-3 text-[40px] sm:text-[50px] leading-[1.08] font-bold text-rq-text">
                Active Food Rescue<br className="hidden sm:block" /> Campaigns
              </h1>
              <p className="mt-4 text-[16px] text-rq-muted max-w-xl">
                Helping surplus food reach those who need it most — in real time.
              </p>
            </div>
            <Link
              href="/login"
              className="pill-btn inline-flex items-center gap-2 bg-rq-amber text-white px-6 py-3 text-sm font-semibold flex-shrink-0 self-start sm:self-auto"
            >
              Start a Rescue <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── FILTERS ─────────────────────────────────────────────────────── */}
      <section className="sticky top-[56px] z-30 bg-white/95 backdrop-blur border-b border-rq-border py-4 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-3 items-center">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px] max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-rq-subtle" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by title or location…"
              className="w-full pl-9 pr-4 py-2 rounded-full border border-rq-border bg-rq-surface2 text-sm text-rq-text placeholder-rq-subtle focus:outline-none focus:ring-2 focus:ring-amber-100 focus:border-rq-amber transition-all"
            />
          </div>

          {/* Food type filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-rq-subtle" />
            <select
              value={foodFilter}
              onChange={e => setFoodFilter(e.target.value)}
              className="pl-8 pr-8 py-2 rounded-full border border-rq-border bg-rq-surface2 text-sm text-rq-text focus:outline-none appearance-none cursor-pointer"
            >
              {['All', 'Veg', 'Non-Veg'].map(v => <option key={v}>{v}</option>)}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-rq-subtle pointer-events-none" />
          </div>

          {/* Urgency filter */}
          <div className="relative">
            <select
              value={urgFilter}
              onChange={e => setUrgFilter(e.target.value)}
              className="px-4 pr-8 py-2 rounded-full border border-rq-border bg-rq-surface2 text-sm text-rq-text focus:outline-none appearance-none cursor-pointer"
            >
              {['All', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].map(v => <option key={v}>{v === 'All' ? 'All Urgency' : v}</option>)}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-rq-subtle pointer-events-none" />
          </div>

          <span className="ml-auto text-sm text-rq-muted hidden sm:block">
            {filtered.length} rescue{filtered.length !== 1 ? 's' : ''} found
          </span>
        </div>
      </section>

      {/* ── GRID ─────────────────────────────────────────────────────────── */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-rq-muted">
              <Search className="w-10 h-10 mx-auto mb-4 opacity-30" />
              <p className="text-lg font-semibold">No rescues match your filters</p>
              <p className="text-sm mt-1">Try adjusting the search or filters above</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(rescue => {
                const urg = URGENCY_CONFIG[rescue.urgency]
                return (
                  <article
                    key={rescue.id}
                    className="soft-card overflow-hidden group cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
                    onClick={() => setSelected(rescue)}
                  >
                    {/* Image */}
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={rescue.image}
                        alt={rescue.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <div className="p-5">
                      {/* Badges row */}
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border ${urg.cls}`}>
                          {rescue.urgency === 'CRITICAL' && <AlertTriangle className="w-3 h-3" />}
                          {urg.label}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs text-rq-muted bg-rq-surface2 border border-rq-border px-2.5 py-1 rounded-full">
                          {rescue.foodType}
                        </span>
                        <span className="ml-auto flex items-center gap-1 text-xs text-rq-muted">
                          <Clock className="w-3 h-3" />{rescue.timeLeft}
                        </span>
                      </div>

                      {/* Progress */}
                      <div className="h-2 rounded-full bg-rq-border mb-1.5">
                        <div className="h-full rounded-full bg-rq-amber transition-all" style={{ width: `${rescue.progress}%` }} />
                      </div>
                      <div className="flex items-center justify-between text-xs text-rq-subtle font-medium mb-3">
                        <span>Goal: {rescue.goal}</span>
                        <span className="text-rq-amber font-semibold">{rescue.progress}% funded</span>
                      </div>

                      <h3 className="text-[18px] font-bold text-rq-text leading-tight mb-1.5">{rescue.title}</h3>
                      <p className="text-[13px] text-rq-muted leading-relaxed line-clamp-2 mb-4">{rescue.description}</p>

                      {/* Footer row */}
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-xs text-rq-muted">
                          <MapPin className="w-3.5 h-3.5" />
                          {rescue.location}
                        </span>
                        <button
                          className="w-9 h-9 rounded-full bg-rq-amber text-white flex items-center justify-center hover:bg-rq-amber-dim transition-colors shadow-md shadow-amber-200"
                          aria-label="View details"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 bg-rq-text text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-[34px] font-bold">Be part of every rescue.</h2>
          <p className="mt-4 text-white/70 text-[16px]">Donate your surplus food or volunteer to deliver it. Every action counts.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/login" className="pill-btn inline-flex items-center gap-2 bg-rq-amber text-white px-7 py-3.5 text-sm font-semibold">
              Start a Rescue <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/register" className="pill-btn inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-7 py-3.5 text-sm">
              Join as Volunteer
            </Link>
          </div>
        </div>
      </section>

      {/* ── DETAILS MODAL ────────────────────────────────────────────────── */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="relative">
              <img src={selected.image} alt={selected.title} className="w-full h-52 object-cover rounded-t-2xl" />
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors shadow-md"
              >
                <X className="w-4 h-4 text-rq-text" />
              </button>
              <div className="absolute bottom-4 left-4">
                <span className={`inline-flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full border backdrop-blur-sm bg-white/80 ${URGENCY_CONFIG[selected.urgency].cls}`}>
                  {selected.urgency === 'CRITICAL' && <AlertTriangle className="w-3 h-3" />}
                  {URGENCY_CONFIG[selected.urgency].label} Urgency
                </span>
              </div>
            </div>

            <div className="p-6">
              <h2 className="text-[22px] font-bold text-rq-text mb-1">{selected.title}</h2>
              <p className="text-sm text-rq-muted mb-5 leading-relaxed">{selected.fullDescription}</p>

              {/* Progress */}
              <div className="h-2.5 rounded-full bg-rq-border mb-1.5">
                <div className="h-full rounded-full bg-rq-amber" style={{ width: `${selected.progress}%` }} />
              </div>
              <div className="flex justify-between text-xs text-rq-subtle font-medium mb-6">
                <span>Goal: {selected.goal}</span>
                <span className="text-rq-amber font-semibold">Raised: {selected.raised} ({selected.progress}%)</span>
              </div>

              {/* Details grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  { icon: Utensils,  label: 'Food Type',          value: selected.foodType           },
                  { icon: Users,     label: 'Servings',            value: `~${selected.servings} plates` },
                  { icon: Building2, label: 'NGO Assigned',        value: selected.ngo                },
                  { icon: MapPin,    label: 'Pickup Location',     value: selected.location           },
                  { icon: Clock,     label: 'Time Left',           value: selected.timeLeft           },
                  { icon: Users,     label: 'Volunteers Needed',   value: `${selected.volunteersNeeded} volunteer${selected.volunteersNeeded > 1 ? 's' : ''}` },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-2.5 bg-rq-surface2 rounded-xl p-3">
                    <Icon className="w-4 h-4 text-rq-amber flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[10px] text-rq-muted uppercase tracking-wide font-semibold">{label}</p>
                      <p className="text-[13px] text-rq-text font-medium">{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-center gap-2 mb-6 text-sm text-amber-800">
                <CheckCircle2 className="w-4 h-4 text-rq-amber flex-shrink-0" />
                <span>Donated by: <strong>{selected.donor}</strong></span>
              </div>

              <Link
                href="/login"
                className="w-full pill-btn inline-flex items-center justify-center gap-2 bg-rq-amber text-white py-3 text-sm font-semibold"
                onClick={() => setSelected(null)}
              >
                Volunteer for this Rescue <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
