'use client'

import Link from 'next/link'
import {
  ArrowRight,
  HandHelping,
  Users,
  HeartPulse,
  Award,
  Clock,
  Star,
  CheckCircle2,
  Shield,
  Building2,
  Zap,
  MapPin,
  Trophy,
  BadgeCheck,
} from 'lucide-react'
import Navbar from '@/components/Navbar'

const volunteerPositions = [
  {
    icon: HandHelping,
    title: 'Pickup Volunteer',
    description: 'Collect food from donors and hand over safely to NGO points.',
  },
  {
    icon: Users,
    title: 'Community Coordinator',
    description: 'Coordinate calls between nearby NGOs, donors, and delivery volunteers.',
  },
  {
    icon: HeartPulse,
    title: 'Food Safety Monitor',
    description: 'Support quality checks and basic hygiene compliance during transfers.',
  },
  {
    icon: ArrowRight,
    title: 'Route Assistant',
    description: 'Help optimize delivery sequence for faster and safer last-mile handoff.',
  },
]

const benefits = [
  {
    icon: Award,
    title: 'Certificate of Contribution',
    description: 'Receive a verifiable digital certificate for every major milestone you complete.',
  },
  {
    icon: Trophy,
    title: 'Recognition & Leaderboard',
    description: 'Top volunteers are featured on our community leaderboard every month.',
  },
  {
    icon: HeartPulse,
    title: 'Real Impact on Society',
    description: 'Every pickup you complete directly translates to a meal for someone in need.',
  },
  {
    icon: Clock,
    title: 'Flexible Time',
    description: 'Choose your own availability — evenings, weekends, or whenever suits you.',
  },
  {
    icon: Building2,
    title: 'NGO Networking',
    description: 'Build relationships with established NGOs, donors, and community leaders.',
  },
  {
    icon: Zap,
    title: 'Skill Development',
    description: 'Learn logistics coordination, food safety, and humanitarian operations hands-on.',
  },
]

const steps = [
  {
    num: '01',
    title: 'Sign Up',
    description: 'Create your account and choose the volunteer role that fits your skills.',
  },
  {
    num: '02',
    title: 'Choose Your Role',
    description: 'Pick from Pickup, Coordinator, Safety Monitor, or Route roles.',
  },
  {
    num: '03',
    title: 'Get Assigned a Rescue',
    description: "GeminiGrain's AI matches you to a nearby active food rescue campaign.",
  },
  {
    num: '04',
    title: 'Pickup & Deliver',
    description: 'Head to the pickup point, collect the food, and deliver it to the assigned NGO.',
  },
]

const badges = [
  { icon: Star,       label: 'First Rescue',  desc: 'Complete your first pickup'              },
  { icon: Zap,        label: 'Speed Runner',  desc: 'Deliver within 30 minutes'               },
  { icon: Shield,     label: 'Safety Pro',    desc: 'Pass all food safety checks'             },
  { icon: Trophy,     label: 'Top Volunteer', desc: '50+ rescues completed'                   },
  { icon: MapPin,     label: 'City Hero',     desc: 'Active in 3+ localities'                 },
  { icon: BadgeCheck, label: 'Certified',     desc: 'Official GeminiGrain certificate earned' },
]

