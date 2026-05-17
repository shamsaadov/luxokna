import { makeMetadata, contactLocalBusinessJsonLd } from '@/lib/seo'
import { seo } from '@/content/seo'
import { company } from '@/content/company'
import { generalFaq } from '@/content/faq'
import { SectionNumber } from '@/components/SectionNumber/SectionNumber'
import { Breadcrumbs } from '@/components/Breadcrumbs/Breadcrumbs'
import * as r from '@/app/styles/responsive.css'

export const metadata = makeMetadata(seo.kontakty, '/kontakty')

export default function Page() {
  const lb = contactLocalBusinessJsonLd()
  return (
    <article className={r.article}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(lb) }}
      />
      <Breadcrumbs
        items={[
          { label: 'Главная', href: '/' },
          { label: 'Контакты' },
        ]}
      />
      <section
        className={r.section}
        style={{ paddingTop: 'clamp(96px, 22vw, 160px)' }}
      >
        <SectionNumber n="∞" title="Контакты" />
      </section>
      <section className={r.section} style={{ paddingTop: 0, paddingBottom: 96 }}>
        <div className={r.grid2}>
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
          <div>
            <div
              style={{
                position: 'relative',
                aspectRatio: '4/3',
                background: 'var(--boneDeep)',
                overflow: 'hidden',
              }}
            >
              <iframe
                src={`https://yandex.ru/map-widget/v1/?ll=${company.coords.lng}%2C${company.coords.lat}&z=15&pt=${company.coords.lng},${company.coords.lat},pm2rdm`}
                loading="lazy"
                title="Карта офиса LuxOkna в Грозном"
                style={{ border: 0, width: '100%', height: '100%' }}
              />
            </div>
            <a
              href={`https://yandex.ru/maps/?ll=${company.coords.lng},${company.coords.lat}&z=15&pt=${company.coords.lng},${company.coords.lat},pm2rdm`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                marginTop: 12,
                fontFamily: 'var(--font-mono)',
                fontSize: 13,
                color: 'var(--sand)',
              }}
            >
              Открыть в Яндекс.Картах →
            </a>
          </div>
        </div>
      </section>

      <section className={r.section} style={{ background: 'var(--paper)' }}>
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
