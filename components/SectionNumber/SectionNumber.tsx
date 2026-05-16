import * as s from './SectionNumber.css'

export function SectionNumber({ n, title }: { n: string; title: string }) {
  return (
    <header className={s.wrap}>
      <span className={s.n}>{n}</span>
      <h2 className={s.title}>{title}</h2>
    </header>
  )
}
