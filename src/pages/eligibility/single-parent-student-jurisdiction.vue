<template>
  <article data-layout="eligibility">
    <h2 class="text-h3 mb-7">{{ $t('title') }}</h2>

    <section>
      <Question>
        {{ $t('most_recently_in_yukon') }}
      </Question>

      <YesNoRadio
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
import YesNoRadio from '~/components/forms/YesNoRadio.vue';

export default {
  components: {
    Buttons,
    Question,
    RadioList,
    YesNoRadio
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
      return (this.eligibility.enrollment.are_you_full_or_part_time=='Part-time') ? 
        this.localePath('/eligibility/part-time-eligibility') :  this.localePath('/eligibility/full-time-eligibility')
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
    "title": "Single parent student",
    "most_recently_in_yukon": "Have you lived most recently in the yukon for 12 months not counting the time spent in full-time studies?"
  },
  "fr": {
    "title": "Étudiant chef de famille monoparentale",
    "most_recently_in_yukon": "Avez-vous récemment vécu au Yukon pendant 12 mois, sans compter le temps passé aux études à temps plein?"
  }
}
</i18n>
