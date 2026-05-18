import { style } from '@vanilla-extract/css'
import { vars } from '@/app/styles/tokens.css'

export const root = style({
  display: 'none',
  position: 'fixed',
  left: vars.space.x4,
  right: 'auto',
  bottom: vars.space.x4,
  zIndex: 95,
  maxWidth: 320,
  gap: vars.space.x4,
  alignItems: 'center',
  padding: `${vars.space.x4} ${vars.space.x4}`,
  backgroundColor: vars.color.bone,
  border: `${vars.rule.thin} solid ${vars.color.char}`,
  boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
  transform: 'translateY(120%)',
  opacity: 0,
  transition: `transform ${vars.duration.slow} ${vars.ease.out}, opacity ${vars.duration.base} ${vars.ease.out}`,
  paddingBottom: `calc(${vars.space.x4} + env(safe-area-inset-bottom, 0px))`,
  // Visible on mobile/tablet only.
  '@media': {
    'screen and (max-width: 1023px)': { display: 'grid', gridTemplateColumns: '1fr auto' },
  },
  selectors: {
    '&[data-visible="true"]': {
      transform: 'translateY(0)',
      opacity: 1,
    },
    // Hide when the calculator drawer is open (Calculator sets body[data-calc-open]).
    'body[data-calc-open="true"] &': {
      display: 'none',
    },
  },
})

export const text = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
})

export const label = style({
  fontFamily: vars.font.display,
  fontSize: 16,
  lineHeight: 1.15,
  color: vars.color.char,
})

export const sub = style({
  fontFamily: vars.font.mono,
  fontSize: vars.fontSize.micro,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  color: vars.color.sand,
})

export const actions = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: vars.space.x2,
})

export const btn = style({
  appearance: 'none',
  border: 'none',
  background: vars.color.copper,
  color: vars.color.paper,
  fontFamily: vars.font.mono,
  fontSize: vars.fontSize.micro,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  padding: `${vars.space.x2} ${vars.space.x4}`,
  cursor: 'pointer',
  transition: `background ${vars.duration.fast} ${vars.ease.out}`,
  selectors: { '&:hover': { backgroundColor: vars.color.copperDeep } },
})

export const close = style({
  appearance: 'none',
  border: 'none',
  background: 'transparent',
  color: vars.color.sand,
  cursor: 'pointer',
  padding: vars.space.x2,
  fontFamily: vars.font.mono,
  fontSize: 14,
  lineHeight: 1,
  selectors: { '&:hover': { color: vars.color.char } },
})
