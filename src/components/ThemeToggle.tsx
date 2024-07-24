'use client'

import { MoonIcon, SunIcon } from '@radix-ui/react-icons'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { motion, AnimateSharedLayout } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Laptop } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip'

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()

  const themes = [
    {
      name: 'light',
      icon: <SunIcon className="h-4 w-4" />,
      description: 'Light theme',
    },
    {
      name: 'dark',
      icon: <MoonIcon className="h-4 w-4" />,
      description: 'Dark theme',
    },
    {
      name: 'system',
      icon: <Laptop className="h-4 w-4" />,
      description: 'System theme',
    },
  ]

  return (
    <nav className="rounded-2xl p-2">
      <ul className="flex items-center gap-1">
        {themes.map((t) => (
          <li key={t.name} onClick={() => setTheme(t.name)}>
            <div className="relative flex items-center justify-center p-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div className="relative z-[1]">{t.icon}</div>
                    {t.name === theme ? (
                      <motion.div
                        className="absolute left-0 top-0 z-[0] h-full w-full rounded-full bg-muted shadow-[5px_5px_10px_#cfcfd0,_-5px_-5px_10px_#ffffff]
                        dark:shadow-[5px_5px_14px_#141416,_-5px_-5px_14px_#3a3a3e]
                        "
                        layoutId="theme-toggle"
                      />
                    ) : null}{' '}
                  </TooltipTrigger>
                  <TooltipContent>{t.description}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default ThemeToggle
