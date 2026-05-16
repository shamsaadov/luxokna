'use client'
import { useState } from 'react'
import { Header } from '@/components/Header/Header'
import { Footer } from '@/components/Footer/Footer'
import { SideRule } from '@/components/SideRule/SideRule'
import { WhatsAppFab } from '@/components/WhatsAppFab/WhatsAppFab'
import { Cursor } from '@/components/Cursor/Cursor'
import { Calculator } from '@/components/Calculator/Calculator'
import { useSmoothScroll } from '@/lib/scroll'

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
      <Calculator open={open} onClose={() => setOpen(false)} />
    </>
  )
}
