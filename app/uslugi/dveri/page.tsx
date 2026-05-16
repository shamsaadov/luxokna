import Image from 'next/image'
import { getService } from '@/content/services'
import { objects } from '@/content/objects'
import { brands } from '@/content/brands'
import { makeMetadata } from '@/lib/seo'
import { seo } from '@/content/seo'
import { company } from '@/content/company'
import { ObjectCard } from '@/components/ObjectCard/ObjectCard'
import { SectionNumber } from '@/components/SectionNumber/SectionNumber'

const SVC = getService('dveri')!
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: SVC.title,
  provider: { '@type': 'LocalBusiness', name: company.name, telephone: company.phone },
  areaServed: company.city,
  description: SVC.intro,
}
export const metadata = makeMetadata(seo.dveri, '/uslugi/dveri')

export default function Page() {
  const objs = objects.filter((o) => o.service === 'dveri')
  return (
    <article style={{ paddingLeft: 64 }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section style={{ padding: '160px 64px 64px', display: 'grid', gridTemplateColumns: '5fr 7fr', gap: 48 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--copper)' }}>{SVC.number}</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 96, lineHeight: 1.02 }}>{SVC.title}</h1>
          <p style={{ marginTop: 24, maxWidth: 420 }}>{SVC.intro}</p>
        </div>
        <div
          style={{
            position: 'relative',
            aspectRatio: '4/5',
            viewTransitionName: 'service-dveri',
            background: 'var(--boneDeep)',
            overflow: 'hidden',
          } as React.CSSProperties}
        >
          <Image src={SVC.hero.image} alt={SVC.hero.alt} fill priority sizes="(max-width: 768px) 100vw, 60vw" style={{ objectFit: 'cover' }} />
        </div>
      </section>

      <section style={{ padding: '96px 64px' }}>
        <SectionNumber n="A" title="Что входит" />
        <ul style={{ marginTop: 32, columns: 2, columnGap: 48 }}>
          {SVC.bullets.map((b) => <li key={b} style={{ padding: '12px 0', borderTop: '1px solid var(--rule)' }}>{b}</li>)}
        </ul>
      </section>

      <section style={{ padding: '96px 64px', background: 'var(--paper)' }}>
        <SectionNumber n="B" title="Бренды" />
        <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
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
        <section style={{ padding: '96px 64px' }}>
          <SectionNumber n="C" title="Объекты" />
          <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {objs.slice(0, 6).map((o) => <ObjectCard key={o.slug} item={o} />)}
          </div>
        </section>
      )}
    </article>
  )
}
