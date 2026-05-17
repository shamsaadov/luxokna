import { style } from '@vanilla-extract/css'
import { vars } from '@/app/styles/tokens.css'

/**
 * Accessible "skip to main content" link.
 * - Visually hidden by default (positioned above the viewport).
 * - On :focus reveals at top-left with copper bg + bone text.
 */
export const skipLink = style({
  position: 'fixed',
  top: 8,
  left: 8,
  zIndex: 1000,
  padding: '10px 16px',
  background: vars.color.copper,
  color: vars.color.bone,
  fontFamily: vars.font.mono,
  fontSize: vars.fontSize.meta,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  textDecoration: 'none',
  borderRadius: vars.radius.hair,
  transform: 'translateY(calc(-100% - 16px))',
  transition: `transform ${vars.duration.fast} ${vars.ease.out}`,
  ':focus': { transform: 'translateY(0)' },
  ':focus-visible': { transform: 'translateY(0)', outline: 'none' },
})

export const main = style({
  outline: 'none',
})
