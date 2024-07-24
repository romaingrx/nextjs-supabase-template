import { createServerClient } from '@/lib/supabase/server'
import { ClientSupabaseAuthProvider } from './client'
import { getSessionWithProfile } from '@/lib/supabase/auth/server'

export default function SupabaseAuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const session_promise = getSessionWithProfile()

  return (
    <ClientSupabaseAuthProvider session_promise={session_promise}>
      {children}
    </ClientSupabaseAuthProvider>
  )
}
