import Link from 'next/link'
import * as s from './Footer.css'
import { company } from '@/content/company'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className={s.root}>
      <div className={s.grid}>
        <div>
          <div className={s.colTitle}>{company.name}</div>
          <p>{company.tagline}</p>
          <p>{company.yearsOnMarket}+ лет на рынке премиум-окон</p>
        </div>
        <div>
          <div className={s.colTitle}>Услуги</div>
          <ul>
            <li>
              <Link href="/uslugi/okna" data-cursor>
                Окна
              </Link>
            </li>
            <li>
              <Link href="/uslugi/dveri" data-cursor>
                Двери
              </Link>
            </li>
            <li>
              <Link href="/uslugi/vitrazhi" data-cursor>
                Витражи
              </Link>
            </li>
            <li>
              <Link href="/uslugi/podokonniki" data-cursor>
                Подоконники
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <div className={s.colTitle}>Компания</div>
          <ul>
            <li>
              <Link href="/obyekty" data-cursor>
                Объекты
              </Link>
            </li>
            <li>
              <Link href="/o-nas" data-cursor>
                О нас
              </Link>
            </li>
            <li>
              <Link href="/kontakty" data-cursor>
                Контакты
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <div className={s.colTitle}>Контакты</div>
          <p>{company.address}</p>
          <p>{company.hours}</p>
          <p>
            <a href={`tel:${company.phone}`} data-cursor>
              {company.phone}
            </a>
          </p>
          <p>
            <a href={company.instagramUrl} data-cursor>
              @{company.instagram}
            </a>
          </p>
        </div>
      </div>
      <div className={s.bottom}>
        <span>
          © {year} {company.name}
        </span>
        <span>{company.city}</span>
      </div>
    </footer>
  )
}
