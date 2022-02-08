<template>
  <article data-layout="eligibility">
    <h2 class="text-h3 mb-7">{{ $t('title') }}</h2>

    <p v-for="text in $t('body')">
      {{ text }}
    </p>

    <section>
      <Question>
        {{ $t('are_you_a_canadian_citizen') }}
      </Question>

      <RadioList :options="['Yes', 'No']" 
        v-model="eligibility.citizenship.is_canadian_citizen" 
        :value="eligibility.citizenship.is_canadian_citizen" 
      />
    </section>

    <section v-if="eligibility.citizenship.is_canadian_citizen=='No'">
      <Question>
        {{ $t('are_you_a_permanent_resident') }}
      </Question>

      <RadioList :options="['Yes', 'No']" 
        v-model="eligibility.citizenship.are_you_a_permanent_resident" 
        :value="eligibility.citizenship.are_you_a_permanent_resident" 
      />
    </section>

    <section v-if="eligibility.citizenship.is_canadian_citizen=='No' && eligibility.citizenship.are_you_a_permanent_resident">
      <Question>
        {{ $t('are_you_a_protected_person') }}
      </Question>

      <RadioList :options="['Yes', 'No']" 
        v-model="eligibility.citizenship.are_you_a_protected_person" 
        :value="eligibility.citizenship.are_you_a_protected_person" 
      />
    </section>

    <section v-if="eligibility.citizenship.is_canadian_citizen=='No' && eligibility.citizenship.are_you_a_permanent_resident && eligibility.citizenship.are_you_a_protected_person=='No'">
      <Question>
        {{ $t('are_you_registered_as_indigenous') }}
      </Question>

      <RadioList :options="['Yes', 'No']" 
        v-model="eligibility.citizenship.are_you_registered_as_indigenous" 
        :value="eligibility.citizenship.are_you_registered_as_indigenous" 
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
        this.eligibility.citizenship.is_canadian_citizen == 'Yes' 
        || (
          this.eligibility.citizenship.is_canadian_citizen == 'No' 
          && this.eligibility.citizenship.are_you_a_permanent_resident
        ) || (
          this.eligibility.citizenship.is_canadian_citizen == 'No' 
          && this.eligibility.citizenship.are_you_a_permanent_resident
          && this.eligibility.citizenship.are_you_a_protected_person == 'No'
          && this.eligibility.citizenship.are_you_registered_as_indigenous
        )

      return is_valid
    },
    next() {
      if (this.eligibility.citizenship.are_you_registered_as_indigenous == 'Yes') {
        return '/eligibility/enrollment'
      }
      return '/eligibility/yukon-excellence-award'
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
    "title": "Citizenship",
    "body": [
      "To be eligible for potential funding programs, you must be a Canadian citizen or a permanent resident.",
      "Add whatever screen comes up if you choose ‘no’. If no, stop checker as student is not eligible for any of our programs"
    ],
    "are_you_a_canadian_citizen": "Are you a Canadian citizen?",
    "are_you_a_permanent_resident": "Are you a permanent resident?",
    "are_you_a_protected_person": "Are you a protected person?",
    "are_you_registered_as_indigenous": "Are you registered as indigenous?"
  },
  "fr": {
    "title": "Citizenship",
    "body": [
      "To be eligible for potential funding programs, you must be a Canadian citizen or a permanent resident.",
      "Add whatever screen comes up if you choose ‘no’. If no, stop checker as student is not eligible for any of our programs"
    ],
    "are_you_a_canadian_citizen": "Are you a Canadian citizen?",
    "are_you_a_permanent_resident": "Are you a permanent resident?",
    "are_you_a_protected_person": "Are you a protected person?",
    "are_you_registered_as_indigenous": "Are you registered as indigenous?"
  }
}
</i18n>
