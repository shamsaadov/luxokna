import { globalStyle } from '@vanilla-extract/css'

globalStyle('*, *::before, *::after', { boxSizing: 'border-box' })
globalStyle('*', { margin: 0, padding: 0 })
globalStyle('html, body', { height: '100%' })
globalStyle('img, picture, svg, video', { display: 'block', maxWidth: '100%' })
globalStyle('button', {
  font: 'inherit',
  background: 'none',
  border: 0,
  cursor: 'pointer',
  color: 'inherit',
})
globalStyle('a', { color: 'inherit', textDecoration: 'none' })
globalStyle('ul, ol', { listStyle: 'none' })
globalStyle('input, textarea, select', { font: 'inherit', color: 'inherit' })
