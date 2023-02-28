// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  buildModules: ['@pinia/nuxt'],
  css: ['@/assets/css/tailwinds.css', '@fortawesome/fontawesome-svg-core/styles.css'],
  build: {
    transpile: ['gsap']
  },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@nuxtjs/device'],
  typescript: {
    strict: true
  },
  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:8000/api'
    }
  }
  // app: {
  //   baseURL: '/home/'
  // }
});
