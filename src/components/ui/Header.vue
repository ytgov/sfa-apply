<template>
  <header>
    <section class="limit-width">
      <section>
        <nuxt-link :to="home_uri">
          <Logo />
        </nuxt-link>
      </section>
      <section>
        <div>
          <nuxt-link :to="switchLocalePath('en')" v-if="locale=='fr'">English</nuxt-link>
          <nuxt-link :to="switchLocalePath('fr')" v-else>Français</nuxt-link>
        </div>
        <div>
          <i class="fas fa-2x fa-envelope"></i>
          <span>
            {{messages}}
          </span>
        </div>
        <div>
          <a @click="toggleMenu()">
            <div>
              <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
                <g fill="#323232" fill-rule="evenodd">
                  <rect width="30" height="6" rx="2"></rect>
                  <rect y="12" width="30" height="6" rx="2"></rect>
                  <rect y="24" width="30" height="6" rx="2"></rect>
                </g>
              </svg>
            </div>
            <div>
              Menu
            </div>
          </a>
        </div>
      </section>
    </section>
  </header>
</template>


<script>
import { mapMutations, mapGetters } from 'vuex'
import Logo from "~/components/Logo.vue"

export default {
  components: {
    Logo
  },
  computed: {
    language() {
      return (this.$i18n.locale=="en") ? 'Français' : 'English'
    },
    locale() {
      return this.$i18n.locale
    },
    home_uri() {
      return this.$i18n.locale=="fr" ? '/fr' : '/'
    },
    menu() {
      return this.$store.getters["menu_open"]
    },
    ...mapGetters({
      messages: 'messages/count'
    })
  },
  methods: {
    toggleMenu() {
      this.$store.commit('TOGGLE_MENU')
    }
  }
}

/*

   
    <v-app-bar white app v-if="false">
      <nuxt-link to="/">
        <Logo />
      </nuxt-link>
      <v-spacer></v-spacer>
      <v-toolbar-title>
        
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="lang-dropdown">
        <select v-model="$i18n.locale">
          <option
            v-for="lang in $i18n.locales"
            :key="lang.code"
            :value="lang.code"
            >{{ lang.name }}</option
          >
        </select>
      </div>
      <button v-if="$oidc.isLoggedIn" @click="$oidc.login()">
        Login
      </button>
      <v-list-item-avatar @click="toggleDrawer()" v-else>
        <img src="https://randomuser.me/api/portraits/women/81.jpg" v-if="!drawer">
        <em v-else>
          x
        </em>
      </v-list-item-avatar>
    </v-app-bar>

*/
</script>


<style lang="scss" scoped>
header {
  width: 100%;
  background: #fff;
  box-shadow:  0 2px 4px 0 rgb(155 155 155 / 30%);

  > section.limit-width {
    display: flex;
    align-items: center;
    padding: 0.5rem 0;
    > section {
      width: 100%;
      &:last-of-type {
        width: 30%;
        min-width: 300px;
        text-align: right;
        display: flex;
        align-items: center;
        > div {
          width: 100%;

          a {
            color: #000;
            display: flex;
            align-items: center;

            &:link, &:visited, &:active {
              color: #000;
            }
            > div {
              padding: 0.1rem 0.5rem;
              line-height: 1;
            }
          }

          &:nth-of-type(2) {
            position: relative;
            padding-left: 40px;
            padding-right: 40px;

            > span {
              display: flex;
              align-items: center;
              justify-content: center;
              position: absolute;
              left: 60%;
              top: 15px;

              background: #000;
              color: #fff;
              padding: 5px;
              width: 20px;
              height: 20px;

              border-radius: 100%;
              line-height: 0;

              font-size: 10px;
              font-weight: bold;
            }
          }
        }
      }
    }
  }
}

@media only screen and (max-width: 1024px) {
  header {
    > section.limit-width {
      > section {
        padding: 0.5rem 2rem;
      }
    }
  }
}

</style>