import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Configuração do Vite para deploy no GitHub Pages
export default defineConfig({
  plugins: [react()],
  base: './'
})
