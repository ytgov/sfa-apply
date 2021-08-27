<template>
  <article data-layout="eligability">
    <h2 class="text-h3 mb-7">{{ $t('title') }}</h2>


    <section>
      <Question>
        {{ $t('family_size') }}
      </Question>

      <TextField v-model="eligability.parttimeeligability.family_size" :value="eligability.parttimeeligability.family_size" />
    </section>

    <section v-if="eligability.parttimeeligability.family_size">
      <Question>
        {{ $t('previous_year_gross_family_income') }}
      </Question>

      <Currency v-model="eligability.parttimeeligability.previous_year_gross_family_income" :value="eligability.parttimeeligability.previous_year_gross_family_income" />
    </section>

    <section v-if="eligability.parttimeeligability.family_size && eligability.parttimeeligability.previous_year_gross_family_income">
      <Question>
        {{ $t('enrolled') }}
      </Question>

      <RadioList :options="['Yes', 'No']" 
        v-model="eligability.parttimeeligability.enrolled" 
        :value="eligability.parttimeeligability.enrolled" 
      />
    </section>

    <section v-if="eligability.parttimeeligability.family_size && eligability.parttimeeligability.previous_year_gross_family_income && eligability.parttimeeligability.enrolled">
      <Question>
        {{ $t('lived_in_yukon') }}
      </Question>

      <RadioList :options="['Yes', 'No']" 
        v-model="eligability.parttimeeligability.lived_in_yukon" 
        :value="eligability.parttimeeligability.lived_in_yukon" 
      />
    </section>

   
    <section v-if="eligability.parttimeeligability.family_size && eligability.parttimeeligability.previous_year_gross_family_income && eligability.parttimeeligability.enrolled && eligability.parttimeeligability.lived_in_yukon">
      <Question>
        {{ $t('dependants_under_twelve') }}
      </Question>

      <TextField v-model="eligability.parttimeeligability.dependants_under_twelve" :value="eligability.parttimeeligability.dependants_under_twelve" />
  
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
          this.eligability.parttimeeligability.family_size 
          && this.eligability.parttimeeligability.previous_year_gross_family_income 
          && this.eligability.parttimeeligability.enrolled 
          && this.eligability.parttimeeligability.lived_in_yukon
          && this.eligability.parttimeeligability.dependants_under_twelve
        ) 

      return is_valid
    },
    next() {
      return '/eligability/disabilities'
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
    "title": "Part-time Student Loan Eligability",
    "family_size": "What is your family size?",
    "previous_year_gross_family_income": "What is your gross family income for the previous year?",
    "enrolled": "Have you been enrolled in a degree, diploma, or technical program of at least 12 weeks of study within a 15 week period?",
    "lived_in_yukon": "While you were not in full-time post secondary studies did you live in the Yukon for 12 months in a row?",
    "dependants_under_twelve": "How many dependants do you have under the age of 12?"
  },
  "fr": {
    "title": "Part-time Student Loan Eligability",
    "family_size": "What is your family size?",
    "previous_year_gross_family_income": "What is your gross family income for the previous year?",
    "enrolled": "Have you been enrolled in a degree, diploma, or technical program of at least 12 weeks of study within a 15 week period?",
    "lived_in_yukon": "While you were not in full-time post secondary studies did you live in the Yukon for 12 months in a row?",
    "dependants_under_twelve": "How many dependants do you have under the age of 12?"
  }
}
</i18n>
