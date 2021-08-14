<template>
  <v-container fluid>
    <h2>{{ $t('title') }}</h2>
    <p>
      You must read and agree to the ATIPP statement. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tempor urna ac nulla sollicitudin placerat. Cras condimentum ornare mauris at porttitor. Sed bibendum vehicula nulla eu molestie. 
    </p>

    <TermsWrapper v-model="profile.atipp.read_terms" :value="profile.atipp.read_terms">
      <ATIPP  />
    </TermsWrapper>

    <Buttons :valid="valid" :next="next" />
  </v-container>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import Buttons from '~/components/forms/Buttons.vue';
import Question from '~/components/forms/Question.vue';
import TermsWrapper from '~/components/terms/wrapper.vue';
import ATIPP from '~/components/terms/atipp.vue';

export default {
  components: {
    Buttons,
    Question,
    TermsWrapper,
    ATIPP
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
      var is_valid = this.profile.atipp.read_terms

      return is_valid
    },
    next() {
      return '/application/personal-information/tombstone'
    }
  },
  mounted() {
    this.$emit('input', this.valid)
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
    "title": "ATIPP Collection Statement"
  },
  "fr": {
    "title": "ATIPP Collection Statement"
  }
}
</i18n>
