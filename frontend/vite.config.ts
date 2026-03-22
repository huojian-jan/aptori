import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// 生产构建使用仓库子路径，与 Gitee Pages 默认地址 yasenrk.gitee.io/aptori/ 一致
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/aptori/' : '/',
}))
