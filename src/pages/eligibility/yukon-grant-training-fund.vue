<template>
  <article data-layout="eligibility">
    <h2 class="text-h3 mb-7">{{ $t('title') }}</h2>

    <section>
      <Question>
        {{ $t('has_completed_two_years') }}
      </Question>

      <RadioList :options="['Yes', 'No']" 
        v-model="eligibility.yukon_grant_training_fund.has_completed_two_years" 
        :value="eligibility.yukon_grant_training_fund.has_completed_two_years" 
      />
    </section>

    <section v-if="eligibility.yukon_grant_training_fund.has_completed_two_years=='No'">
      <Question>
        {{ $t('has_been_resident_continuously') }}
      </Question>

      <RadioList :options="['Yes', 'No']" 
        v-model="eligibility.yukon_grant_training_fund.has_been_resident_continuously" 
        :value="eligibility.yukon_grant_training_fund.has_been_resident_continuously" 
      />
    </section>

    <section v-if="eligibility.yukon_grant_training_fund.has_been_resident_continuously=='No'">
      <Question>
        {{ $t('has_been_resident_continuously_from_14_to_18') }}
      </Question>

      <RadioList :options="['Yes', 'No']" 
        v-model="eligibility.yukon_grant_training_fund.has_been_resident_continuously_from_14_to_18" 
        :value="eligibility.yukon_grant_training_fund.has_been_resident_continuously_from_14_to_18" 
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
          this.eligibility.marital.are_you_in_a_relationship == 'Yes' 
        ) || (
          this.eligibility.marital.are_you_in_a_relationship == 'No' 
          && this.eligibility.marital.have_you_ever_been_in_a_relationship
        )

      return is_valid
    },
    next() {
      return '/eligibility/marital'
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
    "title": "Yukon Grant and Training Fund Eligibility",
    "has_completed_two_years": "Have you completed at least (2) two years of secondary school in the Yukon school system?",
    "has_been_resident_continuously": "Have you been a resident of Yukon continuously since the age of 14?",
    "has_been_resident_continuously_from_14_to_18": "Have you been a resident of the Yukon continuously from the age of 14 to the age of 18?"
  },
  "fr": {
    "title": "Yukon Grant and Training Fund Eligibility",
    "has_completed_two_years": "Have you completed at least (2) two years of secondary school in the Yukon school system?",
    "has_been_resident_continuously": "Have you been a resident of Yukon continuously since the age of 14?",
    "has_been_resident_continuously_from_14_to_18": "Have you been a resident of the Yukon continuously from the age of 14 to the age of 18?"
  }
}
</i18n>
