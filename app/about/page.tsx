'use client'

import Link from 'next/link'
import {
  Brain, ShieldCheck, Zap, Users, Building2, Utensils,
  MapPin, Phone, Mail, ArrowRight, CheckCircle2,
  Sparkles, Clock, HandHeart, Bike,
} from 'lucide-react'
import Navbar from '@/components/Navbar'

const stats = [
  { value: '1.2M+', label: 'Meals Rescued',     icon: Utensils  },
  { value: '340+',  label: 'NGOs Connected',     icon: Building2 },
  { value: '68K',   label: 'Active Volunteers',  icon: Users     },
  { value: '4 hr',  label: 'Avg. Rescue Time',   icon: Clock     },
]

const howItWorks = [
  {
    step: '01',
    icon: Utensils,
    title: 'Donor Lists Food',
    desc: 'Restaurant or individual describes surplus food in Hindi or English — no forms, just natural language. Gemini extracts everything: food name, quantity, dietary type, spoilage window.',
    color: 'bg-amber-50 border-amber-200 text-amber-700',
    dot:   'bg-rq-amber',
  },
  {
    step: '02',
    icon: ShieldCheck,
    title: 'AI Safety Check',
    desc: 'Gemini Vision scans the uploaded food photo for freshness, contamination, and storage conditions. GOOD continues. WARNING flags. REJECT blocks — enforced at the API layer.',
    color: 'bg-green-50 border-green-200 text-green-700',
    dot:   'bg-rq-green',
  },
  {
    step: '03',
    icon: Building2,
    title: 'NGO Gets Matched',
    desc: 'Gemini scores all registered NGOs on distance, dietary compatibility, volunteer availability, and capacity. The top match is notified instantly with the full context.',
    color: 'bg-blue-50 border-blue-200 text-blue-700',
    dot:   'bg-blue-500',
  },
  {
    step: '04',
    icon: Bike,
    title: 'Volunteer Delivers',
    desc: 'A platform volunteer picks up from the donor and routes to the nearest high-need zone — labour colonies, slum clusters, migrant camps — using real road distances via OSRM.',
    color: 'bg-violet-50 border-violet-200 text-violet-700',
    dot:   'bg-violet-500',
  },
]

const geminiFeatures = [
  {
    icon: Brain,
    title: 'Natural Language Understanding',
    desc: 'Donors type or speak in Hindi, English, or a mix. Gemini extracts food name, quantity, urgency level, spoilage window, allergens, and location — from a single raw message.',
  },
  {
    icon: ShieldCheck,
    title: 'Computer Vision Food Gate',
    desc: 'Every food photo is inspected by Gemini multimodal. Unsafe food is blocked at the API level — not just the frontend. This cannot be bypassed.',
  },
  {
    icon: Sparkles,
    title: 'Multi-Factor NGO Ranking',
    desc: 'Gemini simultaneously scores all NGOs on dietary match, distance, acceptance rate, volunteer availability, and remaining capacity. The result appears in under 2 seconds.',
  },
  {
    icon: Zap,
    title: 'Adaptive Decision Engine',
    desc: 'If an NGO doesn\'t respond or food approaches spoilage, Gemini\'s decision engine reassigns automatically — factoring in elapsed time, remaining safe window, and all alternatives.',
  },
]

