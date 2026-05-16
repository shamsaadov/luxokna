'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Close } from '../icons/Close'
import { Menu } from '../icons/Menu'
import * as s from './MobileMenu.css'
import { company } from '@/content/company'

interface NavItem {
  href: string
  label: string
}

interface Props {
  items: NavItem[]
  onCalcOpen: () => void
}

export function MobileMenu({ items, onCalcOpen }: Props) {
  const [open, setOpen] = useState(false)

  // Lock body scroll while open, and close on ESC.
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <button
        type="button"
        className={s.trigger}
        aria-label="Открыть меню"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        <Menu />
      </button>
      {open && (
        <div className={s.overlay} role="dialog" aria-modal="true" aria-label="Меню">
          <div className={s.top}>
            <Link href="/" className={s.brand} onClick={() => setOpen(false)}>
              LUX·OKNA
            </Link>
            <span />
            <button
              type="button"
              className={s.closeBtn}
              aria-label="Закрыть меню"
              onClick={() => setOpen(false)}
            >
              <Close />
            </button>
          </div>
          <nav className={s.nav}>
            {items.map((n, i) => (
              <Link
                key={n.href}
                href={n.href}
                className={s.link}
                onClick={() => setOpen(false)}
                style={{ animationDelay: `${40 * i}ms` }}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className={s.bottom}>
            <span className={s.meta}>{company.phone}</span>
            <button
              type="button"
              className={s.ctaBtn}
              onClick={() => {
                setOpen(false)
                onCalcOpen()
              }}
            >
              Рассчитать проём
            </button>
          </div>
        </div>
      )}
    </>
  )
}
