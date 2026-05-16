import { parsePhoneNumberFromString } from 'libphonenumber-js/min'

export function formatRuPhoneMask(input: string): string {
  const digits = input.replace(/\D/g, '').replace(/^[78]/, '')
  const d = digits.slice(0, 10)
  let out = '+7 ('
  if (d.length === 0) return out
  out += d.slice(0, 3)
  if (d.length > 3) out += ')'
  if (d.length > 3) out += ' ' + d.slice(3, 6)
  if (d.length > 6) out += '-' + d.slice(6, 8)
  if (d.length > 8) out += '-' + d.slice(8, 10)
  return out
}

export function normalizeRuPhone(input: string): string | null {
  const p = parsePhoneNumberFromString(input, 'RU')
  return p?.isValid() ? p.number : null
}

export function isValidRuPhone(input: string): boolean {
  return normalizeRuPhone(input) !== null
}
