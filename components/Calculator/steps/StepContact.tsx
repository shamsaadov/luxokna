import { useState, type Dispatch } from 'react'
import type { CalcState, Action } from '../types'
import {
  formatRuPhoneMask,
  isValidRuPhone,
  normalizeRuPhone,
} from '@/lib/phone'
import { MessagePreview } from '../MessagePreview'
import { buildWhatsAppUrl, type CalcInput } from '@/lib/whatsapp'
import { track } from '@/lib/analytics'
import * as s from './steps.css'

interface Props {
  state: CalcState
  dispatch: Dispatch<Action>
}

export function StepContact({ state, dispatch }: Props) {
  const [touched, setTouched] = useState(false)
  const phoneValid = isValidRuPhone(state.phone)

  const input: CalcInput | null =
    state.material && state.segment
      ? {
          width: state.width,
          height: state.height,
          material: state.material,
          segment: state.segment,
          name: state.name,
          phone: normalizeRuPhone(state.phone) ?? state.phone,
        }
      : null

  return (
    <>
      <div className={s.field}>
        <label className={s.label} htmlFor="calc-name">
          Имя (необязательно)
        </label>
        <input
          id="calc-name"
          className={s.input}
          value={state.name}
          onChange={(e) => dispatch({ type: 'setName', v: e.target.value })}
        />
      </div>
      <div className={s.field}>
        <label className={s.label} htmlFor="calc-phone">
          Телефон
        </label>
        <input
          id="calc-phone"
          inputMode="tel"
          className={s.input}
          value={formatRuPhoneMask(state.phone)}
          onBlur={() => setTouched(true)}
          onChange={(e) =>
            dispatch({
              type: 'setPhone',
              v: e.target.value.replace(/\D/g, ''),
            })
          }
        />
        {touched && !phoneValid && (
          <span className={s.error}>Введите корректный номер</span>
        )}
      </div>
      {input && (
        <div className={s.field}>
          <span className={s.label}>Сообщение в WhatsApp</span>
          <MessagePreview input={input} />
          <a
            href={phoneValid ? buildWhatsAppUrl(input) : '#'}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              if (!phoneValid) {
                e.preventDefault()
                setTouched(true)
                return
              }
              track('wa_open')
            }}
            style={{
              display: 'inline-block',
              marginTop: 16,
              padding: '12px 24px',
              background: '#A85031',
              color: 'white',
              textDecoration: 'none',
            }}
          >
            Открыть в WhatsApp →
          </a>
        </div>
      )}
    </>
  )
}
