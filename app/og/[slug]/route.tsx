import { ImageResponse } from 'next/og'
import { company } from '@/content/company'

export const runtime = 'edge'

const BONE = '#F2ECDF'
const CHAR = '#1A1714'
const SAND = '#6A5C45'
const COPPER = '#A85031'

export async function GET(_req: Request, ctx: { params: Promise<{ slug: string }> }) {
  const { slug } = await ctx.params
  const titles: Record<string, string> = {
    home: 'Свет. Тишина. Стиль.',
    okna: 'Окна Schüco · Rehau · Alutech',
    dveri: 'Двери — алюминий и ПВХ',
    vitrazhi: 'Витражи и фасады',
    podokonniki: 'Подоконники — камень, кварц, дерево',
  }
  const title = titles[slug] ?? company.name

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: BONE,
          color: CHAR,
          fontFamily: 'serif',
          position: 'relative',
        }}
      >
        {/* Top bar — LUX·OKNA · City */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '60px 80px 0',
            fontFamily: 'sans-serif',
            fontSize: 22,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: CHAR,
          }}
        >
          <div style={{ display: 'flex' }}>LUX·OKNA</div>
          <div style={{ display: 'flex', color: SAND }}>{company.city} · 43°N</div>
        </div>

        {/* Hairline rule under header */}
        <div
          style={{
            display: 'flex',
            margin: '24px 80px 0',
            height: 1,
            background: 'rgba(26, 23, 20, 0.18)',
          }}
        />

        {/* Centerpiece — huge serif title, left-aligned */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '0 80px',
            maxWidth: 980,
          }}
        >
          <div
            style={{
              display: 'flex',
              fontFamily: 'serif',
              fontSize: 120,
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: '-0.02em',
              color: CHAR,
            }}
          >
            {title}
          </div>
        </div>

        {/* Footer — copper hairline + brands */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '0 80px 60px',
          }}
        >
          <div
            style={{
              display: 'flex',
              height: 2,
              width: 120,
              background: COPPER,
              marginBottom: 24,
            }}
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontFamily: 'sans-serif',
              fontSize: 24,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: SAND,
            }}
          >
            <div style={{ display: 'flex' }}>{company.brands.join(' · ')}</div>
            <div style={{ display: 'flex', color: CHAR }}>{company.domain}</div>
          </div>
        </div>

        {/* Decorative architectural frame silhouette — top right corner */}
        <div
          style={{
            position: 'absolute',
            top: 120,
            right: 80,
            width: 240,
            height: 320,
            display: 'flex',
            border: `2px solid ${CHAR}`,
            opacity: 0.08,
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 240,
            right: 80,
            width: 240,
            height: 1,
            display: 'flex',
            background: CHAR,
            opacity: 0.08,
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 120,
            right: 200,
            width: 1,
            height: 320,
            display: 'flex',
            background: CHAR,
            opacity: 0.08,
          }}
        />
      </div>
    ),
    { width: 1200, height: 630 },
  )
}
