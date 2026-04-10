import { NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join }            from 'path'
import { randomUUID }     from 'crypto'
import { getUserByPhone, updateUser } from '@/lib/auth/user-store'
import type { VerifiedDocument, DocumentType } from '@/lib/auth/types'

const MAX_BYTES      = 5 * 1024 * 1024   // 5 MB
const ALLOWED_MIME   = new Set(['application/pdf', 'image/jpeg', 'image/png', 'image/webp'])
const UPLOAD_DIR     = join(process.cwd(), 'public', 'uploads')

const VALID_TYPES    = new Set<string>(['fssai', 'ngo_certificate'])

/**
 * POST /api/uploads
 * Multipart form upload for FSSAI and NGO Registration certificates.
 * Fields: file (File), type ('fssai' | 'ngo_certificate'), phoneNumber (string)
 */
export async function POST(req: Request) {
  try {
    const form        = await req.formData()
    const file        = form.get('file')        as File   | null
    const docType     = form.get('type')        as string | null
    const phoneNumber = form.get('phoneNumber') as string | null

    if (!file || !docType || !phoneNumber) {
      return NextResponse.json(
        { success: false, message: 'file, type, and phoneNumber are required.' },
        { status: 400 },
      )
    }

    if (!VALID_TYPES.has(docType)) {
      return NextResponse.json(
        { success: false, message: 'type must be "fssai" or "ngo_certificate".' },
        { status: 400 },
      )
    }

    if (!ALLOWED_MIME.has(file.type)) {
      return NextResponse.json(
        { success: false, message: 'Only PDF, JPEG, PNG, or WebP files are accepted.' },
        { status: 400 },
      )
    }

    if (file.size > MAX_BYTES) {
      return NextResponse.json(
        { success: false, message: 'File size must be under 5 MB.' },
        { status: 400 },
      )
    }

    // Store file
    await mkdir(UPLOAD_DIR, { recursive: true })
    const ext      = (file.name.split('.').pop() ?? 'bin').toLowerCase()
    const filename = `${docType}_${randomUUID()}.${ext}`
    const buffer   = Buffer.from(await file.arrayBuffer())
    await writeFile(join(UPLOAD_DIR, filename), buffer)
    const publicUrl = `/uploads/${filename}`

    // Update user document record
    const user = getUserByPhone(phoneNumber)
    if (user) {
      const doc: VerifiedDocument = {
        type:        docType as DocumentType,
        uploadedUrl: publicUrl,
        verifiedAt:  new Date(),
        status:      'pending',   // admin reviews in production
      }
      const filtered = user.documents.filter(d => d.type !== docType)
      updateUser(phoneNumber, { documents: [...filtered, doc] })
    }

    return NextResponse.json({
      success:  true,
      message:  'File uploaded successfully.',
      url:      publicUrl,
      filename,
    })
  } catch (err) {
    console.error('[uploads]', err)
    return NextResponse.json(
      { success: false, message: 'Upload failed. Please try again.' },
      { status: 500 },
    )
  }
}
