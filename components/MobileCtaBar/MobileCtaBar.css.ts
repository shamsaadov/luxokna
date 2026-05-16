import { style } from '@vanilla-extract/css'
import { vars } from '@/app/styles/tokens.css'

export const root = style({
  display: 'none',
  position: 'fixed',
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 90,
  gridTemplateColumns: '1fr auto',
  gap: vars.space.x3,
  alignItems: 'center',
  padding: `${vars.space.x3} clamp(16px, 5vw, 24px)`,
  backgroundColor: vars.color.bone,
  borderTop: `${vars.rule.thin} solid ${vars.color.char}`,
  transform: 'translateY(120%)',
  transition: `transform ${vars.duration.base} ${vars.ease.out}`,
  paddingBottom: `calc(${vars.space.x3} + env(safe-area-inset-bottom, 0px))`,
  pointerEvents: 'none',
  '@media': {
    'screen and (max-width: 640px)': { display: 'grid' },
  },
  selectors: {
    '&[data-visible="true"]': {
      transform: 'translateY(0)',
      pointerEvents: 'auto',
    },
  },
})

export const label = style({
  fontFamily: vars.font.display,
  fontSize: 18,
  lineHeight: 1.1,
  color: vars.color.char,
})

export const sub = style({
  fontFamily: vars.font.mono,
  fontSize: vars.fontSize.micro,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  color: vars.color.sand,
  marginTop: 2,
})

export const btn = style({
  appearance: 'none',
  border: 'none',
  background: vars.color.copper,
  color: vars.color.paper,
  fontFamily: vars.font.mono,
  fontSize: vars.fontSize.meta,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  padding: `${vars.space.x3} ${vars.space.x5}`,
  cursor: 'pointer',
  selectors: { '&:hover': { backgroundColor: vars.color.copperDeep } },
})
