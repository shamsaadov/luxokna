export interface ProcessStep {
  n: string
  title: string
  body: string
}

export const process: ProcessStep[] = [
  { n: '01', title: 'Заявка', body: 'Звонок или WhatsApp. Уточняем задачу.' },
  { n: '02', title: 'Замер', body: 'Бесплатный выезд инженера на объект.' },
  { n: '03', title: 'Смета', body: 'Подбор системы и расчёт под бюджет.' },
  { n: '04', title: 'Производство', body: 'Изготовление в собственном цеху, 5–14 дней.' },
  { n: '05', title: 'Монтаж', body: 'Установка по ГОСТ 30971-2012 и пуско-наладка.' },
]
