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

export default defineVitestConfig({
  server: {
    host: 'localhost',
    port: 5000,
    strictPort: true,
    origin: 'http://localhost:8080',
  },
  test: {
    environment: 'nuxt',
    // setupFiles: ['vitest-localstorage-mock'],
    // mockReset: false,
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
