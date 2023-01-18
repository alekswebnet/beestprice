/*
** TailwindCSS Configuration File
**
** Docs: https://tailwindcss.com/docs/configuration
** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
*/
module.exports = {
  theme: {
    extend: {
      colors: {
        darkblue: '#263c60',
        lightblue: '#0099e2',
        red: '#f84147'
      },
      boxShadow: {
        layout: '0 3px 5px -2px rgba(0,0,20,0.5)'
      }
    },
    textShadow: {
      'default': '0 2px 5px rgba(0, 0, 0, 0.5)',
      'lg': '0 2px 10px rgba(0, 0, 0, 0.5)',
    },
  },
  variants: {},
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './node_modules/flowbite.{js,ts}'
  ],
  plugins: [require('flowbite')]
}
