'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import * as s from './Header.css'
import { MagneticButton } from '../MagneticButton/MagneticButton'
import { MobileMenu } from './MobileMenu'

const NAV = [
  { href: '/uslugi/okna', label: 'Окна' },
  { href: '/uslugi/dveri', label: 'Двери' },
  { href: '/uslugi/vitrazhi', label: 'Витражи' },
  { href: '/uslugi/podokonniki', label: 'Подоконники' },
  { href: '/obyekty', label: 'Объекты' },
  { href: '/o-nas', label: 'О нас' },
  { href: '/kontakty', label: 'Контакты' },
]

export function Header({ onCalcOpen }: { onCalcOpen: () => void }) {
  const last = useRef(0)
  const [hidden, setHidden] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setHidden(y > 120 && y > last.current)
      last.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={s.root} data-hidden={hidden || undefined}>
      <Link href="/" className={s.logo} data-cursor>
        LUX·OKNA
      </Link>
      <nav className={s.nav}>
        {NAV.map((n) => {
          const active = pathname === n.href
          return (
            <Link
              key={n.href}
              href={n.href}
              data-cursor
              aria-current={active ? 'page' : undefined}
            >
              {n.label}
            </Link>
          )
        })}
      </nav>
      <div className={s.actions}>
        <div className={s.cta}>
          <MagneticButton onClick={onCalcOpen}>Рассчитать</MagneticButton>
        </div>
        <MobileMenu items={NAV} onCalcOpen={onCalcOpen} />
      </div>
    </header>
  )
}
