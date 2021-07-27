<template>
  <v-container fluid>
    <h1>Citizenship.</h1>

    <section>
      <Question>
        {{ $t('are_you_a_canadian_citizen') }}
      </Question>

      <RadioList :options="['Yes', 'No']" 
        v-model="profile.citizenship.is_canadian_citizen" 
        :value="profile.citizenship.is_canadian_citizen" 
      />
    </section>

    <section v-if="profile.citizenship.is_canadian_citizen=='No'">
      <Question>
        {{ $t('are_you_a_perminent_resident') }}
      </Question>

      <RadioList :options="['Yes', 'No']" 
        v-model="profile.citizenship.are_you_a_perminent_resident" 
        :value="profile.citizenship.are_you_a_perminent_resident" 
      />
    </section>

    <section v-if="profile.citizenship.is_canadian_citizen=='No' && profile.citizenship.are_you_a_perminent_resident=='No'">
      <Question>
        {{ $t('are_you_a_protected_person') }}
      </Question>

      <RadioList :options="['Yes', 'No']" 
        v-model="profile.citizenship.are_you_a_protected_person" 
        :value="profile.citizenship.are_you_a_protected_person" 
      />
    </section>

    <section v-if="profile.citizenship.is_canadian_citizen=='No' && profile.citizenship.are_you_a_perminent_resident=='No' && profile.citizenship.are_you_a_protected_person=='Yes'">
      <Question>
        {{ $t('are_you_registered_as_indian') }}
      </Question>

      <RadioList :options="['Yes', 'No']" 
        v-model="profile.citizenship.are_you_registered_as_indian" 
        :value="profile.citizenship.are_you_registered_as_indian" 
      />
    </section>

    {{valid}}

    {{profile.citizenship.is_canadian_citizen}}
    {{profile.citizenship.are_you_a_perminent_resident}}
    {{profile.citizenship.are_you_a_protected_person}}
    {{profile.citizenship.are_you_registered_as_indian}}
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
    RadioList,
    Buttons
  },
  computed: {
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
        this.profile.citizenship.is_canadian_citizen == 'Yes' 
        || (
          this.profile.citizenship.is_canadian_citizen == 'No' 
          && this.profile.citizenship.are_you_a_perminent_resident == 'No'
          && this.profile.citizenship.are_you_a_protected_person == 'Yes'
          && this.profile.citizenship.are_you_registered_as_indian == 'Yes'
        )
    }
  },
  watch: {
    valid(to, from) {
      this.$emit('input', this.valid)
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
