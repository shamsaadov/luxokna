import { describe, it, expect, vi, beforeEach } from 'vitest'

// Capture each registered web-vitals subscriber so we can fire them by hand.
const subscribers: Record<string, (m: { name: string; value: number; rating?: string }) => void> =
  {}

type VitalCb = (m: { name: string; value: number; rating?: string }) => void
vi.mock('web-vitals', () => ({
  onCLS: (cb: VitalCb) => { subscribers.CLS = cb },
  onFCP: (cb: VitalCb) => { subscribers.FCP = cb },
  onLCP: (cb: VitalCb) => { subscribers.LCP = cb },
  onINP: (cb: VitalCb) => { subscribers.INP = cb },
  onTTFB: (cb: VitalCb) => { subscribers.TTFB = cb },
}))

const track = vi.fn()
vi.mock('@/lib/analytics', () => ({ track: (...args: unknown[]) => track(...args) }))

beforeEach(() => {
  track.mockReset()
  for (const k of Object.keys(subscribers)) delete subscribers[k]
})

describe('initVitals', () => {
  it('subscribes to all 5 web-vitals metrics and forwards them to track()', async () => {
    const { initVitals } = await import('@/lib/web-vitals')
    initVitals()

    const names = ['CLS', 'FCP', 'LCP', 'INP', 'TTFB']
    for (const name of names) {
      const sub = subscribers[name]
      expect(sub, `subscribed to ${name}`).toBeTypeOf('function')
      sub?.({ name, value: 123.456, rating: 'good' })
    }

    expect(track).toHaveBeenCalledTimes(5)
    for (const name of names) {
      expect(track).toHaveBeenCalledWith('web_vital', {
        name,
        value: 123,
        rating: 'good',
      })
    }
  })

  it('is a no-op when window is undefined (SSR)', async () => {
    const { initVitals } = await import('@/lib/web-vitals')
    const orig = globalThis.window
    // simulate SSR
    // @ts-expect-error -- intentional delete
    delete globalThis.window
    initVitals()
    expect(track).not.toHaveBeenCalled()
    globalThis.window = orig
  })
})
