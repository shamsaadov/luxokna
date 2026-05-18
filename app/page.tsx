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
import { StatCounter } from '@/components/StatCounter/StatCounter'
import { company } from '@/content/company'
import { blurMap } from '@/content/blurMap'
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
            aspectRatio: '3/4',
            maxHeight: 560,
            overflow: 'hidden',
            background: 'var(--boneDeep)',
            width: '100%',
            backgroundImage: blurMap['/images/home/hero.jpg']
              ? `url("${blurMap['/images/home/hero.jpg']}")`
              : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <picture>
            <source
              srcSet="/images/home/hero.avif 1x, /images/home/hero@2x.avif 2x"
              type="image/avif"
            />
            <source
              srcSet="/images/home/hero.jpg 1x, /images/home/hero@2x.jpg 2x"
              type="image/jpeg"
            />
            <img
              src="/images/home/hero.jpg"
              alt="Премиум-окна LuxOkna"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </picture>
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

      {/* Trust signals — animated counters */}
      <section
        className={r.section}
        style={{ paddingTop: 64, paddingBottom: 64 }}
        aria-label="Цифры компании"
      >
        <div className={r.grid3}>
          <StatCounter
            value={company.yearsOnMarket}
            suffix="+"
            label="Лет на рынке"
          />
          <StatCounter
            value={objects.length}
            label="Завершённых объектов"
          />
          <StatCounter
            value={objects.reduce((sum, o) => sum + o.area, 0)}
            suffix=" м²"
            label="Остекления"
          />
        </div>
      </section>

      {/* 4 services */}
      <section className={r.section}>
        <SectionNumber n="01" title="Услуги" />
        <div style={{ marginTop: 48 }}>
          {services.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </section>

      {/* Portfolio strip — only 3 highlights on home; full set on /obyekty */}
      <section className={r.section} style={{ background: 'var(--paper)' }}>
        <SectionNumber n="02" title="Объекты" />
        <div className={r.grid3} style={{ marginTop: 48 }}>
          {objects.slice(0, 3).map((o) => (
            <ObjectCard key={o.slug} item={o} />
          ))}
        </div>
        <p style={{ marginTop: 32, fontFamily: 'var(--font-mono)', fontSize: 13, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          <a href="/obyekty" data-cursor style={{ borderBottom: '1px solid var(--char)', paddingBottom: 2 }}>
            Все объекты →
          </a>
        </p>
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
