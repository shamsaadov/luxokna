import * as r from '@/app/styles/responsive.css'
import * as s from '@/app/loading.css'

export default function Loading() {
  return (
    <article className={r.article} aria-busy="true" aria-live="polite">
      <section className={r.hero}>
        <div>
          <div className={s.meta} />
          <div className={s.hero} />
        </div>
      </section>
      <section className={r.section}>
        <div className={r.grid3}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className={s.card} />
          ))}
        </div>
      </section>
    </article>
  )
}
