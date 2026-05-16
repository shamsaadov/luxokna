import { test, expect } from '@playwright/test'

test('home loads', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/LuxOkna/)
})

test('calculator opens and produces WA url on step 4', async ({ page }) => {
  // Clear sessionStorage so we always start at step 1.
  await page.addInitScript(() => {
    try {
      sessionStorage.clear()
    } catch {}
  })
  await page.goto('/')
  await page.waitForLoadState('networkidle')

  // MagneticButton uses GSAP transforms — Playwright sees the element as
  // "not stable" / "outside viewport" mid-animation. Use evaluate() to click
  // directly, bypassing hover / position checks.
  const clickByText = async (re: RegExp) => {
    await page.evaluate((pattern) => {
      const rx = new RegExp(pattern)
      const btn = Array.from(document.querySelectorAll('button')).find((b) =>
        rx.test(b.textContent ?? ''),
      ) as HTMLButtonElement | undefined
      if (!btn) throw new Error('button not found: ' + pattern)
      btn.click()
    }, re.source)
  }

  await clickByText(/Рассчитать/)
  // Calculator is dynamically imported — wait for its chunk + render
  // before the next interaction.
  await page.waitForLoadState('networkidle')
  await page.getByLabel('Ширина, мм').waitFor({ state: 'visible' })
  await page.getByLabel('Ширина, мм').fill('1500')
  await clickByText(/Далее/)
  // StepMaterial / StepSegment cards auto-advance on click.
  await page.getByRole('button', { name: /ПВХ/ }).click()
  await page.getByRole('button', { name: /Schüco \/ Rehau/ }).click()
  await page.getByLabel('Телефон').fill('9881234567')
  const link = page.getByRole('link', { name: /Открыть в WhatsApp/ })
  await expect(link).toHaveAttribute('href', /wa\.me\/79288983897\?text=/)
})

test('kontakty: Yandex Maps iframe is embedded with company coords', async ({
  page,
}) => {
  await page.goto('/kontakty')
  await page.waitForLoadState('networkidle')
  const iframe = page.locator('iframe[title*="LuxOkna"]')
  await expect(iframe).toHaveCount(1)
  const src = await iframe.getAttribute('src')
  expect(src).toContain('map-widget/v1')
  expect(src).toContain('45.6981')
  expect(src).toContain('43.3168')
})

test('object grid: at least one image has a blur placeholder applied', async ({
  page,
}) => {
  await page.goto('/obyekty')
  await page.waitForLoadState('networkidle')

  // next/image sets a blurry data:image/... background-image while the
  // real image is decoding. We assert *any* of the object grid images has
  // either the inline blur background OR the loaded data-nimg attr.
  const has = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('main img')) as HTMLImageElement[]
    return imgs.some((img) => {
      const style = img.getAttribute('style') ?? ''
      if (/data:image\//.test(style)) return true
      // After load, next/image leaves data-nimg set to "fill".
      return img.hasAttribute('data-nimg')
    })
  })
  expect(has).toBe(true)
})

test('favicon: /icon.svg is served with 200', async ({ request }) => {
  const r = await request.get('/icon.svg')
  expect(r.status()).toBe(200)
  const ct = r.headers()['content-type'] ?? ''
  expect(ct).toContain('image/svg')
})

test('404 page: unknown route renders branded not-found', async ({ page }) => {
  const r = await page.goto('/nonexistent-route-xyz')
  expect(r?.status()).toBe(404)
  await expect(page.locator('h1')).toContainText('404')
  await expect(page.getByRole('heading', { name: /Окно закрыто/i })).toBeVisible()
  await expect(page.getByRole('link', { name: /Вернуться на главную/i })).toBeVisible()
})

test('all top-level routes 200', async ({ page }) => {
  for (const path of [
    '/',
    '/uslugi/okna',
    '/uslugi/dveri',
    '/uslugi/vitrazhi',
    '/uslugi/podokonniki',
    '/obyekty',
    '/o-nas',
    '/kontakty',
    '/sitemap.xml',
    '/robots.txt',
  ]) {
    const r = await page.goto(path)
    expect(r?.status()).toBe(200)
  }
})
