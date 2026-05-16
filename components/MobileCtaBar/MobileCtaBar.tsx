'use client'
import { useEffect, useState } from 'react'
import * as s from './MobileCtaBar.css'

interface Props {
  onCalcOpen: () => void
  /** Hide while another overlay (calculator, menu) is open. */
  hidden?: boolean
}

/**
 * Fixed bottom CTA bar shown only on mobile (<640px).
 * Appears after the user has scrolled past the hero (~400px) so it
 * doesn't fight the initial fold.
 */
export function MobileCtaBar({ onCalcOpen, hidden }: Props) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const visible = show && !hidden

  return (
    <div className={s.root} data-visible={visible || undefined} aria-hidden={!visible}>
      <div>
        <div className={s.label}>Рассчитать проём</div>
        <div className={s.sub}>За 60 секунд · 4 шага</div>
      </div>
      <button type="button" className={s.btn} onClick={onCalcOpen}>
        Открыть
      </button>
    </div>
  )
}
