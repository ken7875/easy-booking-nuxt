// vitest.config.js

// import { defineConfig } from 'vitest/config';
// import vue from '@vitejs/plugin-vue';
// import AutoImport from 'unplugin-auto-import/vite'
// import { defineVitestConfig } from '@nuxt/test-utils/config'

// export default defineVitestConfig({
//   plugins: [
//     // vue(),
//     // AutoImport({
//     //   imports: ['vitest', 'vue'],
//     // }),
//   ],
//   test: {
//     alias: {
//       '~~': '/',
//     },
//     globals: true,
//     environment: 'nuxt'
//   }
// });

import { defineVitestConfig } from '@nuxt/test-utils/config'
import AutoImport from 'unplugin-auto-import/vite'
import path from 'path';

export default defineVitestConfig({
  // server: {
  //   host: 'localhost',
  //   port: 5000,
  //   strictPort: true,
  //   origin: 'http://localhost:8080',
  // },
  plugins: [
    AutoImport({
      imports: ['vitest', 'vue'],
    }),
  ],
  resolve: {
    alias: {
      '#imports': path.resolve(__dirname, './.nuxt/imports.d.ts')
    }
  },
  test: {
    environment: 'nuxt',
    setupFiles: ['./testSetup.ts'],
    alias: {
      '~~': '/',
    },
    testTimeout: 5000
    // environmentOptions: {
    //   nuxt: {
    //     domEnvironment: "jsdom"
    //   }
    // }
  }
})
