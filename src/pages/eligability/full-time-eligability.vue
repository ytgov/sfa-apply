<template>
  <article data-layout="eligability">
    <h2 class="text-h3 mb-7">{{ $t('title') }}</h2>

    <section>
      <Question>
        {{ $t('program_at_least_2_years') }}
      </Question>

      <RadioList :options="['Yes', 'No']" 
        v-model="eligability.fulltimeeligability.program_at_least_2_years" 
        :value="eligability.fulltimeeligability.program_at_least_2_years" 
      />
    </section>


    <section v-if="eligability.fulltimeeligability.program_at_least_2_years=='Yes'">
      <Question>
        {{ $t('family_size') }}
      </Question>

      <TextField 
        v-model="eligability.fulltimeeligability.family_size" 
        :value="eligability.fulltimeeligability.family_size" 
      />
    </section>

    <section v-if="eligability.fulltimeeligability.program_at_least_2_years=='Yes' && eligability.fulltimeeligability.family_size">
      <Question>
        {{ $t('previous_year_gross_family_income') }}
      </Question>

      <Currency v-model="eligability.fulltimeeligability.previous_year_gross_family_income" :value="eligability.fulltimeeligability.previous_year_gross_family_income" />
    </section>

    <section v-if="eligability.fulltimeeligability.program_at_least_2_years=='Yes' && eligability.fulltimeeligability.family_size && eligability.fulltimeeligability.previous_year_gross_family_income">
      <Question>
        {{ $t('dependants_under_twelve') }}
      </Question>

      <RadioList :options="['Yes', 'No']" 
        v-model="eligability.fulltimeeligability.dependants_under_twelve" 
        :value="eligability.fulltimeeligability.dependants_under_twelve" 
      />
    </section>


    <section v-if="eligability.fulltimeeligability.program_at_least_2_years=='Yes' && eligability.fulltimeeligability.family_size && eligability.fulltimeeligability.previous_year_gross_family_income && eligability.fulltimeeligability.dependants_under_twelve">
      <Question>
        {{ $t('dependants_with_disability') }}
      </Question>

      <TextField 
        v-model="eligability.fulltimeeligability.dependants_with_disability" 
        :value="eligability.fulltimeeligability.dependants_with_disability" 
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
import TextField from '~/components/forms/TextField.vue';
import Currency  from '~/components/forms/Currency.vue';

export default {
  components: {
    Buttons,
    Question,
    RadioList,
    TextField,
    Currency
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
        this.eligability.fulltimeeligability.program_at_least_2_years=='No'
        || (
          this.eligability.fulltimeeligability.program_at_least_2_years=='Yes'
          && this.eligability.fulltimeeligability.family_size 
          && this.eligability.fulltimeeligability.previous_year_gross_family_income 
          && this.eligability.fulltimeeligability.dependants_under_twelve
          && this.eligability.fulltimeeligability.dependants_with_disability
        ) 
      )

      return is_valid
    },
    next() {
      return '/eligability/disibilities'
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
    "title": "Full-time Student Loan Eligability",
    "program_at_least_2_years": "Is your program at least 2 years (60 weeks) in duration?",
    "family_size": "What is your family size?",
    "previous_year_gross_family_income": "What is your gross family income for the previous year?",
    "dependants_under_twelve": "How many dependants do you have under the age of 12?",
    "dependants_with_disability": "How many dependants older than 12 with a disability?"
  },
  "fr": {
    "title": "Full-time Student Loan Eligability",
    "program_at_least_2_years": "Is your program at least 2 years (60 weeks) in duration?",
    "family_size": "What is your family size?",
    "previous_year_gross_family_income": "What is your gross family income for the previous year?",
    "dependants_under_twelve": "How many dependants do you have under the age of 12?",
    "dependants_with_disability": "How many dependants older than 12 with a disability?"
  }
}
</i18n>
