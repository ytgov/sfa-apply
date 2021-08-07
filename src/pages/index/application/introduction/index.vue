<template>
  <v-container fluid>
    <h2>Introduction</h2>

    <section>
      Coming soon.
    </section>

    
  </v-container>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import Question from '~/components/forms/Question.vue';
import Buttons from '~/components/forms/Buttons.vue';
import RadioList from '~/components/forms/RadioList.vue';

export default {
  components: {
    Question,
    RadioList
  },
  computed: {
    profile: {
      get() {
        return this.$store.getters['profile/GET']
      },
      set(values) {
        return this.$store.commit('profile/SET', values)
      }
    },
    valid() {
      return true
    }
  }
}
</script>


<i18n>
{
  "en": {

  },
  "fr": {

  }
}
</i18n>
