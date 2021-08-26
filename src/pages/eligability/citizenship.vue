<template>
  <article data-layout="eligability">
    <h2 class="text-h3 mb-7">{{ $t('title') }}</h2>

    <section>
      <Question>
        {{ $t('are_you_a_canadian_citizen') }}
      </Question>

      <RadioList :options="['Yes', 'No']" 
        v-model="eligability.citizenship.is_canadian_citizen" 
        :value="eligability.citizenship.is_canadian_citizen" 
      />
    </section>

    <section v-if="eligability.citizenship.is_canadian_citizen=='No'">
      <Question>
        {{ $t('are_you_a_perminent_resident') }}
      </Question>

      <RadioList :options="['Yes', 'No']" 
        v-model="eligability.citizenship.are_you_a_perminent_resident" 
        :value="eligability.citizenship.are_you_a_perminent_resident" 
      />
    </section>

    <section v-if="eligability.citizenship.is_canadian_citizen=='No' && eligability.citizenship.are_you_a_perminent_resident">
      <Question>
        {{ $t('are_you_a_protected_person') }}
      </Question>

      <RadioList :options="['Yes', 'No']" 
        v-model="eligability.citizenship.are_you_a_protected_person" 
        :value="eligability.citizenship.are_you_a_protected_person" 
      />
    </section>

    <section v-if="eligability.citizenship.is_canadian_citizen=='No' && eligability.citizenship.are_you_a_perminent_resident && eligability.citizenship.are_you_a_protected_person=='No'">
      <Question>
        {{ $t('are_you_registered_as_indigenous') }}
      </Question>

      <RadioList :options="['Yes', 'No']" 
        v-model="eligability.citizenship.are_you_registered_as_indigenous" 
        :value="eligability.citizenship.are_you_registered_as_indigenous" 
      />
    </section>

    <Buttons :valid="valid" :next="next" :back="true" />
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
      var is_valid =  
        this.eligability.citizenship.is_canadian_citizen == 'Yes' 
        || (
          this.eligability.citizenship.is_canadian_citizen == 'No' 
          && this.eligability.citizenship.are_you_a_perminent_resident
        ) || (
          this.eligability.citizenship.is_canadian_citizen == 'No' 
          && this.eligability.citizenship.are_you_a_perminent_resident
          && this.eligability.citizenship.are_you_a_protected_person == 'No'
          && this.eligability.citizenship.are_you_registered_as_indigenous
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
    "title": "Citizenship",
    "are_you_a_canadian_citizen": "Are you a Canadian citizen?",
    "are_you_a_perminent_resident": "Are you a permanent resident?",
    "are_you_a_protected_person": "Are you a protected person?",
    "are_you_registered_as_indigenous": "Are you registered as indigenous?"
  },
  "fr": {
    "title": "Citizenship",
    "are_you_a_canadian_citizen": "Are you a Canadian citizen?",
    "are_you_a_perminent_resident": "Are you a permanent resident?",
    "are_you_a_protected_person": "Are you a protected person?",
    "are_you_registered_as_indigenous": "Are you registered as indigenous?"
  }
}
</i18n>
