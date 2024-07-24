import Image from 'next/image'
import ThemeToggle from '../ThemeToggle'
import Link from 'next/link'
import { app_settings } from '@/app_settings'
import { Github, Linkedin, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="flex w-full flex-col gap-2 border-t border-t-foreground/10 bg-muted p-8 text-center text-xs">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Image src="/favicon.ico" alt="logo" width={32} height={32} />
          </Link>
          <p>&copy; {new Date().getFullYear()}</p>
        </div>
        <div>
          <ThemeToggle />
        </div>
      </div>
      <div>
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            {app_settings.github_link && (
              <a
                href={app_settings.github_link}
                target="_blank"
                rel="noreferrer"
              >
                <Github />
              </a>
            )}
            {app_settings.twitter_link && (
              <a
                href={app_settings.twitter_link}
                target="_blank"
                rel="noreferrer"
              >
                <Twitter />
              </a>
            )}
            {app_settings.linkedin_link && (
              <a
                href={app_settings.linkedin_link}
                target="_blank"
                rel="noreferrer"
              >
                <Linkedin />
              </a>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <p>Powered by</p>
          <a
            href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            Supabase
          </a>
          <a
            href="https://nextjs.org/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            Next.js
          </a>
        </div>
        <div className="flex items-center gap-2"></div>
      </div>
    </footer>
  )
}
