import { style, keyframes } from '@vanilla-extract/css'
import { vars } from '@/app/styles/tokens.css'

const reveal = keyframes({
  from: { clipPath: 'inset(100% 0 0 0)' },
  to: { clipPath: 'inset(0 0 0 0)' },
})

export const wrap = style({
  position: 'relative',
  overflow: 'hidden',
})

export const img = style({
  display: 'block',
  width: '100%',
  height: 'auto',
  selectors: {
    '&[data-revealed="true"]': {
      animation: `${reveal} ${vars.duration.story} ${vars.ease.out} both`,
    },
  },
})
