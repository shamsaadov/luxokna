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
import { blurProps } from '@/lib/blur'
import * as r from './styles/responsive.css'

export const metadata = makeMetadata(seo.home, '/')

export default function HomePage() {
  return (
    <article className={r.article}>
      {/* Hero */}
      <section className={r.hero}>
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
          <h1 className={r.heroTitle}>
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
            width: '100%',
          }}
        >
          <Image
            src="/images/home/hero.jpg"
            alt="Премиум-окна LuxOkna"
            fill
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 960px) 50vw, 60vw"
            style={{ objectFit: 'cover' }}
            {...blurProps('/images/home/hero.jpg')}
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
      <section className={r.section}>
        <SectionNumber n="01" title="Услуги" />
        <div style={{ marginTop: 48 }}>
          {services.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </section>

      {/* Portfolio strip */}
      <section className={r.section} style={{ background: 'var(--paper)' }}>
        <SectionNumber n="02" title="Объекты" />
        <div className={r.grid3} style={{ marginTop: 48 }}>
          {objects.slice(0, 6).map((o) => (
            <ObjectCard key={o.slug} item={o} />
          ))}
        </div>
      </section>

      {/* Process */}
      <section className={r.section}>
        <SectionNumber n="03" title="Процесс" />
        <ol className={r.grid5} style={{ marginTop: 48 }}>
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
      <section className={r.section} style={{ background: 'var(--paper)' }}>
        <SectionNumber n="04" title="Отзывы" />
        <div className={r.grid3} style={{ marginTop: 48 }}>
          {reviews.slice(0, 6).map((rv, i) => (
            <blockquote key={i}>
              <p>«{rv.text}»</p>
              <footer
                style={{
                  marginTop: 12,
                  fontFamily: 'var(--font-mono)',
                  fontSize: 12,
                  color: 'var(--sand)',
                }}
              >
                — {rv.author}, {rv.city}
              </footer>
            </blockquote>
          ))}
        </div>
      </section>
    </article>
  )
}
