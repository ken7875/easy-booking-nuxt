// vitest.config.js

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import { defineVitestConfig } from 'nuxt-vitest/config';

export default defineVitestConfig({
  test: {
    environment: 'nuxt'
  }
});
