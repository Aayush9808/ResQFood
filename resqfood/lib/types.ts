export type UrgencyLevel   = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
export type DonationStatus  = 'PENDING' | 'MATCHED' | 'IN_TRANSIT' | 'DELIVERED'
export type DietaryType     = 'vegetarian' | 'non-vegetarian' | 'vegan'
export type UserRole        = 'donor' | 'ngo' | 'volunteer'

export interface NGOProfile {
  id: string
  name: string
  distance: string
  distanceKm: number
  capacity: number
  dietaryPref: DietaryType | 'any'
  acceptanceRate: number   // 0-100
  hasVolunteer: boolean
  confidence?: number      // 0-100 – set by Gemini match
}

export interface Donation {
  id: string
  donorId: string
  donorName: string
  foodName: string
  quantity: string
  estimatedServings: number
  dietaryType: DietaryType
  urgency: UrgencyLevel
  spoilageWindowHours: number
  urgencyReason: string
  allergenFlags: string[]
  status: DonationStatus
  ngoMatch?: NGOProfile
  volunteerId?: string
  volunteerName?: string
  location: string
  rawInput: string
  detectedLanguage?: string
  createdAt: Date
  matchedAt?: Date
  deliveredAt?: Date
  geminiAnalysis?: GeminiAnalysis
}

export interface GeminiAnalysis {
  foodName: string
  quantity: string
  estimatedServings: number
  dietaryType: DietaryType
  urgencyLevel: UrgencyLevel
  spoilageWindowHours: number
  urgencyReason: string
  allergenFlags: string[]
  locationHint: string
  recommendedAction: string
  confidence: number
  detectedLanguage: string
}

export interface ImpactStats {
  totalDonations: number
  mealsRescued: number
  activeDonations: number
  deliveredToday: number
  co2AvoidedKg: number
  volunteersActive: number
}
