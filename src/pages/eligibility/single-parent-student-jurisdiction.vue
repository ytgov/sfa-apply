<template>
  <article data-layout="eligibility">
    <h2 class="text-h3 mb-7">{{ $t('title') }}</h2>

    <section>
      <Question>
        {{ $t('most_recently_in_yukon') }}
      </Question>

      <RadioList :options="['Yes', 'No']" 
        v-model="eligibility.singleparentjuristiction.most_recently_in_yukon" 
        :value="eligibility.singleparentjuristiction.most_recently_in_yukon" 
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
          this.eligibility.singleparentjuristiction.most_recently_in_yukon
        ) 

      return is_valid
    },
    next() {
      return (this.eligibility.studies.are_you_full_or_part_time=='Part-time') ? 
        '/eligibility/part-time-eligibility' :  '/eligibility/full-time-eligibility'
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
    "title": "Single Parent Student Juristiction",
    "most_recently_in_yukon": "Have you lived most recently in the yukon for 12 months not counting the time spent in full-time studies?"
  },
  "fr": {
    "title": "Single Parent Student Juristiction",
    "most_recently_in_yukon": "Have you lived most recently in the yukon for 12 months not counting the time spent in full-time studies?"
  }
}
</i18n>
