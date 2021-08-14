<template>
  <v-container fluid>
    <h2>{{ $t('title') }}</h2>

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
        {{ $t('are_you_registered_as_indigenous') }}
      </Question>

      <RadioList :options="['Yes', 'No']" 
        v-model="profile.citizenship.are_you_registered_as_indigenous" 
        :value="profile.citizenship.are_you_registered_as_indigenous" 
      />
    </section>

    <Buttons :valid="valid" :next="next" />
  </v-container>
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
    profile: {
      get() {
        return this.$store.getters['profile/GET']
      },
      set(values) {
        return this.$store.commit('profile/SET', values)
      }
    },
    valid() {
      var is_valid =  
        this.profile.citizenship.is_canadian_citizen == 'Yes' 
        || (
          this.profile.citizenship.is_canadian_citizen == 'No' 
          && this.profile.citizenship.are_you_a_perminent_resident == 'Yes'
        ) || (
          this.profile.citizenship.is_canadian_citizen == 'No' 
          && this.profile.citizenship.are_you_a_perminent_resident == 'No'
          && this.profile.citizenship.are_you_a_protected_person == 'Yes'
          && this.profile.citizenship.are_you_registered_as_indigenous == 'Yes'
        )

      return is_valid
    },
    next() {
      return '/application/scholarship'
    }
  },
  mounted() {
    this.$emit('input', this.valid)
  },
  watch: {
    valid(to, from) {
      this.$store.commit('profile/SET', this.profile)
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
