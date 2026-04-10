import { NextResponse } from 'next/server'
import { verifyOTP }        from '@/lib/auth/otp-service'
import { getUserByPhone }    from '@/lib/auth/user-store'
import { createSession }     from '@/lib/auth/session-service'

export async function POST(req: Request) {
  try {
    const { phoneNumber, otp } = await req.json()

    if (!phoneNumber || !otp) {
      return NextResponse.json(
        { success: false, message: 'Phone number and OTP are required.' },
        { status: 400 },
      )
    }

    const result = verifyOTP(phoneNumber, String(otp))

    if (!result.ok) {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 400 },
      )
    }

    // Check if user already exists (login flow) vs new registration
    const existingUser = getUserByPhone(phoneNumber)

    if (existingUser) {
      const session = createSession(existingUser.id, phoneNumber, existingUser.role)
      return NextResponse.json({
        success:   true,
        message:   'OTP verified. Login successful.',
        token:     session.token,
        user:      existingUser,
        isNewUser: false,
      })
    }

    // New user — OTP verified, caller should proceed to /register
    return NextResponse.json({
      success:   true,
      message:   'OTP verified. Please complete registration.',
      phoneNumber,
      isNewUser: true,
    })
  } catch {
    return NextResponse.json(
      { success: false, message: 'Failed to verify OTP. Please try again.' },
      { status: 500 },
    )
  }
}
