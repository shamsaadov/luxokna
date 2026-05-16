import { Icon, IconProps } from './Icon'

export const Pin = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 22s7-7 7-12a7 7 0 0 0-14 0c0 5 7 12 7 12Z" />
    <circle cx="12" cy="10" r="2.5" />
  </Icon>
)
