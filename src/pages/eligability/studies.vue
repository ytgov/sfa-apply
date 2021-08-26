<template>
  <article data-layout="eligability">
    <h2 class="text-h3 mb-7">{{ $t('title') }}</h2>

    <section>
      <Question>
        {{ $t('are_you_full_or_part_time') }}
      </Question>

      <RadioList :options="['Full-time', 'Part-time']" 
        v-model="eligability.studies.time" 
        :value="eligability.studies.time" 
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
    eligability: {
      get() {
        return this.$store.getters['eligability/GET']
      },
      set(values) {
        //alert(values)
        //return this.$store.commit('eligability/SET', values)
      }
    },
    valid() {
      var is_valid = this.eligability.studies.time 
      return is_valid
    },
    next() {
      return '/eligability/residence'
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
    "title": "Studies",
    "are_you_full_or_part_time": "Will you be studing full-time or part-time?"
  },
  "fr": {
    "title": "Studies",
    "are_you_full_or_part_time": "Will you be studing full-time or part-time?"
  }
}
</i18n>
