import { style } from '@vanilla-extract/css'
import { vars } from '@/app/styles/tokens.css'

export const root = style({
  borderTop: `${vars.rule.hair} solid ${vars.color.rule}`,
  padding: `${vars.space.x9} ${vars.space.x7} ${vars.space.x5}`,
  backgroundColor: vars.color.boneDeep,
  fontFamily: vars.font.body,
  fontSize: vars.fontSize.meta,
  color: vars.color.charSoft,
})

export const grid = style({
  display: 'grid',
  gap: vars.space.x7,
  gridTemplateColumns: '2fr 1fr 1fr 1fr',
  '@media': { 'screen and (max-width: 768px)': { gridTemplateColumns: '1fr' } },
})

export const colTitle = style({
  fontFamily: vars.font.mono,
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  color: vars.color.sand,
  marginBottom: vars.space.x3,
})

export const bottom = style({
  marginTop: vars.space.x8,
  paddingTop: vars.space.x4,
  borderTop: `${vars.rule.hair} solid ${vars.color.rule}`,
  display: 'flex',
  justifyContent: 'space-between',
})
