<template>
  <article data-layout="eligibility">
    <h2 class="text-h3 mb-7">{{ $t('title') }}</h2>

    <section>
      <Question>
        {{ $t('perminent_disability') }}
      </Question>

      <RadioList :options="['Yes', 'No']" 
        v-model="eligibility.disabilities.perminent_disability" 
        :value="eligibility.disabilities.perminent_disability" 
      />
    </section>

    <section v-if="eligibility.disabilities.perminent_disability=='Yes'">
      <Question>
        {{ $t('service_equipment') }}
      </Question>

      <RadioList :options="['Yes', 'No']" 
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
          this.eligibility.disabilities.perminent_disability == 'No'
          || (
            this.eligibility.disabilities.perminent_disability == 'Yes'
            && this.eligibility.disabilities.service_equipment
          ) 
        ) 

      return is_valid
    },
    next() {
      return '/eligibility/review'
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
    "title": "Disabilities",
    "perminent_disability": "Are you a student with a permanent disability?",
    "service_equipment": "Are you in need of exceptional educational-related services or equipment?"
  },
  "fr": {
    "title": "Disabilities",
    "perminent_disability": "Are you a student with a permanent disability?",
    "service_equipment": "Are you in need of exceptional educational-related services or equipment?"
  }
}
</i18n>
