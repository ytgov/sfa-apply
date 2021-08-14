<template>
  <div class="buttons">
    <nuxt-link :to="next">
      <v-btn class="next" color="primary" v-if="valid">
        Continue
      </v-btn>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: ['valid', 'next']
}  
</script>


<style lang="scss" scoped>
div.buttons {
  font-size: 22px;
  margin-top: 2rem;
}
</style>