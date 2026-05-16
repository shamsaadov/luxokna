import * as r from './styles/responsive.css'
import * as s from './loading.css'

export default function Loading() {
  return (
    <article className={r.article} aria-busy="true" aria-live="polite">
      <section className={r.hero}>
        <div>
          <div className={s.meta} />
          <div className={s.hero} />
        </div>
        <div className={s.hero} />
      </section>
      <section className={r.section}>
        <div className={r.grid3}>
          <div className={s.card} />
          <div className={s.card} />
          <div className={s.card} />
        </div>
      </section>
    </article>
  )
}
