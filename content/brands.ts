export interface Brand {
  slug: 'schuco' | 'rehau' | 'alutech'
  name: string
  origin: string
  segment: ('premium' | 'middle' | 'economy')[]
  blurb: string
  url: string
}

export const brands: Brand[] = [
  { slug: 'schuco', name: 'Schüco', origin: 'Германия, 1951', segment: ['premium', 'middle'], blurb: 'Архитектурные системы алюминия и ПВХ. Стандарт для премиум-объектов.', url: 'https://www.schueco.com' },
  { slug: 'rehau', name: 'Rehau', origin: 'Германия, 1948', segment: ['premium', 'middle'], blurb: 'ПВХ-профили с многокамерной структурой.', url: 'https://www.rehau.com' },
  { slug: 'alutech', name: 'Alutech', origin: 'Беларусь, 1996', segment: ['premium'], blurb: 'Алюминиевые системы премиум-сегмента.', url: 'https://www.alutech-group.com' },
]
