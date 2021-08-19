<template>

</template>


<script>
export default {
  mounted() {
    var auth = this.$auth
    this.$store.dispatch('user/logout', { auth }).then(()=>{
      this.$auth.logout()
      this.$router.push('/')
    })
  }
}
</script>