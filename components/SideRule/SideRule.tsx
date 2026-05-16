'use client'
import { useEffect, useState } from 'react'
import * as s from './SideRule.css'

export function SideRule({ section }: { section: string }) {
  const [date, setDate] = useState('')

  useEffect(() => {
    const d = new Date()
    const dd = String(d.getDate()).padStart(2, '0')
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const yy = String(d.getFullYear()).slice(-2)
    setDate(`${dd}.${mm}.${yy}`)
  }, [])

  return (
    <aside className={s.root} aria-hidden>
      <span className={s.text}>
        {section} / GROZNY / {date}
      </span>
    </aside>
  )
}
