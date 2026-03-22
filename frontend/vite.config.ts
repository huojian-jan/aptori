import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// 部署在自定义域名根路径（如 aptori.xin）时使用默认 base '/'
export default defineConfig({
  plugins: [react()],
  base: '/',
})
