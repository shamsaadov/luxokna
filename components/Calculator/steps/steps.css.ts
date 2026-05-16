import { style } from '@vanilla-extract/css'
import { vars } from '@/app/styles/tokens.css'

export const field = style({
  display: 'grid',
  gap: vars.space.x2,
  marginBottom: vars.space.x5,
})

export const label = style({
  fontFamily: vars.font.mono,
  fontSize: vars.fontSize.meta,
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  color: vars.color.sand,
})

export const input = style({
  width: '100%',
  padding: vars.space.x3,
  border: `${vars.rule.thin} solid ${vars.color.char}`,
  borderRadius: vars.radius.hair,
  fontFamily: vars.font.display,
  fontSize: vars.fontSize.h3,
  backgroundColor: 'transparent',
})

export const meta = style({
  fontFamily: vars.font.mono,
  fontSize: vars.fontSize.meta,
  color: vars.color.charSoft,
})

export const cardGrid = style({
  display: 'grid',
  gap: vars.space.x3,
})

export const card = style({
  padding: vars.space.x5,
  cursor: 'pointer',
  textAlign: 'left',
  backgroundColor: 'transparent',
  border: `${vars.rule.thin} solid ${vars.color.rule}`,
  selectors: {
    '&[data-selected="true"]': {
      borderColor: vars.color.copper,
      backgroundColor: vars.color.paper,
    },
    '&:hover': {
      borderColor: vars.color.char,
    },
  },
})

export const error = style({
  fontFamily: vars.font.mono,
  fontSize: vars.fontSize.meta,
  color: vars.color.copper,
})
