<template>
  <v-app>
    <Menu />
    <Header />
    <Alerts />
    
    <Heading>
      {{ $t('heading') }}
    </Heading>

    <v-main>
      <nuxt />
    </v-main>
    <Footer />
  </v-app>
</template>


<i18n>
{
  "en": {
    "heading": "Student Financial Assistance Portal"
  },
  "fr": {
    "heading": "Portail d’aide financière aux étudiants"
  }
}
</i18n>

<script>
import { mapMutations, mapGetters } from 'vuex'

import Header from "~/components/ui/Header.vue"
import Footer from "~/components/ui/Footer.vue"
import Menu from "~/components/ui/Menu.vue"
import Alerts from "~/components/ui/Alerts.vue"
import Heading from "~/components/Heading.vue"


export default {
  components: {
    Header,
    Footer,
    Menu,
    Alerts,
    Heading
  },
  mounted() {
    if (this.error && this.error.statusCode === 404) {
      this.$router.push('/404')
    }
  },
  methods: {
    setLocale(locale) {
      this.$store.commit('languages/locale')
    }
  }
}
</script>
