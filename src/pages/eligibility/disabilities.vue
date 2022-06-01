<template>
  <article data-layout="eligibility">
    <h2 class="text-h3 mb-7">{{ $t('title') }}</h2>

    <section>
      <Question>
        {{ $t('permanent_disability') }}
      </Question>

      <YesNoRadio 
        v-model="eligibility.disabilities.permanent_disability" 
        :value="eligibility.disabilities.permanent_disability" 
      />
    </section>

    <section v-if="eligibility.disabilities.permanent_disability=='Yes'">
      <Question>
        {{ $t('service_equipment') }}
      </Question>

      <YesNoRadio
        v-model="eligibility.disabilities.service_equipment" 
        :value="eligibility.disabilities.service_equipment" 
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
          this.eligibility.disabilities.permanent_disability == 'No'
          || (
            this.eligibility.disabilities.permanent_disability == 'Yes'
            && this.eligibility.disabilities.service_equipment
          ) 
        ) 

      return is_valid
    },
    next() {
      return this.localePath('/eligibility/review')
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
    "title": "Disability information",
    "permanent_disability": "Do you have a permanent disability?",
    "service_equipment": "Do you have a persistent or prolonged disability that is expected to last 12 months or more?"
  },
  "fr": {
    "title": "Information sur les incapacités",
    "permanent_disability": "Avez-vous une incapacité permanente?",
    "service_equipment": "Avez-vous une incapacité persistante ou chronique qui devrait durer 12 mois ou plus?"
  }
}
</i18n>
