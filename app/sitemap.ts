import type { MetadataRoute } from 'next'
import { company } from '@/content/company'

const base = `https://${company.domain}`
const routes = [
  '/',
  '/uslugi/okna',
  '/uslugi/dveri',
  '/uslugi/vitrazhi',
  '/uslugi/podokonniki',
  '/obyekty',
  '/o-nas',
  '/kontakty',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return routes.map((r) => ({
    url: `${base}${r}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: r === '/' ? 1 : 0.7,
  }))
}
