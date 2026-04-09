'use client'

import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

export const DONOR_COORD: [number, number] = [28.6448, 77.2167]

export const NGO_LOCATIONS = [
  { id: 'ngo-1', name: 'Roti Bank Delhi',         lat: 28.6519, lng: 77.2315, dist: '2.3 km', cap: 150 },
  { id: 'ngo-2', name: 'Food For All Foundation', lat: 28.5672, lng: 77.2100, dist: '5.1 km', cap: 200 },
  { id: 'ngo-3', name: 'Akshaya Patra Delhi',     lat: 28.6304, lng: 77.2177, dist: '1.8 km', cap: 300 },
  { id: 'ngo-4', name: 'Annapurna Trust',         lat: 28.7041, lng: 77.1025, dist: '8.2 km', cap: 100 },
]

const TILE_LIGHT = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
const TILE_DARK  = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
const TILE_ATTR  = '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>'

interface Props {
  selectedNGOId?: string | null
  analyzing?: boolean
}

function donorIcon() {
  return L.divIcon({
    html: `<div style="position:relative;width:48px;height:48px;display:flex;align-items:center;justify-content:center;">
      <div style="position:absolute;inset:-6px;border-radius:50%;background:#3B82F622;animation:map-ping 2s infinite;"></div>
      <div style="width:44px;height:44px;background:#3B82F6;border-radius:50%;border:3px solid white;
        box-shadow:0 4px 12px #3B82F644;display:flex;align-items:center;justify-content:center;font-size:18px;position:relative;z-index:1;">🏠</div>
    </div>`,
    className: '', iconSize: [48,48], iconAnchor: [24,24], popupAnchor: [0,-24],
  })
}

function ngoIcon(selected: boolean) {
  const color = selected ? '#EA580C' : '#16A34A'
  const size  = selected ? 48 : 38
  const pulse = selected
    ? `<div style="position:absolute;inset:-8px;border-radius:50%;background:${color}22;animation:map-ping 1.5s infinite;"></div>` : ''
  return L.divIcon({
    html: `<div style="position:relative;width:${size+16}px;height:${size+16}px;display:flex;align-items:center;justify-content:center;">
      ${pulse}
      <div style="width:${size}px;height:${size}px;background:${color};border-radius:50% 50% 50% 0;transform:rotate(-45deg);
        border:3px solid white;box-shadow:0 4px 14px ${color}55;position:relative;z-index:1;">
        <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;transform:rotate(45deg);font-size:${selected?'18':'14'}px;">🏥</div>
      </div>
    </div>`,
    className: '', iconSize: [size+16,size+16], iconAnchor: [(size+16)/2,size+16], popupAnchor: [0,-(size+4)],
  })
}

export default function MapInner({ selectedNGOId, analyzing }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef       = useRef<L.Map | null>(null)
  const tileRef      = useRef<L.TileLayer | null>(null)
  const ngoLayersRef = useRef<L.Layer[]>([])
  const routeRef     = useRef<L.Polyline | null>(null)

  // Init map once
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (L.Icon.Default.prototype as any)._getIconUrl
    L.Icon.Default.mergeOptions({
      iconUrl:       'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
      shadowUrl:     'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    })

    const isDark = () => document.documentElement.classList.contains('dark')

    const map = L.map(containerRef.current, { center: DONOR_COORD, zoom: 13, zoomControl: true })

    const tile = L.tileLayer(isDark() ? TILE_DARK : TILE_LIGHT, {
      attribution: TILE_ATTR, subdomains: 'abcd', maxZoom: 20,
    }).addTo(map)
    tileRef.current = tile

    // Donor marker
    L.marker(DONOR_COORD, { icon: donorIcon() })
      .addTo(map)
      .bindPopup(`<div class="map-popup-inner"><div class="map-popup-title">Your Location</div><div class="map-popup-sub">Food pickup point</div></div>`)

    mapRef.current = map

    // Watch theme changes and swap tile layer
    const observer = new MutationObserver(() => {
      const dark = isDark()
      if (tileRef.current) {
        tileRef.current.setUrl(dark ? TILE_DARK : TILE_LIGHT)
      }
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    return () => {
      observer.disconnect()
      map.remove()
      mapRef.current = null
      tileRef.current = null
    }
  }, [])

  // Update NGO markers + route when selection changes
  useEffect(() => {
    const map = mapRef.current
    if (!map) return
    ngoLayersRef.current.forEach(l => map.removeLayer(l))
    ngoLayersRef.current = []
    if (routeRef.current) { map.removeLayer(routeRef.current); routeRef.current = null }

    NGO_LOCATIONS.forEach(ngo => {
      const selected = ngo.id === selectedNGOId
      const marker = L.marker([ngo.lat, ngo.lng], { icon: ngoIcon(selected) })
        .addTo(map)
        .bindPopup(`<div class="map-popup-inner">
          <div class="map-popup-title">${ngo.name}</div>
          <div class="map-popup-sub">${ngo.dist} away · ${ngo.cap} meal capacity</div>
          ${selected ? '<div style="font-size:11px;font-weight:600;color:#EA580C;margin-top:6px;">✅ Selected by Gemini AI</div>' : ''}
        </div>`)
      ngoLayersRef.current.push(marker)

      if (selected) {
        const route = L.polyline([DONOR_COORD, [ngo.lat, ngo.lng]], {
          color: '#16A34A', weight: 3, opacity: 0.8, dashArray: '8 6',
        }).addTo(map)
        routeRef.current = route
        map.flyToBounds(L.latLngBounds(DONOR_COORD, [ngo.lat, ngo.lng]), { padding: [80,80], duration: 1.5 })
        setTimeout(() => marker.openPopup(), 1800)
      }
    })
  }, [selectedNGOId])

  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className="w-full h-full" />

      {/* AI scanning overlay */}
      {analyzing && (
        <div className="map-glass absolute inset-0 flex items-center justify-center z-[1000] pointer-events-none">
          <div className="bg-th-surface rounded-2xl border border-th-border px-6 py-4 flex items-center gap-4"
            style={{ boxShadow:'var(--th-shadow-xl)' }}>
            <div className="w-10 h-10 rounded-xl bg-th-violet-bg flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
            </div>
            <div>
              <p className="font-semibold text-th-text text-sm">Gemini Scanning Area</p>
              <p className="text-xs text-th-text-3 mt-0.5">Finding optimal NGO match…</p>
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-th-surface rounded-xl border border-th-border px-3 py-2.5 z-[999]"
        style={{ boxShadow:'var(--th-shadow)' }}>
        <p className="text-[11px] font-semibold text-th-text-4 uppercase tracking-wide mb-1.5">Legend</p>
        <div className="space-y-1">
          {[
            { color: '#3B82F6', label: 'Your location' },
            { color: '#16A34A', label: 'NGO partner' },
            ...(selectedNGOId ? [{ color: '#EA580C', label: 'AI selected' }] : []),
          ].map(({ color, label }) => (
            <div key={label} className="flex items-center gap-2 text-xs text-th-text-3">
              <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: color }} />
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
