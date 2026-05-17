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

/** Map RU day labels (Пн/Вт/…) to schema.org day names. */
const DAY_MAP_RU: Record<string, string> = {
  Пн: 'Monday',
  Вт: 'Tuesday',
  Ср: 'Wednesday',
  Чт: 'Thursday',
  Пт: 'Friday',
  Сб: 'Saturday',
  Вс: 'Sunday',
}
const DAY_ORDER = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'] as const

/**
 * Parse "Пн–Сб 09:00–18:00" → schema.org openingHoursSpecification array.
 * Handles either an en-dash, em-dash, or hyphen.
 */
export function parseOpeningHours(input: string): Array<{
  '@type': 'OpeningHoursSpecification'
  dayOfWeek: string[]
  opens: string
  closes: string
}> {
  // Normalize dashes so we can split safely.
  const norm = input.replace(/[—−]/g, '–').trim()
  // Expect <days> <space> <opens>–<closes>
  const m = norm.match(/^(\S+)\s+(\d{1,2}:\d{2})\s*–\s*(\d{1,2}:\d{2})$/)
  if (!m) return []
  const [, daysPart, opens, closes] = m
  const daysSegment = daysPart!

  let days: string[] = []
  if (daysSegment.includes('–')) {
    const [from, to] = daysSegment.split('–')
    const fi = DAY_ORDER.indexOf(from as (typeof DAY_ORDER)[number])
    const ti = DAY_ORDER.indexOf(to as (typeof DAY_ORDER)[number])
    if (fi !== -1 && ti !== -1) {
      days = DAY_ORDER.slice(fi, ti + 1).map((d) => DAY_MAP_RU[d]!)
    }
  } else {
    // Single day or comma-separated list (Пн,Ср,Пт).
    days = daysSegment
      .split(',')
      .map((d) => d.trim())
      .map((d) => DAY_MAP_RU[d])
      .filter((d): d is string => Boolean(d))
  }

  if (days.length === 0) return []
  return [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: days,
      opens: opens!,
      closes: closes!,
    },
  ]
}

/** Richer LocalBusiness schema for /kontakty page (geo, hours, sameAs, hasMap). */
export function contactLocalBusinessJsonLd() {
  const yandexMapUrl = `https://yandex.ru/maps/?ll=${company.coords.lng},${company.coords.lat}&z=15&pt=${company.coords.lng},${company.coords.lat},pm2rdm`
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `https://${company.domain}/#localbusiness`,
    name: company.name,
    image: `https://${company.domain}/og/home`,
    telephone: company.phone,
    url: `https://${company.domain}`,
    description: `Премиум-окна, двери, витражи и подоконники в ${company.city}.`,
    priceRange: '₽₽₽',
    address: {
      '@type': 'PostalAddress',
      streetAddress: company.address,
      addressLocality: company.city,
      addressRegion: company.region,
      addressCountry: company.countryCode,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: company.coords.lat,
      longitude: company.coords.lng,
    },
    openingHoursSpecification: parseOpeningHours(company.hours),
    sameAs: [company.instagramUrl, `https://wa.me/${company.whatsapp}`],
    hasMap: yandexMapUrl,
  }
}
