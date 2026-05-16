import type { Dispatch } from 'react'
import type { CalcState, Action } from '../types'
import * as s from './steps.css'

interface Props {
  state: CalcState
  dispatch: Dispatch<Action>
}

export function StepProem({ state, dispatch }: Props) {
  const area = ((state.width * state.height) / 1_000_000).toFixed(2)
  return (
    <>
      <div className={s.field}>
        <label className={s.label} htmlFor="calc-width">
          Ширина, мм
        </label>
        <input
          id="calc-width"
          type="number"
          inputMode="numeric"
          className={s.input}
          min={300}
          max={6000}
          step={50}
          value={state.width}
          onChange={(e) =>
            dispatch({ type: 'setWidth', v: Number(e.target.value) })
          }
        />
      </div>
      <div className={s.field}>
        <label className={s.label} htmlFor="calc-height">
          Высота, мм
        </label>
        <input
          id="calc-height"
          type="number"
          inputMode="numeric"
          className={s.input}
          min={300}
          max={6000}
          step={50}
          value={state.height}
          onChange={(e) =>
            dispatch({ type: 'setHeight', v: Number(e.target.value) })
          }
        />
      </div>
      <p className={s.meta}>S = {area} м²</p>
    </>
  )
}
