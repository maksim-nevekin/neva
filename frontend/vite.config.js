import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    open: false,
    proxy: {
      // Проксируем все запросы начинающиеся с /api
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
        // rewrite: (path) => path.replace(/^\/api/, '') // Не нужно, т.к. мы используем полный путь
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})