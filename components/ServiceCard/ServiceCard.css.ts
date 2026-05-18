import { style } from '@vanilla-extract/css'
import { vars } from '@/app/styles/tokens.css'

export const root = style({
  display: 'grid',
  gap: vars.space.x3,
  paddingBlock: vars.space.x6,
  borderTop: `${vars.rule.thin} solid ${vars.color.char}`,
  textDecoration: 'none',
  color: 'inherit',
})

export const head = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
})

export const n = style({
  fontFamily: vars.font.mono,
  fontSize: vars.fontSize.meta,
  color: vars.color.sand,
  letterSpacing: '0.06em',
})

export const title = style({
  fontFamily: vars.font.display,
  fontSize: vars.fontSize.h2,
  lineHeight: vars.lineHeight.tight,
  fontVariationSettings: '"SOFT" 50, "WONK" 1',
})

export const tag = style({
  color: vars.color.charSoft,
  fontStyle: 'italic',
})

export const media = style({
  aspectRatio: '21 / 8',
  overflow: 'hidden',
  position: 'relative',
  maxHeight: 320,
  '@media': {
    'screen and (max-width: 640px)': { aspectRatio: '16 / 9', maxHeight: 200 },
  },
})
