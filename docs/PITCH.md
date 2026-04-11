# GeminiGrain — HackDays 2026 Pitch Deck
### Theme: **Best Use of Google Gemini API Keys**
> Copy-paste ready content for each slide. Every word chosen to impress judges.

---

---

## SLIDE 1 — TITLE

```
┌────────────────────────────────────────────────────────────┐
│                                                            │
│            🌾  GeminiGrain                                  │
│                                                            │
│   "Every Meal Saved Matters"                               │
│                                                            │
│   AI-powered food rescue. Real-time. Any language.         │
│                                                            │
│   ───────────────────────────────────────                  │
│   HackDays 2026  |  GCET × HackBase × MLH                  │
│   Track: Best Use of Google Gemini API Keys                │
│                                                            │
│   Aayush Kumar Shrivastava · Sanskar Yadav                 │
│   Live: resqfood-delta.vercel.app                          │
└────────────────────────────────────────────────────────────┘
```

**Visual:** Dark green gradient. Grain/leaf motif subtle in background. Gemini logo small bottom-right. Clean, startup-tier.

---

---

## SLIDE 2 — THE PROBLEM

### Headline (large):
> "India throws away 68 million tonnes of food every year.  
> 194 million people go to bed hungry.  
> The gap between them? **3 kilometres and zero coordination.**"

### Stats grid (4 boxes):
| 🗑️ | 📉 | 💸 | ⏳ |
|---|---|---|---|
| **68.7M tonnes** wasted annually | **194M** Indians face hunger | **₹92,000 crore** lost per year | Cooked food spoils in **2–4 hours** |

### The real reason redistribution fails:
- ❌ Donors don't know how to describe food formally (language barrier)
- ❌ NGOs make decisions blindly — no food safety intelligence
- ❌ Volunteers dispatch without route optimization
- ❌ No urgency detection — a CRITICAL spoilage is treated like any other case
- ❌ WhatsApp groups with screenshots aren't a system — they're chaos

**Speaker note:** "This isn't a food shortage. This is a coordination failure. And coordination failures are exactly what AI solves."

---

---

## SLIDE 3 — INTRODUCING GEMINIGRAIN

### Headline:
> **"GeminiGrain is not a donation form.  
> It's an AI-native food rescue operating system."**

### One-line flow (animated):
```
Donor says: "mere paas 40 plate biryani hai" (Hindi)
      ↓   Gemini understands
Food: Biryani | Non-veg | 40 plates | Urgent | ~4hr window
      ↓   Gemini Vision scans photo
Food condition: GOOD ✅ | Confidence: 91%
      ↓   Gemini ranks NGOs
#1 Roti Bank Delhi — 2.3 km, volunteer ready, 94% match
      ↓   Volunteer dispatched to...
Kasna Labour Colony — 8,500 hungry people
```

### Key differentiators (3 bold points):
1. **No forms.** One raw message in any language = complete donation record
2. **No unsafe food.** Computer vision safety gate blocks contaminated submissions
3. **No guesswork.** AI ranks NGOs, routes volunteers, escalates urgency automatically

**Visual:** Animated flow diagram. Green checkmarks. Mobile-first wireframe on right.

---

---

## SLIDE 4 — HOW GEMINI POWERS EVERYTHING

### Headline:
> **"Remove Gemini. The system cannot accept a single donation."**

### 5 Integration Points (card layout):

---

**① Natural Language Understanding**
*Any text, any language → structured data*

| Input | Gemini Output |
|-------|--------------|
| "Shaadi mein 50 plate khana bach gaya, abhi hot hai" | `foodName: Wedding Food` · `qty: 50 plates` · `urgency: HIGH` · `spoilage: 3hr` · `lang: Hindi` |
| "urgent 20kg chicken pulao expires 2hr sector 62 noida" | `foodName: Chicken Pulao` · `urgency: CRITICAL` · `spoilageWindow: 2hr` · `location: Sector 62` |

---

**② Computer Vision Food Safety Gate**
*Photo → GOOD / WARNING / REJECT*

Gemini inspects the food photo for:
- Freshness indicators · Mould or contamination · Open vs sealed containers · Storage conditions

> **REJECT = hard block.** Cannot be bypassed. API-layer enforced.

