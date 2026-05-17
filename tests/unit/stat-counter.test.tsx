import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, act } from '@testing-library/react'
import { StatCounter } from '@/components/StatCounter/StatCounter'

type IOEntry = Pick<IntersectionObserverEntry, 'isIntersecting' | 'intersectionRatio'>
type IOCallback = (entries: IOEntry[]) => void

class FakeIntersectionObserver {
  static current: FakeIntersectionObserver | null = null
  callback: IOCallback
  constructor(cb: IOCallback) {
    this.callback = cb
    FakeIntersectionObserver.current = this
  }
  observe() {}
  unobserve() {}
  disconnect() {}
  trigger(ratio: number) {
    this.callback([{ isIntersecting: ratio >= 0.5, intersectionRatio: ratio }])
  }
}

describe('StatCounter', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    // jsdom doesn't ship IntersectionObserver — install our fake.
    ;(globalThis as unknown as { IntersectionObserver: typeof IntersectionObserver }).IntersectionObserver =
      FakeIntersectionObserver as unknown as typeof IntersectionObserver
    // Make sure prefers-reduced-motion is OFF so the counter actually animates.
    window.matchMedia = ((q: string) =>
      ({
        matches: false,
        media: q,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
      })) as typeof window.matchMedia
    // Drive requestAnimationFrame off setTimeout so fake timers can advance it.
    let now = 0
    vi.spyOn(performance, 'now').mockImplementation(() => now)
    vi.stubGlobal(
      'requestAnimationFrame',
      ((cb: FrameRequestCallback) =>
        setTimeout(() => {
          now += 16
          cb(now)
        }, 16) as unknown as number) as typeof requestAnimationFrame,
    )
    vi.stubGlobal(
      'cancelAnimationFrame',
      ((id: number) => clearTimeout(id)) as typeof cancelAnimationFrame,
    )
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
    FakeIntersectionObserver.current = null
  })

  it('animates from 0 → value when scrolled into view, suffix included', () => {
    const { container } = render(
      <StatCounter value={20} suffix="+" label="Лет на рынке" duration={500} />,
    )

    // Initial: 0
    const valueEl = container.querySelector('[aria-label]') as HTMLElement | null
    expect(valueEl).not.toBeNull()
    expect(valueEl!.textContent ?? '').toMatch(/^0\+/)

    // Fire intersection (50%+ visible).
    const io = FakeIntersectionObserver.current
    expect(io).not.toBeNull()
    act(() => {
      io!.trigger(1)
    })

    // Advance well past the 500ms duration so easing settles at 1.0.
    act(() => {
      vi.advanceTimersByTime(2000)
    })

    expect(valueEl!.textContent ?? '').toContain('20')
    expect(valueEl!.textContent ?? '').toContain('+')
  })

  it('respects prefers-reduced-motion (shows final value immediately)', () => {
    window.matchMedia = ((q: string) =>
      ({
        matches: q.includes('reduce'),
        media: q,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
      })) as typeof window.matchMedia

    const { container } = render(
      <StatCounter value={42} label="Объектов" duration={500} />,
    )
    const valueEl = container.querySelector('[aria-label]') as HTMLElement | null
    expect(valueEl!.textContent ?? '').toContain('42')
  })
})
