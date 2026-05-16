# LuxOkna Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

> **Note on git:** Repo is not initialized yet (user request). Replace any commit step with a `✓ Чекпойнт` — a manual point where work is verifiable. Git can be added later; commit boundaries are already correct.

**Goal:** Build a multipage Next.js website for LuxOkna (Grozny window/door/glazing company) with a WhatsApp-deeplink calculator, deliberately non-AI-generic visual design.

**Architecture:** Next.js 15 App Router, static-generated pages. Vanilla Extract for zero-runtime CSS with typed design tokens. GSAP + Lenis + View Transitions API for motion. Custom typography (Fraunces / Switzer / JetBrains Mono). Content lives in typed TS files in `content/`. Calculator is a client-side drawer that builds a `wa.me` deeplink — no server.

**Tech Stack:** Next.js 15, React 19, TypeScript strict, Vanilla Extract, GSAP, Lenis, Fraunces/Switzer/JetBrains Mono (variable, via `next/font/local`), `libphonenumber-js`, `plaiceholder`, Vitest, Testing Library, Playwright.

**Spec:** `docs/superpowers/specs/2026-05-16-luxokna-website-design.md`

---

## Phases (suggested chunking for review)

- **Phase 1 — Foundation:** Tasks 1–7 (project bootstrap, tokens, tooling)
- **Phase 2 — Content & lib (TDD core):** Tasks 8–15
- **Phase 3 — Primitive components:** Tasks 16–22
- **Phase 4 — Layout chrome:** Tasks 23–27
- **Phase 5 — Calculator (TDD-heavy):** Tasks 28–36
- **Phase 6 — Cards & service-shared components:** Tasks 37–38
- **Phase 7 — Pages:** Tasks 39–46
- **Phase 8 — SEO / sitemap / analytics:** Tasks 47–52
- **Phase 9 — Polish, View Transitions, audit:** Tasks 53–55

After each phase: `✓ Чекпойнт` — manual visual/functional review before the next phase.

---

## File structure (created across plan)

```
luxokna/
├─ package.json
├─ tsconfig.json
├─ next.config.ts
├─ vitest.config.ts
├─ playwright.config.ts
├─ .eslintrc.json
├─ .prettierrc
│
├─ app/
│  ├─ layout.tsx                   # html, fonts, JSON-LD, header, footer, Cursor, WhatsAppFab
│  ├─ page.tsx                     # /
│  ├─ uslugi/
│  │   ├─ okna/page.tsx
│  │   ├─ dveri/page.tsx
│  │   ├─ vitrazhi/page.tsx
│  │   └─ podokonniki/page.tsx
│  ├─ obyekty/page.tsx
│  ├─ o-nas/page.tsx
│  ├─ kontakty/page.tsx
│  ├─ sitemap.ts
│  ├─ robots.ts
│  ├─ og/[slug]/route.tsx          # OG-image generator
│  └─ styles/
│      ├─ tokens.css.ts            # design tokens
│      ├─ reset.css.ts             # CSS reset
│      └─ globals.css.ts           # base body styles
│
├─ components/
│  ├─ Calculator/
│  │   ├─ Calculator.tsx
│  │   ├─ Calculator.css.ts
│  │   ├─ steps/StepProem.tsx
│  │   ├─ steps/StepMaterial.tsx
│  │   ├─ steps/StepSegment.tsx
│  │   ├─ steps/StepContact.tsx
│  │   ├─ MessagePreview.tsx
│  │   ├─ reducer.ts
│  │   ├─ types.ts
│  │   └─ index.ts
│  ├─ Header/Header.tsx + .css.ts
│  ├─ Footer/Footer.tsx + .css.ts
│  ├─ SideRule/SideRule.tsx + .css.ts
│  ├─ WhatsAppFab/WhatsAppFab.tsx + .css.ts
│  ├─ Hero/Hero.tsx + .css.ts
│  ├─ Marquee/Marquee.tsx + .css.ts
│  ├─ ServiceCard/ServiceCard.tsx + .css.ts
│  ├─ ObjectCard/ObjectCard.tsx + .css.ts
│  ├─ Cursor/Cursor.tsx + .css.ts
│  ├─ MagneticButton/MagneticButton.tsx + .css.ts
│  ├─ RevealImage/RevealImage.tsx + .css.ts
│  ├─ Hairline/Hairline.tsx + .css.ts
│  ├─ SectionNumber/SectionNumber.tsx + .css.ts
│  └─ icons/
│      ├─ index.ts                 # re-export all
│      ├─ WhatsApp.tsx
│      ├─ Instagram.tsx
│      ├─ Phone.tsx
│      ├─ ArrowRight.tsx
│      ├─ ArrowLeft.tsx
│      ├─ ArrowUp.tsx
│      ├─ ArrowDown.tsx
│      ├─ Plus.tsx
│      ├─ Minus.tsx
│      ├─ Check.tsx
│      ├─ Close.tsx
│      ├─ Filter.tsx
│      └─ Pin.tsx
│
├─ content/
│  ├─ company.ts
│  ├─ services.ts
│  ├─ objects.ts
│  ├─ reviews.ts
│  ├─ process.ts
│  ├─ brands.ts
│  ├─ faq.ts
│  └─ seo.ts
│
├─ lib/
│  ├─ whatsapp.ts
│  ├─ phone.ts
│  ├─ seo.ts
│  ├─ analytics.ts
│  └─ scroll.ts
│
├─ public/
│  ├─ images/objects/<slug>/...
│  ├─ images/services/...
│  └─ fonts/
│      ├─ Fraunces-Variable.woff2
│      ├─ Switzer-Variable.woff2
│      └─ JetBrainsMono-Variable.woff2
│
└─ tests/
   ├─ unit/
   │   ├─ phone.test.ts
   │   ├─ whatsapp.test.ts
   │   ├─ calculator-reducer.test.ts
   │   └─ calculator-component.test.tsx
   └─ e2e/
       └─ calculator-smoke.spec.ts
```

---

# PHASE 1 — Foundation

### Task 1: Bootstrap Next.js project

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `app/layout.tsx` (stub), `app/page.tsx` (stub), `.eslintrc.json`, `.prettierrc`

- [ ] **Step 1: Initialize Next.js with TS strict**

Run from `/Users/said/Desktop/FREE/LuxOkna`:
```bash
npx create-next-app@latest luxokna --typescript --eslint --app --src-dir=false --turbopack=false --tailwind=false --import-alias "@/*"
```
When prompted, accept defaults except: NO Tailwind, NO src dir, YES App Router.

- [ ] **Step 2: Move scaffold to project root (we want a flat layout)**

```bash
cd luxokna && cp -R . .. && cd .. && rm -rf luxokna
```
Project files are now in `/Users/said/Desktop/FREE/LuxOkna/`.

- [ ] **Step 3: Enable strict TS**

Edit `tsconfig.json` to ensure:
```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "ES2022"],
    "module": "esnext",
    "moduleResolution": "bundler",
    "jsx": "preserve",
    "paths": { "@/*": ["./*"] }
  }
}
```

- [ ] **Step 4: Configure Prettier**

Create `.prettierrc`:
```json
{
  "semi": false,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 100,
  "arrowParens": "always"
}
```

- [ ] **Step 5: Verify build**

Run: `npm run dev`
Expected: dev server at `http://localhost:3000` with default Next.js placeholder. Stop with Ctrl+C.

- [ ] **Step 6: ✓ Чекпойнт** — clean baseline boots and TS strict passes.

---

### Task 2: Install Vanilla Extract

**Files:**
- Modify: `next.config.ts`
- Modify: `package.json`

- [ ] **Step 1: Install packages**

```bash
npm install @vanilla-extract/css @vanilla-extract/next-plugin @vanilla-extract/dynamic
```

- [ ] **Step 2: Wire plugin in `next.config.ts`**

```ts
import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin'

const withVanillaExtract = createVanillaExtractPlugin()

const nextConfig = {
  experimental: { viewTransition: true },
  images: { formats: ['image/avif', 'image/webp'] },
}

export default withVanillaExtract(nextConfig)
```

- [ ] **Step 3: Smoke-test it**

Create `app/_probe.css.ts`:
```ts
import { style } from '@vanilla-extract/css'
export const probe = style({ color: 'red' })
```
Import it in `app/page.tsx` and apply to root element. Run `npm run dev` and verify text is red.

- [ ] **Step 4: Remove probe**

Delete `app/_probe.css.ts` and revert `app/page.tsx`.

- [ ] **Step 5: ✓ Чекпойнт**

---

### Task 3: Install local fonts

**Files:**
- Download to: `public/fonts/Fraunces-Variable.woff2`, `public/fonts/Switzer-Variable.woff2`, `public/fonts/JetBrainsMono-Variable.woff2`
- Create: `app/styles/fonts.ts`

- [ ] **Step 1: Download font files**

Fraunces: https://fonts.google.com/specimen/Fraunces (download variable woff2 with Cyrillic subset)
JetBrains Mono: https://fonts.google.com/specimen/JetBrains+Mono (variable woff2 with Cyrillic)
Switzer: https://www.fontshare.com/fonts/switzer (download variable woff2 — free for personal/commercial)

Place all three in `public/fonts/`.

- [ ] **Step 2: Create `app/styles/fonts.ts`**

```ts
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
```

- [ ] **Step 3: Wire fonts into `app/layout.tsx`**

```tsx
import { fraunces, switzer, jbm } from './styles/fonts'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${fraunces.variable} ${switzer.variable} ${jbm.variable}`}>
      <body>{children}</body>
    </html>
  )
}
```

- [ ] **Step 4: Verify in DevTools**

Run `npm run dev`. In Network tab, three .woff2 files load. In Elements, `<html>` has three `--font-*` variables.

- [ ] **Step 5: ✓ Чекпойнт**

---

### Task 4: Design tokens

**Files:**
- Create: `app/styles/tokens.css.ts`

- [ ] **Step 1: Write tokens**

```ts
import { createGlobalTheme } from '@vanilla-extract/css'

export const vars = createGlobalTheme(':root', {
  color: {
    bone: '#F2ECDF',
    boneDeep: '#E8DFCB',
    char: '#1A1714',
    charSoft: '#3A332C',
    copper: '#A85031',
    copperDeep: '#7D3A22',
    sand: '#7A6A52',
    rule: 'rgba(26, 23, 20, 0.12)',
    paper: '#FAF6EC',
  },
  font: {
    display: 'var(--font-display), Georgia, serif',
    body: 'var(--font-body), system-ui, sans-serif',
    mono: 'var(--font-mono), ui-monospace, monospace',
  },
  fontSize: {
    micro: '11px', meta: '13px', body: '16px', lead: '19px',
    h4: '24px', h3: '32px', h2: '48px', h1: '72px', display: '120px',
  },
  lineHeight: {
    tight: '1.05', snug: '1.2', body: '1.55', loose: '1.75',
  },
  space: {
    x0: '0', x1: '4px', x2: '8px', x3: '12px', x4: '16px',
    x5: '24px', x6: '32px', x7: '48px', x8: '64px', x9: '96px',
    x10: '128px', x11: '192px',
  },
  radius: {
    none: '0', hair: '2px', soft: '6px',
  },
  rule: {
    hair: '1px', thin: '1.5px', bold: '3px',
  },
  duration: {
    fast: '180ms', base: '320ms', slow: '620ms', story: '1100ms',
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
```

- [ ] **Step 2: Import in layout**

In `app/layout.tsx`, add at top: `import './styles/tokens.css'` — wait, VE compiles `.css.ts` → emits CSS. Instead use side-effect import:
```ts
import './styles/tokens.css.ts'
```

- [ ] **Step 3: ✓ Чекпойнт** — DevTools shows all `--*` variables on `:root`.

---

### Task 5: CSS reset and globals

**Files:**
- Create: `app/styles/reset.css.ts`
- Create: `app/styles/globals.css.ts`

- [ ] **Step 1: Write reset**

`app/styles/reset.css.ts`:
```ts
import { globalStyle } from '@vanilla-extract/css'

globalStyle('*, *::before, *::after', { boxSizing: 'border-box' })
globalStyle('*', { margin: 0, padding: 0 })
globalStyle('html, body', { height: '100%' })
globalStyle('img, picture, svg, video', { display: 'block', maxWidth: '100%' })
globalStyle('button', { font: 'inherit', background: 'none', border: 0, cursor: 'pointer', color: 'inherit' })
globalStyle('a', { color: 'inherit', textDecoration: 'none' })
globalStyle('ul, ol', { listStyle: 'none' })
globalStyle('input, textarea, select', { font: 'inherit', color: 'inherit' })
```

- [ ] **Step 2: Write globals**

`app/styles/globals.css.ts`:
```ts
import { globalStyle } from '@vanilla-extract/css'
import { vars } from './tokens.css'

globalStyle('html', {
  fontSize: '16px',
  textRendering: 'optimizeLegibility',
  WebkitFontSmoothing: 'antialiased',
})

globalStyle('body', {
  backgroundColor: vars.color.bone,
  color: vars.color.char,
  fontFamily: vars.font.body,
  fontSize: vars.fontSize.body,
  lineHeight: vars.lineHeight.body,
  fontFeatureSettings: '"ss01" on, "ss02" on',
})

globalStyle('::selection', {
  backgroundColor: vars.color.copper,
  color: vars.color.paper,
})

globalStyle(':focus-visible', {
  outline: 'none',
  boxShadow: `0 2px 0 ${vars.color.copper}`,
})
```

- [ ] **Step 3: Side-effect import in layout**

Add to `app/layout.tsx`:
```ts
import './styles/reset.css'
import './styles/globals.css'
```

- [ ] **Step 4: Smoke**

Page background is bone, text is char.

- [ ] **Step 5: ✓ Чекпойнт**

---

### Task 6: Configure Vitest + Testing Library

**Files:**
- Create: `vitest.config.ts`, `tests/setup.ts`, `tests/unit/sanity.test.ts`

- [ ] **Step 1: Install**

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom @vitejs/plugin-react
```

- [ ] **Step 2: `vitest.config.ts`**

```ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    globals: true,
    include: ['tests/unit/**/*.test.{ts,tsx}'],
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, '.') },
  },
})
```

- [ ] **Step 3: `tests/setup.ts`**

```ts
import '@testing-library/jest-dom/vitest'
```

- [ ] **Step 4: Sanity test**

`tests/unit/sanity.test.ts`:
```ts
import { describe, it, expect } from 'vitest'

describe('sanity', () => {
  it('adds', () => expect(1 + 1).toBe(2))
})
```

- [ ] **Step 5: Add npm script**

In `package.json`:
```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 6: Run**

```bash
npm test
```
Expected: 1 test passing.

- [ ] **Step 7: ✓ Чекпойнт**

---

### Task 7: Configure Playwright (one smoke)

**Files:**
- Create: `playwright.config.ts`, `tests/e2e/smoke.spec.ts`

- [ ] **Step 1: Install**

```bash
npm install -D @playwright/test
npx playwright install --with-deps chromium
```

- [ ] **Step 2: `playwright.config.ts`**

```ts
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [{ name: 'chromium', use: devices['Desktop Chrome'] }],
})
```

- [ ] **Step 3: Smoke spec**

`tests/e2e/smoke.spec.ts`:
```ts
import { test, expect } from '@playwright/test'

test('home loads', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/LuxOkna/)
})
```

- [ ] **Step 4: Add scripts**

```json
"test:e2e": "playwright test"
```

- [ ] **Step 5: Run**

```bash
npm run test:e2e
```
Expected: passes (title contains Next on default scaffold).

- [ ] **Step 6: ✓ Чекпойнт — PHASE 1 COMPLETE.** Manually review: dev server boots, tokens visible in DevTools, fonts load, tests run.

---

# PHASE 2 — Content & lib (TDD core)

### Task 8: `content/company.ts`

**Files:** Create `content/company.ts`

- [ ] **Step 1: Write**

```ts
export type Segment = 'premium' | 'middle' | 'economy'
export type Material = 'aluminium' | 'pvc'

