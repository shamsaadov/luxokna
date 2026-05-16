'use client'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Header } from '@/components/Header/Header'
import { Footer } from '@/components/Footer/Footer'
import { SideRule } from '@/components/SideRule/SideRule'
import { WhatsAppFab } from '@/components/WhatsAppFab/WhatsAppFab'
import { Cursor } from '@/components/Cursor/Cursor'
import { MobileCtaBar } from '@/components/MobileCtaBar/MobileCtaBar'
import { useSmoothScroll } from '@/lib/scroll'

// Lazy-load: defers ~80KB of GSAP / libphonenumber / reducer until the
// drawer is first opened. SSR is disabled because the drawer is purely
// interactive and would render to null on the server anyway (open=false
// on first paint).
const Calculator = dynamic(
  () => import('@/components/Calculator/Calculator').then((m) => m.Calculator),
  { ssr: false },
)

export function Chrome({
  section,
  children,
}: {
  section: string
  children: React.ReactNode
}) {
  useSmoothScroll()
  const [open, setOpen] = useState(false)
  return (
    <>
      <Cursor />
      <SideRule section={section} />
      <Header onCalcOpen={() => setOpen(true)} />
      <main>{children}</main>
      <Footer />
      <WhatsAppFab />
      <MobileCtaBar onCalcOpen={() => setOpen(true)} hidden={open} />
      <Calculator open={open} onClose={() => setOpen(false)} />
    </>
  )
}
