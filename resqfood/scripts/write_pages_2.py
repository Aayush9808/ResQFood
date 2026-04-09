import os
BASE = '/Users/aayus/Desktop/Galgotiya/resqfood'

# ════════════════════════════════════════════════════════════════════
# LANDING PAGE — app/page.tsx
# Uses CSS variable tokens throughout, no hardcoded Tailwind colours
# ════════════════════════════════════════════════════════════════════
landing = """'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { Leaf, Brain, Zap, Users, CheckCircle, ArrowRight, MapPin, Clock, Utensils, Building2, Bike, Globe, Github } from 'lucide-react'

/* ── Animated counter ──────────────────────────────────────────── */
function Counter({ end, suffix = '', duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = end / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= end) { setVal(end); clearInterval(timer) }
      else setVal(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [inView, end, duration])

  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>
}

/* ── AI steps previewer card ───────────────────────────────────── */
const AI_STEPS = [
  { icon: '🧠', label: 'Understanding Input',   color: '#7C3AED', step: 1 },
  { icon: '🔍', label: 'Extracting Food Data',  color: '#EA580C', step: 2 },
  { icon: '⏱',  label: 'Spoilage Calculation', color: '#2563EB', step: 3 },
  { icon: '✅', label: 'NGO Matched!',           color: '#16A34A', step: 4 },
]

function AIHeroCard() {
  const [active, setActive] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setActive(p => (p + 1) % AI_STEPS.length), 1400)
    return () => clearInterval(id)
  }, [])
  const s = AI_STEPS[active]

  return (
    <div className="card-raised rounded-2xl p-5 animate-float"
      style={{ maxWidth: 340, minHeight: 180, position: 'relative', overflow: 'hidden' }}>
      {/* Glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `radial-gradient(circle at 60% 40%, ${s.color}14, transparent 65%)`,
        transition: 'background 0.5s',
      }} />
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
          style={{ background: `${s.color}1F`, border: `1px solid ${s.color}33` }}>
          {s.icon}
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest mb-0.5"
            style={{ color: 'var(--th-text-4)' }}>Gemini AI · Step {s.step}/4</p>
          <p className="text-sm font-bold" style={{ color: s.color }}>{s.label}</p>
        </div>
      </div>
      {/* Progress dots */}
      <div className="flex gap-1.5">
        {AI_STEPS.map((_, i) => (
          <div key={i} className="h-1.5 rounded-full flex-1 transition-all duration-500"
            style={{ background: i <= active ? s.color : 'var(--th-border)', opacity: i <= active ? 1 : 0.4 }} />
        ))}
      </div>
      <div className="mt-4 text-xs font-mono px-3 py-2 rounded-lg leading-relaxed"
        style={{ background: 'var(--th-hover)', color: 'var(--th-text-3)' }}>
        <span style={{ color: s.color }}>gemini</span>.analyzeFood(<span style={{ color: '#4ADE80' }}>"40 plate biryani"</span>)<br/>
        → {active === 3 ? <span style={{ color: '#16A34A' }}>match: "Roti Bank Delhi" 94%</span> : <span style={{ color: 'var(--th-text-4)' }}>processing…</span>}
      </div>
    </div>
  )
}

const HOW_STEPS = [
  { icon: Utensils,  num: '01', title: 'Describe Your Food', desc: 'Type or speak in Hindi or English. Gemini AI understands both.', accent: '#16A34A' },
  { icon: Brain,     num: '02', title: 'AI Analyzes & Matches', desc: 'Gemini extracts details, calculates urgency, and selects the best NGO.', accent: '#7C3AED' },
  { icon: Bike,      num: '03', title: 'Volunteer Delivers',   desc: 'A nearby volunteer picks up the food and delivers it within minutes.', accent: '#EA580C' },
]

const ROLES = [
  {
    icon: Utensils,
    title: 'Food Donors',
    desc: 'Restaurants, hotels, caterers, hostels. Turn leftover food into someone\'s meal in < 30 minutes.',
    bullets: ['Describe food by typing or voice', 'AI handles all categorization', 'Track pickup live on map'],
    accent: '#16A34A', bg: 'var(--th-green-bg)', border: 'var(--th-green-border)', href: '/donor',
  },
  {
    icon: Building2,
    title: 'NGO Partners',
    desc: 'Shelters, community kitchens, and schools. Receive AI-matched donations with zero coordination overhead.',
    bullets: ['Auto-matched by proximity & capacity', 'Urgency-sorted incoming queue', 'Accept or pass with one tap'],
    accent: '#7C3AED', bg: 'var(--th-violet-bg)', border: 'var(--th-violet-border)', href: '/ngo',
  },
  {
    icon: Bike,
    title: 'Volunteers',
    desc: 'Anyone with a bike or car. Pick up matched food and deliver it. Every trip saves a meal.',
    bullets: ['See all available pickups', 'Claim and track deliveries', 'Real-time route on map'],
    accent: '#EA580C', bg: 'var(--th-orange-bg)', border: 'var(--th-orange-border)', href: '/volunteer',
  },
]

export default function LandingPage() {
  return (
    <div className="page">
      {/* ── Navbar ─────────────────────────────────────────────── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        background: 'var(--th-overlay)', borderBottom: '1px solid var(--th-border)',
        backdropFilter: 'blur(16px)',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', height: 64,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center shadow-green"
              style={{ background: '#16A34A' }}>
              <Leaf className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-[15px] tracking-tight" style={{ color: 'var(--th-text)' }}>
              Gemini<span style={{ color: '#16A34A' }}>Grain</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/live" className="text-sm font-medium flex items-center gap-1.5"
              style={{ color: 'var(--th-text-3)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Live Feed
            </Link>
            <Link href="/auth" className="btn btn-primary text-sm px-4 py-2">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section style={{ paddingTop: 120, paddingBottom: 80, paddingLeft: 24, paddingRight: 24 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}
          className="grid-cols-1 md:grid-cols-2">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
              style={{ background: 'var(--th-green-bg)', color: 'var(--th-green-text)', border: '1px solid var(--th-green-border)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Powered by Google Gemini AI
            </div>
            <h1 style={{ fontSize: 52, fontWeight: 900, lineHeight: 1.1, color: 'var(--th-text)', marginBottom: 20 }}>
              Food Waste Ends
              <br />
              <span className="gradient-text">Here.</span>
            </h1>
            <p style={{ fontSize: 18, lineHeight: 1.8, color: 'var(--th-text-2)', marginBottom: 32, maxWidth: 480 }}>
              GeminiGrain AI bridges the gap between surplus food and hunger — intelligently, in real time.
              Describe your food in Hindi or English. Gemini does the rest.
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              <Link href="/auth" className="btn btn-primary px-6 py-3 text-base">
                Start Donating <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/live" className="btn btn-secondary px-6 py-3 text-base">
                Watch Live Feed
              </Link>
            </div>
          </div>
          {/* Right */}
          <div className="hidden md:flex justify-center">
            <AIHeroCard />
          </div>
        </div>
      </section>

      {/* ── Stats strip ────────────────────────────────────────── */}
      <section style={{ background: '#16A34A', padding: '28px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32, textAlign: 'center' }}>
          {[
            { end: 2847, suffix: '+', label: 'Meals Rescued' },
            { end: 94,   suffix: '%', label: 'AI Accuracy' },
            { end: 18,   suffix: 'min', label: 'Avg Pickup Time' },
            { end: 340,  suffix: 'kg', label: 'CO₂ Avoided' },
          ].map(({ end, suffix, label }) => (
            <div key={label}>
              <div style={{ fontSize: 32, fontWeight: 900, color: '#fff' }}>
                <Counter end={end} suffix={suffix} />
              </div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)', marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── How it works ───────────────────────────────────────── */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <div className="text-center mb-12">
            <h2 style={{ fontSize: 36, fontWeight: 900, color: 'var(--th-text)', marginBottom: 12 }}>
              How it works
            </h2>
            <p style={{ color: 'var(--th-text-3)', fontSize: 16 }}>Three steps. Thirty minutes. One saved meal.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {HOW_STEPS.map(({ icon: Icon, num, title, desc, accent }, i) => (
              <motion.div key={num}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="card p-6 card-hover">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                    style={{ background: `${accent}18`, border: `1px solid ${accent}2E` }}>
                    <Icon className="w-6 h-6" style={{ color: accent }} />
                  </div>
                  <span style={{ fontSize: 40, fontWeight: 900, color: 'var(--th-border-2)', lineHeight: 1 }}>{num}</span>
                </div>
                <h3 className="font-bold text-lg mb-2" style={{ color: 'var(--th-text)' }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--th-text-3)' }}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Role cards ─────────────────────────────────────────── */}
      <section style={{ padding: '0 24px 80px' }}>
        <div style={{ maxWidth: 1060, margin: '0 auto' }}>
          <div className="text-center mb-10">
            <h2 style={{ fontSize: 32, fontWeight: 900, color: 'var(--th-text)', marginBottom: 10 }}>
              Built for everyone
            </h2>
            <p style={{ color: 'var(--th-text-3)' }}>Three roles. One mission. Zero food wasted.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {ROLES.map(({ icon: Icon, title, desc, bullets, accent, bg, border, href }, i) => (
              <motion.div key={title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Link href={href} style={{ display: 'block', textDecoration: 'none' }}>
                  <div className="card card-hover p-6 cursor-pointer h-full">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                      style={{ background: bg, border: `1px solid ${border}` }}>
                      <Icon className="w-6 h-6" style={{ color: accent }} />
                    </div>
                    <h3 className="font-bold text-lg mb-2" style={{ color: 'var(--th-text)' }}>{title}</h3>
                    <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--th-text-3)' }}>{desc}</p>
                    <ul className="space-y-1.5">
                      {bullets.map(b => (
                        <li key={b} className="flex items-center gap-2 text-xs" style={{ color: 'var(--th-text-2)' }}>
                          <CheckCircle className="w-3.5 h-3.5 shrink-0" style={{ color: accent }} />
                          {b}
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center gap-1.5 mt-5 text-sm font-semibold" style={{ color: accent }}>
                      Join as {title.split(' ')[0]} <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────── */}
      <section style={{ padding: '80px 24px', background: 'var(--th-surface)', borderTop: '1px solid var(--th-border)' }}>
        <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-green"
            style={{ background: '#16A34A' }}>
            <Leaf className="w-8 h-8 text-white" />
          </div>
          <h2 style={{ fontSize: 36, fontWeight: 900, color: 'var(--th-text)', marginBottom: 12 }}>
            Ready to rescue food?
          </h2>
          <p style={{ color: 'var(--th-text-3)', fontSize: 16, marginBottom: 32, lineHeight: 1.7 }}>
            Join hundreds of donors, NGOs, and volunteers using GeminiGrain to eliminate food waste in Delhi NCR.
          </p>
          <Link href="/auth" className="btn btn-primary px-8 py-4 text-base">
            Get Started Free <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────── */}
      <footer style={{ borderTop: '1px solid var(--th-border)', padding: '32px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: '#16A34A' }}>
              <Leaf className="w-3 h-3 text-white" />
            </div>
            <span className="font-bold text-sm" style={{ color: 'var(--th-text)' }}>
              Gemini<span style={{ color: '#16A34A' }}>Grain</span>
            </span>
          </div>
          <p className="text-xs" style={{ color: 'var(--th-text-4)' }}>
            Built for HackDays 2026 · Powered by Google Gemini AI · OpenStreetMap
          </p>
          <div className="flex items-center gap-4">
            <Link href="/live" className="flex items-center gap-1 text-xs" style={{ color: 'var(--th-text-3)' }}>
              <Globe className="w-3 h-3" /> Live Feed
            </Link>
            <a href="https://github.com/Aayush9808/ResQFood" target="_blank" rel="noreferrer"
              className="flex items-center gap-1 text-xs" style={{ color: 'var(--th-text-3)' }}>
              <Github className="w-3 h-3" /> GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
"""

