<template>
  <article data-layout="eligibility">
    <h2 class="text-h3 mb-7">{{ $t('title') }}</h2>

    <section>
      <Question>
        {{ $t('at_least_three_weeks') }}
      </Question>

      <RadioList :options="['Yes', 'No']" 
        v-model="eligibility.program.at_least_three_weeks" 
        :value="eligibility.program.at_least_three_weeks" 
      />
    </section>

    <section v-if="eligibility.program.at_least_three_weeks=='Yes'">
      <Question>
        {{ $t('what_type_of_program') }}
      </Question>

      <RadioList :options="[
        'Upgrade', 
        'Certificate', 
        'Diploma', 
        'Under Graduate', 
        'Masters', 
        'Doctorate', 
        'None of These'
        ]" 
        v-model="eligibility.program.what_type_of_program" 
        :value="eligibility.program.what_type_of_program" 
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
    eligibility: {
      get() {
        return this.$store.getters['eligibility/GET']
      },
      set(values) {
        return this.$store.commit('eligibility/SET', values)
      }
    },
    valid() {
      var is_valid =  
        this.eligibility.program.at_least_three_weeks == 'No' 
        || (
          this.eligibility.program.at_least_three_weeks == 'Yes' 
          && this.eligibility.program.what_type_of_program
        ) 

      return is_valid
    },
    next() {
      return '/eligibility/designated-institution'
    }
  },
  mounted() {
    this.$emit('input', this.valid)
  },
  watch: {
    valid(to, from) {
      this.$store.commit('eligibility/SET', this.eligibility)
      this.$emit('input', this.valid)
    }
  }
}
</script>


<i18n>
{
  "en": {
    "title": "Program",
    "at_least_three_weeks": "Is your program a minimum of 12 consecutive weeks?",
    "what_type_of_program": "What type of program?"
  },
  "fr": {
    "title": "Program",
    "at_least_three_weeks": "Is your program a minimum of 12 consecutive weeks?",
    "what_type_of_program": "What type of program?"
  }
}
</i18n>
