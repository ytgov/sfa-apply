<template>
  <article data-layout="eligability">
    <h2 class="text-h3 mb-7">{{ $t('title') }}</h2>

    <section>
      <Question>
        {{ $t('are_you_in_a_relationship') }}
      </Question>

      <RadioList :options="['Yes', 'No']" 
        v-model="eligability.marital.are_you_in_a_relationship" 
        :value="eligability.marital.are_you_in_a_relationship" 
      />
    </section>

    <section v-if="eligability.marital.are_you_in_a_relationship=='No'">
      <Question>
        {{ $t('have_you_ever_been_in_a_relationship') }}
      </Question>

      <RadioList :options="['Yes', 'No']" 
        v-model="eligability.marital.have_you_ever_been_in_a_relationship" 
        :value="eligability.marital.have_you_ever_been_in_a_relationship" 
      />
    </section>

    <Buttons :valid="valid" :next="next" back="true" />
  </article>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import Buttons from '~/components/forms/Buttons.vue';
import Question from '~/components/forms/Question.vue';
import RadioList from '~/components/forms/RadioList.vue';

export default {
  components: {
    Buttons,
    Question,
    RadioList
  },
  computed: {
    eligability: {
      get() {
        return this.$store.getters['eligability/GET']
      },
      set(values) {
        return this.$store.commit('eligability/SET', values)
      }
    },
    valid() {
      var is_valid = (
          this.eligability.marital.are_you_in_a_relationship == 'Yes' 
        ) || (
          this.eligability.marital.are_you_in_a_relationship == 'No' 
          && this.eligability.marital.have_you_ever_been_in_a_relationship
        )

      return is_valid
    },
    next() {
      return '/eligability/parent'
    }
  },
  mounted() {
    this.$emit('input', this.valid)
  },
  watch: {
    valid(to, from) {
      this.$store.commit('eligability/SET', this.eligability)
      this.$emit('input', this.valid)
    }
  }
}
</script>


<i18n>
{
  "en": {
    "title": "Marital Status",
    "are_you_in_a_relationship": "Are you legally married or have you been in a common law relationship for at least one year?",
    "have_you_ever_been_in_a_relationship": "Have you ever been married or in a common law relationship?"
  },
  "fr": {
    "title": "Marital Status",
  "are_you_in_a_relationship": "Are you legally married or have you been in a common law relationship for at least one year?",
    "have_you_ever_been_in_a_relationship": "Have you ever been married or in a common law relationship?"
  }
}
</i18n>
