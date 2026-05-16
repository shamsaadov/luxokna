import localFont from 'next/font/local'

export const fraunces = localFont({
  src: '../../public/fonts/Fraunces-Variable.woff2',
  display: 'swap',
  variable: '--font-display',
  weight: '100 900',
})

export const switzer = localFont({
  src: '../../public/fonts/Switzer-Variable.woff2',
  display: 'swap',
  variable: '--font-body',
  weight: '100 900',
})

export const jbm = localFont({
  src: '../../public/fonts/JetBrainsMono-Variable.woff2',
  display: 'swap',
  variable: '--font-mono',
  weight: '100 900',
})
