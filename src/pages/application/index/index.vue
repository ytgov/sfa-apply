<template>
  <v-container fluid>
    <h2>{{ $t('title') }}</h2>

    <section>
      Coming soon.
    </section>

    <Buttons :valid="valid" :next="next" />
  </v-container>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import Question from '~/components/forms/Question.vue';
import Buttons from '~/components/forms/Buttons.vue';
import RadioList from '~/components/forms/RadioList.vue';

export default {
  components: {
    Buttons,
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
    },
    next() {
      return '/application/studies'
    }
  }
}
</script>


<i18n>
{
  "en": {
    "title": "Introduction"
  },
  "fr": {
    "title": "Introduction"
  }
}
</i18n>
