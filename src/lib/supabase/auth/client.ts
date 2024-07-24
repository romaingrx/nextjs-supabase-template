'use client'

import { AuthContext } from '@/providers/supabase-auth-provider/client'
import { useContext } from 'react'

export const useSession = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useSession must be used within the SupabaseAuthProvider')
  }

  return {
    session: context.session,
    profile: context.profile,
    isLoading: context.isLoading,
    error: context.error,
  }
}

export const useUser = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useSession must be used within the SupabaseAuthProvider')
  }

  return {
    user: context.session?.user,
    profile: context.profile,
    isLoading: context.isLoading,
    error: context.error,
  }
}
