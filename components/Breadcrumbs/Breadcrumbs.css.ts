import { style } from '@vanilla-extract/css'
import { vars } from '@/app/styles/tokens.css'

export const nav = style({
  padding: '24px 64px 0',
  '@media': {
    'screen and (max-width: 640px)': { padding: '16px 20px 0' },
    'screen and (min-width: 641px) and (max-width: 960px)': {
      padding: '20px 32px 0',
    },
  },
})

export const list = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: '8px',
  margin: 0,
  padding: 0,
  listStyle: 'none',
  fontFamily: vars.font.mono,
  fontSize: vars.fontSize.micro,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: vars.color.sand,
})

export const item = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
})

export const link = style({
  color: vars.color.sand,
  textDecoration: 'none',
  transition: `color ${vars.duration.fast} ${vars.ease.out}`,
  ':hover': { color: vars.color.copper },
  ':focus-visible': {
    outline: `${vars.rule.thin} solid ${vars.color.copper}`,
    outlineOffset: '2px',
  },
})

export const current = style({
  color: vars.color.char,
})

export const sep = style({
  color: vars.color.rule,
  userSelect: 'none',
})
