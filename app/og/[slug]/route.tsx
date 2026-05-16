import { ImageResponse } from 'next/og'
import { company } from '@/content/company'

export const runtime = 'edge'

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
          justifyContent: 'space-between',
          background: '#F2ECDF',
          color: '#1A1714',
          padding: 80,
          fontFamily: 'serif',
        }}
      >
        <div style={{ display: 'flex', fontSize: 28, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          {`${company.name} · ${company.city}`}
        </div>
        <div style={{ display: 'flex', fontSize: 96, lineHeight: 1.05 }}>{title}</div>
        <div style={{ display: 'flex', fontSize: 24, color: '#7A6A52' }}>{company.brands.join(' · ')}</div>
      </div>
    ),
    { width: 1200, height: 630 },
  )
}
