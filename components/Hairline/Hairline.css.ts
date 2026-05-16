import { style, styleVariants } from '@vanilla-extract/css'
import { vars } from '@/app/styles/tokens.css'

export const base = style({
  display: 'block',
  border: 0,
  backgroundColor: vars.color.rule,
})

export const dir = styleVariants({
  horizontal: { width: '100%', height: vars.rule.hair },
  vertical: { width: vars.rule.hair, height: '100%' },
})
