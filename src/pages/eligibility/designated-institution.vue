<template>
  <article data-layout="eligibility">
    <h2 class="text-h3 mb-7">{{ $t('title') }}</h2>

    <section>
      <Question>
        {{ $t('are_you_enrolled_in_post_secondary') }}
      </Question>

      <RadioList :options="['Yes', 'No']" 
        v-model="eligibility.designated_institution.are_you_enrolled_in_post_secondary" 
        :value="eligibility.designated_institution.are_you_enrolled_in_post_secondary" 
      />
    </section>

    <section v-if="eligibility.designated_institution.are_you_enrolled_in_post_secondary=='Yes'">
      <Question>
        {{ $t('post_secondary_enrolled_in') }}
      </Question>

      <Select :options="institutions"
        v-model="eligibility.designated_institution.post_secondary_enrolled_in" 
        :value="eligibility.designated_institution.post_secondary_enrolled_in" 
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
import Select from '~/components/forms/Select.vue';

export default {
  components: {
    Buttons,
    Question,
    RadioList,
    Select
  },
  data() {
    return {
      institutions: ["Yukon College", "Alcan Air", "McMaster University", "University of British Columbia", "University of Windsor"]
    }
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
          this.eligibility.designated_institution.are_you_enrolled_in_post_secondary == 'No' 
        ) || (
          this.eligibility.designated_institution.are_you_enrolled_in_post_secondary == 'Yes' 
          && this.eligibility.designated_institution.post_secondary_enrolled_in
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
    "title": "Designated Institution",
    "are_you_enrolled_in_post_secondary": "Are you enrolled in post-secondary institution?",
    "post_secondary_enrolled_in": "Which institution are you enrolled in?"
  },
  "fr": {
    "title": "Designated Institution",
    "are_you_enrolled_in_post_secondary": "Are you enrolled in post-secondary institution?",
    "post_secondary_enrolled_in": "Which institution are you enrolled in?"
  }
}
</i18n>
