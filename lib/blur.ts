import { blurMap } from '@/content/blurMap'

/**
 * Returns the `placeholder` + `blurDataURL` props for next/image when a
 * blur preview exists for the given public path. Returns an empty object
 * otherwise — safe to spread directly into <Image {...} />.
 *
 * Run `npm run gen:blur` to regenerate the blur map.
 */
export function blurProps(src: string): {
  placeholder?: 'blur'
  blurDataURL?: string
} {
  const blurDataURL = blurMap[src]
  if (!blurDataURL) return {}
  return { placeholder: 'blur', blurDataURL }
}
