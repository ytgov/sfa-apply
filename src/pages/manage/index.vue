<template>
  <!-- App.vue -->
  <v-app>

 
    <v-navigation-drawer
      absolute
      permanent
      app
      right
      v-if="drawer"
    >
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/women/81.jpg">
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Jane Smith</v-list-item-title>
            <v-list-item-subtitle>Logged In</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>
              <nuxt-link :to="item.to">{{ item.title }}</nuxt-link>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>


    <v-app-bar 
      color="deep-purple"
      dark
      app
    >
      
      <Logo />
      <v-spacer></v-spacer>
      <v-toolbar-title>
        Application
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-list-item-avatar @click="toggleDrawer()">
        <img src="https://randomuser.me/api/portraits/women/81.jpg">
      </v-list-item-avatar>

    </v-app-bar>
    <v-main>
      <nuxt-child  :keep-alive-props="{ exclude: ['modal'] }" />
    </v-main>
   
    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>


<script>
import { mapMutations, mapGetters } from 'vuex'
import Logo from "~/components/Logo.vue"

export default {
  components: {
    Logo
  },
  data () {
    return {
      drawer: false,
      items: [
        { title: 'Home', icon: 'mdi-home-city', to: '/manage' },
        { title: 'Profile', icon: 'mdi-account-group-outline', to: '/manage/profile' },
        { title: 'Dcouments', icon: 'mdi-account', to: '/manage/application/documents' },
        { title: 'My Account', icon: 'mdi-account', to: '/manage/account' },
      ],
    }
  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer
    }
  }
}
</script>