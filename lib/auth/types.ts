// ─────────────────────────────────────────────────────────────────────────────
// GeminiGrain Auth Types
// Single source of truth for all authentication + user models
// ─────────────────────────────────────────────────────────────────────────────

export type UserRole     = 'donor' | 'volunteer' | 'ngo'
export type DonorSubtype = 'individual' | 'organization'
export type DocumentType = 'aadhaar' | 'pan' | 'fssai' | 'ngo_certificate'

export type VerificationStatus =
  | 'unverified'
  | 'otp_verified'
  | 'document_verified'
  | 'fully_verified'

// ── Documents ─────────────────────────────────────────────────────────────────

export interface VerifiedDocument {
  type: DocumentType
  maskedValue?: string        // e.g. "XXXX-XXXX-5678" for Aadhaar
  uploadedUrl?: string        // for file uploads (FSSAI / NGO cert)
  verifiedAt: Date
  status: 'pending' | 'verified' | 'rejected'
}

// ── User models ───────────────────────────────────────────────────────────────

interface BaseUser {
  id:                 string
  phoneNumber:        string
  email:              string
  role:               UserRole
  verificationStatus: VerificationStatus
  documents:          VerifiedDocument[]
  createdAt:          Date
}

export interface IndividualDonor extends BaseUser {
  role:    'donor'
  subtype: 'individual'
  name:    string
  address: string
}

export interface OrganizationDonor extends BaseUser {
  role:             'donor'
  subtype:          'organization'
  organizationName: string
  ownerName:        string
  address:          string
}

export type DonorUser = IndividualDonor | OrganizationDonor

export interface VolunteerUser extends BaseUser {
  role:    'volunteer'
  name:    string
  address: string
}

export interface NGOUser extends BaseUser {
  role:               'ngo'
  ngoName:            string
  address:            string
  contactPerson:      string
  estimatedVolunteers: number
}

export type AuthUser = DonorUser | VolunteerUser | NGOUser

// ── OTP ───────────────────────────────────────────────────────────────────────

export interface OTPRecord {
  phoneNumber:    string
  otp:            string
  createdAt:      number   // Date.now()
  expiresAt:      number
  attempts:       number
  maxAttempts:    number
  lastRequestAt:  number   // for 1-per-minute rate limit
}

// ── Session ───────────────────────────────────────────────────────────────────

export interface Session {
  token:       string
  userId:      string
  phoneNumber: string
  role:        UserRole
  createdAt:   number
  expiresAt:   number
}

// ── Verification ──────────────────────────────────────────────────────────────

export interface DocumentVerificationResult {
  success:      boolean
  documentType: DocumentType
  maskedValue:  string
  message:      string
}
