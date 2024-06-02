import type { NuxtPage } from 'nuxt/schema';
import svgLoader from 'vite-svg-loader';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  // head: {
  //   link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  // },
  // buildModules: ['@pinia/nuxt'],
  build: {
    transpile: ['gsap']
  },
  components: [
    {
      path: '~~/components'
    },
    {
      path: '~~/pages/home/components'
    }
  ],
  hooks: {
    'pages:extend'(pages) {
      function removePagesMatching(pattern: RegExp, pages: NuxtPage[] = []) {
        const pagesToRemove = [];
        for (const page of pages) {
          if (pattern.test(page.file as string)) {
            pagesToRemove.push(page);
          } else {
            removePagesMatching(pattern, page.children);
          }
        }
        for (const page of pagesToRemove) {
          pages.splice(pages.indexOf(page), 1);
        }
      }
      removePagesMatching(/\.ts$|components|\.spec\.ts$/, pages);
    }
  },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@nuxtjs/device', '@nuxt/test-utils/module'],
  typescript: {
    strict: true
  },
  css: ['~~/assets/css/tailwinds.css', '@fortawesome/fontawesome-svg-core/styles.css'],
  runtimeConfig: {
    public: {
      // process.env.NODE_ENV === 'development' ? process.env.API_BASE_URL : process.env.API_BASE_URL_PROD
      apiBase: process.env.API_BASE_URL
    }
  },
  nitro: {
    compressPublicAssets: true // 壓縮 public assets 物件
  },
  vite: {
    vue: {
      script: {
        defineModel: true
      }
    },
    esbuild: {
      pure: process.env.NODE_ENV === 'production' ? ['console.log', 'debugger'] : []
    },
    build: {
      minify: 'terser',
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString();
            }
          }
        }
      }
    },
    plugins: [svgLoader({ defaultImport: 'url' })]
  },
  app: {
    baseURL: '/'
  }
  // 'http://localhost:8000/api'
});
