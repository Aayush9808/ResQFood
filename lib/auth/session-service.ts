import { randomUUID } from 'crypto'
import type { Session, UserRole } from './types'

const SESSION_EXPIRY_MS = 7 * 24 * 60 * 60 * 1000  // 7 days

// In-memory session store — keyed by token
const sessionsDb = new Map<string, Session>()

export function createSession(
  userId: string,
  phoneNumber: string,
  role: UserRole,
): Session {
  const token = randomUUID()
  const now   = Date.now()
  const session: Session = {
    token,
    userId,
    phoneNumber,
    role,
    createdAt: now,
    expiresAt: now + SESSION_EXPIRY_MS,
  }
  sessionsDb.set(token, session)
  return session
}

export function getSession(token: string): Session | null {
  const session = sessionsDb.get(token)
  if (!session)                    return null
  if (Date.now() > session.expiresAt) {
    sessionsDb.delete(token)
    return null
  }
  return session
}

export function invalidateSession(token: string): void {
  sessionsDb.delete(token)
}
