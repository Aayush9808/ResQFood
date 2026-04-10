import { NextResponse } from 'next/server'
import { sendOTP } from '@/lib/auth/otp-service'

const PHONE_RE = /^[6-9]\d{9}$/

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const phone: string = (body.phoneNumber ?? '').replace(/\s/g, '')

    if (!PHONE_RE.test(phone)) {
      return NextResponse.json(
        { success: false, message: 'Enter a valid 10-digit Indian mobile number.' },
        { status: 400 },
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
      message:  'OTP sent successfully.',
      demo_otp: result.otp,   // ← remove in production
    })
  } catch {
    return NextResponse.json(
      { success: false, message: 'Failed to send OTP. Please try again.' },
      { status: 500 },
    )
  }
}
