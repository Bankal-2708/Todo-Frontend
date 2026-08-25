import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    proxy: {
      '/api': {
        target: 'https://backend-gamma-umber-41.vercel.app',
        changeOrigin: true,
        secure: true,
      },
    },
  },
})
                                          