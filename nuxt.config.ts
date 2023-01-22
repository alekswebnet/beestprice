// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  modules: [
    '@nuxtjs/tailwindcss',
    [
      '@pinia/nuxt',
      {
        autoImports: [
          'defineStore',
          'storeToRefs'
        ],
      }
    ],
    'nuxt-icon'
  ],
  build: {
    transpile: ['@sparticuz/chromium', 'ws']
  }
})
