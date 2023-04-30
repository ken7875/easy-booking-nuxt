import svgLoader from 'vite-svg-loader';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  buildModules: ['@pinia/nuxt'],
  build: {
    transpile: ['gsap']
  },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@nuxtjs/device'],
  typescript: {
    strict: true
  },
  css: ['~~/assets/css/tailwinds.css', '@fortawesome/fontawesome-svg-core/styles.css'],
  runtimeConfig: {
    public: {
      apiBase: process.env.NODE_ENV === 'development' ? process.env.API_BASE_URL : process.env.API_BASE_URL_PROD
    }
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
    esbuild: {
      pure: process.env.NODE_ENV === 'production' ? ['console.log', 'debugger'] : []
    },
    plugins: [svgLoader({ defaultImport: 'url' })]
  }
  // app: {
  //   baseURL: '/home/'
  // }'http://localhost:8000/api'
});
