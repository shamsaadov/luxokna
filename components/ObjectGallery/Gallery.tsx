'use client'
import { useMemo, useState } from 'react'
import type { CSSProperties } from 'react'
import Image from 'next/image'
import type { ObjectItem } from '@/content/objects'
import { ObjectCard } from '../ObjectCard/ObjectCard'
import { Close } from '../icons/Close'
import * as s from './Gallery.css'

const SERVICES = ['all', 'okna', 'dveri', 'vitrazhi', 'podokonniki'] as const
type Filter = (typeof SERVICES)[number]

export function Gallery({ items }: { items: ObjectItem[] }) {
  const [filter, setFilter] = useState<Filter>('all')
  const [lightbox, setLightbox] = useState<ObjectItem | null>(null)
  const filtered = useMemo(
    () => (filter === 'all' ? items : items.filter((i) => i.service === filter)),
    [items, filter],
  )

  const lightboxImg = lightbox?.images[0]

  return (
    <>
      <nav className={s.nav}>
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
      <div className={s.grid}>
        {filtered.map((o) => (
          <button
            key={o.slug}
            onClick={() => setLightbox(o)}
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
