'use client'

import ReactQueryProvider from '@/providers/react-query-provider'
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'sonner'

export function ClientProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" enableSystem>
      <Toaster />
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </ThemeProvider>
  )
}
