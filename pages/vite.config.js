import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import fs from 'fs'

// Plugin that copies index.html → 404.html after build
// This makes GitHub Pages serve the React app for any unknown path
function ghPages404() {
  return {
    name: 'gh-pages-404',
    closeBundle() {
      const dist = resolve(__dirname, 'dist')
      fs.copyFileSync(resolve(dist, 'index.html'), resolve(dist, '404.html'))
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  base: '/pages/',
  plugins: [react(), ghPages404()],
})
