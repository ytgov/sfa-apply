<template>
  <article data-layout="eligibility">
    <h2 class="text-h3 mb-7">{{ $t('title') }}</h2>

    <section>
      <Question>
        {{ $t('has_family_maintained_home') }}
      </Question>

      <RadioList :options="['Yes', 'No']" 
        v-model="eligibility.dependant_student_juristiction.has_family_maintained_home" 
        :value="eligibility.dependant_student_juristiction.has_family_maintained_home" 
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
          this.eligibility.dependant_student_juristiction.has_family_maintained_home
        ) 

      return is_valid
    },
    next() {
      if (this.eligibility.studies.time == 'Part-time') {
        return '/eligibility/part-time-eligibility'
      } else {
        return '/eligibility/full-time-eligibility'
      } 
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
    "title": "Dependant Student Juristiction",
    "has_family_maintained_home": "Has your family maintained a house in the Yukon for at least 12 months?"
  },
  "fr": {
    "title": "Independent Student",
    "has_family_maintained_home": "Has your family maintained a house in the Yukon for at least 12 months?"
  }
}
</i18n>
