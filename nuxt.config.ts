// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  buildModules: [
    '@pinia/nuxt'
  ],
  build: {
    transpile: ['gsap'],
  },
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  typescript: {
    strict: true
  },
  runtimeConfig: {
    public: {
      baseUrl: 'http://localhost:8000/api'
    }
  }
})
