export type UserType = Record<string, any> | null

export type AuthState = {
  user: UserType
  loading: boolean
}

export type AuthContextValue = {
  user: UserType
  loading: boolean
  authenticated: boolean
  unauthenticated: boolean
  checkUserSession?: () => Promise<void>
}

export type AuthUser = {
  id: string
  email: string
  name: string
  displayName: string
  role: string
  photoURL: string
}

export interface AuthProps {
  user?: AuthUser | null | undefined
  login: () => void
  loading?: boolean
  authenticated?: boolean
  unauthenticated?: boolean
  checkUserSession?: () => Promise<void>
}
