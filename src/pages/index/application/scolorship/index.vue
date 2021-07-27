<template>
  <v-container fluid>
    <h1>Scolorship.</h1>

    <section>
      <Question>
        {{ $t('are_you_a_high_school_student') }}
      </Question>

      <RadioList :options="['Yes', 'No']" 
        v-model="profile.scolorship.is_high_school_student" 
        :value="profile.scolorship.is_high_school_student" 
      />
    </section>

    <section v-if="profile.scolorship.is_high_school_student=='Yes'">
      <Question>
        {{ $t('are_you_a_high_school_graduate') }}
      </Question>

      <RadioList :options="['Yes', 'No']" 
        v-model="profile.scolorship.is_high_school_graduate" 
        :value="profile.scolorship.is_high_school_graduate" 
      />
    </section>
    <section v-if="profile.scolorship.is_high_school_student=='Yes' && profile.scolorship.is_high_school_graduate == 'No'">
      <Question>
        {{ $t('are_you_pursuing_aviation') }}
      </Question>

      <RadioList :options="['Yes', 'No']" 
        v-model="profile.scolorship.is_pursuing_aviation" 
        :value="profile.scolorship.is_pursuing_aviation" 
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
    RadioList
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
      return true;
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
    "are_you_a_high_school_student": "Are you a grade 12 student attending a Yukon High School and entering the first year of post secondary?",
    "are_you_a_high_school_graduate": "Are you or will you be a high school graduate from a yukon high school?",
    "are_you_pursuing_aviation": "Are you pursuing aviation oriented technical training?"
  },
  "fr": {
    "are_you_a_high_school_student": "Are you a grade 12 student attending a Yukon High School and entering the first year of post secondary?",
    "are_you_a_high_school_graduate": "Are you or will you be a high school graduate from a yukon high school?",
    "are_you_pursuing_aviation": "Are you pursuing aviation oriented technical training?"
  }
}
</i18n>
