import { style } from '@vanilla-extract/css'
import { vars } from '@/app/styles/tokens.css'

export const root = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: `${vars.space.x3} ${vars.space.x5}`,
  border: `${vars.rule.thin} solid ${vars.color.char}`,
  borderRadius: vars.radius.hair,
  backgroundColor: 'transparent',
  fontFamily: vars.font.mono,
  fontSize: vars.fontSize.meta,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  transition: `background ${vars.duration.fast} ${vars.ease.out}, color ${vars.duration.fast} ${vars.ease.out}`,
  willChange: 'transform',
  selectors: {
    '&:hover': {
      backgroundColor: vars.color.char,
      color: vars.color.bone,
    },
  },
})