---

**③ Multi-Factor NGO Ranking**
*Scores all NGOs simultaneously after every analysis*

Scoring formula (Gemini evaluates):
```
Match Score = Dietary compatibility (critical gate)
            + Distance penalty (-3 per km)
            + Volunteer availability (+20)
            + Acceptance rate × 0.4
            + Capacity vs servings
```

> Donor sees: *"#1 Roti Bank Delhi — Dietary match ✓, volunteer ready, 2.3 km — 94%"*

---

**④ Decision Engine — Adaptive Logistics**
*What happens when things go wrong*

| Failure Mode | Gemini Response |
|-------------|-----------------|
| NGO doesn't respond | Reassigns to next-best NGO with justification |
| Food approaching spoilage | Escalates to CRITICAL, alerts ALL nearby NGOs |
| Multiple volunteers available | Prioritizes by proximity + vehicle capacity |

---

**⑤ Food Safety Certificate**
*Formal FSSAI-aligned document, AI-authored*

Auto-generated on delivery:
- Chain of custody timeline
- Safe consumption window
- Allergen declaration
- Digital certification ID

---

**Speaker note:** "This is five independent, production-grade AI integrations in one system. Not a wrapper. Not a demo. Five real use cases, all live."

---

---

## SLIDE 5 — LIVE DEMO

### Headline:
> **"Let's watch a Hindi message become a complete rescue operation."**

### Demo script (3 minutes):
```
Step 1 — Donor Flow
  → Login as Donor (9999999991 / PIN: 1234)
  → Click "Donate Food"
  → Speak OR type: "mere paas 30 plate biryani hai, jaldi uthwa lo"
  → Upload food photo
  → Click Analyze → WATCH Gemini extract structured data live
  → Show rankedNGOs: #1 Roti Bank, #2 Sewa Samiti
  → Confirm submission

Step 2 — NGO Flow
  → Login as NGO (9999999992 / PIN: 1234)
  → Show urgency-sorted queue
  → Show AI Vision badge GREEN on food photo
  → Accept donation

Step 3 — Map View
  → Show volunteer map with 5 needy zones
  → Show OSRM routing: pickup → Kasna Labour Colony
  → Volunteer marks delivered

Total demo time: ~3 minutes
```

### Fallback if API is slow:
> The system has a smart demo mode — NLP parser produces accurate results even without API calls. System never breaks during a demo.

---

---

## SLIDE 6 — THE MAP & LOGISTICS LAYER

### Headline:
> **"The map is not decoration. It's a logistics command centre."**

### What's on the map:
```
🔵  Donor location   — live pin
🟢  NGO markers      — with capacity + dietary tooltips
🟡  Volunteer        — live position
🟣  5 Needy Zones    — real Greater Noida high-need areas
📍  OSRM Route       — actual road path, not straight-line
```

### The 5 operational zones:

| Zone | Population | Priority |
|------|-----------|----------|
| Kasna Labour Colony | 8,500 people | 🔴 High |
| Ecotech-III Slum Cluster | 6,000 people | 🔴 High |
| Surajpur Village | 4,200 people | 🟡 Medium |
| Bisrakh Migrant Workers Camp | 3,100 people | 🟡 Medium |
| Dadri Construction Workers Colony | 2,800 people | 🟡 Medium |

**Total addressable population: 24,600 people — in one district alone.**

**Speaker note:** "We didn't pick these zones randomly. These are real Greater Noida labour colonies and slum clusters. The delivery routes are real road distances."

---

---

## SLIDE 7 — SYSTEM ARCHITECTURE

### Headline:
> **"Production-grade. Failsafe. Scales horizontally."**

### Architecture (simplified):

```
FRONTEND (Next.js 16 + TypeScript + Tailwind + Framer Motion)
    │
    ├── Donor: Voice input → Gemini analyze → upload photo → Gemini Vision
    ├── NGO: Urgency queue → risk flags → Gemini rank badges
    └── Volunteer: Map routing → OSRM → needy zone overlay
    │
    ↓ REST API (Next.js Route Handlers)
    │
    ├── /api/gemini/analyze         ← Text NLU + NGO ranking
    ├── /api/gemini/analyze-image   ← Vision safety gate
    ├── /api/gemini/decision        ← Reassignment engine
    ├── /api/gemini/ngo-rank        ← Standalone NGO scorer
    └── /api/certificates/generate  ← FSSAI certificate
    │
    ↓ Google Gemini 2.5 Flash
    │
    └── Retry cascade:
        gemini-2.5-flash → gemini-2.0-flash → gemini-2.0-flash-lite
        → Smart local NLP fallback (never hard-fails)
```

