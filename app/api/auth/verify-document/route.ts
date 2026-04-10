import { NextResponse } from 'next/server'
import { verifyDocument } from '@/lib/auth/verification-service'
import { getUserByPhone, updateUser } from '@/lib/auth/user-store'
import type { VerifiedDocument } from '@/lib/auth/types'

/**
 * POST /api/auth/verify-document
 * Demo Aadhaar / PAN verification.
 * Body: { phoneNumber, type: 'aadhaar' | 'pan', value: string }
 */
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { phoneNumber, type, value } = body

    if (!phoneNumber || !type || !value) {
      return NextResponse.json(
        { success: false, message: 'phoneNumber, type, and value are required.' },
        { status: 400 },
      )
    }

    if (type !== 'aadhaar' && type !== 'pan') {
      return NextResponse.json(
        { success: false, message: 'type must be "aadhaar" or "pan".' },
        { status: 400 },
      )
    }

    const result = verifyDocument(type, value)

    if (result.success) {
      const user = getUserByPhone(phoneNumber)
      if (user) {
        const doc: VerifiedDocument = {
          type,
          maskedValue: result.maskedValue,
          verifiedAt:  new Date(),
          status:      'verified',
        }
        // Avoid duplicate entries for the same document type
        const filtered = user.documents.filter(d => d.type !== type)
        updateUser(phoneNumber, {
          documents:          [...filtered, doc],
          verificationStatus: 'document_verified',
        })
      }
    }

    return NextResponse.json({
      success:     result.success,
      message:     result.message,
      maskedValue: result.maskedValue,
    })
  } catch {
    return NextResponse.json(
      { success: false, message: 'Verification failed. Please try again.' },
      { status: 500 },
    )
  }
}
