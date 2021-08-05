<template>
  <v-main>
    <h2>Error / {{error}}</h2>
    <br />
    <p>
      {{$route.query.error_description}}
    </p>
    <p>
      {{$route.query}}
    </p>
    <p v-if="response">
      {{response}}
    </p>
  </v-main>
</template>

<script>
export default {
  computed: {
    error() {
      var output = ''
      switch(this.$route.query.error) {
        case 'server_error': 
          output = 'Server Error';
          break;
        case 'invalid_state': 
          output = 'Invalid State';
          break;
        case 'invalid_scope': 
          output = 'Invalid Scope';
          break;
      }
      return output;
    }
  },
  data() {
    return {
      response: false
    }
  },
  mounted() {
    if (this.$route.query.code) {
      this.$store.dispatch('user/token', { code: this.$route.query.code }).then((response)=>{
        this.response = response
      })
    }
  }
}
</script>