import { style } from '@vanilla-extract/css'
import { vars } from '@/app/styles/tokens.css'

export const root = style({
  position: 'fixed',
  top: 0,
  insetInline: 0,
  zIndex: 100,
  display: 'grid',
  gridTemplateColumns: 'auto 1fr auto',
  alignItems: 'center',
  padding: `${vars.space.x4} ${vars.space.x7}`,
  backgroundColor: vars.color.bone,
  borderBottom: `${vars.rule.hair} solid ${vars.color.rule}`,
  transition: `transform ${vars.duration.base} ${vars.ease.out}`,
  selectors: { '&[data-hidden="true"]': { transform: 'translateY(-100%)' } },
  '@media': {
    'screen and (max-width: 768px)': {
      padding: `${vars.space.x3} clamp(16px, 5vw, 24px)`,
    },
  },
})

export const logo = style({
  fontFamily: vars.font.display,
  fontSize: vars.fontSize.h4,
  letterSpacing: '-0.01em',
})

export const nav = style({
  display: 'flex',
  gap: vars.space.x6,
  justifyContent: 'center',
  fontFamily: vars.font.mono,
  fontSize: vars.fontSize.meta,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  '@media': { 'screen and (max-width: 768px)': { display: 'none' } },
})

export const actions = style({
  justifySelf: 'end',
  display: 'flex',
  alignItems: 'center',
  gap: vars.space.x3,
})

export const cta = style({
  '@media': { 'screen and (max-width: 768px)': { display: 'none' } },
})
