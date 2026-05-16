'use client'
import { useEffect, useRef, useState } from 'react'
import Image, { ImageProps } from 'next/image'
import * as s from './RevealImage.css'

export function RevealImage(props: ImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry && entry.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.2 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className={s.wrap}>
      <Image
        {...props}
        className={s.img}
        data-revealed={shown ? 'true' : undefined}
      />
    </div>
  )
}
