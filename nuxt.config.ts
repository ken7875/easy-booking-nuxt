import svgLoader from 'vite-svg-loader';
import { removePagesMatching } from './utils/routesConfig';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  // head: {
  //   link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  // },
  // buildModules: ['@pinia/nuxt'],
  build: {
    transpile: ['gsap', '@tresjs/cientos']
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
      removePagesMatching(/\.ts$|components|\.spec\.ts$/, pages);
    }
  },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@nuxtjs/device', '@nuxt/test-utils/module', '@tresjs/nuxt'],
  typescript: {
    strict: true
  },
  css: ['~~/assets/css/tailwinds.css', '@fortawesome/fontawesome-svg-core/styles.css'],
  runtimeConfig: {
    apiSSR: process.env.API_SSR_URL,
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
      minify: 'terser'
      // rollupOptions: {
      //   output: {
      //     manualChunks(id) {
      //       if (id.includes('node_modules')) {
      //         return id.toString().split('node_modules/')[1].split('/')[0].toString();
      //       }
      //     }
      //   }
      // }
    },
    plugins: [svgLoader({ defaultImport: 'url' })]
  },
  app: {
    baseURL: '/',
    head: {
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Welcome to Easy Booking'
        }
      ],
      title: 'Easy Booking',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1'
    }
  }
});
