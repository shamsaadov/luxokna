import { describe, it, expect } from 'vitest'
import { reducer } from '@/components/Calculator/reducer'
import { initialState } from '@/components/Calculator/types'

describe('reducer', () => {
  it('next advances step within range', () => {
    expect(reducer(initialState, { type: 'next' }).step).toBe(2)
    const onLast = { ...initialState, step: 4 as const }
    expect(reducer(onLast, { type: 'next' }).step).toBe(4)
  })

  it('back decrements step within range', () => {
    const s2 = { ...initialState, step: 2 as const }
    expect(reducer(s2, { type: 'back' }).step).toBe(1)
    expect(reducer(initialState, { type: 'back' }).step).toBe(1)
  })

  it('clamps width to [300, 6000]', () => {
    expect(reducer(initialState, { type: 'setWidth', v: 100 }).width).toBe(300)
    expect(reducer(initialState, { type: 'setWidth', v: 9999 }).width).toBe(6000)
    expect(reducer(initialState, { type: 'setWidth', v: 1500 }).width).toBe(1500)
  })

  it('sets material and segment', () => {
    const m = reducer(initialState, { type: 'setMaterial', v: 'pvc' })
    expect(m.material).toBe('pvc')
    const sg = reducer(m, { type: 'setSegment', v: 'alutech' })
    expect(sg.segment).toBe('alutech')
  })

  it('reset returns initial', () => {
    const dirty = { ...initialState, step: 3 as const, name: 'X' }
    expect(reducer(dirty, { type: 'reset' })).toEqual(initialState)
  })
})
