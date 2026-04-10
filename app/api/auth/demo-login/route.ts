import { NextResponse }    from 'next/server'
import '@/lib/auth/demo-seed'           // ensure demo users + donations are seeded
import { getUserByPhone }  from '@/lib/auth/user-store'
import { createSession }   from '@/lib/auth/session-service'
import { DEMO_PHONES }     from '@/lib/auth/demo-seed'
import type { UserRole }   from '@/lib/auth/types'

const VALID_ROLES: UserRole[] = ['donor', 'ngo', 'volunteer']

/**
 * POST /api/auth/demo-login
 * Body: { role: 'donor' | 'ngo' | 'volunteer' }
 *
 * Returns a fully authenticated session for one-click judge/demo access.
 * No OTP required. Uses pre-seeded demo accounts.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const role  = body?.role as UserRole

    if (!VALID_ROLES.includes(role)) {
      return NextResponse.json(
        { success: false, message: 'Invalid role. Choose donor, ngo, or volunteer.' },
        { status: 400 },
      )
    }

    const phone = DEMO_PHONES[role]
    const user  = getUserByPhone(phone)

    if (!user) {
      // Should never happen — demo-seed runs on import above
      return NextResponse.json(
        { success: false, message: 'Demo user could not be initialised. Please try again.' },
        { status: 500 },
      )
    }

    const session = createSession(user.id, phone, user.role)

    return NextResponse.json({
      success: true,
      token:   session.token,
      user,
    })
  } catch {
    return NextResponse.json(
      { success: false, message: 'Demo login failed. Please try again.' },
      { status: 500 },
    )
  }
}
