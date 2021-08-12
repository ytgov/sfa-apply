<template>
  <v-container fluid>
    <h2>Designated Institution</h2>

    <section>
      <Question>
        {{ $t('are_you_enrolled_in_post_secondary') }}
      </Question>

      <RadioList :options="['Yes', 'No']" 
        v-model="profile.designated_institution.are_you_enrolled_in_post_secondary" 
        :value="profile.designated_institution.are_you_enrolled_in_post_secondary" 
      />
    </section>

    <section v-if="profile.designated_institution.are_you_enrolled_in_post_secondary=='Yes'">
      <Question>
        {{ $t('post_secondary_enrolled_in') }}
      </Question>

      <Select :options="institutions"
        v-model="profile.designated_institution.post_secondary_enrolled_in" 
        :value="profile.designated_institution.post_secondary_enrolled_in" 
        />
    </section>

  </v-container>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import Question from '~/components/forms/Question.vue';
import Buttons from '~/components/forms/Buttons.vue';
import RadioList from '~/components/forms/RadioList.vue';
import Select from '~/components/forms/Select.vue';

export default {
  components: {
    Question,
    RadioList,
    Select
  },
  data() {
    return {
      institutions: ["Yukon College", "Alcan Air"]
    }
  },
  computed: {
    profile: {
      get() {
        return this.$store.getters['profile/GET']
      },
      set(values) {
        return this.$store.commit('profile/SET', values)
      }
    },
    valid() {
      var is_valid = (
          this.profile.designated_institution.are_you_enrolled_in_post_secondary == 'No' 
        ) || (
          this.profile.designated_institution.are_you_enrolled_in_post_secondary == 'Yes' 
          && this.profile.designated_institution.post_secondary_enrolled_in
        )

      return is_valid
    }
  },
  mounted() {
    this.$emit('input', this.valid)
  },
  watch: {
    valid(to, from) {
      this.$emit('input', this.valid)
    }
  }
}
</script>


<i18n>
{
  "en": {
    "title": "Designated Institution",
    "are_you_enrolled_in_post_secondary": "Are you enrolled in post-secondary indication?",
    "post_secondary_enrolled_in": "What post-secondary are you enrolled in?"
  },
  "fr": {
    "title": "Designated Institution",
    "are_you_enrolled_in_post_secondary": "Are you enrolled in post-secondary indication?",
    "post_secondary_enrolled_in": "What post-secondary are you enrolled in?"
  }
}
</i18n>
