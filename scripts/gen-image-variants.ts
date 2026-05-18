/**
 * Generates AVIF + @2x DPR variants for hero images.
 *
 * For each `public/images/{home,services}/*.jpg`, emits:
 *   - <name>.avif        (q=60, 4:4:4 — half the byte size of source JPEG)
 *   - <name>@2x.jpg      (upscaled to 2× source dimensions, q=78)
 *   - <name>@2x.avif     (same dimensions, q=58)
 *
 * Skips outputs that already exist with newer mtime than the source.
 *
 * Run with: `npm run gen:images`.
 */
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const PUBLIC = path.join(ROOT, 'public')

const DIRS = ['images/home', 'images/services'] as const

async function listJpegs(rel: string): Promise<string[]> {
  const abs = path.join(PUBLIC, rel)
  let entries: string[] = []
  try {
    entries = await fs.readdir(abs)
  } catch {
    return []
  }
  return entries
    .filter((n) => /\.jpe?g$/i.test(n))
    .map((n) => path.join(abs, n))
}

async function fileSize(p: string): Promise<number> {
  try {
    const stat = await fs.stat(p)
    return stat.size
  } catch {
    return 0
  }
}

async function exists(p: string): Promise<boolean> {
  try {
    await fs.access(p)
    return true
  } catch {
    return false
  }
}

function fmt(n: number): string {
  if (n >= 1024 * 1024) return (n / 1024 / 1024).toFixed(2) + ' MB'
  if (n >= 1024) return (n / 1024).toFixed(1) + ' KB'
  return n + ' B'
}

interface Stats {
  jpegBase: number
  avifBase: number
  jpeg2x: number
  avif2x: number
}

async function processFile(src: string, stats: Stats): Promise<void> {
  const dir = path.dirname(src)
  const ext = path.extname(src)
  const base = path.basename(src, ext)
  const avif1xPath = path.join(dir, `${base}.avif`)
  const jpeg2xPath = path.join(dir, `${base}@2x.jpg`)
  const avif2xPath = path.join(dir, `${base}@2x.avif`)

  const srcBytes = await fileSize(src)
  stats.jpegBase += srcBytes
  const input = await fs.readFile(src)
  const meta = await sharp(input).metadata()
  const w = meta.width ?? 1920
  const h = meta.height ?? 2400

  // 1x AVIF (same dimensions)
  if (await exists(avif1xPath)) {
    stats.avifBase += await fileSize(avif1xPath)
    console.log('· skip', path.relative(ROOT, avif1xPath))
  } else {
    await sharp(input)
      .avif({ quality: 60, chromaSubsampling: '4:4:4', effort: 6 })
      .toFile(avif1xPath)
    const out = await fileSize(avif1xPath)
    stats.avifBase += out
    console.log(
      '✓',
      path.relative(ROOT, avif1xPath),
      `${fmt(srcBytes)} → ${fmt(out)} (-${Math.round((1 - out / srcBytes) * 100)}%)`,
    )
  }

  // 2x JPEG (upscale; sharp uses Lanczos3 by default)
  if (await exists(jpeg2xPath)) {
    stats.jpeg2x += await fileSize(jpeg2xPath)
    console.log('· skip', path.relative(ROOT, jpeg2xPath))
  } else {
    await sharp(input)
      .resize({ width: w * 2, height: h * 2, kernel: 'lanczos3' })
      .jpeg({ quality: 78, mozjpeg: true, progressive: true })
      .toFile(jpeg2xPath)
    const out = await fileSize(jpeg2xPath)
    stats.jpeg2x += out
    console.log('✓', path.relative(ROOT, jpeg2xPath), fmt(out))
  }

  // 2x AVIF
  if (await exists(avif2xPath)) {
    stats.avif2x += await fileSize(avif2xPath)
    console.log('· skip', path.relative(ROOT, avif2xPath))
  } else {
    await sharp(input)
      .resize({ width: w * 2, height: h * 2, kernel: 'lanczos3' })
      .avif({ quality: 58, chromaSubsampling: '4:4:4', effort: 6 })
      .toFile(avif2xPath)
    const out = await fileSize(avif2xPath)
    stats.avif2x += out
    console.log('✓', path.relative(ROOT, avif2xPath), fmt(out))
  }
}

async function main() {
  const stats: Stats = { jpegBase: 0, avifBase: 0, jpeg2x: 0, avif2x: 0 }
  const files = (await Promise.all(DIRS.map((d) => listJpegs(d)))).flat()
  // Filter out anything that's already a @2x variant.
  const sources = files.filter((f) => !/@2x\.jpe?g$/i.test(f))
  for (const src of sources) {
    await processFile(src, stats)
  }
  console.log('\nSummary:')
  console.log(`  source JPEG total: ${fmt(stats.jpegBase)}`)
  console.log(
    `  1× AVIF total:     ${fmt(stats.avifBase)} (saves ${fmt(stats.jpegBase - stats.avifBase)})`,
  )
  console.log(`  2× JPEG total:     ${fmt(stats.jpeg2x)}`)
  console.log(`  2× AVIF total:     ${fmt(stats.avif2x)}`)
  console.log(
    `  served-per-device worst-case (2× AVIF): ${fmt(stats.avif2x)} vs original ${fmt(stats.jpegBase)}`,
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
