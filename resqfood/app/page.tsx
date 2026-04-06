'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight, Heart, Zap, Globe, Brain, MapPin, Clock,
  CheckCircle, Users, Leaf, TrendingUp, ChevronDown,
  Utensils, Building2, Bike,
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import ImpactCounter from '@/components/ImpactCounter'

// ── Animated number hook ──────────────────────────────────────────────────────
function useAnimatedValue(to: number, delay = 0) {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const timer = setTimeout(() => {
      const dur = 1600
      const steps = 50
      const inc = to / steps
      let cur = 0
      const id = setInterval(() => {
        cur += inc
        if (cur >= to) { setVal(to); clearInterval(id) }
        else setVal(Math.floor(cur))
      }, dur / steps)
    }, delay)
    return () => clearTimeout(timer)
  }, [inView, to, delay])

  return { val, ref }
}

// ── Gemini demo steps ────────────────────────────────────────────────────────
const DEMO_STEPS = [
  { icon: '🔍', label: 'Detecting language…' },
  { icon: '📝', label: 'Extracting food details…' },
  { icon: '⏱️', label: 'Calculating spoilage window…' },
  { icon: '🎯', label: 'Determining urgency level…' },
  { icon: '🏥', label: 'Finding best NGO match…' },
  { icon: '✅', label: 'Analysis complete!' },
]

