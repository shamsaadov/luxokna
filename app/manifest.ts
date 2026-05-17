import type { MetadataRoute } from 'next'
import { seo } from '@/content/seo'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'LuxOkna — Окна Schüco, Rehau, Alutech в Грозном',
    short_name: 'LuxOkna',
    description: seo.home.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#F2ECDF',
    theme_color: '#1A1714',
    lang: 'ru',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
      {
        src: '/icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  }
}
