import './globals.css'
import { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import NextTopLoader from 'nextjs-toploader'
import { Analytics } from '@vercel/analytics/react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ClientProvider } from '@/providers'
import { app_settings } from '@/app_settings'
import SupabaseAuthProvider from '@/providers/supabase-auth-provider'
import Link from 'next/link'
import AuthButton from '@/components/auth/button'
import Footer from '@/components/homepage/footer'

export const metadata: Metadata = {
  metadataBase: new URL(app_settings.site_url),
  title: app_settings.site_name,
  description: app_settings.site_description,
  keywords: app_settings.site_keywords,
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: app_settings.site_name,
    description: app_settings.site_description,
    images: [
      `${app_settings.site_url}/api/og?title=${app_settings.site_name}&content=${app_settings.site_description}&with_image=true`,
    ],
  },
  twitter: {
    title: app_settings.site_name,
    description: app_settings.site_description,
    images: [
      `${app_settings.site_url}/api/og?title=${app_settings.site_name}&content=${app_settings.site_description}&with_image=true`,
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <NextTopLoader height={1} color="hsl(var(--primary))" />
        <SupabaseAuthProvider>
          <ClientProvider>
            <main className="flex min-h-screen flex-col items-center">
              <div className="flex w-full flex-1 flex-col items-center">
                <nav className="flex h-16 w-full justify-center border-b border-b-foreground/10">
                  <div className="flex w-full max-w-4xl items-center justify-between p-3 text-sm">
                    <Link href="/">Homepage</Link>
                    <AuthButton />
                  </div>
                </nav>
                {children}
              </div>
              <Footer />
              {/* You don't need this if not deploying to Vercel */}
              <Analytics />
            </main>
            <ReactQueryDevtools initialIsOpen={false} />
          </ClientProvider>
        </SupabaseAuthProvider>
      </body>
    </html>
  )
}
