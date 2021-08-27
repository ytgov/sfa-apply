<template>
  <article data-layout="eligability">
    <h2 class="text-h3 mb-7">{{ $t('title') }}</h2>

    <section>
      <Question>
        {{ $t('are_you_a_high_school_student') }}
      </Question>

      <RadioList :options="['Yes', 'No']" 
        v-model="eligability.scholorship.is_high_school_student" 
        :value="eligability.scholorship.is_high_school_student" 
        @click="update()"
      />
    </section>

    <section v-if="eligability.scholorship.is_high_school_student">
      <Question>
        {{ $t('are_you_a_high_school_graduate') }}
      </Question>

      <RadioList :options="['Yes', 'No']" 
        v-model="eligability.scholorship.is_high_school_graduate" 
        :value="eligability.scholorship.is_high_school_graduate" 
        @click="update()"
      />
    </section>
    <section v-if="eligability.scholorship.is_high_school_student && eligability.scholorship.is_high_school_graduate">
      <Question>
        {{ $t('are_you_pursuing_aviation') }}
      </Question>

      <RadioList :options="['Yes', 'No']" 
        v-model="eligability.scholorship.is_pursuing_aviation" 
        :value="eligability.scholorship.is_pursuing_aviation" 
        @click="update()"
      />
    </section>

    <section v-if="eligability.scholorship.is_high_school_student && eligability.scholorship.is_high_school_graduate && eligability.scholorship.is_pursuing_aviation">
      <Question>
        {{ $t('are_you_entering_visual_arts') }}
      </Question>

      <RadioList :options="['Yes', 'No']" 
        v-model="eligability.scholorship.are_you_entering_visual_arts" 
        :value="eligability.scholorship.are_you_entering_visual_arts" 
        @click="update()"
      />
    </section>

    <section v-if="eligability.scholorship.is_high_school_student && eligability.scholorship.is_high_school_graduate && eligability.scholorship.is_pursuing_aviation && eligability.scholorship.are_you_entering_visual_arts">
      <Question>
        {{ $t('enrolled_vocational') }}
      </Question>

      <RadioList :options="['Yes', 'No']" 
        v-model="eligability.scholorship.enrolled_vocational" 
        :value="eligability.scholorship.enrolled_vocational" 
        @click="update()"
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
          this.eligability.scholorship.is_high_school_student
          && this.eligability.scholorship.is_high_school_graduate
          && this.eligability.scholorship.is_pursuing_aviation
          && this.eligability.scholorship.are_you_entering_visual_arts
          && this.eligability.scholorship.enrolled_vocational
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
  },
  methods: {
    update() {
      this.$store.commit('eligability/SET', this.eligability)
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
    "are_you_pursuing_aviation": "Are you pursuing aviation oriented technical training?",
    "are_you_entering_visual_arts": "Are you entering the first year of a visual arts program in the academic year immediately following graduation?",
    "enrolled_vocational": "Are you enrolled in the first or second year of a one or two year vocational/technical program?" 
  },
  "fr": {
    "title": "Scholarship",
    "are_you_a_high_school_student": "Are you a grade 12 student attending a Yukon High School and entering the first year of post secondary?",
    "are_you_a_high_school_graduate": "Are you or will you be a high school graduate from a yukon high school?",
    "are_you_pursuing_aviation": "Are you pursuing aviation oriented technical training?",
    "are_you_entering_visual_arts": "Are you entering the first year of a visual arts program in the academic year immediately following graduation?",
    "enrolled_vocational": "Are you enrolled in the first or second year of a one or two year vocational/technical program?" 
  }
}
</i18n>
