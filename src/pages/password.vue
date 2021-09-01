<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <v-row>
          <v-card outlined tile width="100%">
            <h2>Password Protected</h2>
            <p>
              Enter the password to view the site:
            </p>
            <v-form action="/" method="GET">
              <v-fieldset>
                <v-text-field type="text" name="_pw" placeholder="Password" />
                <v-btn color="primary" class="mr-5" type="submit">Send</v-btn>
              </v-fieldset>
            </v-form>
          </v-card>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
  layout: 'inset',
  middleware: 'no-auth'
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