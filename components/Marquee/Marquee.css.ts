import { style, keyframes } from '@vanilla-extract/css'
import { vars } from '@/app/styles/tokens.css'

const slide = keyframes({
  from: { transform: 'translateX(0)' },
  to: { transform: 'translateX(-50%)' },
})

export const wrap = style({
  overflow: 'hidden',
  borderBlock: `${vars.rule.hair} solid ${vars.color.rule}`,
  paddingBlock: vars.space.x3,
  fontFamily: vars.font.mono,
  fontSize: vars.fontSize.meta,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  color: vars.color.charSoft,
})

export const track = style({
  display: 'inline-flex',
  gap: vars.space.x7,
  whiteSpace: 'nowrap',
  animation: `${slide} 60s linear infinite`,
})

export const item = style({
  display: 'inline-flex',
  gap: vars.space.x3,
  alignItems: 'center',
})
