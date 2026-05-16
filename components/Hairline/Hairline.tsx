import * as s from './Hairline.css'

interface Props {
  direction?: 'horizontal' | 'vertical'
  className?: string
}

export function Hairline({ direction = 'horizontal', className }: Props) {
  return (
    <hr
      aria-hidden
      className={[s.base, s.dir[direction], className].filter(Boolean).join(' ')}
    />
  )
}
