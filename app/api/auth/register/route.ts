import { NextResponse }        from 'next/server'
import { randomUUID }          from 'crypto'
import { createUser, getUserByPhone } from '@/lib/auth/user-store'
import { createSession }       from '@/lib/auth/session-service'
import { registerNGOProfile }  from '@/lib/store'
import type {
  AuthUser,
  DonorSubtype,
  IndividualDonor,
  OrganizationDonor,
  VolunteerUser,
  NGOUser,
} from '@/lib/auth/types'

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/auth/register
// Completes registration after OTP has been verified.
// Body: { phoneNumber, role, subtype?, details: { ... } }
// ─────────────────────────────────────────────────────────────────────────────
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { phoneNumber, role, subtype, details } = body

    if (!phoneNumber || !role || !details) {
      return NextResponse.json(
        { success: false, message: 'phoneNumber, role, and details are required.' },
        { status: 400 },
      )
    }

    if (getUserByPhone(phoneNumber)) {
      return NextResponse.json(
        { success: false, message: 'This phone number is already registered.' },
        { status: 409 },
      )
    }

    const id    = randomUUID()
    let   user: AuthUser

    // ── Donor ────────────────────────────────────────────────────────────────
    if (role === 'donor') {
      const donorSubtype: DonorSubtype = subtype === 'organization' ? 'organization' : 'individual'

      if (donorSubtype === 'individual') {
        const { name, email, address } = details
        if (!name || !email || !address) {
          return NextResponse.json(
            { success: false, message: 'name, email, and address are required for individual donors.' },
            { status: 400 },
          )
        }
        const donor: IndividualDonor = {
          id, phoneNumber, email, role: 'donor', subtype: 'individual',
          name, address, verificationStatus: 'otp_verified', documents: [], createdAt: new Date(),
        }
        user = donor
      } else {
        const { organizationName, ownerName, email, address } = details
        if (!organizationName || !ownerName || !email || !address) {
          return NextResponse.json(
            { success: false, message: 'organizationName, ownerName, email, and address are required for organization donors.' },
            { status: 400 },
          )
        }
        const donor: OrganizationDonor = {
          id, phoneNumber, email, role: 'donor', subtype: 'organization',
          organizationName, ownerName, address,
          verificationStatus: 'otp_verified', documents: [], createdAt: new Date(),
        }
        user = donor
      }

    // ── Volunteer ────────────────────────────────────────────────────────────
    } else if (role === 'volunteer') {
      const { name, email, address } = details
      if (!name || !email || !address) {
        return NextResponse.json(
          { success: false, message: 'name, email, and address are required for volunteers.' },
          { status: 400 },
        )
      }
      const vol: VolunteerUser = {
        id, phoneNumber, email, role: 'volunteer',
        name, address, verificationStatus: 'otp_verified', documents: [], createdAt: new Date(),
      }
      user = vol

    // ── NGO ──────────────────────────────────────────────────────────────────
    } else if (role === 'ngo') {
      const { ngoName, address, contactPerson, email, estimatedVolunteers } = details
      if (!ngoName || !address || !contactPerson || !email) {
        return NextResponse.json(
          { success: false, message: 'ngoName, address, contactPerson, and email are required.' },
          { status: 400 },
        )
      }
      const ngo: NGOUser = {
        id, phoneNumber, email, role: 'ngo',
        ngoName, address, contactPerson,
        estimatedVolunteers: Number(estimatedVolunteers) || 0,
        verificationStatus: 'otp_verified', documents: [], createdAt: new Date(),
      }
      user = ngo

      // Register NGO in donation-matching pool
      registerNGOProfile({
        name:         ngoName,
        capacity:     Math.max(Number(estimatedVolunteers) * 5, 50),
        dietaryPref:  'any',
        hasVolunteer: true,
      })

    } else {
      return NextResponse.json(
        { success: false, message: `Unknown role: ${role}` },
        { status: 400 },
      )
    }

    createUser(user)
    const session = createSession(id, phoneNumber, role)

    return NextResponse.json({
      success: true,
      message: 'Registration successful. Welcome to GeminiGrain!',
      token:   session.token,
      user,
    })
  } catch (err) {
    console.error('[register]', err)
    return NextResponse.json(
      { success: false, message: 'Registration failed. Please try again.' },
      { status: 500 },
    )
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/auth/register?phoneNumber=XXXXXXXXXX
// Check if a phone number is already registered.
// ─────────────────────────────────────────────────────────────────────────────
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const phone = searchParams.get('phoneNumber')

    if (!phone) {
      return NextResponse.json(
        { success: false, message: 'phoneNumber query param is required.' },
        { status: 400 },
      )
    }

    const user = getUserByPhone(phone)
    return NextResponse.json({ success: true, exists: !!user, user: user ?? null })
  } catch {
    return NextResponse.json(
      { success: false, message: 'Lookup failed.' },
      { status: 500 },
    )
  }
}