export const company = {
  name: 'LuxOkna',
  legalName: 'LuxOkna',
  tagline: 'Свет. Тишина. Стиль.',
  city: 'Грозный',
  region: 'Чеченская Республика',
  countryCode: 'RU',
  address: 'г. Грозный, [уточняется]',
  coords: { lat: 43.3168, lng: 45.6981 },
  yearsOnMarket: 20,
  phone: '+79288983897',
  whatsapp: '79288983897',
  instagram: 'luxokna95',
  instagramUrl: 'https://www.instagram.com/luxokna95/',
  hours: 'Пн–Сб 09:00–18:00',
  brands: ['Schüco', 'Rehau', 'Alutech'] as const,
  domain: 'luxokna.ru',
} as const

export type Company = typeof company
```

- [ ] **Step 2: ✓ Чекпойнт**

---

### Task 9: `content/services.ts`

**Files:** Create `content/services.ts`

- [ ] **Step 1: Write**

```ts
export type ServiceSlug = 'okna' | 'dveri' | 'vitrazhi' | 'podokonniki'

export interface Service {
  slug: ServiceSlug
  number: string          // '01'
  title: string
  tagline: string
  hero: { image: string; alt: string }
  intro: string           // 1-2 параграфа
  bullets: string[]       // 4-6 коротких преимуществ
  materials: string[]
  brands: string[]
  faq: { q: string; a: string }[]
}

export const services: Service[] = [
  {
    slug: 'okna',
    number: '01',
    title: 'Окна',
    tagline: 'Свет, тишина, стиль',
    hero: { image: '/images/services/okna-hero.jpg', alt: 'Панорамное окно' },
    intro:
      'Системы Schüco, Rehau и Alutech для жилых и общественных пространств. Производство — собственный цех, монтаж — собственная бригада.',
    bullets: [
      '5-камерные ПВХ-профили',
      'Алюминиевые системы с термомостом',
      'Триплекс и энергосбережение',
      'Гарантия на профиль до 40 лет',
      'Замер и проектирование бесплатно',
      'Монтаж по ГОСТ 30971-2012',
    ],
    materials: ['ПВХ', 'Алюминий'],
    brands: ['Schüco', 'Rehau', 'Alutech'],
    faq: [
      { q: 'Сколько занимает монтаж?', a: 'Стандартное окно — 1–2 часа после демонтажа старого.' },
      { q: 'Какая гарантия?', a: 'На профиль — до 40 лет, на монтаж — 5 лет.' },
    ],
  },
  {
    slug: 'dveri',
    number: '02',
    title: 'Двери',
    tagline: 'Вход с характером',
    hero: { image: '/images/services/dveri-hero.jpg', alt: 'Входная дверь' },
    intro: 'Алюминиевые и ПВХ-двери: входные, балконные, межкомнатные. Любые конфигурации, включая порталы.',
    bullets: ['Алюминий Alutech', 'ПВХ Rehau', 'Порталы до 3 м', 'Цвет по RAL', 'Скрытые петли'],
    materials: ['Алюминий', 'ПВХ'],
    brands: ['Schüco', 'Rehau', 'Alutech'],
    faq: [],
  },
  {
    slug: 'vitrazhi',
    number: '03',
    title: 'Витражи',
    tagline: 'Стекло от пола до потолка',
    hero: { image: '/images/services/vitrazhi-hero.jpg', alt: 'Алюминиевый витраж' },
    intro: 'Стоечно-ригельные и структурные фасады. Проектируем под объект, согласуем нагрузки.',
    bullets: ['Schüco FWS', 'Структурное остекление', 'Триплекс, мультифункциональные пакеты', 'Высота до 6 м'],
    materials: ['Алюминий'],
    brands: ['Schüco', 'Alutech'],
    faq: [],
  },
  {
    slug: 'podokonniki',
    number: '04',
    title: 'Подоконники',
    tagline: 'Деталь, на которую смотрят каждый день',
    hero: { image: '/images/services/podokonniki-hero.jpg', alt: 'Каменный подоконник' },
    intro: 'Натуральный камень, кварцевый агломерат, массив дерева. Раскрой и установка под объект.',
    bullets: ['Гранит, мрамор', 'Кварц', 'Массив дуба, ясеня', 'Раскрой ЧПУ'],
    materials: ['Камень', 'Кварц', 'Дерево'],
    brands: [],
    faq: [],
  },
]

export const getService = (slug: ServiceSlug) => services.find((s) => s.slug === slug)!
```

- [ ] **Step 2: ✓ Чекпойнт**

---

### Task 10: `content/objects.ts`

**Files:** Create `content/objects.ts`

- [ ] **Step 1: Write**

```ts
import type { ServiceSlug } from './services'

export interface ObjectItem {
  slug: string
  title: string
  city: string
  year: number
  service: ServiceSlug
  area: number           // м²
  brand: 'Schüco' | 'Rehau' | 'Alutech' | 'Other'
  segment: 'premium' | 'middle' | 'economy'
  images: { src: string; alt: string; w: number; h: number }[]
  description?: string
}

const placeholder = (n: number) => ({
  src: `/images/objects/placeholder/${n}.jpg`,
  alt: 'Объект LuxOkna',
  w: 1600, h: 1067,
})

export const objects: ObjectItem[] = [
  {
    slug: 'grozny-city-01',
    title: 'Жилой комплекс «Грозный-Сити»',
    city: 'Грозный',
    year: 2024,
    service: 'okna',
    area: 320,
    brand: 'Schüco',
    segment: 'premium',
    images: [placeholder(1), placeholder(2), placeholder(3)],
    description: 'Полная замена остекления верхних этажей.',
  },
  {
    slug: 'mosque-yard-01',
    title: 'Двор мечети',
    city: 'Шали',
    year: 2023,
    service: 'vitrazhi',
    area: 180,
    brand: 'Alutech',
    segment: 'premium',
    images: [placeholder(4), placeholder(5)],
  },
  // ещё 10 плейсхолдеров — копи-паст с разными slug/year/service/area
  ...Array.from({ length: 10 }, (_, i) => ({
    slug: `placeholder-${i + 3}`,
    title: `Объект №${i + 3}`,
    city: 'Грозный',
    year: 2020 + (i % 5),
    service: (['okna', 'dveri', 'vitrazhi', 'podokonniki'] as const)[i % 4],
    area: 50 + i * 12,
    brand: (['Schüco', 'Rehau', 'Alutech'] as const)[i % 3],
    segment: (['premium', 'middle', 'economy'] as const)[i % 3],
    images: [placeholder(i + 6)],
  })),
]
```

- [ ] **Step 2: ✓ Чекпойнт**

---

### Task 11: Remaining content stubs

**Files:** Create `content/reviews.ts`, `content/process.ts`, `content/brands.ts`, `content/faq.ts`, `content/seo.ts`

- [ ] **Step 1: `content/reviews.ts`**

```ts
export interface Review {
  author: string
  city: string
  text: string
  rating: 1 | 2 | 3 | 4 | 5
  source: 'instagram' | 'whatsapp' | 'site' | '2gis'
}

export const reviews: Review[] = [
  { author: 'Хава М.', city: 'Грозный', text: 'Поставили окна Schüco в квартиру — тише не бывает.', rating: 5, source: 'instagram' },
  { author: 'Адам И.', city: 'Аргун', text: 'Витражи на веранду сделали идеально. Замер, монтаж — всё чётко.', rating: 5, source: '2gis' },
  { author: 'Зара А.', city: 'Грозный', text: 'Подоконник из гранита — красиво и дорого выглядит.', rating: 5, source: 'instagram' },
  { author: 'Магомед-С. Б.', city: 'Шали', text: 'Двери Alutech, держат мороз отлично.', rating: 5, source: 'whatsapp' },
  { author: 'Ислам Х.', city: 'Грозный', text: 'Цех своими глазами видел. Делают на совесть.', rating: 5, source: 'site' },
  { author: 'Малика Т.', city: 'Гудермес', text: 'Менеджеры приехали в день обращения, замер бесплатно.', rating: 5, source: 'instagram' },
]
```

- [ ] **Step 2: `content/process.ts`**

```ts
export interface ProcessStep {
  n: string
  title: string
  body: string
}

export const process: ProcessStep[] = [
  { n: '01', title: 'Заявка', body: 'Звонок или WhatsApp. Уточняем задачу.' },
  { n: '02', title: 'Замер', body: 'Бесплатный выезд инженера на объект.' },
  { n: '03', title: 'Смета', body: 'Подбор системы и расчёт под бюджет.' },
  { n: '04', title: 'Производство', body: 'Изготовление в собственном цеху, 5–14 дней.' },
  { n: '05', title: 'Монтаж', body: 'Установка по ГОСТ 30971-2012 и пуско-наладка.' },
]
```

- [ ] **Step 3: `content/brands.ts`**

```ts
export interface Brand {
  slug: 'schuco' | 'rehau' | 'alutech'
  name: string
  origin: string
  segment: ('premium' | 'middle' | 'economy')[]
  blurb: string
  url: string
}

export const brands: Brand[] = [
  { slug: 'schuco', name: 'Schüco', origin: 'Германия, 1951', segment: ['premium', 'middle'], blurb: 'Архитектурные системы алюминия и ПВХ. Стандарт для премиум-объектов.', url: 'https://www.schueco.com' },
  { slug: 'rehau', name: 'Rehau', origin: 'Германия, 1948', segment: ['premium', 'middle'], blurb: 'ПВХ-профили с многокамерной структурой.', url: 'https://www.rehau.com' },
  { slug: 'alutech', name: 'Alutech', origin: 'Беларусь, 1996', segment: ['premium'], blurb: 'Алюминиевые системы премиум-сегмента.', url: 'https://www.alutech-group.com' },
]
```

- [ ] **Step 4: `content/faq.ts`**

```ts
export interface FAQ { q: string; a: string }

export const generalFaq: FAQ[] = [
  { q: 'Замер платный?', a: 'Нет, замер бесплатный в Грозном и пригородах.' },
  { q: 'Как происходит оплата?', a: 'Аванс 50% после согласования сметы, остаток после монтажа.' },
  { q: 'Какие гарантии?', a: 'На профиль — до 40 лет (от производителя), на монтажные работы — 5 лет.' },
  { q: 'Работаете с юр. лицами?', a: 'Да, договор и закрывающие документы.' },
]
```

- [ ] **Step 5: `content/seo.ts`**

```ts
import { company } from './company'

export interface PageSeo {
  title: string
  description: string
  ogImage?: string
}

export const seo = {
  home: {
    title: `${company.name} — Окна Schüco, Rehau, Alutech в Грозном`,
    description: `Премиум-окна, двери, витражи и подоконники в Грозном. ${company.yearsOnMarket}+ лет на рынке, собственный цех, монтаж по ГОСТ.`,
  },
  okna: {
    title: `Окна Schüco / Rehau / Alutech — ${company.city} · ${company.name}`,
    description: 'Алюминиевые и ПВХ-окна премиум-сегмента. Замер, производство, монтаж.',
  },
  dveri: {
    title: `Двери алюминиевые и ПВХ — ${company.city} · ${company.name}`,
    description: 'Входные и балконные двери. Alutech, Schüco, Rehau. Любые конфигурации.',
  },
  vitrazhi: {
    title: `Витражи и алюминиевые фасады — ${company.city} · ${company.name}`,
    description: 'Стоечно-ригельные и структурные фасады. Schüco FWS, высота до 6 м.',
  },
  podokonniki: {
    title: `Подоконники из камня и кварца — ${company.city} · ${company.name}`,
    description: 'Натуральный камень, кварц, массив. Раскрой ЧПУ и установка.',
  },
  obyekty: {
    title: `Объекты ${company.name} — портфолио`,
    description: 'Завершённые объекты по окнам, дверям, витражам и подоконникам.',
  },
  oNas: {
    title: `О компании ${company.name}`,
    description: `${company.yearsOnMarket}+ лет на рынке премиум-окон. Собственный цех, авторизованный монтаж.`,
  },
  kontakty: {
    title: `Контакты ${company.name} — Грозный`,
    description: `Адрес, телефон, WhatsApp. ${company.hours}.`,
  },
} as const satisfies Record<string, PageSeo>
```

- [ ] **Step 6: ✓ Чекпойнт**

---

### Task 12: `lib/phone.ts` (TDD)

**Files:** Create `lib/phone.ts`, `tests/unit/phone.test.ts`

- [ ] **Step 1: Install**

```bash
npm install libphonenumber-js
```

- [ ] **Step 2: Write failing tests**

`tests/unit/phone.test.ts`:
```ts
import { describe, it, expect } from 'vitest'
import { formatRuPhoneMask, isValidRuPhone, normalizeRuPhone } from '@/lib/phone'

