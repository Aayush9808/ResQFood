<div align="center">

# 🍱 ResQFood

### *"Every plate saved is a life changed."*

**Rescuing surplus food with AI. Delivering hope in real-time.**

---

[![Hackathon](https://img.shields.io/badge/HackDays%202026-GCET-blue?style=for-the-badge)](https://unstop.com)
[![Theme](https://img.shields.io/badge/Theme-Best%20Use%20of%20Gemini%20API-green?style=for-the-badge)](https://ai.google.dev)
[![Powered by](https://img.shields.io/badge/Powered%20by-Google%20Gemini-orange?style=for-the-badge)](https://ai.google.dev)
[![MLH](https://img.shields.io/badge/In%20collaboration%20with-MLH-red?style=for-the-badge)](https://mlh.io)

</div>

---

## 🌍 The Reality We Can't Ignore

> **1.3 billion tonnes** of food is wasted globally every year.  
> **80 crore people** go to bed hungry every night.  
> **India alone** wastes food worth **₹92,000 crore annually** — enough to feed every hungry child in the country.

The tragedy? **The food exists. The people exist. The bridge doesn't.**

Hotels serve last-minute buffets. Corporate events over-order. Hostels cook excess. And by the time someone thinks to donate — it's too late, logistics fail, and perfectly edible food ends up in a landfill.

**ResQFood is that bridge.**

---

## ❗ Problem Statement

### Why Current Solutions Fail

| Gap | Reality |
|-----|---------|
| **No Real-Time Matching** | NGOs don't know what's available or where |
| **Manual Coordination** | WhatsApp groups, phone calls — slow and unreliable |
| **Food Spoilage** | No urgency detection means food rots before pickup |
| **Volunteer Friction** | No smart routing; volunteers waste time and fuel |
| **Language Barriers** | Donors (cooks, hostel staff) aren't always English-fluent |
| **Data Blindness** | No insights to prevent over-cooking or over-ordering |

> Existing apps like "No Food Waste" or "Too Good To Go" are either region-locked, paid, or lack the intelligence to coordinate at the speed food spoilage demands.

**The window to save food is often under 2 hours. Every second of coordination delay is food in the bin.**

---

## 💡 Solution: ResQFood

**ResQFood** is an AI-powered food rescue platform that:

1. **Accepts food listings from donors** via text, voice, or image
2. **Uses Gemini API** to extract structured food data and predict spoilage urgency
3. **Intelligently matches** the food to the most suitable NGO based on distance, need, and capacity
4. **Dispatches volunteers** with optimized routes and real-time updates

> Think of it as **Swiggy for surplus food** — but powered by Gemini, built for impact, and completely free for NGOs and donors.

---

## 🧠 The Gemini API — The Brain of ResQFood

> This isn't "we added a chatbot." Gemini is the **core reasoning engine** that makes ResQFood work where every other solution fails.

### 1. 🗣️ Multimodal Food Intake (Text + Voice + Image)

A hotel cook finishing a night shift doesn't want to fill forms. They speak in Hindi, snap a photo of leftover biryani, and that's it.

**Gemini handles all three inputs simultaneously:**

```
Input (Voice - Hindi): "Aaj raat 40 plates biryani bachi hai, kal tak kharab ho jayegi"
Input (Image): [Photo of food containers]

Gemini Output (Structured JSON):
{
  "food_type": "Biryani",
  "quantity": "40 plates (~8kg estimated)",
  "language_detected": "Hindi",
  "location_hint": "night shift suggests dinner leftovers",
  "spoilage_window": "14-16 hours",
  "urgency": "HIGH",
  "dietary_tags": ["non-vegetarian", "rice-based"],
  "allergen_flags": ["possible nuts"]
}
```

**Why Gemini?** No other API handles noisy multilingual voice + image context simultaneously with this reasoning quality.

---

### 2. ⏱️ Intelligent Spoilage Urgency Prediction

Gemini doesn't just read food data — it **reasons** about it.

```
Context given to Gemini:
- Food: Paneer Curry
- Current temperature: 28°C (from device sensor)
- Time since cooked: 3 hours
- Storage: No refrigeration
- Season: Summer

Gemini Reasoning:
"Dairy-based curry in 28°C ambient heat with no refrigeration 
degrades rapidly. Safe consumption window: ~3-4 hours. 
Urgency: CRITICAL. Recommend dispatch within 45 minutes."
```

This is **contextual judgment**, not just a lookup table — something only a large reasoning model like Gemini can provide.

---

### 3. 🎯 Smart NGO Matching Engine

Traditional matching = nearest NGO. **ResQFood's matching = smartest NGO.**

Gemini weighs multiple real-world factors:

```
Factors analyzed:
- Distance (< 5km preferred)
- NGO's current meal capacity (from their last update)
- Food type alignment (some NGOs serve only vegetarian)
- Volunteer availability at that NGO
- Historical acceptance rate of this donor
- Time-sensitivity of the food

Gemini Decision Output:
"Recommend: Roti Bank (2.3km) — serves non-veg, 
has volunteer on standby, historically accepts biryani,
can serve 45+ people. Confidence: 94%"
```

---

### 4. 🌐 Real-Time Multilingual Support

India has 22 official languages. Donors speak Kannada, Tamil, Bengali, Marathi. Gemini processes them all natively — no translation middleware, no data loss.

**This removes the single biggest barrier to food donation in Tier 2/3 cities.**

---

### 5. 📊 Weekly AI Insights for Donors

Gemini analyzes donation patterns to help reduce waste at the source:

> *"Your hostel wastes most food on Mondays after morning assembly. Consider reducing dal preparation by ~20% on those days."*

This transforms ResQFood from a rescue app to a **waste prevention system**.

---

## ⚙️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         DONOR (Restaurant / Hostel / Event)     │
│           [Text Input]   [Voice Input]   [Image Upload]         │
└──────────────────────────────┬──────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                   GEMINI API — Intake Layer                     │
│  • Multimodal parsing (text + speech + vision)                  │
│  • Language detection & translation                             │
│  • Structured food data extraction                              │
│  • Initial spoilage estimate                                    │
└──────────────────────────────┬──────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                   GEMINI API — Intelligence Layer               │
│  • Spoilage urgency prediction (contextual reasoning)           │
│  • NGO matching (multi-factor decision making)                  │
│  • Route optimization recommendation for volunteers             │
│  • Priority queue generation                                    │
└──────────────────────────────┬──────────────────────────────────┘
                               │
              ┌────────────────┼────────────────┐
              ▼                ▼                ▼
     ┌─────────────┐  ┌──────────────┐  ┌─────────────────┐
     │  NGO PORTAL │  │  VOLUNTEER   │  │  DONOR DASHBOARD│
     │  Dashboard  │  │  Mobile App  │  │  + AI Insights  │
     └─────────────┘  └──────────────┘  └─────────────────┘
              │                │                │
              └────────────────┴────────────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │  REAL-TIME DELIVERY │
                    │  Food Rescued ✅    │
                    └─────────────────────┘
```

---

## 🎬 Demo Flow

> *Walk through a real scenario in under 3 minutes.*

**Scenario: Mehul's Dhaba has 30 extra plates of food after a wedding event.**

---

**Step 1 — Donor lists surplus food** *(30 seconds)*
```
Mehul opens ResQFood app → clicks "Donate Food"
Speaks (in Hindi): "30 plate rajma chawal, hotel ke bahar ready hai"
→ Gemini transcribes, translates, extracts structured data
→ Urgency: HIGH (4-hour window)
```

**Step 2 — AI analyzes and matches** *(2 seconds)*
```
Gemini evaluates:
→ 3 NGOs within 5km
→ "Asha Foundation" matched (vegetarian-compatible, 40-person capacity, volunteer available)
→ Confidence: 91%
```

**Step 3 — NGO receives alert** *(instant)*
```
Asha Foundation gets push notification:
"30 plates Rajma Chawal available at Mehul's Dhaba — 3.1km away.
Spoilage window: 4 hours. Accept / Decline"
→ NGO coordinator taps ACCEPT
```

**Step 4 — Volunteer dispatched** *(under 3 minutes)*
```
Nearest volunteer (Priya, 1.2km away) gets GPS-routed pickup task
→ She picks up → delivers → marks complete
→ Donor gets: "30 plates served to ~45 people. Thank you!"
```

**Step 5 — Impact logged** *(automated)*
```
Platform records:
→ 30 meals saved | 45 people fed | 6kg CO₂ offset
→ Donor streak updated: "7 donations this month 🏅"
```

---

## 🎯 Key Features

| Feature | What Makes It Special |
|---|---|
| **Voice-First Donation** | Donors can list food by just speaking — no forms, no friction |
| **Multilingual (20+ languages)** | Gemini handles Hindi, Tamil, Kannada, Bengali natively |
| **Spoilage Clock** | Every listing shows a live countdown to unsafe consumption |
| **Smart NGO Matching** | Gemini weighs 6+ factors — not just distance |
| **Volunteer GPS Routing** | Optimized pickup paths to minimize food travel time |
| **Donor Insights** | Weekly AI report: "You wasted 20% less this month" |
| **Impact Dashboard** | Live stats: meals saved, people fed, CO₂ offset |
| **NGO Capacity Tracker** | NGOs update capacity; Gemini avoids over-dispatching |
| **Gamification for Donors** | Streaks, badges, leaderboards to build habit |
| **Offline-Resilient** | Critical actions work on low connectivity (2G) |

---

## 🌍 Real-World Impact

### Who Benefits

```
🍽️  DONORS          — Restaurants, hotels, hostels, event managers
     ↳ Reduce waste guilt, get impact reports, build CSR credentials

🏠  NGOs             — Orphanages, old-age homes, shelters, community kitchens  
     ↳ Get free, quality food without cold-calling or searching

🚴  VOLUNTEERS       — Students, delivery partners, local heroes
     ↳ Earn recognition, certificates, referral letters

🌱  ENVIRONMENT      — Every rescued meal = fewer landfill emissions
     ↳ Estimated 2.5kg CO₂ saved per food rescue event
```

### The Numbers That Matter

- India has **7.5 lakh registered NGOs** — largely underfed
- **40% of food** produced in India is wasted before consumption
- **28% of children** under 5 in India are underweight
- With even **1% of restaurant surplus** rescued daily across Delhi NCR = **2 lakh meals/month**

---

## 🧩 Innovation & Differentiation

> *Why ResQFood wins where others fail.*

**vs. WhatsApp coordination groups:**
- Unstructured, slow, no matching intelligence, no spoilage awareness

**vs. "Too Good To Go":**
- Paid model, commercial focus, no NGO pipeline, not multilingual

**vs. Generic food banks:**
- Manual intake process, no real-time matching, no AI urgency detection

### What Makes ResQFood Unique

1. **Gemini is the coordinator** — not just a feature, but the operational core
2. **Voice-first, language-agnostic** — works for a Tamil cook and a Bengali volunteer alike
3. **Spoilage urgency as a first-class feature** — most apps ignore time-sensitivity entirely
4. **Closes the loop** — donor → AI → NGO → volunteer → impact report, all automated
5. **Designed for India's reality** — low-end devices, 2G networks, language diversity

---

## 🔮 Future Scope

### Phase 2 — Scale Within India (6 months)
- Partner with **Zomato & Swiggy** for restaurant surplus data
- Integrate with **FSSAI** food safety API for compliance
- Launch **WhatsApp Bot** for donors who don't install apps

### Phase 3 — Predictive Surplus (12 months)
- Gemini analyzes historical data → **predicts surplus before it happens**
- Hotels get alerts: *"Your Sunday brunch typically yields 40+ extra plates. Pre-schedule a pickup?"*
- Reduces emergency last-minute scrambles

### Phase 4 — Government Integration (18 months)
- API for **Municipal Corporations** to track city-wide food waste
- Integration with **PM Poshan scheme** for school meal optimization
- **Carbon credit generation** for large donors (sustainability incentive)

### Phase 5 — Global Expansion
- Multilingual support already built in — deploy in Southeast Asia, Africa, Middle East
- White-label for **UN World Food Programme** regional programs
- Franchise model for city-level ResQFood coordinators

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **AI Core** | Google Gemini 1.5 Pro (multimodal: text, voice, vision) |
| **Frontend** | React Native (iOS + Android) + Next.js (Web Dashboard) |
| **Backend** | Node.js + Express / FastAPI |
| **Database** | Firebase Realtime DB + PostgreSQL |
| **Maps & Routing** | Google Maps API + Distance Matrix API |
| **Auth** | Firebase Auth (OTP-based for low-tech users) |
| **Push Notifications** | Firebase Cloud Messaging |
| **Hosting** | Google Cloud Platform |
| **Storage** | Firebase Storage (food images) |

---

## 📸 Screenshots & Demo

> *[Replace placeholders below with actual screenshots from your prototype]*

| Screen | Description |
|---|---|
| `screenshots/01_home.png` | Landing screen with "Donate Food" CTA |
| `screenshots/02_voice_input.png` | Voice recording interface with live Gemini transcription |
| `screenshots/03_food_listing.png` | AI-extracted food card with spoilage timer |
| `screenshots/04_ngo_match.png` | Smart matching result with Gemini reasoning |
| `screenshots/05_volunteer_map.png` | Volunteer GPS routing screen |
| `screenshots/06_impact_dashboard.png` | Donor's monthly impact report by Gemini |

---

## 👥 Team

> Built with purpose at **HackDays 2026** — GCET × HackBase × MLH

| Name | Role |
|---|---|
| Aayush Kumar Shrivastav | Team Lead / Full Stack + AI Integration |
| *(Teammate 2)* | *(Role)* |
| *(Teammate 3)* | *(Role)* |
| *(Teammate 4)* | *(Role)* |

---

## 🧪 Setup & Run Locally

```bash
# Clone the repository
git clone https://github.com/Aayush9808/Galgotiya_Hackathon.git
cd Galgotiya_Hackathon

# Install dependencies
npm install

# Add your environment variables
cp .env.example .env
# → Add your GEMINI_API_KEY, Firebase config, Google Maps API key

# Run development server
npm run dev
```

---

## 🌐 Live Demo

> 🔗 **[Try the Prototype →](#)** *(Link to be added)*  
> 📊 **[View Presentation →](#)** *(PPT link to be added)*  
> 🎥 **[Watch Demo Video →](#)** *(Demo video link to be added)*

---

<div align="center">

---

**"We don't have a food shortage. We have a coordination shortage."**

**ResQFood fixes the coordination. Gemini makes it intelligent. Together, we fix hunger.**

---

*Built with ❤️ for HackDays 2026 | GCET × HackBase × MLH*

[![GitHub](https://img.shields.io/badge/GitHub-Aayush9808-black?style=flat-square&logo=github)](https://github.com/Aayush9808)

</div>
