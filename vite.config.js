import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // 相对路径，构建产物放 GitHub Pages 子目录也能正常加载；
  // 若绑定独立域名部署在根路径，可改成 '/'
  base: './',
})
