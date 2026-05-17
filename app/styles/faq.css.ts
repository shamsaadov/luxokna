import { style } from '@vanilla-extract/css'
import { vars } from '@/app/styles/tokens.css'

export const list = style({
  marginTop: 32,
  maxWidth: 760,
})

export const item = style({
  borderTop: `${vars.rule.hair} solid ${vars.color.rule}`,
  selectors: {
    '&:last-of-type': { borderBottom: `${vars.rule.hair} solid ${vars.color.rule}` },
  },
})

export const summary = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '24px',
  padding: '20px 0',
  cursor: 'pointer',
  fontFamily: vars.font.display,
  fontSize: vars.fontSize.h4,
  lineHeight: vars.lineHeight.snug,
  color: vars.color.char,
  listStyle: 'none',
  outline: 'none',
  selectors: {
    '&::-webkit-details-marker': { display: 'none' },
    '&::after': {
      content: '"+"',
      fontFamily: vars.font.mono,
      fontSize: vars.fontSize.h4,
      color: vars.color.copper,
      transition: `transform ${vars.duration.base} ${vars.ease.out}`,
      lineHeight: 1,
    },
    'details[open] > &::after': { transform: 'rotate(45deg)' },
    '&:focus-visible': {
      outline: `${vars.rule.thin} solid ${vars.color.copper}`,
      outlineOffset: '4px',
    },
  },
})

export const answer = style({
  padding: '0 0 24px',
  fontFamily: vars.font.body,
  fontSize: vars.fontSize.body,
  lineHeight: vars.lineHeight.body,
  color: vars.color.charSoft,
  maxWidth: 640,
})
