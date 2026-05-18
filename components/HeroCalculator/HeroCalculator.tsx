'use client'
import { useMemo, useState } from 'react'
import { buildWhatsAppUrl, type Material, type Segment } from '@/lib/whatsapp'
import { formatRuPhoneMask, isValidRuPhone, normalizeRuPhone } from '@/lib/phone'
import { track } from '@/lib/analytics'
import * as s from './HeroCalculator.css'

const MATERIALS: { v: Material; label: string }[] = [
  { v: 'pvc', label: 'ПВХ' },
  { v: 'aluminium', label: 'Алюминий' },
]
const SEGMENTS: { v: Segment; label: string }[] = [
  { v: 'alutech', label: 'Alutech' },
  { v: 'schuco-rehau', label: 'Schüco / Rehau' },
  { v: 'economy', label: 'Эконом' },
]

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n))

export function HeroCalculator() {
  const [width, setWidth] = useState(1200)
  const [height, setHeight] = useState(1400)
  const [material, setMaterial] = useState<Material>('pvc')
  const [segment, setSegment] = useState<Segment>('schuco-rehau')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [touched, setTouched] = useState(false)

  const area = useMemo(() => ((width * height) / 1_000_000).toFixed(2), [width, height])
  const phoneValid = isValidRuPhone(phone)
  const canSubmit = phoneValid

  const handleSubmit = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!canSubmit) {
      e.preventDefault()
      setTouched(true)
      return
    }
    track('hero_calc_submit', { material, segment })
    track('wa_open')
  }

  const url = canSubmit
    ? buildWhatsAppUrl({
        width,
        height,
        material,
        segment,
        name,
        phone: normalizeRuPhone(phone) ?? phone,
      })
    : '#'

  return (
    <form className={s.card} onSubmit={(e) => e.preventDefault()} aria-label="Калькулятор заявки">
      <header className={s.title}>
        <span>Расчёт за минуту</span>
        <span className={s.area}>{area} м²</span>
      </header>

      <div className={s.row}>
        <div className={s.field}>
          <label className={s.label} htmlFor="hc-w">Ширина, мм</label>
          <input
            id="hc-w"
            className={s.input}
            type="number"
            inputMode="numeric"
            min={300}
            max={6000}
            step={50}
            value={width}
            onChange={(e) => setWidth(clamp(Number(e.target.value) || 0, 300, 6000))}
          />
        </div>
        <div className={s.field}>
          <label className={s.label} htmlFor="hc-h">Высота, мм</label>
          <input
            id="hc-h"
            className={s.input}
            type="number"
            inputMode="numeric"
            min={300}
            max={6000}
            step={50}
            value={height}
            onChange={(e) => setHeight(clamp(Number(e.target.value) || 0, 300, 6000))}
          />
        </div>
      </div>

      <div className={s.field}>
        <span className={s.label}>Материал</span>
        <div className={s.optionsRow} role="radiogroup" aria-label="Материал">
          {MATERIALS.map((m) => (
            <button
              key={m.v}
              type="button"
              className={s.chip}
              data-active={material === m.v}
              onClick={() => setMaterial(m.v)}
              role="radio"
              aria-checked={material === m.v}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <div className={s.field}>
        <span className={s.label}>Сегмент</span>
        <div className={s.optionsRow} role="radiogroup" aria-label="Сегмент">
          {SEGMENTS.map((sg) => (
            <button
              key={sg.v}
              type="button"
              className={s.chip}
              data-active={segment === sg.v}
              onClick={() => setSegment(sg.v)}
              role="radio"
              aria-checked={segment === sg.v}
            >
              {sg.label}
            </button>
          ))}
        </div>
      </div>

      <div className={s.row}>
        <div className={s.field}>
          <label className={s.label} htmlFor="hc-name">Имя (необяз.)</label>
          <input
            id="hc-name"
            className={s.inputPhone}
            type="text"
            autoComplete="given-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={s.field}>
          <label className={s.label} htmlFor="hc-phone">Телефон</label>
          <input
            id="hc-phone"
            className={s.inputPhone}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+7 (___) ___-__-__"
            value={formatRuPhoneMask(phone)}
            onBlur={() => setTouched(true)}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
          />
          {touched && !phoneValid && <span className={s.error}>Введите номер</span>}
        </div>
      </div>

      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={s.submit}
        aria-disabled={!canSubmit}
        onClick={handleSubmit}
      >
        Открыть в WhatsApp →
      </a>

      <p className={s.hint}>
        Не оставляем дозвоны автоматически. Сообщение придёт в WhatsApp компании
        с уже заполненными параметрами проёма.
      </p>
    </form>
  )
}
