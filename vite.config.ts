import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server:{
    host: 'localhost',
    hmr:true, // 开启热更新
    port: 8090
  },
  build: {
    rollupOptions: {
      output: {
        // 禁用浏览器缓存，确保每次都获取最新的代码
        manualChunks: () => 'everything.js',
      },
    },
  }
})
