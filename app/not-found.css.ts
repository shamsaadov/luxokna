import { style, keyframes } from '@vanilla-extract/css'
import { vars } from '@/app/styles/tokens.css'

const tickerAnim = keyframes({
  from: { transform: 'translateX(0)' },
  to: { transform: 'translateX(-50%)' },
})

export const wrap = style({
  minHeight: '92vh',
  display: 'grid',
  gridTemplateRows: '1fr auto',
  backgroundColor: vars.color.bone,
})

export const inner = style({
  display: 'grid',
  gridTemplateColumns: '5fr 7fr',
  alignItems: 'end',
  gap: 48,
  padding: '160px 64px 64px',
  '@media': {
    'screen and (max-width: 640px)': {
      gridTemplateColumns: '1fr',
      padding: 'clamp(96px, 22vw, 140px) clamp(20px, 5vw, 32px) clamp(48px, 12vw, 64px)',
      gap: 32,
      alignItems: 'start',
    },
    'screen and (min-width: 641px) and (max-width: 960px)': {
      gridTemplateColumns: '1fr 1fr',
      padding: 'clamp(120px, 16vw, 160px) clamp(32px, 5vw, 64px) clamp(48px, 8vw, 64px)',
      gap: 32,
    },
  },
})

export const meta = style({
  fontFamily: vars.font.mono,
  fontSize: vars.fontSize.micro,
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
  color: vars.color.sand,
})

export const code = style({
  fontFamily: vars.font.display,
  lineHeight: 1,
  fontSize: 'clamp(120px, 28vw, 280px)',
  color: vars.color.char,
  fontVariationSettings: '"SOFT" 60, "WONK" 1',
  margin: '8px 0 0',
})

export const title = style({
  fontFamily: vars.font.display,
  lineHeight: 1.05,
  fontSize: 'clamp(28px, 5vw, 48px)',
  color: vars.color.char,
})

export const blurb = style({
  marginTop: 16,
  maxWidth: 420,
  color: vars.color.charSoft,
})

export const backLink = style({
  display: 'inline-block',
  marginTop: 32,
  fontFamily: vars.font.mono,
  fontSize: vars.fontSize.meta,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  color: vars.color.copper,
  borderBottom: `${vars.rule.hair} solid ${vars.color.copper}`,
  paddingBottom: 2,
  selectors: {
    '&:hover': { color: vars.color.copperDeep, borderBottomColor: vars.color.copperDeep },
  },
})

export const ticker = style({
  borderTop: `${vars.rule.hair} solid ${vars.color.rule}`,
  borderBottom: `${vars.rule.hair} solid ${vars.color.rule}`,
  overflow: 'hidden',
  padding: '20px 0',
  fontFamily: vars.font.display,
  fontSize: 'clamp(40px, 8vw, 80px)',
  color: vars.color.copper,
  whiteSpace: 'nowrap',
})

export const tickerTrack = style({
  display: 'inline-block',
  animation: `${tickerAnim} 28s linear infinite`,
  willChange: 'transform',
})
