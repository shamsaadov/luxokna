/**
 * Renders a 180×180 PNG of the LuxOkna favicon for iOS home-screen.
 * Run with `tsx scripts/gen-apple-icon.ts`.
 */
import sharp from 'sharp'
import { writeFileSync } from 'node:fs'

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180" width="180" height="180">
  <rect width="180" height="180" fill="#F2ECDF"/>
  <rect x="14" y="14" width="152" height="152" fill="#A85031"/>
  <text x="90" y="128" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-weight="700" font-size="112" fill="#F2ECDF">L</text>
</svg>`

const out = 'app/apple-icon.png'

const buf = await sharp(Buffer.from(svg)).png().toBuffer()
writeFileSync(out, buf)
console.log(`Wrote ${out} (${buf.length} bytes)`)
