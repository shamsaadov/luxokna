import { style } from '@vanilla-extract/css'

const MOBILE = 'screen and (max-width: 640px)'
const TABLET = 'screen and (min-width: 641px) and (max-width: 960px)'

export const nav = style({
  display: 'flex',
  gap: 16,
  padding: '0 64px',
  fontFamily: 'var(--font-mono)',
  fontSize: 13,
  textTransform: 'uppercase',
  flexWrap: 'wrap',
  '@media': {
    [MOBILE]: { padding: '0 clamp(20px, 5vw, 32px)', gap: 12 },
    [TABLET]: { padding: '0 clamp(32px, 5vw, 64px)' },
  },
})

export const navRow = style({
  display: 'flex',
  gap: 16,
  padding: '8px 64px 0',
  fontFamily: 'var(--font-mono)',
  fontSize: 13,
  textTransform: 'uppercase',
  flexWrap: 'wrap',
  alignItems: 'center',
  '@media': {
    [MOBILE]: { padding: '6px clamp(20px, 5vw, 32px) 0', gap: 12 },
    [TABLET]: { padding: '6px clamp(32px, 5vw, 64px) 0' },
  },
})

export const navLabel = style({
  color: 'var(--sand)',
  marginRight: 4,
  letterSpacing: '0.08em',
})

export const filterBtn = style({
  padding: '8px 0',
  borderBottom: '2px solid transparent',
})

export const filterActive = style({
  borderBottomColor: 'var(--copper)',
})

export const count = style({
  padding: '12px 64px 0',
  fontFamily: 'var(--font-mono)',
  fontSize: 12,
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
  color: 'var(--sand)',
  '@media': {
    [MOBILE]: { padding: '12px clamp(20px, 5vw, 32px) 0' },
    [TABLET]: { padding: '12px clamp(32px, 5vw, 64px) 0' },
  },
})

export const grid = style({
  padding: '32px 64px',
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: 16,
  '@media': {
    [MOBILE]: {
      gridTemplateColumns: '1fr',
      padding: '24px clamp(20px, 5vw, 32px)',
      gap: 20,
    },
    [TABLET]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
      padding: '28px clamp(32px, 5vw, 64px)',
      gap: 20,
    },
  },
})
