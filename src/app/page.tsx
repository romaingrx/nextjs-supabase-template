import { createServerClient } from '@/lib/supabase/server'
import SupabaseLogo from '@/components/SupabaseLogo'
import NextLogo from '@/components/NextLogo'
import { cn } from '@/lib/utils'

export default async function Index() {
  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createServerClient()
      return true
    } catch (e) {
      return false
    }
  }

  const isSupabaseConnected = canInitSupabaseClient()

  return (
    <div className="mt-20 flex max-w-4xl flex-1 flex-col gap-20 px-3">
      <div className="flex flex-col items-center gap-16">
        <div className="flex items-center justify-center gap-8">
          <a
            href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
            target="_blank"
            rel="noreferrer"
          >
            <SupabaseLogo />
          </a>
          <span className="h-6 rotate-[30deg] border-l" />
          <a href="https://nextjs.org/" target="_blank" rel="noreferrer">
            <NextLogo />
          </a>
        </div>
        <div className="mx-auto max-w-xl text-center text-3xl !leading-tight lg:text-4xl">
          <p className="mb-4">
            Build in a weekend
            <br />
            Scale to millions
          </p>
          <p>
            thanks to{' '}
            <a
              href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
              target="_blank"
              className="font-bold hover:underline"
              rel="noreferrer"
            >
              Supabase
            </a>{' '}
            and{' '}
            <a
              href="https://nextjs.org/"
              target="_blank"
              className="font-bold hover:underline"
              rel="noreferrer"
            >
              Next.js
            </a>
          </p>
        </div>
        <div className="my-8 w-full bg-gradient-to-r from-transparent via-foreground/10 to-transparent p-[1px]" />
      </div>

      <main className="flex flex-1 flex-col gap-6">
        <div
          className={cn(
            'rounded-md bg-opacity-50 p-4 text-center',
            isSupabaseConnected
              ? 'border border-green-500 bg-green-500 text-white '
              : 'border border-red-500 bg-red-500 text-white ',
          )}
        >
          {isSupabaseConnected
            ? 'You are connected to Supabase'
            : 'You are not connected to Supabase'}
        </div>
      </main>
    </div>
  )
}
