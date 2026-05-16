import { company } from './company'

export interface PageSeo {
  title: string
  description: string
  ogImage?: string
}

const og = (slug: string) => `https://${company.domain}/og/${slug}`

export const seo = {
  home: {
    title: `${company.name} — Окна Schüco, Rehau, Alutech в Грозном`,
    description: `Премиум-окна, двери, витражи и подоконники в Грозном. ${company.yearsOnMarket}+ лет на рынке, собственный цех, монтаж по ГОСТ.`,
    ogImage: og('home'),
  },
  okna: {
    title: `Окна Schüco / Rehau / Alutech — ${company.city} · ${company.name}`,
    description: 'Алюминиевые и ПВХ-окна премиум-сегмента. Замер, производство, монтаж.',
    ogImage: og('okna'),
  },
  dveri: {
    title: `Двери алюминиевые и ПВХ — ${company.city} · ${company.name}`,
    description: 'Входные и балконные двери. Alutech, Schüco, Rehau. Любые конфигурации.',
    ogImage: og('dveri'),
  },
  vitrazhi: {
    title: `Витражи и алюминиевые фасады — ${company.city} · ${company.name}`,
    description: 'Стоечно-ригельные и структурные фасады. Schüco FWS, высота до 6 м.',
    ogImage: og('vitrazhi'),
  },
  podokonniki: {
    title: `Подоконники из камня и кварца — ${company.city} · ${company.name}`,
    description: 'Натуральный камень, кварц, массив. Раскрой ЧПУ и установка.',
    ogImage: og('podokonniki'),
  },
  obyekty: {
    title: `Объекты ${company.name} — портфолио`,
    description: 'Завершённые объекты по окнам, дверям, витражам и подоконникам.',
    ogImage: og('home'),
  },
  oNas: {
    title: `О компании ${company.name}`,
    description: `${company.yearsOnMarket}+ лет на рынке премиум-окон. Собственный цех, авторизованный монтаж.`,
    ogImage: og('home'),
  },
  kontakty: {
    title: `Контакты ${company.name} — Грозный`,
    description: `Адрес, телефон, WhatsApp. ${company.hours}.`,
    ogImage: og('home'),
  },
} as const satisfies Record<string, PageSeo>
