import { style } from '@vanilla-extract/css'
import { vars } from '@/app/styles/tokens.css'

const MOBILE = 'screen and (max-width: 640px)'

export const card = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.x4,
  padding: vars.space.x6,
  background: vars.color.paper,
  border: `${vars.rule.thin} solid ${vars.color.char}`,
  width: '100%',
  '@media': {
    [MOBILE]: { padding: vars.space.x5 },
  },
})

export const title = style({
  fontFamily: vars.font.mono,
  fontSize: vars.fontSize.meta,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  color: vars.color.sand,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  borderBottom: `${vars.rule.hair} solid ${vars.color.rule}`,
  paddingBottom: vars.space.x3,
})

export const area = style({
  fontFamily: vars.font.display,
  fontSize: 20,
  color: vars.color.copper,
  letterSpacing: '-0.01em',
})

export const row = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: vars.space.x3,
})

export const field = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 6,
})

export const label = style({
  fontFamily: vars.font.mono,
  fontSize: 11,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  color: vars.color.sand,
})

export const input = style({
  width: '100%',
  padding: `${vars.space.x3} ${vars.space.x4}`,
  border: `${vars.rule.hair} solid ${vars.color.rule}`,
  borderRadius: vars.radius.hair,
  fontFamily: vars.font.display,
  fontSize: 24,
  background: vars.color.bone,
  color: vars.color.char,
  selectors: {
    '&:focus': { borderColor: vars.color.copper, outline: 'none' },
  },
})

export const inputPhone = style([input, {
  fontFamily: vars.font.mono,
  fontSize: 16,
  letterSpacing: '0.04em',
}])

export const optionsRow = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: vars.space.x2,
})

export const chip = style({
  flex: '1 1 auto',
  minWidth: 'fit-content',
  padding: `${vars.space.x3} ${vars.space.x4}`,
  border: `${vars.rule.hair} solid ${vars.color.rule}`,
  background: 'transparent',
  color: vars.color.char,
  fontFamily: vars.font.mono,
  fontSize: 12,
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  cursor: 'pointer',
  transition: `all ${vars.duration.fast} ${vars.ease.out}`,
  selectors: {
    '&[data-active="true"]': {
      borderColor: vars.color.copper,
      background: vars.color.copper,
      color: vars.color.paper,
    },
    '&:hover:not([data-active="true"])': {
      borderColor: vars.color.char,
    },
  },
})

export const submit = style({
  marginTop: vars.space.x3,
  padding: `${vars.space.x4} ${vars.space.x5}`,
  background: vars.color.char,
  color: vars.color.bone,
  border: 0,
  fontFamily: vars.font.mono,
  fontSize: 14,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  cursor: 'pointer',
  textAlign: 'center',
  textDecoration: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: vars.space.x2,
  transition: `background ${vars.duration.fast} ${vars.ease.out}`,
  selectors: {
    '&:hover': { background: vars.color.copper },
    '&[aria-disabled="true"]': {
      background: vars.color.boneDeep,
      color: vars.color.sand,
      cursor: 'not-allowed',
    },
  },
})

export const hint = style({
  fontFamily: vars.font.body,
  fontSize: 12,
  color: vars.color.charSoft,
  lineHeight: 1.5,
})

export const error = style({
  fontFamily: vars.font.mono,
  fontSize: 11,
  color: vars.color.copper,
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
})
