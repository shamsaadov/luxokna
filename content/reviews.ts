export interface Review {
  author: string
  city: string
  text: string
  rating: 1 | 2 | 3 | 4 | 5
  source: 'instagram' | 'whatsapp' | 'site' | '2gis'
}

export const reviews: Review[] = [
  { author: 'Хава М.', city: 'Грозный', text: 'Поставили окна Schüco в квартиру — тише не бывает.', rating: 5, source: 'instagram' },
  { author: 'Адам И.', city: 'Аргун', text: 'Витражи на веранду сделали идеально. Замер, монтаж — всё чётко.', rating: 5, source: '2gis' },
  { author: 'Зара А.', city: 'Грозный', text: 'Подоконник из гранита — красиво и дорого выглядит.', rating: 5, source: 'instagram' },
  { author: 'Магомед-С. Б.', city: 'Шали', text: 'Двери Alutech, держат мороз отлично.', rating: 5, source: 'whatsapp' },
  { author: 'Ислам Х.', city: 'Грозный', text: 'Цех своими глазами видел. Делают на совесть.', rating: 5, source: 'site' },
  { author: 'Малика Т.', city: 'Гудермес', text: 'Менеджеры приехали в день обращения, замер бесплатно.', rating: 5, source: 'instagram' },
]
