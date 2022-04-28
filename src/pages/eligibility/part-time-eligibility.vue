<template>
  <article data-layout="eligibility">
    <h2 class="text-h3 mb-7">{{ $t('title') }}</h2>


    <section>
      <Question>
        {{ $t('family_size') }}
      </Question>

      <NumberField v-model="eligibility.parttimeeligibility.family_size" :value="eligibility.parttimeeligibility.family_size" />
    </section>

    <section v-if="eligibility.parttimeeligibility.family_size">
      <Question>
        {{ $t('previous_year_gross_family_income') }}
      </Question>

      <Currency v-model="eligibility.parttimeeligibility.previous_year_gross_family_income" :value="eligibility.parttimeeligibility.previous_year_gross_family_income" />
    </section>

    <section v-if="eligibility.parttimeeligibility.family_size && eligibility.parttimeeligibility.previous_year_gross_family_income">
      <Question>
        {{ $t('enrolled') }}
      </Question>

      <RadioList :options="['Yes', 'No']" 
        v-model="eligibility.parttimeeligibility.enrolled" 
        :value="eligibility.parttimeeligibility.enrolled" 
      />
    </section>

    <section v-if="eligibility.parttimeeligibility.family_size && eligibility.parttimeeligibility.previous_year_gross_family_income && eligibility.parttimeeligibility.enrolled">
      <Question>
        {{ $t('lived_in_yukon') }}
      </Question>

      <RadioList :options="['Yes', 'No']" 
        v-model="eligibility.parttimeeligibility.lived_in_yukon" 
        :value="eligibility.parttimeeligibility.lived_in_yukon" 
      />
    </section>

   
    <section v-if="eligibility.parttimeeligibility.family_size && eligibility.parttimeeligibility.previous_year_gross_family_income && eligibility.parttimeeligibility.enrolled && eligibility.parttimeeligibility.lived_in_yukon">
      <Question>
        {{ $t('dependants_under_twelve') }}
      </Question>

      <NumberField v-model="eligibility.parttimeeligibility.dependants_under_twelve" :value="eligibility.parttimeeligibility.dependants_under_twelve" />
  
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
import NumberField from '~/components/forms/NumberField.vue';

export default {
  components: {
    Buttons,
    Question,
    RadioList,
    TextField,
    NumberField,
    Currency
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
      var is_valid = (
          this.eligibility.parttimeeligibility.family_size 
          && this.eligibility.parttimeeligibility.previous_year_gross_family_income 
          && this.eligibility.parttimeeligibility.enrolled 
          && this.eligibility.parttimeeligibility.lived_in_yukon
          && this.eligibility.parttimeeligibility.dependants_under_twelve
        ) 

      return is_valid
    },
    next() {
      return '/eligibility/disabilities'
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
    "title": "Part-time student loan eligability",
    "family_size": "What is your family size?",
    "previous_year_gross_family_income": "What is your gross family income for the previous year?",
    "enrolled": "Have you been enrolled in a degree, diploma, or technical program of at least 12 weeks of study within a 15 week period?",
    "lived_in_yukon": "While you were not in full-time post secondary studies did you live in the Yukon for 12 months in a row?",
    "dependants_under_twelve": "How many dependants do you have under the age of 12?"
  },
  "fr": {
    "title": "Part-time student loan eligability",
    "family_size": "What is your family size?",
    "previous_year_gross_family_income": "What is your gross family income for the previous year?",
    "enrolled": "Have you been enrolled in a degree, diploma, or technical program of at least 12 weeks of study within a 15 week period?",
    "lived_in_yukon": "While you were not in full-time post secondary studies did you live in the Yukon for 12 months in a row?",
    "dependants_under_twelve": "How many dependants do you have under the age of 12?"
  }
}
</i18n>
