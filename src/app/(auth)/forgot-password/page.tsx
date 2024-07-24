import Link from 'next/link'
import { headers, cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createServerClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { Callout } from '@/components/ui/alert'
import { toast } from 'sonner'

export default function Login({
  searchParams,
}: {
  searchParams: { error: string; success: string }
}) {
  const signIn = async (formData: FormData) => {
    'use server'

    const email = formData.get('email') as string
    const cookieStore = cookies()
    const supabase = createServerClient(cookieStore)

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${headers().get('origin')}/api/auth/callback?redirect=/update-password`,
    })

    if (error) {
      return redirect(`/forgot-password?error=${error.message}`)
    }

    return redirect('/forgot-password?success=true')
  }

  return searchParams.success ? (
    <div className="mx-auto grid w-[350px] gap-6">
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Password reset link sent</h1>
        <p className="text-balance text-muted-foreground">
          Check your email for a link to reset your password
        </p>
      </div>
    </div>
  ) : (
    <form action={signIn}>
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Reset Password</h1>
          <p className="text-balance text-muted-foreground">
            Enter your email below to reset your password
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
          <Button type="submit" className="w-full">
            Reset Password
          </Button>
          {searchParams.error && (
            <Callout variant="destructive" title="Error">
              {searchParams.error}
            </Callout>
          )}
        </div>
      </div>
    </form>
  )
}
