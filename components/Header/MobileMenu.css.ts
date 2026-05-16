import { style, keyframes } from '@vanilla-extract/css'
import { vars } from '@/app/styles/tokens.css'

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
})

const slideIn = keyframes({
  from: { transform: 'translateY(-8px)', opacity: 0 },
  to: { transform: 'translateY(0)', opacity: 1 },
})

export const trigger = style({
  display: 'none',
  width: 40,
  height: 40,
  alignItems: 'center',
  justifyContent: 'center',
  background: 'transparent',
  border: `${vars.rule.hair} solid ${vars.color.rule}`,
  cursor: 'pointer',
  color: vars.color.char,
  '@media': { 'screen and (max-width: 768px)': { display: 'inline-flex' } },
})

export const overlay = style({
  position: 'fixed',
  inset: 0,
  height: '100dvh',
  background: vars.color.bone,
  zIndex: 150,
  display: 'grid',
  gridTemplateRows: 'auto 1fr auto',
  animation: `${fadeIn} ${vars.duration.fast} ${vars.ease.out}`,
  overflowY: 'auto',
})

export const top = style({
  display: 'grid',
  gridTemplateColumns: 'auto 1fr auto',
  alignItems: 'center',
  padding: `${vars.space.x4} ${vars.space.x5}`,
  borderBottom: `${vars.rule.hair} solid ${vars.color.rule}`,
})

export const brand = style({
  fontFamily: vars.font.display,
  fontSize: vars.fontSize.h4,
  letterSpacing: '-0.01em',
  textDecoration: 'none',
  color: vars.color.char,
})

export const closeBtn = style({
  width: 40,
  height: 40,
  display: 'grid',
  placeItems: 'center',
  background: 'transparent',
  border: `${vars.rule.hair} solid ${vars.color.rule}`,
  cursor: 'pointer',
  color: vars.color.char,
})

export const nav = style({
  padding: `${vars.space.x7} ${vars.space.x5}`,
  display: 'grid',
  gap: vars.space.x4,
  alignContent: 'start',
})

export const link = style({
  fontFamily: vars.font.display,
  fontSize: 'clamp(28px, 9vw, 44px)',
  lineHeight: 1.1,
  color: vars.color.char,
  textDecoration: 'none',
  padding: `${vars.space.x2} 0`,
  borderBottom: `${vars.rule.hair} solid ${vars.color.rule}`,
  animation: `${slideIn} ${vars.duration.base} ${vars.ease.out} both`,
})

export const bottom = style({
  padding: `${vars.space.x5}`,
  borderTop: `${vars.rule.hair} solid ${vars.color.rule}`,
  display: 'grid',
  gap: vars.space.x3,
})

export const meta = style({
  fontFamily: vars.font.mono,
  fontSize: vars.fontSize.meta,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  color: vars.color.sand,
})

export const ctaBtn = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: `${vars.space.x4} ${vars.space.x6}`,
  border: `${vars.rule.thin} solid ${vars.color.char}`,
  background: vars.color.char,
  color: vars.color.bone,
  fontFamily: vars.font.mono,
  fontSize: vars.fontSize.meta,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  cursor: 'pointer',
})
