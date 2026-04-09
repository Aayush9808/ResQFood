'use client'

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
    desc: "Restaurants, hotels, caterers, hostels. Turn leftover food into someone's meal in < 30 minutes.",
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
