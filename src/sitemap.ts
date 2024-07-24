import { MetadataRoute } from 'next'

export default async function Sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'hourly',
      priority: 1,
    },
  ]
}