const whyUs = [
  { icon: Zap,        title: 'Fast',         desc: 'From listing to volunteer dispatch in under 4 minutes.' },
  { icon: ShieldCheck,title: 'Safe',         desc: 'AI food safety gate blocks unsafe donations before they enter the system.' },
  { icon: Brain,      title: 'Intelligent',  desc: 'Gemini 2.5 Flash powers every decision — NLU, vision, ranking, routing.' },
  { icon: Users,      title: 'Coordinated',  desc: 'Donor, NGO, and volunteer dashboards are live-synced in real time.' },
  { icon: MapPin,     title: 'Targeted',     desc: '5 priority need-zones in Greater Noida mapped with real population data.' },
  { icon: HandHeart,  title: 'Zero Cost',    desc: 'Free for all donors. No platform fees. No bureaucracy.' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-rq-bg text-rq-text">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="pt-32 pb-20 px-4 sm:px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-72 h-72 rounded-full bg-rq-amber/8 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-rq-green/6 blur-3xl" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="label-kicker">About GeminiGrain</span>
          <h1 className="mt-4 text-[44px] sm:text-[56px] leading-[1.08] font-bold text-rq-text">
            Rescuing Food with{' '}
            <span className="text-rq-amber">Intelligence</span>
          </h1>
          <p className="mt-6 text-[17px] text-rq-muted leading-relaxed max-w-2xl mx-auto">
            GeminiGrain is an AI-native food rescue platform that connects food donors, NGOs, and delivery volunteers — coordinating the entire chain from surplus detection to last-mile delivery using Google Gemini.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/login" className="pill-btn inline-flex items-center gap-2 bg-rq-text hover:bg-black text-white px-7 py-3.5 text-sm">
              Start Donating <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/register" className="pill-btn inline-flex items-center gap-2 border border-rq-border bg-white hover:bg-rq-surface2 text-rq-text px-7 py-3.5 text-sm">
              Join as Volunteer
            </Link>
          </div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────────────────────── */}
      <section className="py-14 bg-white border-y border-rq-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map(({ value, label, icon: Icon }) => (
              <div key={label} className="text-center">
                <div className="w-11 h-11 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-5 h-5 text-rq-amber" />
                </div>
                <div className="text-[32px] font-bold text-rq-text leading-none">{value}</div>
                <div className="mt-1 text-sm text-rq-muted">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR MISSION ──────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <span className="label-kicker">Our Mission</span>
            <h2 className="mt-4 text-[38px] leading-tight font-bold">
              Close the gap between waste and hunger
            </h2>
            <p className="mt-5 text-[17px] text-rq-muted leading-relaxed">
              India wastes 68 million tonnes of food every year while 194 million people go hungry. The distance between that food and those people is often under 5 kilometres. The gap isn't logistical — it's a coordination failure.
            </p>
            <p className="mt-4 text-[17px] text-rq-muted leading-relaxed">
              GeminiGrain eliminates the coordination failure. Real-time AI understands what food is available, verifies it is safe, finds the right NGO, and dispatches a volunteer — all in under 4 minutes.
            </p>
            <ul className="mt-7 space-y-3">
              {[
                'Reduce restaurant and event food waste',
                'Connect verified NGOs with surplus food instantly',
                'Enable volunteers to deliver with optimal routing',
                'Generate FSSAI-compliant food safety certificates',
              ].map(item => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-rq-green flex-shrink-0 mt-0.5" />
                  <span className="text-[15px] text-rq-text">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative min-h-[380px] hidden lg:block">
            <div className="absolute top-0 left-0 w-[280px] h-[280px] rounded-full overflow-hidden shadow-2xl border-[8px] border-white">
              <img
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=900&q=80"
                alt="Food rescue volunteers"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-0 right-0 w-[240px] h-[240px] rounded-full overflow-hidden shadow-2xl border-[8px] border-white">
              <img
                src="https://images.unsplash.com/photo-1593113630400-ea4288922497?auto=format&fit=crop&w=900&q=80"
                alt="Community meal distribution"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="label-kicker">The Process</span>
            <h2 className="mt-4 text-[38px] leading-tight font-bold">How It Works</h2>
            <p className="mt-4 text-[16px] text-rq-muted max-w-xl mx-auto">
              Four steps from surplus food to delivered meal — each powered by a different Gemini integration.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map(({ step, icon: Icon, title, desc, color, dot }) => (
              <div key={step} className={`soft-card p-6 border ${color.split(' ').slice(1).join(' ')}`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-9 h-9 rounded-full ${color.split(' ')[0]} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${color.split(' ')[2]}`} />
                  </div>
                  <span className={`text-xs font-bold tracking-widest ${color.split(' ')[2]} opacity-60`}>{step}</span>
                </div>
                <h3 className="text-[17px] font-bold text-rq-text mb-2">{title}</h3>
                <p className="text-[13px] text-rq-muted leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI SECTION ───────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 bg-gradient-to-br from-amber-50/60 via-orange-50/30 to-rq-bg">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="label-kicker">Powered by Gemini</span>
            <h2 className="mt-4 text-[38px] leading-tight font-bold">
              AI at every step
            </h2>
            <p className="mt-4 text-[16px] text-rq-muted max-w-2xl mx-auto">
              GeminiGrain uses Google Gemini 2.5 Flash across five independent integration points. Remove Gemini and the system cannot accept a single donation.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {geminiFeatures.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl border border-amber-100 p-7 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-rq-amber" />
                </div>
                <h3 className="text-[18px] font-bold text-rq-text mb-2">{title}</h3>
                <p className="text-[14px] text-rq-muted leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 bg-white border border-amber-200 rounded-2xl p-6 shadow-sm">
            <p className="text-xs uppercase tracking-widest text-rq-amber font-semibold mb-2">Real Gemini Response</p>
            <pre className="text-[13px] text-rq-text font-mono leading-relaxed overflow-x-auto">{`// Input: "Urgent: 20kg chicken pulao, expires 2 hours, Sector 62 Noida"
{
  "foodName": "chicken pulao",
  "urgencyLevel": "CRITICAL",
  "spoilageWindowHours": 2,
  "locationHint": "Sector 62 Noida",
  "confidence": 100,
  "model": "gemini-2.5-flash"
}`}</pre>
          </div>
        </div>
      </section>

      {/* ── WHY GEMINIGRAIN ──────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="label-kicker">Why GeminiGrain</span>
            <h2 className="mt-4 text-[38px] leading-tight font-bold">Built different</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyUs.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="soft-card p-6 hover:shadow-md transition-shadow group">
                <div className="w-10 h-10 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center mb-4 group-hover:bg-rq-amber group-hover:border-rq-amber transition-colors">
                  <Icon className="w-5 h-5 text-rq-amber group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-[17px] font-bold text-rq-text mb-1.5">{title}</h3>
                <p className="text-[14px] text-rq-muted leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 bg-rq-bg" id="contact">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="label-kicker">Get in Touch</span>
            <h2 className="mt-4 text-[38px] leading-tight font-bold">Contact Us</h2>
            <p className="mt-4 text-[16px] text-rq-muted max-w-lg mx-auto">
              Partner with us, volunteer, or just say hello.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Contact info */}
            <div className="space-y-5">
              {[
                { icon: Mail,    label: 'Email',    value: 'help@geminigrain.in' },
                { icon: Phone,   label: 'Phone',    value: '+91 98765 43210' },
                { icon: MapPin,  label: 'Location', value: 'Greater Noida, Uttar Pradesh, India' },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-4 bg-white rounded-2xl border border-rq-border p-5">
                  <div className="w-10 h-10 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-rq-amber" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-rq-muted mb-0.5">{label}</p>
                    <p className="text-[15px] font-medium text-rq-text">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact form */}
            <form
              className="bg-white rounded-2xl border border-rq-border p-7 shadow-sm space-y-5"
              onSubmit={e => e.preventDefault()}
            >
              <div>
                <label className="block text-sm font-semibold text-rq-text mb-1.5">Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-2.5 rounded-xl border border-rq-border bg-rq-surface2 text-sm text-rq-text placeholder-rq-subtle focus:outline-none focus:ring-2 focus:ring-amber-100 focus:border-rq-amber transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-rq-text mb-1.5">Message</label>
                <textarea
                  rows={4}
                  placeholder="How can we help?"
                  className="w-full px-4 py-2.5 rounded-xl border border-rq-border bg-rq-surface2 text-sm text-rq-text placeholder-rq-subtle focus:outline-none focus:ring-2 focus:ring-amber-100 focus:border-rq-amber transition-all resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-rq-amber text-white rounded-xl font-semibold hover:bg-rq-amber-dim transition-colors text-sm"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 bg-rq-text text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-[38px] font-bold leading-tight">
            Ready to make a difference?
          </h2>
          <p className="mt-5 text-[17px] text-white/70 leading-relaxed">
            Every meal rescued is a life changed. Join GeminiGrain as a donor, NGO partner, or volunteer today.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/login"
              className="pill-btn inline-flex items-center gap-2 bg-rq-amber hover:bg-rq-amber-dim text-white px-8 py-3.5 text-sm font-semibold shadow-lg shadow-amber-900/30"
            >
              Start Donating <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/register"
              className="pill-btn inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-3.5 text-sm font-semibold backdrop-blur-sm"
            >
              Join as Volunteer
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer className="py-8 px-4 sm:px-6 bg-rq-text border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <img src="/logo.png" alt="GeminiGrain" style={{ height: '36px', width: 'auto', filter: 'brightness(0) invert(1)' }} />
          <p className="text-sm text-white/50">© 2026 GeminiGrain. Built for HackDays 2026.</p>
          <div className="flex items-center gap-5 text-sm text-white/50">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <Link href="/login" className="hover:text-white transition-colors">Sign In</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
