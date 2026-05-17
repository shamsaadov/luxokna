import { objects } from '@/content/objects'
import { makeMetadata } from '@/lib/seo'
import { seo } from '@/content/seo'
import { SectionNumber } from '@/components/SectionNumber/SectionNumber'
import { Gallery } from '@/components/ObjectGallery/Gallery'
import { Breadcrumbs } from '@/components/Breadcrumbs/Breadcrumbs'
import * as r from '@/app/styles/responsive.css'

export const metadata = makeMetadata(seo.obyekty, '/obyekty')

export default function Page() {
  return (
    <article className={r.article}>
      <Breadcrumbs
        items={[
          { label: 'Главная', href: '/' },
          { label: 'Объекты' },
        ]}
      />
      <section
        className={r.section}
        style={{ paddingTop: 'clamp(96px, 22vw, 160px)' }}
      >
        <SectionNumber n="∞" title="Объекты" />
        <p style={{ marginTop: 24, maxWidth: 600 }}>
          Что мы делали в Грозном и регионе.
        </p>
      </section>
      <Gallery items={objects} />
    </article>
  )
}
