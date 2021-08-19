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
    middleware: [ 'password-protect', 'router-auth']
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
    }],
    ['nuxt-password-protect', {
      enabled: true,
      formPath: '/password',
      password: 'letmein',
      tokenSeed: 101010,
      queryString: '_pw',
      cookieName: '_password',
      cookie: {
        prefix: '',
        expires: 5
      },
      ignoredPaths: ['/public-page']
    }],
    ['@nuxtjs/auth-next', {
      redirect: {
        login: '/login',
        logout: '/login',
        callback: '/oidc/callback',
        home: '/'
      },
      strategies: {
        auth0: {
          domain: environment.config.oauth.domain,
          clientId: environment.config.oauth.clientID,
          redirectUri: environment.config.oauth.redirectUri
          //logoutRedirectUri: environment.config.oauth.redirectUri
          //scope: environment.config.oauth.scope,
          //responseType: 'code token',
          //grantType: 'authorization_code',
          //codeChallengeMethod: 'S256',
        }
      }
    }]
    /*
    ['nuxt-oidc', {
      issuer: environment.config.oauth.issuer,
      clientId: environment.config.oauth.clientID,
      clientSecret: environment.config.oauth.clientSecret,
      callbackUrl: environment.config.oauth.callbackUrl,
      scope: environment.config.oauth.scope,
      // express-session configuration
      session: {
        secret: 'adfsdg',
        cookie: {},
        resave: false,
        saveUninitialized: false,
      }
    }]
    */
  ],
  buildModules: [
    ['@nuxtjs/vuetify', { 
      customVariables: ['~/assets/scss/_variables.scss']
    }]
  ],
  build: {
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
  /*
  auth: {
    strategies: {
      auth0: {
        domain: environment.config.oauth.domain,
        clientId: environment.config.oauth.clientID,
        audience: 'https://my-api-domain.com/',
        scope: environment.config.oauth.scope,
        responseType: 'code',
        grantType: 'authorization_code',
        codeChallengeMethod: 'S256',
      }
    }
  },
  */
  env: {
    config: environment.config,
    endpoints: environment.endpoints,
    ENV: environment.env
  },
  target: 'static',
  generate: {
    dir: '../public',
    fallback: '404.html'
  }
}
