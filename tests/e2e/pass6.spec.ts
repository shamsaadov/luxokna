import { test, expect } from '@playwright/test'

test('FAQ schema: /uslugi/okna has FAQPage JSON-LD with 2+ Question entries', async ({
  page,
}) => {
  await page.goto('/uslugi/okna')
  const scripts = await page.locator('script[type="application/ld+json"]').allTextContents()
  const faqScript = scripts.find((s) => s.includes('"FAQPage"'))
  expect(faqScript, 'FAQPage JSON-LD must exist on /uslugi/okna').toBeTruthy()
  const parsed = JSON.parse(faqScript!) as {
    mainEntity: Array<{ '@type': string; name: string }>
  }
  expect(parsed['mainEntity'].length).toBeGreaterThanOrEqual(2)
  expect(parsed['mainEntity'][0]?.['@type']).toBe('Question')
})

test('FAQ visible: /uslugi/dveri renders <details> disclosures', async ({ page }) => {
  await page.goto('/uslugi/dveri')
  const detailsCount = await page.locator('details').count()
  expect(detailsCount).toBeGreaterThanOrEqual(2)
})

test('Breadcrumbs: /uslugi/dveri has nav[aria-label="Хлебные крошки"] with key labels', async ({
  page,
}) => {
  await page.goto('/uslugi/dveri')
  const nav = page.locator('nav[aria-label="Хлебные крошки"]')
  await expect(nav).toBeVisible()
  const text = (await nav.textContent()) ?? ''
  expect(text).toContain('Главная')
  expect(text).toContain('Двери')
})

test('BreadcrumbList JSON-LD: /obyekty has script with BreadcrumbList', async ({ page }) => {
  await page.goto('/obyekty')
  const scripts = await page.locator('script[type="application/ld+json"]').allTextContents()
  const found = scripts.some((s) => s.includes('"BreadcrumbList"'))
  expect(found).toBe(true)
})

test('Scroll progress: bar width (scaleX) grows after scrolling', async ({ page }) => {
  // Disable Lenis's smooth scroll for this test by reporting reduced-motion —
  // useSmoothScroll bails out and we get native scroll. Otherwise the lerp
  // makes scrollY changes asynchronous and flaky in headless.
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await page.waitForLoadState('networkidle')
  // Wait until content is tall enough that scrolling means something.
  await page.waitForFunction(
    () => Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) > window.innerHeight + 500,
    null,
    { timeout: 8000 },
  )
  const bar = page.locator('[data-testid="scroll-progress"]')
  await expect(bar).toBeAttached()

  const initial = await bar.getAttribute('data-progress')
  expect(parseFloat(initial ?? '0')).toBeCloseTo(0, 1)

  // overflow-x: hidden on <html> can move the scrolling root to <body>; set
  // scrollTop on every candidate AND dispatch the event so the listener fires
  // even in headless modes where mouse.wheel doesn't drive native scroll.
  await page.evaluate(() => {
    const target = Math.max(1500, document.body.scrollHeight * 0.5)
    window.scrollTo(0, target)
    document.body.scrollTop = target
    document.documentElement.scrollTop = target
    window.dispatchEvent(new Event('scroll'))
    document.dispatchEvent(new Event('scroll', { bubbles: true }))
  })

  await expect
    .poll(async () => parseFloat((await bar.getAttribute('data-progress')) ?? '0'), {
      timeout: 5000,
      intervals: [50, 100, 200, 400],
    })
    .toBeGreaterThan(0.05)
})

test('Skip-link: first Tab focuses "Перейти к содержимому"', async ({ page }) => {
  await page.goto('/')
  await page.waitForLoadState('networkidle')
  // Make sure body has focus so Tab moves into the first interactive element.
  await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur())
  await page.keyboard.press('Tab')
  const focused = await page.evaluate(() => {
    const el = document.activeElement as HTMLElement | null
    return { tag: el?.tagName ?? '', text: (el?.textContent ?? '').trim() }
  })
  expect(focused.tag).toBe('A')
  expect(focused.text).toBe('Перейти к содержимому')
})

test('Service worker: /sw.js and /offline.html are served', async ({ request }) => {
  const sw = await request.get('/sw.js')
  expect(sw.status()).toBe(200)
  expect((await sw.text())).toContain("self.addEventListener('install'")

  const off = await request.get('/offline.html')
  expect(off.status()).toBe(200)
  expect((await off.text())).toContain('Нет соединения')
})

test('OG with photo: /og/okna returns a PNG of meaningful size (>30KB)', async ({ request }) => {
  const r = await request.get('/og/okna')
  expect(r.status()).toBe(200)
  const ct = r.headers()['content-type'] ?? ''
  expect(ct).toContain('image/png')
  const buf = await r.body()
  // With an object photo composed in, the PNG should be well above the
  // text-only baseline (≈10–20KB). 30KB is a comfortable lower bound.
  expect(buf.byteLength).toBeGreaterThan(30 * 1024)
})

test('Header aria-current: active nav link gets aria-current="page"', async ({ page }) => {
  await page.goto('/uslugi/okna')
  const link = page.locator('header nav a[href="/uslugi/okna"]').first()
  await expect(link).toHaveAttribute('aria-current', 'page')
})
