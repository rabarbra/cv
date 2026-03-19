import { defineConfig } from 'vite'

export default defineConfig({
  base: '/',
  esbuild: {
    jsx: 'automatic',
    jsxImportSource: 'preact',
  },
  resolve: {
    alias: {
      'react/jsx-runtime': 'preact/jsx-runtime',
      'react-dom/client': 'preact/compat/client',
      'react-dom': 'preact/compat',
      'react': 'preact/compat',
    },
  },
  build: {
    minify: 'terser',
    terserOptions: {
      compress: { passes: 2, drop_console: true },
    },
  },
})
