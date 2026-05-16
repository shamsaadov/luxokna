import { style } from '@vanilla-extract/css'
import { vars } from '@/app/styles/tokens.css'

export const root = style({
  position: 'fixed',
  top: 0,
  bottom: 0,
  left: 0,
  width: vars.grid.sideRule,
  display: 'grid',
  placeItems: 'center',
  justifyContent: 'center',
  borderRight: `${vars.rule.hair} solid ${vars.color.rule}`,
  zIndex: 50,
  pointerEvents: 'none',
  '@media': { 'screen and (max-width: 768px)': { display: 'none' } },
})

export const text = style({
  fontFamily: vars.font.mono,
  fontSize: vars.fontSize.micro,
  textTransform: 'uppercase',
  letterSpacing: '0.18em',
  writingMode: 'vertical-rl',
  transform: 'rotate(180deg)',
  color: vars.color.sand,
})
