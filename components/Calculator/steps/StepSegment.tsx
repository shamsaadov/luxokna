import type { Dispatch } from 'react'
import type { CalcState, Action, Segment } from '../types'
import * as s from './steps.css'

interface Props {
  state: CalcState
  dispatch: Dispatch<Action>
}

const OPTIONS: ReadonlyArray<{ v: Segment; title: string; sub: string }> = [
  {
    v: 'alutech',
    title: 'Alutech',
    sub: 'Премиум-алюминий. Для архитектурных проёмов.',
  },
  {
    v: 'schuco-rehau',
    title: 'Schüco / Rehau',
    sub: 'Премиум/средний сегмент.',
  },
  {
    v: 'economy',
    title: 'Эконом',
    sub: 'Базовые решения, оптимальная цена.',
  },
]

export function StepSegment({ state, dispatch }: Props) {
  return (
    <div className={s.cardGrid}>
      {OPTIONS.map((o) => (
        <button
          key={o.v}
          type="button"
          className={s.card}
          data-selected={state.segment === o.v || undefined}
          onClick={() => {
            dispatch({ type: 'setSegment', v: o.v })
            dispatch({ type: 'next' })
          }}
        >
          <strong
            style={{
              display: 'block',
              fontSize: 24,
              fontFamily: 'var(--font-display)',
            }}
          >
            {o.title}
          </strong>
          <span className={s.meta}>{o.sub}</span>
        </button>
      ))}
    </div>
  )
}
