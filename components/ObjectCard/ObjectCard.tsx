import Image from 'next/image'
import type { CSSProperties } from 'react'
import type { ObjectItem } from '@/content/objects'
import { blurProps } from '@/lib/blur'
import * as s from './ObjectCard.css'

export function ObjectCard({ item }: { item: ObjectItem }) {
  const img = item.images[0]
  if (!img) return null

  return (
    <article className={s.root}>
      <div
        className={s.media}
        style={{ viewTransitionName: `object-${item.slug}` } as CSSProperties}
      >
        <Image
          src={img.src}
          alt={img.alt}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 50vw, 25vw"
          {...blurProps(img.src)}
        />
      </div>
      <div className={s.meta}>
        <span>
          {item.city} · {item.year}
        </span>
        <span>{item.area} м²</span>
      </div>
      <h4 className={s.title}>{item.title}</h4>
    </article>
  )
}
