import Link from 'next/link'
import type { Metadata } from 'next'
import * as s from './not-found.css'

export const metadata: Metadata = {
  title: '404 — Окно закрыто · LuxOkna',
  description: 'Этой страницы нет. Вернитесь на главную.',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  const ticker = Array.from({ length: 18 }, () => '404 · ОКНО ЗАКРЫТО ·').join(' ')
  return (
    <div className={s.wrap}>
      <div className={s.inner}>
        <div>
          <p className={s.meta}>ERR_404 · PAGE NOT FOUND</p>
          <h1 className={s.code}>404</h1>
        </div>
        <div>
          <h2 className={s.title}>Окно закрыто.</h2>
          <p className={s.blurb}>
            Этой страницы у нас нет — возможно, ссылка устарела или адрес введён
            с опечаткой. Загляните на главную или напишите нам в WhatsApp.
          </p>
          <Link className={s.backLink} href="/">
            ← Вернуться на главную
          </Link>
        </div>
      </div>
      <div className={s.ticker} aria-hidden="true">
        <div className={s.tickerTrack}>{ticker}{ticker}</div>
      </div>
    </div>
  )
}
