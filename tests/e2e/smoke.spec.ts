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
  await page.getByLabel('Ширина, мм').fill('1500')
  await clickByText(/Далее/)
  // StepMaterial / StepSegment cards auto-advance on click.
  await page.getByRole('button', { name: /ПВХ/ }).click()
  await page.getByRole('button', { name: /Schüco \/ Rehau/ }).click()
  await page.getByLabel('Телефон').fill('9881234567')
  const link = page.getByRole('link', { name: /Открыть в WhatsApp/ })
  await expect(link).toHaveAttribute('href', /wa\.me\/79288983897\?text=/)
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
