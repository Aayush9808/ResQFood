'use client'

import { Clock, Users, MapPin, CheckCircle, Truck, Brain, Leaf, AlertTriangle, Zap } from 'lucide-react'
import type { Donation } from '@/lib/types'

const URG_CLASS: Record<string, string> = {
  CRITICAL: 'urg urg-critical', HIGH: 'urg urg-high', MEDIUM: 'urg urg-medium', LOW: 'urg urg-low',
}
const STATUS_CLASS: Record<string, string> = {
  PENDING: 'status status-pending', MATCHED: 'status status-matched',
  IN_TRANSIT: 'status status-transit', DELIVERED: 'status status-delivered',
}
const STATUS_LABEL: Record<string, string> = {
  PENDING: 'Pending', MATCHED: 'NGO Matched', IN_TRANSIT: 'In Transit', DELIVERED: 'Delivered',
}
const URG_STRIPE: Record<string, string> = {
  CRITICAL: '#DC2626', HIGH: '#EA580C', MEDIUM: '#D97706', LOW: '#16A34A',
}

interface Props {
  donation: Donation
  showActions?: boolean
  onAccept?: (id: string) => void
  onSkip?:   (id: string) => void
}

export default function DonationCard({ donation, showActions, onAccept, onSkip }: Props) {
  return (
    <div className="card card-hover overflow-hidden transition-all">
      {/* Urgency stripe */}
      <div className="h-[3px]" style={{ background: URG_STRIPE[donation.urgency] }} />

      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold truncate" style={{ color: 'var(--th-text)' }}>{donation.foodName}</h3>
            <p className="text-xs mt-0.5" style={{ color: 'var(--th-text-3)' }}>{donation.donorName}</p>
          </div>
          <div className="flex gap-1.5 shrink-0 flex-wrap justify-end">
            <span className={URG_CLASS[donation.urgency]}>{donation.urgency}</span>
            <span className={STATUS_CLASS[donation.status]}>{STATUS_LABEL[donation.status]}</span>
          </div>
        </div>

        {/* Meta row */}
        <div className="flex flex-wrap gap-3 mb-3">
          {[
            { icon: Users,  val: `${donation.estimatedServings} serves` },
            { icon: Clock,  val: `${donation.spoilageWindowHours}h left` },
            { icon: MapPin, val: donation.location },
          ].map(({ icon: Icon, val }) => (
            <span key={val} className="flex items-center gap-1 text-xs" style={{ color: 'var(--th-text-3)' }}>
              <Icon className="w-3 h-3 shrink-0" />{val}
            </span>
          ))}
          <span className={`flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${
            donation.dietaryType === 'non-vegetarian' ? 'panel-red' : 'panel-green'
          }`} style={{ color: donation.dietaryType === 'non-vegetarian' ? 'var(--th-red-text)' : 'var(--th-green-text)' }}>
            <Leaf className="w-2.5 h-2.5" />
            {donation.dietaryType === 'non-vegetarian' ? 'Non-Veg' : donation.dietaryType === 'vegan' ? 'Vegan' : 'Veg'}
          </span>
        </div>

        {/* Urgency reason */}
        {donation.urgencyReason && (
          <div className="flex items-start gap-1.5 px-3 py-2 panel-amber mb-3 text-xs" style={{ color: 'var(--th-amber-text)' }}>
            <AlertTriangle className="w-3 h-3 shrink-0 mt-0.5" />
            {donation.urgencyReason.slice(0, 90)}{donation.urgencyReason.length > 90 ? '…' : ''}
          </div>
        )}

        {/* NGO match */}
        {donation.ngoMatch && (
          <div className="flex items-center justify-between px-3 py-2.5 panel-green mb-3">
            <div>
              <p className="text-xs font-semibold" style={{ color: 'var(--th-text)' }}>{donation.ngoMatch.name}</p>
              <p className="text-[11px] mt-0.5" style={{ color: 'var(--th-text-3)' }}>
                {donation.ngoMatch.distance} · {donation.ngoMatch.hasVolunteer ? 'Volunteer ready' : 'No volunteer yet'}
              </p>
            </div>
            {donation.ngoMatch.confidence && (
              <div className="text-lg font-black" style={{ color: 'var(--th-green-text)' }}>
                {donation.ngoMatch.confidence}%
              </div>
            )}
          </div>
        )}

        {/* Delivery banner */}
        {(donation.status === 'IN_TRANSIT' || donation.status === 'DELIVERED') && donation.volunteerName && (
          <div className="flex items-center gap-2 px-3 py-2 panel-orange mb-3 text-xs" style={{ color: 'var(--th-orange-text)' }}>
            <Truck className="w-3.5 h-3.5 shrink-0" />
            {donation.status === 'DELIVERED' ? 'Delivered by' : 'En route with'} {donation.volunteerName}
            {donation.status === 'DELIVERED' && <CheckCircle className="w-3.5 h-3.5 ml-auto" style={{ color: 'var(--th-green-text)' }} />}
          </div>
        )}

        {/* Language tag */}
        {donation.detectedLanguage && donation.detectedLanguage !== 'English' && (
          <div className="flex items-center gap-1.5 text-[10px] mb-3" style={{ color: 'var(--th-violet-text)' }}>
            <Brain className="w-3 h-3" /> {donation.detectedLanguage} · processed by Gemini AI
          </div>
        )}

        {/* Actions */}
        {showActions && donation.status === 'PENDING' && (
          <div className="flex gap-2 pt-1">
            <button onClick={() => onSkip?.(donation.id)} className="btn btn-secondary flex-1 text-xs py-2">
              Skip
            </button>
            <button onClick={() => onAccept?.(donation.id)} className="btn btn-primary flex-1 text-xs py-2">
              Accept Pickup
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
