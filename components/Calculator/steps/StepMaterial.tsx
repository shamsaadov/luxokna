import type { Dispatch } from 'react'
import type { CalcState, Action, Material } from '../types'
import * as s from './steps.css'

interface Props {
  state: CalcState
  dispatch: Dispatch<Action>
}

const OPTIONS: ReadonlyArray<{ v: Material; title: string; sub: string }> = [
  { v: 'pvc', title: 'ПВХ', sub: 'Тёплый. Для жилых пространств.' },
  {
    v: 'aluminium',
    title: 'Алюминий',
    sub: 'Прочный. Для витражей и больших проёмов.',
  },
]

export function StepMaterial({ state, dispatch }: Props) {
  return (
    <div className={s.cardGrid}>
      {OPTIONS.map((o) => (
        <button
          key={o.v}
          type="button"
          className={s.card}
          data-selected={state.material === o.v || undefined}
          onClick={() => {
            dispatch({ type: 'setMaterial', v: o.v })
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