describe('formatRuPhoneMask', () => {
  it('formats partial input', () => {
    expect(formatRuPhoneMask('79881234567')).toBe('+7 (988) 123-45-67')
    expect(formatRuPhoneMask('988')).toBe('+7 (988')
    expect(formatRuPhoneMask('9881')).toBe('+7 (988) 1')
    expect(formatRuPhoneMask('')).toBe('+7 (')
  })

  it('strips non-digits', () => {
    expect(formatRuPhoneMask('+7-988-aaa-12-34')).toBe('+7 (988) 123-4')
  })
})

describe('isValidRuPhone', () => {
  it('accepts valid RU mobile', () => {
    expect(isValidRuPhone('+79881234567')).toBe(true)
    expect(isValidRuPhone('89881234567')).toBe(true)
  })
  it('rejects short', () => {
    expect(isValidRuPhone('+79881234')).toBe(false)
  })
})

describe('normalizeRuPhone', () => {
  it('returns E.164', () => {
    expect(normalizeRuPhone('+7 (988) 123-45-67')).toBe('+79881234567')
    expect(normalizeRuPhone('89881234567')).toBe('+79881234567')
  })
})
```

- [ ] **Step 3: Run — expect fail (module not found)**

```bash
npm test -- phone
```
Expected: FAIL.

- [ ] **Step 4: Implement**

`lib/phone.ts`:
```ts
import { parsePhoneNumberFromString } from 'libphonenumber-js'

export function formatRuPhoneMask(input: string): string {
  const digits = input.replace(/\D/g, '').replace(/^[78]/, '')
  const d = digits.slice(0, 10)
  let out = '+7 ('
  if (d.length === 0) return out
  out += d.slice(0, 3)
  if (d.length > 3) out += ')'
  if (d.length > 3) out += ' ' + d.slice(3, 6)
  if (d.length > 6) out += '-' + d.slice(6, 8)
  if (d.length > 8) out += '-' + d.slice(8, 10)
  return out
}

export function normalizeRuPhone(input: string): string | null {
  const p = parsePhoneNumberFromString(input, 'RU')
  return p?.isValid() ? p.number : null
}

export function isValidRuPhone(input: string): boolean {
  return normalizeRuPhone(input) !== null
}
```

- [ ] **Step 5: Run — expect pass**

```bash
npm test -- phone
```
Expected: all phone tests PASS.

- [ ] **Step 6: ✓ Чекпойнт**

---

### Task 13: `lib/whatsapp.ts` (TDD)

**Files:** Create `lib/whatsapp.ts`, `tests/unit/whatsapp.test.ts`

- [ ] **Step 1: Failing tests**

`tests/unit/whatsapp.test.ts`:
```ts
import { describe, it, expect } from 'vitest'
import { buildWhatsAppMessage, buildWhatsAppUrl } from '@/lib/whatsapp'

const sample = {
  width: 1200, height: 1400,
  material: 'pvc' as const,
  segment: 'schuco-rehau' as const,  // calculator segment (NOT objects-portfolio tier)
  name: 'Саид',
  phone: '+79881234567',
}

describe('buildWhatsAppMessage', () => {
  it('contains all fields', () => {
    const msg = buildWhatsAppMessage(sample)
    expect(msg).toContain('1 200 × 1 400 мм')
    expect(msg).toContain('1.68 м²')
    expect(msg).toContain('ПВХ')
    expect(msg).toContain('Schüco / Rehau')
    expect(msg).toContain('Саид')
    expect(msg).toContain('+7 (988) 123-45-67')
    expect(msg).toContain('luxokna.ru')
  })

  it('omits name line when missing', () => {
    const msg = buildWhatsAppMessage({ ...sample, name: '' })
    expect(msg).not.toContain('Имя:')
  })
})

describe('buildWhatsAppUrl', () => {
  it('produces wa.me link with encoded text', () => {
    const url = buildWhatsAppUrl(sample)
    expect(url.startsWith('https://wa.me/79288983897?text=')).toBe(true)
    const decoded = decodeURIComponent(url.split('?text=')[1]!)
    expect(decoded).toContain('1 200 × 1 400 мм')
  })
})
```

- [ ] **Step 2: Run — expect fail**

- [ ] **Step 3: Implement**

`lib/whatsapp.ts`:
```ts
import { company } from '@/content/company'
import { formatRuPhoneMask } from './phone'

export type Material = 'aluminium' | 'pvc'
export type Segment = 'alutech' | 'schuco-rehau' | 'economy'

export interface CalcInput {
  width: number   // мм
  height: number  // мм
  material: Material
  segment: Segment
  name: string
  phone: string   // E.164
}

const MATERIAL_LABEL: Record<Material, string> = {
  aluminium: 'Алюминий',
  pvc: 'ПВХ',
}

const SEGMENT_LABEL: Record<Segment, string> = {
  alutech: 'Alutech (премиум)',
  'schuco-rehau': 'Schüco / Rehau (премиум/средний)',
  economy: 'Эконом',
}

const fmtMm = (n: number) => n.toLocaleString('ru-RU').replace(/ /g, ' ')
const fmtM2 = (mm2: number) => (mm2 / 1_000_000).toFixed(2)

export function buildWhatsAppMessage(input: CalcInput): string {
  const area = fmtM2(input.width * input.height)
  const lines = [
    'Здравствуйте! Хочу рассчитать остекление:',
    '',
    `• Проём: ${fmtMm(input.width)} × ${fmtMm(input.height)} мм (${area} м²)`,
    `• Материал: ${MATERIAL_LABEL[input.material]}`,
    `• Сегмент: ${SEGMENT_LABEL[input.segment]}`,
  ]
  if (input.name.trim()) lines.push(`• Имя: ${input.name.trim()}`)
  lines.push(`• Телефон: ${formatRuPhoneMask(input.phone)}`)
  lines.push('', `Отправлено через ${company.domain}`)
  return lines.join('\n')
}

export function buildWhatsAppUrl(input: CalcInput): string {
  const text = encodeURIComponent(buildWhatsAppMessage(input))
  return `https://wa.me/${company.whatsapp}?text=${text}`
}
```

- [ ] **Step 4: Run — expect pass**

- [ ] **Step 5: ✓ Чекпойнт**

---

### Task 14: `lib/seo.ts`

**Files:** Create `lib/seo.ts`

- [ ] **Step 1: Write**

```ts
import type { Metadata } from 'next'
import { company } from '@/content/company'
import type { PageSeo } from '@/content/seo'

export function makeMetadata(p: PageSeo, path: string = '/'): Metadata {
  const canonical = `https://${company.domain}${path}`
  return {
    title: p.title,
    description: p.description,
    metadataBase: new URL(`https://${company.domain}`),
    alternates: { canonical },
    openGraph: {
      title: p.title,
      description: p.description,
      url: canonical,
      siteName: company.name,
      locale: 'ru_RU',
      type: 'website',
      images: p.ogImage ? [{ url: p.ogImage }] : undefined,
    },
    twitter: { card: 'summary_large_image' },
  }
}

export function localBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: company.name,
    image: `https://${company.domain}/og-default.jpg`,
    telephone: company.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: company.city,
      addressRegion: company.region,
      addressCountry: company.countryCode,
      streetAddress: company.address,
    },
    geo: { '@type': 'GeoCoordinates', latitude: company.coords.lat, longitude: company.coords.lng },
    openingHours: company.hours,
    priceRange: '₽₽₽',
    url: `https://${company.domain}`,
    sameAs: [company.instagramUrl],
  }
}
```

- [ ] **Step 2: ✓ Чекпойнт**

---

### Task 15: `lib/scroll.ts` (Lenis init)

**Files:** Create `lib/scroll.ts`, modify `app/layout.tsx`

- [ ] **Step 1: Install**

```bash
npm install lenis
```

- [ ] **Step 2: Write**

`lib/scroll.ts`:
```ts
'use client'
import { useEffect } from 'react'
import Lenis from 'lenis'

export function useSmoothScroll() {
  useEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    const lenis = new Lenis({ lerp: 0.1 })
    let raf = 0
    const tick = (t: number) => {
      lenis.raf(t)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [])
}
```

- [ ] **Step 3: Mount in client wrapper**

Create `app/_smooth.tsx`:
```tsx
'use client'
import { useSmoothScroll } from '@/lib/scroll'
export default function SmoothScroll() {
  useSmoothScroll()
  return null
}
```
Add `<SmoothScroll />` inside `<body>` in `app/layout.tsx`.

- [ ] **Step 4: ✓ Чекпойнт — PHASE 2 COMPLETE.** Verify: `npm test` passes (phone + whatsapp). Smooth scroll works on long page (test by adding placeholder content).

---

# PHASE 3 — Primitive components

### Task 16: `<Hairline />`

**Files:** Create `components/Hairline/Hairline.tsx`, `components/Hairline/Hairline.css.ts`

- [ ] **Step 1: Styles**

`components/Hairline/Hairline.css.ts`:
```ts
import { style, styleVariants } from '@vanilla-extract/css'
import { vars } from '@/app/styles/tokens.css'

export const base = style({ display: 'block', border: 0, backgroundColor: vars.color.rule })
export const dir = styleVariants({
  horizontal: { width: '100%', height: vars.rule.hair },
  vertical: { width: vars.rule.hair, height: '100%' },
})
```

- [ ] **Step 2: Component**

`components/Hairline/Hairline.tsx`:
```tsx
import * as s from './Hairline.css'

interface Props {
  direction?: 'horizontal' | 'vertical'
  className?: string
}

export function Hairline({ direction = 'horizontal', className }: Props) {
  return <hr aria-hidden className={[s.base, s.dir[direction], className].filter(Boolean).join(' ')} />
}
```

- [ ] **Step 3: ✓ Чекпойнт**

---

### Task 17: `<SectionNumber />`

**Files:** `components/SectionNumber/SectionNumber.tsx` + `.css.ts`

- [ ] **Step 1: Styles**

```ts
import { style } from '@vanilla-extract/css'
import { vars } from '@/app/styles/tokens.css'

export const wrap = style({ display: 'flex', gap: vars.space.x5, alignItems: 'baseline' })
export const n = style({
  fontFamily: vars.font.mono,
  fontSize: vars.fontSize.h2,
  color: vars.color.copper,
  fontWeight: 500,
  letterSpacing: '0.02em',
})
export const title = style({
  fontFamily: vars.font.display,
  fontSize: vars.fontSize.h2,
  lineHeight: vars.lineHeight.tight,
  fontVariationSettings: '"SOFT" 50, "WONK" 1',
})
```

- [ ] **Step 2: Component**

```tsx
import * as s from './SectionNumber.css'

export function SectionNumber({ n, title }: { n: string; title: string }) {
  return (
    <header className={s.wrap}>
      <span className={s.n}>{n}</span>
      <h2 className={s.title}>{title}</h2>
    </header>
  )
}
```

- [ ] **Step 3: ✓ Чекпойнт**

---

### Task 18: Custom SVG icon set

**Files:** `components/icons/index.ts` + per-icon files

- [ ] **Step 1: Create base icon wrapper**

`components/icons/Icon.tsx`:
```tsx
import { SVGProps } from 'react'
export interface IconProps extends SVGProps<SVGSVGElement> { size?: number }

export function Icon({ size = 24, children, ...rest }: IconProps & { children: React.ReactNode }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.25} strokeLinecap="round" strokeLinejoin="round"
      aria-hidden focusable={false} {...rest}>
      {children}
    </svg>
  )
}
```

- [ ] **Step 2: WhatsApp icon**

`components/icons/WhatsApp.tsx`:
```tsx
import { Icon, IconProps } from './Icon'
export const WhatsApp = (p: IconProps) => (
  <Icon {...p}>
    <path d="M20.5 11.6a8.5 8.5 0 1 1-4.4-7.4L20.5 3l-1.2 4.4a8.5 8.5 0 0 1 1.2 4.2Z" />
    <path d="M9 9.5c.4 1.7 1.8 3.1 3.5 3.5l1.2-1.2a.7.7 0 0 1 .8-.2l2 .8" />
  </Icon>
)
```

- [ ] **Step 3: Instagram, Phone, ArrowRight, ArrowLeft, ArrowUp, ArrowDown, Plus, Minus, Check, Close, Filter, Pin**

Repeat the pattern for each. Each file ~10 lines. Use a search engine or sketch your own SVG path strings; aim for a consistent 1.25 stroke, rounded caps, viewBox 24×24.

For brevity I list the path data the engineer should use for each (any valid `d` is OK, but stay within 24×24):

```tsx
// Instagram.tsx
<rect x="3" y="3" width="18" height="18" rx="4" />
<circle cx="12" cy="12" r="4" />
<circle cx="17" cy="7" r="0.6" fill="currentColor" />

// Phone.tsx
<path d="M5 4c0 8 7 15 15 15l2-3-4-2-2 2c-3-1-5-3-6-6l2-2-2-4-3 0Z" />

// ArrowRight.tsx
<path d="M5 12h14M13 6l6 6-6 6" />

// ArrowLeft.tsx
<path d="M19 12H5M11 6l-6 6 6 6" />

// ArrowUp.tsx
<path d="M12 19V5M6 11l6-6 6 6" />

// ArrowDown.tsx
<path d="M12 5v14M18 13l-6 6-6-6" />

// Plus.tsx
<path d="M12 5v14M5 12h14" />

// Minus.tsx
<path d="M5 12h14" />

// Check.tsx
<path d="M5 12l5 5L20 7" />

// Close.tsx
<path d="M6 6l12 12M18 6L6 18" />

// Filter.tsx
<path d="M3 5h18M6 12h12M10 19h4" />

