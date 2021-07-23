<template>
  <v-container fluid>
    <h1>Residence.</h1>

    <section>
      <Question>
        {{ $t('are_you_a_canadian_citizen') }}
      </Question>

      <RadioList :options="['Yes', 'No']" 
        v-model="profile.citizenship.is_canadian_citizen" 
        :value="profile.citizenship.is_canadian_citizen" 
      />
    </section>
  </v-container>
</template>



<script>
import { mapMutations, mapGetters } from 'vuex'
import Question from '~/components/forms/Question.vue';
import Buttons from '~/components/forms/Buttons.vue';
import RadioList from '~/components/forms/RadioList.vue';

export default {
  components: {
    Question,
    Radio
  },
  computed: {
    ...mapGetters({

    }),
    profile: {
      get() {
        return this.$store.getters['profile/GET']
      },
      set(values) {
        return this.$store.commit('profile/SET', values)
      }
    },
    valid() {
      return 
        (
          profile.citizenship.is_canadian_citizen == 'Yes' 
        ) || (
          profile.citizenship.is_canadian_citizen == 'No' 
          && profile.citizenship.are_you_a_protected_person == 'Yes'
          && profile.citizenship.are_you_registered_as_indian == 'Yes'
        )
    }
  }
}
</script>


<i18n>
{
  "en": {
    "are_you_a_canadian_citizen": "Are you a canadian citizen?",
    "are_you_a_perminent_resident": "Are you a perminent resident?",
    "are_you_a_protected_person": "Are you a protected person?",
    "are_you_registered_as_indian": "Are you registered as an indian?"
  },
  "fr": {
    "are_you_a_canadian_citizen": "Are you a canadian citizen?",
    "are_you_a_perminent_resident": "Are you a perminent resident?",
    "are_you_a_protected_person": "Are you a protected person?",
    "are_you_registered_as_indian": "Are you registered as an indian?"
  }
}
</i18n>
