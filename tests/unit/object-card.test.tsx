import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { ObjectCard } from '@/components/ObjectCard/ObjectCard'
import { objects } from '@/content/objects'
import { blurMap } from '@/content/blurMap'

describe('ObjectCard', () => {
  it('renders an image with a blur dataURL placeholder', () => {
    const item = objects[0]!
    expect(blurMap[item.images[0]!.src]).toMatch(/^data:image\//)
    const { container } = render(<ObjectCard item={item} />)
    const img = container.querySelector('img')
    expect(img).not.toBeNull()
    // next/image inlines the blurDataURL as a CSS background while the
    // real image loads. Either the style or the placeholder attr should
    // reference our generated data URL.
    const style = img!.getAttribute('style') ?? ''
    const placeholder =
      img!.getAttribute('placeholder') ?? img!.getAttribute('data-placeholder')
    const hasBlurInline = /data:image\//.test(style)
    expect(hasBlurInline || placeholder === 'blur').toBe(true)
  })

  it('passes when an image is missing from the blur map (no crash)', () => {
    const item = {
      ...objects[0]!,
      images: [
        { src: '/images/objects/does-not-exist.jpg', alt: 'x', w: 1, h: 1 },
      ],
    }
    const { container } = render(<ObjectCard item={item} />)
    expect(container.querySelector('img')).not.toBeNull()
  })
})
