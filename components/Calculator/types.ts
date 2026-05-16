import type { Material, Segment, CalcInput } from '@/lib/whatsapp'
export type { Material, Segment, CalcInput }

export interface CalcState {
  step: 1 | 2 | 3 | 4
  width: number
  height: number
  material: Material | null
  segment: Segment | null
  name: string
  phone: string
}

export type Action =
  | { type: 'goto'; step: CalcState['step'] }
  | { type: 'next' }
  | { type: 'back' }
  | { type: 'setWidth'; v: number }
  | { type: 'setHeight'; v: number }
  | { type: 'setMaterial'; v: Material }
  | { type: 'setSegment'; v: Segment }
  | { type: 'setName'; v: string }
  | { type: 'setPhone'; v: string }
  | { type: 'reset' }

export const initialState: CalcState = {
  step: 1,
  width: 1200,
  height: 1400,
  material: null,
  segment: null,
  name: '',
  phone: '',
}
