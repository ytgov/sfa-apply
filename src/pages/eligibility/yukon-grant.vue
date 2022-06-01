<template>
  <article data-layout="eligibility">
    <h2 class="text-h3 mb-7">{{ $t('title') }}</h2>

    <section>
      <Question>
        {{ $t('has_completed_two_years') }}
      </Question>

      <YesNoRadio
        v-model="eligibility.yukon_grant.has_completed_two_years" 
        :value="eligibility.yukon_grant.has_completed_two_years" 
      />
    </section>

    <section v-if="eligibility.yukon_grant.has_completed_two_years">
      <Question>
        {{ $t('out_of_school_4_years') }}
      </Question>

      <YesNoRadio
        v-model="eligibility.yukon_grant.out_of_school_4_years" 
        :value="eligibility.yukon_grant.out_of_school_4_years" 
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
          this.eligibility.yukon_grant.has_completed_two_years == 'Yes' 
        ) || (
          this.eligibility.yukon_grant.has_completed_two_years == 'No' 
          && this.eligibility.yukon_grant.out_of_school_4_years
        )

      return is_valid
    },
    next() {
      return this.localePath('/eligibility/marital')
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
    "title": "Yukon Grant eligibility",
    "has_completed_two_years": "Have you completed at least (2) two years of secondary school in the Yukon school system?",
    "out_of_school_4_years": "Have you been out of high school for 4 years or more?"
  },
  "fr": {
    "title": "Admissibilité à la Bourse du Yukon",
    "has_completed_two_years": "Avez-vous fait au moins deux années d’études secondaires au Yukon?",
    "out_of_school_4_years": "Avez-vous cessé de fréquenter l’école secondaire pendant quatre ans ou plus?"
  }
}
</i18n>
