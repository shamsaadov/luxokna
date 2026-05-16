'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import * as s from './Cursor.css'

export function Cursor() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (matchMedia('(hover: none)').matches) return
    const el = ref.current
    if (!el) return

    const move = (e: MouseEvent) =>
      gsap.to(el, { x: e.clientX, y: e.clientY, duration: 0.25, ease: 'expo.out' })

    const over = (e: MouseEvent) => {
      const hot = !!(e.target as HTMLElement).closest('[data-cursor]')
      el.dataset.hot = String(hot)
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
    }
  }, [])

  return <div ref={ref} className={s.root} />
}
