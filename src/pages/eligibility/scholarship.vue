<template>
  <article data-layout="eligibility">
    <h2 class="text-h3 mb-7">{{ $t('title') }}</h2>

    <section>
      <Question>
        {{ $t('are_you_a_high_school_student') }}
      </Question>

      <RadioList :options="['Yes', 'No']" 
        v-model="eligibility.scholarship.is_high_school_student" 
        :value="eligibility.scholarship.is_high_school_student" 
        @click="update()"
      />
    </section>

    <section v-if="eligibility.scholarship.is_high_school_student">
      <Question>
        {{ $t('are_you_a_high_school_graduate') }}
      </Question>

      <RadioList :options="['Yes', 'No']" 
        v-model="eligibility.scholarship.is_high_school_graduate" 
        :value="eligibility.scholarship.is_high_school_graduate" 
        @click="update()"
      />
    </section>
    <section v-if="eligibility.scholarship.is_high_school_student && eligibility.scholarship.is_high_school_graduate">
      <Question>
        {{ $t('are_you_pursuing_aviation') }}
      </Question>

      <RadioList :options="['Yes', 'No']" 
        v-model="eligibility.scholarship.is_pursuing_aviation" 
        :value="eligibility.scholarship.is_pursuing_aviation" 
        @click="update()"
      />
    </section>

    <section v-if="eligibility.scholarship.is_high_school_student && eligibility.scholarship.is_high_school_graduate && eligibility.scholarship.is_pursuing_aviation == 'No'">
      <Question>
        {{ $t('are_you_entering_visual_arts') }}
      </Question>

      <RadioList :options="['Yes', 'No']" 
        v-model="eligibility.scholarship.are_you_entering_visual_arts" 
        :value="eligibility.scholarship.are_you_entering_visual_arts" 
        @click="update()"
      />
    </section>

    <section v-if="eligibility.scholarship.is_high_school_student && eligibility.scholarship.is_high_school_graduate && eligibility.scholarship.is_pursuing_aviation == 'No' && eligibility.scholarship.are_you_entering_visual_arts == 'No' ">
      <Question>
        {{ $t('enrolled_vocational') }}
      </Question>

      <RadioList :options="['Yes', 'No']" 
        v-model="eligibility.scholarship.enrolled_vocational" 
        :value="eligibility.scholarship.enrolled_vocational" 
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
    eligibility: {
      get() {
        return this.$store.getters['eligibility/GET']
      },
      set(values) {
        return this.$store.commit('eligibility/SET', values)
      }
    },
    valid() {
      var is_valid = (
          this.eligibility.scholarship.is_high_school_student
          && this.eligibility.scholarship.is_high_school_graduate
          && (
            (
              this.eligibility.scholarship.is_pursuing_aviation == 'Yes'
              || this.eligibility.scholarship.are_you_entering_visual_arts == 'Yes'
              || this.eligibility.scholarship.enrolled_vocational == 'Yes'
            ) || (
             this.eligibility.scholarship.is_pursuing_aviation == 'No'
             && this.eligibility.scholarship.are_you_entering_visual_arts == 'No'
             && this.eligibility.scholarship.enrolled_vocational == 'No'
            )
          )
        )
      
      return is_valid;
    },
    next() {
      return '/eligibility/enrollment'
    }
  },
  mounted() {
    this.$emit('input', this.valid)
  },
  watch: {
    valid(to, from) {
      this.$store.commit('eligibility/SET', this.eligibility)
      this.$emit('input', this.valid)
    }
  },
  methods: {
    update() {
      this.$store.commit('eligibility/SET', this.eligibility)
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
    "title": "Bourse d’études",
    "are_you_a_high_school_student": "Êtes-vous en 12e année dans une école secondaire du Yukon et entrez-vous en première année d’un programme d’études postsecondaires?",
    "are_you_a_high_school_graduate": "Avez-vous obtenu ou êtes-vous en voie d’obtenir un diplôme d’études secondaires au Yukon?",
    "are_you_pursuing_aviation": "Suivez-vous une formation technique dans le domaine de l’aviation?",
    "are_you_entering_visual_arts": "Entrez-vous en première année d’un programme en arts visuels dans l’année scolaire suivant immédiatement l’obtention de votre diplôme d’études secondaires?",
    "enrolled_vocational": "Êtes-vous inscrit à la première ou la deuxième année d’un programme de formation professionnelle/technique d’un ou de deux ans?" 
  }
}
</i18n>
