import { style, globalStyle } from '@vanilla-extract/css'
import { vars } from '@/app/styles/tokens.css'

export const root = style({
  position: 'fixed',
  top: 0,
  left: 0,
  width: 24,
  height: 24,
  border: `${vars.rule.hair} solid ${vars.color.char}`,
  pointerEvents: 'none',
  zIndex: 9999,
  transform: 'translate(-50%, -50%)',
  mixBlendMode: 'difference',
  transition: `width ${vars.duration.fast} ${vars.ease.out}, height ${vars.duration.fast} ${vars.ease.out}`,
  selectors: {
    '&[data-hot="true"]': { width: 48, height: 48 },
  },
  '@media': {
    '(hover: none)': {
      display: 'none',
    },
  },
})

globalStyle(`${root}`, {
  borderRadius: '50%',
})
