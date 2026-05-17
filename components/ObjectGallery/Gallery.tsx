'use client'
import { useMemo, useState } from 'react'
import type { CSSProperties } from 'react'
import Image from 'next/image'
import type { ObjectItem } from '@/content/objects'
import { ObjectCard } from '../ObjectCard/ObjectCard'
import { Close } from '../icons/Close'
import * as s from './Gallery.css'

const SERVICES = ['all', 'okna', 'dveri', 'vitrazhi', 'podokonniki'] as const
type ServiceFilter = (typeof SERVICES)[number]
type YearFilter = 'all' | number

/** Russian plural for "объект" — 1 объект / 2 объекта / 5 объектов. */
function pluralObjects(n: number): string {
  const mod10 = n % 10
  const mod100 = n % 100
  if (mod10 === 1 && mod100 !== 11) return `${n} объект`
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return `${n} объекта`
  return `${n} объектов`
}

export function Gallery({ items }: { items: ObjectItem[] }) {
  const [filter, setFilter] = useState<ServiceFilter>('all')
  const [year, setYear] = useState<YearFilter>('all')
  const [lightbox, setLightbox] = useState<ObjectItem | null>(null)

  const years = useMemo(
    () => Array.from(new Set(items.map((i) => i.year))).sort((a, b) => b - a),
    [items],
  )

  const filtered = useMemo(
    () =>
      items.filter((i) => {
        if (filter !== 'all' && i.service !== filter) return false
        if (year !== 'all' && i.year !== year) return false
        return true
      }),
    [items, filter, year],
  )

  const lightboxImg = lightbox?.images[0]

  return (
    <>
      <nav className={s.nav} aria-label="Фильтр по услуге">
        {SERVICES.map((svc) => (
          <button
            key={svc}
            onClick={() => setFilter(svc)}
            className={[s.filterBtn, filter === svc ? s.filterActive : '']
              .filter(Boolean)
              .join(' ')}
          >
            {svc === 'all' ? 'Все' : svc}
          </button>
        ))}
      </nav>
      <nav className={s.navRow} aria-label="Фильтр по году">
        <span className={s.navLabel}>Год:</span>
        <button
          onClick={() => setYear('all')}
          className={[s.filterBtn, year === 'all' ? s.filterActive : '']
            .filter(Boolean)
            .join(' ')}
        >
          Все
        </button>
        {years.map((y) => (
          <button
            key={y}
            onClick={() => setYear(y)}
            className={[s.filterBtn, year === y ? s.filterActive : '']
              .filter(Boolean)
              .join(' ')}
          >
            {y}
          </button>
        ))}
      </nav>
      <div className={s.count} aria-live="polite">
        {pluralObjects(filtered.length)}
      </div>
      <div className={s.grid}>
        {filtered.map((o) => (
          <button
            key={o.slug}
            type="button"
            onClick={() => setLightbox(o)}
            aria-label={`Открыть фото: ${o.title}`}
            style={{ textAlign: 'left' }}
          >
            <ObjectCard item={o} />
          </button>
        ))}
      </div>
      {lightbox && lightboxImg && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.92)',
            zIndex: 300,
            display: 'grid',
            placeItems: 'center',
          }}
          onClick={() => setLightbox(null)}
        >
          <button
            style={{ position: 'fixed', top: 24, right: 24, color: 'white' }}
            onClick={() => setLightbox(null)}
            aria-label="Закрыть"
          >
            <Close />
          </button>
          <div
            style={{
              maxWidth: '90vw',
              maxHeight: '90vh',
              position: 'relative',
              aspectRatio: '4/3',
              width: '90vw',
              viewTransitionName: `object-${lightbox.slug}`,
            } as CSSProperties}
          >
            <Image
              src={lightboxImg.src}
              alt={lightboxImg.alt}
              fill
              style={{ objectFit: 'contain' }}
              sizes="90vw"
            />
          </div>
        </div>
      )}
    </>
  )
}
