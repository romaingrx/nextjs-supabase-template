import { Tables } from '@/types/supabase'
import { createServerClient } from '../server'

export async function getSession() {
  const supabase = createServerClient()
  return supabase.auth.getSession()
}

export async function getUser() {
  const supabase = createServerClient()
  return supabase.auth.getUser()
}

export async function getSessionWithProfile() {
  const supabase = createServerClient()
  return supabase.auth.getSession().then(async ({ data, error }) => {
    if (error) {
      throw error
    }

    if (!data.session) {
      return { ...data, profile: null }
    }

    const user = data.session?.user
    const profile = (await supabase
      .from('profiles')
      .select('*')
      .eq('id', user?.id)
      .single()) as { data: Tables<'profiles'> | null; error: any }

    if (profile.error && profile.error.code !== 'PGRST116') {
      throw profile.error
    }

    return { ...data, profile: profile.data }
  })
}

export async function getUserWithProfile() {
  const supabase = createServerClient()
  return supabase.auth.getUser().then(async ({ data, error }) => {
    if (error) {
      throw error
    }

    const user = data.user
    const profile = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    return { user, profile }
  })
}
