import { useContext } from 'react'

import { userContext } from '../context/UserContext'

// ----------------------------------------------------------------------

export function useAuthContext() {
  const context = useContext(userContext)

  if (!context) {
    throw new Error('useAuthContext: Context must be used inside AuthProvider')
  }

  return context
}
