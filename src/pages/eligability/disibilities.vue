<template>
  <article data-layout="eligability">
    <h2 class="text-h3 mb-7">{{ $t('title') }}</h2>

    <section>
      <Question>
        {{ $t('perminent_disability') }}
      </Question>

      <RadioList :options="['Yes', 'No']" 
        v-model="eligability.disabilities.perminent_disability" 
        :value="eligability.disabilities.perminent_disability" 
      />
    </section>

    <section v-if="eligability.disabilities.perminent_disability=='Yes'">
      <Question>
        {{ $t('service_equipment') }}
      </Question>

      <RadioList :options="['Yes', 'No']" 
        v-model="eligability.disabilities.service_equipment" 
        :value="eligability.disabilities.service_equipment" 
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
          this.eligability.disabilities.perminent_disability == 'No'
          || (
            this.eligability.disabilities.perminent_disability == 'Yes'
            && this.eligability.disabilities.service_equipment
          ) 
        ) 

      return is_valid
    },
    next() {
      return '/eligability/review'
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
    "title": "Disibilities",
    "perminent_disability": "Are you a student with a perminent disability?",
    "service_equipment": "Are you in need of exceptional educational-related services or equipment?"
  },
  "fr": {
    "title": "Disibilities",
    "perminent_disability": "Are you a student with a perminent disability?",
    "service_equipment": "Are you in need of exceptional educational-related services or equipment?"
  }
}
</i18n>
