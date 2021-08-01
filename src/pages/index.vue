<template>  
  <v-app>
    <Menu />
    <Header />
    <Alerts />
    
    <Heading>
      Student Financial Assistance Portal
    </Heading>

    <v-main>
      <nuxt-child  :keep-alive-props="{ exclude: ['modal'] }" />
    </v-main>
    <Footer />
  </v-app>
</template>

<i18n>
{
  "en": {

  },
  "fr": {
    
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
  data () {
    return {
    
    }
  },
  methods: {
    setLocale(locale) {
      this.$store.commit('languages/locale')
    }
  }
}
</script>


<style lang="scss" scoped>





</style>