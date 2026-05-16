import { describe, it, expect } from 'vitest'
import { formatRuPhoneMask, isValidRuPhone, normalizeRuPhone } from '@/lib/phone'

describe('formatRuPhoneMask', () => {
  it('formats partial input', () => {
    expect(formatRuPhoneMask('79881234567')).toBe('+7 (988) 123-45-67')
    expect(formatRuPhoneMask('988')).toBe('+7 (988')
    expect(formatRuPhoneMask('9881')).toBe('+7 (988) 1')
    expect(formatRuPhoneMask('')).toBe('+7 (')
  })

  it('strips non-digits', () => {
    expect(formatRuPhoneMask('+7-988-aaa-12-34')).toBe('+7 (988) 123-4')
  })
})

describe('isValidRuPhone', () => {
  it('accepts valid RU mobile', () => {
    expect(isValidRuPhone('+79881234567')).toBe(true)
    expect(isValidRuPhone('89881234567')).toBe(true)
  })
  it('rejects short', () => {
    expect(isValidRuPhone('+79881234')).toBe(false)
  })
})

describe('normalizeRuPhone', () => {
  it('returns E.164', () => {
    expect(normalizeRuPhone('+7 (988) 123-45-67')).toBe('+79881234567')
    expect(normalizeRuPhone('89881234567')).toBe('+79881234567')
  })
})
