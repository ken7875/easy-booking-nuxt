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
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@nuxtjs/device', 'nuxt-vitest'],
  typescript: {
    strict: true
  },
  css: ['~~/assets/css/tailwinds.css', '@fortawesome/fontawesome-svg-core/styles.css'],
  runtimeConfig: {
    public: {
      apiBase: process.env.NODE_ENV === 'development' ? process.env.API_BASE_URL : process.env.API_BASE_URL_PROD
    }
  },
  nitro: {
    compressPublicAssets: true // 壓縮 public assets 物件
  },
  // nitro: {
  //   storage: {
  //     redis: {
  //       driver: 'redis',
  //       port: 6379, // Redis port
  //       host: '127.0.0.1', // Redis host
  //       db: 0 // Defaults to 0
  //     }
  //   }
  // },
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
      minify: 'terser'
    },
    plugins: [svgLoader({ defaultImport: 'url' })]
  }
  // app: {
  //   baseURL: '/home/'
  // }'http://localhost:8000/api'
});
