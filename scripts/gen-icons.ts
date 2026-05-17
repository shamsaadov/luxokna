/**
 * Renders PWA icon variants (192×192 and 512×512) into public/icons/.
 * Re-uses the LuxOkna mark (bone field, copper square, serif "L").
 *
 * Run with `tsx scripts/gen-icons.ts`.
 */
import sharp from 'sharp'
import { writeFileSync, mkdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const OUT_DIR = path.join(ROOT, 'public', 'icons')

const SIZES = [192, 512] as const

const inset = (size: number) => Math.round(size * 0.08)
const fontSize = (size: number) => Math.round(size * 0.62)
const baseline = (size: number) => Math.round(size * 0.71)

function svgFor(size: number): string {
  const i = inset(size)
  const inner = size - i * 2
  const fs = fontSize(size)
  const by = baseline(size)
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <rect width="${size}" height="${size}" fill="#F2ECDF"/>
  <rect x="${i}" y="${i}" width="${inner}" height="${inner}" fill="#A85031"/>
  <text x="${size / 2}" y="${by}" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-weight="700" font-size="${fs}" fill="#F2ECDF">L</text>
</svg>`
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true })
  for (const size of SIZES) {
    const svg = svgFor(size)
    const buf = await sharp(Buffer.from(svg)).png().toBuffer()
    const out = path.join(OUT_DIR, `icon-${size}.png`)
    writeFileSync(out, buf)
    console.log(`Wrote ${out} (${buf.length} bytes)`)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
