import { test, expect } from '@playwright/test'

/**
 * Runs against three projects (responsive-desktop / -iphone / -ipad) configured
 * in playwright.config.ts. Verifies that the same content is reachable at all
 * three viewports and that there is no horizontal scroll bleed.
 */

const PAGES = ['/', '/uslugi/okna', '/obyekty', '/o-nas', '/kontakty'] as const

for (const path of PAGES) {
  test(`no horizontal scroll on ${path}`, async ({ page }) => {
    await page.goto(path)
    await page.waitForLoadState('networkidle')
    const overflow = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      innerWidth: window.innerWidth,
    }))
    expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.innerWidth + 1)
  })
}

test('home: hero headline visible and within viewport', async ({ page }) => {
  await page.goto('/')
  const h1 = page.locator('h1').first()
  await expect(h1).toBeVisible()
  const box = await h1.boundingBox()
  expect(box).not.toBeNull()
  if (box) {
    const vp = page.viewportSize()!
    expect(box.width).toBeLessThanOrEqual(vp.width + 1)
  }
})

test('header CTA is reachable (visible button OR hamburger menu)', async ({ page }) => {
  await page.goto('/')
  await page.waitForLoadState('networkidle')

  const reachable = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button')) as HTMLButtonElement[]
    const visible = (el: HTMLElement) => {
      const cs = getComputedStyle(el)
      if (cs.display === 'none' || cs.visibility === 'hidden') return false
      const r = el.getBoundingClientRect()
      return r.width > 0 && r.height > 0
    }
    const desktopCta = btns.find((b) => visible(b) && /Рассчитать/.test(b.textContent ?? ''))
    const hamburger = btns.find(
      (b) => visible(b) && b.getAttribute('aria-label') === 'Открыть меню',
    )
    return Boolean(desktopCta) || Boolean(hamburger)
  })
  expect(reachable).toBe(true)
})

test('home: at least 4 service cards rendered', async ({ page }) => {
  await page.goto('/')
  await page.waitForLoadState('networkidle')
  // ServiceCards live in <main>; each is an <a> with href="/uslugi/<slug>".
  // Header / Footer / MobileMenu add their own links, so we scope to <main>
  // and check distinct hrefs.
  const distinctSlugs = await page.evaluate(() => {
    const links = Array.from(
      document.querySelectorAll<HTMLAnchorElement>('main a[href^="/uslugi/"]'),
    )
    return Array.from(new Set(links.map((a) => a.getAttribute('href') ?? ''))).length
  })
  expect(distinctSlugs).toBeGreaterThanOrEqual(4)
})

test('/uslugi/okna: hero text visible without overlap', async ({ page }) => {
  await page.goto('/uslugi/okna')
  await page.waitForLoadState('networkidle')
  const h1 = page.locator('h1').first()
  await expect(h1).toBeVisible()
  const p = page.locator('section').first().locator('p').first()
  await expect(p).toBeVisible()
  const [h1Box, pBox] = await Promise.all([h1.boundingBox(), p.boundingBox()])
  expect(h1Box && pBox).not.toBeNull()
  // The headline and the intro paragraph should not visually overlap
  if (h1Box && pBox) {
    const overlap = !(
      pBox.x + pBox.width < h1Box.x ||
      h1Box.x + h1Box.width < pBox.x ||
      pBox.y + pBox.height < h1Box.y ||
      h1Box.y + h1Box.height < pBox.y
    )
    // overlap is allowed only if they are stacked vertically (one above the other)
    if (overlap) {
      // Acceptable if mostly vertically stacked
      expect(Math.abs(pBox.y - (h1Box.y + h1Box.height))).toBeLessThan(60)
    }
  }
})

test('calculator drawer is fullscreen-ish on mobile', async ({ page }) => {
  await page.goto('/')
  await page.waitForLoadState('networkidle')

  // Open via the visible CTA (desktop magnetic button OR mobile hamburger entry).
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button')) as HTMLButtonElement[]
    const visible = (el: HTMLElement) => {
      const cs = getComputedStyle(el)
      if (cs.display === 'none' || cs.visibility === 'hidden') return false
      const r = el.getBoundingClientRect()
      return r.width > 0 && r.height > 0
    }
    const directCta = btns.find(
      (b) => visible(b) && /Рассчитать/.test(b.textContent ?? ''),
    )
    if (directCta) {
      directCta.click()
      return
    }
    const hamburger = btns.find(
      (b) => visible(b) && b.getAttribute('aria-label') === 'Открыть меню',
    )
    hamburger?.click()
  })

  // If we opened the hamburger, click the calc CTA inside.
  // Use direct .click() via evaluate to avoid Playwright's "outside viewport"
  // check on iOS Safari (the menu uses 100vh which sometimes overshoots the
  // visual viewport).
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button')) as HTMLButtonElement[]
    const cta = btns.find((b) => /Рассчитать проём/.test(b.textContent ?? ''))
    cta?.click()
  })

  const drawer = page.locator('[role="dialog"][aria-modal="true"]').first()
  await expect(drawer).toBeVisible()
  const box = await drawer.boundingBox()
  const vp = page.viewportSize()!
  expect(box).not.toBeNull()
  if (box) {
    if (vp.width <= 640) {
      // Mobile: should be full width (allow tiny rounding)
      expect(box.width).toBeGreaterThanOrEqual(vp.width - 2)
    } else {
      // Desktop / tablet: should be at most 480px wide
      expect(box.width).toBeLessThanOrEqual(481)
    }
  }
})
