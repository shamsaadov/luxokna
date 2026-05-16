import { style } from '@vanilla-extract/css'
import { vars } from '@/app/styles/tokens.css'

export const wrap = style({
  display: 'flex',
  gap: vars.space.x5,
  alignItems: 'baseline',
})

export const n = style({
  fontFamily: vars.font.mono,
  fontSize: vars.fontSize.h2,
  color: vars.color.copper,
  fontWeight: 500,
  letterSpacing: '0.02em',
})

export const title = style({
  fontFamily: vars.font.display,
  fontSize: vars.fontSize.h2,
  lineHeight: vars.lineHeight.tight,
  fontVariationSettings: '"SOFT" 50, "WONK" 1',
})
