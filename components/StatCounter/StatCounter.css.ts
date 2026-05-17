import { style } from '@vanilla-extract/css'

const MOBILE = 'screen and (max-width: 640px)'

export const root = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  paddingTop: 24,
  borderTop: '1px solid var(--rule)',
})

export const value = style({
  fontFamily: 'var(--font-display)',
  // Tabular-ish baseline; large display number.
  fontSize: 'clamp(48px, 8vw, 88px)',
  lineHeight: 1.0,
  letterSpacing: '-0.02em',
  color: 'var(--char)',
  // Tabular figures keep the width stable while the number changes.
  fontVariantNumeric: 'tabular-nums',
  fontFeatureSettings: '"tnum"',
  // Smooth weight transition during animation reads as “alive”.
  transition: 'font-variation-settings 1200ms cubic-bezier(0.16, 1, 0.3, 1)',
  // Default state — settled (SOFT 0, WONK 0, weight 600).
  fontVariationSettings: '"opsz" 144, "SOFT" 0, "WONK" 0, "wght" 600',
})

export const valueRunning = style({
  // Mid-animation: slightly lighter + soft-curved while the number ticks up.
  fontVariationSettings: '"opsz" 144, "SOFT" 80, "WONK" 1, "wght" 420',
})

export const suffix = style({
  // Slightly smaller suffix; sits on baseline of the big number.
  fontFamily: 'var(--font-display)',
  fontSize: 'inherit',
  color: 'var(--copper)',
  marginLeft: 4,
})

export const label = style({
  fontFamily: 'var(--font-mono)',
  fontSize: 12,
  textTransform: 'uppercase',
  letterSpacing: '0.14em',
  color: 'var(--sand)',
  '@media': {
    [MOBILE]: { fontSize: 11 },
  },
})
