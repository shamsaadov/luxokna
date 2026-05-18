import { execSync } from 'node:child_process'
import path from 'node:path'
import type { MetadataRoute } from 'next'
import { company } from '@/content/company'

const base = `https://${company.domain}`

const FILE_FOR: Record<string, string> = {
  '/': 'app/page.tsx',
  '/uslugi/okna': 'app/uslugi/okna/page.tsx',
  '/uslugi/dveri': 'app/uslugi/dveri/page.tsx',
  '/uslugi/vitrazhi': 'app/uslugi/vitrazhi/page.tsx',
  '/uslugi/podokonniki': 'app/uslugi/podokonniki/page.tsx',
  '/obyekty': 'app/obyekty/page.tsx',
  '/o-nas': 'app/o-nas/page.tsx',
  '/kontakty': 'app/kontakty/page.tsx',
}

/**
 * Returns the latest commit ISO date that touched `relPath`. Falls back to
 * the current time when git history isn't available (e.g. CI shallow clone
 * or local sandbox without a `.git` directory).
 */
function gitLastModified(relPath: string): Date {
  try {
    const repoRoot = process.cwd()
    const file = path.posix.join(relPath)
    const iso = execSync(`git log -1 --format=%cI -- ${file}`, {
      cwd: repoRoot,
      encoding: 'utf-8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim()
    if (iso) return new Date(iso)
  } catch {
    /* fall through */
  }
  return new Date()
}

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.entries(FILE_FOR).map(([route, file]) => ({
    url: `${base}${route}`,
    lastModified: gitLastModified(file),
    changeFrequency: 'monthly' as const,
    priority: route === '/' ? 1 : 0.7,
  }))
}
