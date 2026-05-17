import { ImageResponse } from 'next/og'
import { company } from '@/content/company'
import { objects } from '@/content/objects'

export const runtime = 'edge'

const BONE = '#F2ECDF'
const CHAR = '#1A1714'
const SAND = '#6A5C45'
const COPPER = '#A85031'

/**
 * Per-slug OG card. Composes a real object photo (or hero) into the right
 * column for service / home slugs, falls back to editorial layout otherwise.
 */
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

  // Pick a photo path that matches the slug.
  const photoPath = (() => {
    if (slug === 'home') return '/images/home/hero.jpg'
    const match = objects.find((o) => o.service === slug)
    return match?.images[0]?.src ?? '/images/home/hero.jpg'
  })()

  // Satori fetches images by URL — we need an absolute origin.
  // Prefer the actual incoming request origin (works in dev + previews); fall back to the production domain.
  const origin = (() => {
    try {
      return new URL(req.url).origin
    } catch {
      return `https://${company.domain}`
    }
  })()
  const photoUrl = `${origin}${photoPath}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'row',
          background: BONE,
          color: CHAR,
          fontFamily: 'serif',
          position: 'relative',
        }}
      >
        {/* Left column — title + brand line */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            padding: '60px 56px',
          }}
        >
          {/* Top: wordmark + city */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontFamily: 'sans-serif',
              fontSize: 20,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
            }}
          >
            <div style={{ display: 'flex' }}>LUX·OKNA</div>
            <div style={{ display: 'flex', color: SAND }}>{company.city} · 43°N</div>
          </div>

          {/* Hairline */}
          <div
            style={{
              display: 'flex',
              marginTop: 20,
              height: 1,
              background: 'rgba(26, 23, 20, 0.18)',
            }}
          />

          {/* Title */}
          <div
            style={{
              display: 'flex',
              flex: 1,
              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                fontFamily: 'serif',
                fontSize: 92,
                fontWeight: 700,
                lineHeight: 1.02,
                letterSpacing: '-0.02em',
                color: CHAR,
              }}
            >
              {title}
            </div>
          </div>

          {/* Footer — copper rule + brands */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                display: 'flex',
                height: 2,
                width: 96,
                background: COPPER,
                marginBottom: 18,
              }}
            />
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontFamily: 'sans-serif',
                fontSize: 20,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: SAND,
              }}
            >
              <div style={{ display: 'flex' }}>{company.brands.join(' · ')}</div>
              <div style={{ display: 'flex', color: CHAR }}>{company.domain}</div>
            </div>
          </div>
        </div>

        {/* Right column — photograph (≈40% width) */}
        <div
          style={{
            display: 'flex',
            width: 480,
            height: '100%',
            position: 'relative',
            background: '#E8DFCB',
          }}
        >
          <img
            src={photoUrl}
            width={480}
            height={630}
            alt=""
            style={{
              width: 480,
              height: 630,
              objectFit: 'cover',
              display: 'flex',
            }}
          />
          {/* Subtle inner copper hairline divider on the left edge */}
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: 2,
              display: 'flex',
              background: COPPER,
              opacity: 0.6,
            }}
          />
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  )
}
