'use client'
import { useRef } from 'react'
import gsap from 'gsap'
import * as s from './MagneticButton.css'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  strength?: number
}

export function MagneticButton({
  strength = 0.35,
  className,
  children,
  ...rest
}: Props) {
  const ref = useRef<HTMLButtonElement>(null)

  const move = (e: React.MouseEvent) => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - (r.left + r.width / 2)) * strength
    const y = (e.clientY - (r.top + r.height / 2)) * strength
    gsap.to(el, { x, y, duration: 0.4, ease: 'expo.out' })
  }

  const leave = () => {
    if (!ref.current) return
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.6, ease: 'expo.out' })
  }

  return (
    <button
      ref={ref}
      onMouseMove={move}
      onMouseLeave={leave}
      className={[s.root, className].filter(Boolean).join(' ')}
      data-cursor
      {...rest}
    >
      {children}
    </button>
  )
}
