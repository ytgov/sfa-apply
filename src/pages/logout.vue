<template>
  <v-container fluid>

  </v-container>
</template>


<script>
export default {
  mounted() {
    this.$store.dispatch('user/logout').then(()=>{
      this.$auth.logout()
      this.$router.push('/')
    })
  }
}
</script>