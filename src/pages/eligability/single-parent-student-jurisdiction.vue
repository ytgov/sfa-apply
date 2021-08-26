<template>
  <article data-layout="eligability">
    <h2 class="text-h3 mb-7">{{ $t('title') }}</h2>

    <section>
      <Question>
        {{ $t('most_recently_in_yukon') }}
      </Question>

      <RadioList :options="['Yes', 'No']" 
        v-model="eligability.singleparentjuristiction.most_recently_in_yukon" 
        :value="eligability.singleparentjuristiction.most_recently_in_yukon" 
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
          this.eligability.singleparentjuristiction.most_recently_in_yukon
        ) 

      return is_valid
    },
    next() {
      return '/eligability/yukon-excellence-award'
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
    "title": "Single Parent Student Juristiction",
    "most_recently_in_yukon": "Have you lived most recently in the yukon for 12 months not counting the time spent in full-time studies?"
  },
  "fr": {
    "title": "Single Parent Student Juristiction",
    "most_recently_in_yukon": "Have you lived most recently in the yukon for 12 months not counting the time spent in full-time studies?"
  }
}
</i18n>
