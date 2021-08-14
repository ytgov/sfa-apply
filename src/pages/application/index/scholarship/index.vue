<template>
  <v-container fluid>
    <h2>{{ $t('title') }}</h2>

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
    <section v-if="profile.scolorship.is_high_school_student=='Yes' && profile.scolorship.is_high_school_graduate">
      <Question>
        {{ $t('are_you_pursuing_aviation') }}
      </Question>

      <RadioList :options="['Yes', 'No']" 
        v-model="profile.scolorship.is_pursuing_aviation" 
        :value="profile.scolorship.is_pursuing_aviation" 
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
      var is_valid = (
        this.profile.scolorship.is_high_school_student == 'No' ||
        (
          this.profile.scolorship.is_high_school_student == 'Yes' 
          && this.profile.scolorship.is_high_school_graduate == 'Yes'
          && this.profile.scolorship.is_pursuing_aviation
        )
      )
      return is_valid;
    },
    next() {
      return '/application/residence'
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
    "title": "Scholarship",
    "are_you_a_high_school_student": "Are you a grade 12 student attending a Yukon High School and entering the first year of post secondary?",
    "are_you_a_high_school_graduate": "Are you or will you be a high school graduate from a yukon high school?",
    "are_you_pursuing_aviation": "Are you pursuing aviation oriented technical training?"
  },
  "fr": {
    "title": "Scholarship",
    "are_you_a_high_school_student": "Are you a grade 12 student attending a Yukon High School and entering the first year of post secondary?",
    "are_you_a_high_school_graduate": "Are you or will you be a high school graduate from a yukon high school?",
    "are_you_pursuing_aviation": "Are you pursuing aviation oriented technical training?"
  }
}
</i18n>
