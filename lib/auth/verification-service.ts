import type { DocumentVerificationResult } from './types'

// ─────────────────────────────────────────────────────────────────────────────
// Demo verification service
// Simulates Aadhaar / PAN verification responses.
// In production: replace with UIDAI sandbox or Income Tax Dept API.
// ─────────────────────────────────────────────────────────────────────────────

function maskAadhaar(digits: string): string {
  return `XXXX-XXXX-${digits.slice(-4)}`
}

function maskPAN(pan: string): string {
  const u = pan.toUpperCase()
  return `${u.slice(0, 2)}XXXXX${u.slice(-2)}`
}

function validateAadhaar(value: string): boolean {
  const digits = value.replace(/[\s-]/g, '')
  return /^\d{12}$/.test(digits)
}

function validatePAN(value: string): boolean {
  return /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(value.toUpperCase())
}

export function verifyDocument(
  type: 'aadhaar' | 'pan',
  rawValue: string,
): DocumentVerificationResult {
  if (type === 'aadhaar') {
    const digits = rawValue.replace(/[\s-]/g, '')
    if (!validateAadhaar(digits)) {
      return {
        success:      false,
        documentType: 'aadhaar',
        maskedValue:  maskAadhaar(digits.padEnd(12, '0')),
        message:      'Invalid Aadhaar number. Must be exactly 12 digits.',
      }
    }
    // Demo: ~95% success
    const verified = Math.random() > 0.05
    return {
      success:      verified,
      documentType: 'aadhaar',
      maskedValue:  maskAadhaar(digits),
      message:      verified
        ? 'Aadhaar verified successfully. ✓ (Demo Mode)'
        : 'Aadhaar verification failed. Please retry.',
    }
  }

  if (type === 'pan') {
    const upper = rawValue.toUpperCase().trim()
    if (!validatePAN(upper)) {
      return {
        success:      false,
        documentType: 'pan',
        maskedValue:  maskPAN(upper.padEnd(10, 'X')),
        message:      'Invalid PAN format. Expected format: ABCDE1234F',
      }
    }
    const verified = Math.random() > 0.05
    return {
      success:      verified,
      documentType: 'pan',
      maskedValue:  maskPAN(upper),
      message:      verified
        ? 'PAN verified successfully. ✓ (Demo Mode)'
        : 'PAN verification failed. Please retry.',
    }
  }

  return {
    success:      false,
    documentType: type,
    maskedValue:  '',
    message:      'Unsupported document type.',
  }
}
