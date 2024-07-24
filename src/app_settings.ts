// This file is used to centralized all the information about the app\

export type EnvRequirement = 'REQUIRED' | 'OPTIONAL'
export type EnvVar =
  | string
  | {
      name: string
      description: string
    }

interface AppSettings {
  site_url: string
  site_name: string
  site_description: string
  site_keywords: string[]
  github_link?: string
  twitter_link?: string
  linkedin_link?: string
  envs: Record<EnvRequirement, EnvVar[]>
}

// TODO starter: Modify all the following settings to fit your needs
export const app_settings: AppSettings = {
  site_url: process.env.NEXT_PUBLIC_SITE_URL!,
  site_name: 'NextJS Supabase Starter',
  site_description: 'This is a starter kit for Next.js and Supabase',
  site_keywords: ['nextjs', 'supabase', 'starter'],
  envs: {
    REQUIRED: [
      {
        name: 'NEXT_PUBLIC_SITE_URL',
        description:
          'The URL of the site that will be used to generate absolute URLs',
      },
      {
        name: 'NEXT_PUBLIC_SUPABASE_URL',
        description:
          'The URL of the Supabase instance (see https://supabase.com/dashboard/project/_/settings/api)',
      },
      {
        name: 'NEXT_PUBLIC_SUPABASE_ANON_KEY',
        description:
          'The anonymous key of the Supabase instance (see https://supabase.com/dashboard/project/_/settings/api)',
      },
    ],
    OPTIONAL: [],
  },
}
