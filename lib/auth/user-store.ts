import type { AuthUser } from './types'

// In-memory user database — keyed by phone number
// In production: replace with PostgreSQL / MongoDB / Firestore
const usersDb = new Map<string, AuthUser>()

export function createUser(user: AuthUser): void {
  usersDb.set(user.phoneNumber, user)
}

export function getUserByPhone(phoneNumber: string): AuthUser | undefined {
  return usersDb.get(phoneNumber)
}

export function getUserById(id: string): AuthUser | undefined {
  for (const user of usersDb.values()) {
    if (user.id === id) return user
  }
  return undefined
}

export function updateUser(
  phoneNumber: string,
  updates: Partial<Omit<AuthUser, 'id' | 'role' | 'phoneNumber' | 'createdAt'>>,
): AuthUser | null {
  const user = usersDb.get(phoneNumber)
  if (!user) return null
  const updated = { ...user, ...updates } as AuthUser
  usersDb.set(phoneNumber, updated)
  return updated
}

export function userExistsByPhone(phoneNumber: string): boolean {
  return usersDb.has(phoneNumber)
}
