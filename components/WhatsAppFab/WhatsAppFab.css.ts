import { style } from '@vanilla-extract/css'
import { vars } from '@/app/styles/tokens.css'

export const root = style({
  position: 'fixed',
  right: vars.space.x5,
  bottom: vars.space.x5,
  zIndex: 99,
  width: 56,
  height: 56,
  borderRadius: '50%',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: vars.color.copper,
  color: vars.color.paper,
  border: `${vars.rule.thin} solid ${vars.color.char}`,
  willChange: 'transform',
  transition: `background ${vars.duration.fast} ${vars.ease.out}, bottom ${vars.duration.base} ${vars.ease.out}`,
  selectors: { '&:hover': { backgroundColor: vars.color.copperDeep } },
  // Lift up on mobile so it stays clear of the fixed bottom CTA bar.
  '@media': {
    'screen and (max-width: 640px)': {
      bottom: 96,
      right: vars.space.x4,
    },
  },
})
