import { objects } from '@/content/objects'
import { makeMetadata } from '@/lib/seo'
import { seo } from '@/content/seo'
import { SectionNumber } from '@/components/SectionNumber/SectionNumber'
import { Gallery } from '@/components/ObjectGallery/Gallery'

export const metadata = makeMetadata(seo.obyekty, '/obyekty')

export default function Page() {
  return (
    <article style={{ paddingLeft: 64 }}>
      <section style={{ padding: '160px 64px 64px' }}>
        <SectionNumber n="∞" title="Объекты" />
        <p style={{ marginTop: 24, maxWidth: 600 }}>
          Что мы делали в Грозном и регионе.
        </p>
      </section>
      <Gallery items={objects} />
    </article>
  )
}
