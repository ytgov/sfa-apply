<template>
  <article data-layout="eligability">
    <h2 class="text-h3 mb-7">{{ $t('title') }}</h2>

    <section>
      <Question>
        {{ $t('are_you_a_high_school_student') }}
      </Question>

      <RadioList :options="['Yes', 'No']" 
        v-model="eligability.scolorship.is_high_school_student" 
        :value="eligability.scolorship.is_high_school_student" 
      />
    </section>

    <section v-if="eligability.scolorship.is_high_school_student=='Yes'">
      <Question>
        {{ $t('are_you_a_high_school_graduate') }}
      </Question>

      <RadioList :options="['Yes', 'No']" 
        v-model="eligability.scolorship.is_high_school_graduate" 
        :value="eligability.scolorship.is_high_school_graduate" 
      />
    </section>
    <section v-if="eligability.scolorship.is_high_school_student=='Yes' && eligability.scolorship.is_high_school_graduate">
      <Question>
        {{ $t('are_you_pursuing_aviation') }}
      </Question>

      <RadioList :options="['Yes', 'No']" 
        v-model="eligability.scolorship.is_pursuing_aviation" 
        :value="eligability.scolorship.is_pursuing_aviation" 
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
    ...mapGetters({

    }),
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
        this.eligability.scolorship.is_high_school_student == 'No' ||
        (
          this.eligability.scolorship.is_high_school_student == 'Yes' 
          && this.eligability.scolorship.is_high_school_graduate == 'Yes'
          && this.eligability.scolorship.is_pursuing_aviation
        )
      )
      return is_valid;
    },
    next() {
      return '/eligability/studies'
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
