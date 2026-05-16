import Link from 'next/link'
import Image from 'next/image'
import type { CSSProperties } from 'react'
import type { Service } from '@/content/services'
import * as s from './ServiceCard.css'

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/uslugi/${service.slug}`}
      className={s.root}
      data-cursor
      style={{ viewTransitionName: `service-${service.slug}` } as CSSProperties}
    >
      <div className={s.head}>
        <span className={s.n}>{service.number}</span>
        <span className={s.tag}>{service.tagline}</span>
      </div>
      <h3 className={s.title}>{service.title}</h3>
      <div className={s.media}>
        <Image
          src={service.hero.image}
          alt={service.hero.alt}
          fill
          style={{ objectFit: 'cover' }}
          sizes="100vw"
        />
      </div>
    </Link>
  )
}
