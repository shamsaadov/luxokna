import type { Metadata } from 'next'
import { company } from '@/content/company'
import type { PageSeo } from '@/content/seo'

export function makeMetadata(p: PageSeo, path: string = '/'): Metadata {
  const canonical = `https://${company.domain}${path}`
  return {
    title: p.title,
    description: p.description,
    metadataBase: new URL(`https://${company.domain}`),
    alternates: { canonical },
    openGraph: {
      title: p.title,
      description: p.description,
      url: canonical,
      siteName: company.name,
      locale: 'ru_RU',
      type: 'website',
      images: p.ogImage ? [{ url: p.ogImage }] : undefined,
    },
    twitter: { card: 'summary_large_image' },
  }
}

export function localBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: company.name,
    image: `https://${company.domain}/og-default.jpg`,
    telephone: company.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: company.city,
      addressRegion: company.region,
      addressCountry: company.countryCode,
      streetAddress: company.address,
    },
    geo: { '@type': 'GeoCoordinates', latitude: company.coords.lat, longitude: company.coords.lng },
    openingHours: company.hours,
    priceRange: '₽₽₽',
    url: `https://${company.domain}`,
    sameAs: [company.instagramUrl],
  }
}
