/**
 * Shared responsive primitives used across pages.
 *
 * Breakpoints (mobile-first):
 *   < 640px        : mobile (one-column, fluid type)
 *   640 - 960px    : tablet (two columns where it helps)
 *   >= 960px       : desktop (current design)
 */
import { style } from '@vanilla-extract/css'

const MOBILE = 'screen and (max-width: 640px)'
const TABLET = 'screen and (min-width: 641px) and (max-width: 960px)'

/** Article-level wrapper. Reserves room for the SideRule on desktop, drops it on mobile. */
export const article = style({
  paddingLeft: 64,
  '@media': {
    [MOBILE]: { paddingLeft: 0 },
    [TABLET]: { paddingLeft: 32 },
  },
})

/** Hero section: 5fr 7fr on desktop, single column on mobile, fluid padding. */
export const hero = style({
  display: 'grid',
  gridTemplateColumns: '5fr 7fr',
  alignItems: 'end',
  gap: 48,
  padding: '160px 64px 64px',
  minHeight: '92vh',
  '@media': {
    [MOBILE]: {
      gridTemplateColumns: '1fr',
      padding: 'clamp(96px, 22vw, 140px) clamp(20px, 5vw, 32px) clamp(48px, 12vw, 64px)',
      minHeight: 'auto',
      gap: 32,
      alignItems: 'start',
    },
    [TABLET]: {
      gridTemplateColumns: '1fr 1fr',
      padding: 'clamp(120px, 16vw, 160px) clamp(32px, 5vw, 64px) clamp(48px, 8vw, 64px)',
      gap: 32,
    },
  },
})

/** Fluid hero headline (96px desktop, scales down to 40px on small phones). */
export const heroTitle = style({
  fontFamily: 'var(--font-display)',
  lineHeight: 1.02,
  fontSize: 'clamp(40px, 11vw, 96px)',
  fontVariationSettings: '"SOFT" 60, "WONK" 1',
})

/** Slightly smaller hero (used on /o-nas). */
export const heroTitleSm = style({
  fontFamily: 'var(--font-display)',
  lineHeight: 1.05,
  fontSize: 'clamp(36px, 8vw, 72px)',
})

/** Page section with fluid horizontal + vertical padding. */
export const section = style({
  padding: '96px 64px',
  '@media': {
    [MOBILE]: { padding: 'clamp(48px, 12vw, 72px) clamp(20px, 5vw, 32px)' },
    [TABLET]: { padding: 'clamp(64px, 10vw, 96px) clamp(32px, 5vw, 64px)' },
  },
})

/** Grid that goes 3 columns → 2 → 1. */
export const grid3 = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: 24,
  '@media': {
    [MOBILE]: { gridTemplateColumns: '1fr', gap: 24 },
    [TABLET]: { gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 },
  },
})

/** Grid that goes 4 → 2 → 1. */
export const grid4 = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: 16,
  '@media': {
    [MOBILE]: { gridTemplateColumns: '1fr', gap: 20 },
    [TABLET]: { gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 },
  },
})

/** 5-col process strip → 2 col tablet → 1 col mobile. */
export const grid5 = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 1fr)',
  gap: 24,
  '@media': {
    [MOBILE]: { gridTemplateColumns: '1fr', gap: 24 },
    [TABLET]: { gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 },
  },
})

/** Two-equal-cols → stack on mobile. */
export const grid2 = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 48,
  '@media': {
    [MOBILE]: { gridTemplateColumns: '1fr', gap: 32 },
  },
})

/** Bullet list: 2 columns → 1 column on mobile. */
export const bulletsTwo = style({
  columns: 2,
  columnGap: 48,
  '@media': { [MOBILE]: { columns: 1 } },
})