export default function VolunteerInfoPage() {
  return (
    <div className="min-h-screen bg-rq-bg text-rq-text">
      <Navbar />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="section-cream relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-16 right-1/4 w-80 h-80 rounded-full bg-rq-amber/8 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 w-60 h-60 rounded-full bg-rq-amber/5 blur-2xl" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="label-kicker">Volunteer</span>
          <h1 className="mt-4 text-[44px] sm:text-[58px] leading-[1.06] font-bold text-rq-text">
            Become a Food Rescue<br className="hidden sm:block" /> Volunteer
          </h1>
          <p className="mt-5 text-[18px] text-rq-muted max-w-xl mx-auto leading-relaxed">
            Join a community making real impact by delivering meals to those in need.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Link
              href="/register"
              className="pill-btn inline-flex items-center gap-2 bg-rq-amber text-white px-8 py-3.5 text-[15px] font-semibold shadow-lg shadow-amber-200/60"
            >
              Join Now <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/about"
              className="pill-btn inline-flex items-center gap-2 bg-white border border-rq-border text-rq-text px-8 py-3.5 text-[15px] font-medium hover:border-rq-amber/50 transition-colors"
            >
              Learn More
            </Link>
          </div>

          {/* Quick stats */}
          <div className="mt-14 grid grid-cols-3 gap-6 max-w-lg mx-auto">
            {[
              { value: '68K+', label: 'Active Volunteers' },
              { value: '5',    label: 'Cities Covered'    },
              { value: '1.2M', label: 'Meals Rescued'     },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-[32px] font-bold text-rq-text leading-none">{value}</div>
                <p className="mt-1.5 text-xs text-rq-muted font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── POSITIONS ─────────────────────────────────────────────────────── */}
      <section className="section-white py-24" id="positions">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="label-kicker">Open Roles</span>
            <h2 className="mt-4 text-[38px] leading-tight font-bold">Volunteer Positions Available</h2>
            <p className="mt-3 text-rq-muted max-w-lg mx-auto">Pick the role that matches your skills and availability.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {volunteerPositions.map((item) => (
              <article
                key={item.title}
                className="soft-card p-7 hover:-translate-y-1 hover:shadow-xl transition-all duration-200"
              >
                <div className="w-12 h-12 rounded-full border border-rq-amber/35 flex items-center justify-center mb-5">
                  <item.icon className="w-5 h-5 text-rq-amber" />
                </div>
                <h3 className="text-[20px] font-bold text-rq-text">{item.title}</h3>
                <p className="mt-2 text-[14px] text-rq-muted leading-relaxed">{item.description}</p>
                <Link
                  href="/register"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm text-rq-amber font-semibold hover:gap-3 transition-all"
                >
                  Apply Now <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY VOLUNTEER ─────────────────────────────────────────────────── */}
      <section className="section-cream py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="label-kicker">Benefits</span>
            <h2 className="mt-4 text-[38px] leading-tight font-bold">Why Volunteer With Us?</h2>
            <p className="mt-3 text-rq-muted max-w-lg mx-auto">Real rewards for real contributions — not just good intentions.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b) => (
              <article key={b.title} className="soft-card p-7 hover:-translate-y-1 hover:shadow-lg transition-all duration-200">
                <div className="w-11 h-11 rounded-xl bg-rq-amber/10 flex items-center justify-center mb-4">
                  <b.icon className="w-5 h-5 text-rq-amber" />
                </div>
                <h3 className="text-[19px] font-bold text-rq-text">{b.title}</h3>
                <p className="mt-2 text-[14px] text-rq-muted leading-relaxed">{b.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────────── */}
      <section className="section-white py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="label-kicker">Process</span>
            <h2 className="mt-4 text-[38px] leading-tight font-bold">How It Works</h2>
            <p className="mt-3 text-rq-muted max-w-md mx-auto">From sign-up to your first delivery in four simple steps.</p>
          </div>

          <div className="relative">
            {/* Connector line (desktop only) */}
            <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-rq-border" aria-hidden="true" />

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step) => (
                <div key={step.num} className="flex flex-col items-center text-center">
                  <div className="relative w-20 h-20 rounded-full bg-white border-2 border-rq-amber flex items-center justify-center mb-5 shadow-sm shadow-amber-100 z-10">
                    <span className="text-[22px] font-bold text-rq-amber">{step.num}</span>
                  </div>
                  <h3 className="text-[18px] font-bold text-rq-text">{step.title}</h3>
                  <p className="mt-2 text-[13px] text-rq-muted leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CERTIFICATION ─────────────────────────────────────────────────── */}
      <section className="section-cream py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            {/* Left: text */}
            <div>
              <span className="label-kicker">Recognition</span>
              <h2 className="mt-4 text-[38px] leading-tight font-bold">
                Earn Verified Certificates for Your Contributions
              </h2>
              <p className="mt-4 text-[16px] text-rq-muted leading-relaxed">
                Every milestone you hit on GeminiGrain is tracked and rewarded. From your first
                pickup to becoming a citywide hero, your effort is always acknowledged.
              </p>

              <ul className="mt-7 space-y-4">
                {[
                  'Digital certificate issued after 10 completed rescues',
                  'Hours automatically tracked per session',
                  'Sharable on LinkedIn and portfolios',
                  'Verified by GeminiGrain and partnered NGOs',
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3 text-[15px] text-rq-text">
                    <CheckCircle2 className="w-5 h-5 text-rq-amber flex-shrink-0 mt-0.5" />
                    {point}
                  </li>
                ))}
              </ul>

              <Link
                href="/register"
                className="mt-9 pill-btn inline-flex items-center gap-2 bg-rq-amber text-white px-7 py-3.5 text-[15px] font-semibold"
              >
                Start Earning <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Right: certificate mock + badge grid */}
            <div className="space-y-6">
              {/* Certificate preview card */}
              <div className="soft-card p-8 border-2 border-rq-amber/25 relative overflow-hidden">
                <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-rq-amber/8" aria-hidden="true" />
                <p className="text-xs font-bold uppercase tracking-widest text-rq-amber mb-1">GeminiGrain Verified</p>
                <h3 className="text-[22px] font-bold text-rq-text">Certificate of Contribution</h3>
                <p className="mt-2 text-[13px] text-rq-muted">This certifies that</p>
                <p className="mt-1 text-[20px] font-semibold text-rq-text italic">Your Name</p>
                <p className="mt-1 text-[13px] text-rq-muted">
                  has successfully completed <strong className="text-rq-text">10+ food rescue missions</strong>
                </p>
                <div className="mt-5 flex items-center justify-between border-t border-rq-border pt-4">
                  <div>
                    <p className="text-[10px] text-rq-subtle uppercase tracking-widest">Issued by</p>
                    <p className="text-[13px] font-semibold text-rq-text">GeminiGrain Platform</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-rq-amber/15 flex items-center justify-center">
                    <Award className="w-6 h-6 text-rq-amber" />
                  </div>
                </div>
              </div>

              {/* Badge grid */}
              <div className="grid grid-cols-3 gap-3">
                {badges.map((badge) => (
                  <div key={badge.label} className="soft-card p-4 text-center hover:-translate-y-0.5 transition-transform">
                    <div className="w-10 h-10 mx-auto rounded-full bg-rq-amber/10 flex items-center justify-center mb-2.5">
                      <badge.icon className="w-4 h-4 text-rq-amber" />
                    </div>
                    <p className="text-[12px] font-bold text-rq-text leading-tight">{badge.label}</p>
                    <p className="text-[10px] text-rq-muted mt-0.5 leading-snug">{badge.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 bg-rq-text text-white">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/80 text-xs font-semibold uppercase tracking-widest mb-5">
            Ready to Make a Difference?
          </span>
          <h2 className="text-[36px] sm:text-[44px] font-bold leading-tight">
            Start Volunteering Today
          </h2>
          <p className="mt-4 text-white/65 text-[16px] max-w-lg mx-auto leading-relaxed">
            Hundreds of volunteers are already rescuing food across Delhi NCR. Your next pickup could feed a family.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/register"
              className="pill-btn inline-flex items-center gap-2 bg-rq-amber text-white px-8 py-3.5 text-[15px] font-semibold shadow-lg shadow-amber-900/30"
            >
              Join as Volunteer <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/rescues"
              className="pill-btn inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-3.5 text-[15px] font-medium transition-colors"
            >
              Browse Active Rescues
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
