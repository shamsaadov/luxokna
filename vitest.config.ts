import { defineConfig, type Plugin } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'node:path'

// Stub vanilla-extract `.css.ts` modules in unit tests:
// every accessed export resolves to its own name as a string,
// so `import * as s from './X.css'; s.field` -> "field".
function stubVanillaExtract(): Plugin {
  return {
    name: 'stub-vanilla-extract-css-ts',
    enforce: 'pre',
    transform(_code, id) {
      // strip ?query suffix that Vite may append
      const clean = id.split('?')[0] ?? id
      if (clean.endsWith('.css.ts')) {
        return {
          code: `const proxy = new Proxy({}, { get: (_t, p) => (typeof p === 'string' ? p : undefined) });\nexport default proxy;\nexport { proxy as vars };\n`,
          map: null,
        }
      }
      return null
    },
  }
}

export default defineConfig({
  plugins: [stubVanillaExtract(), react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    globals: true,
    include: ['tests/unit/**/*.test.{ts,tsx}'],
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, '.') },
  },
})
