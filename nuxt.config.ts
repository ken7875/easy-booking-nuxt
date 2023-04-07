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
  }
  // app: {
  //   baseURL: '/home/'
  // }'http://localhost:8000/api'
});