// Pin.tsx
<path d="M12 22s7-7 7-12a7 7 0 0 0-14 0c0 5 7 12 7 12Z" />
<circle cx="12" cy="10" r="2.5" />
```

- [ ] **Step 4: Barrel export**

`components/icons/index.ts`:
```ts
export * from './WhatsApp'
export * from './Instagram'
export * from './Phone'
export * from './ArrowRight'
export * from './ArrowLeft'
export * from './ArrowUp'
export * from './ArrowDown'
export * from './Plus'
export * from './Minus'
export * from './Check'
export * from './Close'
export * from './Filter'
export * from './Pin'
```

- [ ] **Step 5: ✓ Чекпойнт** — render all icons on a sandbox page and eyeball.

---

### Task 19: `<MagneticButton />`

**Files:** `components/MagneticButton/MagneticButton.tsx` + `.css.ts`

- [ ] **Step 1: Install GSAP**

```bash
npm install gsap
```

- [ ] **Step 2: Styles**

```ts
import { style } from '@vanilla-extract/css'
import { vars } from '@/app/styles/tokens.css'

export const root = style({
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  padding: `${vars.space.x3} ${vars.space.x5}`,
  border: `${vars.rule.thin} solid ${vars.color.char}`,
  borderRadius: vars.radius.hair,
  backgroundColor: 'transparent',
  fontFamily: vars.font.mono,
  fontSize: vars.fontSize.meta,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  transition: `background ${vars.duration.fast} ${vars.ease.out}, color ${vars.duration.fast} ${vars.ease.out}`,
  willChange: 'transform',
  selectors: {
    '&:hover': { backgroundColor: vars.color.char, color: vars.color.bone },
  },
})
```

- [ ] **Step 3: Component**

```tsx
'use client'
import { useRef } from 'react'
import gsap from 'gsap'
import * as s from './MagneticButton.css'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  strength?: number
}

export function MagneticButton({ strength = 0.35, className, children, ...rest }: Props) {
  const ref = useRef<HTMLButtonElement>(null)

  const move = (e: React.MouseEvent) => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = ref.current!
    const r = el.getBoundingClientRect()
    const x = (e.clientX - (r.left + r.width / 2)) * strength
    const y = (e.clientY - (r.top + r.height / 2)) * strength
    gsap.to(el, { x, y, duration: 0.4, ease: 'expo.out' })
  }
  const leave = () => gsap.to(ref.current, { x: 0, y: 0, duration: 0.6, ease: 'expo.out' })

  return (
    <button ref={ref} onMouseMove={move} onMouseLeave={leave}
      className={[s.root, className].filter(Boolean).join(' ')} data-cursor {...rest}>
      {children}
    </button>
  )
}
```

- [ ] **Step 4: ✓ Чекпойнт**

---

### Task 20: `<RevealImage />`

**Files:** `components/RevealImage/RevealImage.tsx` + `.css.ts`

- [ ] **Step 1: Styles**

```ts
import { style, keyframes } from '@vanilla-extract/css'
import { vars } from '@/app/styles/tokens.css'

const reveal = keyframes({
  from: { clipPath: 'inset(100% 0 0 0)' },
  to: { clipPath: 'inset(0 0 0 0)' },
})

export const wrap = style({ position: 'relative', overflow: 'hidden' })
export const img = style({
  display: 'block', width: '100%', height: 'auto',
  selectors: {
    '&[data-revealed="true"]': {
      animation: `${reveal} ${vars.duration.story} ${vars.ease.out} both`,
    },
  },
})
```

- [ ] **Step 2: Component**

```tsx
'use client'
import { useEffect, useRef, useState } from 'react'
import Image, { ImageProps } from 'next/image'
import * as s from './RevealImage.css'

export function RevealImage(props: ImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect() } },
      { threshold: 0.2 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div ref={ref} className={s.wrap}>
      <Image {...props} className={s.img} data-revealed={shown || undefined} />
    </div>
  )
}
```

- [ ] **Step 3: ✓ Чекпойнт**

---

### Task 21: `<Cursor />`

**Files:** `components/Cursor/Cursor.tsx` + `.css.ts`

- [ ] **Step 1: Styles**

```ts
import { style } from '@vanilla-extract/css'
import { vars } from '@/app/styles/tokens.css'

export const root = style({
  position: 'fixed',
  top: 0, left: 0,
  width: 24, height: 24,
  border: `${vars.rule.hair} solid ${vars.color.char}`,
  pointerEvents: 'none',
  zIndex: 9999,
  transform: 'translate(-50%, -50%)',
  mixBlendMode: 'difference',
  transition: `width ${vars.duration.fast} ${vars.ease.out}, height ${vars.duration.fast} ${vars.ease.out}`,
  selectors: {
    '&[data-hot="true"]': { width: 48, height: 48 },
    '@media (hover: none)': { display: 'none' },
  },
})
```

- [ ] **Step 2: Component**

```tsx
'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import * as s from './Cursor.css'

export function Cursor() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (matchMedia('(hover: none)').matches) return
    const el = ref.current!
    const move = (e: MouseEvent) => gsap.to(el, { x: e.clientX, y: e.clientY, duration: 0.25, ease: 'expo.out' })
    const over = (e: MouseEvent) => {
      const hot = !!(e.target as HTMLElement).closest('[data-cursor]')
      el.dataset.hot = String(hot)
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
    }
  }, [])
  return <div ref={ref} className={s.root} />
}
```

- [ ] **Step 3: ✓ Чекпойнт**

---

### Task 22: `<Marquee />`

**Files:** `components/Marquee/Marquee.tsx` + `.css.ts`

- [ ] **Step 1: Styles**

```ts
import { style, keyframes } from '@vanilla-extract/css'
import { vars } from '@/app/styles/tokens.css'

const slide = keyframes({
  from: { transform: 'translateX(0)' },
  to: { transform: 'translateX(-50%)' },
})

export const wrap = style({
  overflow: 'hidden',
  borderBlock: `${vars.rule.hair} solid ${vars.color.rule}`,
  paddingBlock: vars.space.x3,
  fontFamily: vars.font.mono,
  fontSize: vars.fontSize.meta,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  color: vars.color.charSoft,
})

export const track = style({
  display: 'inline-flex', gap: vars.space.x7, whiteSpace: 'nowrap',
  animation: `${slide} 60s linear infinite`,
})

export const item = style({ display: 'inline-flex', gap: vars.space.x3, alignItems: 'center' })
```

- [ ] **Step 2: Component**

```tsx
import * as s from './Marquee.css'

