import { style } from '@vanilla-extract/css'
import { vars } from '@/app/styles/tokens.css'

export const root = style({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  height: '2px',
  background: vars.color.rule,
  zIndex: 101,
  pointerEvents: 'none',
})

export const fill = style({
  height: '100%',
  background: vars.color.copper,
  transform: 'scaleX(0)',
  transformOrigin: 'left center',
  willChange: 'transform',
  transition: `transform 90ms ${vars.ease.out}`,
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      transition: 'none',
    },
  },
})
