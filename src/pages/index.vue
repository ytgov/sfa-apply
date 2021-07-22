<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-card class="pa-2" outlined tile>
          <h2>{{ $t('title') }}</h2>
          <p>
            {{ $t('introduction') }}
          </p>
          <p>
            New User <nuxt-link to="/register">Create an Account</nuxt-link>
          </p>
        </v-card>
      </v-col>
      <v-col>
        <v-card class="pa-2" outlined tile>

        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
  layout: 'inset',
  middleware: 'no-auth',
}
</script>



<i18n>
{
  "en": {
    "title": "Good Afternoon",
    "introduction": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut nec nibh sit amet diam dictum malesuada sit amet sed dui. Nam sit amet neque a purus condimentum dignissim. Nulla facilisi."
  },
  "fr": {
    
  }
}
</i18n>