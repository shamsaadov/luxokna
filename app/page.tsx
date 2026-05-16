import Image from 'next/image'
import { makeMetadata } from '@/lib/seo'
import { seo } from '@/content/seo'
import { services } from '@/content/services'
import { objects } from '@/content/objects'
import { process } from '@/content/process'
import { reviews } from '@/content/reviews'
import { ServiceCard } from '@/components/ServiceCard/ServiceCard'
import { ObjectCard } from '@/components/ObjectCard/ObjectCard'
import { Marquee } from '@/components/Marquee/Marquee'
import { SectionNumber } from '@/components/SectionNumber/SectionNumber'

export const metadata = makeMetadata(seo.home, '/')

export default function HomePage() {
  return (
    <article style={{ paddingLeft: 'var(--side, 64px)' }}>
      {/* Hero */}
      <section
        style={{
          minHeight: '92vh',
          display: 'grid',
          gridTemplateColumns: '5fr 7fr',
          alignItems: 'end',
          padding: '160px 64px 64px',
        }}
      >
        <div>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'var(--sand)',
            }}
          >
            16.05.26 · GROZNY 43°N
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 96,
              lineHeight: 1.02,
              fontVariationSettings: '"SOFT" 60, "WONK" 1',
            }}
          >
            Свет.
            <br />
            Тишина.
            <br />
            Стиль.
          </h1>
          <p style={{ marginTop: 24, maxWidth: 420 }}>
            Системы Schüco, Rehau и Alutech в Грозном — премиум-окна, двери, витражи и
            подоконники. Производство в собственном цеху.
          </p>
        </div>
        <div
          style={{
            position: 'relative',
            aspectRatio: '4/5',
            overflow: 'hidden',
            background: 'var(--boneDeep)',
          }}
        >
          <Image
            src="/images/home/hero.jpg"
            alt="Премиум-окна LuxOkna"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 60vw"
            style={{ objectFit: 'cover' }}
          />
        </div>
      </section>

      {/* Tech marquee */}
      <Marquee
        items={[
          'Schüco AWS 75.SI · Uw 0.80 W/m²K',
          '5-камерный профиль · 70 мм',
          'Triple glazing · 4-12-4-12-4',
          'Rehau Brillant-Design',
          'Alutech ALT W72',
          'Монтаж по ГОСТ 30971-2012',
        ]}
      />

      {/* 4 services */}
      <section style={{ padding: '96px 64px' }}>
        <SectionNumber n="01" title="Услуги" />
        <div style={{ marginTop: 48 }}>
          {services.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </section>

      {/* Portfolio strip */}
      <section style={{ padding: '96px 64px', background: 'var(--paper)' }}>
        <SectionNumber n="02" title="Объекты" />
        <div
          style={{
            marginTop: 48,
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 24,
          }}
        >
          {objects.slice(0, 6).map((o) => (
            <ObjectCard key={o.slug} item={o} />
          ))}
        </div>
      </section>

      {/* Process */}
      <section style={{ padding: '96px 64px' }}>
        <SectionNumber n="03" title="Процесс" />
        <ol
          style={{
            marginTop: 48,
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: 24,
          }}
        >
          {process.map((p) => (
            <li key={p.n}>
              <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--copper)' }}>
                {p.n}
              </div>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 24, marginTop: 8 }}>
                {p.title}
              </h4>
              <p style={{ fontSize: 14, color: 'var(--charSoft)', marginTop: 8 }}>{p.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Reviews */}
      <section style={{ padding: '96px 64px', background: 'var(--paper)' }}>
        <SectionNumber n="04" title="Отзывы" />
        <div
          style={{
            marginTop: 48,
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 24,
          }}
        >
          {reviews.slice(0, 6).map((r, i) => (
            <blockquote key={i}>
              <p>«{r.text}»</p>
              <footer
                style={{
                  marginTop: 12,
                  fontFamily: 'var(--font-mono)',
                  fontSize: 12,
                  color: 'var(--sand)',
                }}
              >
                — {r.author}, {r.city}
              </footer>
            </blockquote>
          ))}
        </div>
      </section>
    </article>
  )
}
