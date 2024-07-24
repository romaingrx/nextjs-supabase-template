import z from 'zod'

export const country_schema = z.object({
  name: z.string(),
  code: z.string(),
  emoji: z.string(),
})

export const countries: z.infer<typeof country_schema>[] = [
  { name: 'United States', code: 'US', emoji: '🇺🇸' },
  { name: 'United Kingdom', code: 'GB', emoji: '🇬🇧' },
  { name: 'Switzerland', code: 'CH', emoji: '🇨🇭' },
  { name: 'Spain', code: 'ES', emoji: '🇪🇸' },
  { name: 'Italy', code: 'IT', emoji: '🇮🇹' },
  { name: 'Germany', code: 'DE', emoji: '🇩🇪' },
  { name: 'France', code: 'FR', emoji: '🇫🇷' },
]

export const role_schema = z.enum(['admin', 'user']).default('user')

export const user_schema = z.object({
  name: z.string(),
  email: z.string(),
  username: z.string(),
  firstname: z.string(),
  lastname: z.string(),
  role: role_schema,
  country: country_schema,
})
