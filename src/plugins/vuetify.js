import Vue from 'vue'
import Vuetify from 'vuetify/lib'

import colors from 'vuetify/lib/util/colors'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.use(Vuetify)

const vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#244C5A',
        secondary: colors.grey.darken1,
        accent: colors.shades.black,
        error: '#FFcccc',
      },
      dark: {
        primary: colors.blue.lighten3,
      },
    },
  },
})

export default vuetify