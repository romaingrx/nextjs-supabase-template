'use client'
import React from 'react'
import { useUser } from '@/lib/supabase/auth/client'

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'
import { Loader, LogOut, User } from 'lucide-react'

export function UserAvatarPrimitive({
  user,
  profile,
  isLoading,
}: ReturnType<typeof useUser>) {
  if (isLoading) return <Loader className="animate-spin-slow h-4 w-4" />

  return (
    <Avatar className="h-8 w-8">
      <AvatarImage
        src={`/api/avatar/${user?.id}`} // TODO starter : change this if you have other picture
        alt={user?.email || 'Unknown'}
      />
      <AvatarFallback>
        {profile?.first_name?.[0]}
        {profile?.last_name?.[0]}
      </AvatarFallback>
    </Avatar>
  )
}

export function UserDropdownMenuPrimitive({
  children,
  ...props
}: ReturnType<typeof useUser> & { children?: React.ReactNode }) {
  const { user, profile, isLoading } = props

  if (!user) return null
  if (isLoading) return <div>Loading...</div>

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {children || <UserAvatarPrimitive {...props} />}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        sideOffset={5}
        alignOffset={-5}
        className="pointer-events-none z-50"
        forceMount
      >
        <DropdownMenuLabel className="p-2 font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {profile?.first_name} {profile?.last_name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/settings">
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <Link href="/api/auth/logout">
          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default function UserDropdownMenu() {
  const props = useUser()
  return <UserDropdownMenuPrimitive {...props} />
}
