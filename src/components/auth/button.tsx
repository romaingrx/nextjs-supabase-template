'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { useSession } from '@/lib/supabase/auth/client'
import Link from 'next/link'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip'
import UserDropdownMenu from './user-dropdown'

function AuthButton() {
  const { session, isLoading, error } = useSession()

  if (isLoading) {
    return <Button loading={isLoading}>Loading</Button>
  }
  console.log(session, error)

  if (error) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button variant="destructive" disabled>
              Error
            </Button>
          </TooltipTrigger>
          <TooltipContent>{error.message}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  if (!session) {
    return (
      <Button asChild>
        <Link href="/login">Login</Link>
      </Button>
    )
  }

  return <UserDropdownMenu />
}

export default AuthButton
