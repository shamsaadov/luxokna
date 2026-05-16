import { style, keyframes } from '@vanilla-extract/css'
import { vars } from '@/app/styles/tokens.css'

const pulse = keyframes({
  '0%': { opacity: 0.65 },
  '50%': { opacity: 1 },
  '100%': { opacity: 0.65 },
})

export const hero = style({
  height: 'clamp(220px, 40vh, 380px)',
  backgroundColor: vars.color.boneDeep,
  animation: `${pulse} 1.4s ease-in-out infinite`,
})

export const card = style({
  height: 'clamp(180px, 28vh, 260px)',
  backgroundColor: vars.color.boneDeep,
  animation: `${pulse} 1.4s ease-in-out infinite`,
})

export const meta = style({
  height: 12,
  width: 160,
  backgroundColor: vars.color.boneDeep,
  marginBottom: 16,
  animation: `${pulse} 1.4s ease-in-out infinite`,
})
