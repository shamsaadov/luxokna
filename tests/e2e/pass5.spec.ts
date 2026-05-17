import { test, expect } from '@playwright/test'

test('manifest: /manifest.webmanifest is served with 200 + key fields', async ({ request }) => {
  const r = await request.get('/manifest.webmanifest')
  expect(r.status()).toBe(200)
  const body = await r.text()
  expect(body).toContain('"name"')
  expect(body).toContain('"theme_color"')
  expect(body).toContain('"start_url"')
  expect(body).toContain('LuxOkna')
})

test('PWA icons: 192 and 512 PNGs are served', async ({ request }) => {
  for (const path of ['/icons/icon-192.png', '/icons/icon-512.png']) {
    const r = await request.get(path)
    expect(r.status(), `${path} should 200`).toBe(200)
    const ct = r.headers()['content-type'] ?? ''
    expect(ct).toContain('image/png')
  }
})

test('kontakty: enriched LocalBusiness JSON-LD with openingHoursSpecification', async ({
  page,
}) => {
  await page.goto('/kontakty')
  // We expect at least one ld+json that mentions LocalBusiness AND opening hours spec.
  const scripts = await page.locator('script[type="application/ld+json"]').allTextContents()
  expect(scripts.length).toBeGreaterThan(0)
  const hasRich = scripts.some(
    (s) => s.includes('LocalBusiness') && s.includes('openingHoursSpecification'),
  )
  expect(hasRich).toBe(true)
})

test('obyekty: year filter narrows visible cards', async ({ page }) => {
  await page.goto('/obyekty')
  await page.waitForLoadState('networkidle')

  // Skip the "Год:" label button; pick the second filter row (year buttons).
  const yearRow = page.locator('nav[aria-label="Фильтр по году"]')
  await expect(yearRow).toBeVisible()

  // Baseline: total cards visible (no year selected)
  const grid = page.locator('div').filter({ has: page.locator('button[aria-label^="Открыть фото"]') }).last()
  const before = await page
    .locator('button[aria-label^="Открыть фото"]')
    .count()
  expect(before).toBeGreaterThan(0)
  void grid

  // Click the FIRST year option (already sorted descending — newest first).
  const firstYearBtn = yearRow.locator('button').nth(1) // [0] = "Все", [1] = newest year
  const yearText = (await firstYearBtn.textContent())?.trim() ?? ''
  expect(yearText).toMatch(/^\d{4}$/)
  await firstYearBtn.click()

  // Count should decrease (or at least not exceed the baseline).
  const after = await page
    .locator('button[aria-label^="Открыть фото"]')
    .count()
  expect(after).toBeGreaterThan(0)
  expect(after).toBeLessThan(before)

  // Plural-aware count display should be visible.
  await expect(page.getByText(/\d+ объект(а|ов)?/)).toBeVisible()
})

test('home: stats strip with 3 animated counters is present', async ({ page }) => {
  await page.goto('/')
  const stats = page.locator('section[aria-label="Цифры компании"]')
  await expect(stats).toBeVisible()
  // Three labels live inside.
  const labels = await stats.locator('text=/Лет на рынке|объектов|Остекления/i').count()
  expect(labels).toBeGreaterThanOrEqual(3)
})
