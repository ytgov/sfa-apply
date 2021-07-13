const webpack = require('webpack')
const { join } = require('path')
const environment = require('../environments.js')

console.log("ENVIRONEMENT", environment)

export default {
  head: {
    title: 'Yukon Student Financial Portal',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  components: true,
  loading: '~/components/Loading.vue',
  css: [
    { src: '~/assets/scss/base.scss', lang: 'scss' },
  ],
  router: {
    base: "/",
    middleware: ['router-auth']
  },
  plugins: [
    { src: '~/plugins/nuxt-client-init.js', ssr: false },
    { src: '~/plugins/vuex-persist', ssr: false },
    { src: '~/plugins/font-awesome' },
    { src: `~/plugins/vee-validate`, ssr: true},
    { src: '~/plugins/filters.js', ssr: true },
    { src: '~/plugins/vuetify.js', ssr: false }
  ],
  modules: [
    // ['@nuxtjs/google-tag-manager', { id: '' }],
    /*
    ['@nuxtjs/google-analytics', {
      id: '',
      autoTracking: {
        pageviewOnLoad: false
      }
    }],
    */    
    ['nuxt-google-maps-module', {
      key: environment.config.googleservices.key
    }],
    ['cookie-universal-nuxt', { 
      alias: 'yukon_financial_student_portal_cookies' 
    }],
    ['@nuxtjs/axios', {
      endpoint: environment.config.api.endpoint
    }],
    ['@nuxtjs/device'],
    ['nuxt-i18n', {
      defaultLocale: 'en',
      locales: [
        {
           code: 'en',
           name: 'English'
        },
        {
           code: 'fr',
           name: 'Français'
        }
      ],
      vueI18nLoader: true
    }]
  ],
  buildModules: [
    ['@nuxtjs/vuetify', { 
      customVariables: ['~/assets/scss/_variables.scss']
    }]
  ],
  build: {
    /*
    optimization: {
      minimize: true,
      splitChunks: {
        name: true
      }
    },
    performance: {
       hints: true,
       maxBundleSize: 250,
       warnAtPercent: 80
    },
    */
    transpile: ['vee-validate', 'vee-validate/dist/rules'],
    plugins: [
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new webpack.ProvidePlugin({
        '_': 'lodash',
        'moment': 'moment'
      })
    ],
    extend(config, ctx) {
      config.mode = 'development'
       config.node = {
        fs: 'empty'
      }
    }
  },
  env: {
    config: environment.config,
    ENV: environment.env
  },
  target: 'static',
  generate: {
    dir: '../public',
    fallback: '404.html'
  }
}
