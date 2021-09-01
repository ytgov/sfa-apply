<template>
  <article data-layout="eligibility">
    <h2 class="text-h3 mb-7">{{ $t('title') }}</h2>

    <section>
      <Question>
        {{ $t('are_you_full_or_part_time') }}
      </Question>

      <RadioList :options="['Full-time', 'Part-time']" 
        v-model="eligibility.studies.time" 
        :value="eligibility.studies.time" 
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
        //alert(values)
        //return this.$store.commit('eligibility/SET', values)
      }
    },
    valid() {
      var is_valid = this.eligibility.studies.time 
      return is_valid
    },
    next() {
      return '/eligibility/residence'
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
    "title": "Studies",
    "are_you_full_or_part_time": "Will you be studing full-time or part-time?"
  },
  "fr": {
    "title": "Studies",
    "are_you_full_or_part_time": "Will you be studing full-time or part-time?"
  }
}
</i18n>
