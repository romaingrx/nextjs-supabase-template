import Link from 'next/link'
import { headers, cookies } from 'next/headers'
import { redirect, useSearchParams } from 'next/navigation'
import { createServerClient } from '@/lib/supabase/server'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Callout } from '@/components/ui/alert'

export default function SignUp({
  searchParams,
}: {
  searchParams: { message: string; error: string }
}) {
  const signUp = async (formData: FormData) => {
    'use server'
    console.log(formData)

    const origin = headers().get('origin')
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const cookieStore = cookies()
    const supabase = createServerClient(cookieStore)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    })

    if (error) {
      return redirect(`/signup?error=${error.message}`)
    }

    return redirect('/signup?message=Check email to continue sign up process')
  }

  return (
    <form action={signUp}>
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Sign up</h1>
          <p className="text-balance text-muted-foreground">
            Enter your email below to create your account
          </p>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              name="email"
              type="email"
              placeholder="john@doe.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
            </div>
            <Input
              name="password"
              type="password"
              required
              placeholder="••••••••"
            />
          </div>
          <Button type="submit" className="w-full">
            Sign up
          </Button>
          {searchParams.error && (
            <Callout variant="destructive" title="Error">
              {searchParams.error}
            </Callout>
          )}
          {searchParams.message && (
            <Callout variant="default" title="Message">
              {searchParams.message}
            </Callout>
          )}
        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <Link href="/login" className="underline">
            Login
          </Link>
        </div>
      </div>
    </form>
  )
}
