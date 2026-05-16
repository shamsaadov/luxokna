import { describe, it, expect } from 'vitest'
import {
  shouldCloseOnSwipe,
  dragTranslate,
  SWIPE_CLOSE_DX,
  SWIPE_MAX_DY,
} from '@/components/Calculator/swipe'

describe('shouldCloseOnSwipe', () => {
  it('closes on a clean right swipe past the threshold', () => {
    expect(shouldCloseOnSwipe(SWIPE_CLOSE_DX + 1, 10)).toBe(true)
    expect(shouldCloseOnSwipe(200, 0)).toBe(true)
  })

  it('does not close for short or left swipes', () => {
    expect(shouldCloseOnSwipe(SWIPE_CLOSE_DX, 0)).toBe(false)
    expect(shouldCloseOnSwipe(40, 0)).toBe(false)
    expect(shouldCloseOnSwipe(-120, 0)).toBe(false)
  })

  it('rejects gestures that are mostly vertical', () => {
    expect(shouldCloseOnSwipe(120, SWIPE_MAX_DY)).toBe(false)
    expect(shouldCloseOnSwipe(120, 90)).toBe(false)
    expect(shouldCloseOnSwipe(120, -90)).toBe(false)
  })
})

describe('dragTranslate', () => {
  it('returns the raw rightward delta', () => {
    expect(dragTranslate(50, 5)).toBe(50)
    expect(dragTranslate(200, -20)).toBe(200)
  })

  it('returns 0 when dragging left or vertical', () => {
    expect(dragTranslate(-100, 0)).toBe(0)
    expect(dragTranslate(0, 0)).toBe(0)
    expect(dragTranslate(60, 200)).toBe(0)
  })
})
