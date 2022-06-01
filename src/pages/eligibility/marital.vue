<template>
  <article data-layout="eligibility">
    <h2 class="text-h3 mb-7">{{ $t('title') }}</h2>

    <section>
      <Question>
        {{ $t('are_you_in_a_relationship') }}
      </Question>

      <YesNoRadio
        v-model="eligibility.marital.are_you_in_a_relationship" 
        :value="eligibility.marital.are_you_in_a_relationship" 
      />
    </section>

    <section v-if="eligibility.marital.are_you_in_a_relationship=='No' && eligibility.yukon_grant.out_of_school_4_years=='No'">
      <Question>
        {{ $t('have_you_ever_been_in_a_relationship') }}
      </Question>

      <YesNoRadio
        v-model="eligibility.marital.have_you_ever_been_in_a_relationship" 
        :value="eligibility.marital.have_you_ever_been_in_a_relationship" 
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
import YesNoRadio from '~/components/forms/YesNoRadio.vue';

export default {
  components: {
    Buttons,
    Question,
    RadioList,
    YesNoRadio
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
          this.eligibility.marital.are_you_in_a_relationship
        ) || (
          (
            this.eligibility.marital.are_you_in_a_relationship == 'No' 
            && this.eligibility.marital.have_you_ever_been_in_a_relationship
          ) || (
            this.eligibility.yukon_grant.out_of_school_4_years=='Yes'
          )
        )

      return is_valid
    },
    next() {
      if (this.eligibility.marital.are_you_in_a_relationship == 'Yes' || this.eligibility.marital.have_you_ever_been_in_a_relationship == 'Yes') {

        if (this.eligibility.enrollment.time == 'Part-time') {
          return this.localePath('/eligibility/part-time-eligibility')
        } else {
          return this.localePath('/eligibility/full-time-eligibility')
        } 
      }
      return this.localePath('/eligibility/parent')
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
    "title": "Marital status",
    "are_you_in_a_relationship": "Are you legally married or have you been in a common law relationship for at least one year?",
    "have_you_ever_been_in_a_relationship": "Have you ever been married or in a common law relationship?"
  },
  "fr": {
    "title": "État civil",
    "are_you_in_a_relationship": "Êtes-vous légalement marié ou en union de fait depuis au moins un an?",
    "have_you_ever_been_in_a_relationship": "Avez-vous déjà été légalement marié ou en union de fait?"
  }
}
</i18n>
