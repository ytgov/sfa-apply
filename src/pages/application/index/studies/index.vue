<template>
  <v-container fluid>
    <h2>{{ $t('title') }}</h2>

    <section>
      <Question>
        {{ $t('are_you_full_or_part_time') }}
      </Question>

      <RadioList :options="['Full-time', 'Part-time']" 
        v-model="profile.studies.time" 
        :value="profile.studies.time" 
      />
    </section>

    <Buttons :valid="valid" :next="next" />
  </v-container>
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
    profile: {
      get() {
        return this.$store.getters['profile/GET']
      },
      set(values) {
        //alert(values)
        //return this.$store.commit('profile/SET', values)
      }
    },
    valid() {
      var is_valid = this.profile.studies.time 
      return is_valid
    },
    next() {
      return '/application/citizenship'
    }
  },
  mounted() {
    this.$emit('input', this.valid)
  },
  watch: {
    valid(to, from) {
      this.$store.commit('profile/SET', this.profile)
      this.$emit('input', this.valid)
    }
  }
}
</script>


<i18n>
{
  "en": {
    "title": "Studies",
    "are_you_full_or_part_time": "Will you be studing full-time or part-time?"
  },
  "fr": {
    "title": "Studies",
    "are_you_full_or_part_time": "Will you be studing full-time or part-time?"
  }
}
</i18n>