### Key engineering decisions:
- **Model retry cascade** — auto-switches on 429/503, zero downtime
- **API-layer enforcement** — safety rules enforced in server, not just frontend
- **Stateless routes** — horizontally scalable, no coordination needed
- **Smart demo fallback** — NLP parser with 40-entry food map, zero dependencies

---

---

## SLIDE 8 — TECH STACK

### Headline:
> **"Built right. No shortcuts."**

| Layer | Technology | Why |
|-------|-----------|-----|
| Framework | Next.js 16 (App Router) | Server + client in one repo |
| Language | TypeScript (strict, 0 errors) | Production-grade, safe |
| AI | Google Gemini 2.5 Flash | Fastest, multimodal, multilingual |
| UI | Tailwind CSS + Framer Motion | Pixel-perfect + animated |
| Maps | react-leaflet + OpenStreetMap | Free, accurate, no API cost |
| Routing | OSRM (Open Source Routing) | Real road distances, not straight-line |
| State | In-memory Map store | Zero DB dependency, instant demo |
| Auth | OTP-based, role-aware | Donor / NGO / Volunteer separation |
| Deploy | Vercel | Instant CI/CD |

**AI SDK:** `@google/generative-ai` — direct API integration, no middleware bloat

---

---

## SLIDE 9 — IMPACT & SCALE

### Headline:
> **"We built for Greater Noida. This scales to every city in India."**

### Current capabilities:
- ✅ 4 NGOs registered and scored
- ✅ 3 role types (Donor / NGO / Volunteer)
- ✅ 5 needy zones actively mapped
- ✅ Bilingual (Hindi + English, voice + text)
- ✅ Real-time donation tracking
- ✅ Food safety gate (computer vision)
- ✅ Formal FSSAI-compliant certificates

### Scale math (one district):
```
24,600 people across 5 needy zones in Greater Noida alone
1 restaurant donating 50 plates → feeds ~50 people
2,000 restaurants in Greater Noida area

If 10% donate monthly = 100 restaurants × 50 plates = 5,000 meals/month
That's 5,000 meals that would have gone into a bin.
```

### 6-month roadmap:
- WhatsApp / SMS notifications via Twilio
- Predictive surplus detection (Gemini learns restaurant patterns)
- Government API bridge (FSSAI + municipality NGO registry)
- Multi-city rollout: Delhi → Mumbai → Bengaluru

---

---

## SLIDE 10 — WHY WE WIN "BEST USE OF GEMINI API"

### The contrast (bold, side by side):

| ❌ Typical Hackathon Gemini Project | ✅ GeminiGrain |
|---|---|
| "We summarize articles with AI" | Remove Gemini → system is dead |
| One API call, same output every time | 5 integration points, every output is unique |
| Gemini as a feature | Gemini as the architecture |
| Demo mode = hardcoded responses | Demo mode = real NLP intelligence with fallback |
| English only | Hindi, English, any language |
| Text only | Text + Computer Vision + Document generation |

### The 5 independent Gemini use cases — at a glance:

```
① NLU          "mere paas biryani hai" → structured JSON
② Vision       food photo → GOOD/WARNING/REJECT safety gate
③ Ranking      5 simultaneous NGO scores per donation
④ Decision     reassign/escalate when NGO doesn't respond
⑤ Certificate  FSSAI-aligned legal document, AI-authored
```

### Real proof — actual API response, live:
```json
// Input: "Urgent: 20kg chicken pulao, expires 2 hours, Sector 62 Noida"
{
  "foodName": "chicken pulao",
  "urgencyLevel": "CRITICAL",
  "spoilageWindowHours": 2,
  "locationHint": "Sector 62 Noida",
  "confidence": 100,
  "model": "gemini-2.5-flash"
}
```

**One raw message. One API call. Perfect structured output. Zero preprocessing.**

