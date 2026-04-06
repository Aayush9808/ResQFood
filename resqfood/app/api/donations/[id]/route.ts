import { NextRequest, NextResponse } from 'next/server'
import { getDonationById, updateDonation } from '@/lib/store'
import type { DonationStatus } from '@/lib/types'

// ─── GET /api/donations/[id] ──────────────────────────────────────────────────

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } },
) {
  const donation = getDonationById(params.id)
  if (!donation) {
    return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 })
  }
  return NextResponse.json({ success: true, data: donation })
}

// ─── PATCH /api/donations/[id] ────────────────────────────────────────────────

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const body = (await req.json()) as {
      status?: DonationStatus
      volunteerName?: string
      volunteerId?: string
    }

    const updates: Record<string, unknown> = {}
    if (body.status)        updates.status        = body.status
    if (body.volunteerName) updates.volunteerName = body.volunteerName
    if (body.volunteerId)   updates.volunteerId   = body.volunteerId

    if (body.status === 'IN_TRANSIT') updates.matchedAt   = new Date()
    if (body.status === 'DELIVERED')  updates.deliveredAt = new Date()

    const updated = updateDonation(params.id, updates)
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 })
    }
    return NextResponse.json({ success: true, data: updated })
  } catch (err) {
    console.error('PATCH /api/donations/[id] error:', err)
    return NextResponse.json({ success: false, error: 'Update failed' }, { status: 500 })
  }
}
