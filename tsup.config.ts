// tsup.config.ts
import type { Options } from 'tsup'

export const tsup: Options = {
  splitting: false,
  sourcemap: false,
  clean: true,
  format: ['cjs', 'esm','iife'],
  dts: true,
  entryPoints: [
    'src/index.ts'
  ],
  define: {
    __DEV__: 'false',
  },
}
