'use client'
import { useEffect } from 'react'
import { initVitals } from '@/lib/web-vitals'

/**
 * Mount-once hook to start reporting Core Web Vitals to analytics.
 * Rendered inside <Chrome /> so it lives for the whole session.
 */
export default function Vitals() {
  useEffect(() => {
    initVitals()
  }, [])
  return null
}
