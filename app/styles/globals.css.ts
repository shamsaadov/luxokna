import { globalStyle } from '@vanilla-extract/css'
import { vars } from './tokens.css'

globalStyle('html', {
  fontSize: '16px',
  textRendering: 'optimizeLegibility',
  WebkitFontSmoothing: 'antialiased',
  overflowX: 'hidden',
})

globalStyle('body', {
  backgroundColor: vars.color.bone,
  color: vars.color.char,
  fontFamily: vars.font.body,
  fontSize: vars.fontSize.body,
  lineHeight: vars.lineHeight.body,
  fontFeatureSettings: '"ss01" on, "ss02" on',
  overflowX: 'hidden',
})

globalStyle('::selection', {
  backgroundColor: vars.color.copper,
  color: vars.color.paper,
})

globalStyle(':focus-visible', {
  outline: 'none',
  boxShadow: `0 2px 0 ${vars.color.copper}`,
})

globalStyle('::view-transition-old(root), ::view-transition-new(root)', {
  animationDuration: vars.duration.base,
  animationTimingFunction: vars.ease.out,
})
