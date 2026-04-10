'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import type { AuthUser, UserRole, IndividualDonor, OrganizationDonor, VolunteerUser, NGOUser } from './auth/types'

// ─────────────────────────────────────────────────────────────────────────────

function getDisplayName(user: AuthUser): string {
  if (user.role === 'donor') {
    return user.subtype === 'individual'
      ? (user as IndividualDonor).name
      : (user as OrganizationDonor).organizationName
  }
  if (user.role === 'volunteer') return (user as VolunteerUser).name
  if (user.role === 'ngo')       return (user as NGOUser).ngoName
  return ''
}

function setLegacyKeys(user: AuthUser) {
  // Dashboards read rq_user (expects a .verified boolean) and rq_name
  const userForDash = { ...user, verified: user.verificationStatus !== 'unverified' }
  localStorage.setItem('rq_user', JSON.stringify(userForDash))
  const name = getDisplayName(user)
  if (name) localStorage.setItem('rq_name', name)
}

// ─────────────────────────────────────────────────────────────────────────────

interface AuthState {
  user:      AuthUser | null
  token:     string   | null
  isLoading: boolean
}

interface AuthContextValue extends AuthState {
  login:       (token: string, user: AuthUser) => void
  logout:      () => void
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

const TOKEN_KEY  = 'gg_session_token'
const USER_KEY   = 'gg_user'
const LEGACY_KEY = 'rq_role'   // backward compat with existing pages

// ─────────────────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null, token: null, isLoading: true,
  })

  const login = useCallback((token: string, user: AuthUser) => {
    localStorage.setItem(TOKEN_KEY,  token)
    localStorage.setItem(USER_KEY,   JSON.stringify(user))
    localStorage.setItem(LEGACY_KEY, user.role)   // keep old code working
    setLegacyKeys(user)                            // rq_user + rq_name for dashboards
    setState({ user, token, isLoading: false })
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    localStorage.removeItem(LEGACY_KEY)
    localStorage.removeItem('rq_user')
    localStorage.removeItem('rq_name')
    setState({ user: null, token: null, isLoading: false })
  }, [])

  const refreshUser = useCallback(async () => {
    const token = localStorage.getItem(TOKEN_KEY)
    if (!token) {
      setState({ user: null, token: null, isLoading: false })
      return
    }

    try {
      const res = await fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) {
        const data = await res.json()
        localStorage.setItem(USER_KEY,   JSON.stringify(data.user))
        localStorage.setItem(LEGACY_KEY, data.user.role)
        setLegacyKeys(data.user)
        setState({ user: data.user, token, isLoading: false })
      } else {
        logout()
      }
    } catch {
      // Server unreachable (e.g. during SSR hydration or cold start)
      // Fall back to cached user so UI doesn't flash logged-out state
      const cached = localStorage.getItem(USER_KEY)
      if (cached) {
        try {
          setState({ user: JSON.parse(cached), token, isLoading: false })
        } catch {
          logout()
        }
      } else {
        logout()
      }
    }
  }, [logout])

  useEffect(() => {
    refreshUser()
  }, [refreshUser])

  return (
    <AuthContext.Provider value={{ ...state, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  )
}

// ─────────────────────────────────────────────────────────────────────────────

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be called inside <AuthProvider>')
  return ctx
}

// Convenience helpers
export function getRoleDashboard(role: UserRole): string {
  const map: Record<UserRole, string> = {
    donor:     '/donor',
    ngo:       '/ngo',
    volunteer: '/volunteer',
  }
  return map[role]
}
