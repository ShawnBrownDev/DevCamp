import { useContext } from 'react'
import { AuthContext } from './AuthProvider'

export const useAuthProvider = () => useContext(AuthContext)
export { getAuthErrorMessage } from './errors'
export type { AuthContextType, AuthError } from './types'
