import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import { getAllDonations, addDonation, matchNGO } from '@/lib/store'
import type { Donation, GeminiAnalysis } from '@/lib/types'

// ─── GET /api/donations ───────────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status')
  const donorId = searchParams.get('donorId')

  let list = getAllDonations()
  if (status)  list = list.filter((d) => d.status === status)
  if (donorId) list = list.filter((d) => d.donorId === donorId)

  return NextResponse.json({ success: true, data: list, total: list.length })
}

// ─── POST /api/donations ──────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      donorId: string
      donorName: string
      location: string
      rawInput: string
      analysis: GeminiAnalysis
    }

    const { donorId, donorName, location, rawInput, analysis } = body

    if (!donorId || !donorName || !analysis) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 })
    }

    // Find best NGO for this donation
    const candidates = matchNGO(analysis.dietaryType, analysis.estimatedServings)
    const bestNGO    = candidates[0] ?? null

    const donation: Donation = {
      id:                   uuidv4(),
      donorId,
      donorName,
      foodName:             analysis.foodName,
      quantity:             analysis.quantity,
      estimatedServings:    analysis.estimatedServings,
      dietaryType:          analysis.dietaryType,
      urgency:              analysis.urgencyLevel,
      spoilageWindowHours:  analysis.spoilageWindowHours,
      urgencyReason:        analysis.urgencyReason,
      allergenFlags:        analysis.allergenFlags,
      status:               bestNGO ? 'MATCHED' : 'PENDING',
      ngoMatch:             bestNGO ?? undefined,
      location:             location || 'Location not specified',
      rawInput,
      detectedLanguage:     analysis.detectedLanguage,
      geminiAnalysis:       analysis,
      createdAt:            new Date(),
      matchedAt:            bestNGO ? new Date() : undefined,
    }

    addDonation(donation)
    return NextResponse.json({ success: true, data: donation }, { status: 201 })
  } catch (err) {
    console.error('POST /api/donations error:', err)
    return NextResponse.json({ success: false, error: 'Failed to create donation' }, { status: 500 })
  }
}
