import type { ServiceSlug } from './services'

export interface ObjectItem {
  slug: string
  title: string
  city: string
  year: number
  service: ServiceSlug
  area: number           // м²
  brand: 'Schüco' | 'Rehau' | 'Alutech' | 'Other'
  segment: 'premium' | 'middle' | 'economy'
  images: { src: string; alt: string; w: number; h: number }[]
  description?: string
}

const pic = (n: number) => ({
  src: `/images/objects/${String(n).padStart(2, '0')}.jpg`,
  alt: 'Объект LuxOkna',
  w: 1200, h: 900,
})

const TITLES = [
  'Жилой комплекс «Грозный-Сити»',
  'Двор мечети «Сердце Чечни»',
  'Частный дом, Грозный-Лощина',
  'Торговый центр «Беркат»',
  'Гостиница «Грозный-Сити»',
  'Школа №14',
  'Офисный центр на Путина',
  'Особняк, Шали',
  'Жилой дом на Дудаева',
  'Бизнес-центр «Кавказ»',
  'Резиденция, Аргун',
  'Спортивный комплекс',
]
const CITIES = ['Грозный', 'Шали', 'Аргун', 'Гудермес']
const SERVICES_ARR = ['okna', 'dveri', 'vitrazhi', 'podokonniki'] as const
const BRANDS = ['Schüco', 'Rehau', 'Alutech'] as const
const SEGMENTS = ['premium', 'middle', 'economy'] as const

export const objects: ObjectItem[] = TITLES.map((title, i) => ({
  slug: `obj-${String(i + 1).padStart(2, '0')}`,
  title,
  city: CITIES[i % CITIES.length]!,
  year: 2020 + (i % 5),
  service: SERVICES_ARR[i % 4]!,
  area: 80 + i * 18,
  brand: BRANDS[i % 3]!,
  segment: SEGMENTS[i % 3]!,
  images: [pic(i + 1)],
}))
