<template>
  <article data-layout="eligability">
    <h2 class="text-h3 mb-7">{{ $t('title') }}</h2>

    <section>
      <Question>
        {{ $t('are_you_enrolled_in_post_secondary') }}
      </Question>

      <RadioList :options="['Yes', 'No']" 
        v-model="eligability.designated_institution.are_you_enrolled_in_post_secondary" 
        :value="eligability.designated_institution.are_you_enrolled_in_post_secondary" 
      />
    </section>

    <section v-if="eligability.designated_institution.are_you_enrolled_in_post_secondary=='Yes'">
      <Question>
        {{ $t('post_secondary_enrolled_in') }}
      </Question>

      <Select :options="institutions"
        v-model="eligability.designated_institution.post_secondary_enrolled_in" 
        :value="eligability.designated_institution.post_secondary_enrolled_in" 
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
          this.eligability.designated_institution.are_you_enrolled_in_post_secondary == 'No' 
        ) || (
          this.eligability.designated_institution.are_you_enrolled_in_post_secondary == 'Yes' 
          && this.eligability.designated_institution.post_secondary_enrolled_in
        )

      return is_valid
    },
    next() {
      return '/eligability/marital'
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
