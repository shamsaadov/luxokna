import { createGlobalTheme } from '@vanilla-extract/css'

export const vars = createGlobalTheme(':root', {
  color: {
    bone: '#F2ECDF',
    boneDeep: '#E8DFCB',
    char: '#1A1714',
    charSoft: '#3A332C',
    copper: '#A85031',
    copperDeep: '#7D3A22',
    // WCAG AA: contrast 5.52:1 on --bone and 6.02:1 on --paper (was #7A6A52 → 4.45/4.85).
    sand: '#6A5C45',
    rule: 'rgba(26, 23, 20, 0.12)',
    paper: '#FAF6EC',
  },
  font: {
    display: 'var(--font-display), Georgia, serif',
    body: 'var(--font-body), system-ui, sans-serif',
    mono: 'var(--font-mono), ui-monospace, monospace',
  },
  fontSize: {
    micro: '11px',
    meta: '13px',
    body: '16px',
    lead: '19px',
    h4: '24px',
    h3: '32px',
    h2: '48px',
    h1: '72px',
    display: '120px',
  },
  lineHeight: {
    tight: '1.05',
    snug: '1.2',
    body: '1.55',
    loose: '1.75',
  },
  space: {
    x0: '0',
    x1: '4px',
    x2: '8px',
    x3: '12px',
    x4: '16px',
    x5: '24px',
    x6: '32px',
    x7: '48px',
    x8: '64px',
    x9: '96px',
    x10: '128px',
    x11: '192px',
  },
  radius: {
    none: '0',
    hair: '2px',
    soft: '6px',
  },
  rule: {
    hair: '1px',
    thin: '1.5px',
    bold: '3px',
  },
  duration: {
    fast: '180ms',
    base: '320ms',
    slow: '620ms',
    story: '1100ms',
  },
  ease: {
    out: 'cubic-bezier(0.16, 1, 0.3, 1)',
    in: 'cubic-bezier(0.7, 0, 0.84, 0)',
    sway: 'cubic-bezier(0.65, 0, 0.35, 1)',
  },
  grid: {
    cols: '12',
    gutter: '24px',
    maxw: '1440px',
    sideRule: '64px',
  },
})
