import { describe, it, expect } from 'vitest'
import { buildWhatsAppMessage, buildWhatsAppUrl } from '@/lib/whatsapp'

const sample = {
  width: 1200, height: 1400,
  material: 'pvc' as const,
  segment: 'schuco-rehau' as const,
  name: 'Саид',
  phone: '+79881234567',
}

describe('buildWhatsAppMessage', () => {
  it('contains all fields', () => {
    const msg = buildWhatsAppMessage(sample)
    expect(msg).toContain('1 200 × 1 400 мм')
    expect(msg).toContain('1.68 м²')
    expect(msg).toContain('ПВХ')
    expect(msg).toContain('Schüco / Rehau')
    expect(msg).toContain('Саид')
    expect(msg).toContain('+7 (988) 123-45-67')
    expect(msg).toContain('luxokna.ru')
  })

  it('omits name line when missing', () => {
    const msg = buildWhatsAppMessage({ ...sample, name: '' })
    expect(msg).not.toContain('Имя:')
  })
})

describe('buildWhatsAppUrl', () => {
  it('produces wa.me link with encoded text', () => {
    const url = buildWhatsAppUrl(sample)
    expect(url.startsWith('https://wa.me/79288983897?text=')).toBe(true)
    const decoded = decodeURIComponent(url.split('?text=')[1]!)
    expect(decoded).toContain('1 200 × 1 400 мм')
  })
})
