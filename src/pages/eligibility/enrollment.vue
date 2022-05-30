<template>
  <article data-layout="eligibility">
    <h2 class="text-h3 mb-7">{{ $t('title') }}</h2>

    <section>
      <Question>
        {{ $t('are_you_full_or_part_time') }}
      </Question>

      <RadioList :options="[$t('labels.full_time'), $t('labels.part_time')]" 
        v-model="eligibility.enrollment.time" 
        :value="eligibility.enrollment.time" 
      />
    </section>

    <section>
      <p>
        <ul>
          <li><strong>{{$t('labels.full_time')}}</strong> {{$t('notes.full_time')}}</li>  
          <li><strong>{{$t('labels.part_time')}}</strong> {{$t('notes.part_time')}}</li>
        </ul>
      </p>
      <p v-html="$t('notes.contact')">
    
      </p>
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
        //alert(values)
        //return this.$store.commit('eligibility/SET', values)
      }
    },
    valid() {
      var is_valid = this.eligibility.enrollment.time 
      return is_valid
    },
    next() {
      return '/eligibility/residency'
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
    "title": "Enrollment",
    "are_you_full_or_part_time": "Will you be enrolled in full-time or part-time studies?",
    "labels": {
      "full_time": "Full-time",
      "part_time": "Part-time"
    },
    "notes": {
      "full_time": "is a minimum of 60% of a full course load.",
      "part_time": "is 59% or less of a full course load.",
      "contact": "If you are unsure of your status, please contact your educational institution to confirm. If you are a registered Apprentice, please contact <a href=\"mailto:apprenticeship@yukon.ca\">apprenticeship@yukon.ca</a> for training and funding support."
    }
  },
  "fr": {
    "title": "Inscription",
    "are_you_full_or_part_time": "Vous inscrivez-vous à des études à temps partiel ou à temps plein?",
    "labels": {
      "full_time": "Temps plein",
      "part_time": "Temps partiel"
    },
    "notes": {
      "full_time": "is a minimum of 60% of a full course load.",
      "part_time": "is 59% or less of a full course load.",
      "contact": "If you are unsure of your status, please contact your educational institution to confirm. If you are a registered Apprentice, please contact <a href=\"mailto:apprenticeship@yukon.ca\">apprenticeship@yukon.ca</a> for training and funding support."
    }
  }
}
</i18n>
