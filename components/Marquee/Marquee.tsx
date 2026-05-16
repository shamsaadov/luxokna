import * as s from './Marquee.css'

export function Marquee({ items }: { items: string[] }) {
  const doubled = [...items, ...items]
  return (
    <div className={s.wrap} aria-hidden>
      <div className={s.track}>
        {doubled.map((t, i) => (
          <span key={i} className={s.item}>
            <span>{t}</span>
            <span>·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
