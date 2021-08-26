<template>
  <article data-layout="eligability">
    <h2 class="text-h3 mb-7">{{ $t('title') }}</h2>

    <section>
      <Question>
        {{ $t('at_least_three_weeks') }}
      </Question>

      <RadioList :options="['Yes', 'No']" 
        v-model="eligability.program.at_least_three_weeks" 
        :value="eligability.program.at_least_three_weeks" 
      />
    </section>

    <section v-if="eligability.program.at_least_three_weeks=='Yes'">
      <Question>
        {{ $t('what_type_of_program') }}
      </Question>

      <RadioList :options="['Upgrade', 'Certificate', 'Degree', 'Masters', 'Doctorate', 'None of These']" 
        v-model="eligability.program.what_type_of_program" 
        :value="eligability.program.what_type_of_program" 
      />
    </section>

   

    <Buttons :valid="valid" :next="next" :back="true" />
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
      var is_valid =  
        this.eligability.program.at_least_three_weeks == 'No' 
        || (
          this.eligability.program.at_least_three_weeks == 'Yes' 
          && this.eligability.program.what_type_of_program
        ) 

      return is_valid
    },
    next() {
      return '/eligability/designated-institution'
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
    "title": "Program",
    "at_least_three_weeks": "Does your program last for at lease three weeks?",
    "what_type_of_program": "What type of program?"
  },
  "fr": {
    "title": "Program",
    "at_least_three_weeks": "Does your program last for at lease three weeks?",
    "what_type_of_program": "What type of program?"
  }
}
</i18n>
