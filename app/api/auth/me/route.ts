import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth/session-service'
import { getUserById } from '@/lib/auth/user-store'

/**
 * GET /api/auth/me
 * Returns the currently logged-in user from the session token.
 * Header: Authorization: Bearer <token>
 */
export async function GET(req: Request) {
  const authHeader = req.headers.get('authorization') ?? ''
  const token      = authHeader.replace(/^Bearer\s+/i, '').trim()

  if (!token) {
    return NextResponse.json(
      { success: false, message: 'Authorization token required.' },
      { status: 401 },
    )
  }

  const session = getSession(token)
  if (!session) {
    return NextResponse.json(
      { success: false, message: 'Session expired or invalid. Please log in again.' },
      { status: 401 },
    )
  }

  const user = getUserById(session.userId)
  if (!user) {
    return NextResponse.json(
      { success: false, message: 'User account not found.' },
      { status: 404 },
    )
  }

  return NextResponse.json({ success: true, user })
}
