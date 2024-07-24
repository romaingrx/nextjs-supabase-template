'use client'

import { getSessionWithProfile } from '@/lib/supabase/auth/server'
import { Tables } from '@/types/supabase'
import { AuthError, Session } from '@supabase/supabase-js'
import { createContext, useMemo, useState } from 'react'

interface AuthContextType {
  session: Session | null
  profile: Tables<'profiles'> | null
  error: Error | null
  isLoading: boolean
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function ClientSupabaseAuthProvider({
  session_promise,
  children,
}: {
  session_promise: ReturnType<typeof getSessionWithProfile>
  children: React.ReactNode
}) {
  const [data, setData] = useState<{
    session: Session | null
    profile: Tables<'profiles'> | null
  } | null>({ session: null, profile: null })
  const [error, setError] = useState<AuthError | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useMemo(async () => {
    try {
      const { session, profile } = await session_promise
      if (session) setData({ session, profile })
    } catch (error) {
      setError(error as AuthError)
    } finally {
      setIsLoading(false)
    }
  }, [session_promise])

  return (
    <AuthContext.Provider
      value={{
        session: data?.session ?? null,
        profile: data?.profile ?? null,
        error,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
