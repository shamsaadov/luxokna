import { makeMetadata } from '@/lib/seo'
import { seo } from '@/content/seo'
import { company } from '@/content/company'
import { generalFaq } from '@/content/faq'
import { SectionNumber } from '@/components/SectionNumber/SectionNumber'

export const metadata = makeMetadata(seo.kontakty, '/kontakty')

export default function Page() {
  return (
    <article style={{ paddingLeft: 64 }}>
      <section style={{ padding: '160px 64px 64px' }}>
        <SectionNumber n="∞" title="Контакты" />
      </section>
      <section
        style={{
          padding: '0 64px 96px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 48,
        }}
      >
        <dl style={{ display: 'grid', gap: 24 }}>
          <div>
            <dt
              style={{
                fontFamily: 'var(--font-mono)',
                color: 'var(--sand)',
                fontSize: 13,
                textTransform: 'uppercase',
              }}
            >
              Адрес
            </dt>
            <dd style={{ marginTop: 4 }}>{company.address}</dd>
          </div>
          <div>
            <dt
              style={{
                fontFamily: 'var(--font-mono)',
                color: 'var(--sand)',
                fontSize: 13,
                textTransform: 'uppercase',
              }}
            >
              Телефон
            </dt>
            <dd>
              <a href={`tel:${company.phone}`}>{company.phone}</a>
            </dd>
          </div>
          <div>
            <dt
              style={{
                fontFamily: 'var(--font-mono)',
                color: 'var(--sand)',
                fontSize: 13,
                textTransform: 'uppercase',
              }}
            >
              WhatsApp
            </dt>
            <dd>
              <a href={`https://wa.me/${company.whatsapp}`}>{company.phone}</a>
            </dd>
          </div>
          <div>
            <dt
              style={{
                fontFamily: 'var(--font-mono)',
                color: 'var(--sand)',
                fontSize: 13,
                textTransform: 'uppercase',
              }}
            >
              Instagram
            </dt>
            <dd>
              <a href={company.instagramUrl}>@{company.instagram}</a>
            </dd>
          </div>
          <div>
            <dt
              style={{
                fontFamily: 'var(--font-mono)',
                color: 'var(--sand)',
                fontSize: 13,
                textTransform: 'uppercase',
              }}
            >
              Часы
            </dt>
            <dd>{company.hours}</dd>
          </div>
        </dl>
        <div style={{ aspectRatio: '4/3', background: 'var(--boneDeep)' }}>
          {/* embed Yandex Maps iframe later; placeholder for now */}
        </div>
      </section>

      <section style={{ padding: '96px 64px', background: 'var(--paper)' }}>
        <SectionNumber n="?" title="Частые вопросы" />
        <dl style={{ marginTop: 32, maxWidth: 720 }}>
          {generalFaq.map((f) => (
            <div
              key={f.q}
              style={{ padding: '20px 0', borderTop: '1px solid var(--rule)' }}
            >
              <dt style={{ fontFamily: 'var(--font-display)', fontSize: 24 }}>
                {f.q}
              </dt>
              <dd style={{ marginTop: 8 }}>{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>
    </article>
  )
}
