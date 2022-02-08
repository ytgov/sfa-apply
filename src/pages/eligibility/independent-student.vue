<template>
  <article data-layout="eligibility">
    <h2 class="text-h3 mb-7">{{ $t('title') }}</h2>

    <section>
      <Question>
        {{ $t('out_of_school') }}
      </Question>

      <RadioList :options="['Yes', 'No']" 
        v-model="eligibility.independentstudent.out_of_school" 
        :value="eligibility.independentstudent.out_of_school" 
      />
    </section>

    <section v-if="eligibility.independentstudent.out_of_school=='Yes'">
      <Question>
        {{ $t('in_labour_force') }}
      </Question>

      <RadioList :options="['Yes', 'No']" 
        v-model="eligibility.independentstudent.in_labour_force" 
        :value="eligibility.independentstudent.in_labour_force" 
      />
    </section>
    
    <section v-if="eligibility.independentstudent.out_of_school=='No' || eligibility.independentstudent.out_of_school ">
      <Question>
        {{ $t('supporting_parent') }}
      </Question>

      <RadioList :options="['Yes', 'No']" 
        v-model="eligibility.independentstudent.supporting_parent" 
        :value="eligibility.independentstudent.supporting_parent" 
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
          this.eligibility.independentstudent.out_of_school &&
          this.eligibility.independentstudent.supporting_parent 
        ) 

      return is_valid
    },
    next() {
      if (this.eligibility.independentstudent.out_of_school == 'Yes') {
        if (this.eligibility.enrollment.time == 'Part-time') {
          return '/eligibility/part-time-eligibility'
        } else {
          return '/eligibility/full-time-eligibility'
        } 
      }
      return '/eligibility/dependant-student-juristiction'
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
    "title": "Independent Student",
    "out_of_school": "Have you been out of school for 4 years or more?",
    "in_labour_force": "Have you been in the workforce for at least two years, while not in full-time studies? ",
    "supporting_parent": "Do you not have support of a parent/guardian due to death or disappearance? Does death or disappearance need to be said."
  },
  "fr": {
    "title": "Independent Student",
    "out_of_school": "Have you been out of school for 4 years or more? ",
    "in_labour_force": "Have you been in the workforce for at least two years, while not in full-time studies?",
    "supporting_parent": "Do you not have support of a parent/guardian due to death or disappearance? Does death or disappearance need to be said."
  }
}
</i18n>
