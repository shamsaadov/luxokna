'use client'
import gsap from 'gsap'
import { useRef } from 'react'
import { WhatsApp } from '../icons/WhatsApp'
import { company } from '@/content/company'
import { track } from '@/lib/analytics'
import * as s from './WhatsAppFab.css'

export function WhatsAppFab() {
  const ref = useRef<HTMLAnchorElement>(null)

  const move = (e: React.MouseEvent) => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    gsap.to(el, {
      x: (e.clientX - (r.left + r.width / 2)) * 0.25,
      y: (e.clientY - (r.top + r.height / 2)) * 0.25,
      duration: 0.4,
      ease: 'expo.out',
    })
  }

  const leave = () => {
    if (!ref.current) return
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.6, ease: 'expo.out' })
  }

  const url = `https://wa.me/${company.whatsapp}`

  return (
    <a
      ref={ref}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Написать в WhatsApp"
      className={s.root}
      data-cursor
      onMouseMove={move}
      onMouseLeave={leave}
      onClick={() => track('wa_floating_click')}
    >
      <WhatsApp size={28} />
    </a>
  )
}
