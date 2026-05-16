import Image from 'next/image'
import { getService } from '@/content/services'
import { objects } from '@/content/objects'
import { brands } from '@/content/brands'
import { makeMetadata } from '@/lib/seo'
import { seo } from '@/content/seo'
import { company } from '@/content/company'
import { ObjectCard } from '@/components/ObjectCard/ObjectCard'
import { SectionNumber } from '@/components/SectionNumber/SectionNumber'
import { blurProps } from '@/lib/blur'
import * as r from '@/app/styles/responsive.css'

const SVC = getService('vitrazhi')!
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: SVC.title,
  provider: { '@type': 'LocalBusiness', name: company.name, telephone: company.phone },
  areaServed: company.city,
  description: SVC.intro,
}
export const metadata = makeMetadata(seo.vitrazhi, '/uslugi/vitrazhi')

export default function Page() {
  const objs = objects.filter((o) => o.service === 'vitrazhi')
  return (
    <article className={r.article}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className={r.hero}>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--copper)' }}>{SVC.number}</div>
          <h1 className={r.heroTitle}>{SVC.title}</h1>
          <p style={{ marginTop: 24, maxWidth: 420 }}>{SVC.intro}</p>
        </div>
        <div
          style={{
            position: 'relative',
            aspectRatio: '4/5',
            viewTransitionName: 'service-vitrazhi',
            background: 'var(--boneDeep)',
            overflow: 'hidden',
            width: '100%',
          } as React.CSSProperties}
        >
          <Image src={SVC.hero.image} alt={SVC.hero.alt} fill priority sizes="(max-width: 640px) 100vw, (max-width: 960px) 50vw, 60vw" style={{ objectFit: 'cover' }} {...blurProps(SVC.hero.image)} />
        </div>
      </section>

      <section className={r.section}>
        <SectionNumber n="A" title="Что входит" />
        <ul className={r.bulletsTwo} style={{ marginTop: 32 }}>
          {SVC.bullets.map((b) => <li key={b} style={{ padding: '12px 0', borderTop: '1px solid var(--rule)' }}>{b}</li>)}
        </ul>
      </section>

      <section className={r.section} style={{ background: 'var(--paper)' }}>
        <SectionNumber n="B" title="Бренды" />
        <div className={r.grid3} style={{ marginTop: 32, gap: 32 }}>
          {brands.map((b) => (
            <div key={b.slug}>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 32 }}>{b.name}</h4>
              <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--sand)' }}>{b.origin}</p>
              <p style={{ marginTop: 8 }}>{b.blurb}</p>
            </div>
          ))}
        </div>
      </section>

      {objs.length > 0 && (
        <section className={r.section}>
          <SectionNumber n="C" title="Объекты" />
          <div className={r.grid3} style={{ marginTop: 32 }}>
            {objs.slice(0, 6).map((o) => <ObjectCard key={o.slug} item={o} />)}
          </div>
        </section>
      )}
    </article>
  )
}
