import { company } from '@/content/company'
import { formatRuPhoneMask } from './phone'

export type Material = 'aluminium' | 'pvc'
export type Segment = 'alutech' | 'schuco-rehau' | 'economy'

export interface CalcInput {
  width: number   // мм
  height: number  // мм
  material: Material
  segment: Segment
  name: string
  phone: string   // E.164
}

const MATERIAL_LABEL: Record<Material, string> = {
  aluminium: 'Алюминий',
  pvc: 'ПВХ',
}

const SEGMENT_LABEL: Record<Segment, string> = {
  alutech: 'Alutech (премиум)',
  'schuco-rehau': 'Schüco / Rehau (премиум/средний)',
  economy: 'Эконом',
}

const fmtMm = (n: number) => n.toLocaleString('ru-RU').replace(/ /g, ' ')
const fmtM2 = (mm2: number) => (mm2 / 1_000_000).toFixed(2)

export function buildWhatsAppMessage(input: CalcInput): string {
  const area = fmtM2(input.width * input.height)
  const lines = [
    'Здравствуйте! Хочу рассчитать остекление:',
    '',
    `• Проём: ${fmtMm(input.width)} × ${fmtMm(input.height)} мм (${area} м²)`,
    `• Материал: ${MATERIAL_LABEL[input.material]}`,
    `• Сегмент: ${SEGMENT_LABEL[input.segment]}`,
  ]
  if (input.name.trim()) lines.push(`• Имя: ${input.name.trim()}`)
  lines.push(`• Телефон: ${formatRuPhoneMask(input.phone)}`)
  lines.push('', `Отправлено через ${company.domain}`)
  return lines.join('\n')
}

export function buildWhatsAppUrl(input: CalcInput): string {
  const text = encodeURIComponent(buildWhatsAppMessage(input))
  return `https://wa.me/${company.whatsapp}?text=${text}`
}
