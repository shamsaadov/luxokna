import { style, keyframes } from '@vanilla-extract/css'
import { vars } from '@/app/styles/tokens.css'

const slideIn = keyframes({
  from: { transform: 'translateX(100%)' },
  to: { transform: 'translateX(0)' },
})

export const overlay = style({
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(26,23,20,0.5)',
  zIndex: 200,
})

export const drawer = style({
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  width: 480,
  maxWidth: '100vw',
  backgroundColor: vars.color.bone,
  borderLeft: `${vars.rule.thin} solid ${vars.color.char}`,
  display: 'grid',
  gridTemplateRows: 'auto 1fr auto',
  zIndex: 201,
  animation: `${slideIn} ${vars.duration.base} ${vars.ease.out}`,
  outline: 'none',
  '@media': {
    'screen and (max-width: 640px)': {
      width: '100vw',
      borderLeft: 0,
    },
  },
})

export const body = style({
  padding: vars.space.x6,
  overflowY: 'auto',
  '@media': {
    'screen and (max-width: 640px)': { padding: vars.space.x5 },
  },
})

export const footer = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: vars.space.x5,
  borderTop: `${vars.rule.hair} solid ${vars.color.rule}`,
})

export const header = style({
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  alignItems: 'center',
  padding: vars.space.x5,
  borderBottom: `${vars.rule.hair} solid ${vars.color.rule}`,
})

export const progress = style({
  display: 'flex',
  gap: vars.space.x2,
  alignItems: 'center',
  fontFamily: vars.font.mono,
  fontSize: vars.fontSize.meta,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  color: vars.color.sand,
})

export const close = style({
  width: 36,
  height: 36,
  display: 'grid',
  placeItems: 'center',
  border: `${vars.rule.hair} solid ${vars.color.rule}`,
  backgroundColor: 'transparent',
  cursor: 'pointer',
})

export const backBtn = style({
  fontFamily: vars.font.mono,
  fontSize: vars.fontSize.meta,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  color: vars.color.char,
  selectors: {
    '&:disabled': {
      opacity: 0.35,
      cursor: 'not-allowed',
    },
  },
})
