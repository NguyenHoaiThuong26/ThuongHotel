import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/auth': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => '/hotel' + path
      },
      '/stats': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => '/hotel' + path
      },
      '/users': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => '/hotel' + path
      },
      '/bookings': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => '/hotel' + path
      },
      '/rooms': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => '/hotel' + path
      },
      '/roles': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => '/hotel' + path
      },
      '/permissions': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => '/hotel' + path
      },
    }
  }
})
