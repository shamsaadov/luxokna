import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin'
import type { NextConfig } from 'next'

const withVanillaExtract = createVanillaExtractPlugin()

const nextConfig: NextConfig = {
  experimental: { viewTransition: true },
  images: { formats: ['image/avif', 'image/webp'] },
}

export default withVanillaExtract(nextConfig)
