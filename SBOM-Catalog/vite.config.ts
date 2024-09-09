import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  assetsInclude: ['**/*.yaml'],
  base: '/catalog/',
  // base: '/sbom-everywhere/catalog/',
  plugins: [vue()],
})
