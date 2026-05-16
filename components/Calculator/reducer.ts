import { CalcState, Action, initialState } from './types'

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v))

export function reducer(state: CalcState, action: Action): CalcState {
  switch (action.type) {
    case 'goto':
      return { ...state, step: action.step }
    case 'next':
      return { ...state, step: Math.min(4, state.step + 1) as CalcState['step'] }
    case 'back':
      return { ...state, step: Math.max(1, state.step - 1) as CalcState['step'] }
    case 'setWidth':
      return { ...state, width: clamp(action.v, 300, 6000) }
    case 'setHeight':
      return { ...state, height: clamp(action.v, 300, 6000) }
    case 'setMaterial':
      return { ...state, material: action.v }
    case 'setSegment':
      return { ...state, segment: action.v }
    case 'setName':
      return { ...state, name: action.v }
    case 'setPhone':
      return { ...state, phone: action.v }
    case 'reset':
      return initialState
  }
}

export function rehydrate(): CalcState | null {
  try {
    const raw =
      typeof window !== 'undefined'
        ? sessionStorage.getItem('luxokna.calc')
        : null
    return raw ? (JSON.parse(raw) as CalcState) : null
  } catch {
    return null
  }
}