# ════════════════════════════════════════════════════════════════════
# DONOR SUBMIT PAGE — split screen map + AI
# ════════════════════════════════════════════════════════════════════
submit_page = """'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import { Mic, MicOff, Type, Brain, CheckCircle, Loader2, MapPin, RotateCcw, Send, ArrowLeft, Clock, Users, Leaf, Zap, AlertTriangle } from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'
import Navbar from '@/components/Navbar'
import type { GeminiAnalysis, UrgencyLevel } from '@/lib/types'

const MapView = dynamic(() => import('@/components/MapInner'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center"
      style={{ background: 'var(--th-bg)' }}>
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin" style={{ color: '#16A34A' }} />
        <p className="text-sm" style={{ color: 'var(--th-text-3)' }}>Loading map...</p>
      </div>
    </div>
  ),
})

const STEPS = [
  { id:1, label:'Understanding your input...' },
  { id:2, label:'Extracting food details...' },
  { id:3, label:'Calculating spoilage window...' },
  { id:4, label:'Predicting urgency level...' },
  { id:5, label:'Scoring 4 nearby NGOs...' },
  { id:6, label:'Analysis complete!' },
]

const SAMPLES = [
  'Mere paas 40 plate biryani hai, jaldi uthwa lo',
  '30 plates of leftover paneer curry from office event',
  '50 plate shaadi ka khana hai, abhi le jao warm hai',
  'Urgent: 20kg chicken pulao, expires in 2 hours',
]

const URG_COLORS: Record<string,string> = { CRITICAL:'#DC2626', HIGH:'#EA580C', MEDIUM:'#D97706', LOW:'#16A34A' }
const URG_BG_VAR: Record<string,string> = { CRITICAL:'var(--th-red-bg)', HIGH:'var(--th-orange-bg)', MEDIUM:'var(--th-amber-bg)', LOW:'var(--th-green-bg)' }
const URG_BD_VAR: Record<string,string> = { CRITICAL:'var(--th-red-border)', HIGH:'var(--th-orange-border)', MEDIUM:'var(--th-amber-border)', LOW:'var(--th-green-border)' }

function UrgencyArc({ level }: { level: UrgencyLevel }) {
  const pct = { CRITICAL:95, HIGH:70, MEDIUM:42, LOW:18 }[level]
  const r=36, cx=44, cy=44
  const circ = Math.PI * r
  const dash = (pct/100)*circ
  const col = URG_COLORS[level]

  return (
    <svg viewBox="0 0 88 52" className="w-28 h-16">
      <path d={`M ${cx-r} ${cy} A ${r} ${r} 0 0 1 ${cx+r} ${cy}`}
        fill="none" stroke="var(--th-border)" strokeWidth="7" strokeLinecap="round"/>
      <path d={`M ${cx-r} ${cy} A ${r} ${r} 0 0 1 ${cx+r} ${cy}`}
        fill="none" stroke={col} strokeWidth="7" strokeLinecap="round"
        strokeDasharray={`${dash} ${circ}`}
        style={{ filter:`drop-shadow(0 0 4px ${col}88)` }}/>
      <text x={cx} y={cy-6} textAnchor="middle" fontSize="11" fontWeight="800" fill={col}>{level}</text>
    </svg>
  )
}

type Stage = 'input' | 'processing' | 'result' | 'done'

export default function SubmitFood() {
  const router = useRouter()
  const [stage, setStage]           = useState<Stage>('input')
  const [tab, setTab]               = useState<'text'|'voice'>('text')
  const [text, setText]             = useState('')
  const [location, setLocation]     = useState('')
  const [listening, setListening]   = useState(false)
  const [step, setStep]             = useState(-1)
  const [confidence, setConfidence] = useState(0)
  const [analysis, setAnalysis]     = useState<GeminiAnalysis|null>(null)
  const [isDemo, setIsDemo]         = useState(false)
  const [donorName, setDonorName]   = useState('Anonymous Donor')
  const [selectedNGO, setSelectedNGO] = useState<string|null>(null)
  const recognitionRef = useRef<unknown>(null)

  useEffect(() => {
    const role = localStorage.getItem('rq_role')
    const name = localStorage.getItem('rq_name')
    if (role !== 'donor') { router.push('/auth'); return }
    if (name) setDonorName(name)
  }, [router])

  const toggleVoice = useCallback(() => {
    if (typeof window === 'undefined') return
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!SR) { toast.error('Voice not supported in this browser'); return }
    if (listening) { (recognitionRef.current as any)?.stop(); setListening(false); return }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const r: any = new SR()
    r.lang = 'hi-IN'; r.interimResults = true
    recognitionRef.current = r
    r.onstart  = () => setListening(true)
    r.onresult = (e: any) => setText(Array.from({length:e.results.length},(_,i)=>e.results[i][0].transcript).join(''))
    r.onend    = () => setListening(false)
    r.onerror  = () => { setListening(false); toast.error('Voice error') }
    r.start()
  }, [listening])

  async function analyze() {
    if (!text.trim()) { toast.error('Please describe your food'); return }
    setStage('processing'); setStep(0); setConfidence(0)
    for (let i = 0; i < STEPS.length - 1; i++) {
      await new Promise(r => setTimeout(r, 480))
      setStep(i + 1)
      setConfidence(Math.floor(((i+1)/(STEPS.length-1))*94))
    }
    try {
      const res  = await fetch('/api/gemini/analyze', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.error)
      setAnalysis(data.data); setIsDemo(!!data.demo)
      setSelectedNGO('ngo-1'); setStage('result')
    } catch {
      toast.error('Analysis failed. Please try again.')
      setStage('input'); setStep(-1)
    }
  }

  async function submit() {
    if (!analysis) return
    try {
      const res = await fetch('/api/donations', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ donorId:'donor-1', donorName, location: location||'Delhi, India', rawInput:text, analysis }),
      })
      const data = await res.json()
      if (!data.success) throw new Error()
      setStage('done')
      toast.success('Food listed! NGO has been notified.')
    } catch {
      toast.error('Submission failed. Please try again.')
    }
  }

  function reset() {
    setStage('input'); setStep(-1); setConfidence(0)
    setText(''); setLocation(''); setAnalysis(null); setSelectedNGO(null)
  }

  return (
    <div style={{ height:'100vh', overflow:'hidden', display:'flex', flexDirection:'column', background:'var(--th-bg)' }}>
      <Navbar />
      <div style={{ display:'flex', flex:1, marginTop:64, overflow:'hidden' }}>

        {/* ── LEFT: Map ────────────────────────────────────────── */}
        <div className="hidden md:block" style={{ flex:1, position:'relative', background:'var(--th-bg)' }}>
          <MapView selectedNGOId={selectedNGO} analyzing={stage==='processing'} />

          {/* Info overlay */}
          {stage === 'input' && (
            <div className="card card-sm" style={{
              position:'absolute', top:16, left:16, zIndex:999, padding:'10px 14px', maxWidth:200,
            }}>
              <p className="text-xs font-semibold mb-1" style={{ color:'var(--th-text)' }}>4 NGOs nearby</p>
              <p className="text-xs" style={{ color:'var(--th-text-3)' }}>Describe your food — AI selects the best match</p>
            </div>
          )}

          {/* Post-analysis banner */}
          {stage === 'result' && selectedNGO && (
            <motion.div initial={{opacity:0,y:-12}} animate={{opacity:1,y:0}}
              className="card" style={{
                position:'absolute', top:16, left:16, right:16, zIndex:999,
                padding:'12px 14px', borderColor:'var(--th-green-border)',
                background:'var(--th-green-bg)',
              }}>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background:'var(--th-surface)' }}>
                  <Zap className="w-4 h-4" style={{ color:'#16A34A' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold" style={{ color:'var(--th-green-text)' }}>AI Selected NGO</p>
                  <p className="text-xs truncate" style={{ color:'var(--th-text-3)' }}>Roti Bank Delhi · 2.3 km · 94% match</p>
                </div>
                <div className="text-lg font-black shrink-0" style={{ color:'var(--th-green-text)' }}>94%</div>
              </div>
            </motion.div>
          )}
        </div>

        {/* ── RIGHT: AI Panel ──────────────────────────────────── */}
        <div style={{
          width:'100%', maxWidth:440, minWidth: 360,
          borderLeft:'1px solid var(--th-border)',
          overflowY:'auto', display:'flex', flexDirection:'column',
          background:'var(--th-surface)',
        }}>
          {/* Panel header */}
          <div style={{ padding:'16px 24px', borderBottom:'1px solid var(--th-border)', display:'flex', alignItems:'center', gap:12, flexShrink:0 }}>
            <Link href="/donor" className="btn btn-ghost p-1.5">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <h1 className="text-base font-bold" style={{ color:'var(--th-text)' }}>Donate Surplus Grain</h1>
              <p className="text-xs" style={{ color:'var(--th-text-3)' }}>Gemini AI processes your description</p>
            </div>
          </div>

          {/* Content */}
          <div style={{ flex:1, padding:'20px 24px' }}>
            <AnimatePresence mode="wait">

              {/* INPUT */}
              {stage === 'input' && (
                <motion.div key="input" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}}>
                  {/* Tab toggle */}
                  <div className="tab-group mb-4">
                    {(['text','voice'] as const).map(t => (
                      <button key={t} onClick={()=>setTab(t)} className={`tab-item ${tab===t?'active':''}`}>
                        {t==='text' ? <><Type className="w-3.5 h-3.5 inline mr-1.5"/>Type</> : <><Mic className="w-3.5 h-3.5 inline mr-1.5"/>Voice</>}
                      </button>
                    ))}
                  </div>

                  {tab === 'text' && (
                    <textarea value={text} onChange={e=>setText(e.target.value)}
                      placeholder={'Describe your food in Hindi or English...\\ne.g. Mere paas 40 plate biryani hai'}
                      rows={4} className="textarea mb-3" />
                  )}

                  {tab === 'voice' && (
                    <div className="flex flex-col items-center gap-3 py-8 rounded-2xl mb-4"
                      style={{ background:'var(--th-hover)', border:'1px solid var(--th-border)' }}>
                      <button onClick={toggleVoice}
                        className="relative w-16 h-16 rounded-full flex items-center justify-center transition-all"
                        style={{ background: listening ? '#DC2626' : 'var(--th-surface)', border: listening ? 'none' : '2px solid var(--th-border-2)' }}>
                        {listening && <span className="absolute inset-0 rounded-full animate-ping" style={{ background:'#DC262640' }} />}
                        {listening ? <MicOff className="w-6 h-6 text-white relative z-10" /> : <Mic className="w-6 h-6" style={{ color:'var(--th-text-3)' }} />}
                      </button>
                      <p className="text-xs" style={{ color:'var(--th-text-3)' }}>{listening ? 'Listening… speak in Hindi or English' : 'Tap to speak'}</p>
                      {text && (
                        <div className="w-full mx-4 px-4 py-3 rounded-xl text-xs" style={{ background:'var(--th-surface)', border:'1px solid var(--th-border)', color:'var(--th-text)' }}>
                          {text}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="relative mb-4">
                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color:'var(--th-text-4)' }} />
                    <input value={location} onChange={e=>setLocation(e.target.value)}
                      placeholder="Location (optional) — e.g. Connaught Place, Delhi"
                      className="input pl-9 text-xs" />
                  </div>

                  <div className="mb-5">
                    <p className="text-xs font-semibold mb-2" style={{ color:'var(--th-text-3)' }}>Try a sample:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {SAMPLES.map(s => (
                        <button key={s} onClick={()=>setText(s)}
                          className="text-[11px] px-2.5 py-1.5 rounded-lg transition-all"
                          style={{ background:'var(--th-hover)', border:'1px solid var(--th-border)', color:'var(--th-text-2)' }}>
                          {s.slice(0,36)}…
                        </button>
                      ))}
                    </div>
                  </div>

                  <button onClick={analyze} disabled={!text.trim()} className="btn btn-primary w-full py-3.5 text-sm">
                    <Brain className="w-4 h-4" /> Analyze with Gemini
                  </button>
                </motion.div>
              )}

              {/* PROCESSING */}
              {stage === 'processing' && (
                <motion.div key="processing" initial={{opacity:0,scale:0.97}} animate={{opacity:1,scale:1}} exit={{opacity:0}} className="py-4">
                  <div className="text-center mb-6">
                    <div className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center mb-3"
                      style={{ background:'var(--th-violet-bg)', border:'1px solid var(--th-violet-border)' }}>
                      <Brain className="w-7 h-7" style={{ color:'#7C3AED' }} />
                    </div>
                    <h2 className="text-base font-bold" style={{ color:'var(--th-text)' }}>Gemini is thinking…</h2>
                    <p className="text-xs mt-1" style={{ color:'var(--th-text-3)' }}>Extracting structured data from your description</p>
                  </div>
                  {/* Confidence bar */}
                  <div className="mb-5 p-3 rounded-xl" style={{ background:'var(--th-violet-bg)', border:'1px solid var(--th-violet-border)' }}>
                    <div className="flex justify-between mb-2">
                      <span className="text-xs font-semibold" style={{ color:'var(--th-violet-text)' }}>AI Confidence</span>
                      <span className="text-sm font-black" style={{ color:'var(--th-violet-text)' }}>{confidence}%</span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ background:'var(--th-hover)' }}>
                      <motion.div className="h-full rounded-full" style={{ width:`${confidence}%`, background:'#7C3AED' }}
                        transition={{ duration:0.4 }} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    {STEPS.map((s,i) => (
                      <div key={s.id} className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl border transition-all duration-500"
                        style={{
                          background: i < step ? 'var(--th-green-bg)' : i===step ? 'var(--th-violet-bg)' : 'transparent',
                          borderColor: i < step ? 'var(--th-green-border)' : i===step ? 'var(--th-violet-border)' : 'transparent',
                          opacity: i > step ? 0.3 : 1,
                        }}>
                        {i < step  ? <CheckCircle className="w-4 h-4 shrink-0" style={{ color:'var(--th-green-text)' }} /> :
                         i === step ? <Loader2 className="w-4 h-4 animate-spin shrink-0" style={{ color:'var(--th-violet-text)' }} /> :
                         <div className="w-4 h-4 rounded-full border shrink-0" style={{ borderColor:'var(--th-border)' }} />}
                        <span className="text-xs font-medium" style={{ color: i < step ? 'var(--th-green-text)' : i===step ? 'var(--th-violet-text)' : 'var(--th-text-4)' }}>
                          {s.label}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 p-3 rounded-xl" style={{ background:'var(--th-hover)', border:'1px solid var(--th-border)' }}>
                    <p className="text-[10px] font-semibold uppercase tracking-wide mb-1" style={{ color:'var(--th-text-4)' }}>Input</p>
                    <p className="text-xs font-mono" style={{ color:'var(--th-text-2)' }}>{text.slice(0,100)}{text.length>100?'…':''}</p>
                  </div>
                </motion.div>
              )}

              {/* RESULT */}
              {stage === 'result' && analysis && (
                <motion.div key="result" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" style={{ color:'#16A34A' }} />
                      <h2 className="text-base font-bold" style={{ color:'var(--th-text)' }}>Analysis Complete</h2>
                    </div>
                    <UrgencyArc level={analysis.urgencyLevel} />
                  </div>

                  {isDemo && (
                    <div className="mb-3 px-3 py-1.5 rounded-xl text-[11px] font-semibold"
                      style={{ background:'var(--th-violet-bg)', border:'1px solid var(--th-violet-border)', color:'var(--th-violet-text)' }}>
                      Demo mode — add GEMINI_API_KEY for live AI
                    </div>
                  )}

                  {/* Food card */}
                  <div className="rounded-2xl p-4 mb-3 border"
                    style={{ background: URG_BG_VAR[analysis.urgencyLevel], borderColor: URG_BD_VAR[analysis.urgencyLevel] }}>
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div>
                        <h3 className="text-base font-bold" style={{ color:'var(--th-text)' }}>{analysis.foodName}</h3>
                        <p className="text-xs mt-0.5" style={{ color:'var(--th-text-3)' }}>{analysis.quantity}</p>
                      </div>
                      <span className="urg" style={{
                        color: URG_COLORS[analysis.urgencyLevel],
                        background: URG_BG_VAR[analysis.urgencyLevel],
                        borderColor: URG_BD_VAR[analysis.urgencyLevel]
                      }}>{analysis.urgencyLevel}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs">
                      {[
                        { icon:Users,  label:'Serves',   val:`${analysis.estimatedServings} people` },
                        { icon:Leaf,   label:'Type',     val:analysis.dietaryType },
                        { icon:Clock,  label:'Safe for', val:`${analysis.spoilageWindowHours}h` },
                        { icon:Brain,  label:'Language', val:analysis.detectedLanguage, violet:true },
                      ].map(({icon:Icon,label,val,violet}) => (
                        <div key={label} className="flex items-center gap-1.5">
                          <Icon className="w-3.5 h-3.5 shrink-0"
                            style={{ color: violet ? 'var(--th-violet-text)' : 'var(--th-text-3)' }} />
                          <span style={{ color:'var(--th-text-3)' }}>{label}:</span>
                          <span className="font-semibold capitalize truncate" style={{ color:'var(--th-text)' }}>{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Urgency reason */}
                  <div className="flex items-start gap-2 px-3 py-2 rounded-xl mb-3 text-xs panel-amber"
                    style={{ color:'var(--th-amber-text)' }}>
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color:'#D97706' }} />
                    {analysis.urgencyReason}
                  </div>

                  {/* NGO match */}
                  <div className="rounded-xl p-4 mb-4 panel-green">
                    <div className="flex items-center gap-1.5 text-xs font-semibold mb-2.5" style={{ color:'var(--th-green-text)' }}>
                      <Zap className="w-3.5 h-3.5" /> Gemini Best Match
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold text-sm" style={{ color:'var(--th-text)' }}>Roti Bank Delhi</p>
                        <p className="text-xs mt-0.5" style={{ color:'var(--th-text-3)' }}>2.3 km · Volunteer ready · Map updated →</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-black" style={{ color:'var(--th-green-text)' }}>94%</div>
                        <div className="text-[10px]" style={{ color:'var(--th-text-4)' }}>confidence</div>
                      </div>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="relative mb-5">
                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color:'var(--th-text-4)' }} />
                    <input value={location} onChange={e=>setLocation(e.target.value)}
                      placeholder="Confirm pickup location"
                      className="input pl-9 text-xs" />
                  </div>

                  <div className="flex gap-3">
                    <button onClick={reset} className="btn btn-secondary flex-1 py-3 text-sm">
                      <RotateCcw className="w-4 h-4" /> Re-enter
                    </button>
                    <button onClick={submit} className="btn btn-primary flex-1 py-3 text-sm">
                      <Send className="w-4 h-4" /> Confirm
                    </button>
                  </div>
                </motion.div>
              )}

              {/* DONE */}
              {stage === 'done' && (
                <motion.div key="done" initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} className="py-8 text-center">
                  <motion.div initial={{scale:0}} animate={{scale:1}} transition={{type:'spring',stiffness:200}}
                    className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5"
                    style={{ background:'var(--th-green-bg)', border:'2px solid var(--th-green-border)' }}>
                    <CheckCircle className="w-10 h-10" style={{ color:'#16A34A' }} />
                  </motion.div>
                  <h2 className="text-xl font-black mb-2" style={{ color:'var(--th-text)' }}>Grain Listed!</h2>
                  <p className="text-sm mb-1" style={{ color:'var(--th-text-3)' }}>Your donation has been matched.</p>
                  <p className="text-sm font-semibold mb-6" style={{ color:'var(--th-green-text)' }}>Estimated pickup: 18–30 minutes</p>
                  <div className="flex gap-3">
                    <button onClick={reset} className="btn btn-secondary flex-1 py-3 text-sm">Donate More</button>
                    <Link href="/donor" className="btn btn-primary flex-1 py-3 text-sm text-center">
                      Dashboard →
                    </Link>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  )
}
"""

files = {
    f'{BASE}/app/page.tsx':              landing,
    f'{BASE}/app/donor/submit/page.tsx': submit_page,
}

for path, content in files.items():
    os.makedirs(os.path.dirname(path), exist_ok=True)
    open(path, 'w').write(content)
    print(f'✓ {path}')

print('\nPhase 3 done — landing page + split-screen submit page use CSS variable tokens')
