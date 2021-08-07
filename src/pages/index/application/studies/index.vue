<template>
  <v-container fluid>
    <h2>Studies</h2>

    <section>
      <Question>
        {{ $t('are_you_full_or_part_time') }}
      </Question>

      <RadioList :options="['Full-time', 'Part-time']" 
        v-model="profile.studies.time" 
        :value="profile.studies.time" 
      />
    </section>

  </v-container>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import Question from '~/components/forms/Question.vue';
import RadioList from '~/components/forms/RadioList.vue';

export default {
  components: {
    Question,
    RadioList
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
      var is_valid = this.profile.studies.time 
      return is_valid
    }
  },
  watch: {
    valid(to, from) {
      console.log(true)
      this.$emit('input', this.valid)
    }
  }
}
</script>


<i18n>
{
  "en": {
    "are_you_full_or_part_time": "Will you be studing full-time or part-time?"
  },
  "fr": {
    "are_you_full_or_part_time": "Will you be studing full-time or part-time?"
  }
}
</i18n>