function GeminiDemo() {
  const [step, setStep]   = useState(-1)
  const [done, setDone]   = useState(false)
  const [input, setInput] = useState('')
  const fullInput = 'Mere paas 40 logon ka khana hai, jaldi uthwana hai'
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    // Type the input first
    let i = 0
    const typeId = setInterval(() => {
      setInput(fullInput.slice(0, i + 1))
      i++
      if (i >= fullInput.length) clearInterval(typeId)
    }, 40)
  }, [inView])

  useEffect(() => {
    if (!inView || input.length < fullInput.length) return
    const timeout = setTimeout(() => {
      let s = 0
      const id = setInterval(() => {
        setStep(s)
        s++
        if (s >= DEMO_STEPS.length) {
          clearInterval(id)
          setTimeout(() => setDone(true), 400)
        }
      }, 480)
    }, 600)
    return () => clearTimeout(timeout)
  }, [inView, input])

  return (
    <div ref={ref} className="rounded-2xl border border-violet-500/20 bg-[#0D1217] overflow-hidden">
      {/* Terminal header */}
      <div className="px-4 py-2.5 border-b border-violet-500/20 flex items-center gap-2 bg-[#0A0E12]">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
        </div>
        <span className="text-xs text-violet-400 ml-2 font-mono">gemini-1.5-flash · ResQFood AI</span>
      </div>

      <div className="p-5 space-y-4 font-mono text-sm">
        {/* Input */}
        <div>
          <div className="text-violet-400 text-xs mb-1.5">INPUT (Hindi)</div>
          <div className="bg-[#131923] border border-violet-500/20 rounded-lg px-3 py-2.5 text-emerald-100 min-h-[40px]">
            {input}<span className="cursor-blink text-violet-400 ml-0.5">|</span>
          </div>
        </div>

        {/* Processing steps */}
        {step >= 0 && (
          <div className="space-y-1.5">
            {DEMO_STEPS.slice(0, step + 1).map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                className={`flex items-center gap-2 text-xs ${i === step && !done ? 'text-violet-300' : 'text-emerald-600'}`}
              >
                <span>{s.icon}</span>
                <span>{s.label}</span>
                {(i < step || done) && <CheckCircle className="w-3 h-3 text-emerald-400 ml-auto" />}
              </motion.div>
            ))}
          </div>
        )}

        {/* Output */}
        {done && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-3 space-y-1.5"
          >
            <div className="text-emerald-400 text-xs mb-2 font-semibold">GEMINI OUTPUT</div>
            {[
              ['Food',     'Biryani / Mixed Curry'],
              ['Quantity', '40 plates (~10 kg)'],
              ['Urgency',  'HIGH — 3h window'],
              ['Language', 'Hindi detected'],
              ['NGO Match','Roti Bank Delhi (91%)'],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between text-xs">
                <span className="text-rq-muted">{k}</span>
                <span className={k === 'Urgency' ? 'text-orange-400 font-medium' : k === 'NGO Match' ? 'text-emerald-400 font-medium' : 'text-emerald-100'}>{v}</span>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}

// ── Floating urgency card ────────────────────────────────────────────────────
function FloatingCard() {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      className="rounded-xl border border-orange-500/30 bg-[#0F1A14]/90 backdrop-blur-sm p-4 w-64 shadow-xl shadow-orange-500/10"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
          <span className="text-xs font-semibold text-orange-400 uppercase tracking-wide">Urgent</span>
        </div>
        <span className="text-xs text-rq-muted">just now</span>
      </div>
      <p className="text-sm font-semibold text-emerald-50">Biryani • 40 plates</p>
      <p className="text-xs text-rq-muted mt-0.5">Mehul's Dhaba, Noida</p>
      <div className="mt-3 p-2 rounded-lg bg-emerald-500/10 border border-emerald-900/40">
        <div className="flex items-center justify-between text-xs">
          <span className="text-rq-muted">Gemini matched →</span>
          <span className="text-emerald-400 font-medium">91%</span>
        </div>
        <p className="text-xs text-emerald-300 font-medium mt-0.5">Roti Bank Delhi</p>
      </div>
      <div className="flex items-center gap-1.5 mt-2.5 text-xs text-rq-muted">
        <Clock className="w-3 h-3 text-orange-400" />
        <span className="text-orange-400 font-medium">3h 12m left</span>
      </div>
    </motion.div>
  )
}

// ── How it works steps ───────────────────────────────────────────────────────
const HOW_STEPS = [
  {
    icon: Utensils,
    color: 'emerald',
    title: 'Donor Lists Food',
    body: 'Speak, type, or photograph surplus food — in any language. Takes 30 seconds.',
  },
  {
    icon: Brain,
    color: 'violet',
    title: 'Gemini Analyzes',
    body: 'AI extracts food data, predicts urgency, and scores every nearby NGO instantly.',
  },
  {
    icon: Building2,
    color: 'emerald',
    title: 'NGO Gets Alert',
    body: 'Best-matched NGO receives a push notification with food details and ETA.',
  },
  {
    icon: Bike,
    color: 'orange',
    title: 'Volunteer Delivers',
    body: 'GPS-routed volunteer picks up and delivers. Impact logged automatically.',
  },
]

// ── Main landing page ────────────────────────────────────────────────────────
export default function LandingPage() {
  const statsRef = useRef<HTMLDivElement>(null)
  const statsInView = useInView(statsRef, { once: true })

  return (
    <div className="bg-mesh min-h-screen">
      <Navbar />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-500/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left — copy */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/5 text-xs text-emerald-400 font-medium mb-6"
              >
                <Zap className="w-3 h-3" />
                Powered by Google Gemini 1.5 Pro
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight tracking-tight"
              >
                Every plate{' '}
                <span className="gradient-text">saved</span>
                {' '}is a{' '}
                <span className="gradient-text-orange">life</span>
                {' '}changed.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-5 text-lg text-rq-muted max-w-xl leading-relaxed"
              >
                AI-powered food rescue connecting surplus from restaurants, hotels &
                hostels with NGOs — in real-time, in any language.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-8 flex flex-wrap gap-3"
              >
                <Link
                  href="/auth"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-semibold transition-all duration-200 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 hover:-translate-y-0.5"
                >
                  Start Donating <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/auth"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl border border-emerald-800 hover:border-emerald-600 text-emerald-300 font-medium transition-all duration-200 hover:-translate-y-0.5"
                >
                  Register as NGO
                </Link>
              </motion.div>

              {/* Trust indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-10 flex items-center gap-6 text-xs text-rq-muted"
              >
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  Free for NGOs
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  20+ Indian languages
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  Works on 2G
                </div>
              </motion.div>
            </div>

            {/* Right — floating card + stats */}
            <div className="relative flex flex-col items-center gap-6">
              <FloatingCard />
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-2 gap-3 w-full max-w-xs"
              >
                {[
                  { val: '194M', label: 'Undernourished in India', color: 'text-orange-400' },
                  { val: '68.7M', label: 'Tonnes wasted annually', color: 'text-red-400' },
                  { val: '30s',   label: 'To list surplus food',   color: 'text-emerald-400' },
                  { val: '91%',   label: 'AI match confidence',    color: 'text-violet-400' },
                ].map((s) => (
                  <div key={s.label} className="p-3 rounded-xl border border-emerald-900/30 bg-[#0C1710] text-center">
                    <div className={`text-xl font-bold ${s.color}`}>{s.val}</div>
                    <div className="text-xs text-rq-muted mt-0.5 leading-tight">{s.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-rq-muted"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </section>

      {/* ── STATS BAR ────────────────────────────────────────────────────── */}
      <div ref={statsRef} className="border-y border-emerald-900/30 bg-[#0C1710]/60 backdrop-blur-sm py-8">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {statsInView && (
            <>
              <ImpactCounter value={194}   suffix="M" label="Undernourished in India"       color="orange" />
              <ImpactCounter value={68700} suffix="K" label="Tonnes Food Wasted / Year"     color="orange" />
              <ImpactCounter value={92000} prefix="₹" label="Crore Lost Annually (India)"   color="white" />
              <ImpactCounter value={45}               label="People Fed per Rescue Event"   color="green" />
            </>
          )}
        </div>
      </div>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-xs text-emerald-600 uppercase tracking-widest mb-3 font-medium">The Flow</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-emerald-50">
            Food rescued in <span className="gradient-text">under 5 minutes</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connector lines */}
          <div className="hidden lg:block absolute top-10 left-[calc(12.5%+16px)] right-[calc(12.5%+16px)] h-px bg-emerald-900/40" />

          {HOW_STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative p-6 rounded-2xl border border-emerald-900/30 bg-[#0C1710] hover:border-emerald-800/60 transition-colors"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${
                step.color === 'violet' ? 'bg-violet-500/15 text-violet-400' :
                step.color === 'orange' ? 'bg-orange-500/15 text-orange-400' :
                'bg-emerald-500/15 text-emerald-400'
              }`}>
                <step.icon className="w-5 h-5" />
              </div>
              <div className="absolute top-4 right-4 text-xl font-bold text-rq-subtle">
                0{i + 1}
              </div>
              <h3 className="font-semibold text-emerald-50 mb-2">{step.title}</h3>
              <p className="text-sm text-rq-muted leading-relaxed">{step.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── GEMINI SHOWCASE ───────────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-[#0C1710]/50 border-y border-emerald-900/20">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-xs text-violet-400 uppercase tracking-widest mb-3 font-medium">Gemini API in Action</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-emerald-50 mb-5">
              The AI that speaks{' '}
              <span className="gradient-text-violet">every language</span>
            </h2>
            <div className="space-y-4 text-rq-muted text-sm leading-relaxed">
              <p>
                A hotel cook sends a Hindi voice note. A Tamil-speaking hostel manager
                snaps a photo. An English-speaking event coordinator types a quick message.
              </p>
              <p>
                Gemini understands all of it — extracting food type, quantity, spoilage
                urgency, and dietary requirements — in a single API call.
              </p>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {[
                { label: 'Multilingual understanding', icon: Globe },
                { label: 'Image + voice input', icon: Utensils },
                { label: 'Contextual reasoning', icon: Brain },
                { label: 'Smart NGO matching', icon: MapPin },
              ].map(({ label, icon: Icon }) => (
                <div key={label} className="flex items-center gap-2 text-xs text-emerald-300">
                  <Icon className="w-4 h-4 text-violet-400 shrink-0" />
                  {label}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <GeminiDemo />
          </motion.div>
        </div>
      </section>

      {/* ── ROLE CARDS ───────────────────────────────────────────────────── */}
      <section className="py-24 px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-emerald-50">
            Who are you?
          </h2>
          <p className="text-rq-muted mt-3">Choose your role to get started</p>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-5">
          {[
            {
              role: 'donor',
              icon: Utensils,
              title: 'Food Donor',
              desc: 'Restaurants, hotels, hostels & events with surplus food.',
              color: 'emerald',
              action: 'Start Donating',
            },
            {
              role: 'ngo',
              icon: Building2,
              title: 'NGO Partner',
              desc: 'Orphanages, shelters & community kitchens receiving food.',
              color: 'violet',
              action: 'Register NGO',
            },
            {
              role: 'volunteer',
              icon: Bike,
              title: 'Volunteer',
              desc: 'Students & local heroes who pick up and deliver food.',
              color: 'orange',
              action: 'Join as Volunteer',
            },
          ].map((card, i) => (
            <motion.div
              key={card.role}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href="/auth" className="block group">
                <div className={`p-6 rounded-2xl border transition-all duration-200 cursor-pointer ${
                  card.color === 'emerald' ? 'border-emerald-900/30 hover:border-emerald-500/40 hover:bg-emerald-500/5' :
                  card.color === 'violet'  ? 'border-violet-900/30  hover:border-violet-500/40  hover:bg-violet-500/5' :
                                             'border-orange-900/30  hover:border-orange-500/40  hover:bg-orange-500/5'
                } bg-[#0C1710] hover:-translate-y-1`}>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                    card.color === 'emerald' ? 'bg-emerald-500/15 text-emerald-400' :
                    card.color === 'violet'  ? 'bg-violet-500/15  text-violet-400' :
                                               'bg-orange-500/15  text-orange-400'
                  }`}>
                    <card.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-emerald-50 text-lg mb-2">{card.title}</h3>
                  <p className="text-sm text-rq-muted leading-relaxed mb-4">{card.desc}</p>
                  <div className={`flex items-center gap-1.5 text-sm font-medium group-hover:gap-2.5 transition-all ${
                    card.color === 'emerald' ? 'text-emerald-400' :
                    card.color === 'violet'  ? 'text-violet-400' :
                                               'text-orange-400'
                  }`}>
                    {card.action} <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── LIVE COUNTER ─────────────────────────────────────────────────── */}
      <section className="py-16 px-4 text-center border-t border-emerald-900/20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-rq-muted text-sm mb-2">Today, ResQFood has helped rescue</p>
          <div className="text-5xl sm:text-6xl font-bold gradient-text tabular-nums">
            1,284
          </div>
          <p className="text-rq-muted text-sm mt-2">meals that would have been thrown away</p>
        </motion.div>

        <motion.blockquote
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-12 max-w-2xl mx-auto text-xl sm:text-2xl text-emerald-100 font-medium leading-relaxed"
        >
          "This is not just reducing waste.{' '}
          <span className="gradient-text-orange font-bold">This is saving lives.</span>"
        </motion.blockquote>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer className="border-t border-emerald-900/20 py-10 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
              <Heart className="w-3.5 h-3.5 text-white" fill="white" />
            </div>
            <span className="font-semibold text-emerald-50">ResQ<span className="text-emerald-400">Food</span></span>
          </div>
          <p className="text-xs text-rq-muted text-center">
            Built for HackDays 2026 · GCET × HackBase × MLH · Powered by Google Gemini API
          </p>
          <div className="flex items-center gap-1.5 text-xs text-emerald-600">
            <Heart className="w-3 h-3 fill-emerald-600" />
            <span>Open source · MIT</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
