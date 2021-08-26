<template>
  <article data-layout="eligability">
    <h2 class="text-h3 mb-7">{{ $t('title') }}</h2>

    <section>
      <Question>
        {{ $t('has_family_maintained_home') }}
      </Question>

      <RadioList :options="['Yes', 'No']" 
        v-model="eligability.dependant_student_juristiction.has_family_maintained_home" 
        :value="eligability.dependant_student_juristiction.has_family_maintained_home" 
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
        return this.$store.commit('eligability/SET', values)
      }
    },
    valid() {
      var is_valid = (
          this.eligability.dependant_student_juristiction.has_family_maintained_home
        ) 

      return is_valid
    },
    next() {
      return '/eligability/single-parent-student-jurisdiction'
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
    "title": "Dependant Student Juristiction",
    "has_family_maintained_home": "Has your family maintained a house in the Yukon for at least 12 months?"
  },
  "fr": {
    "title": "Independent Student",
    "has_family_maintained_home": "Has your family maintained a house in the Yukon for at least 12 months?"
  }
}
</i18n>
