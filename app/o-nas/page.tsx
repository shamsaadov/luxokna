import { makeMetadata } from '@/lib/seo'
import { seo } from '@/content/seo'
import { company } from '@/content/company'
import { brands } from '@/content/brands'
import { SectionNumber } from '@/components/SectionNumber/SectionNumber'
import * as r from '@/app/styles/responsive.css'

export const metadata = makeMetadata(seo.oNas, '/o-nas')

export default function Page() {
  return (
    <article className={r.article}>
      <section className={r.hero}>
        <div>
          <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--sand)' }}>
            {company.yearsOnMarket}+ ЛЕТ
          </p>
          <h1 className={r.heroTitleSm}>
            Окна — это деталь, но именно через них мы смотрим на мир.
          </h1>
        </div>
        <div>
          <p>
            {company.name} основана в Грозном более {company.yearsOnMarket} лет
            назад. За это время мы остеклили десятки объектов — от частных домов
            до общественных зданий.
          </p>
          <p style={{ marginTop: 16 }}>
            В нашем цехе мы изготавливаем конструкции под объект — от
            стандартных окон до структурных витражей. Работаем только с
            системами Schüco, Rehau и Alutech.
          </p>
        </div>
      </section>

      <section className={r.section} style={{ background: 'var(--paper)' }}>
        <SectionNumber n="01" title="Партнёры-системы" />
        <div className={r.grid3} style={{ marginTop: 32, gap: 48 }}>
          {brands.map((b) => (
            <div key={b.slug}>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 32 }}>
                {b.name}
              </h4>
              <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--sand)' }}>
                {b.origin}
              </p>
              <p style={{ marginTop: 8 }}>{b.blurb}</p>
              <a
                href={b.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  marginTop: 12,
                  display: 'inline-block',
                  borderBottom: '1px solid var(--char)',
                }}
              >
                {b.url.replace('https://', '')} ↗
              </a>
            </div>
          ))}
        </div>
      </section>
    </article>
  )
}
