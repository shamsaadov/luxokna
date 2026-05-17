'use client'
import { useEffect, useRef } from 'react'
import * as s from './ScrollProgress.css'

/**
 * Fixed top hairline that grows in proportion to scroll depth.
 *  - Uses rAF-throttled scroll handler.
 *  - Writes transform: scaleX(progress) on the inner fill.
 *  - Mirrors the value onto data-progress for tests / SR debugging.
 */
export function ScrollProgress() {
  const fillRef = useRef<HTMLDivElement | null>(null)
  const tickingRef = useRef(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const fill = fillRef.current
    if (!fill) return

    const update = () => {
      tickingRef.current = false
      // Some layouts (overflow-x:hidden on html) push the scroll container
      // onto <body> instead of <html>. Take the larger scroll height and the
      // larger scrollTop so the bar tracks whichever element actually scrolls.
      const docHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight,
      )
      const viewport = window.innerHeight
      const max = Math.max(1, docHeight - viewport)
      const y = Math.max(
        window.scrollY,
        document.documentElement.scrollTop,
        document.body.scrollTop,
      )
      const p = Math.min(1, Math.max(0, y / max))
      fill.style.transform = `scaleX(${p})`
      fill.dataset.progress = p.toFixed(4)
    }

    const onScroll = () => {
      if (tickingRef.current) return
      tickingRef.current = true
      requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    document.addEventListener('scroll', onScroll, { passive: true, capture: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      document.removeEventListener('scroll', onScroll, { capture: true } as EventListenerOptions)
    }
  }, [])

  return (
    <div className={s.root} aria-hidden="true">
      <div ref={fillRef} className={s.fill} data-progress="0" data-testid="scroll-progress" />
    </div>
  )
}
