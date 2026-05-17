'use client'

import { useEffect, useRef, useState } from 'react'
import * as s from './StatCounter.css'

export interface StatCounterProps {
  value: number
  /** Visual suffix appended to the number, e.g. '+', ' м²', ' лет'. */
  suffix?: string
  label: string
  /** Animation length, ms. Default 1500. */
  duration?: number
}

/** easeOutExpo — fast at the start, settles smoothly at the end. */
const easeOutExpo = (t: number): number => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Animated counter that starts ticking 0 → `value` the first time it scrolls
 * 50%+ into view. Respects prefers-reduced-motion (jumps to final value).
 */
export function StatCounter({ value, suffix = '', label, duration = 1500 }: StatCounterProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const startedRef = useRef(false)
  const rafRef = useRef<number | null>(null)
  const [display, setDisplay] = useState<number>(0)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const node = ref.current
    if (!node) return

    // Reduced motion: skip animation, show final value immediately.
    if (prefersReducedMotion()) {
      setDisplay(value)
      return
    }

    // Fallback for environments without IntersectionObserver (very old + jsdom).
    if (typeof IntersectionObserver === 'undefined') {
      setDisplay(value)
      return
    }

    const start = () => {
      if (startedRef.current) return
      startedRef.current = true
      setRunning(true)
      const t0 = performance.now()
      const tick = (now: number) => {
        const elapsed = now - t0
        const t = Math.min(1, elapsed / duration)
        const eased = easeOutExpo(t)
        setDisplay(Math.round(value * eased))
        if (t < 1) {
          rafRef.current = requestAnimationFrame(tick)
        } else {
          rafRef.current = null
          setRunning(false)
        }
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && e.intersectionRatio >= 0.5) {
            start()
            io.disconnect()
            break
          }
        }
      },
      { threshold: [0, 0.5, 1] },
    )
    io.observe(node)

    return () => {
      io.disconnect()
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [value, duration])

  return (
    <div ref={ref} className={s.root}>
      <div
        className={`${s.value} ${running ? s.valueRunning : ''}`}
        aria-label={`${value}${suffix} ${label}`}
      >
        <span>{display.toLocaleString('ru-RU')}</span>
        {suffix && <span className={s.suffix}>{suffix}</span>}
      </div>
      <div className={s.label}>{label}</div>
    </div>
  )
}
