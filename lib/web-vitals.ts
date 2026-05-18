'use client'
import { onCLS, onFCP, onLCP, onINP, onTTFB } from 'web-vitals'
import { track } from './analytics'

interface Metric {
  name: string
  value: number
  rating?: string
}

/**
 * Subscribe to Core Web Vitals and forward each measurement to the analytics
 * `track()` helper, which fans out to Yandex.Metrika + GA.
 *
 * Safe to call multiple times — `web-vitals` callbacks are de-duped internally
 * per metric per page load. No-op on the server.
 */
export function initVitals(): void {
  if (typeof window === 'undefined') return
  const report = (m: Metric) =>
    track('web_vital', {
      name: m.name,
      value: Math.round(m.value),
      rating: m.rating,
    })
  onCLS(report)
  onFCP(report)
  onLCP(report)
  onINP(report)
  onTTFB(report)
}
