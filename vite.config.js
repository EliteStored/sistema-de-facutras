import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/sistema-de-facturas/',
  plugins: [react()],
})
