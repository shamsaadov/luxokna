export type Segment = 'premium' | 'middle' | 'economy'
export type Material = 'aluminium' | 'pvc'

export const company = {
  name: 'LuxOkna',
  legalName: 'LuxOkna',
  tagline: 'Свет. Тишина. Стиль.',
  city: 'Грозный',
  region: 'Чеченская Республика',
  countryCode: 'RU',
  address: 'г. Грозный, [уточняется]',
  coords: { lat: 43.3168, lng: 45.6981 },
  yearsOnMarket: 20,
  phone: '+79288983897',
  whatsapp: '79288983897',
  instagram: 'luxokna95',
  instagramUrl: 'https://www.instagram.com/luxokna95/',
  hours: 'Пн–Сб 09:00–18:00',
  brands: ['Schüco', 'Rehau', 'Alutech'] as const,
  domain: 'luxokna.ru',
} as const

export type Company = typeof company
