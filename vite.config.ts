import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': '/src',
      '@/components/admin-ui': '/src/components/admin-ui',
      '@/components/frontend-ui': '/src/components/frontend-ui',
    },
  },
  // base: '/revo-test-html',  // For Build
  build: {
    minify: true,
    sourcemap: false,
    target: 'es2015',
  },
  server: {
    open: true, // Auto open browser
  },
  css: {
    devSourcemap: true,  // Enable SCSS source map
  },
})
