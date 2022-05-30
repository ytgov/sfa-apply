<template>
  <article data-layout="eligibility">
    <h2 class="text-h3 mb-7">{{ $t('title') }}</h2>

    <section>
      <Question>
        {{ $t('are_you_enrolled_in_post_secondary') }}
      </Question>

      <RadioList :options="['Yes', 'No']" 
        v-model="eligibility.designated_institution.are_you_enrolled_in_post_secondary" 
        :value="eligibility.designated_institution.are_you_enrolled_in_post_secondary" 
      />
    </section>

    <section v-if="eligibility.designated_institution.are_you_enrolled_in_post_secondary=='Yes'">
      <Question>
        {{ $t('post_secondary_enrolled_in') }}
      </Question>

      <p v-html="$t('notes')"></p>

      <Select :options="institutions"
        v-model="eligibility.designated_institution.post_secondary_enrolled_in" 
        :value="eligibility.designated_institution.post_secondary_enrolled_in" 
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
import Select from '~/components/forms/Select.vue';


export default {
  components: {
    Buttons,
    Question,
    RadioList,
    Select
  },
  data() {
    return {
      institutions: ["Yukon College", "Alcan Air", "McMaster University", "University of British Columbia", "University of Windsor"]
    }
  },
  computed: {
    eligibility: {
      get() {
        return this.$store.getters['eligibility/GET']
      },
      set(values) {
        return this.$store.commit('eligibility/SET', values)
      },
    },
    valid() {
      var is_valid = (
          this.eligibility.designated_institution.are_you_enrolled_in_post_secondary == 'No' 
        ) || (
          this.eligibility.designated_institution.are_you_enrolled_in_post_secondary == 'Yes' 
          && this.eligibility.designated_institution.post_secondary_enrolled_in
        )

      return is_valid
    },
    next() {
      if (this.eligibility.designated_institution.are_you_enrolled_in_post_secondary=='No') {
        return '/eligibility/review'
      }
      return '/eligibility/yukon-grant'
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
  }
}
</script>


<i18n>
{
  "en": {
    "title": "Designated institution",
    "are_you_enrolled_in_post_secondary": "Are you enrolled in a post-secondary institution?",
    "post_secondary_enrolled_in": "Select the school you plan to attend.",
    "notes": "If your school is not listed, contact our office by email at <a href=\"mailto:sfa@yukon.ca\">sfa@yukon.ca</a> and provide the name of your school, schools website, and your school’s email address.",
    "institutions": [
      "Yukon College", 
      "Alcan Air", 
      "McMaster University", 
      "University of British Columbia", 
      "University of Windsor"
    ]
  },
  "fr": {
    "title": "Établissement agréé",
    "are_you_enrolled_in_post_secondary": "Êtes-vous inscrit dans un établissement d’enseignement postsecondaire?",
    "post_secondary_enrolled_in": "Sélectionnez l’école que vous comptez fréquenter.",
    "notes": "Si votre école ne figure pas dans la liste, contactez notre bureau par courriel à <a href=\"mailto:sfa@yukon.ca\">sfa@yukon.ca</a> pour nous fournir le nom et l’adresse courriel de votre école.",
    "institutions": [
      "Collège du Yukon",
      "Alcan Air",
      "Université McMaster",
      "Université de la Colombie-Britannique",
      "Université de Windsor"
    ]
  }
}
</i18n>