export function Marquee({ items }: { items: string[] }) {
  const doubled = [...items, ...items]
  return (
    <div className={s.wrap} aria-hidden>
      <div className={s.track}>
        {doubled.map((t, i) => (
          <span key={i} className={s.item}>
            <span>{t}</span>
            <span>·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 3: ✓ Чекпойнт — PHASE 3 COMPLETE.**

---

# PHASE 4 — Layout chrome

### Task 23: `<Header />`

**Files:** `components/Header/Header.tsx` + `.css.ts`

- [ ] **Step 1: Styles**

```ts
import { style } from '@vanilla-extract/css'
import { vars } from '@/app/styles/tokens.css'

export const root = style({
  position: 'fixed', top: 0, insetInline: 0, zIndex: 100,
  display: 'grid', gridTemplateColumns: 'auto 1fr auto', alignItems: 'center',
  padding: `${vars.space.x4} ${vars.space.x7}`,
  backgroundColor: vars.color.bone,
  borderBottom: `${vars.rule.hair} solid ${vars.color.rule}`,
  transition: `transform ${vars.duration.base} ${vars.ease.out}`,
  selectors: { '&[data-hidden="true"]': { transform: 'translateY(-100%)' } },
})

export const logo = style({
  fontFamily: vars.font.display,
  fontSize: vars.fontSize.h4,
  letterSpacing: '-0.01em',
})

export const nav = style({
  display: 'flex', gap: vars.space.x6, justifyContent: 'center',
  fontFamily: vars.font.mono, fontSize: vars.fontSize.meta,
  textTransform: 'uppercase', letterSpacing: '0.08em',
  '@media': { 'screen and (max-width: 768px)': { display: 'none' } },
})

export const cta = style({ justifySelf: 'end' })
```

- [ ] **Step 2: Component**

```tsx
'use client'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import * as s from './Header.css'
import { MagneticButton } from '../MagneticButton/MagneticButton'

const NAV = [
  { href: '/uslugi/okna', label: 'Окна' },
  { href: '/uslugi/dveri', label: 'Двери' },
  { href: '/uslugi/vitrazhi', label: 'Витражи' },
  { href: '/uslugi/podokonniki', label: 'Подоконники' },
  { href: '/obyekty', label: 'Объекты' },
  { href: '/o-nas', label: 'О нас' },
  { href: '/kontakty', label: 'Контакты' },
]

export function Header({ onCalcOpen }: { onCalcOpen: () => void }) {
  const last = useRef(0)
  const [hidden, setHidden] = useState(false)
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setHidden(y > 120 && y > last.current)
      last.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={s.root} data-hidden={hidden || undefined}>
      <Link href="/" className={s.logo} data-cursor>LUX·OKNA</Link>
      <nav className={s.nav}>
        {NAV.map((n) => <Link key={n.href} href={n.href} data-cursor>{n.label}</Link>)}
      </nav>
      <div className={s.cta}>
        <MagneticButton onClick={onCalcOpen}>Рассчитать</MagneticButton>
      </div>
    </header>
  )
}
```

- [ ] **Step 3: ✓ Чекпойнт**

---

### Task 24: `<Footer />`

**Files:** `components/Footer/Footer.tsx` + `.css.ts`

- [ ] **Step 1: Styles**

```ts
import { style } from '@vanilla-extract/css'
import { vars } from '@/app/styles/tokens.css'

export const root = style({
  borderTop: `${vars.rule.hair} solid ${vars.color.rule}`,
  padding: `${vars.space.x9} ${vars.space.x7} ${vars.space.x5}`,
  backgroundColor: vars.color.boneDeep,
  fontFamily: vars.font.body,
  fontSize: vars.fontSize.meta,
  color: vars.color.charSoft,
})

export const grid = style({
  display: 'grid', gap: vars.space.x7,
  gridTemplateColumns: '2fr 1fr 1fr 1fr',
  '@media': { 'screen and (max-width: 768px)': { gridTemplateColumns: '1fr' } },
})

export const colTitle = style({
  fontFamily: vars.font.mono, textTransform: 'uppercase', letterSpacing: '0.06em',
  color: vars.color.sand, marginBottom: vars.space.x3,
})

export const bottom = style({
  marginTop: vars.space.x8, paddingTop: vars.space.x4,
  borderTop: `${vars.rule.hair} solid ${vars.color.rule}`,
  display: 'flex', justifyContent: 'space-between',
})
```

- [ ] **Step 2: Component**

```tsx
import Link from 'next/link'
import * as s from './Footer.css'
import { company } from '@/content/company'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className={s.root}>
      <div className={s.grid}>
        <div>
          <div className={s.colTitle}>{company.name}</div>
          <p>{company.tagline}</p>
          <p>{company.yearsOnMarket}+ лет на рынке премиум-окон</p>
        </div>
        <div>
          <div className={s.colTitle}>Услуги</div>
          <ul>
            <li><Link href="/uslugi/okna" data-cursor>Окна</Link></li>
            <li><Link href="/uslugi/dveri" data-cursor>Двери</Link></li>
            <li><Link href="/uslugi/vitrazhi" data-cursor>Витражи</Link></li>
            <li><Link href="/uslugi/podokonniki" data-cursor>Подоконники</Link></li>
          </ul>
        </div>
        <div>
          <div className={s.colTitle}>Компания</div>
          <ul>
            <li><Link href="/obyekty" data-cursor>Объекты</Link></li>
            <li><Link href="/o-nas" data-cursor>О нас</Link></li>
            <li><Link href="/kontakty" data-cursor>Контакты</Link></li>
          </ul>
        </div>
        <div>
          <div className={s.colTitle}>Контакты</div>
          <p>{company.address}</p>
          <p>{company.hours}</p>
          <p><a href={`tel:${company.phone}`} data-cursor>{company.phone}</a></p>
          <p><a href={company.instagramUrl} data-cursor>@{company.instagram}</a></p>
        </div>
      </div>
      <div className={s.bottom}>
        <span>© {year} {company.name}</span>
        <span>{company.city}</span>
      </div>
    </footer>
  )
}
```

- [ ] **Step 3: ✓ Чекпойнт**

---

### Task 25: `<SideRule />`

**Files:** `components/SideRule/SideRule.tsx` + `.css.ts`

- [ ] **Step 1: Styles**

```ts
import { style } from '@vanilla-extract/css'
import { vars } from '@/app/styles/tokens.css'

export const root = style({
  position: 'fixed', top: 0, bottom: 0, left: 0,
  width: vars.grid.sideRule,
  display: 'grid', placeItems: 'center', justifyContent: 'center',
  borderRight: `${vars.rule.hair} solid ${vars.color.rule}`,
  zIndex: 50,
  pointerEvents: 'none',
  '@media': { 'screen and (max-width: 768px)': { display: 'none' } },
})

export const text = style({
  fontFamily: vars.font.mono, fontSize: vars.fontSize.micro,
  textTransform: 'uppercase', letterSpacing: '0.18em',
  writingMode: 'vertical-rl', transform: 'rotate(180deg)',
  color: vars.color.sand,
})
```

- [ ] **Step 2: Component**

```tsx
'use client'
import { useEffect, useState } from 'react'
import * as s from './SideRule.css'

export function SideRule({ section }: { section: string }) {
  const [date, setDate] = useState('')
  useEffect(() => {
    const d = new Date()
    const dd = String(d.getDate()).padStart(2, '0')
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const yy = String(d.getFullYear()).slice(-2)
    setDate(`${dd}.${mm}.${yy}`)
  }, [])
  return (
    <aside className={s.root} aria-hidden>
      <span className={s.text}>{section} / GROZNY / {date}</span>
    </aside>
  )
}
```

- [ ] **Step 3: ✓ Чекпойнт**

---

### Task 26: `<WhatsAppFab />`

**Files:** `components/WhatsAppFab/WhatsAppFab.tsx` + `.css.ts`

- [ ] **Step 1: Styles**

```ts
import { style } from '@vanilla-extract/css'
import { vars } from '@/app/styles/tokens.css'

export const root = style({
  position: 'fixed', right: vars.space.x5, bottom: vars.space.x5, zIndex: 99,
  width: 56, height: 56, borderRadius: '50%',
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  backgroundColor: vars.color.copper, color: vars.color.paper,
  border: `${vars.rule.thin} solid ${vars.color.char}`,
  willChange: 'transform',
  transition: `background ${vars.duration.fast} ${vars.ease.out}`,
  selectors: { '&:hover': { backgroundColor: vars.color.copperDeep } },
})
```

- [ ] **Step 2: Component**

```tsx
'use client'
import gsap from 'gsap'
import { useRef } from 'react'
import { WhatsApp } from '../icons/WhatsApp'
import { company } from '@/content/company'
import * as s from './WhatsAppFab.css'

export function WhatsAppFab() {
  const ref = useRef<HTMLAnchorElement>(null)
  const move = (e: React.MouseEvent) => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const r = ref.current!.getBoundingClientRect()
    gsap.to(ref.current, {
      x: (e.clientX - (r.left + r.width / 2)) * 0.25,
      y: (e.clientY - (r.top + r.height / 2)) * 0.25,
      duration: 0.4, ease: 'expo.out',
    })
  }
  const leave = () => gsap.to(ref.current, { x: 0, y: 0, duration: 0.6, ease: 'expo.out' })

  const url = `https://wa.me/${company.whatsapp}`
  return (
    <a ref={ref} href={url} target="_blank" rel="noopener noreferrer"
       aria-label="Написать в WhatsApp" className={s.root} data-cursor
       onMouseMove={move} onMouseLeave={leave}
       onClick={() => (window as any).ym?.(0, 'reachGoal', 'wa_floating_click')}>
      <WhatsApp size={28} />
    </a>
  )
}
```

- [ ] **Step 3: ✓ Чекпойнт**

---

### Task 27: Assemble `app/layout.tsx`

**Files:** modify `app/layout.tsx`, create `app/_chrome.tsx`

- [ ] **Step 1: Chrome client wrapper**

`app/_chrome.tsx`:
```tsx
'use client'
import { useState } from 'react'
import { Header } from '@/components/Header/Header'
import { Footer } from '@/components/Footer/Footer'
import { SideRule } from '@/components/SideRule/SideRule'
import { WhatsAppFab } from '@/components/WhatsAppFab/WhatsAppFab'
import { Cursor } from '@/components/Cursor/Cursor'
import { Calculator } from '@/components/Calculator/Calculator'
import { useSmoothScroll } from '@/lib/scroll'

export function Chrome({ section, children }: { section: string; children: React.ReactNode }) {
  useSmoothScroll()
  const [open, setOpen] = useState(false)
  return (
    <>
      <Cursor />
      <SideRule section={section} />
      <Header onCalcOpen={() => setOpen(true)} />
      <main>{children}</main>
      <Footer />
      <WhatsAppFab />
      <Calculator open={open} onClose={() => setOpen(false)} />
    </>
  )
}
```

- [ ] **Step 2: Wire layout**

`app/layout.tsx`:
```tsx
import './styles/tokens.css'
import './styles/reset.css'
import './styles/globals.css'
import { fraunces, switzer, jbm } from './styles/fonts'
import { Chrome } from './_chrome'
import { localBusinessJsonLd } from '@/lib/seo'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${fraunces.variable} ${switzer.variable} ${jbm.variable}`}>
      <body>
        <script type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()) }} />
        <Chrome section="00 / HOME">{children}</Chrome>
      </body>
    </html>
  )
}
```

Note: the `Calculator` import will fail until Task 28+ — comment out that line and the `<Calculator />` element for now, will re-enable after Phase 5.

- [ ] **Step 3: ✓ Чекпойнт — PHASE 4 COMPLETE.** Visit `/` — see header (text logo + nav + CTA), footer, side rule, WhatsApp FAB, custom cursor.

---

# PHASE 5 — Calculator (TDD-heavy)

### Task 28: Reducer + types (TDD)

**Files:** `components/Calculator/types.ts`, `components/Calculator/reducer.ts`, `tests/unit/calculator-reducer.test.ts`

- [ ] **Step 1: Types**

`components/Calculator/types.ts`:
```ts
import type { Material, Segment, CalcInput } from '@/lib/whatsapp'
export type { Material, Segment, CalcInput }

export interface CalcState {
  step: 1 | 2 | 3 | 4
  width: number
  height: number
  material: Material | null
  segment: Segment | null
  name: string
  phone: string
}

export type Action =
  | { type: 'goto'; step: CalcState['step'] }
  | { type: 'next' }
  | { type: 'back' }
  | { type: 'setWidth'; v: number }
  | { type: 'setHeight'; v: number }
  | { type: 'setMaterial'; v: Material }
  | { type: 'setSegment'; v: Segment }
  | { type: 'setName'; v: string }
  | { type: 'setPhone'; v: string }
  | { type: 'reset' }

export const initialState: CalcState = {
  step: 1, width: 1200, height: 1400,
  material: null, segment: null, name: '', phone: '',
}
```

- [ ] **Step 2: Failing tests**

`tests/unit/calculator-reducer.test.ts`:
```ts
import { describe, it, expect } from 'vitest'
import { reducer } from '@/components/Calculator/reducer'
import { initialState } from '@/components/Calculator/types'

describe('reducer', () => {
  it('next advances step within range', () => {
    expect(reducer(initialState, { type: 'next' }).step).toBe(2)
    const onLast = { ...initialState, step: 4 as const }
    expect(reducer(onLast, { type: 'next' }).step).toBe(4)
  })

  it('back decrements step within range', () => {
    const s2 = { ...initialState, step: 2 as const }
    expect(reducer(s2, { type: 'back' }).step).toBe(1)
    expect(reducer(initialState, { type: 'back' }).step).toBe(1)
  })

  it('clamps width to [300, 6000]', () => {
    expect(reducer(initialState, { type: 'setWidth', v: 100 }).width).toBe(300)
    expect(reducer(initialState, { type: 'setWidth', v: 9999 }).width).toBe(6000)
    expect(reducer(initialState, { type: 'setWidth', v: 1500 }).width).toBe(1500)
  })

  it('sets material and segment', () => {
    const m = reducer(initialState, { type: 'setMaterial', v: 'pvc' })
    expect(m.material).toBe('pvc')
    const sg = reducer(m, { type: 'setSegment', v: 'alutech' })
    expect(sg.segment).toBe('alutech')
  })

  it('reset returns initial', () => {
    const dirty = { ...initialState, step: 3 as const, name: 'X' }
    expect(reducer(dirty, { type: 'reset' })).toEqual(initialState)
  })
})
```

- [ ] **Step 3: Implement**

`components/Calculator/reducer.ts`:
```ts
import { CalcState, Action, initialState } from './types'

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v))

export function reducer(state: CalcState, action: Action): CalcState {
  switch (action.type) {
    case 'goto': return { ...state, step: action.step }
    case 'next': return { ...state, step: Math.min(4, state.step + 1) as CalcState['step'] }
    case 'back': return { ...state, step: Math.max(1, state.step - 1) as CalcState['step'] }
    case 'setWidth': return { ...state, width: clamp(action.v, 300, 6000) }
    case 'setHeight': return { ...state, height: clamp(action.v, 300, 6000) }
    case 'setMaterial': return { ...state, material: action.v }
    case 'setSegment': return { ...state, segment: action.v }
    case 'setName': return { ...state, name: action.v }
    case 'setPhone': return { ...state, phone: action.v }
    case 'reset': return initialState
  }
}
```

- [ ] **Step 4: Run — expect pass**

- [ ] **Step 5: ✓ Чекпойнт**

---

### Task 29: Drawer shell

**Files:** `components/Calculator/Calculator.tsx`, `components/Calculator/Calculator.css.ts`

- [ ] **Step 1: Styles**

```ts
import { style, keyframes } from '@vanilla-extract/css'
import { vars } from '@/app/styles/tokens.css'

const slideIn = keyframes({ from: { transform: 'translateX(100%)' }, to: { transform: 'translateX(0)' } })

export const overlay = style({
  position: 'fixed', inset: 0, backgroundColor: 'rgba(26,23,20,0.5)', zIndex: 200,
})
export const drawer = style({
  position: 'fixed', top: 0, right: 0, bottom: 0,
  width: 480, maxWidth: '100vw',
  backgroundColor: vars.color.bone,
  borderLeft: `${vars.rule.thin} solid ${vars.color.char}`,
  display: 'grid', gridTemplateRows: 'auto 1fr auto',
  zIndex: 201,
  animation: `${slideIn} ${vars.duration.base} ${vars.ease.out}`,
})
export const header = style({
  display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center',
  padding: vars.space.x5, borderBottom: `${vars.rule.hair} solid ${vars.color.rule}`,
})
export const progress = style({
  display: 'flex', gap: vars.space.x2, alignItems: 'center',
  fontFamily: vars.font.mono, fontSize: vars.fontSize.meta,
  textTransform: 'uppercase', letterSpacing: '0.08em', color: vars.color.sand,
})
export const close = style({
  width: 36, height: 36, display: 'grid', placeItems: 'center',
  border: `${vars.rule.hair} solid ${vars.color.rule}`,
})
export const body = style({ padding: vars.space.x6, overflowY: 'auto' })
export const footer = style({
  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
  padding: vars.space.x5, borderTop: `${vars.rule.hair} solid ${vars.color.rule}`,
})
```

- [ ] **Step 2: Component (shell only — steps in next tasks)**

```tsx
'use client'
import { useEffect, useReducer, useRef } from 'react'
import { reducer } from './reducer'
import { initialState } from './types'
import * as s from './Calculator.css'
import { Close } from '../icons/Close'
import { MagneticButton } from '../MagneticButton/MagneticButton'

interface Props { open: boolean; onClose: () => void }

export function Calculator({ open, onClose }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const drawerRef = useRef<HTMLDivElement>(null)

  // ESC + focus management
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    drawerRef.current?.focus()
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  // sessionStorage persistence
  useEffect(() => {
    const raw = sessionStorage.getItem('luxokna.calc')
    if (raw) {
      try { Object.entries(JSON.parse(raw)).forEach(([k, v]) => dispatch({ type: `set${k[0].toUpperCase()}${k.slice(1)}` as any, v } as any)) } catch {}
    }
  }, [])
  useEffect(() => {
    sessionStorage.setItem('luxokna.calc', JSON.stringify(state))
  }, [state])

  if (!open) return null

  return (
    <>
      <div className={s.overlay} onClick={onClose} />
      <aside className={s.drawer} role="dialog" aria-modal="true" aria-labelledby="calc-title"
             tabIndex={-1} ref={drawerRef}>
        <div className={s.header}>
          <div className={s.progress}>
            <span id="calc-title">{['ПРОЁМ', 'МАТЕРИАЛ', 'СЕГМЕНТ', 'КОНТАКТ'][state.step - 1]}</span>
            <span>0{state.step} / 04</span>
          </div>
          <button className={s.close} onClick={onClose} aria-label="Закрыть"><Close /></button>
        </div>
        <div className={s.body}>
          {/* steps mounted in next tasks */}
          <p>Шаг {state.step}</p>
        </div>
        <div className={s.footer}>
          <button onClick={() => dispatch({ type: 'back' })} disabled={state.step === 1}>← Назад</button>
          <MagneticButton onClick={() => dispatch({ type: 'next' })}>Далее →</MagneticButton>
        </div>
      </aside>
    </>
  )
}
```

- [ ] **Step 3: Re-enable Calculator import in `app/_chrome.tsx`** (was commented in Task 27).

- [ ] **Step 4: Verify in browser** — click header CTA, drawer slides in. ESC closes. Click overlay closes.

- [ ] **Step 5: ✓ Чекпойнт**

---

### Task 30: Step 1 — Проём

**Files:** `components/Calculator/steps/StepProem.tsx`, styles inline or shared `steps.css.ts`

- [ ] **Step 1: Shared step styles**

`components/Calculator/steps/steps.css.ts`:
```ts
import { style } from '@vanilla-extract/css'
import { vars } from '@/app/styles/tokens.css'

export const field = style({ display: 'grid', gap: vars.space.x2, marginBottom: vars.space.x5 })
export const label = style({
  fontFamily: vars.font.mono, fontSize: vars.fontSize.meta,
  textTransform: 'uppercase', letterSpacing: '0.06em', color: vars.color.sand,
})
export const input = style({
  width: '100%', padding: vars.space.x3,
  border: `${vars.rule.thin} solid ${vars.color.char}`,
  borderRadius: vars.radius.hair,
  fontFamily: vars.font.display, fontSize: vars.fontSize.h3,
  backgroundColor: 'transparent',
})
export const meta = style({
  fontFamily: vars.font.mono, fontSize: vars.fontSize.meta,
  color: vars.color.charSoft,
})
export const cardGrid = style({ display: 'grid', gap: vars.space.x3 })
export const card = style({
  padding: vars.space.x5, cursor: 'pointer',
  border: `${vars.rule.thin} solid ${vars.color.rule}`,
  selectors: {
    '&[data-selected="true"]': { borderColor: vars.color.copper, backgroundColor: vars.color.paper },
    '&:hover': { borderColor: vars.color.char },
  },
})
export const error = style({
  fontFamily: vars.font.mono, fontSize: vars.fontSize.meta, color: vars.color.copper,
})
```

- [ ] **Step 2: Component**

`components/Calculator/steps/StepProem.tsx`:
```tsx
import { CalcState, Action } from '../types'
import * as s from './steps.css'

export function StepProem({ state, dispatch }: { state: CalcState; dispatch: React.Dispatch<Action> }) {
  const area = ((state.width * state.height) / 1_000_000).toFixed(2)
  return (
    <>
      <div className={s.field}>
        <label className={s.label} htmlFor="w">Ширина, мм</label>
        <input id="w" type="number" inputMode="numeric"
          className={s.input} min={300} max={6000} step={50}
          value={state.width}
          onChange={(e) => dispatch({ type: 'setWidth', v: Number(e.target.value) })} />
      </div>
      <div className={s.field}>
        <label className={s.label} htmlFor="h">Высота, мм</label>
        <input id="h" type="number" inputMode="numeric"
          className={s.input} min={300} max={6000} step={50}
          value={state.height}
          onChange={(e) => dispatch({ type: 'setHeight', v: Number(e.target.value) })} />
      </div>
      <p className={s.meta}>S = {area} м²</p>
    </>
  )
}
```

- [ ] **Step 3: Mount in `Calculator.tsx`** — replace `<p>Шаг {state.step}</p>` with:

```tsx
{state.step === 1 && <StepProem state={state} dispatch={dispatch} />}
```

(import at top).

- [ ] **Step 4: ✓ Чекпойнт**

---

### Task 31: Step 2 — Материал

**Files:** `components/Calculator/steps/StepMaterial.tsx`

- [ ] **Step 1: Component**

```tsx
import { CalcState, Action } from '../types'
import * as s from './steps.css'

const OPTIONS = [
  { v: 'pvc', title: 'ПВХ', sub: 'Тёплый. Для жилых пространств.' },
  { v: 'aluminium', title: 'Алюминий', sub: 'Прочный. Для витражей и больших проёмов.' },
] as const

export function StepMaterial({ state, dispatch }: { state: CalcState; dispatch: React.Dispatch<Action> }) {
  return (
    <div className={s.cardGrid}>
      {OPTIONS.map((o) => (
        <button key={o.v} className={s.card} data-selected={state.material === o.v || undefined}
          onClick={() => { dispatch({ type: 'setMaterial', v: o.v }); dispatch({ type: 'next' }) }}>
          <strong style={{ display: 'block', fontSize: 24, fontFamily: 'var(--font-display)' }}>{o.title}</strong>
          <span className={s.meta}>{o.sub}</span>
        </button>
      ))}
    </div>
  )
}
```

- [ ] **Step 2: Mount**

```tsx
{state.step === 2 && <StepMaterial state={state} dispatch={dispatch} />}
```

- [ ] **Step 3: ✓ Чекпойнт**

---

### Task 32: Step 3 — Сегмент

**Files:** `components/Calculator/steps/StepSegment.tsx`

- [ ] **Step 1: Component**

```tsx
import { CalcState, Action } from '../types'
import * as s from './steps.css'

const OPTIONS = [
  { v: 'alutech', title: 'Alutech', sub: 'Премиум-алюминий. Для архитектурных проёмов.' },
  { v: 'schuco-rehau', title: 'Schüco / Rehau', sub: 'Премиум/средний сегмент.' },
  { v: 'economy', title: 'Эконом', sub: 'Базовые решения, оптимальная цена.' },
] as const

export function StepSegment({ state, dispatch }: { state: CalcState; dispatch: React.Dispatch<Action> }) {
  return (
    <div className={s.cardGrid}>
      {OPTIONS.map((o) => (
        <button key={o.v} className={s.card} data-selected={state.segment === o.v || undefined}
          onClick={() => { dispatch({ type: 'setSegment', v: o.v }); dispatch({ type: 'next' }) }}>
          <strong style={{ display: 'block', fontSize: 24, fontFamily: 'var(--font-display)' }}>{o.title}</strong>
          <span className={s.meta}>{o.sub}</span>
        </button>
      ))}
    </div>
  )
}
```

- [ ] **Step 2: Mount.** `{state.step === 3 && <StepSegment ... />}`

- [ ] **Step 3: ✓ Чекпойнт**

---

### Task 33: Step 4 — Контакт + превью

**Files:** `components/Calculator/steps/StepContact.tsx`, `components/Calculator/MessagePreview.tsx`

- [ ] **Step 1: Preview**

`components/Calculator/MessagePreview.tsx`:
```tsx
import { buildWhatsAppMessage, type CalcInput } from '@/lib/whatsapp'
import * as s from './steps/steps.css'

export function MessagePreview({ input }: { input: CalcInput }) {
  return <pre className={s.meta} style={{ whiteSpace: 'pre-wrap' }}>{buildWhatsAppMessage(input)}</pre>
}
```

- [ ] **Step 2: Step**

`components/Calculator/steps/StepContact.tsx`:
```tsx
import { useState } from 'react'
import { CalcState, Action } from '../types'
import { formatRuPhoneMask, isValidRuPhone, normalizeRuPhone } from '@/lib/phone'
import { MessagePreview } from '../MessagePreview'
import { buildWhatsAppUrl, type CalcInput } from '@/lib/whatsapp'
import * as s from './steps.css'

export function StepContact({ state, dispatch }: { state: CalcState; dispatch: React.Dispatch<Action> }) {
  const [touched, setTouched] = useState(false)
  const phoneValid = isValidRuPhone(state.phone)

  const input: CalcInput | null =
    state.material && state.segment
      ? { width: state.width, height: state.height, material: state.material, segment: state.segment,
          name: state.name, phone: normalizeRuPhone(state.phone) ?? state.phone }
      : null

  return (
    <>
      <div className={s.field}>
        <label className={s.label} htmlFor="name">Имя (необязательно)</label>
        <input id="name" className={s.input} value={state.name}
          onChange={(e) => dispatch({ type: 'setName', v: e.target.value })} />
      </div>
      <div className={s.field}>
        <label className={s.label} htmlFor="phone">Телефон</label>
        <input id="phone" inputMode="tel" className={s.input}
          value={formatRuPhoneMask(state.phone)}
          onBlur={() => setTouched(true)}
          onChange={(e) => dispatch({ type: 'setPhone', v: e.target.value.replace(/\D/g, '') })} />
        {touched && !phoneValid && <span className={s.error}>Введите корректный номер</span>}
      </div>
      {input && (
        <div className={s.field}>
          <span className={s.label}>Сообщение в WhatsApp</span>
          <MessagePreview input={input} />
          <a href={input && phoneValid ? buildWhatsAppUrl(input) : '#'}
             target="_blank" rel="noopener noreferrer"
             onClick={(e) => {
               if (!phoneValid || !input) { e.preventDefault(); setTouched(true); return }
               ;(window as any).ym?.(0, 'reachGoal', 'wa_open')
             }}
             style={{ display: 'inline-block', marginTop: 16, padding: '12px 24px',
                      background: 'var(--copper)', color: 'white', textDecoration: 'none' }}>
            Открыть в WhatsApp →
          </a>
        </div>
      )}
    </>
  )
}
```

- [ ] **Step 3: Mount**. `{state.step === 4 && <StepContact ... />}`

- [ ] **Step 4: ✓ Чекпойнт**

---

### Task 34: Calculator component test

**Files:** `tests/unit/calculator-component.test.tsx`

- [ ] **Step 1: Test**

```tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Calculator } from '@/components/Calculator/Calculator'

describe('Calculator drawer', () => {
  it('opens, shows step 1, advances to step 2', async () => {
    const onClose = vi.fn()
    render(<Calculator open={true} onClose={onClose} />)
    expect(screen.getByText(/ПРОЁМ/)).toBeInTheDocument()
    const next = screen.getByRole('button', { name: /Далее/ })
    await userEvent.click(next)
    expect(screen.getByText(/МАТЕРИАЛ/)).toBeInTheDocument()
  })

  it('closes on ESC', async () => {
    const onClose = vi.fn()
    render(<Calculator open={true} onClose={onClose} />)
    await userEvent.keyboard('{Escape}')
    expect(onClose).toHaveBeenCalled()
  })
})
```

- [ ] **Step 2: Run** — `npm test -- calculator-component`. Expect: PASS.

- [ ] **Step 3: ✓ Чекпойнт**

---

### Task 35: Analytics hook

**Files:** `lib/analytics.ts`

- [ ] **Step 1: Write**

```ts
type Ym = ((id: number, action: string, goal: string, params?: object) => void) & { (...args: any[]): void }
type Gtag = (event: string, name: string, params?: object) => void

declare global {
  interface Window { ym?: Ym; gtag?: Gtag }
}

export function track(event: string, params?: object) {
  if (typeof window === 'undefined') return
  window.ym?.(Number(process.env.NEXT_PUBLIC_YM_ID ?? 0), 'reachGoal', event, params)
  window.gtag?.('event', event, params)
}
```

- [ ] **Step 2: Wire `track()` into Calculator footer (`components/Calculator/Calculator.tsx`)**

Replace the footer's Next button handler:
```tsx
// before:
<MagneticButton onClick={() => dispatch({ type: 'next' })}>Далее →</MagneticButton>

// after — add import at top: import { track } from '@/lib/analytics'
<MagneticButton onClick={() => {
  const nextStep = Math.min(4, state.step + 1)
  if (nextStep !== state.step) track(`calc_step_${nextStep}`)
  dispatch({ type: 'next' })
}}>Далее →</MagneticButton>
```

Add `useEffect` for `calc_open` near the existing ESC handler:
```tsx
useEffect(() => { if (open) track('calc_open') }, [open])
```

- [ ] **Step 3: Replace inline ym calls with `track()` in `WhatsAppFab.tsx` (Task 26) and `StepContact.tsx` (Task 33)**

In `components/WhatsAppFab/WhatsAppFab.tsx`:
```tsx
// before:
onClick={() => (window as any).ym?.(0, 'reachGoal', 'wa_floating_click')}

// after — add: import { track } from '@/lib/analytics'
onClick={() => track('wa_floating_click')}
```

In `components/Calculator/steps/StepContact.tsx`:
```tsx
// before:
;(window as any).ym?.(0, 'reachGoal', 'wa_open')

// after — add: import { track } from '@/lib/analytics'
track('wa_open')
```

- [ ] **Step 4: ✓ Чекпойнт**

---

### Task 36: sessionStorage round-trip test

**Files:** extend `tests/unit/calculator-component.test.tsx`

- [ ] **Step 1: Add test**

```tsx
it('persists state to sessionStorage across mount', async () => {
  const { unmount } = render(<Calculator open={true} onClose={() => {}} />)
  const w = screen.getByLabelText('Ширина, мм') as HTMLInputElement
  await userEvent.clear(w)
  await userEvent.type(w, '1500')
  unmount()
  render(<Calculator open={true} onClose={() => {}} />)
  const w2 = screen.getByLabelText('Ширина, мм') as HTMLInputElement
  expect(w2.value).toBe('1500')
})
```

- [ ] **Step 2: Run** — likely fails. The simple persistence in Task 29 is wrong (it tries to call setters dynamically). Replace the persistence block in `Calculator.tsx` with a cleaner approach:

```tsx
// in reducer.ts — add helper
export function rehydrate(): CalcState | null {
  try {
    const raw = typeof window !== 'undefined' ? sessionStorage.getItem('luxokna.calc') : null
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}
```

In `Calculator.tsx`, replace the `useReducer(reducer, initialState)` call with:
```tsx
const [state, dispatch] = useReducer(reducer, initialState, (s) => rehydrate() ?? s)
```

And remove the now-broken inline rehydrate `useEffect`.

- [ ] **Step 3: Re-run** — expect PASS.

- [ ] **Step 4: ✓ Чекпойнт — PHASE 5 COMPLETE.**

---

# PHASE 6 — Cards

### Task 37: `<ServiceCard />`

**Files:** `components/ServiceCard/ServiceCard.tsx` + `.css.ts`

- [ ] **Step 1: Styles**

```ts
import { style } from '@vanilla-extract/css'
import { vars } from '@/app/styles/tokens.css'

export const root = style({
  display: 'grid', gap: vars.space.x3,
  paddingBlock: vars.space.x6,
  borderTop: `${vars.rule.thin} solid ${vars.color.char}`,
})
export const head = style({
  display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
})
export const n = style({
  fontFamily: vars.font.mono, fontSize: vars.fontSize.meta,
  color: vars.color.sand, letterSpacing: '0.06em',
})
export const title = style({
  fontFamily: vars.font.display, fontSize: vars.fontSize.h2,
  lineHeight: vars.lineHeight.tight,
  fontVariationSettings: '"SOFT" 50, "WONK" 1',
})
export const tag = style({ color: vars.color.charSoft, fontStyle: 'italic' })
export const media = style({
  aspectRatio: '21 / 9', overflow: 'hidden', position: 'relative',
})
```

- [ ] **Step 2: Component**

```tsx
import Link from 'next/link'
import Image from 'next/image'
import type { Service } from '@/content/services'
import * as s from './ServiceCard.css'

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link href={`/uslugi/${service.slug}`} className={s.root} data-cursor
          style={{ viewTransitionName: `service-${service.slug}` }}>
      <div className={s.head}>
        <span className={s.n}>{service.number}</span>
        <span className={s.tag}>{service.tagline}</span>
      </div>
      <h3 className={s.title}>{service.title}</h3>
      <div className={s.media}>
        <Image src={service.hero.image} alt={service.hero.alt} fill style={{ objectFit: 'cover' }} sizes="100vw" />
      </div>
    </Link>
  )
}
```

- [ ] **Step 3: ✓ Чекпойнт**

---

### Task 38: `<ObjectCard />`

**Files:** `components/ObjectCard/ObjectCard.tsx` + `.css.ts`

- [ ] **Step 1: Styles**

```ts
import { style } from '@vanilla-extract/css'
import { vars } from '@/app/styles/tokens.css'

export const root = style({
  display: 'grid', gap: vars.space.x2,
})
export const media = style({
  aspectRatio: '4 / 3', position: 'relative', overflow: 'hidden',
})
export const meta = style({
  fontFamily: vars.font.mono, fontSize: vars.fontSize.micro,
  textTransform: 'uppercase', letterSpacing: '0.08em',
  color: vars.color.sand,
  display: 'flex', justifyContent: 'space-between',
})
export const title = style({
  fontFamily: vars.font.display, fontSize: vars.fontSize.body,
  lineHeight: vars.lineHeight.snug,
})
```

- [ ] **Step 2: Component**

```tsx
import Image from 'next/image'
import type { ObjectItem } from '@/content/objects'
import * as s from './ObjectCard.css'

export function ObjectCard({ item }: { item: ObjectItem }) {
  const img = item.images[0]
  return (
    <article className={s.root}>
      <div className={s.media} style={{ viewTransitionName: `object-${item.slug}` }}>
        <Image src={img.src} alt={img.alt} fill style={{ objectFit: 'cover' }}
               sizes="(max-width: 768px) 50vw, 25vw" />
      </div>
      <div className={s.meta}>
        <span>{item.city} · {item.year}</span>
        <span>{item.area} м²</span>
      </div>
      <h4 className={s.title}>{item.title}</h4>
    </article>
  )
}
```

- [ ] **Step 3: ✓ Чекпойнт — PHASE 6 COMPLETE.**

---

# PHASE 7 — Pages

### Task 39: Home `/`

**Files:** modify `app/page.tsx`

- [ ] **Step 1: Implementation**

```tsx
import { makeMetadata } from '@/lib/seo'
import { seo } from '@/content/seo'
import { services } from '@/content/services'
import { objects } from '@/content/objects'
import { process } from '@/content/process'
import { reviews } from '@/content/reviews'
import { ServiceCard } from '@/components/ServiceCard/ServiceCard'
import { ObjectCard } from '@/components/ObjectCard/ObjectCard'
import { Marquee } from '@/components/Marquee/Marquee'
import { SectionNumber } from '@/components/SectionNumber/SectionNumber'

export const metadata = makeMetadata(seo.home, '/')

export default function HomePage() {
  return (
    <article style={{ paddingLeft: 'var(--side, 64px)' }}>
      {/* Hero */}
      <section style={{ minHeight: '92vh', display: 'grid', gridTemplateColumns: '5fr 7fr', alignItems: 'end', padding: '160px 64px 64px' }}>
        <div>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--sand)' }}>
            16.05.26 · GROZNY 43°N
          </p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 96, lineHeight: 1.02, fontVariationSettings: '"SOFT" 60, "WONK" 1' }}>
            Свет.<br/>Тишина.<br/>Стиль.
          </h1>
          <p style={{ marginTop: 24, maxWidth: 420 }}>
            Системы Schüco, Rehau и Alutech в Грозном — премиум-окна, двери, витражи и подоконники. Производство в собственном цеху.
          </p>
        </div>
        <div>
          {/* hero image — placeholder */}
          <div style={{ aspectRatio: '4/5', background: 'var(--boneDeep)' }} />
        </div>
      </section>

      {/* Tech marquee */}
      <Marquee items={[
        'Schüco AWS 75.SI · Uw 0.80 W/m²K',
        '5-камерный профиль · 70 мм',
        'Triple glazing · 4-12-4-12-4',
        'Rehau Brillant-Design',
        'Alutech ALT W72',
        'Монтаж по ГОСТ 30971-2012',
      ]} />

      {/* 4 services */}
      <section style={{ padding: '96px 64px' }}>
        <SectionNumber n="01" title="Услуги" />
        <div style={{ marginTop: 48 }}>
          {services.map((s) => <ServiceCard key={s.slug} service={s} />)}
        </div>
      </section>

      {/* Portfolio strip */}
      <section style={{ padding: '96px 64px', background: 'var(--paper)' }}>
        <SectionNumber n="02" title="Объекты" />
        <div style={{ marginTop: 48, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {objects.slice(0, 6).map((o) => <ObjectCard key={o.slug} item={o} />)}
        </div>
      </section>

      {/* Process */}
      <section style={{ padding: '96px 64px' }}>
        <SectionNumber n="03" title="Процесс" />
        <ol style={{ marginTop: 48, display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 24 }}>
          {process.map((p) => (
            <li key={p.n}>
              <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--copper)' }}>{p.n}</div>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 24, marginTop: 8 }}>{p.title}</h4>
              <p style={{ fontSize: 14, color: 'var(--charSoft)', marginTop: 8 }}>{p.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Reviews */}
      <section style={{ padding: '96px 64px', background: 'var(--paper)' }}>
        <SectionNumber n="04" title="Отзывы" />
        <div style={{ marginTop: 48, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {reviews.slice(0, 6).map((r, i) => (
            <blockquote key={i}>
              <p>«{r.text}»</p>
              <footer style={{ marginTop: 12, fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--sand)' }}>
                — {r.author}, {r.city}
              </footer>
            </blockquote>
          ))}
        </div>
      </section>
    </article>
  )
}
```

- [ ] **Step 2: Add CSS vars exposure** — VE tokens already create `:root` vars; just add an alias for `--copper`, `--bone`, etc. Actually VE auto-generates hashed names. Update `app/styles/tokens.css.ts` to use a fixed-name theme contract OR just import `{vars}` in the page. For pragmatic speed, replace inline `var(--copper)` etc with `vars.color.copper` via inline style objects using `vars`. For prose pages, this is OK; for clean code, refactor sections into proper components in a later task. Acceptable trade-off here.

For now, add to `app/layout.tsx` body a global aliases stylesheet so plain `var(--copper)` works:

`app/styles/aliases.css.ts`:
```ts
import { globalStyle } from '@vanilla-extract/css'
import { vars } from './tokens.css'
globalStyle(':root', {
  vars: {
    '--copper': vars.color.copper,
    '--char': vars.color.char,
    '--bone': vars.color.bone,
    '--boneDeep': vars.color.boneDeep,
    '--paper': vars.color.paper,
    '--sand': vars.color.sand,
    '--charSoft': vars.color.charSoft,
    '--font-display': vars.font.display,
    '--font-body': vars.font.body,
    '--font-mono': vars.font.mono,
  },
})
```

Import in `app/layout.tsx`: `import './styles/aliases.css'`.

- [ ] **Step 3: ✓ Чекпойнт** — `/` renders all sections with placeholders.

---

### Task 40: `/uslugi/okna`

**Files:** `app/uslugi/okna/page.tsx`

- [ ] **Step 1: Page**

```tsx
import Image from 'next/image'
import { getService } from '@/content/services'
import { objects } from '@/content/objects'
import { brands } from '@/content/brands'
import { makeMetadata } from '@/lib/seo'
import { seo } from '@/content/seo'
import { ObjectCard } from '@/components/ObjectCard/ObjectCard'
import { SectionNumber } from '@/components/SectionNumber/SectionNumber'

const SVC = getService('okna')
export const metadata = makeMetadata(seo.okna, '/uslugi/okna')

export default function Page() {
  const objs = objects.filter((o) => o.service === 'okna')
  return (
    <article style={{ paddingLeft: 64 }}>
      <section style={{ padding: '160px 64px 64px', display: 'grid', gridTemplateColumns: '5fr 7fr', gap: 48 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--copper)' }}>{SVC.number}</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 96, lineHeight: 1.02 }}>{SVC.title}</h1>
          <p style={{ marginTop: 24, maxWidth: 420 }}>{SVC.intro}</p>
        </div>
        <div style={{ position: 'relative', aspectRatio: '4/5', viewTransitionName: 'service-okna' }}>
          <Image src={SVC.hero.image} alt={SVC.hero.alt} fill style={{ objectFit: 'cover' }} />
        </div>
      </section>

      <section style={{ padding: '96px 64px' }}>
        <SectionNumber n="A" title="Что входит" />
        <ul style={{ marginTop: 32, columns: 2, columnGap: 48 }}>
          {SVC.bullets.map((b) => <li key={b} style={{ padding: '12px 0', borderTop: '1px solid var(--rule)' }}>{b}</li>)}
        </ul>
      </section>

      <section style={{ padding: '96px 64px', background: 'var(--paper)' }}>
        <SectionNumber n="B" title="Бренды" />
        <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
          {brands.map((b) => (
            <div key={b.slug}>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 32 }}>{b.name}</h4>
              <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--sand)' }}>{b.origin}</p>
              <p style={{ marginTop: 8 }}>{b.blurb}</p>
            </div>
          ))}
        </div>
      </section>

      {objs.length > 0 && (
        <section style={{ padding: '96px 64px' }}>
          <SectionNumber n="C" title="Объекты" />
          <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {objs.slice(0, 6).map((o) => <ObjectCard key={o.slug} item={o} />)}
          </div>
        </section>
      )}
    </article>
  )
}
```

- [ ] **Step 2: ✓ Чекпойнт**

---

### Task 41: `/uslugi/dveri`

**Files:** `app/uslugi/dveri/page.tsx`

- [ ] **Step 1: Create file** — same shape as Task 40 (`/uslugi/okna`) with these substitutions:
  - `getService('okna')` → `getService('dveri')`
  - `seo.okna` → `seo.dveri`
  - path `'/uslugi/okna'` → `'/uslugi/dveri'`
  - `objects.filter((o) => o.service === 'okna')` → `objects.filter((o) => o.service === 'dveri')`
  - `viewTransitionName: 'service-okna'` → `viewTransitionName: 'service-dveri'`

For clarity, the complete file:

```tsx
import Image from 'next/image'
import { getService } from '@/content/services'
import { objects } from '@/content/objects'
import { brands } from '@/content/brands'
import { makeMetadata } from '@/lib/seo'
import { seo } from '@/content/seo'
import { ObjectCard } from '@/components/ObjectCard/ObjectCard'
import { SectionNumber } from '@/components/SectionNumber/SectionNumber'

const SVC = getService('dveri')
export const metadata = makeMetadata(seo.dveri, '/uslugi/dveri')

export default function Page() {
  const objs = objects.filter((o) => o.service === 'dveri')
  return (
    <article style={{ paddingLeft: 64 }}>
      <section style={{ padding: '160px 64px 64px', display: 'grid', gridTemplateColumns: '5fr 7fr', gap: 48 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--copper)' }}>{SVC.number}</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 96, lineHeight: 1.02 }}>{SVC.title}</h1>
          <p style={{ marginTop: 24, maxWidth: 420 }}>{SVC.intro}</p>
        </div>
        <div style={{ position: 'relative', aspectRatio: '4/5', viewTransitionName: 'service-dveri' }}>
          <Image src={SVC.hero.image} alt={SVC.hero.alt} fill style={{ objectFit: 'cover' }} />
        </div>
      </section>

      <section style={{ padding: '96px 64px' }}>
        <SectionNumber n="A" title="Что входит" />
        <ul style={{ marginTop: 32, columns: 2, columnGap: 48 }}>
          {SVC.bullets.map((b) => <li key={b} style={{ padding: '12px 0', borderTop: '1px solid var(--rule)' }}>{b}</li>)}
        </ul>
      </section>

      <section style={{ padding: '96px 64px', background: 'var(--paper)' }}>
        <SectionNumber n="B" title="Бренды" />
        <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
          {brands.map((b) => (
            <div key={b.slug}>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 32 }}>{b.name}</h4>
              <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--sand)' }}>{b.origin}</p>
              <p style={{ marginTop: 8 }}>{b.blurb}</p>
            </div>
          ))}
        </div>
      </section>

      {objs.length > 0 && (
        <section style={{ padding: '96px 64px' }}>
          <SectionNumber n="C" title="Объекты" />
          <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {objs.slice(0, 6).map((o) => <ObjectCard key={o.slug} item={o} />)}
          </div>
        </section>
      )}
    </article>
  )
}
```

- [ ] **Step 2: ✓ Чекпойнт**

---

### Task 42: `/uslugi/vitrazhi`

**Files:** `app/uslugi/vitrazhi/page.tsx`

- [ ] **Step 1: Create** — same structure as Task 41, substituting:
  - `getService('dveri')` → `getService('vitrazhi')`
  - `seo.dveri` → `seo.vitrazhi`
  - path → `'/uslugi/vitrazhi'`
  - filter → `o.service === 'vitrazhi'`
  - `viewTransitionName: 'service-dveri'` → `'service-vitrazhi'`

- [ ] **Step 2: ✓ Чекпойнт**

---

### Task 43: `/uslugi/podokonniki`

**Files:** `app/uslugi/podokonniki/page.tsx`

- [ ] **Step 1: Create** — same structure as Task 41, substituting:
  - `getService('dveri')` → `getService('podokonniki')`
  - `seo.dveri` → `seo.podokonniki`
  - path → `'/uslugi/podokonniki'`
  - filter → `o.service === 'podokonniki'`
  - `viewTransitionName: 'service-dveri'` → `'service-podokonniki'`

- [ ] **Step 2: ✓ Чекпойнт — Phase 7a (all 4 service pages) complete.**

---

### Task 44: `/obyekty` with filter + lightbox

**Files:** `app/obyekty/page.tsx`, `components/ObjectGallery/Gallery.tsx` + `.css.ts`

- [ ] **Step 1: Gallery component (client)**

`components/ObjectGallery/Gallery.tsx`:
```tsx
'use client'
import { useMemo, useState } from 'react'
import { ObjectItem } from '@/content/objects'
import { ObjectCard } from '../ObjectCard/ObjectCard'
import { Close } from '../icons/Close'
import Image from 'next/image'

const SERVICES = ['all', 'okna', 'dveri', 'vitrazhi', 'podokonniki'] as const

export function Gallery({ items }: { items: ObjectItem[] }) {
  const [filter, setFilter] = useState<(typeof SERVICES)[number]>('all')
  const [lightbox, setLightbox] = useState<ObjectItem | null>(null)
  const filtered = useMemo(() => filter === 'all' ? items : items.filter((i) => i.service === filter), [items, filter])

  return (
    <>
      <nav style={{ display: 'flex', gap: 16, padding: '0 64px', fontFamily: 'var(--font-mono)', fontSize: 13, textTransform: 'uppercase' }}>
        {SERVICES.map((s) => (
          <button key={s} onClick={() => setFilter(s)}
            style={{ padding: '8px 0', borderBottom: filter === s ? '2px solid var(--copper)' : '2px solid transparent' }}>
            {s === 'all' ? 'Все' : s}
          </button>
        ))}
      </nav>
      <div style={{ padding: '32px 64px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {filtered.map((o) => (
          <button key={o.slug} onClick={() => setLightbox(o)} style={{ textAlign: 'left' }}>
            <ObjectCard item={o} />
          </button>
        ))}
      </div>
      {lightbox && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', zIndex: 300, display: 'grid', placeItems: 'center' }}
             onClick={() => setLightbox(null)}>
          <button style={{ position: 'fixed', top: 24, right: 24, color: 'white' }} onClick={() => setLightbox(null)}><Close /></button>
          <div style={{ maxWidth: '90vw', maxHeight: '90vh', position: 'relative', aspectRatio: '4/3', viewTransitionName: `object-${lightbox.slug}` }}>
            <Image src={lightbox.images[0].src} alt={lightbox.images[0].alt} fill style={{ objectFit: 'contain' }} />
          </div>
        </div>
      )}
    </>
  )
}
```

- [ ] **Step 2: Page**

`app/obyekty/page.tsx`:
```tsx
import { objects } from '@/content/objects'
import { makeMetadata } from '@/lib/seo'
import { seo } from '@/content/seo'
import { SectionNumber } from '@/components/SectionNumber/SectionNumber'
import { Gallery } from '@/components/ObjectGallery/Gallery'

export const metadata = makeMetadata(seo.obyekty, '/obyekty')

export default function Page() {
  return (
    <article style={{ paddingLeft: 64 }}>
      <section style={{ padding: '160px 64px 64px' }}>
        <SectionNumber n="∞" title="Объекты" />
        <p style={{ marginTop: 24, maxWidth: 600 }}>Что мы делали в Грозном и регионе.</p>
      </section>
      <Gallery items={objects} />
    </article>
  )
}
```

- [ ] **Step 3: ✓ Чекпойнт**

---

### Task 45: `/o-nas`

**Files:** `app/o-nas/page.tsx`

- [ ] **Step 1: Page**

```tsx
import { makeMetadata } from '@/lib/seo'
import { seo } from '@/content/seo'
import { company } from '@/content/company'
import { brands } from '@/content/brands'
import { SectionNumber } from '@/components/SectionNumber/SectionNumber'

export const metadata = makeMetadata(seo.oNas, '/o-nas')

export default function Page() {
  return (
    <article style={{ paddingLeft: 64 }}>
      <section style={{ padding: '160px 64px 64px', display: 'grid', gridTemplateColumns: '5fr 7fr', gap: 48 }}>
        <div>
          <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--sand)' }}>{company.yearsOnMarket}+ ЛЕТ</p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 72, lineHeight: 1.05 }}>
            Окна — это деталь, но именно через них мы смотрим на мир.
          </h1>
        </div>
        <div>
          <p>{company.name} основана в Грозном более {company.yearsOnMarket} лет назад. За это время мы остеклили десятки объектов — от частных домов до общественных зданий.</p>
          <p style={{ marginTop: 16 }}>В нашем цехе мы изготавливаем конструкции под объект — от стандартных окон до структурных витражей. Работаем только с системами Schüco, Rehau и Alutech.</p>
        </div>
      </section>

      <section style={{ padding: '96px 64px', background: 'var(--paper)' }}>
        <SectionNumber n="01" title="Партнёры-системы" />
        <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 48 }}>
          {brands.map((b) => (
            <div key={b.slug}>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 32 }}>{b.name}</h4>
              <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--sand)' }}>{b.origin}</p>
              <p style={{ marginTop: 8 }}>{b.blurb}</p>
              <a href={b.url} target="_blank" rel="noopener noreferrer"
                 style={{ marginTop: 12, display: 'inline-block', borderBottom: '1px solid var(--char)' }}>
                {b.url.replace('https://', '')} ↗
              </a>
            </div>
          ))}
        </div>
      </section>
    </article>
  )
}
```

- [ ] **Step 2: ✓ Чекпойнт**

---

### Task 46: `/kontakty`

**Files:** `app/kontakty/page.tsx`

- [ ] **Step 1: Page**

```tsx
import { makeMetadata } from '@/lib/seo'
import { seo } from '@/content/seo'
import { company, } from '@/content/company'
import { generalFaq } from '@/content/faq'
import { SectionNumber } from '@/components/SectionNumber/SectionNumber'

export const metadata = makeMetadata(seo.kontakty, '/kontakty')

export default function Page() {
  return (
    <article style={{ paddingLeft: 64 }}>
      <section style={{ padding: '160px 64px 64px' }}>
        <SectionNumber n="∞" title="Контакты" />
      </section>
      <section style={{ padding: '0 64px 96px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
        <dl style={{ display: 'grid', gap: 24 }}>
          <div>
            <dt style={{ fontFamily: 'var(--font-mono)', color: 'var(--sand)', fontSize: 13, textTransform: 'uppercase' }}>Адрес</dt>
            <dd style={{ marginTop: 4 }}>{company.address}</dd>
          </div>
          <div>
            <dt style={{ fontFamily: 'var(--font-mono)', color: 'var(--sand)', fontSize: 13, textTransform: 'uppercase' }}>Телефон</dt>
            <dd><a href={`tel:${company.phone}`}>{company.phone}</a></dd>
          </div>
          <div>
            <dt style={{ fontFamily: 'var(--font-mono)', color: 'var(--sand)', fontSize: 13, textTransform: 'uppercase' }}>WhatsApp</dt>
            <dd><a href={`https://wa.me/${company.whatsapp}`}>{company.phone}</a></dd>
          </div>
          <div>
            <dt style={{ fontFamily: 'var(--font-mono)', color: 'var(--sand)', fontSize: 13, textTransform: 'uppercase' }}>Instagram</dt>
            <dd><a href={company.instagramUrl}>@{company.instagram}</a></dd>
          </div>
          <div>
            <dt style={{ fontFamily: 'var(--font-mono)', color: 'var(--sand)', fontSize: 13, textTransform: 'uppercase' }}>Часы</dt>
            <dd>{company.hours}</dd>
          </div>
        </dl>
        <div style={{ aspectRatio: '4/3', background: 'var(--boneDeep)' }}>
          {/* embed Yandex Maps iframe later; placeholder for now */}
        </div>
      </section>

      <section style={{ padding: '96px 64px', background: 'var(--paper)' }}>
        <SectionNumber n="?" title="Частые вопросы" />
        <dl style={{ marginTop: 32, maxWidth: 720 }}>
          {generalFaq.map((f) => (
            <div key={f.q} style={{ padding: '20px 0', borderTop: '1px solid var(--rule)' }}>
              <dt style={{ fontFamily: 'var(--font-display)', fontSize: 24 }}>{f.q}</dt>
              <dd style={{ marginTop: 8 }}>{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>
    </article>
  )
}
```

- [ ] **Step 2: ✓ Чекпойнт — PHASE 7 COMPLETE.**

---

# PHASE 8 — SEO / sitemap / analytics

### Task 47: `app/sitemap.ts`

**Files:** create `app/sitemap.ts`

- [ ] **Step 1:**

```ts
import { MetadataRoute } from 'next'
import { company } from '@/content/company'

const base = `https://${company.domain}`
const routes = ['/', '/uslugi/okna', '/uslugi/dveri', '/uslugi/vitrazhi', '/uslugi/podokonniki', '/obyekty', '/o-nas', '/kontakty']

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({ url: `${base}${r}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: r === '/' ? 1 : 0.7 }))
}
```

- [ ] **Step 2: ✓ Чекпойнт** — visit `/sitemap.xml`.

---

### Task 48: `app/robots.ts`

- [ ] **Step 1:**

```ts
import { MetadataRoute } from 'next'
import { company } from '@/content/company'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `https://${company.domain}/sitemap.xml`,
  }
}
```

- [ ] **Step 2: ✓ Чекпойнт** — visit `/robots.txt`.

---

### Task 49: OG-image route

**Files:** `app/og/[slug]/route.tsx`

- [ ] **Step 1: Implement**

```tsx
import { ImageResponse } from 'next/og'
import { company } from '@/content/company'

export const runtime = 'edge'

export async function GET(req: Request, ctx: { params: Promise<{ slug: string }> }) {
  const { slug } = await ctx.params
  const titles: Record<string, string> = {
    home: 'Свет. Тишина. Стиль.',
    okna: 'Окна Schüco · Rehau · Alutech',
    dveri: 'Двери — алюминий и ПВХ',
    vitrazhi: 'Витражи и фасады',
    podokonniki: 'Подоконники — камень, кварц, дерево',
  }
  const title = titles[slug] ?? company.name
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#F2ECDF', color: '#1A1714', padding: 80, fontFamily: 'serif' }}>
        <div style={{ fontSize: 28, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{company.name} · {company.city}</div>
        <div style={{ fontSize: 96, lineHeight: 1.05 }}>{title}</div>
        <div style={{ fontSize: 24, color: '#7A6A52' }}>{company.brands.join(' · ')}</div>
      </div>
    ),
    { width: 1200, height: 630 },
  )
}
```

- [ ] **Step 2: Wire og into `seo.ts`** — set `ogImage: 'https://luxokna.ru/og/home'` for each. Update `makeMetadata` already supports it.

- [ ] **Step 3: ✓ Чекпойнт** — visit `/og/home` → 1200×630 PNG.

---

### Task 50: JSON-LD Service per page

**Files:** modify `app/uslugi/okna/page.tsx`, `app/uslugi/dveri/page.tsx`, `app/uslugi/vitrazhi/page.tsx`, `app/uslugi/podokonniki/page.tsx`

- [ ] **Step 1: In each of the four service pages, add the import and JSON-LD constant**

At the top of the file (next to other imports):
```tsx
import { company } from '@/content/company'
```

After the `const SVC = getService(...)` line, add:
```tsx
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: SVC.title,
  provider: { '@type': 'LocalBusiness', name: company.name, telephone: company.phone },
  areaServed: company.city,
  description: SVC.intro,
}
```

- [ ] **Step 2: In each page, render the JSON-LD `<script>` as the first child inside `<article>`**

```tsx
return (
  <article style={{ paddingLeft: 64 }}>
    <script type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    {/* … existing sections … */}
  </article>
)
```

Apply the same change to all four service pages — same constant, same script tag.

- [ ] **Step 3: ✓ Чекпойнт**

---

### Task 51: Analytics snippets

**Files:** modify `app/layout.tsx`, create `.env.example`

- [ ] **Step 1: `.env.example`**

```
NEXT_PUBLIC_YM_ID=
NEXT_PUBLIC_GA_ID=
```

- [ ] **Step 2: Inject in layout**

In `app/layout.tsx`, before `</body>`:
```tsx
{process.env.NEXT_PUBLIC_YM_ID && (
  <>
    <script dangerouslySetInnerHTML={{ __html: `
      (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
      m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
      (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
      ym(${process.env.NEXT_PUBLIC_YM_ID}, "init", {clickmap:true, trackLinks:true, accurateTrackBounce:true});
    ` }} />
    <noscript><div><img src={`https://mc.yandex.ru/watch/${process.env.NEXT_PUBLIC_YM_ID}`} style={{position:'absolute',left:'-9999px'}} alt="" /></div></noscript>
  </>
)}
{process.env.NEXT_PUBLIC_GA_ID && (
  <>
    <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} />
    <script dangerouslySetInnerHTML={{ __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
    ` }} />
  </>
)}
```

- [ ] **Step 3: ✓ Чекпойнт**

---

### Task 52: Vercel deploy config

**Files:** create `vercel.json` (optional), modify `package.json`

- [ ] **Step 1: Ensure `package.json` has**

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "test": "vitest run",
  "test:watch": "vitest",
  "test:e2e": "playwright test"
}
```

- [ ] **Step 2: Build sanity**

```bash
npm run build
```
Expected: build succeeds. Fix any TS or Next errors before continuing.

- [ ] **Step 3: ✓ Чекпойнт — PHASE 8 COMPLETE.**

---

# PHASE 9 — Polish

### Task 53: View Transitions wiring

**Files:** modify `app/_chrome.tsx` or `app/layout.tsx`

- [ ] **Step 1: Enable Next.js view transitions**

`next.config.ts` (already added in Task 2 if you included `experimental: { viewTransition: true }`). Verify.

In `next/link` calls between pages, transitions kick in via shared `viewTransitionName` (already set in `ServiceCard`, `ObjectCard`, service pages). Add a default cross-fade in `app/globals.css.ts`:

```ts
import { globalStyle } from '@vanilla-extract/css'
import { vars } from './tokens.css'

globalStyle('::view-transition-old(root), ::view-transition-new(root)', {
  animationDuration: vars.duration.base,
  animationTimingFunction: vars.ease.out,
})
```

- [ ] **Step 2: Manual test** — navigate from home → service. Note shared hero image transition.

- [ ] **Step 3: ✓ Чекпойнт**

---

### Task 54: Lighthouse audit + fixes

- [ ] **Step 1: Build + serve**

```bash
npm run build && npm run start
```

- [ ] **Step 2: Run Lighthouse**

In Chrome DevTools → Lighthouse → Performance/Accessibility/SEO/Best Practices → Analyze (desktop).

- [ ] **Step 3: Address findings**

Common fixes:
- Add `width`/`height` to all `<Image />`.
- Replace `<a target="_blank">` without `rel="noopener noreferrer"`.
- Ensure each page has unique title/description.
- Verify alt text on all images.
- Check colour contrast (should be fine with bone/char).

Target: ≥ 95 Performance/SEO/Best Practices, 100 Accessibility.

- [ ] **Step 4: ✓ Чекпойнт**

---

### Task 55: Final E2E smoke + handoff doc

**Files:** extend `tests/e2e/smoke.spec.ts`

- [ ] **Step 1: Calculator smoke**

```ts
test('calculator opens and produces WA url on step 4', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: /Рассчитать/ }).first().click()
  await page.getByLabel('Ширина, мм').fill('1500')
  await page.getByRole('button', { name: /Далее/ }).click()
  await page.getByRole('button', { name: /ПВХ/ }).click()
  await page.getByRole('button', { name: /Schüco \/ Rehau/ }).click()
  await page.getByLabel('Телефон').fill('9881234567')
  const link = page.getByRole('link', { name: /Открыть в WhatsApp/ })
  await expect(link).toHaveAttribute('href', /wa\.me\/79288983897\?text=/)
})

test('all top-level routes 200', async ({ page }) => {
  for (const path of ['/', '/uslugi/okna', '/uslugi/dveri', '/uslugi/vitrazhi', '/uslugi/podokonniki', '/obyekty', '/o-nas', '/kontakty', '/sitemap.xml', '/robots.txt']) {
    const r = await page.goto(path)
    expect(r?.status()).toBe(200)
  }
})
```

- [ ] **Step 2: Run**

```bash
npm run test:e2e
```
Expected: all pass.

- [ ] **Step 3: ✓ Чекпойнт — PROJECT COMPLETE.**

Hand off:
- Replace placeholder content in `content/*.ts` with client material.
- Replace placeholder images in `public/images/`.
- Set `NEXT_PUBLIC_YM_ID` and `NEXT_PUBLIC_GA_ID` envs.
- Configure custom domain on Vercel.
- Initialize git when ready, push to GitHub, connect to Vercel.
