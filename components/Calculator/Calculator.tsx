'use client'
import { useEffect, useReducer, useRef, useState } from 'react'
import { reducer, rehydrate } from './reducer'
import { initialState } from './types'
import * as s from './Calculator.css'
import { Close } from '../icons/Close'
import { MagneticButton } from '../MagneticButton/MagneticButton'
import { StepProem } from './steps/StepProem'
import { StepMaterial } from './steps/StepMaterial'
import { StepSegment } from './steps/StepSegment'
import { StepContact } from './steps/StepContact'
import { track } from '@/lib/analytics'
import { dragTranslate, shouldCloseOnSwipe } from './swipe'

interface Props {
  open: boolean
  onClose: () => void
}

const STEP_LABELS = ['ПРОЁМ', 'МАТЕРИАЛ', 'СЕГМЕНТ', 'КОНТАКТ'] as const

export function Calculator({ open, onClose }: Props) {
  const [state, dispatch] = useReducer(
    reducer,
    initialState,
    (s0) => rehydrate() ?? s0,
  )
  const drawerRef = useRef<HTMLDivElement>(null)
  const [dragX, setDragX] = useState(0)

  // ESC + focus + body-scroll-lock
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    if (drawerRef.current) {
      drawerRef.current.focus()
    }
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.body.dataset.calcOpen = 'true'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      delete document.body.dataset.calcOpen
    }
  }, [open, onClose])

  // Analytics: fire calc_open when drawer opens
  useEffect(() => {
    if (open) track('calc_open')
  }, [open])

  // Persist state to sessionStorage on every change
  useEffect(() => {
    try {
      sessionStorage.setItem('luxokna.calc', JSON.stringify(state))
    } catch {
      // storage unavailable — ignore
    }
  }, [state])

  // Swipe-right-to-close (mobile gesture)
  useEffect(() => {
    if (!open) return
    const el = drawerRef.current
    if (!el) return
    let startX = 0
    let startY = 0
    let tracking = false
    const onStart = (e: TouchEvent) => {
      const t = e.touches[0]
      if (!t) return
      startX = t.clientX
      startY = t.clientY
      tracking = true
    }
    const onMove = (e: TouchEvent) => {
      if (!tracking) return
      const t = e.touches[0]
      if (!t) return
      const dx = t.clientX - startX
      const dy = t.clientY - startY
      setDragX(dragTranslate(dx, dy))
    }
    const onEnd = (e: TouchEvent) => {
      if (!tracking) return
      const t = e.changedTouches[0]
      tracking = false
      if (!t) {
        setDragX(0)
        return
      }
      const dx = t.clientX - startX
      const dy = t.clientY - startY
      setDragX(0)
      if (shouldCloseOnSwipe(dx, dy)) onClose()
    }
    el.addEventListener('touchstart', onStart, { passive: true })
    el.addEventListener('touchmove', onMove, { passive: true })
    el.addEventListener('touchend', onEnd)
    el.addEventListener('touchcancel', onEnd)
    return () => {
      el.removeEventListener('touchstart', onStart)
      el.removeEventListener('touchmove', onMove)
      el.removeEventListener('touchend', onEnd)
      el.removeEventListener('touchcancel', onEnd)
    }
  }, [open, onClose])

  if (!open) return null

  const stepLabel = STEP_LABELS[state.step - 1] ?? ''

  return (
    <>
      <div className={s.overlay} onClick={onClose} />
      <aside
        className={s.drawer}
        role="dialog"
        aria-modal="true"
        aria-labelledby="calc-title"
        tabIndex={-1}
        ref={drawerRef}
        style={
          dragX > 0
            ? { transform: `translateX(${dragX}px)`, transition: 'none' }
            : undefined
        }
      >
        <div className={s.grabber} aria-hidden="true" />
        <div className={s.header}>
          <div className={s.progress}>
            <span id="calc-title">{stepLabel}</span>
            <span>0{state.step} / 04</span>
          </div>
          <button
            className={s.close}
            onClick={onClose}
            aria-label="Закрыть"
            type="button"
          >
            <Close />
          </button>
        </div>
        <div className={s.body}>
          {state.step === 1 && <StepProem state={state} dispatch={dispatch} />}
          {state.step === 2 && (
            <StepMaterial state={state} dispatch={dispatch} />
          )}
          {state.step === 3 && (
            <StepSegment state={state} dispatch={dispatch} />
          )}
          {state.step === 4 && (
            <StepContact state={state} dispatch={dispatch} />
          )}
        </div>
        <div className={s.footer}>
          <button
            className={s.backBtn}
            onClick={() => dispatch({ type: 'back' })}
            disabled={state.step === 1}
            type="button"
          >
            ← Назад
          </button>
          <MagneticButton
            onClick={() => {
              const nextStep = Math.min(4, state.step + 1)
              if (nextStep !== state.step) track(`calc_step_${nextStep}`)
              dispatch({ type: 'next' })
            }}
          >
            Далее →
          </MagneticButton>
        </div>
      </aside>
    </>
  )
}
