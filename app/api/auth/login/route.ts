import { NextResponse } from 'next/server'
import { sendOTP } from '@/lib/auth/otp-service'
import { getUserByPhone } from '@/lib/auth/user-store'

const PHONE_RE = /^[6-9]\d{9}$/

/**
 * POST /api/auth/login
 * Step 1 of the phone+OTP login flow.
 * Verifies the account exists, then sends an OTP.
 * Step 2 (OTP verification + session creation) is handled by /api/auth/verify-otp
 */
export async function POST(req: Request) {
  try {
    const body  = await req.json()
    const phone: string = (body.phoneNumber ?? '').replace(/\s/g, '')

    if (!PHONE_RE.test(phone)) {
      return NextResponse.json(
        { success: false, message: 'Enter a valid 10-digit Indian mobile number.' },
        { status: 400 },
      )
    }

    const user = getUserByPhone(phone)
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'No account found for this number. Please register first.', notRegistered: true },
        { status: 404 },
      )
    }

    const result = sendOTP(phone)
    if (!result.sent) {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 429 },
      )
    }

    return NextResponse.json({
      success:  true,
      message:  'OTP sent to your mobile number.',
      role:     user.role,
      demo_otp: result.otp,   // ← remove in production
    })
  } catch {
    return NextResponse.json(
      { success: false, message: 'Login failed. Please try again.' },
      { status: 500 },
    )
  }
}