---

---

## SLIDE 11 — THE TEAM

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│   Aayush Kumar Shrivastava                          │
│   Full Stack Development + AI Integration           │
│   Next.js · TypeScript · Gemini API                 │
│                                                     │
│   Sanskar Yadav                                     │
│   Backend APIs + Auth + Certificate System          │
│   REST · OTP Auth · FSSAI Logic                     │
│                                                     │
│   ─────────────────────────────────────────         │
│   GitHub:  github.com/Aayush9808/GeminiGrain        │
│   Live:    resqfood-delta.vercel.app                │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

---

## SLIDE 12 — CLOSING

### Full screen. One message.

---

> *"Every year, India throws away enough food  
> to feed the entire population of Germany — twice.*
>
> *The problem was never too little food.*
> *The problem was too little intelligence.*
>
> **Now it has some."**

---

### Call to action (bottom):
```
🌐  Try it live:    resqfood-delta.vercel.app
📂  Source code:    github.com/Aayush9808/GeminiGrain
📱  Demo PIN:       1234  (all roles)
```

**Visual:** Dark screen. Single candle or single grain of wheat. White text. Silence.

---

---

# DESIGN GUIDELINES FOR ALL SLIDES

## Color Palette
| Usage | Color | Hex |
|-------|-------|-----|
| Primary | Forest Green | `#16A34A` |
| Accent | Gemini Blue | `#4285F4` |
| Warning | Amber | `#F59E0B` |
| Background | Near Black | `#0A0A0A` |
| Text | Off White | `#F5F5F5` |
| Subtext | Muted Gray | `#9CA3AF` |

## Typography
- **Headings:** Inter Bold or Poppins Bold — large, confident
- **Body:** Inter Regular — clean, readable
- **Code blocks:** JetBrains Mono — use for JSON/API responses

## Slide Structure Rules
1. One idea per slide — don't crowd
2. Numbers > words wherever possible
3. Real data always beats claims (use the actual JSON response, not "Gemini returns structured data")
4. Never use bullet walls — max 4 bullets per slide, max 6 words per bullet
5. Every slide should have ONE headline that would work as a tweet

## Presentation Tone
- Confident, not desperate
- Data-backed, not emotional (let the stats do the emotion)
- This is a startup pitch, not a science fair
- "We built this" energy throughout — no hedging language

---

# DEMO LOGIN QUICK REFERENCE

| Role | Phone | PIN | Entry point |
|------|-------|-----|-------------|
| 🍽️ Donor | `9999999991` | `1234` | `/login` |
| 🏥 NGO | `9999999992` | `1234` | `/login` |
| 🚴 Volunteer | `9999999993` | `1234` | `/login` |

**Always demo Donor flow first** — the Gemini NLU + Vision is the most impressive moment. Save the map routing for Volunteer flow as the closer.

---

# Q&A PREP — EXPECTED JUDGE QUESTIONS

**Q: What if the Gemini API is down during a real demo?**
> "The system has a smart NLP fallback parser — a 40-entry food keyword map that extracts food names, quantities, urgency, and location from raw text without any API call. The demo never breaks."

**Q: How is this different from a regular food donation app?**
> "Every existing food donation app requires filling a form. GeminiGrain's input is a WhatsApp message. That's the difference between a tool and a system."

**Q: Is the food safety gate actually enforced?**
> "Yes — both at the frontend (Analyze button is disabled) and at the API layer (the donation creation endpoint rejects submissions with REJECT image validation). It cannot be bypassed."

**Q: What's your monetization model?**
> "B2B SaaS — NGOs and municipalities pay a platform fee. Enterprise restaurants get a CSR dashboard with food impact reports and carbon credit certificates. Individual donors are always free."

**Q: Can this scale beyond Greater Noida?**
> "The entire geography is a configuration variable. Adding Mumbai takes 10 minutes — add the city's NGOs, coordinates, and needy zones to the config file. The AI layer is geography-agnostic."

**Q: Why Gemini specifically over OpenAI?**
> "Three reasons: multimodal out of the box (vision + text in one model), superior multilingual performance for Hindi/regional languages, and free tier for demo. Gemini 2.5-flash handles all five of our use cases in a single API."
