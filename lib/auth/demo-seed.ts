/**
 * demo-seed.ts
 * Pre-seeds demo users for all 3 roles into the in-memory store.
 * This module runs its seeding logic on first import.
 * Import this module in any API route that needs demo data to exist.
 */

import { createUser, userExistsByPhone } from './user-store'
import { addDonation, getDonationById }  from '../store'
import type {
  IndividualDonor,
  NGOUser,
  VolunteerUser,
} from './types'
import type { Donation } from '../types'

// ── Stable demo identifiers ───────────────────────────────────────────────────

export const DEMO_PHONES: Record<string, string> = {
  donor:     '9876543210',
  ngo:       '9876543211',
  volunteer: '9876543212',
}

export const DEMO_IDS = {
  donor:     'demo-donor-001',
  ngo:       'demo-ngo-001',
  volunteer: 'demo-volunteer-001',
}

// ── User seeding ──────────────────────────────────────────────────────────────

function seedUsers() {
  if (!userExistsByPhone(DEMO_PHONES.donor)) {
    const donor: IndividualDonor = {
      id:                 DEMO_IDS.donor,
      phoneNumber:        DEMO_PHONES.donor,
      email:              'donor@demo.geminigrain.app',
      role:               'donor',
      subtype:            'individual',
      name:               'Ravi Sharma',
      address:            'Sector 15, Noida, Uttar Pradesh',
      verificationStatus: 'otp_verified',
      documents:          [],
      createdAt:          new Date('2024-01-15'),
    }
    createUser(donor)
  }

  if (!userExistsByPhone(DEMO_PHONES.ngo)) {
    const ngo: NGOUser = {
      id:                  DEMO_IDS.ngo,
      phoneNumber:         DEMO_PHONES.ngo,
      email:               'ngo@demo.geminigrain.app',
      role:                'ngo',
      ngoName:             'Roti Bank Delhi',
      address:             'Connaught Place, New Delhi, 110001',
      contactPerson:       'Sunita Rao',
      estimatedVolunteers: 12,
      verificationStatus:  'otp_verified',
      documents:           [],
      createdAt:           new Date('2024-01-10'),
    }
    createUser(ngo)
  }

  if (!userExistsByPhone(DEMO_PHONES.volunteer)) {
    const volunteer: VolunteerUser = {
      id:                 DEMO_IDS.volunteer,
      phoneNumber:        DEMO_PHONES.volunteer,
      email:              'volunteer@demo.geminigrain.app',
      role:               'volunteer',
      name:               'Priya Iyer',
      address:            'Lajpat Nagar, New Delhi, 110024',
      verificationStatus: 'otp_verified',
      documents:          [],
      createdAt:          new Date('2024-01-12'),
    }
    createUser(volunteer)
  }
}

// ── Donation seeding (for demo donor dashboard) ───────────────────────────────

function addIfNotExists(d: Donation) {
  if (!getDonationById(d.id)) addDonation(d)
}

function seedDonations() {
  addIfNotExists({
    id:                  'demo-donation-001',
    donorId:             DEMO_IDS.donor,
    donorName:           'Ravi Sharma',
    foodName:            'Paneer Butter Masala + Naan',
    quantity:            '25 plates (~6 kg)',
    estimatedServings:   25,
    dietaryType:         'vegetarian',
    urgency:             'MEDIUM',
    spoilageWindowHours: 5,
    urgencyReason:       'Leftover from family puja ceremony',
    allergenFlags:       ['dairy'],
    status:              'COMPLETED',
    ngoMatch:            { id: 'ngo-1', name: 'Roti Bank Delhi', distance: '2.3 km', distanceKm: 2.3, capacity: 60, dietaryPref: 'any', acceptanceRate: 96, hasVolunteer: true, confidence: 93 },
    volunteerName:       'Priya Iyer',
    location:            'Sector 15, Noida',
    rawInput:            '25 plate paneer naan bacha hai puja ke baad',
    detectedLanguage:    'Hindi',
    createdAt:           new Date(Date.now() - 86_400_000 * 4),
    matchedAt:           new Date(Date.now() - 86_400_000 * 4 + 1_800_000),
    deliveredAt:         new Date(Date.now() - 86_400_000 * 4 + 5_400_000),
  })

  addIfNotExists({
    id:                  'demo-donation-002',
    donorId:             DEMO_IDS.donor,
    donorName:           'Ravi Sharma',
    foodName:            'Veg Biryani + Raita',
    quantity:            '40 portions (~10 kg)',
    estimatedServings:   40,
    dietaryType:         'vegetarian',
    urgency:             'HIGH',
    spoilageWindowHours: 3,
    urgencyReason:       'Office canteen surplus — must be picked up today',
    allergenFlags:       ['dairy'],
    status:              'COMPLETED',
    ngoMatch:            { id: 'ngo-2', name: 'Asha Foundation', distance: '3.1 km', distanceKm: 3.1, capacity: 40, dietaryPref: 'vegetarian', acceptanceRate: 91, hasVolunteer: true, confidence: 89 },
    volunteerName:       'Amit Dubey',
    location:            'Sector 15, Noida',
    rawInput:            '40 serving biryani ready at office cafeteria',
    detectedLanguage:    'English',
    createdAt:           new Date(Date.now() - 86_400_000 * 2),
    matchedAt:           new Date(Date.now() - 86_400_000 * 2 + 900_000),
    deliveredAt:         new Date(Date.now() - 86_400_000 * 2 + 3_600_000),
  })

  addIfNotExists({
    id:                  'demo-donation-003',
    donorId:             DEMO_IDS.donor,
    donorName:           'Ravi Sharma',
    foodName:            'Dal Makhani + Chapati',
    quantity:            '18 plates (~4 kg)',
    estimatedServings:   18,
    dietaryType:         'vegetarian',
    urgency:             'MEDIUM',
    spoilageWindowHours: 6,
    urgencyReason:       'Guest dinner surplus — 2 guests cancelled last minute',
    allergenFlags:       ['dairy'],
    status:              'IN_TRANSIT',
    ngoMatch:            { id: 'ngo-1', name: 'Roti Bank Delhi', distance: '2.3 km', distanceKm: 2.3, capacity: 60, dietaryPref: 'any', acceptanceRate: 96, hasVolunteer: true, confidence: 91 },
    volunteerName:       'Priya Iyer',
    location:            'Sector 15, Noida',
    rawInput:            'Dal chapati for 18 people — please collect',
    detectedLanguage:    'English',
    createdAt:           new Date(Date.now() - 1_800_000),
    matchedAt:           new Date(Date.now() - 1_200_000),
  })
}

// ── Auto-run on import ────────────────────────────────────────────────────────

seedUsers()
seedDonations()
