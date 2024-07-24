import { redirect } from 'next/navigation'
import { createServerClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Callout } from '@/components/ui/alert'
import { getUser } from '@/lib/supabase/auth/server'

export default async function UpdatePassword({
  searchParams,
}: {
  searchParams: { error: string }
}) {
  const { data: user } = await getUser()

  const updatePassword = async (formData: FormData) => {
    'use server'

    const password = formData.get('password') as string

    const supabase = createServerClient()
    const { error } = await supabase.auth.updateUser({ password })

    if (error) {
      return redirect(`/update-password?error=${error.message}`)
    }

    return redirect('/')
  }

  return (
    <form action={updatePassword}>
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Update Password</h1>
          <p className="text-balance text-muted-foreground">
            Enter your new password below
          </p>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="password"
              name="email"
              disabled
              value={user?.user?.email}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              name="password"
              placeholder="••••••••"
            />
          </div>
          <Button type="submit" className="w-full">
            Update Password
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
