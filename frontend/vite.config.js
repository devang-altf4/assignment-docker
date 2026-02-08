import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// vite config for react and tailwind
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    port: 5173,
    host: true, // needed for docker
    proxy: {
      // proxy api calls to backend so we dont get cors issues
      '/api': {
        target: 'http://backend:5000',
        changeOrigin: true
      }
    }
  }
})
