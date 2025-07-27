import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { viteSingleFile } from 'vite-plugin-singlefile';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), viteSingleFile()],
  build: {
    cssCodeSplit: false, // 禁用 CSS 文件分割
    assetsInlineLimit: 1024 * 1024, // 将所有资源（如图片）内联为 Base64
    rollupOptions: {
      output: {
        inlineDynamicImports: true, // 内联动态导入的模块
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
