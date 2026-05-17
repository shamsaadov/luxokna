import Link from 'next/link'
import { company } from '@/content/company'
import * as s from './Breadcrumbs.css'

export interface BreadcrumbItem {
  label: string
  href?: string
}

/**
 * Accessible breadcrumb trail.
 * - Renders an <ol> wrapped by <nav aria-label="Хлебные крошки">.
 * - Last item is treated as current page (no <a>), gets aria-current="page".
 * - Emits BreadcrumbList JSON-LD inline via child <script>.
 */
export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const base = `https://${company.domain}`
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.label,
      ...(it.href ? { item: `${base}${it.href}` } : {}),
    })),
  }
  return (
    <nav aria-label="Хлебные крошки" className={s.nav}>
      <ol className={s.list}>
        {items.map((it, i) => {
          const isLast = i === items.length - 1
          return (
            <li key={`${it.label}-${i}`} className={s.item}>
              {it.href && !isLast ? (
                <Link href={it.href} className={s.link} data-cursor>
                  {it.label}
                </Link>
              ) : (
                <span className={s.current} aria-current="page">
                  {it.label}
                </span>
              )}
              {!isLast && (
                <span className={s.sep} aria-hidden="true">
                  ·
                </span>
              )}
            </li>
          )
        })}
      </ol>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </nav>
  )
}
