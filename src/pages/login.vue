<template>
  <v-container fluid>
    
  
  </v-container>
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
export default {
  layout: 'inset',
  middleware: 'no-auth',
  head () {
    return {
      title: 'Yukon Student Financial Portal - Login'
    }
  },
  mounted() {
    this.$auth.loginWith('auth0')
  }
}
</script>