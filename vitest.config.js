import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import AutoImport from 'unplugin-auto-import/vite';

const r = (p) => resolve(__dirname, p);

const alias = {
  '~~': r('.'),
  '~~/': r('./'),
  '@@': r('.'),
  '@@/': r('./')
};

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/ // .md
      ],
      imports: ['vue', 'vue-router', 'vitest'],
      dts: true
    })
  ],
  test: {
    include: ['**/*.spec.js'],
    exclude: ['**/node_modules/**', '**/dist/**'],
    globals: true,
    environment: 'jsdom'
  },
  resolve: {
    alias
  }
});
