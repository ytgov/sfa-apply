<template>
  <v-main>
    <h2>Error / {{error}}</h2>
    <br />
    <p>
      {{$route.query.error_description}}
    </p>
    <p v-if="false">
      {{$route.query}}
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
  mounted() {
    console.log(this.$route.query)
  }
}
</script>