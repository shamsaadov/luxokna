import { style } from '@vanilla-extract/css'
import { vars } from '@/app/styles/tokens.css'

export const root = style({
  display: 'grid',
  gap: vars.space.x2,
})

export const media = style({
  aspectRatio: '4 / 3',
  position: 'relative',
  overflow: 'hidden',
})

export const meta = style({
  fontFamily: vars.font.mono,
  fontSize: vars.fontSize.micro,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  color: vars.color.sand,
  display: 'flex',
  justifyContent: 'space-between',
})

export const title = style({
  fontFamily: vars.font.display,
  fontSize: vars.fontSize.body,
  lineHeight: vars.lineHeight.snug,
})
